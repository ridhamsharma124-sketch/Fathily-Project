import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import harpImage from "../../../assets/harp.png";
import ruinsImage from "../../../assets/ruins.png";
import {
  PiArrowCircleRight,
  PiArrowRight,
  PiArrowsClockwise,
  PiBookmarkSimple,
  PiCalendarBlank,
  PiCaretDown,
  PiCheck,
  PiCheckCircle,
  PiClock,
  PiClockClockwise,
  PiEye,
  PiFloppyDisk,
  PiHeart,
  PiInfo,
  PiLink,
  PiListBullets,
  PiLock,
  PiPencilSimple,
  PiPlay,
  PiPlayCircle,
  PiSpeakerHigh,
  PiTextB,
  PiTextItalic,
  PiTextUnderline,
  PiTrash,
  PiUploadSimple,
  PiX,
} from "react-icons/pi";

/* ==========================================================================
   SHARED STYLES
   ========================================================================== */
const inputCls =
  "h-[40px] w-full rounded-[6px] border border-[#E5E7EB] bg-white px-[12px] text-[12px] text-[#0B1250] outline-none transition placeholder:text-[#6B7280] focus:border-[#0B1F7A]";

const s1Input =
  "h-[44px] w-full rounded-[6px] border border-[#E5E7EB] bg-white px-[14px] text-[12px] text-[#0B1250] outline-none transition placeholder:text-[#6B7280] focus:border-[#0B1F7A]";
const s1Ta =
  "w-full rounded-[6px] border border-[#E5E7EB] bg-white px-[14px] py-[12px] text-[12px] text-[#0B1250] outline-none transition placeholder:text-[#6B7280] focus:border-[#0B1F7A]";
const s1Label = "mb-[8px] block text-[12px] font-semibold text-[#0B1250]";

/* ==========================================================================
   REUSABLE HELPERS
   ========================================================================== */
function Card({ className = "", children }) {
  return (
    <div
      className={`rounded-[10px] border border-[#E5E7EB] bg-white p-[20px] ${className}`}
    >
      {children}
    </div>
  );
}

function S1Card({ className = "", children }) {
  return (
    <div
      className={`rounded-[10px] border border-[#E5E7EB] bg-white p-[28px] ${className}`}
    >
      {children}
    </div>
  );
}

