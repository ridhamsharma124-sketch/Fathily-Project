import { useRef, useState } from "react";
import selectorBookIcon from "../../../assets/activities/icon-book-purple.svg";
import uploadCloudIcon from "../../../assets/activities/upload_cloud.svg";
import {
  LuDownload,
  LuSearch,
  LuFileText,
  LuCircleCheck,
  LuTriangleAlert,
  LuPencil,
  LuTrash2,
  LuChevronDown,
} from "react-icons/lu";

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const QUESTION_TYPE_OPTIONS = ["Multiple Choice"];

const MOCK_FILE_NAME = "john_3_bulkquiz_2026.csv";
const MOCK_FILE_META = "12.4 KB • 25 rows";

const STAT_CARDS = [
  {
    key: "ready",
    value: "18",
    label: "Ready",
    icon: LuCircleCheck,
    iconWrap: "bg-[#21AC1C]/10",
    iconColor: "text-[#21AC1C]",
  },
  {
    key: "errors",
    value: "2",
    label: "Errors",
    icon: LuTriangleAlert,
    iconWrap: "bg-[#DC2626]/10",
    iconColor: "text-[#DC2626]",
  },
  {
    key: "duplicates",
    value: "0",
    label: "Duplicates",
    icon: LuFileText,
    iconWrap: "bg-[#2270AD]/10",
    iconColor: "text-[#2270AD]",
  },
];

const READY_COUNT = STAT_CARDS.find((stat) => stat.key === "ready")?.value ?? "0";

const TABLE_ROWS = [
  {
    no: "1",
    description: "Knowledge quiz with multiple question types",
    answer: "B",
    reference: "John 3:1–21",
    status: "Valid",
  },
  {
    no: "2",
    description: "What is the new birth?",
    answer: "A",
    reference: "John 3:3",
    status: "Valid",
  },
  {
    no: "3",
    description: "Who sent His only Son?",
    answer: "C",
    reference: "John 3:16",
    status: "Valid",
  },
  {
    no: "4",
    description: "What is the light mentioned?",
    answer: "C",
    reference: "John 3:19",
    status: "Error",
  },
  {
    no: "5",
    description: "Who must be born again?",
    answer: "B",
    reference: "John 3:5",
    status: "Valid",
  },
  {
    no: "6",
    description: "What is eternal life?",
    answer: "A",
    reference: "John 3:36",
    status: "Valid",
  },
];

/* ==========================================================================
   PAGE-LOCAL STYLES
   ========================================================================== */
const labelCls = "mb-1.5 block text-[12px] font-semibold text-[#0A0847]";

const fieldCls =
  "h-10 w-full rounded-[7.47px] border border-[#E2DFFC] bg-white py-[10px] pl-[12px] pr-[50px] text-[12px] font-medium text-[#0A0847]/80 outline-none transition focus:border-[#001984]";

const stepButton =
  "flex h-10 min-w-[133px] w-fit shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#001984] bg-[#FEFEFE] px-4 py-2 text-[13px] font-medium text-[#001984] transition-colors hover:bg-[#F1F1F9]";

const outlineButton =
  "flex h-12 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#001984] bg-[#FEFEFE] px-3 text-[14px] font-medium text-[#001984] transition-colors hover:bg-[#F1F1F9] sm:w-[152px]";

const purpleButton =
  "flex h-12 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#4022D1] px-4 py-[10px] text-[14px] font-medium text-white transition-colors hover:opacity-90 sm:w-[174px]";

const formatSize = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

/* Columns: checkbox | No. | Description | Correct Answer | Bible Reference | Status | Actions */
const TABLE_GRID =
  "grid min-w-[760px] grid-cols-[48px_56px_minmax(0,1fr)_120px_130px_100px_104px] items-center gap-3 px-4";

/* ==========================================================================
   ICONS (matched to Figma)
   ========================================================================== */

