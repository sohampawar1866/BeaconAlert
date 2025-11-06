import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MissingPersonForm from "@/components/MissingPersonForm";

const ReportMissing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <MissingPersonForm />
      </main>
      <Footer />
    </div>
  );
};

export default ReportMissing;
