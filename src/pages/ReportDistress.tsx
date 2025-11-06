import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DistressForm from "@/components/DistressForm";

const ReportDistress = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <DistressForm />
      </main>
      <Footer />
    </div>
  );
};

export default ReportDistress;
