import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Upload, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Camera
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const BusinessRegistrationPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    businessName: "",
    category: "",
    description: "",
    longDescription: "",
    
    // Contact Information
    phone: "",
    email: "",
    website: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    
    // Business Details
    hours: {
      monday: { open: "", close: "", closed: false },
      tuesday: { open: "", close: "", closed: false },
      wednesday: { open: "", close: "", closed: false },
      thursday: { open: "", close: "", closed: false },
      friday: { open: "", close: "", closed: false },
      saturday: { open: "", close: "", closed: false },
      sunday: { open: "", close: "", closed: false }
    },
    
    // Services & Features
    services: [] as string[],
    features: [] as string[],
    tags: [] as string[],
    
    // Additional Information
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    memberSince: "",
    
    // Photo Request
    photoRequest: false,
    photoRequestNotes: ""
  });

  const categories = [
    "Restaurant", "Retail", "Services", "Health & Wellness", 
    "Automotive", "Real Estate", "Education", "Technology",
    "Beauty & Personal Care", "Home & Garden", "Legal Services",
    "Financial Services", "Entertainment", "Professional Services",
    "Construction", "Transportation", "Non-Profit"
  ];

  const availableServices = [
    "Dine-in", "Takeout", "Delivery", "Catering", "Private Events",
    "Consultation", "Installation", "Maintenance", "Repair", "Training",
    "Online Services", "In-Person Services", "Mobile Services"
  ];

  const availableFeatures = [
    "Wheelchair Accessible", "Free Wi-Fi", "Parking Available", 
    "Kid-Friendly", "Gluten-Free Options", "Vegan Options",
    "Credit Cards Accepted", "Cash Only", "Appointment Required",
    "Walk-ins Welcome", "Emergency Services", "24/7 Available"
  ];

  const availableTags = [
    "Family-Friendly", "Local Ingredients", "Eco-Friendly", "Veteran-Owned",
    "Woman-Owned", "Minority-Owned", "Faith-Based", "Community Focused",
    "Premium Quality", "Affordable", "Luxury", "Budget-Friendly"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayToggle = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }));
  };

  const handleHoursChange = (day: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: {
          ...prev.hours[day as keyof typeof prev.hours],
          [field]: value
        }
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Mock submission
    console.log("Business registration submitted:", formData);
    toast({
      title: "Business registration submitted!",
      description: "Your business listing has been submitted for review. We'll notify you once it's approved.",
    });
    navigate("/business-registration-success");
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="businessName">Business Name *</Label>
        <Input
          id="businessName"
          value={formData.businessName}
          onChange={(e) => handleInputChange("businessName", e.target.value)}
          placeholder="Enter your business name"
        />
      </div>

      <div>
        <Label>Business Category *</Label>
        <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Brief Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Brief description of your business (2-3 sentences)"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="longDescription">Detailed Description</Label>
        <Textarea
          id="longDescription"
          value={formData.longDescription}
          onChange={(e) => handleInputChange("longDescription", e.target.value)}
          placeholder="Tell us more about your business, mission, and values..."
          rows={5}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="business@email.com"
          />
        </div>

        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            placeholder="www.yourbusiness.com"
          />
        </div>

        <div>
          <Label htmlFor="address">Street Address *</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="123 Business St"
          />
        </div>

        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            placeholder="Atlanta"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="state">State *</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              placeholder="GA"
            />
          </div>
          <div>
            <Label htmlFor="zipCode">ZIP Code *</Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              placeholder="30309"
            />
          </div>
        </div>
      </div>

      <div>
        <Label className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Business Hours
        </Label>
        <div className="space-y-3 mt-3">
          {Object.entries(formData.hours).map(([day, hours]) => (
            <div key={day} className="flex items-center gap-3">
              <div className="w-20 text-sm font-medium capitalize">{day}</div>
              <Checkbox
                checked={hours.closed}
                onCheckedChange={(checked) => handleHoursChange(day, "closed", checked as boolean)}
              />
              <span className="text-sm">Closed</span>
              {!hours.closed && (
                <>
                  <Input
                    type="time"
                    value={hours.open}
                    onChange={(e) => handleHoursChange(day, "open", e.target.value)}
                    className="w-24"
                  />
                  <span className="text-sm">to</span>
                  <Input
                    type="time"
                    value={hours.close}
                    onChange={(e) => handleHoursChange(day, "close", e.target.value)}
                    className="w-24"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Label>Services Offered</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          {availableServices.map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox
                checked={formData.services.includes(service)}
                onCheckedChange={() => handleArrayToggle("services", service)}
              />
              <Label className="text-sm">{service}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Features & Amenities</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          {availableFeatures.map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                checked={formData.features.includes(feature)}
                onCheckedChange={() => handleArrayToggle("features", feature)}
              />
              <Label className="text-sm">{feature}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Business Tags</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          {availableTags.map((tag) => (
            <div key={tag} className="flex items-center space-x-2">
              <Checkbox
                checked={formData.tags.includes(tag)}
                onCheckedChange={() => handleArrayToggle("tags", tag)}
              />
              <Label className="text-sm">{tag}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ownerName">Owner Name *</Label>
          <Input
            id="ownerName"
            value={formData.ownerName}
            onChange={(e) => handleInputChange("ownerName", e.target.value)}
            placeholder="Your full name"
          />
        </div>

        <div>
          <Label htmlFor="ownerEmail">Owner Email *</Label>
          <Input
            id="ownerEmail"
            type="email"
            value={formData.ownerEmail}
            onChange={(e) => handleInputChange("ownerEmail", e.target.value)}
            placeholder="owner@email.com"
          />
        </div>

        <div>
          <Label htmlFor="ownerPhone">Owner Phone</Label>
          <Input
            id="ownerPhone"
            value={formData.ownerPhone}
            onChange={(e) => handleInputChange("ownerPhone", e.target.value)}
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <Label htmlFor="memberSince">Church Member Since</Label>
          <Input
            id="memberSince"
            value={formData.memberSince}
            onChange={(e) => handleInputChange("memberSince", e.target.value)}
            placeholder="2020"
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-fem-gold/10 to-fem-terracotta/10 p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <Camera className="w-6 h-6 text-fem-terracotta" />
          <h3 className="font-semibold text-fem-navy">Professional Photography Services</h3>
        </div>
        <p className="text-gray-700 mb-4">
          Get professional photos for your business listing to attract more customers and build trust with our community.
        </p>
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox
            checked={formData.photoRequest}
            onCheckedChange={(checked) => handleInputChange("photoRequest", checked)}
          />
          <Label>Request professional photography service</Label>
        </div>
        {formData.photoRequest && (
          <div>
            <Label htmlFor="photoRequestNotes">Additional Notes</Label>
            <Textarea
              id="photoRequestNotes"
              value={formData.photoRequestNotes}
              onChange={(e) => handleInputChange("photoRequestNotes", e.target.value)}
              placeholder="Any specific requirements or preferences for the photo session..."
              rows={3}
            />
          </div>
        )}
      </div>
    </div>
  );

  const steps = [
    { number: 1, title: "Basic Information", icon: Building2 },
    { number: 2, title: "Contact & Hours", icon: Phone },
    { number: 3, title: "Services & Features", icon: CheckCircle },
    { number: 4, title: "Owner Details", icon: Camera }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="outline" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl font-bold text-fem-navy">Register Your Business</h1>
            </div>
            <p className="text-gray-600">
              Join our faith-based business directory and connect with fellow church members
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number 
                      ? 'bg-fem-terracotta border-fem-terracotta text-white' 
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-fem-navy' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-fem-terracotta' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Step {currentStep} of 4: {steps[currentStep - 1].title}</CardTitle>
            </CardHeader>
            <CardContent>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < 4 ? (
                  <Button onClick={nextStep} className="bg-fem-terracotta hover:bg-fem-terracotta/90">
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="bg-fem-terracotta hover:bg-fem-terracotta/90">
                    Submit Registration
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BusinessRegistrationPage; 