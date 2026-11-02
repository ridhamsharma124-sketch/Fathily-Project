import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import harpImage from "../../../assets/harp.webp";
import ruinsImage from "../../../assets/ruins.webp";
import floppyIcon from "../../../assets/addhistory/floppy.png";
import eyeIcon from "../../../assets/addhistory/eye.png";
import {
  PiArrowCircleRight,
  PiArrowRight,
  PiBookmarkSimple,
  PiCalendarBlank,
  PiCaretDown,
  PiClock,
  PiLink,
  PiListBullets,
  PiPlay,
  PiTextAlignJustify,
  PiTextB,
  PiTextItalic,
  PiTextUnderline,
  PiUploadSimple,
  PiWarningCircle,
  PiXCircle,
} from "react-icons/pi";
import replaceIcon from "../../../assets/addhistory/replace.png";
import trashIcon from "../../../assets/addhistory/trash.png";
import lockIcon from "../../../assets/addhistory/lock.png";
import pencilIcon from "../../../assets/addhistory/pencil.png";
import heartIcon from "../../../assets/addhistory/heart.png";
import checkIcon from "../../../assets/addhistory/check.png";
import speedIcon from "../../../assets/addhistory/speed.png";
import clockIcon from "../../../assets/addhistory/clock.png";
import speakerIcon from "../../../assets/speaker1.svg";

/* ==========================================================================
   SHARED STYLES
   ========================================================================== */
const inputCls =
  "h-[40px] w-full rounded-[6px] border border-[#E5E7EB] bg-white px-[12px] text-[12px] text-[#0B1250] outline-none transition placeholder:text-[#6B7280] focus:border-[#0B1F7A]";

const s1InputBase =
  "w-full rounded-[7.47px] border border-[#E2DFFC] bg-white px-[12px] text-[12px] font-medium text-[#0A0847] outline-none transition placeholder:text-[#0A084799] focus:border-[#001984]";
const s1Input = `h-[46px] ${s1InputBase}`;
const s1Ta =
  "w-full rounded-[7.47px] border border-[#E2DFFC] bg-white px-[12px] py-[10px] text-[12px] font-medium text-[#0A0847] outline-none transition placeholder:text-[#0A084799] focus:border-[#001984]";
const s1Label = "mb-[10px] block text-[12px] font-semibold text-[#0A0847]";
const prayerLabel =
  "mb-[6px] block font-inter text-[12px] font-semibold leading-none tracking-[0em] text-[#0A0847CC]";

const schedLabel = "mb-[8px] block text-[13px] font-semibold text-[#0A0847]";
const schedInput =
  "h-[48px] w-full rounded-[8px] border border-[#E2DFFC] bg-white text-[14px] font-medium text-[#0A0847] outline-none transition focus:border-[#001984]";

/* ==========================================================================
   REUSABLE HELPERS
   ========================================================================== */
function Card({ className = "", children }) {
  return (
    <div className={`rounded-[10px] border border-[#E5E7EB] bg-white p-4 sm:p-[20px] ${className}`}>
      {children}
    </div>
  );
}

function S1Card({ className = "", pad = "p-4 sm:p-[28px]", children }) {
  return (
    <div
      className={`rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white ${pad} ${className}`}
    >
      {children}
    </div>
  );
}

function Field({ label, className = "", labelClassName = "", children }) {
  const labelCls =
    labelClassName || "mb-[6px] block text-[12px] font-semibold text-[#0B1250]";
  return (
    <div className={className}>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange, label = "" }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex cursor-pointer items-center gap-[8px]"
    >
      <span
        className={`inline-flex h-[18px] w-[32px] shrink-0 items-center rounded-full p-[2px] transition ${
          checked ? "bg-[#0B1F7A]" : "bg-[#E5E7EB]"
        }`}
      >
        <span
          className={`h-[14px] w-[14px] rounded-full bg-white shadow transition ${
            checked ? "translate-x-[14px]" : "translate-x-0"
          }`}
        />
      </span>
      {label && <span className="text-[12px] font-medium text-[#0B1250]">{label}</span>}
    </button>
  );
}

function S1Toggle({ checked, onChange, label = "" }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex cursor-pointer items-center gap-[8px]"
    >
      <span
        className={`inline-flex h-[18px] w-[32px] shrink-0 items-center rounded-full p-[2px] transition ${
          checked ? "bg-[#001984]" : "bg-[#E2DFFC]"
        }`}
      >
        <span
          className={`h-[14px] w-[14px] rounded-full bg-white shadow transition ${
            checked ? "translate-x-[14px]" : "translate-x-0"
          }`}
        />
      </span>
      {label && <span className="text-[12px] font-medium text-[#0A0847]">{label}</span>}
    </button>
  );
}

function SchedToggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex cursor-pointer items-center gap-[10px]"
    >
      <span
        className={`inline-flex h-[22px] w-[38px] shrink-0 items-center rounded-full p-[3px] transition ${
          checked ? "bg-[#001984]" : "bg-[#D9DBEA]"
        }`}
      >
        <span
          className={`h-[16px] w-[16px] rounded-full bg-white shadow transition ${
            checked ? "translate-x-[16px]" : "translate-x-0"
          }`}
        />
      </span>
      <span className="text-[13px] font-semibold text-[#0A0847]">{label}</span>
    </button>
  );
}

