import React from 'react';

const Button = ({ children, href, variant = 'primary', className = '', onClick }) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base";
  
  const variants = {
    primary: "bg-[#089ef0] text-black hover:bg-[#02a1fe] hover:scale-105 shadow-lg shadow-[#089ef0]/20",
    secondary: "border border-[#089ef0] text-[#089ef0] hover:bg-[#089ef0]/10 hover:scale-105",
    outline: "border border-white/30 text-white hover:border-[#089ef0] hover:text-[#089ef0] hover:bg-[#089ef0]/5",
    ghost: "text-white/70 hover:text-[#089ef0] hover:bg-white/5",
    yellow: "bg-[#fcce00] text-black hover:bg-[#fcce00]/80 hover:scale-105 shadow-lg shadow-[#fcce00]/20",
  };
  
  const combined = `${baseClasses} ${variants[variant]} ${className}`;
  
  if (href) {
    return (
      <a href={href} className={combined}>
        {children}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={combined}>
      {children}
    </button>
  );
};

export default Button;