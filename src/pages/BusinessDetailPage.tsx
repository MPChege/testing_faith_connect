import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Phone, 
  Globe, 
  MapPin, 
  Shield, 
  Heart, 
  Clock, 
  Mail,
  Camera,
  Calendar,
  Users,
  Award,
  CheckCircle,
  ArrowLeft,
  MessageCircle
} from "lucide-react";

const BusinessDetailPage = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock business data
  const mockBusiness = {
    id: 1,
    name: "Grace Family Restaurant",
    category: "Restaurant",
    description: "Family-owned restaurant serving homestyle meals with a warm, welcoming atmosphere. All ingredients sourced locally with love and care. We believe in creating memorable dining experiences that bring families together.",
    longDescription: "Grace Family Restaurant has been serving our community since 2010. We specialize in traditional family recipes passed down through generations, using only the freshest local ingredients. Our commitment to quality and service reflects our faith-based values of hospitality and community.",
    rating: 4.8,
    reviewCount: 42,
    phone: "(555) 123-4567",
    website: "gracefamilyrest.com",
    email: "info@gracefamilyrest.com",
    address: "123 Faith Ave, Atlanta, GA 30309",
    verified: true,
    image: "/lovable-uploads/f1a3f2a4-bbe7-46e5-be66-1ad39e35defa.png",
    hours: {
      monday: "7:00 AM - 9:00 PM",
      tuesday: "7:00 AM - 9:00 PM",
      wednesday: "7:00 AM - 9:00 PM",
      thursday: "7:00 AM - 9:00 PM",
      friday: "7:00 AM - 10:00 PM",
      saturday: "7:00 AM - 10:00 PM",
      sunday: "8:00 AM - 8:00 PM"
    },
    tags: ["Family-Friendly", "Local Ingredients", "Catering", "Takeout", "Dine-in"],
    services: ["Dine-in", "Takeout", "Catering", "Private Events", "Delivery"],
    photos: [
      "/lovable-uploads/f1a3f2a4-bbe7-46e5-be66-1ad39e35defa.png",
      "/lovable-uploads/541df702-f215-4b5f-bc60-d08161749258.png",
      "/lovable-uploads/b392f8fd-6fc5-4bfe-96aa-dc60f6854ba2.png"
    ],
    owner: {
      name: "John Smith",
      email: "john@gracefamilyrest.com",
      phone: "(555) 123-4567",
      memberSince: "2010"
    },
    features: [
      "Wheelchair Accessible",
      "Free Wi-Fi",
      "Parking Available",
      "Kid-Friendly Menu",
      "Gluten-Free Options"
    ],
    awards: [
      "Best Family Restaurant 2023",
      "Community Choice Award 2022",
      "Excellence in Service 2021"
    ]
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setBusiness(mockBusiness);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handlePhotoRequest = () => {
    // Mock photo request logic
    console.log("Photo request submitted");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading business details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p>Business not found</p>
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
          {/* Back Button */}
          <div className="mb-6">
            <Link to="/directory">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Directory
              </Button>
            </Link>
          </div>

          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Business Image */}
              <div className="lg:w-1/3">
                <div className="relative">
                  <img 
                    src={business.image} 
                    alt={business.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleFavorite}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </Button>
                </div>
              </div>

              {/* Business Info */}
              <div className="lg:w-2/3 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold text-fem-navy">{business.name}</h1>
                      {business.verified && (
                        <Shield className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    <Badge variant="outline" className="bg-fem-gold/10 text-fem-navy border-fem-gold/20 mb-3">
                      {business.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.floor(business.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{business.rating} ({business.reviewCount} reviews)</p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">{business.description}</p>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{business.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{business.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <span>{business.website}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{business.address}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-fem-terracotta hover:bg-fem-terracotta/90">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="border-fem-navy text-fem-navy hover:bg-fem-navy hover:text-white" asChild>
                    <Link to={`/chat?business=${business.id}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-fem-gold text-fem-gold hover:bg-fem-gold hover:text-white" asChild>
                    <Link to={`/chat?business=${business.id}`}> {/* Pass business id for chat context */}
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact / Chat
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-fem-gold text-fem-gold hover:bg-fem-gold hover:text-white">
                    <Camera className="w-4 h-4 mr-2" />
                    Request Photos
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="hours">Hours & Location</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About {business.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{business.longDescription}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Features & Amenities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {business.features.map((feature: string) => (
                          <div key={feature} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Awards & Recognition</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {business.awards.map((award: string) => (
                          <div key={award} className="flex items-center gap-3">
                            <Award className="w-5 h-5 text-fem-gold" />
                            <span className="text-sm">{award}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Business Owner</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="font-semibold text-fem-navy">{business.owner.name}</p>
                          <p className="text-sm text-gray-600">Member since {business.owner.memberSince}</p>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span>{business.owner.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>{business.owner.phone}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Professional Photography</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Get professional photos for your business listing to attract more customers.
                      </p>
                      <Button 
                        onClick={handlePhotoRequest}
                        className="w-full bg-fem-gold hover:bg-fem-gold/90 text-white"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Request Photos
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos">
              <Card>
                <CardHeader>
                  <CardTitle>Business Photos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {business.photos.map((photo: string, index: number) => (
                      <div key={index} className="aspect-square overflow-hidden rounded-lg">
                        <img 
                          src={photo} 
                          alt={`${business.name} photo ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-gray-600 mb-4">Need professional photos for your business?</p>
                    <Button onClick={handlePhotoRequest} className="bg-fem-gold hover:bg-fem-gold/90 text-white">
                      <Camera className="w-4 h-4 mr-2" />
                      Request Professional Photos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {business.services.map((service: string) => (
                      <div key={service} className="flex items-center gap-3 p-3 border rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Hours & Location Tab */}
            <TabsContent value="hours">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(business.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between items-center">
                          <span className="font-medium capitalize">{day}</span>
                          <span className="text-gray-600">{hours as string}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-fem-navy">{business.name}</p>
                        <p className="text-gray-600">{business.address}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{business.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span>{business.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-500" />
                          <span>{business.website}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BusinessDetailPage; 