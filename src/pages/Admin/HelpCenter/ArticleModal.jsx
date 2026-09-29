import { useEffect, useRef, useState } from "react";
import {
  LuCircleX,
  LuChevronDown,
  LuBold,
  LuItalic,
  LuUnderline,
  LuLink,
  LuList,
  LuX,
} from "react-icons/lu";

const MAX_SUMMARY = 160;

const TITLE_OPTIONS = [
  "Manage My Subscription",
  "Managing Your Subscription",
  "Payment Method",
  "Gift Code Redemption",
  "Set Reading Plan Goals",
  "Reset Password",
];

const CATEGORY_OPTIONS = [
  "Subscription & Billing",
  "Gift Codes",
  "Account Settings",
  "Bible Content",
  "Donations",
  "Notifications",
  "Security",
  "Privacy Tips",
];

const SUMMARY_BODY =
  "You can view, change, or cancel your subscription at any time.";

const SUMMARY_STEPS = [
  "Go to Profile > My Subscription.",
  "View your current plan and next billing date.",
  "Tap Change Plan to upgrade or downgrade.",
];

const DEFAULT_CHIPS = ["Update Payment Method", "Cancel Subscription"];

/* ==========================================================================
   FIELD PRIMITIVES
   ========================================================================== */
function Label({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-semibold text-label"
    >
      {children}
    </label>
  );
}

function SelectField({ id, value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[46px] w-full cursor-pointer appearance-none rounded-lg border border-edge bg-card pl-[14px] pr-[14px] text-sm text-body outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-edge"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <LuChevronDown
        size={16}
        strokeWidth={2.5}
        className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 text-select-chevron"
      />
    </div>
  );
}

/* ==========================================================================
   RICH TEXT TOOLBAR — one joined button group
   ========================================================================== */
