import React from "react";
import { FiFileText, FiLayers, FiImage, FiClock } from "react-icons/fi";
import AiTimeIcon from "../../../../../assets/AddQuizIcons/AiTimeIcon.svg";
import AiImageIcon from "../../../../../assets/AddQuizIcons/AiImageIcon.svg";
import AiFileIcon from "../../../../../assets/AddQuizIcons/AiFileIcon.svg";
import AiLayerIcon from "../../../../../assets/AddQuizIcons/AiLayerIcon.svg";

  const SvgIcon = ({ src, size = 16, className = "" }) => (
                 <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
               );
   
   const AiTimeIconSvg = (p) => <SvgIcon src={AiTimeIcon} {...p} />;
   const AiImageIconSvg = (p) => <SvgIcon src={AiImageIcon} {...p} />;
   const AiFileIconSvg = (p) => <SvgIcon src={AiFileIcon} {...p} />;
   const AiLayerIconSvg = (p) => <SvgIcon src={AiLayerIcon} {...p} />;

export default function AISummary({ reg, s }) {
  const pass = reg.levelMode === "passages";
  const on = pass ? s.passages.filter((p) => p.on) : [];
  const total = pass ? on.reduce((a, p) => a + Number(p.n || 0), 0) : s.count;
  const levels = pass ? on.length : s.levels.length;
  const cells = [
    [AiFileIconSvg, String(total).padStart(2, "0"), "Total Questions"],
    [AiLayerIconSvg, String(levels).padStart(2, "0"), "Selected Levels"],
    [AiImageIconSvg, String(s.images ? total : 0).padStart(2, "0"), "Generated Images"],
    [AiTimeIconSvg, `~${Math.round(total * 1.5)} min`, "Estimated Review Time"],
  ];
  return (
    <div className="mt-6 pt-5 border-t border-[#E2DFFC]">
      <h4 className="text-sm font-semibold text-[#0A0847] mb-3">Generation Summary</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border border-[#E2DFFC] rounded-md p-4">
        {cells.map(([Icon, v, l]) => (
          <div key={l}>
            <p className="flex items-center gap-2 text-sm font-semibold text-[#0A0847]"><Icon size={16} className="text-[#001984]" /> {v}</p>
            <p className="text-[11px] text-[#0A084799] font-medium mt-1">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}