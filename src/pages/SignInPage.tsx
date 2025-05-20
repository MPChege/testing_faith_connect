
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [partnershipNumber, setPartnershipNumber] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This is a placeholder for actual authentication
    // In a real app, you would connect this to a backend service
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any non-empty email/password with partnership number
      if (email && password && partnershipNumber) {
        // Check if this is a job poster (for demo, any email containing "employer" or "poster")
        const isJobPoster = email.includes("employer") || email.includes("poster");
        
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userType", isJobPoster ? "job-poster" : "job-seeker");
        localStorage.setItem("partnershipNumber", partnershipNumber);
        
        toast({
          title: "Sign in successful",
          description: "Welcome back!",
        });
        
        navigate("/jobs");
      } else {
        toast({
          title: "Sign in failed",
          description: "Please check your email, password and partnership number",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-fem-navy">Sign In</CardTitle>
            <CardDescription className="text-center text-fem-darkgray">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <Link to="/forgot-password" className="text-xs font-medium text-fem-terracotta hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="partnershipNumber" className="text-sm font-medium">Partnership Number</label>
                <Input
                  id="partnershipNumber"
                  type="text"
                  placeholder="Enter your church partnership number"
                  value={partnershipNumber}
                  onChange={(e) => setPartnershipNumber(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">
                  Your partnership number is required for verification
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Remember me
                </label>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-fem-terracotta hover:bg-fem-terracotta/90" 
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-fem-terracotta hover:underline font-medium">
                Sign up as Job Seeker
              </Link>
            </div>
            <div className="text-sm text-center">
              Want to post jobs?{" "}
              <Link to="/register-job-poster" className="text-fem-terracotta hover:underline font-medium">
                Register as Job Poster
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SignInPage;