function Toolbar() {
  const base =
    "flex h-7 items-center justify-center gap-0.5 bg-toolbar px-1.5 text-toolbar-icon transition-colors hover:bg-toolbar-hover";

  return (
    <div className="border-b border-edge px-3 py-2.5">
      <div className="inline-flex overflow-hidden rounded border border-toolbar-edge">
        <button type="button" title="Bold" className={`${base} w-7`}>
          <LuBold size={14} />
        </button>
        <button
          type="button"
          title="Italic"
          className={`${base} w-7 border-l border-toolbar-edge`}
        >
          <LuItalic size={14} />
        </button>
        <button
          type="button"
          title="Underline"
          className={`${base} border-l border-toolbar-edge`}
        >
          <LuUnderline size={14} />
          <LuChevronDown size={10} strokeWidth={2.5} />
        </button>
        <button
          type="button"
          title="Insert link"
          className={`${base} w-7 border-l border-toolbar-edge`}
        >
          <LuLink size={14} />
        </button>
        <button
          type="button"
          title="Bullet list"
          className={`${base} w-7 border-l border-toolbar-edge`}
        >
          <LuList size={14} />
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   PUBLISHED TOGGLE — 36x20
   ========================================================================== */
function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-toggle-on" : "bg-toggle-off"
      }`}
    >
      <span
        className={`absolute top-[2px] h-4 w-4 rounded-full bg-card transition-all ${
          checked ? "left-[18px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

/* ==========================================================================
   CREATE / EDIT ARTICLE — centered modal dialog
   ========================================================================== */
export default function ArticleModal({ mode, article, onClose }) {
  const isCreate = mode === "create";
  const dialogRef = useRef(null);

  const [title, setTitle] = useState(isCreate ? "" : (article?.title ?? ""));
  const [category, setCategory] = useState(
    isCreate ? "" : (article?.category ?? ""),
  );
  const [summary, setSummary] = useState(
    isCreate
      ? ""
      : "Manage your subscription, payments, and billing information.",
  );
  const [chips, setChips] = useState(isCreate ? [] : [...DEFAULT_CHIPS]);
  const [published, setPublished] = useState(!isCreate);

  /* focus trap + focus returns to the trigger that opened the modal */
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const node = dialogRef.current;

    const focusables = () =>
      Array.from(
        node?.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    node?.addEventListener("keydown", onKeyDown);
    return () => {
      node?.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose]);

  const removeChip = (chip) =>
    setChips((prev) => prev.filter((item) => item !== chip));

  return (
    <div className="am-theme fixed inset-0 z-[70]">
      {/* overlay */}
      <div
        className="absolute inset-0 backdrop-blur-[6px]"
        style={{ background: "var(--overlay)" }}
        onClick={onClose}
        aria-hidden
      />

      {/* dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={isCreate ? "Create Article" : "Edit Article"}
        className="fixed left-1/2 top-1/2 flex max-h-[92vh] w-[600px] max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[12px] bg-card font-[Inter]"
        style={{ boxShadow: "var(--modal-shadow)" }}
      >
        {/* header */}
        <div className="flex items-start justify-between gap-3 border-b border-divider p-[20px]">
          <h2 className="text-lg font-bold text-heading">
            Create / Edit Article
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 -mt-1 flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-close transition-opacity hover:opacity-70"
          >
            <LuCircleX size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* body — only this scrolls */}
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-[20px]">
          <div>
            <Label htmlFor="article-title">Article Title</Label>
            <SelectField
              id="article-title"
              value={title}
              onChange={setTitle}
              options={TITLE_OPTIONS}
              placeholder="Select article title"
            />
          </div>

          <div>
            <Label htmlFor="article-category">Category</Label>
            <SelectField
              id="article-category"
              value={category}
              onChange={setCategory}
              options={CATEGORY_OPTIONS}
              placeholder="Select category"
            />
          </div>

          <div>
            <Label htmlFor="article-summary">Short Description</Label>
            <div className="relative">
              <textarea
                id="article-summary"
                value={summary}
                maxLength={MAX_SUMMARY}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Add a short description"
                className="h-[76px] w-full resize-none rounded-lg border border-edge bg-card py-3 pl-[14px] pr-[14px] text-sm text-body outline-none transition-colors placeholder:text-placeholder-ink focus:border-primary focus:ring-2 focus:ring-edge"
              />
              <span className="pointer-events-none absolute bottom-2 right-3 text-xs text-counter">
                {summary.length}/{MAX_SUMMARY}
              </span>
            </div>
          </div>

          <div>
            <Label>Story Summary:</Label>
            <div className="overflow-hidden rounded-lg border border-edge">
              <Toolbar />
              <div className="p-4">
                {isCreate ? (
                  <p className="text-sm font-medium text-body-muted">
                    Write the article story summary here.
                  </p>
                ) : (
                  <>
                    <p className="text-sm font-medium leading-[1.5] text-body-muted">
                      {SUMMARY_BODY}
                    </p>
                    <ol className="mt-2 space-y-1">
                      {SUMMARY_STEPS.map((step, index) => (
                        <li
                          key={step}
                          className="flex gap-2 text-sm font-medium leading-[1.5] text-counter"
                        >
                          <span className="font-bold">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <Label>Related Articles</Label>
            <div className="flex flex-wrap gap-2 rounded-lg border border-edge p-3">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="flex h-8 items-center gap-1.5 rounded-lg border border-chip-edge bg-chip px-[10px] text-xs font-semibold text-chip-text"
                >
                  {chip}
                  <button
                    type="button"
                    onClick={() => removeChip(chip)}
                    aria-label={`Remove ${chip}`}
                    className="cursor-pointer text-chip-x transition-opacity hover:opacity-70"
                  >
                    <LuX size={16} strokeWidth={2.5} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-bold text-heading">Published</span>
            <Toggle
              checked={published}
              onChange={setPublished}
              label="Published"
            />
          </div>
        </div>

        {/* footer */}
        <div className="border-t border-divider p-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="h-[46px] cursor-pointer rounded-lg border border-btn-edge bg-card text-[15px] font-medium text-btn-text transition-colors hover:bg-chip"
            >
              Save Draft
            </button>
            <button
              type="button"
              className="h-[46px] cursor-pointer rounded-lg border border-btn-edge bg-card text-[15px] font-medium text-btn-text transition-colors hover:bg-chip"
            >
              Preview
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-3 h-[46px] w-full cursor-pointer rounded-lg bg-primary text-[15px] font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
