import React from "react";
import { FiSave, FiEye, FiPlus } from "react-icons/fi";
import SaveIcon2 from "../../../../assets/AddQuizIcons/SaveIcon2.svg";

  const SvgIcon = ({ src, size = 16, className = "" }) => (
                 <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
               );
   
   const SaveIcon2Svg = (p) => <SvgIcon src={SaveIcon2} {...p} />;

export default function FormFooter({ onDraft, onPreview, onSubmit }) {
  return (
    <div className="flex flex-wrap justify-end gap-3">
  <button type="button" onClick={onDraft}
    className="w-44 py-2.5 bg-white border border-[#E2DFFC] rounded-md text-xs font-semibold text-[#0A0847] flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer">
    <SaveIcon2Svg size={15} /> Save draft
  </button>
  <button type="button" onClick={onPreview}
    className="w-44 py-2.5 bg-white border border-[#E2DFFC] rounded-md text-xs font-semibold text-[#001984] flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer">
    <FiEye size={15} /> Preview
  </button>
  <button type="button" onClick={onSubmit}
    className="w-44 py-2.5 bg-[#001984] hover:bg-[#001266] text-white rounded-md text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer">
    <FiPlus size={15} /> Add Question
  </button>
</div>
  );
}