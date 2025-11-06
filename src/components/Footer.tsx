import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary rounded-lg p-2">
                <AlertTriangle className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold">Code White</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Stay safe, stay informed. Emergency alerts and missing person reports.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/report-distress" className="hover:text-primary transition-colors">
                Report Distress
              </Link>
              <Link to="/report-missing" className="hover:text-primary transition-colors">
                Report Missing Person
              </Link>
              <Link to="/feed" className="hover:text-primary transition-colors">
                Alert Feed
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Emergency</h3>
            <p className="text-sm text-muted-foreground mb-2">
              In case of immediate danger, always call local emergency services first.
            </p>
            <p className="text-2xl font-bold text-accent">911</p>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