function SelectBox({ value, onChange, options = [], className = "", compact = false, large = false }) {
  const hCls = large ? "h-[44px]" : compact ? "h-[32px]" : "h-[40px]";
  const plCls = large ? "pl-[14px]" : "pl-[12px]";
  return (
    <span className={`relative block ${className}`}>
      <select
        value={value}
        onChange={onChange}
        className={`${hCls} w-full cursor-pointer appearance-none rounded-[6px] border border-[#E5E7EB] bg-white ${plCls} pr-[28px] text-[12px] text-[#0B1250] outline-none transition focus:border-[#0B1F7A]`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <PiCaretDown
        size={12}
        className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2 text-[#5B5F8C]"
      />
    </span>
  );
}

function S1Select({
  value,
  onChange,
  options = [],
  className = "",
  height = "h-[46px]",
  arrowRight = "right-[12px]",
}) {
  return (
    <span className={`relative block ${className}`}>
      <select
        value={value}
        onChange={onChange}
        className={`${height} w-full cursor-pointer appearance-none rounded-[7.47px] border border-[#E2DFFC] bg-white pl-[12px] pr-[36px] text-[12px] font-medium text-[#0A0847] outline-none transition focus:border-[#001984]`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <span
        className={`pointer-events-none absolute ${arrowRight} top-1/2 flex h-[18px] w-[18px] -translate-y-1/2 items-center justify-center`}
      >
        <svg width="7.5" height="4.84" viewBox="0 0 8 5" fill="none" aria-hidden="true">
          <path
            d="M0.7 0.7L4 4.1L7.3 0.7"
            stroke="#0A0847"
            strokeOpacity="0.6"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  );
}

function Checkbox({ checked, onChange, label, labelClass = "" }) {
  return (
    <label className="flex cursor-pointer items-center gap-[8px]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-[16px] w-[16px] cursor-pointer rounded-[3px] border border-[#6B7280] accent-[#0B1F7A]"
      />
      <span className={`text-[12px] font-medium text-[#0B1250] ${labelClass}`}>{label}</span>
    </label>
  );
}

function S1Checkbox({ checked, onChange, label, labelClass = "" }) {
  return (
    <label className="flex cursor-pointer items-center gap-[10px]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-[20px] w-[20px] shrink-0 cursor-pointer rounded-[3px] border border-[#E2DFFC] accent-[#001984]"
      />
      <span className={`text-[12px] font-semibold text-[#0A0847] ${labelClass}`}>{label}</span>
    </label>
  );
}

function LockGlyph({ className = "h-[18px] w-[14.34375px]" }) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-[#0A0847] ${className}`}
      style={{
        WebkitMaskImage: `url(${lockIcon})`,
        maskImage: `url(${lockIcon})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

function RichTextBox({ value, onChange, rows = 5 }) {
  const tools = [
    { Icon: PiTextB, label: "Bold" },
    { Icon: PiTextItalic, label: "Italic" },
    { Icon: PiTextUnderline, label: "Underline" },
    { Icon: PiCaretDown, label: "Font size" },
    { Icon: PiLink, label: "Link" },
    { Icon: PiListBullets, label: "List" },
  ];
  return (
    <div className="overflow-hidden rounded-[6px] border border-[#E5E7EB]">
      <div className="flex flex-wrap items-center gap-[4px] border-b border-[#E5E7EB] bg-[#F3F4F8] px-[8px] py-[6px]">
        {tools.map(({ Icon, label }) => (
          <button
            key={label}
            type="button"
            title={label}
            aria-label={label}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[4px] text-[#0B1250] transition hover:bg-[#E5E7EB]"
          >
            <Icon size={13} />
          </button>
        ))}
      </div>
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full resize-none bg-white px-[12px] py-[10px] text-[12px] leading-[1.5] text-[#0B1250] outline-none placeholder:text-[#6B7280]"
      />
    </div>
  );
}

function S1RichTextBox({ value, onChange }) {
  const seg =
    "flex cursor-pointer items-center justify-center text-[#333333] transition hover:bg-[#E4E4E4]";
  return (
    <div className="overflow-hidden rounded-[7.47px] border border-[#E2DFFC] bg-white">
      <div className="border-b border-[#E2DFFC] px-[12px] py-[11px] sm:px-[21px]">
        <div className="inline-flex h-[26px] items-stretch divide-x divide-[#C9C9C9] overflow-hidden rounded-[4px] border border-[#B5B5B5] bg-[#EFEFEF]">
          <button type="button" title="Bold" aria-label="Bold" className={`${seg} w-[34px] text-[15px] font-bold`}>
            B
          </button>
          <button type="button" title="Italic" aria-label="Italic" className={`${seg} w-[32px] font-serif text-[15px] italic`}>
            I
          </button>
          <button type="button" title="Underline" aria-label="Underline" className={`${seg} w-[46px] gap-[6px] text-[15px] underline`}>
            U
            <PiCaretDown size={8} weight="fill" />
          </button>
          <button type="button" title="Link" aria-label="Link" className={`${seg} w-[32px]`}>
            <PiLink size={14} />
          </button>
          <button type="button" title="Align" aria-label="Align" className={`${seg} w-[33px]`}>
            <PiTextAlignJustify size={14} />
          </button>
        </div>
      </div>
      <textarea
        value={value}
        onChange={onChange}
        className="block h-[93px] w-full resize-none bg-white px-[16px] pb-[18px] pt-[18px] text-[12px] font-semibold leading-[1.3] text-[#0A084799] outline-none placeholder:text-[#0A084799] sm:px-[20px]"
      />
    </div>
  );
}

function AudioPlayer({ time, fill, rightTime = false, s1 = false }) {
  const wrapCls = s1
    ? "mt-[12px] flex h-[55px] items-center gap-[10px] rounded-[7.47px] border border-[#E4E2FF] bg-[#F3F3FF] px-[12px]"
    : "mt-[12px] flex items-center gap-[10px] rounded-[6px] border border-[#E5E7EB] bg-[#EEF0FB] p-[10px]";
  const playCls = s1
    ? "flex h-[28px] w-[28px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#001984] text-white transition hover:bg-[#001266]"
    : "flex h-[28px] w-[28px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#0B1F7A] text-white transition hover:bg-[#0a1c68]";
  const fillCls = s1
    ? "absolute inset-y-0 left-0 rounded-full bg-[#001984]"
    : "absolute inset-y-0 left-0 rounded-full bg-[#0B1F7A]";
  return (
    <div className={wrapCls}>
      <button type="button" aria-label="Play" className={playCls}>
        <PiPlay size={14} weight="fill" />
      </button>
      <span className="shrink-0 text-[11px] font-medium text-[#0B1250]">{time}</span>
      <img src={speakerIcon} alt="" className="h-[15px] w-[15px] shrink-0" />
      <div className="relative h-[6px] flex-1 rounded-full bg-[#D9D9E6]">
        <div className={fillCls} style={{ width: fill }} />
      </div>
      <img src={speakerIcon} alt="" className="h-[15px] w-[15px] shrink-0" />
      {rightTime && <span className="shrink-0 text-[11px] font-medium text-[#0B1250]">{time}</span>}
    </div>
  );
}

/* ==========================================================================
   TOP HEADER + STEPPER
   ========================================================================== */
const headerOutlineBtn =
  "flex h-[43px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[8px] border border-[#E2DFFC] bg-[#FEFEFE] px-[12px] text-[14px] font-semibold text-[#0A0847] transition hover:bg-[#F8FAFC] sm:w-auto";
const headerPrimaryBtn =
  "flex h-[42px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-[8px] bg-[#001984] text-[14px] font-semibold text-white transition hover:bg-[#001266] sm:w-[160px]";

function TopHeader({ step, setStep }) {
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-[20px] font-semibold text-[#0A0847] sm:text-[22px]">
          Add Historical Story
        </h1>
        <div className="grid grid-cols-1 gap-[8px] sm:flex sm:flex-wrap sm:items-center">
          <button type="button" className={`${headerOutlineBtn} !text-[#0A0847CC]`}>
            <img src={floppyIcon} alt="" className="h-[20px] w-[20px] shrink-0" />
            Save draft
          </button>
          <button type="button" className={headerOutlineBtn}>
            <img src={eyeIcon} alt="" className="h-[18px] w-[18px] shrink-0" />
            Preview All 3 Screens
          </button>
          {step === 1 ? (
            <button type="button" onClick={() => setStep(2)} className={headerPrimaryBtn}>
              Next <PiArrowRight size={18} />
            </button>
          ) : (
            <button type="button" className={headerPrimaryBtn}>
              Schedule Story
            </button>
          )}
        </div>
      </div>

      {/* Stepper: wraps on mobile, connector shrinks */}
      <div className="flex flex-wrap items-center gap-x-[12px] gap-y-[10px]">
        <div className="flex min-w-0 items-center gap-[8px]">
          <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#001984] text-[14px] font-semibold text-white">
            1
          </span>
          <span className="text-[14px] font-semibold text-[#0A0847]">Homepage & Story</span>
        </div>
        <span className="h-px w-[32px] shrink-0 bg-[#0019841A] sm:w-[135px]" />
        <div className="flex min-w-0 items-center gap-[8px]">
          <span
            className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full text-[14px] font-semibold transition ${
              step === 2 ? "bg-[#001984] text-white" : "bg-[#E2DFFC] text-[#0A084799]"
            }`}
          >
            2
          </span>
          <span
            className={`text-[14px] font-semibold transition ${
              step === 2 ? "text-[#0A0847]" : "text-[#0A084799]"
            }`}
          >
            Prayer & Completion
          </span>
        </div>
      </div>
    </>
  );
}

/* ==========================================================================
   STEP 1 — HOMEPAGE & STORY
   ========================================================================== */
function StepOne({ v, upd, setStep, navigate }) {
  const [cardImage, setCardImage] = useState(ruinsImage);
  const [mediaImage, setMediaImage] = useState(harpImage);
  const cardImageRef = useRef(null);
  const mediaImageRef = useRef(null);

  const handleCardImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setCardImage(URL.createObjectURL(file));
    e.target.value = "";
  };
  const handleMediaImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setMediaImage(URL.createObjectURL(file));
    e.target.value = "";
  };

  const audioActionBtn =
    "flex h-[39px] cursor-pointer items-center justify-center gap-[8px] rounded-[7.47px] border border-[#E2DFFC] bg-white text-[14px] font-medium text-[#0A0847CC] transition hover:bg-[#F8FAFC]";
  const uploadReplaceBtn =
    "flex h-[46px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[7.47px] border border-[#001984] bg-white text-[14px] font-medium text-[#001984] transition hover:bg-[#001984]/5";

  return (
    <div className="flex flex-col gap-[26px]">
      {/* Card 1: Schedule & Display */}
      <S1Card pad="p-4 sm:p-[30px]">
        <div className="flex items-center gap-[14px]">
          <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[8px] bg-[#EEEEFB]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
              <rect x="3" y="4.5" width="18" height="16.5" rx="3" stroke="#2F2FE0" strokeWidth="2" />
              <path d="M8 2.5V6M16 2.5V6M3 9.5h18" stroke="#2F2FE0" strokeWidth="2" strokeLinecap="round" />
              <circle cx="8" cy="13.5" r="1.3" fill="#2F2FE0" />
              <circle cx="12" cy="13.5" r="1.3" fill="#2F2FE0" />
              <circle cx="16" cy="13.5" r="1.3" fill="#2F2FE0" />
              <circle cx="8" cy="17.5" r="1.3" fill="#2F2FE0" />
              <circle cx="12" cy="17.5" r="1.3" fill="#2F2FE0" />
              <circle cx="16" cy="17.5" r="1.3" fill="#2F2FE0" />
            </svg>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold text-[#0A0847]">Schedule & Display</h2>
            <p className="text-[12px] italic text-[#6E6F9A]">
              Set when and how your verse will be displayed
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-[16px] sm:mt-[40px] xl:gap-x-[47px]">
          <Field label="Featured Date:" className="w-full sm:w-[186px]" labelClassName={schedLabel}>
            <div className="relative">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2"
              >
                <rect x="3" y="4.5" width="18" height="16.5" rx="3" stroke="#2F2FE0" strokeWidth="2" />
                <path d="M8 2.5V6M16 2.5V6M3 9.5h18" stroke="#2F2FE0" strokeWidth="2" strokeLinecap="round" />
                <circle cx="8" cy="13.5" r="1.3" fill="#2F2FE0" />
                <circle cx="12" cy="13.5" r="1.3" fill="#2F2FE0" />
                <circle cx="16" cy="13.5" r="1.3" fill="#2F2FE0" />
                <circle cx="8" cy="17.5" r="1.3" fill="#2F2FE0" />
                <circle cx="12" cy="17.5" r="1.3" fill="#2F2FE0" />
                <circle cx="16" cy="17.5" r="1.3" fill="#2F2FE0" />
              </svg>
              <input
                value={v.featuredDate}
                onChange={upd("featuredDate")}
                className={`${schedInput} pl-[40px] pr-[14px]`}
              />
            </div>
          </Field>

          <Field label="Start Time:" className="w-full sm:w-[172px]" labelClassName={schedLabel}>
            <div className="relative">
              <PiClock
                size={16}
                className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-[#0A0847CC]"
              />
              <input
                value={v.startTime}
                onChange={upd("startTime")}
                className={`${schedInput} pl-[40px] pr-[36px]`}
              />
              <button
                type="button"
                aria-label="Clear"
                className="absolute right-[12px] top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center text-[#6E6F9A] transition hover:text-[#DC2626]"
              >
                <PiXCircle size={16} />
              </button>
            </div>
          </Field>

          <Field label="End Time:" className="w-full sm:w-[168px]" labelClassName={schedLabel}>
            <div className="relative">
              <PiClock
                size={16}
                className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-[#0A0847CC]"
              />
              <input
                value={v.endTime}
                onChange={upd("endTime")}
                className={`${schedInput} pl-[40px] pr-[14px]`}
              />
            </div>
          </Field>

          <Field label="Time Zone:" className="w-full sm:w-[248px]" labelClassName={schedLabel}>
            <span className="relative block">
              <select
                value={v.timeZone}
                onChange={upd("timeZone")}
                className="h-[48px] w-full cursor-pointer appearance-none rounded-[8px] border border-[#E2DFFC] bg-white pl-[14px] pr-[36px] text-[14px] font-medium text-[#0A0847] outline-none transition focus:border-[#001984]"
              >
                {[
                  "America/New_York",
                  "America/Chicago",
                  "America/Los_Angeles",
                  "Europe/London",
                  "Asia/Kolkata",
                  "UTC",
                ].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <PiCaretDown
                size={14}
                className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 text-[#0A0847CC]"
              />
            </span>
          </Field>
        </div>

        <div className="mt-[22px] flex flex-wrap gap-x-[32px] gap-y-[12px]">
          <SchedToggle label="Show on Homepage" checked={v.showHomepage} onChange={upd("showHomepage")} />
          <SchedToggle label="Show NEW Badge" checked={v.newBadge} onChange={upd("newBadge")} />
          <SchedToggle label="Keep Available in Archive" checked={v.archive} onChange={upd("archive")} />
        </div>

        <div className="mt-[18px] flex items-start gap-[8px] text-[13px] text-[#6E6F9A]">
          <PiWarningCircle size={18} color="#6E6F9A" className="mt-[1px] shrink-0" />
          <span>Featured Date appears on the homepage card and both experience screens.</span>
        </div>
      </S1Card>

      {/* Row 2: Form Card + Live Homepage Preview */}
      <div className="grid grid-cols-1 items-stretch gap-[26px] lg:grid-cols-[1fr_376px]">
        {/* Form Card (9 fields) */}
        <div className="rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white px-4 pb-6 pt-6 sm:px-[28px] sm:pb-[28px] sm:pt-[106px]">
          <div className="grid grid-cols-1 gap-x-[22px] gap-y-[12px] sm:grid-cols-2">
            {/* Column 1 */}
            <div className="flex flex-col gap-[12px]">
              <Field label="Section Label:" labelClassName={s1Label}>
                <input value={v.sectionLabel} onChange={upd("sectionLabel")} className={s1Input} />
              </Field>
              <Field label="Short Homepage Title:" labelClassName={s1Label}>
                <input value={v.shortTitle} onChange={upd("shortTitle")} className={s1Input} />
              </Field>
              <Field label="Card Description:" labelClassName={s1Label}>
                <textarea
                  value={v.cardDesc}
                  onChange={upd("cardDesc")}
                  className={`${s1Ta} h-[60px] resize-none`}
                />
              </Field>
              <Field label="Estimated Duration:" labelClassName={s1Label}>
                <S1Select
                  value={v.duration}
                  onChange={upd("duration")}
                  options={["3 min", "5 min", "10 min"]}
                />
              </Field>
              <Field label="CTA Label:" labelClassName={s1Label}>
                <input value={v.ctaLabel} onChange={upd("ctaLabel")} className={s1Input} />
              </Field>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-[12px]">
              <Field label="Date Label:" labelClassName={s1Label}>
                <input value={v.dateLabel} onChange={upd("dateLabel")} className={s1Input} />
              </Field>
              <Field label="Homepage Card Image:" labelClassName={s1Label}>
                <input
                  type="file"
                  accept="image/*"
                  ref={cardImageRef}
                  onChange={handleCardImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => cardImageRef.current?.click()}
                  className={uploadReplaceBtn}
                >
                  <PiUploadSimple size={18} />
                  Upload / Replace
                </button>
              </Field>
              <div className="h-[210px] overflow-hidden rounded-[7.47px] border border-[#E2DFFC]">
                <img src={cardImage} alt={v.imageAlt} className="h-full w-full object-cover" />
              </div>
              <Field label="Image Alt Text:" labelClassName={s1Label}>
                <input value={v.imageAlt} onChange={upd("imageAlt")} className={s1Input} />
              </Field>
            </div>
          </div>
        </div>

        {/* Live Homepage Preview */}
        <aside className="flex flex-col rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-[#F3F7FD] p-[22px]">
          <h3 className="text-[16px] font-semibold text-[#0A0847]">Live Homepage Preview</h3>
          <div className="mt-[14px] flex items-center justify-between">
            <span className="flex h-[34px] w-[61px] items-center justify-center rounded-[4px] bg-[#001984] text-[16px] font-semibold text-white">
              NEW
            </span>
            <PiBookmarkSimple size={20} color="#001984" />
          </div>
          <p className="mt-[14px] break-words text-[22px] font-semibold leading-none text-[#0A0847]">
            {v.sectionLabel}
          </p>
          <img
            src={cardImage}
            alt={v.imageAlt}
            className="mt-[12px] h-[292px] w-full rounded-[7.47px] object-cover"
          />
          <p className="mt-[12px] break-words text-[22px] font-semibold leading-none">
            <span className="text-[#0A0847]">{v.dateLabel}: </span>
            <span className="text-[#E11D2E]">{v.shortTitle}</span>
          </p>
          <p className="mt-[8px] max-w-[220px] text-[14px] font-semibold leading-snug text-[#0A0847]">
            {v.cardDesc}
          </p>
          <div className="mt-[10px] flex items-center gap-[36px]">
            <span className="flex items-center gap-[8px] text-[14px] font-semibold text-[#0A0847]">
              <PiClock size={19} />
              {v.duration}
            </span>
            <span className="flex items-center gap-[8px] text-[14px] font-semibold text-[#0A0847]">
              <PiArrowCircleRight size={19} />
              {v.ctaLabel}
            </span>
          </div>
        </aside>
      </div>

      {/* Card 3: Story & Reflection */}
      <S1Card pad="p-4 sm:p-[32px]">
        <h2 className="text-[16px] font-semibold text-[#0A0847]">Story & Reflection</h2>

        <div className="mt-[16px] grid grid-cols-1 gap-[28px] md:grid-cols-3">
          <Field label="Session Header:" labelClassName={s1Label}>
            <input value={v.sessionHeader} onChange={upd("sessionHeader")} className={s1Input} />
          </Field>
          <Field label="Story Label:" labelClassName={s1Label}>
            <input value={v.storyLabel} onChange={upd("storyLabel")} className={s1Input} />
          </Field>
          <Field label="Full Story Title:" labelClassName={s1Label}>
            <input value={v.fullTitle} onChange={upd("fullTitle")} className={s1Input} />
          </Field>
        </div>

        <div className="mt-[16px] grid grid-cols-1 gap-[28px] md:grid-cols-3">
          <Field label="Location / Context:" labelClassName={s1Label}>
            <input value={v.location} onChange={upd("location")} className={s1Input} />
          </Field>
          <Field label="Passage:" labelClassName={s1Label}>
            <input value={v.passage} onChange={upd("passage")} className={s1Input} />
          </Field>
          <div className="hidden md:block" />
        </div>

        <div className="mt-[16px] grid grid-cols-1 gap-[24px] lg:grid-cols-2">
          <Field label="Story Summary:" labelClassName={s1Label}>
            <S1RichTextBox value={v.summary} onChange={upd("summary")} />
          </Field>
          <div className="flex flex-col gap-[16px]">
            <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
              <Field label="Verse Reference:" labelClassName={s1Label}>
                <input value={v.verseRef} onChange={upd("verseRef")} className={s1Input} />
              </Field>
              <Field label="Bible Version:" labelClassName={s1Label}>
                <S1Select
                  value={v.bibleVersion}
                  onChange={upd("bibleVersion")}
                  options={["KJV", "NIV", "ESV", "NKJV", "NASB"]}
                />
              </Field>
            </div>
            <Field label="Verse Text:" labelClassName={s1Label}>
              <input value={v.verseText} onChange={upd("verseText")} className={s1Input} />
            </Field>
          </div>
        </div>

        <div className="mt-[16px] grid grid-cols-1 gap-[24px] lg:grid-cols-2">
          <Field label="WHY IT MATTERS TODAY:" labelClassName={s1Label}>
            <input value={v.whyItMatters} onChange={upd("whyItMatters")} className={s1Input} />
          </Field>
          <Field label="Reflection Prompt:" labelClassName={s1Label}>
            <input value={v.reflectionPrompt} onChange={upd("reflectionPrompt")} className={s1Input} />
          </Field>
        </div>
      </S1Card>

      {/* Row 3: Bottom 3 cards — 2 cols on tablet, 3 on xl */}
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 xl:grid-cols-[1fr_1fr_1.85fr]">
        <S1Card pad="p-4 sm:px-[19px] sm:py-[24px] sm:pl-[17px]">
          <h3 className="text-[16px] font-semibold text-[#0A0847]">Private Reflection</h3>
          <div className="mt-[14px]">
            <S1Toggle label="Enable Private Reflection" checked={v.privateReflection} onChange={upd("privateReflection")} />
          </div>
          <div className="mt-[14px]">
            <Field label="Placeholder:" labelClassName={s1Label}>
              <input value={v.privatePlaceholder} onChange={upd("privatePlaceholder")} className={s1Input} />
            </Field>
          </div>
          <div className="mt-[12px]">
            <Field label="Privacy Message:" labelClassName={s1Label}>
              <input value={v.privacyMsg} onChange={upd("privacyMsg")} className={s1Input} />
            </Field>
          </div>
          <p className="mt-[12px] flex items-center gap-[6px] text-[11px] text-[#0A084799]">
            <img src={lockIcon} alt="" className="h-[13px] w-[13px] shrink-0" />
            Admins cannot view private reflections.
          </p>
        </S1Card>

        <S1Card pad="p-4 sm:px-[19px] sm:py-[24px] sm:pl-[17px]">
          <h3 className="text-[16px] font-semibold text-[#0A0847]">Story Media & Actions</h3>
          <div className="mt-[14px]">
            <Field label="Homepage Card Image:" labelClassName={s1Label}>
              <input
                type="file"
                accept="image/*"
                ref={mediaImageRef}
                onChange={handleMediaImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => mediaImageRef.current?.click()}
                className={uploadReplaceBtn}
              >
                <PiUploadSimple size={18} />
                Upload / Replace
              </button>
            </Field>
          </div>
          <div className="mt-[12px] h-[203px] overflow-hidden rounded-[7.47px] border border-[#E2DFFC]">
            <img src={mediaImage} alt={v.imageAlt2} className="h-full w-full object-cover" />
          </div>
          <div className="mt-[12px]">
            <Field label="Image Alt Text:" labelClassName={s1Label}>
              <input value={v.imageAlt2} onChange={upd("imageAlt2")} className={s1Input} />
            </Field>
          </div>
        </S1Card>

        <S1Card className="md:col-span-2 xl:col-span-1" pad="p-4 sm:px-[19px] sm:py-[24px] sm:pl-[17px]">
          <h3 className="text-[16px] font-semibold text-[#0A0847]">Story Audio</h3>
          <div className="mt-[14px]">
            <p className={s1Label}>File Actions:</p>
            <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-3">
              <button type="button" className={audioActionBtn}>
                <PiUploadSimple size={18} />
                Upload
              </button>
              <button type="button" className={audioActionBtn}>
                <img src={replaceIcon} alt="" className="h-[18px] w-[18px] shrink-0" />
                Replace
              </button>
              <button type="button" className={`${audioActionBtn} !text-[#DC2626] hover:!bg-red-50`}>
                <img src={trashIcon} alt="" className="h-[18px] w-[18px] shrink-0" />
                Remove
              </button>
            </div>
          </div>

          <AudioPlayer s1 time="0:30/2:48" fill="40%" />

          <div className="mt-[14px] flex flex-wrap items-center justify-between gap-[10px]">
            <S1Checkbox
              label="Transcript / Captions"
              labelClass="whitespace-nowrap"
              checked={v.transcript1}
              onChange={upd("transcript1")}
            />
            <div className="flex shrink-0 items-center gap-[10px]">
              <span className="text-[12px] font-semibold text-[#0A0847]">Playback Speed:</span>
              <S1Select
                className="w-[100px]"
                value={v.playerSpeed1}
                onChange={upd("playerSpeed1")}
                options={["0.5x", "1.0x", "1.5x", "2.0x"]}
              />
            </div>
          </div>

          <div className="mt-[14px]">
            <Field label="Read Full Passage Duration:" labelClassName={s1Label}>
              <S1Select
                value={v.readPassage}
                onChange={upd("readPassage")}
                options={["1 Samuel 30", "1 Samuel 30:1-6", "Psalm 30", "Genesis 30"]}
              />
            </Field>
          </div>

          <div className="mt-[14px] flex flex-wrap gap-[24px]">
            <S1Toggle label="Enable Share" checked={v.enableShare} onChange={upd("enableShare")} />
            <S1Toggle label="Enable Save" checked={v.enableSave} onChange={upd("enableSave")} />
          </div>

          <div className="mt-[14px]">
            <S1Checkbox
              label="Continue to Prayer"
              labelClass="font-[Poppins] !font-semibold !text-[#0A084799]"
              checked={v.continueToPrayer}
              onChange={upd("continueToPrayer")}
            />
          </div>
        </S1Card>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => navigate("/admin/dailyreflection")}
          className="flex h-[46px] w-full cursor-pointer items-center justify-center rounded-[8px] border border-[#E2DFFC] bg-white px-[32px] text-[14px] font-semibold text-[#0A0847] transition hover:bg-[#F8FAFC] sm:w-auto"
        >
          Cancel
        </button>
        <div className="grid grid-cols-1 gap-[12px] sm:flex sm:flex-wrap sm:items-center">
          <button
            type="button"
            className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[8px] border border-[#001984] bg-white px-[28px] text-[14px] font-semibold text-[#001984] transition hover:bg-[#001984]/5 sm:w-auto"
          >
            <img src={floppyIcon} alt="" className="h-[20px] w-[20px] shrink-0" />
            Save draft
          </button>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[8px] bg-[#001984] px-[28px] text-[14px] font-semibold text-white transition hover:bg-[#001266] sm:w-auto"
          >
            Next: Reflection & Prayer
            <PiArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   STEP 2 — PRAYER & COMPLETION
   ========================================================================== */
function StepTwo({ v, upd, setStep }) {
  const audioFileRef = useRef(null);
  const [audio2, setAudio2] = useState(null);

  const fmtDur = (s) => {
    if (!s) return "00:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudio2({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        url,
        duration: null,
      });
      const probe = new Audio(url);
      probe.addEventListener("loadedmetadata", () => {
        setAudio2((s) => (s && s.url === url ? { ...s, duration: probe.duration } : s));
      });
    }
    e.target.value = "";
  };

  return (
    <>
      <div className="grid grid-cols-1 items-stretch gap-[24px] lg:grid-cols-[1fr_370px]">
        {/* Left Column */}
        <div className="flex min-w-0 flex-col gap-[24px]">
          <Card>
            <h3 className="text-[16px] font-semibold text-[#0B1250]">Let's Pray</h3>
            <div className="mt-[16px] grid grid-cols-1 gap-[16px] sm:grid-cols-2">
              <Field label="Story Label:">
                <input value={v.prayLabel} onChange={upd("prayLabel")} className={inputCls} />
              </Field>
              <Field label="Page Title:">
                <input value={v.pageTitle} onChange={upd("pageTitle")} className={inputCls} />
              </Field>
            </div>
            <div className="mt-[12px]">
              <Field label="Page Subtitle:">
                <input value={v.pageSubtitle} onChange={upd("pageSubtitle")} className={inputCls} />
              </Field>
            </div>
            <div className="mt-[12px]">
              <Field label="Prayer Type Label:">
                <input
                  value={v.prayerTypeLabel}
                  onChange={upd("prayerTypeLabel")}
                  className="h-[40px] w-full rounded-[6px] border border-[#E5E7EB] bg-white px-[12px] text-[14px] font-semibold text-[#001984] outline-none transition focus:border-[#0B1F7A]"
                />
              </Field>
            </div>
            <div className="mt-[12px]">
              <Field label="Guided Prayer:">
                <RichTextBox value={v.guidedPrayer} onChange={upd("guidedPrayer")} rows={6} />
              </Field>
            </div>
          </Card>

          <Card>
            <h3 className="text-[16px] font-semibold text-[#0B1250]">Player Audio & Accessibility</h3>
            <div className="mt-[14px]">
              <p className="mb-[6px] text-[11px] font-semibold text-[#0B1250]">File Actions:</p>
              <input
                ref={audioFileRef}
                type="file"
                accept="audio/mp3,audio/wav,audio/m4a,audio/*"
                className="hidden"
                onChange={handleAudioUpload}
              />
              <div className="grid grid-cols-2 gap-[8px] sm:grid-cols-4">
                <button
                  type="button"
                  onClick={() => audioFileRef.current?.click()}
                  className="flex h-[34px] cursor-pointer items-center justify-center gap-[6px] rounded-[6px] border border-[#E5E7EB] bg-white text-[13px] font-semibold text-[#0B1250] transition hover:bg-[#F8FAFC]"
                >
                  <PiUploadSimple size={14} />
                  Upload
                </button>
                <button
                  type="button"
                  className="flex h-[34px] cursor-pointer items-center justify-center gap-[6px] rounded-[6px] border border-[#E5E7EB] bg-white text-[13px] font-semibold text-[#0B1250] transition hover:bg-[#F8FAFC]"
                >
                  <img src={replaceIcon} alt="" className="h-[14px] w-[14px] shrink-0" />
                  Preview
                </button>
                <button
                  type="button"
                  onClick={() => audioFileRef.current?.click()}
                  className="flex h-[34px] cursor-pointer items-center justify-center gap-[6px] rounded-[6px] border border-[#E5E7EB] bg-white text-[13px] font-semibold text-[#0B1250] transition hover:bg-[#F8FAFC]"
                >
                  <img src={replaceIcon} alt="" className="h-[14px] w-[14px] shrink-0" />
                  Replace
                </button>
                <button
                  type="button"
                  onClick={() => setAudio2(null)}
                  className="flex h-[34px] cursor-pointer items-center justify-center gap-[6px] rounded-[6px] border border-[#FCA5A5] bg-white text-[12px] font-medium text-[#DC2626] transition hover:bg-red-50"
                >
                  <img src={trashIcon} alt="" className="h-[14px] w-[14px] shrink-0" />
                  Remove
                </button>
              </div>
            </div>

            <AudioPlayer
              time={audio2 ? `0:00/${fmtDur(audio2.duration)}` : "0:00/2:48"}
              fill="75%"
              rightTime
            />
            {audio2 && (
              <p className="mt-[8px] break-all text-[11px] text-[#0B1250]">
                Loaded: <span className="font-semibold">{audio2.name}</span> ({audio2.size})
              </p>
            )}

            <div className="mt-[12px] flex flex-wrap items-center justify-start gap-x-[14px] gap-y-[10px]">
              <Checkbox
                label="Transcript / Captions"
                labelClass="!text-[#0A084799]"
                checked={v.transcript2}
                onChange={upd("transcript2")}
              />
              <div className="flex shrink-0 items-center gap-[8px] [&_select]:text-[#0A0847CC]">
                <span className="text-[11px] font-semibold text-[#0A0847CC]">Playback Speed:</span>
                <SelectBox
                  className="w-[72px]"
                  compact
                  value={v.playerSpeed2}
                  onChange={upd("playerSpeed2")}
                  options={["0.5x", "1.0x", "1.5x", "2.0x"]}
                />
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-[16px] font-semibold text-[#0B1250]">Personal Prayer</h3>
            <div className="mt-[14px]">
              <Toggle label="Enable Write My Own Prayer" checked={v.enableWriteOwn} onChange={upd("enableWriteOwn")} />
            </div>
            <div className="mt-[16px]">
              <Field label="Button Label:" labelClassName={prayerLabel}>
                <input value={v.buttonLabel} onChange={upd("buttonLabel")} className={inputCls} />
              </Field>
            </div>
            <div className="mt-[12px]">
              <Field label="Privacy Message:" labelClassName={prayerLabel}>
                <input value={v.privacyMsg2} onChange={upd("privacyMsg2")} className={inputCls} />
              </Field>
            </div>
            <p className="mt-[12px] flex items-center gap-[8px] text-[12px] font-medium text-[#001984]/60">
              <LockGlyph />
              Added notes are private prayers.
            </p>
          </Card>

          <Card>
            <h3 className="text-[16px] font-semibold text-[#0B1250]">Progress & Completion</h3>

            <div className="mt-[14px] grid grid-cols-1 gap-[16px] sm:grid-cols-2">
              <div className="min-w-0">
                <p className="mb-[6px] text-[11px] font-semibold text-[#0B1250]">Progress Settings:</p>
                <div className="flex h-[40px] items-center justify-between gap-[10px] rounded-[6px] border border-[#E5E7EB] px-[12px]">
                  <span className="truncate text-[11px] text-[#0B1250]">{v.progressText}</span>
                  <Toggle checked={v.progressToggle} onChange={upd("progressToggle")} />
                </div>
              </div>
              <Field label="Countdown Bump / After:">
                <input value={v.countdownAfter} onChange={upd("countdownAfter")} className={inputCls} />
              </Field>
            </div>

            <div className="mt-[12px] flex items-center gap-[10px]">
              <span className="text-[12px] font-medium text-[#0B1250]">Show in Today's Feed</span>
              <Toggle checked={v.showInFeed} onChange={upd("showInFeed")} />
            </div>

            <div className="mt-[12px]">
              <Field label="Completion Message:">
                <input value={v.completionMsg} onChange={upd("completionMsg")} className={inputCls} />
              </Field>
            </div>

            <div className="mt-[12px] grid grid-cols-1 gap-[16px] sm:grid-cols-2">
              <Field label="Reward Type:">
                <SelectBox
                  value={v.rewardType}
                  onChange={upd("rewardType")}
                  options={["Treasure", "Gems", "Coins", "None"]}
                />
              </Field>
              <Field label="Amount:">
                <input value={v.amount} onChange={upd("amount")} className={inputCls} />
              </Field>
            </div>

            <div className="mt-[14px] grid grid-cols-1 gap-[16px] sm:grid-cols-2">
              <div className="flex items-center gap-[10px]">
                <Toggle label="Show Only Once" checked={v.showOnlyOnce} onChange={upd("showOnlyOnce")} />
              </div>
              <div className="flex items-center gap-[10px]">
                <Toggle label="Share This Day Streak" checked={v.shareStreak} onChange={upd("shareStreak")} />
              </div>
            </div>

            <div className="mt-[14px] grid grid-cols-1 gap-[16px] sm:grid-cols-2">
              <Field label="Streak Accent Color:">
                <SelectBox
                  value={v.streakColor}
                  onChange={upd("streakColor")}
                  options={["Blue (Faith)", "Red (Courage)", "Gold (Hope)", "Green (Growth)"]}
                />
              </Field>
              <Field label="After Completion:">
                <SelectBox
                  value={v.afterCompletion}
                  onChange={upd("afterCompletion")}
                  options={["None", "Return to Home", "Open Next"]}
                />
              </Field>
            </div>

            <p className="mt-[12px] flex items-center gap-[8px] text-[12px] font-medium text-[#001984]/60">
              <LockGlyph />
              Added notes are private prayers.
            </p>
          </Card>
        </div>

        {/* Right Column */}
        <div className="flex min-w-0 flex-col gap-[16px]">
          {/* Mobile Preview */}
          <div className="rounded-[10px] border border-[#E5E7EB] bg-[#F5F8FF] p-4 sm:p-[22px]">
            <h3 className="mb-[14px] text-[14px] font-bold text-[#0B1250]">Mobile Preview</h3>

            {/* Phone Frame */}
            <div className="mx-auto w-full max-w-[332px] rounded-[24px] border-[3px] border-[#D9D3F5] bg-white p-[16px]">
              <div className="flex justify-center">
                <span className="font-[Poppins] rounded-full bg-[#F1F2F8] px-[16px] py-[6px] text-[14px] font-semibold text-[#0B1250]">
                  {v.prayLabel}
                </span>
              </div>
              <p className="mt-[12px] text-center font-[Poppins] text-[22px] font-semibold leading-tight text-[#0B1250]">
                {v.pageTitle}
              </p>
              <p className="text-center font-[Poppins] text-[12px] text-[#5B5F8C]">{v.pageSubtitle}</p>

              <div className="mt-[12px] rounded-[8px] bg-[#E8ECFB] p-[12px]">
                <p className="mb-[6px] text-[10px] font-bold text-[#0B1250]">{v.prayerTypeLabel}</p>
                {v.guidedPrayer.split("\n").map((line, i) =>
                  line ? (
                    <p
                      key={i}
                      className="font-[Poppins] text-[12px] font-medium italic leading-[24px] text-[#0B1250]"
                    >
                      {line}
                    </p>
                  ) : null,
                )}
              </div>

              {/* Audio */}
              <div className="mt-[12px] flex items-center gap-[10px]">
                <button
                  type="button"
                  aria-label="Play"
                  className="flex h-[42px] w-[42px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#0B1F7A] text-white transition hover:bg-[#0a1c68]"
                >
                  <PiPlay size={20} weight="fill" />
                </button>
                <div className="h-[4px] flex-1 rounded-full bg-[#E5E7EB]">
                  <div className="h-full w-[35%] rounded-full bg-[#0B1F7A]" />
                </div>
              </div>
              <div className="mt-[6px] flex items-center justify-between pl-[54px] text-[11px] text-[#5B5F8C]">
                <span>0:00</span>
                <span>2:48</span>
              </div>

              {/* Info + Speed Pill */}
              <div className="mt-[10px] flex items-center justify-between gap-[8px]">
                <img src={clockIcon} alt="" className="h-[18px] w-[18px] shrink-0" />
                <button
                  type="button"
                  className="flex h-[35px] w-[95px] cursor-pointer items-center justify-center gap-[8px] rounded-[8px] border border-[#E2DFFC] bg-[#FEFEFE] text-[12px] font-medium text-[#0B1250] transition hover:bg-[#F8FAFC]"
                >
                  <img src={speedIcon} alt="" className="h-[16px] w-[16px] shrink-0" />
                  {v.playerSpeed2}
                </button>
              </div>

              <button
                type="button"
                className="mt-[12px] flex h-[38px] w-full cursor-pointer items-center justify-center gap-[6px] rounded-[6px] border border-[#E5E7EB] bg-white text-[12px] font-semibold text-[#0B1250] transition hover:bg-[#F8FAFC]"
              >
                <img src={pencilIcon} alt="" className="h-[15px] w-[15px] shrink-0" />
                {v.buttonLabel}
              </button>
              <p className="mt-[6px] flex items-center justify-center gap-[4px] text-center text-[11px] text-[#5B5F8C]">
                <img src={lockIcon} alt="" className="h-[12px] w-[12px] shrink-0" />
                Only you can see your prayer.
              </p>
            </div>

            {/* Completion sub-card */}
            <div className="mt-[16px] rounded-[8px] border border-[#E5E7EB] bg-white p-[14px]">
              <p className="break-words text-[12px] text-[#5B5F8C]">
                <span className="font-bold text-[#0B1250]">{v.prayLabel}</span>
                {" • "}
                {v.progressText}
              </p>
              <button
                type="button"
                className="mt-[10px] flex h-[46px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[6px] bg-[#0B1F7A] text-[13px] font-semibold text-white transition hover:bg-[#0a1c68]"
              >
                <img src={heartIcon} alt="" className="h-[18px] w-[18px] shrink-0" />
                {v.countdownAfter}
              </button>
              <div className="mt-[10px] rounded-[8px] border border-[#A7E3BE] bg-[#ECFDF3] p-[12px]">
                <div className="flex items-center gap-[12px]">
                  <img src={checkIcon} alt="" className="h-[36px] w-[36px] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold leading-snug text-[#48B02C]">
                      {v.completionMsg}
                    </p>
                    <p className="text-[12px] font-semibold text-[#48B02C]">
                      +1 Treasure • 1 Day Streak Updated
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-[12px] flex h-[38px] w-full cursor-pointer items-center justify-center rounded-[8px] border border-[#48B02C] bg-white text-[13px] font-medium text-[#48B02C] transition hover:bg-[#ECFDF3]"
                >
                  Return Home
                </button>
              </div>
            </div>
          </div>

          {/* Publishing */}
          <div className="flex flex-1 flex-col rounded-[10px] border border-[#E5E7EB] bg-white p-4 sm:p-[22px]">
            <h3 className="text-[16px] font-semibold text-[#0B1250]">Publishing</h3>

            <div className="mt-[16px]">
              <p className="mb-[6px] text-[11px] font-semibold text-[#0B1250]">Status:</p>
              <SelectBox
                className="w-full sm:w-[240px]"
                value={v.status}
                onChange={upd("status")}
                options={["Scheduled", "Live", "Draft"]}
              />
            </div>

            <div className="mt-[12px]">
              <p className="mb-[6px] text-[11px] font-semibold text-[#0B1250]">Schedule Date:</p>
              <div className="relative">
                <PiCalendarBlank
                  size={16}
                  className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-[#0A0847CC]"
                />
                <input
                  value={v.scheduleDate}
                  onChange={upd("scheduleDate")}
                  className={`${inputCls} pl-[40px] pr-[14px]`}
                />
              </div>
            </div>

            <div className="mt-[12px] flex items-center gap-[8px] rounded-[6px] border border-[#A7E3BE] bg-[#ECFDF3] px-[12px] py-[8px] text-[11px] text-[#16A34A]">
              <PiClock size={14} />
              It's scheduled to start on {v.scheduleDate}.
            </div>

            <div className="mt-[16px]">
              <h4 className="text-[12px] font-bold text-[#0B1250]">Version History</h4>
              <div className="mt-[8px] rounded-[6px] border border-[#E5E7EB] p-[12px]">
                <p className="flex items-center justify-between text-[12px]">
                  <span className="font-semibold text-[#0B1250]">Version 1.0.0</span>
                  <button
                    type="button"
                    className="cursor-pointer text-[11px] font-bold text-[#0B1F7A] transition hover:underline"
                  >
                    View History
                  </button>
                </p>
                <div className="mt-[8px] space-y-[6px] text-[11px] text-[#5B5F8C]">
                  <p className="flex items-center justify-between gap-2">
                    <span>Last edited by:</span>
                    <span className="font-medium text-[#0B1250]">Admin</span>
                  </p>
                  <p className="flex items-center justify-between gap-2">
                    <span>Date:</span>
                    <span className="font-medium text-[#0B1250]">May 20, 2025 at 9:45 AM</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-[16px]">
              <h4 className="text-[12px] font-bold text-[#0B1250]">Validation Checklist</h4>
              <ul className="mt-[8px] space-y-[6px]">
                {[
                  "Homepage complete",
                  "Story complete",
                  "Prayer complete",
                  "Audio added",
                  "Accessibility ready",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-[8px] text-[12px] text-[#0B1250]">
                    <img src={checkIcon} alt="" className="h-[16px] w-[16px] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex h-[43px] w-full cursor-pointer items-center justify-center gap-[6px] rounded-[8px] border border-[#E2DFFC] bg-[#FEFEFE] text-[14px] font-semibold text-[#0A0847] transition hover:bg-[#F8FAFC] sm:w-[197px]"
        >
          Back
        </button>
        <div className="grid grid-cols-1 gap-[12px] sm:flex sm:flex-wrap sm:items-center">
          <button
            type="button"
            className="flex h-[43px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[8px] border border-[#E2DFFC] bg-[#FEFEFE] px-[16px] text-[14px] font-semibold text-[#0A0847] transition hover:bg-[#F8FAFC] sm:w-auto"
          >
            <img src={eyeIcon} alt="" className="h-[16px] w-[16px] shrink-0" />
            Preview
          </button>
          <button
            type="button"
            className="flex h-[43px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[8px] border border-[#E2DFFC] bg-[#FEFEFE] px-[16px] text-[14px] font-semibold text-[#0A0847] transition hover:bg-[#F8FAFC] sm:w-auto"
          >
            <img src={floppyIcon} alt="" className="h-[18px] w-[18px] shrink-0" />
            Save draft
          </button>
          <button
            type="button"
            className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[6px] bg-[#0B1F7A] text-[12px] font-semibold text-white transition hover:bg-[#0a1c68] sm:w-[260px]"
          >
            <PiCalendarBlank size={16} />
            Schedule Story
          </button>
        </div>
      </div>
    </>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AddHistoricalStory() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [v, setV] = useState({
    featuredDate: "May 25, 2025",
    startTime: "6:00 AM",
    endTime: "11:59 PM",
    timeZone: "America/New_York",
    showHomepage: true,
    newBadge: true,
    archive: true,
    sectionLabel: "Today in Biblical History",
    shortTitle: "David Strengthened",
    cardDesc: "See what happened on this day in Scripture.",
    duration: "3 min",
    ctaLabel: "Explore Today",
    dateLabel: "May 25",
    imageAlt: "Ancient ruins with columns and path",
    sessionHeader: "Today in Biblical History",
    storyLabel: "TODAY'S STORY",
    fullTitle: "David Encourages Himself in the Lord",
    location: "Ziklag",
    passage: "1 Samuel 30",
    summary:
      "David returns to Ziklag and finds it burned and his people in distress. With the help and guidance of the Lord, David strengthens himself in the Lord and pursues the enemy.",
    verseRef: "1 Samuel 30:6",
    bibleVersion: "KJV",
    verseText: "“But David encouraged himself in the LORD his God.”",
    whyItMatters: "Seek strength and direction from God during difficult moments.",
    reflectionPrompt: "How can you strengthen yourself in the Lord today?",
    privateReflection: true,
    privatePlaceholder: "Write a private reflection...",
    privacyMsg: "Only you can see this.",
    imageAlt2: "David playing harp at sunset",
    readPassage: "1 Samuel 30",
    enableShare: true,
    enableSave: true,
    continueToPrayer: false,
    transcript1: true,
    playerSpeed1: "1.0x",
    prayLabel: "Step 1 of 2",
    pageTitle: "Let's Pray",
    pageSubtitle: "Take a moment to talk with God.",
    prayerTypeLabel: "GUIDED PRAYER",
    guidedPrayer:
      "Heavenly Father,\nThank You for being my source of strength.\nWhen I feel overwhelmed, help me seek You in Your Word.\nGuide my steps and help me trust in Your goodness.\nIn Jesus' name, I pray. Amen.",
    enableWriteOwn: true,
    buttonLabel: "Write My Own Prayer",
    privacyMsg2: "Only you can see this.",
    progressText: "Complete today to grow your streak",
    progressToggle: true,
    countdownAfter: "Amen & Complete",
    showInFeed: true,
    completionMsg: "Today's Biblical History Completed!",
    rewardType: "Treasure",
    amount: "1",
    showOnlyOnce: true,
    shareStreak: true,
    streakColor: "Blue (Faith)",
    afterCompletion: "None",
    transcript2: true,
    playerSpeed2: "1.0x",
    status: "Scheduled",
    scheduleDate: "May 25, 2025",
  });

  const upd = (key) => (e) =>
    setV((p) => ({ ...p, [key]: e && e.target ? e.target.value : e }));

  return (
    <div className="flex min-h-screen flex-col gap-[16px] bg-[#F8FAFC] p-4 font-[Inter] sm:p-6">
      <TopHeader step={step} setStep={setStep} />
      {step === 1 ? (
        <StepOne v={v} upd={upd} setStep={setStep} navigate={navigate} />
      ) : (
        <StepTwo v={v} upd={upd} setStep={setStep} />
      )}
    </div>
  );
}