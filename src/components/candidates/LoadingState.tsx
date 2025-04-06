
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface LoadingStateProps {
  message?: string;
}

const LoadingState = ({ message = "Loading candidate details..." }: LoadingStateProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 md:py-12 px-4 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-14 h-14 md:w-16 md:h-16 border-4 border-grey-300 border-t-gold rounded-full animate-spin"></div>
          <p className="mt-4 text-sm md:text-base text-grey-500">{message}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoadingState;
