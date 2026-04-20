import { useState } from "react";
import {
  Mail,
  Send,
  ArrowRight,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  MapPin,
  Phone,
} from "lucide-react";
import logo from "../assets/techtide-logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Process", href: "#process" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const servicesList = [
    "Web Development",
    "Graphic Design",
    "Digital Marketing",
    "UI/UX Design",
    "Video Editing",
    "Email Marketing",
  ];

  const socialIcons = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="relative bg-black/90 border-t border-white/10 pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#089ff1]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Logo + Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="TechTide Studio"
                className="h-8 w-auto rounded-md object-contain"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Premium digital agency crafting exceptional web experiences,
              creative design, and data‑driven marketing solutions for brands
              that demand excellence.
            </p>
            <div className="flex gap-3 pt-2">
              {socialIcons.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-[#089ff1] hover:text-white hover:border-[#089ff1] transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-[#089ff1] text-sm transition-colors flex items-center gap-1 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">Services</h3>
            <ul className="space-y-2">
              {servicesList.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-white/60 hover:text-[#fcce00] text-sm transition-colors block"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">Newsletter</h3>
            <p className="text-white/60 text-sm mb-4">
              Subscribe to get the latest insights, case studies, and exclusive
              offers delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-3">
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-white/10 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-[#089ff1] transition-colors text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#089ff1] to-[#02a1fe] text-black font-semibold text-sm transition-all duration-300 hover:scale-[1.02]"
              >
                Subscribe
                <Send size={14} />
              </button>
              {subscribed && (
                <p className="text-green-400 text-xs text-center">
                  Thanks for subscribing!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs">
          <div className="flex flex-wrap justify-center gap-4">
            <span>© 2024 TechTide Studio. All rights reserved.</span>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <MapPin size={12} />
              <span>New York, NY</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone size={12} />
              <span>+1 (234) 567-890</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;