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
import { Users, Upload } from "lucide-react";

const MissingPersonForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    full_name: "",
    age: "",
    gender: "",
    description: "",
    last_seen: "",
    contact: "",
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoUrl = "";

      // Upload photo if provided
      if (photoFile) {
        const fileExt = photoFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('missing-persons')
          .upload(fileName, photoFile);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('missing-persons')
          .getPublicUrl(fileName);
        
        photoUrl = publicUrl;
      }

      const { error } = await supabase
        .from("missing_persons")
        .insert([{
          full_name: formData.full_name,
          age: parseInt(formData.age),
          gender: formData.gender,
          description: formData.description,
          last_seen: formData.last_seen,
          contact: formData.contact,
          photo_url: photoUrl,
        }]);

      if (error) throw error;

  toast.success("Missing person report submitted successfully");
  navigate("/feed");
    } catch (error) {
      console.error("Error submitting missing person report:", error);
      toast.error("Failed to submit report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary rounded-lg p-2">
            <Users className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Report Missing Person</CardTitle>
        </div>
        <CardDescription>
          Help us locate a missing person by providing as much detail as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              placeholder="Enter full name"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Physical Description *</Label>
            <Textarea
              id="description"
              placeholder="Height, weight, hair color, clothing, distinguishing features..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="last_seen">Last Seen Location *</Label>
            <Input
              id="last_seen"
              placeholder="Where were they last seen?"
              value={formData.last_seen}
              onChange={(e) => setFormData({ ...formData, last_seen: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Your Contact Information *</Label>
            <Input
              id="contact"
              placeholder="Phone number or email"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">Upload Photo</Label>
            <div className="flex items-center gap-4">
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="cursor-pointer"
              />
              {photoFile && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Upload className="h-4 w-4" />
                  {photoFile.name}
                </div>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MissingPersonForm;
