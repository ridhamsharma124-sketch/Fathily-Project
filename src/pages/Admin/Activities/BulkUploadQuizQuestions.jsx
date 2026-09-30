import { useRef, useState } from "react";
import {
  LuDownload,
  LuCloudUpload,
  LuSearch,
  LuFileSpreadsheet,
  LuFileText,
  LuCircleCheck,
  LuTriangleAlert,
  LuPencil,
  LuTrash2,
  LuBookOpen,
  LuChevronDown,
} from "react-icons/lu";
import { Breadcrumb } from "./quizShared";

/* ==========================================================================
   MOCK DATA — hardcoded exactly as specified
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
    iconWrap: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
  },
  {
    key: "errors",
    value: "2",
    label: "Errors",
    icon: LuTriangleAlert,
    iconWrap: "bg-[#FEE2E2]",
    iconColor: "text-[#DC2626]",
  },
  {
    key: "duplicates",
    value: "0",
    label: "Duplicates",
    icon: LuFileText,
    iconWrap: "bg-[#E0F2FE]",
    iconColor: "text-[#2563EB]",
  },
];

const READY_COUNT = STAT_CARDS.find((stat) => stat.key === "ready")?.value ?? "0";

const TABLE_HEADERS = [
  "",
  "No.",
  "Description",
  "Correct Answer",
  "Bible Reference",
  "Status",
  "Actions",
];

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
const labelCls = "mb-1.5 block text-[13px] font-semibold text-[#0A0847]";

const inputCls =
  "h-11 w-full cursor-pointer appearance-none rounded-lg border border-[#E5E4EC] bg-white pl-4 pr-10 text-[13px] text-[#0A0847AA] outline-none transition focus:border-[#041581]";

const outlineButton =
  "flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#041581] bg-white px-8 text-[13px] font-semibold text-[#0A0847] transition-colors hover:bg-[#F1F1F9]";

const outlineSmButton =
  "flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#041581] bg-white px-6 text-[13px] font-semibold text-[#0A0847] transition-colors hover:bg-[#F1F1F9]";

const purpleButton =
  "flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#4C1DD6] px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#4318B8]";

const formatSize = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

/* ==========================================================================
   SUB-COMPONENTS
   ========================================================================== */
function LocationChip() {
  return (
    <div className="flex w-full items-center gap-2.5 rounded-lg border border-[#E5E4EC] bg-[#F3F3F7] px-4 py-2.5">
      <LuBookOpen size={16} className="shrink-0 text-[#5B0FEE]" aria-hidden />
      <p className="text-[13px]">
        <span className="font-bold text-[#0A0847]">New Testament</span>
        <span className="px-1.5 text-[#0A084766]">&gt;</span>
        <span className="font-bold text-[#0A0847]">John</span>
        <span className="px-1.5 text-[#0A084766]">&gt;</span>
        <span className="font-bold text-[#0A0847]">Chapter 3</span>
      </p>
    </div>
  );
}

