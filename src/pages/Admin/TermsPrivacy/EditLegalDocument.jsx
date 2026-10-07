import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  LuSave,
  LuEye,
  LuPlus,
  LuCalendar,
  LuChevronDown,
  LuChevronRight,
  LuCheck,
  LuClock,
  LuBold,
  LuItalic,
  LuUnderline,
  LuList,
  LuListOrdered,
  LuAlignLeft,
  LuAlignCenter,
  LuAlignRight,
  LuIndentIncrease,
  LuTable,
  LuLink,
  LuCode,
  LuEraser,
  LuMaximize2,
} from "react-icons/lu";

/* ==========================================================================
   STATIC CONTENT
   ========================================================================== */
const DOCUMENT_TYPES = [
  "Terms of Use",
  "Privacy Policy",
  "Community Guidelines",
  "Cookie Policy",
];

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By downloading, accessing, or using BriteOak, you agree to be bound by these Terms of Use. If you do not agree, please do not use the app.",
  },
  {
    title: "2. Using the App",
    body: "BriteOak is provided for your personal, non-commercial use. You agree not to misuse the app or interfere with its proper functioning.",
  },
  {
    title: "3. Accounts and Responsibilities",
    body: "You are responsible for maintaining the confidentiality of your account and for all activity that occurs under your account.",
  },
  {
    title: "4. Subscriptions and Payments",
    body: "Some features require a paid subscription. Payments are billed in advance and are non-refundable except as required by law.",
  },
];

const DOC_DEFAULTS = {
  "1": { type: "Terms of Use", title: "Terms of Use", version: "v2.5", date: "Aug 01, 2026" },
  "2": { type: "Privacy Policy", title: "Privacy Policy", version: "v4.1", date: "Jul 19, 2026" },
  "3": { type: "Community Guidelines", title: "Community Guidelines", version: "v1.0", date: "Aug 07, 2026" },
  "4": { type: "Cookie Policy", title: "Cookie Policy", version: "v2.0", date: "Aug 20, 2026" },
};

const FONT_FAMILIES = ["Inter", "Poppins", "Georgia", "Arial"];
const FONT_SIZES = ["14", "16", "18", "20", "24", "32"];

/*
  Figma values used below (derived from Figma panel + screenshots):
  - text:            #0A0847 (80% / 70% / 60% opacity variants)
  - primary:         #001984
  - card border:     #E2DFFC
  - toolbar border:  #CCCCCC
  - toggle ON:       #0B5ED7  (Figma blue - confirm exact hex in Figma if needed)
  - field group gap: 20px, label -> field gap: 10px
*/

/* ==========================================================================
   FORM PRIMITIVES
   ========================================================================== */
