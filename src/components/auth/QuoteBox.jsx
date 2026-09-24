import { PiQuotes } from "react-icons/pi";

export default function QuoteBox() {
  return (
    <div className="flex gap-2.5 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
      <PiQuotes className="mt-0.5 shrink-0 text-blue-400" size={16} />
      <div>
        <p className="text-[13px] italic leading-relaxed text-navy/80">
          "I can do all things through Christ who strengthens me."
        </p>
        <p className="mt-1 text-[12px] font-semibold text-navy">Philippians 4:13</p>
      </div>
    </div>
  );
}