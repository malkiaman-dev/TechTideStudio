export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}) {
  const isCenter = align === "center";

  return (
    <div
      className={`flex max-w-3xl flex-col ${
        isCenter ? "mx-auto items-center text-center" : "items-start"
      }`}
    >
      <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-white/65 backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-brand-yellow shadow-[0_0_16px_rgba(252,206,0,0.75)]" />
        {eyebrow}
      </div>

      <h2 className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62 sm:text-base sm:leading-8">
        {description}
      </p>
    </div>
  );
}