function StepRow({ step, title, description, headerRight, children }) {
  return (
    <section className="rounded-lg border border-[#E5E4EC] bg-white px-5 py-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#041581] text-[13px] font-bold text-white">
            {step}
          </span>
          <div className="min-w-0">
            <h2 className="text-[15px] font-bold text-[#0A0847]">{title}</h2>
            <p className="mt-0.5 text-[12px] text-[#0A084799]">{description}</p>
          </div>
        </div>
        {headerRight}
      </div>
      {children ? <div className="mt-4">{children}</div> : null}
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

  /* the picker is filtered by accept=".csv", but a drop is not — validate here */
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
      <div className="mx-auto max-w-[1200px] space-y-5 px-5 py-6">
        <Breadcrumb
          items={[
            "Bible Content",
            "Activities",
            "John",
            "Chapter 3",
            "Quiz",
            "Bulk Upload",
          ]}
        />

        <h1 className="text-[22px] font-bold text-[#0A0847]">
          Bulk Upload Quiz Questions
        </h1>

        {/* TOP AREA — chip and select share one width */}
        <div className="w-full max-w-[533px]">
          <LocationChip />

          <div className="mt-4">
            <label htmlFor="q-type" className={labelCls}>
              Question Type <span className="text-[#E11D48]">*</span>
            </label>
            <div className="relative">
              <select
                id="q-type"
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className={inputCls}
              >
                {QUESTION_TYPE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <LuChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0A084799]"
                aria-hidden
              />
            </div>
            <p className="mt-[6px] text-[12px] italic text-[#0A084799]">
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

        {/* STEP 1 */}
        <StepRow
          step={1}
          title="Download CSV Template"
          description="Download the template file to enter your questions."
          headerRight={
            <button type="button" className={outlineSmButton}>
              <LuDownload size={15} />
              Download Template
            </button>
          }
        />

        {/* STEP 2 — clickable / drag-and-drop dropzone */}
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
            className={`flex cursor-pointer flex-row items-center justify-center gap-3 rounded-xl border border-dashed border-[1.5px] border-[#041581] px-6 py-8 transition-colors ${
              dragActive ? "bg-[#E4E4F7]" : "bg-[#F3F1FC] hover:bg-[#EFEDF9]"
            }`}
          >
            <LuCloudUpload size={28} className="shrink-0 text-[#041581]" aria-hidden />

            <div className="text-left">
              <p className="text-[14px] font-bold text-[#0A0847]">
                Drag and drop your file here
              </p>
              <p className="mt-0.5 text-[11px] text-[#0A084799]">or</p>
              <p className="mt-0.5 text-[11px] text-[#0A084799]">Supported format: .csv</p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openPicker();
              }}
              className="ml-12 flex h-10 w-[130px] shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#041581] bg-white text-[13px] font-semibold text-[#041581] transition-colors hover:bg-[#F1F1F9]"
            >
              Browse File
            </button>
          </div>
        </StepRow>

        {/* STEP 3 */}
        <StepRow
          step={3}
          title="Validate Results"
          description="Review your file to confirm for errors before importing."
          headerRight={
            <button type="button" className={outlineSmButton}>
              <LuSearch size={15} />
              Validate CSV
            </button>
          }
        />

        {/* FILE ROW */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[#F1F1F9] px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <LuFileSpreadsheet size={20} className="shrink-0 text-[#16A34A]" aria-hidden />
            <div className="min-w-0">
              <p className="truncate text-[13px] font-bold text-[#0A0847]">
                {fileName}
              </p>
              <p className="mt-0.5 text-[12px] text-[#0A084799]">{fileMeta}</p>
            </div>
          </div>
          <LuCircleCheck
            size={20}
            className="shrink-0 text-[#16A34A]"
            aria-label="File validated"
          />
        </div>

        {/* STAT CARDS — 319×106, radius 8px, 1px border (Figma spec) */}
        <div className="flex flex-wrap gap-4">
          {STAT_CARDS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.key}
                className="flex h-[106px] w-[319px] items-center gap-4 rounded-lg border border-[#E5E4EC] bg-white p-4"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${stat.iconWrap}`}
                >
                  <Icon size={20} className={stat.iconColor} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-[20px] font-bold leading-none text-[#0A0847]">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[13px] text-[#0A084799]">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* VALIDATION TABLE */}
        <section className="rounded-lg border border-[#E5E4EC] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-white">
                  {TABLE_HEADERS.map((header, index) => (
                    <th
                      key={header || `blank-${index}`}
                      scope="col"
                      className="whitespace-nowrap px-4 py-3 text-[12px] font-semibold text-[#0A0847]"
                    >
                      {header || (
                        <input
                          type="checkbox"
                          aria-label="Select all rows"
                          className="h-4 w-4 cursor-pointer rounded border-[#E5E4EC] accent-[#0A0847]"
                        />
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row) => (
                  <tr
                    key={row.no}
                    className="border-t border-[#EEF0F5] transition-colors hover:bg-[#F9F9FF]"
                  >
                    <td className="px-4 py-3.5">
                      <input
                        type="checkbox"
                        aria-label={`Select row ${row.no}`}
                        className="h-4 w-4 cursor-pointer rounded border-[#E5E4EC] accent-[#0A0847]"
                      />
                    </td>
                    <td className="px-4 py-3.5 text-[12px] text-[#0A0847]">{row.no}</td>
                    <td className="max-w-[180px] px-4 py-3.5 text-[12px] leading-5 text-[#0A0847]">
                      {row.description}
                    </td>
                    <td className="px-4 py-3.5 text-[12px] font-semibold text-[#0A0847]">
                      {row.answer}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-[12px] text-[#0A0847]">
                      {row.reference}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-block rounded-full px-2.5 py-[3px] text-[11px] font-semibold ${
                          row.status === "Valid"
                            ? "bg-[#DCFCE7] text-[#16A34A]"
                            : "bg-[#FEE2E2] text-[#DC2626]"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          aria-label={`Edit row ${row.no}`}
                          className="cursor-pointer text-[#041581] transition-opacity hover:opacity-70"
                        >
                          <LuPencil size={16} />
                        </button>
                        <button
                          type="button"
                          aria-label={`Delete row ${row.no}`}
                          className="cursor-pointer text-[#DC2626] transition-opacity hover:opacity-70"
                        >
                          <LuTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* BOTTOM ACTION ROW */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button type="button" className={outlineButton}>
            Cancel
          </button>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openPicker}
              className={outlineButton}
            >
              Replace File
            </button>
            <button type="button" className={outlineButton}>
              Save as Draft
            </button>
            <button type="button" className={purpleButton}>
              Import {READY_COUNT} Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
