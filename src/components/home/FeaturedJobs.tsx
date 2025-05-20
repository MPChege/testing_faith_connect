
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for featured jobs
const featuredJobs = [
  {
    id: 1,
    title: "Senior Painter",
    company: "CreativeSpaces Co.",
    location: "Los Angeles, CA",
    locationType: "On-site",
    salary: "KSH 25,000 - KSH 35,000 per month",
    postedDate: "3 days ago",
    description: "We're looking for an experienced painter to join our team for residential and commercial projects.",
    logo: "https://res.cloudinary.com/dqxzuiaj2/image/upload/v1/media/photos/function_uuid4_at_0x7fdc1b0fdaf0_sbn1im",
    tags: ["Full-time", "Experienced"]
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "TechFaith Solutions",
    location: "Remote",
    locationType: "Remote",
    salary: "KSH 85,000 - KSH 110,000 per month",
    postedDate: "1 week ago",
    description: "Join our development team to create applications that serve our church community.",
    logo: "https://res.cloudinary.com/dqxzuiaj2/image/upload/v1/media/photos/function_uuid4_at_0x7fea31a87af0_qryz7q",
    tags: ["Full-time", "Mid-Level"]
  },
  {
    id: 3,
    title: "Youth Ministry Coordinator",
    company: "FEM Family Church",
    location: "Atlanta, GA",
    locationType: "Hybrid",
    salary: "KSH 45,000 - KSH 55,000 per month",
    postedDate: "2 days ago",
    description: "Passionate about guiding youth? Help coordinate our church's youth programs and activities.",
    logo: "/lovable-uploads/f1a3f2a4-bbe7-46e5-be66-1ad39e35defa.png",
    tags: ["Full-time", "Entry-Level"]
  },
  {
    id: 4,
    title: "Administrative Assistant",
    company: "Grace Accounting",
    location: "Chicago, IL",
    locationType: "On-site",
    salary: "KSH 18,000 - KSH 22,000 per month",
    postedDate: "5 days ago",
    description: "Support our accounting team with administrative tasks. Great opportunity for organized individuals.",
    logo: "https://res.cloudinary.com/dqxzuiaj2/image/upload/v1/media/photos/function_uuid4_at_0x7fea31a87af0_zovtfy",
    tags: ["Part-time", "Entry-Level"]
  }
];

export const FeaturedJobs = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-fem-navy">Featured Opportunities</h2>
          <Link 
            to="/jobs" 
            className="text-fem-terracotta hover:text-fem-terracotta/80 font-medium hidden md:inline-flex items-center"
          >
            View all jobs
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredJobs.map((job, index) => (
            <div 
              key={job.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover-card-effect animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={job.logo} 
                    alt={`${job.company} logo`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg text-fem-navy">{job.title}</h3>
                    <span className="text-xs text-gray-500">{job.postedDate}</span>
                  </div>
                  
                  <p className="text-fem-darkgray">{job.company}</p>
                  
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <span>{job.location}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                    <span>{job.locationType}</span>
                  </div>
                  
                  <p className="mt-3 text-sm text-gray-600 line-clamp-2">{job.description}</p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-2">
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-fem-gold/10 text-fem-navy border-fem-gold/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm font-medium text-fem-terracotta">{job.salary}</div>
                  </div>
                  
                  <div className="mt-4 flex gap-3">
                    <Button asChild variant="outline" size="sm" className="flex-1 border-fem-navy text-fem-navy hover:bg-fem-navy hover:text-white">
                      <Link to={`/jobs/${job.id}`}>View Details</Link>
                    </Button>
                    <Button asChild size="sm" className="flex-1 bg-fem-terracotta hover:bg-fem-terracotta/90 text-white">
                      <Link to={`/jobs/${job.id}/apply`}>Apply Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link to="/jobs">
            <Button variant="outline" className="border-fem-terracotta text-fem-terracotta hover:bg-fem-terracotta hover:text-white">
              View All Jobs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
