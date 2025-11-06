import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-primary rounded-lg p-2">
            <AlertTriangle className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Code White</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/feed" className="text-sm font-medium hover:text-primary transition-colors">
            Alert Feed
          </Link>
          <Link to="/report-distress">
            <Button size="sm" variant="default">Report Distress</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
