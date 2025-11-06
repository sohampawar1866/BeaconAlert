import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Feed from "@/components/Feed";
import SubscribeForm from "@/components/SubscribeForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <Feed />
            <SubscribeForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
