export const Header = () => {
  return (
    <header className="bg-indigo-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold">Invoice Management App</div>
        <nav className="space-x-4">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/features" className="hover:underline">
            Features
          </a>
          <a href="/pricing" className="hover:underline">
            Pricing
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};
