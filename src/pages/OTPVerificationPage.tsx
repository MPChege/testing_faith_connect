import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, RefreshCw } from 'lucide-react';
import { OTPInput } from '@/components/auth/OTPInput';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';
import { toast } from 'sonner';

const OTPVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const { getOTPData, clearOTPData, login, setOTPData } = useAuth();
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [otpData, setOtpData] = useState<{ contact: string; method: 'email' | 'phone' } | null>(null);

  useEffect(() => {
    const data = getOTPData();
    if (!data) {
      toast.error('No OTP data found. Please start over.');
      navigate('/login');
      return;
    }
    setOtpData(data);
  }, [getOTPData, navigate]);

  useEffect(() => {
    // Start resend timer
    setResendTimer(30);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOTPComplete = async (otpValue: string) => {
    if (!otpData) return;

    console.log('OTP Complete triggered with:', otpValue);
    setIsVerifying(true);
    setOtp(otpValue);

    try {
      // Pass user_id if available from OTP data
      const userId = otpData.userId;
      const response = await apiService.verifyOTP(otpData.contact, otpValue, otpData.method, userId);
      console.log('OTP verification response:', response);
      
      if (response.success) {
        setIsVerified(true);
        
        // Check if profile completion is required
        if (response.requires_profile_completion || response.is_new_user) {
          toast.success("OTP verified! Let's create your account.");
          // Update OTP data with user_id if returned
          if (response.user_id) {
            setOTPData({ ...otpData, userId: response.user_id });
          }
          setTimeout(() => {
            navigate('/user-type-selection', {
              state: {
                contact: otpData.contact,
                method: otpData.method,
                userId: response.user_id || otpData.userId,
              },
            });
          }, 1200);
        } else if (response.user && response.tokens) {
          // Existing user with complete profile - log them in
          // Map API user object to AuthContext User format
          const mappedUser = {
            id: response.user.id?.toString() || '',
            email: response.user.email,
            phone: response.user.phone,
            firstName: response.user.first_name,
            lastName: response.user.last_name,
            userType: response.user.user_type as 'community' | 'business',
            profilePicture: response.user.profile_image_url,
            bio: response.user.bio,
            isComplete: response.user.is_profile_complete,
          };
          login(mappedUser, response.tokens);
          clearOTPData();
          toast.success('Welcome back!');
          
          // Check user type and redirect accordingly
          const userType = mappedUser.userType;
          setTimeout(() => {
            if (userType === 'business' || userType === 'business_owner') {
              navigate('/manage-business');
            } else {
              navigate('/');
            }
          }, 1500);
        }
      } else {
        toast.error(response.message || 'Invalid OTP. Please try again.');
        setOtp('');
      }
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      toast.error(error.message || 'Something went wrong. Please try again.');
      setOtp('');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    if (!otpData || resendTimer > 0) return;

    setIsResending(true);

    try {
      const response = await apiService.resendOTP({
        identifier: otpData.contact,
        auth_method: otpData.method,
      });
      
      if (response.success) {
        toast.success(`OTP resent to your ${otpData.method}`);
        // Update user_id if returned
        if (response.user_id) {
          setOTPData({ ...otpData, userId: response.user_id });
        }
        setResendTimer(30);
        
        // Restart timer
        const timer = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        toast.error(response.message || 'Failed to resend OTP');
      }
    } catch (error: any) {
      console.error('Error resending OTP:', error);
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleGoBack = () => {
    clearOTPData();
    navigate('/login');
  };

  const maskContact = (contact: string, method: 'email' | 'phone') => {
    if (method === 'email') {
      const [username, domain] = contact.split('@');
      const maskedUsername = username.length > 2 
        ? username.substring(0, 2) + '*'.repeat(username.length - 2)
        : username;
      return `${maskedUsername}@${domain}`;
    } else {
      // Phone number masking
      if (contact.length > 4) {
        return contact.substring(0, 3) + '*'.repeat(contact.length - 6) + contact.substring(contact.length - 3);
      }
      return contact;
    }
  };

  if (!otpData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white relative flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-md sm:max-w-lg relative z-10 shadow-lg border border-gray-200 bg-white mx-4 sm:mx-0">
        <CardHeader className="text-center pb-8 pt-8 px-6 sm:px-8">
          <div className="mb-6">
            {isVerified ? (
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            ) : (
              <div className="w-16 h-16 bg-fem-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-4 border-fem-terracotta border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-fem-navy mb-3">
            {isVerified ? 'Verified!' : 'Enter Verification Code'}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {isVerified 
              ? 'Redirecting you to the next step...'
              : `We've sent a 6-digit code to your ${otpData.method === 'email' ? 'email' : 'phone'}`
            }
          </p>
          {!isVerified && otpData && (
            <p className="text-fem-terracotta font-semibold text-sm sm:text-base mt-3">
              {maskContact(otpData.contact, otpData.method)}
            </p>
          )}
        </CardHeader>

        <CardContent className="px-6 sm:px-8 pb-8">
          {!isVerified && (
            <>
              <div className="mb-8">
                <OTPInput
                  onComplete={handleOTPComplete}
                  onValueChange={setOtp}
                  disabled={isVerifying}
                  contact={otpData.contact}
                  method={otpData.method}
                />
              </div>

              {isVerifying && (
                <div className="flex items-center justify-center mb-6">
                  <Loader2 className="w-5 h-5 animate-spin text-fem-terracotta mr-2" />
                  <span className="text-gray-600 text-sm">Verifying code...</span>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  onClick={() => handleOTPComplete(otp)}
                  disabled={otp.length !== 6 || isVerifying}
                  size="lg"
                  className="w-full bg-gradient-to-r from-fem-terracotta to-fem-gold hover:from-fem-terracotta/90 hover:to-fem-gold/90 text-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Code
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                <div className="flex gap-3">
                  <Button
                    onClick={handleResendOTP}
                    disabled={resendTimer > 0 || isResending}
                    variant="outline"
                    size="lg"
                    className="flex-1 border-gray-300 hover:bg-gray-50"
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Resending...
                      </>
                    ) : resendTimer > 0 ? (
                      `Resend (${resendTimer}s)`
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Resend
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleGoBack}
                    variant="outline"
                    size="lg"
                    className="flex-1 border-gray-300 hover:bg-gray-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Didn't receive the code? Check your {otpData.method === 'email' ? 'spam folder' : 'messages'} or{' '}
                  <button
                    onClick={handleResendOTP}
                    disabled={resendTimer > 0}
                    className="text-fem-terracotta hover:underline font-medium disabled:opacity-50"
                  >
                    resend code
                  </button>
                </p>
              </div>
            </>
          )}

          {isVerified && (
            <div className="text-center py-8">
              <p className="text-gray-600">
                {otpData ? 'Redirecting you to the next step...' : 'Welcome back!'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPVerificationPage;