/* Grey document with folded corner and a green "CSV" tag at the bottom */
function CsvIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 28 36" fill="none" aria-hidden className={className}>
      <path
        d="M2 1.5h16.5L26 9v23.5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2.5a1 1 0 0 1 0-1Z"
        fill="#F4F5F7"
        stroke="#D5D9E0"
        strokeWidth="1"
      />
      <path d="M18.5 1.5V9H26" fill="#E4E7EC" stroke="#D5D9E0" strokeWidth="1" />
      <rect x="6" y="14" width="13" height="1.4" rx="0.7" fill="#B8C0CC" />
      <rect x="6" y="18" width="16" height="1.4" rx="0.7" fill="#B8C0CC" />
      <rect x="6" y="22" width="11" height="1.4" rx="0.7" fill="#B8C0CC" />
      <rect x="0" y="25" width="28" height="11" rx="2" fill="#21AC1C" />
      <text
        x="14"
        y="33"
        textAnchor="middle"
        fontSize="7"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
        fill="#FFFFFF"
      >
        CSV
      </text>
    </svg>
  );
}

/* Outlined green circle with a smaller tick inside */
function ValidatedIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      aria-label="File validated"
      role="img"
      className={className}
    >
      <circle cx="14" cy="14" r="12.25" stroke="#16A34A" strokeWidth="1.5" />
      <path
        d="M9.5 14.2l3 3 6-6.2"
        stroke="#16A34A"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Thin navy outline cloud with up-arrow, matches Figma */
function CloudUploadIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={className}>
      <path
        d="M14 36h-2.5a8.5 8.5 0 0 1-1.1-16.9A12 12 0 0 1 35.6 16.5 9.5 9.5 0 0 1 36 36h-3"
        stroke="#001984"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 42V24m0 0-5 5m5-5 5 5"
        stroke="#001984"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ==========================================================================
   SUB-COMPONENTS
   ========================================================================== */
