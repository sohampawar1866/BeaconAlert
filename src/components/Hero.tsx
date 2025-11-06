import { AlertTriangle, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="gradient-hero text-primary-foreground py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Stay Safe, Stay Informed
          </h1>
          <p className="text-lg md:text-xl mb-8 text-primary-foreground/90">
            Report emergencies and missing persons. Help your community stay connected and protected.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/report-distress">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Report Distress
              </Button>
            </Link>
            <Link to="/report-missing">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Users className="mr-2 h-5 w-5" />
                Report Missing Person
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6">
              <AlertTriangle className="h-8 w-8 mx-auto mb-3 text-accent" />
              <h3 className="font-semibold mb-2">Quick Reporting</h3>
              <p className="text-sm text-primary-foreground/80">
                Report emergencies instantly to alert your community
              </p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6">
              <Users className="h-8 w-8 mx-auto mb-3 text-accent" />
              <h3 className="font-semibold mb-2">Find Missing Persons</h3>
              <p className="text-sm text-primary-foreground/80">
                Help locate missing individuals with photo uploads
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
