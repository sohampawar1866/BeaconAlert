import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Phone } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface DistressMessage {
  id: number;
  name: string;
  contact: string;
  location: string;
  message: string;
  severity: number;
  created_at: string;
}

const Feed = () => {
  const [messages, setMessages] = useState<DistressMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("distress_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: number) => {
    if (severity >= 4) return "bg-destructive text-destructive-foreground";
    if (severity >= 3) return "bg-accent text-accent-foreground";
    return "bg-secondary text-secondary-foreground";
  };

  const getSeverityLabel = (severity: number) => {
    const labels = ["", "Minor", "Moderate", "Serious", "Severe", "Critical"];
    return labels[severity] || "Unknown";
  };

  if (loading) {
    return <div className="text-center py-12">Loading alerts...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="h-6 w-6 text-accent" />
        <h2 className="text-2xl font-bold">Recent Distress Alerts</h2>
      </div>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No distress alerts at this time.
          </CardContent>
        </Card>
      ) : (
        messages.map((msg) => (
          <Card key={msg.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{msg.name}</CardTitle>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <span className="inline-block h-4 w-4" aria-hidden />
                      {msg.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {msg.contact}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                    </div>
                  </div>
                </div>
                <Badge className={getSeverityColor(msg.severity)}>
                  Level {msg.severity} - {getSeverityLabel(msg.severity)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{msg.message}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Feed;
