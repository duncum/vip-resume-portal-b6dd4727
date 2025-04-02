
const Footer = () => {
  return (
    <footer className="w-full bg-black/80 border-t border-gold/10 py-4 mt-auto">
      <div className="container mx-auto text-center px-2">
        <p className="text-grey-400 text-sm">
          &copy; {new Date().getFullYear()} VIP Employer Portal. All rights reserved.
        </p>
        <p className="text-grey-500 text-xs mt-1">
          All candidate information is confidential.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
