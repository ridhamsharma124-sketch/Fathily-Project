import { useRef, useState } from "react";
import {
  LuChevronDown,
  LuCircleCheck,
  LuCircleX,
  LuMusic,
  LuPlay,
} from "react-icons/lu";
import { Breadcrumb, LocationChip } from "./quizShared";

/* ==========================================================================
   PRIMITIVES USED ONLY BY THE NEW ACTIVITY PAGES
   AddWordSearch / AddChapterAudioStory / AddMemoryVerse
   ========================================================================== */

export const labelClass = "mb-[6px] block text-[12px] font-semibold text-[#0A0847]";

export const inputClass =
  "h-11 w-full rounded-lg border border-[#E5E4EC] bg-white px-4 text-[12px] text-[#0A0847] outline-none transition placeholder:text-[#0A084799] focus:border-[#041581]";

export const outlineButton =
  "flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#041581] bg-white px-6 text-[13px] font-semibold text-[#0A0847] transition-colors hover:bg-[#F1F1F9]";

export const purpleButton =
  "flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#4C1DD6] px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#4318B8]";

/* left (form) card — padding 19px 22px 35px 16px, inner vertical gap 10px */
export const formCardClass =
  "flex w-full flex-col gap-[10px] rounded-lg border border-[#E2DFFC] bg-[#FEFEFF] pt-[19px] pr-[22px] pb-[35px] pl-[16px]";

export const pageShellClass = "min-h-screen bg-[#F9FAFE] font-[Inter] text-[#0A0847]";

export const pageBodyClass = "mx-auto max-w-[1200px] space-y-5 px-5 py-6";

export const cardRowClass = "flex flex-col gap-8 lg:items-stretch lg:flex-row";

export const actionRowClass =
  "mt-6 flex flex-wrap items-center justify-between gap-3";

/* -------------------------------------------------------------------------
   PAGE HEADER — breadcrumb + H1 (+ optional subtitle) + location chip
   ---------------------------------------------------------------------- */
export function ActivityPageHeader({ breadcrumb, title, subtitle }) {
  return (
    <>
      <Breadcrumb items={breadcrumb} />

      <div>
        <h1 className="text-[24px] font-bold text-[#0A0847]">{title}</h1>
        {subtitle && (
          <p className="mt-[6px] text-[14px] text-[#0A084799]">{subtitle}</p>
        )}
      </div>

      <div className="w-full max-w-[533px] [&>div]:w-full">
        <LocationChip />
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------
   FIELDS
   ---------------------------------------------------------------------- */
export function Field({ label, required, htmlFor, children, className = "" }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className={labelClass}>
          {label} {required && <span className="text-[#E11D48]">*</span>}
        </label>
      )}
      {children}
    </div>
  );
}

export function TextInput({
  id,
  value,
  onChange,
  placeholder,
  adornment,
  className = "",
}) {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`${inputClass} ${adornment ? "pr-14" : ""} ${className}`}
      />
      {adornment && (
        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[12px] text-[#0A084799]">
          {adornment}
        </span>
      )}
    </div>
  );
}

export function Select({ id, value, options, onChange, className = "" }) {
  return (
    <div className={`relative w-full ${className}`}>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`${inputClass} cursor-pointer appearance-none pr-10`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <LuChevronDown
        size={16}
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#0A084799]"
        aria-hidden
      />
    </div>
  );
}