function FieldLabel({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-[10px] block text-[12px] font-semibold leading-[15px] text-[#0A0847]"
    >
      {children}
    </label>
  );
}

function TextInput({ className = "", ...props }) {
  return (
    <input
      className={`h-[46px] w-full rounded-[7.47px] border border-soft bg-card px-[12px] text-[12px] font-medium text-[#0A0847]/80 outline-none transition-colors placeholder:text-[#0A0847]/60 focus:border-primary focus:ring-2 focus:ring-edge ${className}`}
      {...props}
    />
  );
}

function IconInput({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon
        size={22}
        strokeWidth={1.5}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#0A0847]"
      />
      <input
        className="h-[46px] w-full rounded-[7.47px] border border-soft bg-card pl-[46px] pr-3 text-[12px] font-medium text-[#0A0847]/80 outline-none transition-colors placeholder:text-[#0A0847]/60 focus:border-primary focus:ring-2 focus:ring-edge"
        {...props}
      />
    </div>
  );
}

function SelectField({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[46px] w-full cursor-pointer appearance-none rounded-[7.47px] border border-soft bg-card py-[10px] pl-[12px] pr-[50px] text-[12px] font-medium text-[#0A0847]/80 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-edge"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <LuChevronRight
        size={14}
        className="pointer-events-none absolute right-[17px] top-1/2 -translate-y-1/2 text-[#0A0847]"
      />
    </div>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-[17px] w-[30px] shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-[#0B5ED7]" : "bg-toggle-off"
      }`}
    >
      <span
        className={`absolute top-[2px] h-[13px] w-[13px] rounded-full bg-white transition-all ${
          checked ? "left-[15px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

function InfoDot() {
  return (
    <span
      title="More info"
      className="inline-flex h-[22px] w-[22px] shrink-0 cursor-help select-none items-center justify-center rounded-full border-[1.5px] border-[#0A0847] text-[13px] font-bold leading-none text-[#0A0847]"
    >
      !
    </span>
  );
}

function SegmentedControl({ options, value, onChange }) {
  return (
    <div className="flex h-[46px] w-full overflow-hidden rounded-[7.47px] border border-soft bg-card">
      {options.map((option, index) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`flex-1 cursor-pointer text-[12px] font-medium transition-colors ${
            index > 0 ? "border-l border-edge" : ""
          } ${
            value === option
              ? "bg-seg text-[#0A0847]"
              : "bg-card text-[#0A0847]/80 hover:text-[#0A0847]"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function Checkbox({ checked, onChange, label }) {
  return (
    <label className="inline-flex w-fit cursor-pointer items-center gap-2">
      <span className="relative inline-flex h-[16px] w-[16px]">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer h-[16px] w-[16px] cursor-pointer appearance-none rounded-[3px] border border-edge bg-card transition-colors checked:border-primary checked:bg-primary"
        />
        <LuCheck
          size={11}
          strokeWidth={3}
          className="pointer-events-none absolute left-[2.5px] top-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
        />
      </span>
      <span className="text-[12px] font-medium leading-[15px] text-[#0A0847]/80">
        {label}
      </span>
    </label>
  );
}

/* ==========================================================================
   RICH TEXT TOOLBAR  (2 rows, fixed-width groups like Figma)
   ========================================================================== */
function Caret() {
  return <LuChevronDown size={10} className="shrink-0" />;
}

function ToolSelect({ value, onChange, options, className = "" }) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[27px] w-full cursor-pointer appearance-none rounded-[3.25px] border-[1.63px] border-[#CCCCCC] bg-white pl-2 pr-6 text-[12px] font-medium text-[#0A0847] outline-none transition-colors hover:bg-[#F3F3FB]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <LuChevronDown
        size={12}
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#0A0847]"
      />
    </div>
  );
}

/* A joined group of buttons: 88 x 27, 1px #CCC border, radius 3.25 */
function ToolGroup({ children }) {
  return (
    <div className="inline-flex h-[27px] w-[88px] shrink-0 items-stretch divide-x divide-[#CCCCCC] overflow-hidden rounded-[3.25px] border border-[#CCCCCC] bg-white">
      {children}
    </div>
  );
}

function ToolBtn({ title, children }) {
  return (
    <button
      type="button"
      title={title}
      className="flex flex-1 cursor-pointer items-center justify-center gap-[2px] text-[#0A0847] transition-colors hover:bg-[#F3F3FB]"
    >
      {children}
    </button>
  );
}

function Toolbar() {
  const [family, setFamily] = useState("Inter");
  const [size, setSize] = useState("20");

  return (
    <div className="flex shrink-0 flex-col gap-[9px] overflow-x-auto">
      {/* Row 1 */}
      <div className="flex items-center gap-[13px]">
        <ToolSelect
          value={family}
          onChange={setFamily}
          options={FONT_FAMILIES}
          className="w-[188px]"
        />
        <ToolSelect
          value={size}
          onChange={setSize}
          options={FONT_SIZES}
          className="w-[88px]"
        />
        <ToolGroup>
          <ToolBtn title="Bulleted list">
            <LuList size={14} />
          </ToolBtn>
          <ToolBtn title="Numbered list">
            <LuListOrdered size={14} />
          </ToolBtn>
        </ToolGroup>
        <ToolGroup>
          <ToolBtn title="Text highlight">
            <span className="h-[13px] w-[13px] rounded-[2px] bg-highlight" />
            <Caret />
          </ToolBtn>
          <ToolBtn title="Text color">
            <span className="flex flex-col items-center leading-none">
              <span className="text-[13px] font-bold text-color-icon">A</span>
              <span className="mt-[1px] h-[2px] w-[11px] bg-red-600" />
            </span>
            <Caret />
          </ToolBtn>
        </ToolGroup>
        <ToolGroup>
          <ToolBtn title="Align left">
            <LuAlignLeft size={12} />
          </ToolBtn>
          <ToolBtn title="Align center">
            <LuAlignCenter size={12} />
          </ToolBtn>
          <ToolBtn title="Align right">
            <LuAlignRight size={12} />
          </ToolBtn>
          <ToolBtn title="Indent">
            <LuIndentIncrease size={12} />
          </ToolBtn>
        </ToolGroup>
      </div>

      {/* Row 2 : starts under the size dropdown (188 + 13 = 201px) */}
      <div className="flex items-center gap-[13px] pl-[201px]">
        <ToolGroup>
          <ToolBtn title="Bold">
            <LuBold size={13} />
          </ToolBtn>
          <ToolBtn title="Italic">
            <LuItalic size={13} />
          </ToolBtn>
          <ToolBtn title="Underline">
            <LuUnderline size={13} />
            <Caret />
          </ToolBtn>
        </ToolGroup>
        <ToolGroup>
          <ToolBtn title="Insert table">
            <LuTable size={14} />
            <Caret />
          </ToolBtn>
        </ToolGroup>
        <ToolGroup>
          <ToolBtn title="Insert link">
            <LuLink size={12} />
          </ToolBtn>
          <ToolBtn title="Code">
            <LuCode size={12} />
          </ToolBtn>
          <ToolBtn title="Clear formatting">
            <LuEraser size={12} />
          </ToolBtn>
          <ToolBtn title="Fullscreen">
            <LuMaximize2 size={12} />
          </ToolBtn>
        </ToolGroup>
      </div>
    </div>
  );
}

/* ==========================================================================
   MAIN PAGE
   ========================================================================== */
export default function EditLegalDocument() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const doc = DOC_DEFAULTS[searchParams.get("id")] || DOC_DEFAULTS["1"];

  const [docType, setDocType] = useState(doc.type);
  const [title, setTitle] = useState(doc.title);
  const [version, setVersion] = useState(doc.version);
  const [effectiveDate, setEffectiveDate] = useState(doc.date);
  const [status, setStatus] = useState("Draft");
  const [requireAcceptance, setRequireAcceptance] = useState(true);
  const [showNotice, setShowNotice] = useState(true);
  const [appliesTo, setAppliesTo] = useState({ mobile: true, web: true });
  const [summary, setSummary] = useState(
    "Updated effective date and clarified clauses for subscription billing and user responsibilities.",
  );

  const goBack = () => navigate("/admin/terms-privacy");

  return (
    <div className="ld-theme min-h-screen bg-page p-6 font-[Inter] leading-[100%]">
      {/* ------------------------------ Header ------------------------------ */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-5">
          <h1 className="text-[22px] font-semibold leading-[27px] text-heading">
            Edit Legal Document
          </h1>
          <span className="rounded-[4px] bg-badge-gray px-2 py-[5px] text-[12px] font-medium leading-[15px] text-sub">
            {status}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="flex h-[42px] cursor-pointer items-center gap-[10px] rounded-lg border border-edge bg-card px-4 text-[14px] font-medium text-[#0A0847] transition-colors hover:bg-soft"
          >
            <LuSave size={18} />
            Save draft
          </button>
          <button
            type="button"
            className="flex h-[42px] cursor-pointer items-center gap-[10px] rounded-lg border border-edge bg-card px-4 text-[14px] font-medium text-[#0A0847] transition-colors hover:bg-soft"
          >
            <LuEye size={18} />
            Preview
          </button>
          <button
            type="button"
            className="flex h-[42px] w-[178px] cursor-pointer items-center justify-center gap-[10px] rounded-lg bg-primary px-4 text-[14px] font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            <LuPlus size={18} />
            Publish Update
          </button>
        </div>
      </div>

      {/* ------------------------- Two column layout ------------------------ */}
      <div className="mt-6 grid grid-cols-1 items-stretch gap-[29px] lg:grid-cols-[663fr_379fr]">
        {/* ---------- LEFT CARD ---------- */}
        <div className="flex min-h-[671px] flex-col gap-5 rounded-[7.5px] border-[0.75px] border-soft bg-card p-[23px]">
          <div>
            <FieldLabel htmlFor="doc-type">Document type</FieldLabel>
            <div id="doc-type">
              <SelectField
                value={docType}
                onChange={setDocType}
                options={DOCUMENT_TYPES}
              />
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="doc-title">Document title</FieldLabel>
            <TextInput
              id="doc-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title"
            />
          </div>

          <div>
            <FieldLabel>Document content</FieldLabel>
            {/* Editor box: 622 x 397 total (toolbar is INSIDE the box) */}
            <div className="flex h-[397px] flex-col gap-4 overflow-hidden rounded-[7.47px] border border-soft bg-card px-3 py-[10px]">
              <Toolbar />
              <div className="min-h-0 flex-1 overflow-auto pr-[38px]">
                <div className="flex flex-col gap-3">
                  {SECTIONS.map((section) => (
                    <div key={section.title}>
                      <h3 className="text-[14px] font-medium leading-[17px] text-[#0A0847]">
                        {section.title}
                      </h3>
                      <p className="mt-[6px] text-[12px] font-medium leading-[15px] text-[#0A0847]/70">
                        {section.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- RIGHT CARD ---------- */}
        <div className="flex flex-col gap-5 rounded-[7.5px] border-[0.75px] border-soft bg-card px-4 pb-[22px] pt-[23px]">
          <div>
            <FieldLabel htmlFor="doc-version">Version</FieldLabel>
            <TextInput
              id="doc-version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="e.g. v1.0"
            />
          </div>

          <div>
            <FieldLabel htmlFor="doc-date">Effective date</FieldLabel>
            <IconInput
              id="doc-date"
              icon={LuCalendar}
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              placeholder="Select a date"
            />
          </div>

          <div>
            <FieldLabel>Status</FieldLabel>
            <SegmentedControl
              options={["Draft", "Published"]}
              value={status}
              onChange={setStatus}
            />
          </div>

          <div className="flex h-[24px] items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-[13px] font-semibold leading-[16px] text-[#0A0847]/80">
              Require user acceptance again
              <InfoDot />
            </span>
            <Toggle
              checked={requireAcceptance}
              onChange={setRequireAcceptance}
              label="Require user acceptance again"
            />
          </div>

          <div className="flex h-[24px] items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-[13px] font-semibold leading-[16px] text-[#0A0847]/80">
              Show update notice
              <InfoDot />
            </span>
            <Toggle
              checked={showNotice}
              onChange={setShowNotice}
              label="Show update notice"
            />
          </div>

          {/* Applies to: checkboxes are STACKED vertically in Figma */}
          <div>
            <p className="text-[14px] font-semibold leading-[17px] text-[#0A0847]">
              Applies to
            </p>
            <div className="mt-[9px] flex flex-col gap-[10px]">
              <Checkbox
                label="Mobile app"
                checked={appliesTo.mobile}
                onChange={(v) => setAppliesTo((p) => ({ ...p, mobile: v }))}
              />
              <Checkbox
                label="Web app"
                checked={appliesTo.web}
                onChange={(v) => setAppliesTo((p) => ({ ...p, web: v }))}
              />
            </div>
          </div>

          {/* extra 20px space before Summary (Figma has a larger gap here) */}
          <div className="mt-5">
            <FieldLabel htmlFor="doc-summary">Summary of changes</FieldLabel>
            <textarea
              id="doc-summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Describe what changed in this version"
              className="h-[75px] w-full resize-none rounded-[7.47px] border border-soft bg-card px-3 py-[10px] text-[12px] font-medium leading-[15px] text-[#0A0847]/80 outline-none transition-colors placeholder:text-[#0A0847]/60 focus:border-primary focus:ring-2 focus:ring-edge"
            />
          </div>

          <button
            type="button"
            className="inline-flex w-fit cursor-pointer items-center gap-[8px] text-[13px] font-medium leading-[16px] text-[#0A0847]/60 transition-colors hover:text-primary"
          >
            <LuClock size={18} />
            Revision history
          </button>
        </div>
      </div>

      {/* ------------------------------ Footer ------------------------------ */}
      {/* Figma: Back 197 | gap 298 | Save draft 212 | gap 32 | Publish 317 */}
      <div className="mt-8 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center sm:px-3">
        <button
          type="button"
          onClick={goBack}
          className="h-[42px] w-full cursor-pointer rounded-lg border border-soft bg-card px-4 text-[14px] font-semibold text-[#0A0847] transition-colors hover:bg-soft sm:w-[197px]"
        >
          Back
        </button>

        <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-8">
          <button
            type="button"
            className="flex h-[42px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-lg border border-primary bg-white px-4 text-[14px] font-semibold text-primary transition-colors hover:bg-soft sm:w-[212px]"
          >
            <LuSave size={16} />
            Save draft
          </button>
          <button
            type="button"
            className="h-[42px] w-full cursor-pointer rounded-lg bg-primary px-4 text-[14px] font-semibold text-white transition-colors hover:bg-primary-hover sm:w-[317px]"
          >
            Publish Updates
          </button>
        </div>
      </div>
    </div>
  );
}