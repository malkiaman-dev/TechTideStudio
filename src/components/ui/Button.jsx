import React from 'react';

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0";

  const variantClasses = {
    primary:
      "bg-[#fcce00] text-black px-6 py-3 text-[16px] shadow-[0_10px_25px_rgba(252,206,0,0.25)] hover:bg-[#ffd633] hover:shadow-[0_12px_30px_rgba(252,206,0,0.35)]",
    secondary:
      "border border-[#089ff1] bg-transparent text-[#089ff1] px-6 py-3 text-[16px] hover:bg-[#089ff1]/10 hover:shadow-[0_10px_25px_rgba(8,159,241,0.18)]",
    yellow:
      "bg-[#fcce00] text-black px-6 py-3 text-[16px] shadow-[0_10px_25px_rgba(252,206,0,0.25)] hover:bg-[#ffd633] hover:shadow-[0_12px_30px_rgba(252,206,0,0.35)]",
    outline:
      "border border-[#089ff1] bg-transparent text-[#089ff1] px-6 py-3 text-[16px] hover:bg-[#089ff1]/10 hover:shadow-[0_10px_25px_rgba(8,159,241,0.18)]",
  };

  const classes = `${baseClasses} ${
    variantClasses[variant] || variantClasses.primary
  } ${className}`.trim();

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}