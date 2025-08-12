import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  Tag, 
  Users, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  Camera,
  ArrowRight,
  Eye,
  Clock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface BusinessData {
  id: string;
  business_name: string;
  category: { name: string; slug: string };
  description: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  city: string;
  county: string;
  rating: number;
  review_count: number;
  is_verified: boolean;
  is_featured: boolean;
  is_active: boolean;
  business_image_url: string;
  business_logo_url: string;
}

interface Service {
  id: number;
  name: string;
  description: string;
  price_range: string;
  duration: string;
  is_active: boolean;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  price_currency: string;
  product_image_url: string;
  in_stock: boolean;
  is_active: boolean;
}

export const BusinessManagementPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and is a business user
    if (!user || user.user_type !== 'business') {
      navigate('/login');
      return;
    }

    // Load business data
    loadBusinessData();
  }, [user, navigate]);

  const loadBusinessData = async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API calls
      // For now, using mock data
      const mockBusinessData: BusinessData = {
        id: '1',
        business_name: 'Faith Connect Business',
        category: { name: 'Technology', slug: 'technology' },
        description: 'Providing innovative technology solutions for our community.',
        phone: '+1234567890',
        email: 'contact@faithconnect.com',
        website: 'https://faithconnect.com',
        address: '123 Faith Street',
        city: 'Faith City',
        county: 'Faith County',
        rating: 4.8,
        review_count: 25,
        is_verified: true,
        is_featured: false,
        is_active: true,
        business_image_url: '/placeholder-business.jpg',
        business_logo_url: '/placeholder-logo.jpg'
      };

      const mockServices: Service[] = [
        {
          id: 1,
          name: 'Web Development',
          description: 'Custom website development for businesses',
          price_range: '$500 - $5000',
          duration: '2-8 weeks',
          is_active: true
        },
        {
          id: 2,
          name: 'IT Consulting',
          description: 'Technology consulting and strategy',
          price_range: '$100 - $200/hour',
          duration: 'Ongoing',
          is_active: true
        }
      ];

      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Business Website Template',
          description: 'Professional website template for small businesses',
          price: 299,
          price_currency: 'USD',
          product_image_url: '/placeholder-product.jpg',
          in_stock: true,
          is_active: true
        }
      ];

      setBusinessData(mockBusinessData);
      setServices(mockServices);
      setProducts(mockProducts);
    } catch (error) {
      toast({
        title: "Error loading business data",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditBusiness = () => {
    navigate('/register-business', { state: { editMode: true, businessId: businessData?.id } });
  };

  const handleAddService = () => {
    // TODO: Implement add service functionality
    toast({
      title: "Add Service",
      description: "This feature will be available soon!",
    });
  };

  const handleAddProduct = () => {
    // TODO: Implement add product functionality
    toast({
      title: "Add Product",
      description: "This feature will be available soon!",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fem-terracotta mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your business...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!businessData) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Business Found</h2>
              <p className="text-gray-600 mb-4">
                It looks like you haven't registered your business yet.
              </p>
              <Button 
                onClick={() => navigate('/register-business')}
                className="bg-fem-terracotta hover:bg-fem-terracotta/90"
              >
                Register Your Business
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-fem-terracotta rounded-lg flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{businessData.business_name}</h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary">{businessData.category.name}</Badge>
                    {businessData.is_verified && (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Verified
                      </Badge>
                    )}
                    {businessData.is_featured && (
                      <Badge variant="default" className="bg-yellow-100 text-yellow-800">
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <Button onClick={handleEditBusiness} variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Business
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>{businessData.rating} ({businessData.review_count} reviews)</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>{businessData.city}, {businessData.county}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-5 w-5" />
                <span>{businessData.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-5 w-5" />
                <span>{businessData.email}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building2 className="h-5 w-5" />
                      <span>Business Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Description</label>
                      <p className="text-gray-900">{businessData.description}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Address</label>
                      <p className="text-gray-900">{businessData.address}</p>
                    </div>
                    {businessData.website && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Website</label>
                        <a 
                          href={businessData.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-fem-terracotta hover:underline flex items-center space-x-1"
                        >
                          <span>Visit Website</span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Quick Stats</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{services.length}</div>
                        <div className="text-sm text-blue-600">Active Services</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{products.length}</div>
                        <div className="text-sm text-green-600">Active Products</div>
                      </div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{businessData.review_count}</div>
                      <div className="text-sm text-yellow-600">Total Reviews</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Services</h2>
                <Button onClick={handleAddService} className="bg-fem-terracotta hover:bg-fem-terracotta/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <Card key={service.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <Badge variant={service.is_active ? "default" : "secondary"}>
                          {service.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Tag className="h-4 w-4" />
                          <span>{service.price_range}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Products</h2>
                <Button onClick={handleAddProduct} className="bg-fem-terracotta hover:bg-fem-terracotta/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <Badge variant={product.is_active ? "default" : "secondary"}>
                          {product.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="space-y-2 text-sm text-gray-500 mb-4">
                        <div className="flex items-center justify-between">
                          <span>Price:</span>
                          <span className="font-semibold text-gray-900">
                            ${product.price} {product.price_currency}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Package className="h-4 w-4" />
                          <span>{product.in_stock ? "In Stock" : "Out of Stock"}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Analytics dashboard will be available soon! Track your business performance, 
                    customer engagement, and growth metrics.
                  </p>
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