function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-medium leading-[20px] text-[#0A0847]/60 sm:text-[16px]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item} className="flex min-w-0 items-center gap-2">
              {index > 0 && (
                <span aria-hidden className="text-[#0A0847]/60">
                  &gt;
                </span>
              )}
              <span className="break-words" aria-current={isLast ? "page" : undefined}>
                {item}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function LocationChip({ parts = ["New Testament", "John", "Chapter 3"] }) {
  return (
    <div className="flex min-h-[42px] w-full max-w-[469px] items-center gap-3 rounded-lg border border-[#E2DFFC] bg-[#F7F7F9] px-3 py-2.5 sm:px-4">
      <img src={selectorBookIcon} alt="" className="h-5 w-5 shrink-0 object-contain" />
      <p className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-[14px] font-semibold leading-[22px] text-[#0A0847] sm:text-[16px]">
        {parts.map((part, index) => (
          <span key={part} className="flex items-center gap-3">
            {index > 0 && <span className="text-[#0A0847]/60">&gt;</span>}
            <span>{part}</span>
          </span>
        ))}
      </p>
    </div>
  );
}

function StepRow({ step, title, description, headerRight, children }) {
  return (
    <section className="flex w-full min-w-0 flex-col gap-3 rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3.5">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#001984] text-[12px] font-semibold text-white">
            {step}
          </span>
          <div className="min-w-0">
            <h2 className="text-[14px] font-semibold text-[#0A0847]">{title}</h2>
            <p className="mt-0.5 text-[12px] font-medium text-[#0A0847]/60">{description}</p>
          </div>
        </div>
        {headerRight}
      </div>
      {children}
    </section>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function BulkUploadQuizQuestions() {
  const [questionType, setQuestionType] = useState("Multiple Choice");
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const dragDepth = useRef(0);

  const openPicker = () => fileInputRef.current?.click();

  const acceptFiles = (files) => {
    const picked = files?.[0];
    if (!picked) return;
    if (picked.type !== "text/csv" && !picked.name.toLowerCase().endsWith(".csv")) return;
    setFile(picked);
  };

  const fileName = file ? file.name : MOCK_FILE_NAME;
  const fileMeta = file ? `${formatSize(file.size)} • 25 rows` : MOCK_FILE_META;

  return (
    <div className="min-h-screen bg-[#F9FAFE] font-[Inter] text-[#0A0847]">
      <div className="flex w-full min-w-0 flex-col px-4 py-6 sm:px-6">
        <Breadcrumb
          items={["Bible Content", "Activities", "John", "Chapter 3", "Quiz", "Bulk Upload"]}
        />

        <h1 className="mt-4 break-words text-[20px] font-semibold text-[#0A0847] sm:mt-5 sm:text-[22px]">
          Bulk Upload Quiz Questions
        </h1>

        {/* TOP — Location chip + Question Type, same width as Figma (469px) */}
        <div className="mt-5 flex w-full max-w-[469px] flex-col gap-4">
          <LocationChip />

          <div className="w-full">
            <label htmlFor="q-type" className={labelCls}>
              Question Type <span className="text-[#E11D48]">*</span>
            </label>
            <div className="relative">
              <select
                id="q-type"
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className={`${fieldCls} cursor-pointer appearance-none`}
              >
                {QUESTION_TYPE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <LuChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0A0847]/60"
                aria-hidden
              />
            </div>
            <p className="mt-1.5 text-[10px] italic text-[#0A0847]/60">
              Choose the question type before uploading.
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => acceptFiles(e.target.files)}
        />

        {/* STEP CARDS */}
        <div className="mt-5 flex flex-col gap-4">
          {/* STEP 1 */}
          <StepRow
            step={1}
            title="Download CSV Template"
            description="Download the template file to enter your questions."
            headerRight={
              <button type="button" className={`${stepButton} w-full sm:w-auto`}>
                <LuDownload size={16} className="shrink-0" />
                Download Template
              </button>
            }
          />

          {/* STEP 2 — Drag-and-drop dropzone, sized and styled to Figma */}
          <StepRow
            step={2}
            title="Upload Completed CSV"
            description="Upload your filled data (CSV format)."
          >
            <div
              role="button"
              tabIndex={0}
              onClick={openPicker}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openPicker();
                }
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                dragDepth.current += 1;
                setDragActive(true);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                dragDepth.current -= 1;
                if (dragDepth.current <= 0) {
                  dragDepth.current = 0;
                  setDragActive(false);
                }
              }}
              onDrop={(e) => {
                e.preventDefault();
                dragDepth.current = 0;
                setDragActive(false);
                acceptFiles(e.dataTransfer.files);
              }}
              className={`relative mx-auto flex min-h-[130px] w-full max-w-[720px] cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-[#001984] px-4 py-6 transition-colors sm:flex-row sm:justify-between sm:px-6 ${
                dragActive ? "bg-[#E4E4F7]" : "bg-[#F3F4FF] hover:bg-[#EFEDF9]"
              }`}
            >
              <div className="flex flex-col items-center gap-2 text-center sm:flex-1 sm:flex-row sm:justify-center sm:gap-3">
<img src={uploadCloudIcon} alt="" className="h-[42px] w-auto shrink-0 sm:h-[46px]" />
                <div className="text-center">
                  <p className="text-[15px] font-semibold leading-[20px] text-[#0A0847] sm:text-[16px]">
                    Drag and drop your file here
                  </p>
                  <p className="text-[12px] leading-[16px] text-[#0A0847]/60">or</p>
                  <p className="text-[12px] leading-[16px] text-[#0A0847]/60">
                    Supported format: .csv
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openPicker();
                }}
                className="flex h-[38px] w-full shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#001984] bg-[#FEFEFE] px-3 text-[14px] font-medium text-[#001984] transition-colors hover:bg-[#F1F1F9] sm:w-[177px]"
              >
                Browse File
              </button>
            </div>
          </StepRow>
        </div>

        {/* COMBINED CARD — Validate Results + File Row + Stats + Table */}
        <section className="mt-4 flex w-full min-w-0 flex-col gap-4 rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#001984] text-[12px] font-semibold text-white">
                3
              </span>
              <div className="min-w-0">
                <h2 className="text-[14px] font-semibold text-[#0A0847]">Validate Results</h2>
                <p className="mt-0.5 text-[12px] font-medium text-[#0A0847]/60">
                  Review your file to confirm for errors before importing.
                </p>
              </div>
            </div>
            <button type="button" className={`${stepButton} w-full sm:w-auto`}>
              <LuSearch size={16} className="shrink-0" />
              Validate CSV
            </button>
          </div>

          {/* FILE ROW */}
          <div className="flex min-h-[72px] items-center justify-between gap-3 rounded-lg bg-[#F9F9FF] px-4 py-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <CsvIcon className="h-9 w-7 shrink-0" />
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold text-[#001984]">{fileName}</p>
                <p className="mt-0.5 text-[12px] text-[#0A0847]/60">{fileMeta}</p>
              </div>
            </div>
            <ValidatedIcon className="h-7 w-7 shrink-0" />
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {STAT_CARDS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.key}
                  className="flex min-h-[90px] min-w-0 items-center gap-4 rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] px-4 py-4 sm:min-h-[106px] sm:p-[22px]"
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] sm:h-[56px] sm:w-[56px] ${stat.iconWrap}`}
                  >
                    <Icon size={22} strokeWidth={1.6} className={stat.iconColor} aria-hidden />
                  </span>
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <p className="text-[20px] leading-none font-semibold text-[#0A0847] sm:text-[22px]">
                      {stat.value}
                    </p>
                    <p className="text-[13px] font-medium text-[#0A0847]/60 sm:text-[14px]">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* VALIDATION TABLE */}
          <div className="w-full overflow-x-auto rounded-lg border border-[#E2DFFC] bg-white">
            <div
              className={`${TABLE_GRID} h-[50px] bg-[#F3F7FD] text-[14px] font-medium text-[#0A0847]/80`}
            >
              <div className="flex items-center justify-start">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  className="h-4 w-4 cursor-pointer rounded-[4px] border border-[#E2DFFC] accent-[#001984]"
                />
              </div>
              <div className="text-center">No.</div>
              <div className="text-center">Description</div>
              <div className="text-center">Correct Answer</div>
              <div className="text-center">Bible Reference</div>
              <div className="text-center">Status</div>
              <div className="text-center">Actions</div>
            </div>

            {TABLE_ROWS.map((row) => (
              <div
                key={row.no}
                className={`${TABLE_GRID} h-[63px] border-b-[0.75px] border-[#E9E9E9] bg-white text-[12px] font-medium text-[#0A0847]/80 last:border-b-0`}
              >
                <div className="flex items-center justify-start">
                  <input
                    type="checkbox"
                    aria-label={`Select row ${row.no}`}
                    className="h-4 w-4 cursor-pointer rounded-[4px] border border-[#E2DFFC] accent-[#001984]"
                  />
                </div>
                <div className="text-center">{row.no}</div>
                <div className="text-center leading-4">{row.description}</div>
                <div className="text-center">{row.answer}</div>
                <div className="text-center">{row.reference}</div>
                <div className="flex items-center justify-center">
                  <span
                    className={`flex h-[28px] w-fit items-center rounded-lg px-3 text-[12px] font-medium ${
                      row.status === "Valid"
                        ? "bg-[#21AC1C]/10 text-[#21AC1C]"
                        : "bg-[#FEE2E2] text-[#DC2626]"
                    }`}
                  >
                    {row.status}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex w-[72px] shrink-0 gap-2">
                    <button
                      type="button"
                      aria-label={`Edit row ${row.no}`}
                      className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-[#E2DFFC] bg-white text-[#001984] transition hover:border-[#001984]"
                    >
                      <LuPencil size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete row ${row.no}`}
                      className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-[#E2DFFC] bg-white text-[#DC2626] transition hover:border-[#DC2626]"
                    >
                      <LuTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM ACTION ROW
            Mobile: 2-column grid — Cancel full width, Replace | Save as Draft, Import full width.
            sm+: single row — Cancel left, the rest grouped right. */}
        <div className="mt-6 grid w-full grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
          <button type="button" className={`${outlineButton} col-span-2 sm:col-span-1`}>
            Cancel
          </button>

          <div className="contents sm:flex sm:flex-wrap sm:items-center sm:gap-4">
            <button type="button" onClick={openPicker} className={outlineButton}>
              Replace File
            </button>
            <button type="button" className={outlineButton}>
              Save as Draft
            </button>
            <button type="button" className={`${purpleButton} col-span-2 sm:col-span-1`}>
              Import {READY_COUNT} Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}