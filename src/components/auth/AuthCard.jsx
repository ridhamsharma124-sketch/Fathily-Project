import QuoteBox from "./QuoteBox";

export default function AuthCard({ title, subtitle, children }) {
  return (
    <div className="w-full max-w-[380px] rounded-2xl bg-white p-5 shadow-[0_20px_60px_rgba(15,26,74,0.28)] sm:p-6">
      {title && <h2 className="text-[20px] font-bold text-navy">{title}</h2>}
      {subtitle && <p className="mt-1 text-[13px] text-subtext">{subtitle}</p>}

      <div className="mt-5">{children}</div>

      <div className="mt-5 space-y-4">
        <QuoteBox />
        <p className="text-center text-[12px] text-subtext">
          Authorized access only. Activity is monitored.
        </p>
      </div>
    </div>
  );
}