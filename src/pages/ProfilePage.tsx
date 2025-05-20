
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [partnershipNumber, setPartnershipNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    if (!loggedInStatus) {
      navigate("/login");
      return;
    }

    // Get user data from localStorage
    const email = localStorage.getItem("userEmail") || "";
    const type = localStorage.getItem("userType") || "";
    const partnership = localStorage.getItem("partnershipNumber") || "";
    
    setIsLoggedIn(loggedInStatus);
    setUserEmail(email);
    setUserType(type);
    setPartnershipNumber(partnership);
    setLoading(false);
  }, [navigate]);

  const handleUpdateProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile changes have been saved.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading profile...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-fem-navy mb-2">My Profile</h1>
            <p className="text-gray-600">
              Manage your account information and view your activity
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Card className="lg:col-span-1">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="" alt="Profile" />
                    <AvatarFallback className="text-4xl bg-fem-terracotta text-white">
                      {userEmail.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="mt-4 text-xl font-semibold text-fem-navy">
                    {userEmail.split('@')[0]}
                  </h2>
                  <p className="text-gray-600 capitalize">{userType.replace('-', ' ')}</p>
                  <div className="mt-2 text-sm bg-fem-gold/10 text-fem-navy px-3 py-1 rounded-full">
                    Partnership #{partnershipNumber}
                  </div>
                </div>
                
                <div className="mt-8 space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Account Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Security
                  </Button>
                  {userType === "job-seeker" && (
                    <Button variant="outline" className="w-full justify-start">
                      My Applications
                    </Button>
                  )}
                  {userType === "job-poster" && (
                    <Button variant="outline" className="w-full justify-start">
                      My Job Postings
                    </Button>
                  )}
                  <Button variant="outline" className="w-full justify-start">
                    Messages
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="lg:col-span-3">
              <Tabs defaultValue="overview">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="edit-profile">Edit Profile</TabsTrigger>
                  {userType === "job-seeker" && (
                    <TabsTrigger value="resume">Resume</TabsTrigger>
                  )}
                  {userType === "job-poster" && (
                    <TabsTrigger value="company">Company Info</TabsTrigger>
                  )}
                </TabsList>
                
                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-fem-navy">Contact Information</h3>
                          <div className="mt-2 space-y-2">
                            <p><span className="text-gray-500">Email:</span> {userEmail}</p>
                            <p><span className="text-gray-500">Account Type:</span> {userType.replace('-', ' ')}</p>
                            <p><span className="text-gray-500">Partnership Number:</span> {partnershipNumber}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-fem-navy">Church Membership</h3>
                          <div className="mt-2 space-y-2">
                            <p><span className="text-gray-500">Branch:</span> FEM Family Church</p>
                            <p><span className="text-gray-500">Status:</span> <span className="text-green-600">Verified</span></p>
                          </div>
                        </div>
                        
                        {userType === "job-seeker" && (
                          <div className="md:col-span-2">
                            <h3 className="font-semibold text-fem-navy">Recent Activity</h3>
                            <div className="mt-2">
                              <p className="text-gray-500">You haven't applied to any jobs yet.</p>
                            </div>
                          </div>
                        )}
                        
                        {userType === "job-poster" && (
                          <div className="md:col-span-2">
                            <h3 className="font-semibold text-fem-navy">Job Postings</h3>
                            <div className="mt-2">
                              <p className="text-gray-500">You haven't posted any jobs yet.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="edit-profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Edit Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6">Update your personal information</p>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">First Name</label>
                            <input
                              type="text"
                              className="w-full border border-gray-300 rounded-md p-2"
                              defaultValue={userEmail.split('@')[0]}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Last Name</label>
                            <input
                              type="text"
                              className="w-full border border-gray-300 rounded-md p-2"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <input
                              type="email"
                              className="w-full border border-gray-300 rounded-md p-2"
                              defaultValue={userEmail}
                              disabled
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Phone</label>
                            <input
                              type="tel"
                              className="w-full border border-gray-300 rounded-md p-2"
                            />
                          </div>
                        </div>
                        
                        <Button 
                          className="bg-fem-terracotta hover:bg-fem-terracotta/90"
                          onClick={handleUpdateProfile}
                        >
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {userType === "job-seeker" && (
                  <TabsContent value="resume">
                    <Card>
                      <CardHeader>
                        <CardTitle>Resume & Skills</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-6">Manage your resume and professional skills</p>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-fem-navy">Upload Resume</h3>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                              <p className="text-gray-500 mb-4">Drag and drop your resume here or click to browse</p>
                              <Button variant="outline">Browse Files</Button>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="font-semibold text-fem-navy">Skills</h3>
                            <textarea
                              className="w-full border border-gray-300 rounded-md p-2 min-h-24"
                              placeholder="Add your skills (e.g., Communication, Microsoft Office, Customer Service)"
                            />
                          </div>
                          
                          <Button className="bg-fem-terracotta hover:bg-fem-terracotta/90">
                            Save Changes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
                
                {userType === "job-poster" && (
                  <TabsContent value="company">
                    <Card>
                      <CardHeader>
                        <CardTitle>Company Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-6">Update your company details</p>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Company Name</label>
                            <input
                              type="text"
                              className="w-full border border-gray-300 rounded-md p-2"
                              defaultValue={localStorage.getItem("companyName") || ""}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Company Description</label>
                            <textarea
                              className="w-full border border-gray-300 rounded-md p-2 min-h-24"
                              placeholder="Tell us about your company, mission, and values..."
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Company Logo</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                              <p className="text-gray-500 mb-4">Drag and drop your logo here or click to browse</p>
                              <Button variant="outline">Browse Files</Button>
                            </div>
                          </div>
                          
                          <Button className="bg-fem-terracotta hover:bg-fem-terracotta/90">
                            Save Changes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
