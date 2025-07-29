import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BusinessFilters } from "@/components/directory/BusinessFilters";
import { BusinessList } from "@/components/directory/BusinessList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Building2 } from "lucide-react";

const DirectoryPage = () => {
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
  };
  
  const handleClearFilters = () => {
    setFilters({});
  };

  const handleSearch = () => {
    setFilters(prev => ({
      ...prev,
      searchTerm: searchTerm
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-fem-navy mb-2">Business Directory</h1>
                <p className="text-gray-600">Find trusted businesses in our faith community</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 lg:flex-none lg:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search businesses, services, or categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-10"
                  />
                </div>
                <Button onClick={handleSearch} className="bg-fem-terracotta hover:bg-fem-terracotta/90">
                  Search
                </Button>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <Building2 className="w-8 h-8 text-fem-terracotta" />
                  <div>
                    <p className="text-2xl font-bold text-fem-navy">150+</p>
                    <p className="text-sm text-gray-600">Businesses</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <Search className="w-8 h-8 text-fem-gold" />
                  <div>
                    <p className="text-2xl font-bold text-fem-navy">17</p>
                    <p className="text-sm text-gray-600">Categories</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <Search className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold text-fem-navy">95%</p>
                    <p className="text-sm text-gray-600">Verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/4">
              <BusinessFilters 
                onApplyFilters={handleApplyFilters} 
                onClearFilters={handleClearFilters} 
              />
            </div>
            <div className="w-full lg:w-3/4">
              <BusinessList filters={filters} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DirectoryPage;