
const Footer = () => {
  return (
    <footer className="w-full bg-grey-100 py-4 mt-auto">
      <div className="container mx-auto text-center px-2">
        <p className="text-grey-500 text-sm">
          &copy; {new Date().getFullYear()} Candidate Resume Portal. All rights reserved.
        </p>
        <p className="text-grey-400 text-xs mt-1">
          All resumes and candidate information are confidential.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
