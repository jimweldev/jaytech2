const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo + About */}
          <div>
            <h2 className="text-white text-xl font-bold mb-3">JayTech</h2>
            <p className="text-sm leading-relaxed">
              Your trusted partner for premium upgrades and reliable repairs. 
              We keep your ride and devices performing at their best.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-white transition">Services</a></li>
              <li><a href="#tracker" className="hover:text-white transition">Track Repairs</a></li>
              <li><a href="#about" className="hover:text-white transition">About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">Get in Touch</h3>
            <p className="text-sm mb-2">📍 Manila, Philippines</p>
            <p className="text-sm mb-2">📧 support@jaytech.com</p>
            <p className="text-sm">📞 +63 912 345 6789</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} JayTech. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
