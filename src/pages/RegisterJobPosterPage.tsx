
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const RegisterJobPosterPage = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    partnershipNumber: "",
    companyDescription: "",
    churchBranch: "",
    companySize: "",
    industry: "",
    logo: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, logo: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords are the same",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Validate partnership number
    if (!formData.partnershipNumber) {
      toast({
        title: "Partnership number required",
        description: "Please provide your church partnership number for verification",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Store user data (in a real app, this would be done on the backend)
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userType", "job-poster");
      localStorage.setItem("companyName", formData.companyName);
      localStorage.setItem("partnershipNumber", formData.partnershipNumber);
      
      toast({
        title: "Registration Successful",
        description: "You can now post jobs on our platform",
      });
      
      navigate("/post-job");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-fem-navy mb-2">Register as Job Poster</h1>
            <p className="text-gray-600">
              Create an employer account to post job opportunities for our church community
            </p>
          </div>
          
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-fem-navy">Employer Registration</CardTitle>
              <CardDescription>
                Please provide your company details and your church partnership information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="text-lg font-semibold text-fem-navy mb-4">Company Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="companyName">Company/Organization Name*</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="industry">Industry*</Label>
                      <Select
                        value={formData.industry}
                        onValueChange={(value) => handleSelectChange("industry", value)}
                      >
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="construction">Construction</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="hospitality">Hospitality</SelectItem>
                          <SelectItem value="ministry">Ministry</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="companySize">Company Size*</Label>
                      <Select 
                        value={formData.companySize}
                        onValueChange={(value) => handleSelectChange("companySize", value)}
                      >
                        <SelectTrigger id="companySize">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="501+">501+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="logo">Company Logo</Label>
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Recommended: Square image, at least 300x300px
                      </p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="companyDescription">Company Description*</Label>
                      <Textarea
                        id="companyDescription"
                        name="companyDescription"
                        value={formData.companyDescription}
                        onChange={handleChange}
                        placeholder="Tell us about your company, mission, and values..."
                        required
                        className="mt-1 min-h-24"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="text-lg font-semibold text-fem-navy mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="contactPerson">Contact Person*</Label>
                      <Input
                        id="contactPerson"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address*</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number*</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="text-lg font-semibold text-fem-navy mb-4">Church Membership</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="churchBranch">Church Branch*</Label>
                      <Input
                        id="churchBranch"
                        name="churchBranch"
                        value={formData.churchBranch}
                        onChange={handleChange}
                        placeholder="e.g. FEM Family Church - Atlanta"
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="partnershipNumber">Partnership Number*</Label>
                      <Input
                        id="partnershipNumber"
                        name="partnershipNumber"
                        value={formData.partnershipNumber}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        This is used to verify your church membership.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="text-lg font-semibold text-fem-navy mb-4">Account Setup</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="password">Password*</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Must be at least 8 characters
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password*</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="rounded-lg bg-fem-gold/10 p-4 border border-fem-gold/20 mb-6">
                    <h3 className="font-semibold text-fem-navy mb-2">Church Verification</h3>
                    <p className="text-sm text-gray-600">
                      Your partnership number will be verified before your account is fully activated.
                      Job postings will be reviewed by church staff before being published.
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-fem-terracotta hover:bg-fem-terracotta/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Account..." : "Create Employer Account"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterJobPosterPage;
