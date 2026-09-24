import { LuBookOpen } from "react-icons/lu";

export default function QuoteBox() {
  return (
    <div className="mt-[16px] flex items-center gap-[12px] rounded-[8px] border border-[#DCE7FA] bg-[#EEF4FF] p-[12px]">
      <LuBookOpen className="shrink-0 text-[#0B1F7A]" size={24} />
      <div>
        <p className="text-[10px] italic leading-relaxed text-[#0B1250]">
          "I can do all things through Christ who strengthens me."
        </p>
        <p className="mt-[2px] text-[10px] font-bold text-[#0B1F7A]">- Philippians 4:13</p>
      </div>
    </div>
  );
}