function Field({ label, className = "", labelClassName = "", children }) {
  const labelCls =
    labelClassName || "mb-[6px] block text-[11px] font-semibold text-[#0B1250]";
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

function SelectBox({
  value,
  onChange,
  options = [],
  className = "",
  compact = false,
  large = false,
}) {
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

function Checkbox({ checked, onChange, label, labelClass = "" }) {
  return (
    <label className="flex cursor-pointer items-center gap-[8px]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-[16px] w-[16px] cursor-pointer rounded-[3px] border border-[#6B7280] accent-[#0B1F7A]"
      />
      <span className={`text-[12px] font-medium text-[#0B1250] ${labelClass}`}>
        {label}
      </span>
    </label>
  );
}

function OutlineButton({ className = "", children, ...props }) {
  return (
    <button
      {...props}
      className={`flex h-[36px] cursor-pointer items-center gap-[6px] rounded-[6px] border border-[#E5E7EB] bg-white px-[14px] text-[12px] font-semibold text-[#0B1250] transition hover:bg-[#F8FAFC] ${className}`}
    >
      {children}
    </button>
  );
}

function PrimaryButton({ className = "", children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[36px] cursor-pointer items-center gap-[6px] rounded-[6px] bg-[#0B1F7A] px-[16px] text-[12px] font-semibold text-white transition hover:bg-[#0a1c68] ${className}`}
    >
      {children}
    </button>
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
      <div className="flex items-center gap-[4px] border-b border-[#E5E7EB] bg-[#F3F4F8] px-[8px] py-[6px]">
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

function AudioPlayer({ time, fill, rightTime = false }) {
  return (
    <div className="mt-[12px] flex items-center gap-[10px] rounded-[6px] border border-[#E5E7EB] bg-[#EEF0FB] p-[10px]">
      <button
        type="button"
        aria-label="Play"
        className="flex h-[28px] w-[28px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#0B1F7A] text-white transition hover:bg-[#0a1c68]"
      >
        <PiPlay size={14} weight="fill" />
      </button>
      <span className="shrink-0 text-[11px] font-medium text-[#0B1250]">{time}</span>
      <PiSpeakerHigh size={15} color="#5B5F8C" className="shrink-0" />
      <div className="relative h-[6px] flex-1 rounded-full bg-[#D9D9E6]">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[#0B1F7A]"
          style={{ width: fill }}
        />
      </div>
      <PiSpeakerHigh size={15} color="#0B1250" className="shrink-0" />
      {rightTime && (
        <span className="shrink-0 text-[11px] font-medium text-[#0B1250]">{time}</span>
      )}
    </div>
  );
}

/* ==========================================================================
   TOP HEADER + STEPPER
   ========================================================================== */
function TopHeader({ step, setStep }) {
  return (
    <>
      <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-[22px] font-bold text-[#0B1250]">Add Historical Story</h1>
        <div className="flex flex-wrap items-center gap-[8px]">
          <OutlineButton>
            <PiFloppyDisk size={14} />Save draft
          </OutlineButton>
          <OutlineButton>
            <PiEye size={14} />Preview All 3 Screens
          </OutlineButton>
          {step === 1 ? (
            <PrimaryButton onClick={() => setStep(2)}>
              Next <PiArrowRight size={14} />
            </PrimaryButton>
          ) : (
            <PrimaryButton>Schedule Story</PrimaryButton>
          )}
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-[12px]">
        <div className="flex items-center gap-[8px]">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0B1F7A] text-[12px] font-semibold text-white">
            1
          </span>
          <span className="text-[12px] font-semibold text-[#0B1250]">
            Homepage & Story
          </span>
        </div>
        <span className="h-px max-w-[140px] flex-1 bg-[#E5E7EB]" />
        <div className="flex items-center gap-[8px]">
          <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold transition ${
              step === 2
                ? "bg-[#0B1F7A] text-white"
                : "bg-[#E5E7EB] text-[#6B7280]"
            }`}
          >
            2
          </span>
          <span
            className={`text-[12px] font-semibold transition ${
              step === 2 ? "text-[#0B1250]" : "text-[#6B7280]"
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

  return (
    <div className="flex flex-col gap-[24px]">
      {/* Card 1: Schedule & Display */}
      <S1Card>
        <div className="flex items-center gap-[12px]">
          <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#EEF4FF]">
            <PiCalendarBlank size={18} color="#0B1F7A" />
          </div>
          <div>
            <h2 className="text-[14px] font-bold text-[#0B1250]">Schedule & Display</h2>
            <p className="text-[11px] italic text-[#5B5F8C]">
              Set when and how your story will be displayed
            </p>
          </div>
        </div>

        <div className="mt-[20px] flex flex-wrap gap-[40px]">
          <Field label="Featured Date:" className="w-[170px]" labelClassName={s1Label}>
            <div className="relative">
              <PiCalendarBlank
                size={15}
                className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-[#5B5F8C]"
              />
              <input
                value={v.featuredDate}
                onChange={upd("featuredDate")}
                className={`${s1Input} pl-[34px]`}
              />
            </div>
          </Field>
          <Field label="Start Time:" className="w-[156px]" labelClassName={s1Label}>
            <div className="relative">
              <PiClock
                size={15}
                className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-[#5B5F8C]"
              />
              <input
                value={v.startTime}
                onChange={upd("startTime")}
                className={`${s1Input} pl-[34px] pr-[30px]`}
              />
              <button
                type="button"
                aria-label="Clear"
                className="absolute right-[10px] top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center text-[#9CA3AF] transition hover:text-[#DC2626]"
              >
                <PiX size={13} />
              </button>
            </div>
          </Field>
          <Field label="End Time:" className="w-[156px]" labelClassName={s1Label}>
            <div className="relative">
              <PiClock
                size={15}
                className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-[#5B5F8C]"
              />
              <input
                value={v.endTime}
                onChange={upd("endTime")}
                className={`${s1Input} pl-[34px]`}
              />
            </div>
          </Field>
          <Field label="Time Zone:" className="w-[224px]" labelClassName={s1Label}>
            <SelectBox
              large
              value={v.timeZone}
              onChange={upd("timeZone")}
              options={[
                "America/New_York",
                "America/Chicago",
                "America/Los_Angeles",
                "Europe/London",
                "Asia/Kolkata",
                "UTC",
              ]}
            />
          </Field>
        </div>

        <div className="mt-[20px] flex flex-wrap gap-[24px]">
          <Toggle label="Show on Homepage" checked={v.showHomepage} onChange={upd("showHomepage")} />
          <Toggle label="Show NEW Badge" checked={v.newBadge} onChange={upd("newBadge")} />
          <Toggle label="Keep Available in Archive" checked={v.archive} onChange={upd("archive")} />
        </div>

        <div className="mt-[14px] flex items-center gap-[8px] text-[11px] text-[#5B5F8C]">
          <PiInfo size={15} color="#0B1F7A" />
          Featured Date appears on the homepage card and both experience screens.
        </div>
      </S1Card>

      {/* Row 2: Form Card + Live Homepage Preview */}
      <div className="grid grid-cols-1 items-stretch gap-[24px] lg:grid-cols-[1fr_370px]">
        {/* Form Card (9 fields) */}
        <div className="rounded-[10px] border border-[#E5E7EB] bg-white px-[28px] pb-[28px] pt-[80px]">
          <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2">
            {/* Column 1 */}
            <div className="flex flex-col gap-[16px]">
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
                  className={`${s1Ta} h-[64px] resize-none`}
                />
              </Field>
              <Field label="Estimated Duration:" labelClassName={s1Label}>
                <SelectBox
                  large
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
            <div className="flex flex-col gap-[16px]">
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
                  className="flex h-[44px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[6px] border border-[#0B1F7A] bg-white text-[12px] font-semibold text-[#0B1F7A] transition hover:bg-[#0B1F7A]/5"
                >
                  <PiUploadSimple size={15} />
                  Upload / Replace
                </button>
              </Field>
              <div className="h-[210px] overflow-hidden rounded-[6px] border border-[#E5E7EB]">
                <img src={cardImage} alt={v.imageAlt} className="h-full w-full object-cover" />
              </div>
              <Field label="Image Alt Text:" labelClassName={s1Label}>
                <input value={v.imageAlt} onChange={upd("imageAlt")} className={s1Input} />
              </Field>
            </div>
          </div>
        </div>

        {/* Live Homepage Preview */}
        <aside className="flex flex-col rounded-[10px] border border-[#E5E7EB] bg-[#F5F8FF] p-[22px]">
          <h3 className="text-[14px] font-bold text-[#0B1250]">Live Homepage Preview</h3>
          <div className="mt-[14px] flex items-center justify-between">
            <span className="rounded-[4px] bg-[#0B1F7A] px-[12px] py-[4px] text-[11px] font-bold text-white">
              NEW
            </span>
            <PiBookmarkSimple size={18} color="#0B1F7A" />
          </div>
          <p className="mt-[14px] text-[20px] font-bold leading-snug text-[#0B1250]">
            {v.sectionLabel}
          </p>
          <img
            src={cardImage}
            alt={v.imageAlt}
            className="mt-[12px] h-[286px] w-full rounded-[6px] object-cover"
          />
          <p className="mt-[12px] text-[16px] font-bold">
            <span className="text-[#0B1250]">{v.dateLabel}: </span>
            <span className="text-[#E11D2E]">{v.shortTitle}</span>
          </p>
          <p className="mt-[6px] text-[13px] leading-snug text-[#5B5F8C]">{v.cardDesc}</p>
          <div className="mt-[6px] flex items-center justify-between">
            <span className="flex items-center gap-[6px] text-[12px] text-[#5B5F8C]">
              <PiClock size={14} />
              {v.duration}
            </span>
            <span className="flex items-center gap-[6px] text-[13px] font-semibold text-[#0B1F7A]">
              {v.ctaLabel}
              <PiArrowCircleRight size={16} />
            </span>
          </div>
        </aside>
      </div>

      {/* Card 3: Story & Reflection */}
      <S1Card>
        <h2 className="text-[14px] font-bold text-[#0B1250]">Story & Reflection</h2>

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
          <div />
        </div>

        <div className="mt-[16px] grid grid-cols-1 gap-[24px] lg:grid-cols-2">
          <Field label="Story Summary:" labelClassName={s1Label}>
            <RichTextBox value={v.summary} onChange={upd("summary")} rows={4} />
          </Field>
          <div className="flex flex-col gap-[16px]">
            <div className="grid grid-cols-2 gap-[16px]">
              <Field label="Verse Reference:" labelClassName={s1Label}>
                <input value={v.verseRef} onChange={upd("verseRef")} className={s1Input} />
              </Field>
              <Field label="Bible Version:" labelClassName={s1Label}>
                <SelectBox
                  large
                  value={v.bibleVersion}
                  onChange={upd("bibleVersion")}
                  options={["KJV", "NIV", "ESV", "NKJV", "NASB"]}
                />
              </Field>
            </div>
            <Field label="Verse Text:" labelClassName={s1Label}>
              <textarea
                value={v.verseText}
                onChange={upd("verseText")}
                className={`${s1Ta} h-[72px] resize-none`}
              />
            </Field>
          </div>
        </div>

        <div className="mt-[16px] grid grid-cols-1 gap-[24px] lg:grid-cols-2">
          <Field label="Why It Matters Today:" labelClassName={s1Label}>
            <textarea
              value={v.whyItMatters}
              onChange={upd("whyItMatters")}
              className={`${s1Ta} h-[72px] resize-none`}
            />
          </Field>
          <Field label="Reflection Prompt:" labelClassName={s1Label}>
            <textarea
              value={v.reflectionPrompt}
              onChange={upd("reflectionPrompt")}
              className={`${s1Ta} h-[72px] resize-none`}
            />
          </Field>
        </div>
      </S1Card>

      {/* Row 3: Bottom 3 cards */}
      <div className="grid grid-cols-1 gap-[20px] lg:grid-cols-[1fr_1fr_1.85fr]">
        <S1Card>
          <h3 className="text-[13px] font-bold text-[#0B1250]">Private Reflection</h3>
          <div className="mt-[14px]">
            <Toggle label="Enable Private Reflection" checked={v.privateReflection} onChange={upd("privateReflection")} />
          </div>
          <div className="mt-[16px]">
            <Field label="Placeholder:" labelClassName={s1Label}>
              <input value={v.privatePlaceholder} onChange={upd("privatePlaceholder")} className={s1Input} />
            </Field>
          </div>
          <div className="mt-[12px]">
            <Field label="Privacy Message:" labelClassName={s1Label}>
              <input value={v.privacyMsg} onChange={upd("privacyMsg")} className={s1Input} />
            </Field>
          </div>
          <p className="mt-[12px] flex items-center gap-[6px] text-[11px] text-[#5B5F8C]">
            <PiLock size={13} />
            Admins cannot view private reflections.
          </p>
        </S1Card>

        <S1Card>
          <h3 className="text-[13px] font-bold text-[#0B1250]">Story Media & Actions</h3>
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
                className="flex h-[40px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[6px] border border-[#0B1F7A] bg-white text-[12px] font-semibold text-[#0B1F7A] transition hover:bg-[#0B1F7A]/5"
              >
                <PiUploadSimple size={15} />
                Upload / Replace
              </button>
            </Field>
          </div>
          <div className="mt-[12px] h-[200px] overflow-hidden rounded-[6px] border border-[#E5E7EB]">
            <img src={mediaImage} alt={v.imageAlt2} className="h-full w-full object-cover" />
          </div>
          <div className="mt-[12px]">
            <Field label="Image Alt Text:" labelClassName={s1Label}>
              <input value={v.imageAlt2} onChange={upd("imageAlt2")} className={s1Input} />
            </Field>
          </div>
        </S1Card>

        <S1Card>
          <h3 className="text-[13px] font-bold text-[#0B1250]">Story Audio</h3>
          <div className="mt-[14px]">
            <p className="mb-[8px] text-[12px] font-semibold text-[#0B1250]">File Actions:</p>
            <div className="grid grid-cols-3 gap-[8px]">
              <button
                type="button"
                className="flex h-[34px] cursor-pointer items-center justify-center gap-[6px] rounded-[6px] border border-[#E5E7EB] bg-white text-[12px] font-medium text-[#0B1250] transition hover:bg-[#F8FAFC]"
              >
                <PiUploadSimple size={14} />
                Upload
              </button>
              <button
                type="button"
                className="flex h-[34px] cursor-pointer items-center justify-center gap-[6px] rounded-[6px] border border-[#E5E7EB] bg-white text-[12px] font-medium text-[#0B1250] transition hover:bg-[#F8FAFC]"
              >
                <PiArrowsClockwise size={14} />
                Replace
              </button>
              <button
                type="button"
                className="flex h-[34px] cursor-pointer items-center justify-center gap-[6px] rounded-[6px] border border-[#E5E7EB] bg-white text-[12px] font-medium text-[#DC2626] transition hover:bg-red-50"
              >
                <PiTrash size={14} />
                Remove
              </button>
            </div>
          </div>

          <AudioPlayer time="0:30/2:48" fill="40%" />

          <div className="mt-[12px] flex items-center justify-between gap-[10px]">
            <Checkbox label="Transcript / Captions" labelClass="whitespace-nowrap" checked={v.transcript1} onChange={upd("transcript1")} />
            <div className="flex shrink-0 items-center gap-[8px]">
              <span className="text-[11px] text-[#5B5F8C]">Playback Speed:</span>
              <SelectBox
                className="w-[72px]"
                compact
                value={v.playerSpeed1}
                onChange={upd("playerSpeed1")}
                options={["0.5x", "1.0x", "1.5x", "2.0x"]}
              />
            </div>
          </div>

          <div className="mt-[12px]">
            <Field label="Read Full Passage:" labelClassName={s1Label}>
              <SelectBox
                large
                value={v.readPassage}
                onChange={upd("readPassage")}
                options={["1 Samuel 30", "1 Samuel 30:1-6", "Psalm 30", "Genesis 30"]}
              />
            </Field>
          </div>

          <div className="mt-[14px] flex flex-wrap gap-[24px]">
            <Toggle label="Enable Share" checked={v.enableShare} onChange={upd("enableShare")} />
            <Toggle label="Enable Save" checked={v.enableSave} onChange={upd("enableSave")} />
          </div>

          <div className="mt-[12px]">
            <Checkbox label="Continue to Prayer" checked={v.continueToPrayer} onChange={upd("continueToPrayer")} />
          </div>
        </S1Card>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-wrap items-center justify-between gap-[12px]">
        <OutlineButton onClick={() => navigate("/admin/dailyreflection")}>
          Cancel
        </OutlineButton>
        <div className="flex flex-wrap items-center gap-[8px]">
          <OutlineButton className="border-[#0B1F7A] text-[#0B1F7A]">
            <PiFloppyDisk size={14} />
            Save draft
          </OutlineButton>
          <PrimaryButton onClick={() => setStep(2)} className="px-[20px]">
            Next: Reflection & Prayer
            <PiArrowRight size={14} />
          </PrimaryButton>
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
      setAudio2({ name: file.name, size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`, url, duration: null });
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
        <div className="flex flex-col gap-[24px]">
          <Card>
            <h3 className="text-[14px] font-bold text-[#0B1250]">Let's Pray</h3>
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
                  className={`${inputCls} font-bold`}
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
            <h3 className="text-[13px] font-bold text-[#0B1250]">Player Audio & Accessibility</h3>
            <div className="mt-[14px]">
              <p className="mb-[6px] text-[11px] font-semibold text-[#0B1250]">File Actions:</p>
              <input
                ref={audioFileRef}
                type="file"
                accept="audio/mp3,audio/wav,audio/m4a,audio/*"
                className="hidden"
                onChange={handleAudioUpload}
              />
              <div className="grid grid-cols-4 gap-[8px]">
                <button
                  type="button"
                  onClick={() => audioFileRef.current?.click()}
                  className="flex h-[34px] cursor-pointer items-center justify-center gap-[6px] rounded-[6px] border border-[#E5E7EB] bg-white text-[12px] font-medium text-[#0B1250] transition hover:bg-[#F8FAFC]"
                >
                  <PiUploadSimple size={14} />
                  Upload
                </button>
                <button
                  type="button"
                  className="flex h-[34px] cursor-pointer items-center justify-center gap-[6px] rounded-[6px] border border-[#E5E7EB] bg-white text-[12px] font-medium text-[#0B1250] transition hover:bg-[#F8FAFC]"
                >
                  <PiEye size={14} />
                  Preview
                </button>
                <button
                  type="button"
                  onClick={() => audioFileRef.current?.click()}
                  className="flex h-[34px] cursor-pointer items-center justify-center gap-[6px] rounded-[6px] border border-[#E5E7EB] bg-white text-[12px] font-medium text-[#0B1250] transition hover:bg-[#F8FAFC]"
                >
                  <PiArrowsClockwise size={14} />
                  Replace
                </button>
                <button
                  type="button"
                  onClick={() => setAudio2(null)}
                  className="flex h-[34px] cursor-pointer items-center justify-center gap-[6px] rounded-[6px] border border-[#E5E7EB] bg-white text-[12px] font-medium text-[#DC2626] transition hover:bg-red-50"
                >
                  <PiTrash size={14} />
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
              <p className="mt-[8px] text-[11px] text-[#0B1250]">
                Loaded: <span className="font-semibold">{audio2.name}</span> ({audio2.size})
              </p>
            )}

            <div className="mt-[12px] flex items-center justify-between gap-[10px]">
              <Checkbox label="Transcript / Captions" checked={v.transcript2} onChange={upd("transcript2")} />
              <div className="flex shrink-0 items-center gap-[8px]">
                <span className="text-[11px] text-[#5B5F8C]">Playback Speed:</span>
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
            <h3 className="text-[13px] font-bold text-[#0B1250]">Personal Prayer</h3>
            <div className="mt-[14px]">
              <Toggle label="Enable Write My Own Prayer" checked={v.enableWriteOwn} onChange={upd("enableWriteOwn")} />
            </div>
            <div className="mt-[16px]">
              <Field label="Button Label:">
                <input value={v.buttonLabel} onChange={upd("buttonLabel")} className={inputCls} />
              </Field>
            </div>
            <div className="mt-[12px]">
              <Field label="Privacy Message:">
                <input value={v.privacyMsg2} onChange={upd("privacyMsg2")} className={inputCls} />
              </Field>
            </div>
            <p className="mt-[12px] flex items-center gap-[6px] text-[11px] italic text-[#5B5F8C]">
              <PiLock size={13} />
              Added notes are private prayers.
            </p>
          </Card>

          <Card>
            <h3 className="text-[13px] font-bold text-[#0B1250]">Progress & Completion</h3>

            <div className="mt-[14px] grid grid-cols-1 gap-[16px] sm:grid-cols-2">
              <div>
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

            <div className="mt-[14px] grid grid-cols-2 gap-[16px]">
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

            <p className="mt-[12px] flex items-center gap-[6px] text-[11px] italic text-[#5B5F8C]">
              <PiLock size={13} />
              Added notes are private prayers.
            </p>
          </Card>
        </div>

        {/* Right Column */}
        <div className="flex h-full flex-col gap-[16px]">
          {/* Mobile Preview */}
          <div className="rounded-[10px] border border-[#E5E7EB] bg-[#F5F8FF] p-[22px]">
            <h3 className="mb-[14px] text-[14px] font-bold text-[#0B1250]">
              Mobile Preview
            </h3>

            {/* Phone Frame */}
            <div className="mx-auto max-w-[300px] rounded-[24px] border-[3px] border-[#D9D3F5] bg-white p-[16px]">
              <div className="flex justify-center">
                <span className="rounded-full bg-[#F1F2F8] px-[16px] py-[6px] text-[12px] font-medium text-[#0B1250]">
                  {v.prayLabel}
                </span>
              </div>
              <p className="mt-[12px] text-center text-[22px] font-bold leading-tight text-[#0B1250]">
                {v.pageTitle}
              </p>
              <p className="text-center text-[12px] text-[#5B5F8C]">{v.pageSubtitle}</p>

              <div className="mt-[12px] rounded-[8px] bg-[#E8ECFB] p-[12px]">
                <p className="mb-[6px] text-[10px] font-bold text-[#0B1250]">
                  {v.prayerTypeLabel}
                </p>
                {v.guidedPrayer.split("\n").map((line, i) =>
                  line ? (
                    <p
                      key={i}
                      className="mb-[8px] text-[12px] italic leading-snug text-[#0B1250]"
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
                  className="flex h-[44px] w-[44px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#0B1F7A] text-white transition hover:bg-[#0a1c68]"
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
              <div className="mt-[10px] flex items-center justify-between">
                <PiClockClockwise size={18} color="#5B5F8C" />
                <button
                  type="button"
                  className="flex h-[30px] cursor-pointer items-center gap-[6px] rounded-full border border-[#E5E7EB] bg-white px-[12px] text-[11px] font-medium text-[#0B1250] transition hover:bg-[#F8FAFC]"
                >
                  <PiPlayCircle size={16} color="#0B1F7A" />
                  {v.playerSpeed2}
                </button>
              </div>

              <button
                type="button"
                className="mt-[12px] flex h-[38px] w-full cursor-pointer items-center justify-center gap-[6px] rounded-[6px] border border-[#E5E7EB] bg-white text-[12px] font-semibold text-[#0B1250] transition hover:bg-[#F8FAFC]"
              >
                <PiPencilSimple size={15} />
                {v.buttonLabel}
              </button>
              <p className="mt-[6px] flex items-center justify-center gap-[4px] text-center text-[11px] text-[#5B5F8C]">
                <PiLock size={12} />
                Only you can see your prayer.
              </p>
            </div>

            {/* Completion sub-card (below the phone frame) */}
            <div className="mt-[16px] rounded-[8px] border border-[#E5E7EB] bg-white p-[14px]">
              <p className="text-[12px] text-[#5B5F8C]">
                <span className="font-bold text-[#0B1250]">{v.prayLabel}</span>
                {" • "}
                {v.progressText}
              </p>
              <button
                type="button"
                className="mt-[10px] flex h-[46px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[6px] bg-[#0B1F7A] text-[13px] font-semibold text-white transition hover:bg-[#0a1c68]"
              >
                <PiHeart size={18} weight="fill" />
                {v.countdownAfter}
              </button>
              <div className="mt-[10px] rounded-[8px] border border-[#A7E3BE] bg-[#ECFDF3] p-[12px]">
                <div className="mx-auto flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#22C55E] text-white">
                  <PiCheck size={20} strokeWidth={3} />
                </div>
                <p className="mt-[8px] text-center text-[11px] font-semibold leading-snug text-[#16A34A]">
                  {v.completionMsg}
                </p>
                <p className="mt-[2px] text-center text-[11px] font-semibold text-[#16A34A]">
                  +1 Treasure • 1 Day Streak Updated
                </p>
                <button
                  type="button"
                  className="mt-[10px] flex h-[34px] w-full cursor-pointer items-center justify-center rounded-[6px] border border-[#22C55E] bg-white text-[12px] font-medium text-[#16A34A] transition hover:bg-[#ECFDF3]"
                >
                  Return Home
                </button>
              </div>
            </div>
          </div>

          {/* Publishing */}
          <div className="flex flex-1 flex-col rounded-[10px] border border-[#E5E7EB] bg-white p-[22px]">
            <h3 className="text-[14px] font-bold text-[#0B1250]">Publishing</h3>

            <div className="mt-[16px]">
              <p className="mb-[6px] text-[11px] font-semibold text-[#0B1250]">Status:</p>
              <SelectBox
                className="w-[240px]"
                value={v.status}
                onChange={upd("status")}
                options={["Scheduled", "Live", "Draft"]}
              />
            </div>

            <div className="mt-[12px]">
              <p className="mb-[6px] text-[11px] font-semibold text-[#0B1250]">Schedule Date:</p>
              <div className="relative">
                <input
                  value={v.scheduleDate}
                  onChange={upd("scheduleDate")}
                  className={`${inputCls} pr-[34px]`}
                />
                <PiCalendarBlank
                  size={15}
                  className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 text-[#5B5F8C]"
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
                  <p className="flex items-center justify-between">
                    <span>Last edited by:</span>
                    <span className="font-medium text-[#0B1250]">Admin</span>
                  </p>
                  <p className="flex items-center justify-between">
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
                  <li
                    key={item}
                    className="flex items-center gap-[8px] text-[12px] text-[#0B1250]"
                  >
                    <PiCheckCircle size={16} weight="fill" color="#22C55E" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-wrap items-center justify-between gap-[16px]">
        <button
          onClick={() => setStep(1)}
          className="flex h-[44px] w-[130px] cursor-pointer items-center justify-center gap-[6px] rounded-[6px] border border-[#E5E7EB] bg-white text-[12px] font-semibold text-[#0B1250] transition hover:bg-[#F8FAFC]"
        >
          Back
        </button>
        <div className="flex flex-wrap items-center gap-[12px]">
          <button className="flex h-[44px] cursor-pointer items-center gap-[8px] rounded-[6px] border border-[#E5E7EB] bg-white px-[18px] text-[12px] font-semibold text-[#0B1250] transition hover:bg-[#F8FAFC]">
            <PiEye size={15} />
            Preview
          </button>
          <button className="flex h-[46px] w-[260px] cursor-pointer items-center justify-center gap-[8px] rounded-[6px] bg-[#0B1F7A] text-[12px] font-semibold text-white transition hover:bg-[#0a1c68]">
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
    verseText: "\u201cBut David encouraged himself in the LORD his God.\u201d",
    whyItMatters:
      "Seek strength and direction from God during difficult moments.",
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

  const upd =
    (key) =>
    (e) =>
      setV((p) => ({ ...p, [key]: e && e.target ? e.target.value : e }));

  return (
    <div className="flex min-h-screen flex-col gap-[16px] bg-[#F8FAFC] p-6 font-[Inter]">
      <TopHeader step={step} setStep={setStep} />
      {step === 1 ? (
        <StepOne v={v} upd={upd} setStep={setStep} navigate={navigate} />
      ) : (
        <StepTwo v={v} upd={upd} setStep={setStep} />
      )}
    </div>
  );
}