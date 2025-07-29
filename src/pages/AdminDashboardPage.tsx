import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Building2, 
  Camera, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Phone,
  Mail,
  MapPin,
  Star,
  Eye,
  Settings,
  BarChart3
} from "lucide-react";

const AdminDashboardPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock data for admin dashboard
  const stats = {
    totalUsers: 1247,
    totalBusinesses: 156,
    pendingPhotoRequests: 8,
    verifiedBusinesses: 142
  };

  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      role: "user",
      verified: true,
      registrationDate: "2024-01-15",
      businesses: 2
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      role: "user",
      verified: false,
      registrationDate: "2024-01-20",
      businesses: 0
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@email.com",
      role: "user",
      verified: true,
      registrationDate: "2024-01-10",
      businesses: 1
    }
  ];

  const businesses = [
    {
      id: 1,
      name: "Grace Family Restaurant",
      owner: "John Smith",
      category: "Restaurant",
      verified: true,
      rating: 4.8,
      reviewCount: 42,
      phone: "(555) 123-4567",
      email: "grace@restaurant.com",
      address: "123 Faith Ave, Atlanta, GA"
    },
    {
      id: 2,
      name: "Covenant Auto Repair",
      owner: "Michael Brown",
      category: "Automotive",
      verified: false,
      rating: 4.9,
      reviewCount: 38,
      phone: "(555) 987-6543",
      email: "covenant@auto.com",
      address: "456 Service St, Atlanta, GA"
    }
  ];

  const photoRequests = [
    {
      id: 1,
      businessName: "Blessed Beauty Salon",
      ownerName: "Lisa Wilson",
      ownerEmail: "lisa@blessedbeauty.com",
      ownerPhone: "(555) 321-0987",
      status: "pending",
      requestDate: "2024-01-25",
      businessAddress: "321 Style Blvd, Atlanta, GA"
    },
    {
      id: 2,
      businessName: "Cornerstone Legal Services",
      ownerName: "David Miller",
      ownerEmail: "david@cornerstonelegal.com",
      ownerPhone: "(555) 654-3210",
      status: "scheduled",
      requestDate: "2024-01-22",
      businessAddress: "987 Justice Way, Atlanta, GA"
    }
  ];

  useEffect(() => {
    // Check if user is admin
    const userType = localStorage.getItem("userType");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (!isLoggedIn || userType !== "admin") {
      navigate("/login");
      return;
    }
    
    setIsAdmin(true);
    setLoading(false);
  }, [navigate]);

  const handleVerifyBusiness = (businessId: number) => {
    // Mock verification logic
    console.log(`Verifying business ${businessId}`);
  };

  const handleUpdatePhotoRequestStatus = (requestId: number, status: string) => {
    // Mock status update logic
    console.log(`Updating photo request ${requestId} to ${status}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading admin dashboard...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-fem-navy mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">
              Manage users, businesses, and photography requests
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-fem-navy">{stats.totalUsers}</p>
                  </div>
                  <Users className="w-8 h-8 text-fem-terracotta" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Businesses</p>
                    <p className="text-2xl font-bold text-fem-navy">{stats.totalBusinesses}</p>
                  </div>
                  <Building2 className="w-8 h-8 text-fem-terracotta" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Verified Businesses</p>
                    <p className="text-2xl font-bold text-fem-navy">{stats.verifiedBusinesses}</p>
                  </div>
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Photo Requests</p>
                    <p className="text-2xl font-bold text-fem-navy">{stats.pendingPhotoRequests}</p>
                  </div>
                  <Camera className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="users">
            <TabsList className="mb-6">
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="businesses">Business Management</TabsTrigger>
              <TabsTrigger value="photography">Photography Requests</TabsTrigger>
            </TabsList>

            {/* User Management */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarFallback className="bg-fem-terracotta text-white">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-fem-navy">{user.name}</h3>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={user.verified ? "default" : "secondary"}>
                                {user.verified ? "Verified" : "Pending"}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                Joined {new Date(user.registrationDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{user.businesses} businesses</span>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Business Management */}
            <TabsContent value="businesses">
              <Card>
                <CardHeader>
                  <CardTitle>Business Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {businesses.map((business) => (
                      <div key={business.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-fem-gold/10 rounded-lg flex items-center justify-center">
                              <Building2 className="w-6 h-6 text-fem-terracotta" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-fem-navy">{business.name}</h3>
                              <p className="text-sm text-gray-600">Owner: {business.owner}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">{business.category}</Badge>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-sm">{business.rating}</span>
                                  <span className="text-xs text-gray-500">({business.reviewCount})</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={business.verified ? "default" : "secondary"}>
                              {business.verified ? "Verified" : "Pending"}
                            </Badge>
                            {!business.verified && (
                              <Button 
                                size="sm" 
                                onClick={() => handleVerifyBusiness(business.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Verify
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>{business.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span>{business.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="truncate">{business.address}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Photography Requests */}
            <TabsContent value="photography">
              <Card>
                <CardHeader>
                  <CardTitle>Photography Request Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {photoRequests.map((request) => (
                      <div key={request.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-fem-navy">{request.businessName}</h3>
                            <p className="text-sm text-gray-600">Owner: {request.ownerName}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={
                                request.status === "pending" ? "secondary" :
                                request.status === "scheduled" ? "default" :
                                "outline"
                              }>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                Requested {new Date(request.requestDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {request.status === "pending" && (
                              <>
                                <Button 
                                  size="sm" 
                                  onClick={() => handleUpdatePhotoRequestStatus(request.id, "scheduled")}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  Schedule
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleUpdatePhotoRequestStatus(request.id, "rejected")}
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            {request.status === "scheduled" && (
                              <Button 
                                size="sm" 
                                onClick={() => handleUpdatePhotoRequestStatus(request.id, "completed")}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Mark Complete
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span>{request.ownerEmail}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>{request.ownerPhone}</span>
                          </div>
                          <div className="flex items-center gap-2 md:col-span-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>{request.businessAddress}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboardPage; 