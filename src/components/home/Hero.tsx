
import { Link } from "react-router-dom";
import { Search, ArrowRight, Sparkles, Users, Briefcase, Target, Globe, Zap, Plus, Heart, Star } from "lucide-react";
import ThreeDModel from "@/components/3d/ThreeDModel";
import Interactive3DButton from "@/components/3d/Interactive3DButton";
import FloatingCard from "@/components/3d/FloatingCard";
import ParticleField from "@/components/3d/ParticleField";
import Typography3D from "@/components/3d/Typography3D";
import Infographic3D from "@/components/3d/Infographic3D";

export const Hero = () => {
  const statsData = [
    { label: "Active Jobs", value: 150, color: "#FFBD59", icon: <Briefcase className="w-5 h-5" /> },
    { label: "Members", value: 500, color: "#C84B31", icon: <Users className="w-5 h-5" /> },
    { label: "Success Rate", value: 98, color: "#FFD68A", icon: <Star className="w-5 h-5" /> }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-fem-navy via-fem-navy/98 to-fem-navy/95 overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0">
        <ParticleField count={60} />
        
        {/* Elegant mesh gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-fem-gold/5 via-transparent to-fem-terracotta/5" />
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-radial from-fem-gold/10 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-radial from-fem-terracotta/8 to-transparent rounded-full blur-3xl animate-float" />
        </div>
        
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-20 left-20 w-32 h-32 border border-fem-gold/20 rotate-45" />
          <div className="absolute bottom-40 right-32 w-24 h-24 border border-fem-terracotta/20 rotate-12" />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-fem-gold/30 rotate-45" />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="min-h-screen flex flex-col justify-center py-20">
          
          {/* Header Badge */}
          <div className="text-center mb-12 animate-fade-in">
            <FloatingCard className="inline-block" glassEffect intensity={0.7}>
              <div className="px-8 py-4 rounded-full">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-fem-gold animate-pulse" />
                  <span className="text-white font-semibold text-lg">FEM Family Church • Career Connect</span>
                  <Sparkles className="w-5 h-5 text-fem-gold" />
                </div>
              </div>
            </FloatingCard>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-16 items-center mb-24">
            
            {/* Left Content - 7 columns */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Main Headline */}
              <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Typography3D variant="hero" className="leading-[1.1] max-w-4xl" animated>
                  <div className="space-y-3">
                    <div className="text-white font-light">Discover Your</div>
                    <div className="font-bold bg-gradient-to-r from-fem-gold via-fem-terracotta to-fem-gold bg-clip-text text-transparent">
                      Divine Purpose
                    </div>
                    <div className="text-white/90 text-5xl lg:text-6xl font-medium">
                      Through Meaningful Work
                    </div>
                  </div>
                </Typography3D>
              </div>

              {/* Subtitle */}
              <div className="animate-fade-in max-w-2xl" style={{ animationDelay: '0.4s' }}>
                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-light">
                  Connect with opportunities that align with your faith, values, and calling within our thriving Kenya community.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <Link to="/jobs" className="group">
                  <Interactive3DButton variant="primary" size="lg" className="px-10 py-5 text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-6 h-6" />
                      Explore Opportunities
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </Interactive3DButton>
                </Link>
                
                <Link to="/post-job" className="group">
                  <Interactive3DButton variant="glass" size="lg" className="px-10 py-5 text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <Plus className="w-6 h-6" />
                      Post a Position
                      <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </Interactive3DButton>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-8 pt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[1,2,3,4,5].map(i => (
                      <div 
                        key={i} 
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-fem-gold to-fem-terracotta border-3 border-white shadow-lg" 
                      />
                    ))}
                  </div>
                  <div>
                    <div className="text-white font-semibold">500+ Members</div>
                    <div className="text-gray-400 text-sm">Active Community</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Globe className="w-8 h-8 text-fem-gold" />
                  <div>
                    <div className="text-white font-semibold">Kenya-wide</div>
                    <div className="text-gray-400 text-sm">Network Reach</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual - 5 columns */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-[500px] lg:h-[650px] animate-fade-in" style={{ animationDelay: '0.3s' }}>
                
                {/* Main 3D Model */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <ThreeDModel 
                    type="city" 
                    className="w-full h-full transform hover:scale-105 transition-transform duration-700" 
                    interactive={true} 
                  />
                  
                  {/* Gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-fem-navy/20 via-transparent to-transparent rounded-3xl" />
                </div>

                {/* Floating Stats Cards */}
                <div className="absolute -top-8 -left-8 animate-float">
                  <FloatingCard className="p-6 rounded-2xl" glassEffect>
                    <div className="text-center">
                      <Zap className="w-8 h-8 text-fem-gold mx-auto mb-3" />
                      <div className="text-3xl font-bold text-white mb-1">98%</div>
                      <div className="text-sm text-gray-300">Success Rate</div>
                    </div>
                  </FloatingCard>
                </div>

                <div className="absolute -bottom-8 -right-8 animate-float-slow">
                  <FloatingCard className="p-6 rounded-2xl" glassEffect>
                    <div className="text-center">
                      <Target className="w-8 h-8 text-fem-gold mx-auto mb-3" />
                      <div className="text-3xl font-bold text-white mb-1">150+</div>
                      <div className="text-sm text-gray-300">Active Jobs</div>
                    </div>
                  </FloatingCard>
                </div>

                <div className="absolute top-1/2 -left-6 animate-float-fast">
                  <FloatingCard className="p-4 rounded-xl" glassEffect>
                    <div className="flex items-center gap-3">
                      <Heart className="w-6 h-6 text-fem-gold" />
                      <div className="text-white text-sm font-semibold">Faith-Based</div>
                    </div>
                  </FloatingCard>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Search Section */}
          <div className="max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '1s' }}>
            <FloatingCard className="rounded-3xl" glassEffect intensity={0.9}>
              <div className="p-8 lg:p-12">
                <div className="text-center mb-8">
                  <Typography3D variant="heading" className="mb-4">
                    Find Your Perfect Divine Match
                  </Typography3D>
                  <p className="text-gray-300 text-lg">Discover opportunities that align with your faith and calling</p>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 relative group">
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 group-focus-within:text-fem-gold transition-colors" />
                    <input
                      type="text"
                      placeholder="Search by role, ministry, or divine calling..."
                      className="w-full pl-16 pr-6 py-5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-fem-gold/50 focus:border-fem-gold/50 transition-all text-lg"
                    />
                  </div>
                  <Interactive3DButton variant="primary" className="px-10 py-5 text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      Search Divine Opportunities
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </Interactive3DButton>
                </div>
              </div>
            </FloatingCard>
          </div>

          {/* Stats Section */}
          <div className="mt-32 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <div className="text-center mb-16">
              <Typography3D variant="heading" className="mb-6">
                Community Impact & Growth
              </Typography3D>
              <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
                Transforming lives through meaningful faith-based connections and divine purpose alignment
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Infographic3D 
                data={statsData}
                type="bar"
                className="rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
