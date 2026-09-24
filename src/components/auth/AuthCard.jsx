import QuoteBox from "./QuoteBox";

export default function AuthCard({ title, subtitle, children }) {
  return (
    <div className="relative w-full max-w-[520px]">
      <div
        className="absolute inset-0 -z-10 translate-x-[10px] translate-y-[6px] scale-y-[0.97] rounded-[20px] bg-white/40"
        aria-hidden
      />
      <div className="relative max-h-full w-full overflow-y-auto rounded-[20px] bg-white p-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.12)]">
        {title && <h2 className="mb-[4px] text-[24px] font-bold text-[#0B1250]">{title}</h2>}
        {subtitle && (
          <p className="mb-[16px] max-w-[380px] text-[12px] text-[#5B5F8C]">{subtitle}</p>
        )}

        {children}

        <QuoteBox />
        <p className="mt-[12px] text-center text-[10px] italic text-[#6B7280]">
          Authorized access only. Activity is monitored.
        </p>
      </div>
    </div>
  );
}