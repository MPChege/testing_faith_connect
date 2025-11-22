import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Mail, ArrowRight, Loader2, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';
import { toast } from 'sonner';
import { Navbar } from '@/components/layout/Navbar';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setOTPData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+254');
  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('phone');

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email) && !email.includes('..') && !email.endsWith('.');
  };

  const validatePhone = (phone: string) => {
    const normalized = phone.replace(/\s/g, '');
    const kenyaRegex = /^\+254\d{9}$/;
    return kenyaRegex.test(normalized);
  };

  const handleSendOTP = async () => {
    const contact = activeTab === 'email' ? email.trim() : phone.trim();
    
    if (!contact.trim()) {
      toast.error(`Please enter your ${activeTab}`);
      return;
    }

    if (activeTab === 'email' && !validateEmail(contact)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (activeTab === 'phone' && !validatePhone(contact)) {
      toast.error('Please enter a valid Kenyan phone number (e.g., +254712345678)');
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiService.sendOTP(contact, activeTab);

      if (response.success) {
        const otpContext = {
          contact,
          method: activeTab,
          userId: response.userId,
          requiresProfileCompletion: response.requiresProfileCompletion,
          otp: response.otp,
        };

        setOTPData(otpContext);

        if (response.requiresProfileCompletion) {
          toast.success('Let’s create your Faith Connect account.');
          navigate('/new-account', {
            state: {
              contact,
              method: activeTab,
            },
          });
          return;
        }

        toast.success(`OTP sent to your ${activeTab}`);
        if (response.otp) {
          console.info(`DEV OTP for ${contact}: ${response.otp}`);
        }
        navigate('/verify-otp');
      } else {
        toast.error(response.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendOTP();
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />
      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24 relative z-10 min-h-[calc(100vh-4rem)] sm:min-h-screen">
        <Card className="w-full max-w-md relative z-10 shadow-sm border border-gray-100 bg-white mx-4 sm:mx-0 rounded-2xl overflow-hidden">
          <CardHeader className="text-center pb-8 pt-10 px-6 sm:px-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-fem-terracotta/10 flex items-center justify-center">
              <UserPlus className="w-8 h-8 text-fem-terracotta" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Sign in to continue
            </p>
          </CardHeader>

        <CardContent className="px-6 sm:px-8 pb-8 space-y-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'email' | 'phone')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-transparent p-1.5 gap-1.5 sm:gap-2">
              <TabsTrigger 
                value="phone"
                className="flex items-center justify-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-fem-terracotta data-[state=active]:to-fem-gold data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-800 data-[state=active]:shadow-lg rounded-lg transition-all duration-300 font-medium py-2.5 sm:py-3 px-3 sm:px-4 text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Phone</span>
              </TabsTrigger>
              <TabsTrigger 
                value="email" 
                className="flex items-center justify-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-fem-terracotta data-[state=active]:to-fem-gold data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-800 data-[state=active]:shadow-lg rounded-lg transition-all duration-300 font-medium py-2.5 sm:py-3 px-3 sm:px-4 text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="phone" className="space-y-4 mt-0">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+254 712 345 678"
                    value={phone}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, '');

                      if (!digitsOnly) {
                        setPhone('+254');
                        return;
                      }

                      let formatted: string;
                      if (digitsOnly.startsWith('254')) {
                        formatted = '+254' + digitsOnly.slice(3);
                      } else if (digitsOnly.startsWith('0')) {
                        formatted = '+254' + digitsOnly.slice(1);
                      } else {
                        formatted = '+254' + digitsOnly;
                      }

                      setPhone(formatted);
                    }}
                    onKeyPress={handleKeyPress}
                    className="pl-10 pr-4 h-12 border border-gray-300 focus:border-fem-terracotta focus:ring-1 focus:ring-fem-terracotta rounded-lg bg-white text-base transition-all"
                    disabled={isLoading}
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="email" className="space-y-4 mt-0">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-10 pr-4 h-12 border border-gray-300 focus:border-fem-terracotta focus:ring-1 focus:ring-fem-terracotta rounded-lg bg-white text-base transition-all"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Button
              onClick={handleSendOTP}
              disabled={
                isLoading ||
                (activeTab === 'email'
                  ? !email.trim()
                  : phone === '+254' || phone.trim().length <= 4)
              }
              size="lg"
              className="w-full h-12 bg-gradient-to-r from-fem-terracotta to-fem-gold hover:from-fem-terracotta/90 hover:to-fem-gold/90 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{' '}
              <a href="/terms-and-conditions" className="text-fem-terracotta hover:underline">
                Terms
              </a>{' '}
              and{' '}
              <a href="/privacy-policy" className="text-fem-terracotta hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default LoginPage;