/* textarea with the character counter sitting INSIDE, bottom-right */
export function TextArea({
  id,
  value,
  onChange,
  max,
  className = "",
  rows = 3,
}) {
  return (
    <div className="relative">
      <textarea
        id={id}
        rows={rows}
        value={value}
        maxLength={max}
        onChange={onChange}
        className={`w-full resize-none rounded-lg border border-[#E5E4EC] bg-white px-4 pt-3 pb-7 text-[12px] leading-relaxed text-[#0A0847] outline-none transition placeholder:text-[#0A084799] focus:border-[#041581] ${className}`}
      />
      <span className="absolute right-4 bottom-2.5 text-[11px] italic text-[#0A084799]">
        {value.length} / {max}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------
   TOGGLE — navy #0B4FBF track, white knob, w-9 h-5
   ---------------------------------------------------------------------- */
export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-[#0B4FBF]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`absolute top-[2px] h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
          checked ? "left-[18px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

/* -------------------------------------------------------------------------
   IMAGE UPLOAD BOX — click to browse, drag & drop, removable
   ---------------------------------------------------------------------- */
export function ImageUploadBox({
  image,
  onSelect,
  onRemove,
  caption,
  alt,
  width = "max-w-[535px]",
}) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const openPicker = () => inputRef.current?.click();

  const take = (files) => {
    const file = files?.[0];
    if (file && file.type.startsWith("image/")) onSelect(URL.createObjectURL(file));
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label={alt}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPicker();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          take(e.dataTransfer.files);
        }}
        className={`relative h-[194px] w-full ${width} cursor-pointer overflow-hidden rounded-[7.5px] border bg-white transition-colors ${
          image
            ? "border-solid border-[#E2DFFC]"
            : dragActive
              ? "border-dashed border-[#041581]"
              : "border-dashed border-[#E2DFFC]"
        }`}
      >
        {image && (
          <img
            src={image}
            alt={alt}
            className="h-full w-full object-cover"
            draggable={false}
          />
        )}

        {image && (
          <button
            type="button"
            aria-label="Remove image"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute top-3 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white"
          >
            <LuCircleX size={26} className="text-[#0A0847]" aria-hidden />
          </button>
        )}
      </div>

      <p className="mt-2 text-center text-[11px] text-[#0A084799]">
        {caption[0]}
        <br />
        {caption[1]}
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => take(e.target.files)}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------
   AUDIO FILE CARD — header row (icon / name / meta / check) + body slot
   ---------------------------------------------------------------------- */
export const AUDIO_FILE_NAME = "john_3_bulkquiz_2026.csv";
export const AUDIO_FILE_META = "12.4 KB • 25 rows";

export function AudioFileCard({ children }) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-[#E2DFFC] bg-white">
      <div className="flex items-center gap-3 px-4 py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#041581]">
          <LuMusic size={18} className="text-white" aria-hidden />
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-bold text-[#041581]">
            {AUDIO_FILE_NAME}
          </p>
          <p className="text-[11px] text-[#0A084799]">{AUDIO_FILE_META}</p>
        </div>

        <LuCircleCheck size={26} className="shrink-0 text-[#16A34A]" aria-hidden />
      </div>

      <div className="border-t border-[#E2DFFC]">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   WAVEFORM — 60 thin bars, fixed pattern so it never shifts between renders
   ---------------------------------------------------------------------- */
const WAVE_BARS = [
  8, 14, 20, 12, 6, 16, 22, 10, 18, 24, 9, 13, 19, 7, 15, 21, 11, 17, 23, 8, 14, 20,
  12, 6, 16, 22, 10, 18, 24, 9, 13, 19, 7, 15, 21, 11, 17, 23, 8, 14, 20, 12, 6, 16,
  22, 10, 18, 24, 9, 13, 19, 7, 15, 21, 11, 17, 23, 8, 14, 20, 12,
];

export function Waveform() {
  return (
    <div className="flex h-full flex-1 items-center gap-[2px] overflow-hidden">
      {WAVE_BARS.map((height, index) => (
        <span
          key={index}
          style={{ height }}
          className="w-[2px] shrink-0 rounded-full bg-[#8B9BE0]"
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------
   AUDIO PLAYER BAR — h-11, navy play button, waveform, time on the right
   ---------------------------------------------------------------------- */
export function AudioPlayer({ time }) {
  return (
    <div className="flex h-11 w-full items-center gap-3 rounded-lg border border-[#E2DFFC] bg-white px-3">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#041581]">
        <LuPlay size={10} className="ml-[1px] text-white" aria-hidden />
      </span>

      <Waveform />

      <span className="shrink-0 text-[11px] text-[#0A084799]">{time}</span>
    </div>
  );
}
