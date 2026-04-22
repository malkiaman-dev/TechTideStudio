export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus:outline-none";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[#089ff1] to-[#02a1fe] text-black hover:scale-[1.02]",
    yellow:
      "bg-[#fcce00] text-black hover:bg-[#ffd83d] hover:scale-[1.02]",
    outline:
      "border border-white/15 bg-white/5 text-white hover:bg-white/10",
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