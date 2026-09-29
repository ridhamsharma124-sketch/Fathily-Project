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
  LuMaximize2,
  LuType,
  LuHash,
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

const FONT_FAMILIES = ["Inter", "Poppins", "Georgia", "Arial"];
const FONT_SIZES = ["14", "16", "18", "20", "24", "32"];

/* ==========================================================================
   FORM PRIMITIVES
   ========================================================================== */
function FieldLabel({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[13px] font-semibold text-body"
    >
      {children}
    </label>
  );
}

function TextInput({ className = "", ...props }) {
  return (
    <input
      className={`h-11 w-full rounded-lg border border-edge bg-card px-3 text-sm text-body outline-none transition-colors placeholder:text-placeholder-ink focus:border-primary focus:ring-2 focus:ring-edge ${className}`}
      {...props}
    />
  );
}

function IconInput({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sub"
      />
      <input
        className="h-11 w-full rounded-lg border border-edge bg-card pl-10 pr-3 text-sm text-body outline-none transition-colors placeholder:text-placeholder-ink focus:border-primary focus:ring-2 focus:ring-edge"
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
        className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-edge bg-card pl-3 pr-10 text-sm text-body outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-edge"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <LuChevronRight
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sub"
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
      className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-toggle-on" : "bg-toggle-off"
      }`}
    >
      <span
        className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-card transition-all ${
          checked ? "left-[23px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}

function InfoDot() {
  return (
    <span
      title="More info"
      className="inline-flex h-4 w-4 shrink-0 cursor-help select-none items-center justify-center rounded-full border border-primary text-[10px] font-bold leading-none text-primary"
    >
      !
    </span>
  );
}

function SegmentedControl({ options, value, onChange }) {
  return (
    <div className="flex h-11 w-full overflow-hidden rounded-lg border border-edge bg-card">
      {options.map((option, index) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`flex-1 cursor-pointer text-sm font-medium transition-colors ${
            index > 0 ? "border-l border-edge" : ""
          } ${
            value === option
              ? "bg-seg text-body"
              : "bg-card text-sub hover:text-body"
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
    <label className="inline-flex cursor-pointer items-center gap-2.5">
      <span className="relative inline-flex h-[18px] w-[18px]">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-[3px] border border-edge bg-card transition-colors checked:border-primary checked:bg-primary"
        />
        <LuCheck
          size={13}
          strokeWidth={3}
          className="pointer-events-none absolute left-[2.5px] top-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
        />
      </span>
      <span className="text-sm text-body">{label}</span>
    </label>
  );
}

/* ==========================================================================
   RICH TEXT TOOLBAR
   ========================================================================== */
function ToolButton({ children, title, className = "" }) {
  return (
    <button
      type="button"
      title={title}
      className={`inline-flex h-8 cursor-pointer items-center justify-center gap-1 rounded border border-toolbar-edge bg-toolbar px-2 text-body transition-colors hover:bg-toolbar-hover ${className}`}
    >
      {children}
    </button>
  );
}

