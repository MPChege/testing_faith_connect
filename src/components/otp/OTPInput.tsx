import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  onResend: () => void;
  isLoading?: boolean;
  error?: string;
  success?: string;
  disabled?: boolean;
  resendDisabled?: boolean;
  resendCooldown?: number; // in seconds
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onComplete,
  onResend,
  isLoading = false,
  error,
  success,
  disabled = false,
  resendDisabled = false,
  resendCooldown = 60
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [resendTimer, setResendTimer] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle resend timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Handle OTP input change
  const handleChange = (index: number, value: string) => {
    if (disabled || isLoading) return;

    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if current is filled
    if (value && index < length - 1) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    const otpString = newOtp.join('');
    if (otpString.length === length) {
      onComplete(otpString);
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled || isLoading) return;

    if (e.key === 'Backspace') {
      if (otp[index]) {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous input
        setActiveIndex(index - 1);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled || isLoading) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '');
    
    if (pastedData.length === length) {
      const newOtp = pastedData.split('').slice(0, length);
      setOtp(newOtp);
      onComplete(pastedData);
    }
  };

  // Handle resend
  const handleResend = () => {
    if (resendDisabled || resendTimer > 0) return;
    
    onResend();
    setResendTimer(resendCooldown);
  };

  // Clear OTP
  const clearOtp = () => {
    setOtp(new Array(length).fill(''));
    setActiveIndex(0);
    inputRefs.current[0]?.focus();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold text-fem-navy">
          Enter Verification Code
        </CardTitle>
        <p className="text-gray-600 text-sm">
          We've sent a {length}-digit code to your phone/email
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* OTP Input Fields */}
        <div className="flex justify-center space-x-2">
          {otp.map((digit, index) => (
            <div key={index} className="relative">
              <Input
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onFocus={() => setActiveIndex(index)}
                className={`
                  w-12 h-12 text-center text-lg font-semibold
                  border-2 rounded-lg transition-all duration-200
                  ${activeIndex === index 
                    ? 'border-fem-terracotta ring-2 ring-fem-terracotta/20' 
                    : 'border-gray-300'
                  }
                  ${digit ? 'bg-fem-gold/10 border-fem-gold' : ''}
                  ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                  ${isLoading ? 'opacity-50' : ''}
                `}
                maxLength={1}
                disabled={disabled || isLoading}
              />
              {digit && (
                <div className="absolute -top-1 -right-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Error/Success Messages */}
        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <Button
            onClick={clearOtp}
            variant="outline"
            disabled={disabled || isLoading}
            className="w-full"
          >
            Clear Code
          </Button>

          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm text-gray-500">Didn't receive the code?</span>
            <Button
              onClick={handleResend}
              variant="link"
              disabled={resendDisabled || resendTimer > 0 || isLoading}
              className="p-0 h-auto text-fem-terracotta hover:text-fem-terracotta/80"
            >
              {resendTimer > 0 ? (
                <span className="flex items-center space-x-1">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Resend in {resendTimer}s</span>
                </span>
              ) : (
                'Resend Code'
              )}
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center space-x-2 text-fem-terracotta">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Verifying code...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 