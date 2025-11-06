import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Feed from "@/components/Feed";
import SubscribeForm from "@/components/SubscribeForm";

const FeedPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <Feed />
          <SubscribeForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FeedPage;
