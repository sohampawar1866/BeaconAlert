import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

const DistressForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    location: "",
    message: "",
    severity: "3",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("distress_messages")
        .insert([{
          name: formData.name,
          contact: formData.contact,
          location: formData.location,
          message: formData.message,
          severity: parseInt(formData.severity),
        }]);

      if (error) throw error;

      toast.success("Distress report submitted successfully");
      navigate("/feed");
    } catch (error) {
      console.error("Error submitting distress report:", error);
      toast.error("Failed to submit report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-accent rounded-lg p-2">
            <AlertTriangle className="h-6 w-6 text-accent-foreground" />
          </div>
          <CardTitle className="text-2xl">Report Distress</CardTitle>
        </div>
        <CardDescription>
          Submit an emergency alert to notify your community. For immediate danger, call 911 first.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact Information</Label>
            <Input
              id="contact"
              type="tel"
              placeholder="Phone number or email"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Where is the emergency?"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="severity">Severity Level</Label>
            <Select value={formData.severity} onValueChange={(value) => setFormData({ ...formData, severity: value })}>
              <SelectTrigger id="severity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Level 1 - Minor</SelectItem>
                <SelectItem value="2">Level 2 - Moderate</SelectItem>
                <SelectItem value="3">Level 3 - Serious</SelectItem>
                <SelectItem value="4">Level 4 - Severe</SelectItem>
                <SelectItem value="5">Level 5 - Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Describe the situation..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DistressForm;