function ToolSelect({ value, onChange, options, icon, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-8 w-full cursor-pointer appearance-none rounded border border-toolbar-edge bg-toolbar pl-2 pr-7 text-[13px] font-medium text-body outline-none transition-colors hover:bg-toolbar-hover ${
          icon ? "pl-7" : ""
        }`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {icon && (
        <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-body">
          {icon}
        </span>
      )}
      <LuChevronDown
        size={12}
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-body"
      />
    </div>
  );
}

function ToolDivider() {
  return <span className="mx-1 h-5 w-px shrink-0 bg-toolbar-edge" />;
}

function Caret() {
  return <LuChevronDown size={10} className="shrink-0" />;
}

function Toolbar() {
  const [family, setFamily] = useState("Inter");
  const [size, setSize] = useState("20");

  return (
    <div className="flex flex-col gap-2 border-b border-edge bg-card p-2.5">
      {/* Row 1 */}
      <div className="flex flex-wrap items-center gap-2">
        <ToolSelect
          value={family}
          onChange={setFamily}
          options={FONT_FAMILIES}
          icon={<LuType size={13} />}
          className="w-[124px]"
        />
        <ToolSelect
          value={size}
          onChange={setSize}
          options={FONT_SIZES}
          icon={<LuHash size={13} />}
          className="w-[86px]"
        />
        <ToolDivider />
        <ToolButton title="Bulleted list">
          <LuList size={15} />
        </ToolButton>
        <ToolButton title="Numbered list">
          <LuListOrdered size={15} />
        </ToolButton>
        <ToolDivider />
        <ToolButton title="Text highlight">
          <span className="flex items-center gap-0.5">
            <span className="h-[15px] w-[15px] rounded-[2px] bg-highlight" />
            <Caret />
          </span>
        </ToolButton>
        <ToolButton title="Text color">
          <span className="flex items-center gap-0.5">
            <span className="text-[15px] font-bold leading-none text-color-icon">
              A
            </span>
            <Caret />
          </span>
        </ToolButton>
        <ToolDivider />
        <ToolButton title="Align left">
          <LuAlignLeft size={15} />
        </ToolButton>
        <ToolButton title="Align center">
          <LuAlignCenter size={15} />
        </ToolButton>
        <ToolButton title="Align right">
          <LuAlignRight size={15} />
        </ToolButton>
        <ToolButton title="Indent">
          <LuIndentIncrease size={15} />
        </ToolButton>
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap items-center gap-2">
        <ToolButton title="Bold">
          <LuBold size={15} />
        </ToolButton>
        <ToolButton title="Italic">
          <LuItalic size={15} />
        </ToolButton>
        <ToolButton title="Underline">
          <span className="flex items-center gap-0.5">
            <LuUnderline size={15} />
            <Caret />
          </span>
        </ToolButton>
        <ToolDivider />
        <ToolButton title="Insert table">
          <LuTable size={15} />
          <Caret />
        </ToolButton>
        <ToolButton title="Insert link">
          <LuLink size={15} />
        </ToolButton>
        <ToolButton title="Format as code">
          <LuCode size={15} />
        </ToolButton>
        <ToolButton title="Fullscreen editor" className="ml-auto">
          <LuMaximize2 size={15} />
        </ToolButton>
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
  const isCreate = searchParams.get("mode") === "create";

  const [docType, setDocType] = useState(isCreate ? "" : "Terms of Use");
  const [title, setTitle] = useState(isCreate ? "" : "Terms of Use");
  const [version, setVersion] = useState(isCreate ? "" : "v2.5");
  const [effectiveDate, setEffectiveDate] = useState(
    isCreate ? "" : "Aug 01, 2026",
  );
  const [status, setStatus] = useState("Draft");
  const [requireAcceptance, setRequireAcceptance] = useState(true);
  const [showNotice, setShowNotice] = useState(true);
  const [appliesTo, setAppliesTo] = useState({ mobile: true, web: true });
  const [summary, setSummary] = useState(
    isCreate
      ? ""
      : "Updated effective date and clarified clauses for subscription billing and user responsibilities.",
  );

  const goBack = () => navigate("/admin/terms-privacy");

  return (
    <div className="min-h-screen space-y-6 bg-page p-6 font-[Inter]">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-heading">
            {isCreate ? "Add Legal Document" : "Edit Legal Document"}
          </h1>
          <span className="rounded-md bg-badge-gray px-2 py-1 text-[13px] font-medium text-sub">
            {status}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-edge bg-card px-4 text-sm font-medium text-body transition-colors hover:bg-soft"
          >
            <LuSave size={16} />
            Save draft
          </button>
          <button
            type="button"
            className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-edge bg-card px-4 text-sm font-medium text-body transition-colors hover:bg-soft"
          >
            <LuEye size={16} />
            Preview
          </button>
          <button
            type="button"
            className="flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            <LuPlus size={16} />
            Publish Update
          </button>
        </div>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.8fr_1fr]">
        {/* ---------- LEFT CARD ---------- */}
        <div className="rounded-[10px] border border-edge bg-card p-6">
          <div>
            <FieldLabel htmlFor="doc-type">Document type</FieldLabel>
            <div id="doc-type">
              <SelectField
                value={docType}
                onChange={setDocType}
                options={
                  isCreate ? ["Select a document type", ...DOCUMENT_TYPES] : DOCUMENT_TYPES
                }
              />
            </div>
          </div>

          <div className="mt-6">
            <FieldLabel htmlFor="doc-title">Document title</FieldLabel>
            <TextInput
              id="doc-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title"
            />
          </div>

          <div className="mt-6">
            <FieldLabel>Document content</FieldLabel>
            <div className="overflow-hidden rounded-lg border border-edge">
              <Toolbar />
              <div className="min-h-[320px] p-5">
                {isCreate ? (
                  <p className="text-sm text-sub">
                    Start writing your document content here.
                  </p>
                ) : (
                  SECTIONS.map((section) => (
                    <div key={section.title} className="mb-5 last:mb-0">
                      <h3 className="text-[15px] font-medium text-body">
                        {section.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-[1.5] text-editor">
                        {section.body}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- RIGHT CARD ---------- */}
        <div className="rounded-[10px] border border-edge bg-card p-6">
          <div>
            <FieldLabel htmlFor="doc-version">Version</FieldLabel>
            <TextInput
              id="doc-version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="e.g. v1.0"
            />
          </div>

          <div className="mt-5">
            <FieldLabel htmlFor="doc-date">Effective date</FieldLabel>
            <IconInput
              id="doc-date"
              icon={LuCalendar}
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              placeholder="Select a date"
            />
          </div>

          <div className="mt-5">
            <FieldLabel>Status</FieldLabel>
            <SegmentedControl
              options={["Draft", "Published"]}
              value={status}
              onChange={setStatus}
            />
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-sm text-body">
              Require user acceptance again
              <InfoDot />
            </span>
            <Toggle
              checked={requireAcceptance}
              onChange={setRequireAcceptance}
              label="Require user acceptance again"
            />
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-sm text-body">
              Show update notice
              <InfoDot />
            </span>
            <Toggle
              checked={showNotice}
              onChange={setShowNotice}
              label="Show update notice"
            />
          </div>

          <div className="mt-5">
            <p className="text-[13px] font-semibold text-body">Applies to</p>
            <div className="mt-3 flex flex-wrap items-center gap-5">
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

          <div className="mt-5">
            <FieldLabel htmlFor="doc-summary">Summary of changes</FieldLabel>
            <textarea
              id="doc-summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Describe what changed in this version"
              className="h-20 w-full resize-none rounded-lg border border-edge bg-card px-3 py-2.5 text-sm leading-[1.5] text-body outline-none transition-colors placeholder:text-placeholder-ink focus:border-primary focus:ring-2 focus:ring-edge"
            />
          </div>

          <button
            type="button"
            className="mt-5 inline-flex cursor-pointer items-center gap-2 text-sm text-sub transition-colors hover:text-primary"
          >
            <LuClock size={16} />
            Revision history
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={goBack}
          className="h-11 w-full cursor-pointer rounded-lg border border-edge bg-card px-5 text-sm font-semibold text-body transition-colors hover:bg-soft sm:w-[140px]"
        >
          Back
        </button>

        <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <button
            type="button"
            className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-primary bg-card px-5 text-sm font-semibold text-primary transition-colors hover:bg-soft"
          >
            <LuSave size={16} />
            Save draft
          </button>
          <button
            type="button"
            className="h-11 w-full cursor-pointer rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover sm:w-[220px]"
          >
            Publish Updates
          </button>
        </div>
      </div>
    </div>
  );
}
