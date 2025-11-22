import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  onValueChange?: (otp: string) => void;
  className?: string;
  disabled?: boolean;
  contact?: string;
  method?: 'email' | 'phone';
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onComplete,
  onValueChange,
  className,
  disabled = false,
  contact,
  method = 'phone',
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (disabled) return;

    // Only allow single digit
    if (value.length > 1) {
      value = value.slice(-1);
    }

    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    const otpString = newOtp.join('');
    onValueChange?.(otpString);

    // Move to next input if value is entered
    if (value && index < length - 1) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (otpString.length === length && !otpString.includes('')) {
      onComplete(otpString);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'Backspace') {
      e.preventDefault();
      
      if (otp[index]) {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        onValueChange?.(newOtp.join(''));
      } else if (index > 0) {
        // Move to previous input and clear it
        setActiveIndex(index - 1);
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        onValueChange?.(newOtp.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setActiveIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'Enter') {
      const otpString = otp.join('');
      if (otpString.length === length && !otpString.includes('')) {
        onComplete(otpString);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    
    if (pastedData.length > 0) {
      const newOtp = new Array(length).fill('');
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      onValueChange?.(newOtp.join(''));
      
      // Focus the next empty input or the last input
      const nextIndex = Math.min(pastedData.length, length - 1);
      setActiveIndex(nextIndex);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setActiveIndex(index);
  };

  const handleBlur = () => {
    setActiveIndex(-1);
  };

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [disabled]);

  // Auto-detect and fill OTP from SMS/email using WebOTP API
  useEffect(() => {
    if (disabled || !('OTPCredential' in window)) {
      return;
    }

    // Use WebOTP API for automatic OTP detection (Chrome/Edge on Android)
    const abortController = new AbortController();
    
    const handleWebOTP = async () => {
      try {
        const otp = await (navigator.credentials as any).get({
          otp: { transport: ['sms'] },
          signal: abortController.signal,
        }) as any;

        if (otp && otp.code) {
          const detectedOTP = otp.code.replace(/\D/g, '').slice(0, length);
          if (detectedOTP.length === length) {
            const newOtp = detectedOTP.split('');
            setOtp(newOtp);
            onValueChange?.(detectedOTP);
            onComplete(detectedOTP);
          }
        }
      } catch (error: any) {
        // User cancelled or API not supported - ignore silently
        if (error.name !== 'AbortError' && error.name !== 'NotSupportedError') {
          console.log('WebOTP API error:', error);
        }
      }
    };

    // Only use WebOTP for phone method
    if (method === 'phone') {
      handleWebOTP();
    }

    // Also check for OTP in URL parameters (for email links)
    const urlParams = new URLSearchParams(window.location.search);
    const urlOTP = urlParams.get('otp');
    if (urlOTP && urlOTP.length === length && /^\d+$/.test(urlOTP)) {
      const newOtp = urlOTP.split('');
      setOtp(newOtp);
      onValueChange?.(urlOTP);
      onComplete(urlOTP);
    }

    return () => {
      abortController.abort();
    };
  }, [onValueChange, onComplete, length, disabled, method]);

  return (
    <div className={cn('flex gap-3 justify-center', className)}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          disabled={disabled}
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          autoFocus={index === 0}
          className={cn(
            'w-12 h-12 md:w-14 md:h-14 text-center text-lg md:text-xl font-semibold',
            'border-2 rounded-lg transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-fem-terracotta focus:ring-offset-1',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            activeIndex === index
              ? 'border-fem-terracotta bg-fem-terracotta/5 shadow-md scale-105'
              : digit
              ? 'border-fem-gold bg-fem-gold/5'
              : 'border-gray-300 bg-white hover:border-gray-400',
            'focus:border-fem-terracotta focus:bg-fem-terracotta/5'
          )}
        />
      ))}
    </div>
  );
};
