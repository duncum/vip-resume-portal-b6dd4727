
import ContractAgreement from "@/components/auth/ContractAgreement";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Agreement = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1 flex">
        <ContractAgreement />
      </main>
      <Footer />
    </div>
  );
};

export default Agreement;
