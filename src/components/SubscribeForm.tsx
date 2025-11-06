import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail } from "lucide-react";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("subscribers")
        .insert([{ email }]);

      if (error) {
        if (error.code === "23505") { // Unique constraint violation
          toast.error("This email is already subscribed.");
        } else {
          throw error;
        }
      } else {
        toast.success("Successfully subscribed to alerts!");
        setEmail("");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-card">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary rounded-lg p-2">
            <Mail className="h-5 w-5 text-primary-foreground" />
          </div>
          <CardTitle>Stay Updated</CardTitle>
        </div>
        <CardDescription>
          Subscribe to receive email notifications about new alerts in your area.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SubscribeForm;
