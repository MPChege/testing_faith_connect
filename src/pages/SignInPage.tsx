
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const SignInPage = () => {
  const [password, setPassword] = useState("");
  const [partnershipNumber, setPartnershipNumber] = useState("");
  const [userType, setUserType] = useState("community");
  const [showPassword, setShowPassword] = useState(false);
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
      
      // For demo purposes, accept any non-empty password with partnership number
      if (password && partnershipNumber) {
        // Check if this is an admin (for demo, any partnership number containing "admin")
        const isAdmin = partnershipNumber.includes("admin");
        
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", "user@faithconnect.com"); // Default email for demo
        localStorage.setItem("userType", isAdmin ? "admin" : userType);
        localStorage.setItem("partnershipNumber", partnershipNumber);
        
        toast({
          title: "Sign in successful",
          description: "Welcome to FaithConnect!",
        });
        
        // Redirect based on user type
        if (isAdmin) {
          navigate("/admin");
        } else {
          // For testing: always show onboarding for new users
          // if (localStorage.getItem("hasSeenOnboarding") !== "true") {
          if (true) { // Temporarily force onboarding for testing
            navigate("/welcome");
          } else {
            navigate("/");
          }
        }
      } else {
        toast({
          title: "Sign in failed",
          description: "Please check your password and partnership number",
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
            <CardTitle className="text-2xl font-bold text-center text-fem-navy">Sign In to FaithConnect</CardTitle>
            <CardDescription className="text-center text-fem-darkgray">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="partnershipNumber" className="text-sm font-medium">Partnership Number</label>
                <Input
                  id="partnershipNumber"
                  type="text"
                  placeholder="Enter your partnership number"
                  value={partnershipNumber}
                  onChange={(e) => setPartnershipNumber(e.target.value)}
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
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Login As</label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="userType"
                      value="community"
                      checked={userType === "community"}
                      onChange={(e) => setUserType(e.target.value)}
                      className="text-fem-terracotta"
                    />
                    <span className="text-sm">Community Member</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="userType"
                      value="business"
                      checked={userType === "business"}
                      onChange={(e) => setUserType(e.target.value)}
                      className="text-fem-terracotta"
                    />
                    <span className="text-sm">Business Directory</span>
                  </label>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-fem-terracotta hover:bg-fem-terracotta/90"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-fem-terracotta hover:underline">
                Register here
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
