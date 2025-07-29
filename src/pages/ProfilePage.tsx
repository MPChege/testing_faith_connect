
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Building2, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  Camera, 
  Calendar, 
  Users, 
  CheckCircle 
} from "lucide-react";
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
    const type = localStorage.getItem("userType") || "user";
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
              Manage your account information and business listings
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
                  <TabsTrigger value="my-businesses">My Businesses</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                  <TabsTrigger value="photography">Photography Services</TabsTrigger>
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
                        
                        <div className="md:col-span-2">
                          <h3 className="font-semibold text-fem-navy">Business Activity</h3>
                          <div className="mt-2">
                            <p className="text-gray-500">Manage your business listings and connect with the community.</p>
                          </div>
                        </div>
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

                {/* My Businesses Tab */}
                <TabsContent value="my-businesses">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Business Listings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <p className="text-gray-600">Manage your business listings and information</p>
                          <Button className="bg-fem-terracotta hover:bg-fem-terracotta/90">
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Business
                          </Button>
                        </div>
                        
                        {/* Mock business listings */}
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h3 className="font-semibold text-fem-navy">Grace Family Restaurant</h3>
                                <p className="text-sm text-gray-600">Restaurant • Verified</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="default" className="bg-green-600">Verified</Badge>
                                <Button variant="outline" size="sm">Edit</Button>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-500" />
                                <span>(555) 123-4567</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-500" />
                                <span>grace@restaurant.com</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span>123 Faith Ave, Atlanta, GA</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Favorites Tab */}
                <TabsContent value="favorites">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Favorite Businesses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-gray-600 mb-4">Businesses you've saved for quick access</p>
                        
                        {/* Mock favorite businesses */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 bg-fem-gold/10 rounded-lg flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-fem-terracotta" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-fem-navy">Covenant Auto Repair</h3>
                                <p className="text-sm text-gray-600">Automotive</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm">4.9 (38 reviews)</span>
                            </div>
                            <Button variant="outline" size="sm" className="w-full">
                              View Details
                            </Button>
                          </div>
                          
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 bg-fem-gold/10 rounded-lg flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-fem-terracotta" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-fem-navy">Faith Tech Solutions</h3>
                                <p className="text-sm text-gray-600">Technology</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm">4.7 (29 reviews)</span>
                            </div>
                            <Button variant="outline" size="sm" className="w-full">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Photography Services Tab */}
                <TabsContent value="photography">
                  <Card>
                    <CardHeader>
                      <CardTitle>Professional Photography Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-fem-gold/10 to-fem-terracotta/10 p-6 rounded-lg">
                          <div className="flex items-center gap-3 mb-4">
                            <Camera className="w-8 h-8 text-fem-terracotta" />
                            <h3 className="text-lg font-semibold text-fem-navy">Enhance Your Business Listing</h3>
                          </div>
                          <p className="text-gray-700 mb-4">
                            Get professional photos for your business to attract more customers and build trust with our community.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="text-center">
                              <div className="w-12 h-12 bg-fem-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                <CheckCircle className="w-6 h-6 text-fem-gold" />
                              </div>
                              <h4 className="font-medium text-fem-navy">Professional Quality</h4>
                              <p className="text-sm text-gray-600">High-resolution photos</p>
                            </div>
                            <div className="text-center">
                              <div className="w-12 h-12 bg-fem-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Calendar className="w-6 h-6 text-fem-gold" />
                              </div>
                              <h4 className="font-medium text-fem-navy">Flexible Scheduling</h4>
                              <p className="text-sm text-gray-600">Convenient appointment times</p>
                            </div>
                            <div className="text-center">
                              <div className="w-12 h-12 bg-fem-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Users className="w-6 h-6 text-fem-gold" />
                              </div>
                              <h4 className="font-medium text-fem-navy">Community Focused</h4>
                              <p className="text-sm text-gray-600">Faith-based photographers</p>
                            </div>
                          </div>
                          <Button className="w-full bg-fem-gold hover:bg-fem-gold/90 text-white">
                            <Camera className="w-4 h-4 mr-2" />
                            Request Photography Service
                          </Button>
                        </div>
                        
                        {/* Mock photo requests */}
                        <div>
                          <h3 className="font-semibold text-fem-navy mb-4">My Photo Requests</h3>
                          <div className="space-y-3">
                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">Grace Family Restaurant</h4>
                                <Badge variant="secondary">Pending</Badge>
                              </div>
                              <p className="text-sm text-gray-600">Requested on Jan 25, 2024</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
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
