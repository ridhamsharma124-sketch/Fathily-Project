import { Fragment, useState } from "react";
import { LuArrowRight, LuCheck, LuChevronDown } from "react-icons/lu";

/* ==========================================================================
   ICON — CSV FILE (navy outlined document with small "CSV" label, 27px)
   ========================================================================== */
function CsvFileIcon() {
  return (
    <svg width="27" height="30" viewBox="0 0 27 30" fill="none" aria-hidden>
      <path
        d="M5 1.5h10.5l8 8v19H5v-27Z"
        stroke="#0A0847"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M15.5 1.5v8h8" stroke="#0A0847" strokeWidth="1.3" strokeLinejoin="round" />
      <text
        x="14"
        y="24.4"
        textAnchor="middle"
        fontSize="7.4"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
        fill="#0A0847"
      >
        CSV
      </text>
    </svg>
  );
}

/* ==========================================================================
   SHARED
   ========================================================================== */

/* Single consistent select used by every "Maps To (App Field)" dropdown.
   Fixed width + truncate so long labels like "Answer (Hidden Word)"
   collapse to an ellipsis instead of stretching the column. */
function FieldSelect({ value, options, onChange, ariaLabel }) {
  return (
    <div className="relative w-[130px]">
      <select
        aria-label={ariaLabel}
        title={value}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-[34px] w-[130px] cursor-pointer appearance-none truncate rounded-[6px] border border-[#E5E7EB] bg-white pr-7 pl-2.5 text-[12px] text-[#374151] outline-none focus:border-[#0B1F6B]/40"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      <LuChevronDown
        size={12}
        strokeWidth={1.8}
        className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-[#374151]/70"
        aria-hidden
      />
    </div>
  );
}

/* Green check + light-green "Validated" badge — identical size on every row. */
function ValidatedCell() {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#22C55E]">
        <LuCheck size={12} strokeWidth={2.5} className="text-white" aria-hidden />
      </span>
      <span className="flex h-[28px] w-[76px] shrink-0 items-center justify-center rounded-[6px] bg-[#E8FBEF] text-[12px] font-semibold text-[#16A34A]">
        Validated
      </span>
    </div>
  );
}

function FixRowButton() {
  return (
    <button
      type="button"
      className="flex h-[32px] w-[78px] shrink-0 cursor-pointer items-center justify-center rounded-[6px] border border-[#0B1F6B] bg-white text-[12px] font-medium text-[#0B1F6B] transition-colors hover:bg-[#F3F5FC]"
    >
      Fix Row
    </button>
  );
}

/* ==========================================================================
   DATA
   ========================================================================== */
const MAPPING_ROWS = [
  {
    column: "clue",
    sample: "Who created the heavens and the earth?",
    options: ["Clue", "Question", "Instructions", "Skip"],
  },
  {
    column: "answer",
    sample: "God",
    options: ["Answer (Hidden Word)", "Answer", "Correct Answer", "Skip"],
  },
  {
    column: "created_by",
    sample: "Admin User",
    options: ["Created By", "Author", "Creator", "Skip"],
  },
  {
    column: "difficulty",
    sample: "1",
    options: ["Difficulty Level", "Level", "Difficulty", "Skip"],
  },
  {
    column: "reward_points",
    sample: "10",
    options: ["Reward Points", "Points", "Skip"],
  },
];

const REVIEW_ROWS = [
  { row: "7", issue: "Missing answer", data: "(blank)" },
  { row: "15", issue: "Invalid reward points", data: "abc" },
];

const GUIDE_HEADERS = [
  "Hidden Restoration",
  "Verse Restoration",
  "Audio Revelation",
  "Mystery Scripture",
];

const GUIDE_ROWS = [
  ["clue", "verse_reference", "audio_file", "scripture_reference"],
  ["answer", "verse_text", "question", "clue"],
  ["created_by", "missing_word", "answer", "answer"],
  ["difficulty", "created_by", "created_by", "created_by"],
  ["reward_points", "difficulty", "difficulty", "difficulty"],
];

/* Breaks long values at the underscore only when they overflow the cell. */
function GuideCell({ value }) {
  const parts = value.split("_");

  return (
    <span className="px-2 text-[12px] leading-[1.4] text-[#374151]">
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && "_"}
          {i < parts.length - 1 && <wbr />}
        </Fragment>
      ))}
    </span>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function CSVUploadValidateMap() {
  const [mapping, setMapping] = useState(() => ({
    clue: "Clue",
    answer: "Answer (Hidden Word)",
    created_by: "Created By",
    difficulty: "Difficulty Level",
    reward_points: "Reward Points",
  }));

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#F8F8FC] font-inter text-[#0A0847]">
      <div className="mx-auto w-full max-w-[1095px] px-6 py-6">
        {/* ---------------- header ---------------- */}
        <p className="text-[16px] font-normal text-[#6B6A8A]">
          Add / Edit Word Search — CSV Upload
        </p>

        <h1 className="mt-1.5 text-[22px] leading-[1.2] font-bold text-[#0A0847]">
          1. CSV Upload — Validate &amp; Map
        </h1>

        <p className="mt-1.5 text-[14px] font-normal text-[#6B6A8A]">
          We&apos;ve validated your file and mapped the columns to the correct fields.
        </p>

        {/* ---------------- top row ---------------- */}
        <div className="mt-6 flex gap-6">
          {/* uploaded file */}
          <section className="flex w-[339px] shrink-0 flex-col gap-[10px] rounded-[12px] border border-[#E5E7EB] bg-white p-5">
            <h2 className="text-[14px] leading-[1.2] font-semibold text-[#374151]">
              Uploaded File
            </h2>

            <div className="flex items-center gap-[10px]">
              <CsvFileIcon />

              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold text-[#0A0847]">
                  genesis_word_search.csv
                </p>
                <p className="mt-1 text-[11px] text-[#6B6A8A]">12.4 KB • 24 rows</p>
              </div>

              <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#22C55E]">
                <LuCheck size={14} strokeWidth={2.5} className="text-white" aria-hidden />
              </span>
            </div>
          </section>

          {/* validation summary */}
          <section className="flex w-[683px] shrink-0 flex-col gap-[10px] rounded-[12px] border border-[#E5E7EB] bg-white p-5">
            <h2 className="text-[14px] leading-[1.2] font-semibold text-[#374151]">
              Validation Summary
            </h2>

            <div className="flex gap-[14px]">
              <div className="flex h-[90px] w-[205px] shrink-0 flex-col items-center justify-center gap-1 rounded-[8px] border border-[#22C55E] bg-[#F0FAF4]">
                <p className="text-[22px] leading-none font-bold text-[#15803D]">22</p>
                <p className="text-[12px] font-medium text-[#15803D]">Valid Rows</p>
              </div>

              <div className="flex h-[90px] w-[205px] shrink-0 flex-col items-center justify-center gap-1 rounded-[8px] border border-[#F97316] bg-[#FFF6EE]">
                <p className="text-[22px] leading-none font-bold text-[#EA580C]">2</p>
                <p className="text-[12px] font-medium text-[#EA580C]">Need Review</p>
              </div>

              <div className="flex h-[90px] w-[205px] shrink-0 flex-col items-center justify-center gap-1 rounded-[8px] border border-[#E5E7EB] bg-white">
                <p className="text-[22px] leading-none font-bold text-[#0A0847]">0</p>
                <p className="text-[12px] font-medium text-[#0A0847]">Duplicates</p>
              </div>
            </div>
          </section>
        </div>

        {/* ---------------- two-column grid ---------------- */}
        <div className="mt-6 grid grid-cols-[511px_511px] gap-6">
          {/* 1. column mapping */}
          <section className="flex w-[511px] flex-col gap-[10px] rounded-[12px] border border-[#E5E7EB] bg-white p-5">
            <h2 className="text-[14px] leading-[1.2] font-semibold text-[#374151]">
              1. Column Mapping
            </h2>

            <div className="w-[471px]">
              {/* header */}
              <div className="grid h-12 w-[471px] grid-cols-[84px_111px_146px_130px] items-center bg-[#F9FAFB]">
                <span className="px-2 text-[12px] leading-[1.25] font-semibold text-[#374151]">
                  CSV Column
                </span>
                <span className="px-2 text-[12px] font-semibold text-[#374151]">Sample Data</span>
                <span className="px-2 text-[12px] leading-[1.25] font-semibold text-[#374151]">
                  Maps To (App Field)
                </span>
                <span className="px-2 text-[12px] font-semibold text-[#374151]">Status</span>
              </div>

              {/* rows */}
              {MAPPING_ROWS.map(({ column, sample, options }) => (
                <div
                  key={column}
                  className="grid h-[62px] w-[471px] grid-cols-[84px_111px_146px_130px] items-center border-b border-[#F1F1F5] py-2"
                >
                  <span className="px-2 text-[12px] leading-[1.25] font-normal break-words text-[#374151]">
                    {column}
                  </span>

                  <span className="px-2 text-[12px] leading-[1.35] text-[#374151]">{sample}</span>

                  <div className="px-2">
                    <FieldSelect
                      ariaLabel={`Maps ${column} to app field`}
                      value={mapping[column]}
                      options={options}
                      onChange={(v) => setMapping((prev) => ({ ...prev, [column]: v }))}
                    />
                  </div>

                  <div className="px-2">
                    <ValidatedCell />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* right column */}
          <div className="flex w-[511px] flex-col gap-6">
            {/* 2. rows needing review */}
            <section className="flex w-[511px] shrink-0 flex-col gap-[10px] rounded-[12px] border border-[#E5E7EB] bg-white p-5">
              <h2 className="text-[14px] leading-[1.2] font-semibold text-[#374151]">
                2. Rows Needing Review (2)
              </h2>

              <div className="w-[471px]">
                {/* header */}
                <div className="grid h-12 grid-cols-[60px_110px_137px_164px] items-center bg-[#F9FAFB]">
                  <span className="px-2 text-[12px] font-semibold text-[#374151]">Row #</span>
                  <span className="px-2 text-[12px] font-semibold text-[#374151]">Issue</span>
                  <span className="px-2 text-[12px] font-semibold text-[#374151]">Data</span>
                  <span className="text-center text-[12px] font-semibold text-[#374151]">
                    Actions
                  </span>
                </div>

                {/* contiguous rows — no gap, no rounding */}
                {REVIEW_ROWS.map(({ row, issue, data }) => (
                  <div
                    key={row}
                    className="grid h-[62px] grid-cols-[60px_110px_137px_164px] items-center border-b border-[#FBDCDC] bg-[#FEF2F2] py-2"
                  >
                    <span className="px-2 text-[12px] font-medium text-[#374151]">{row}</span>

                    <span className="px-2 text-[12px] leading-[1.35] font-medium text-[#DC2626]">
                      {issue}
                    </span>

                    <span className="px-2 text-[12px] font-normal text-[#DC2626]">{data}</span>

                    <div className="flex items-center justify-center gap-2">
                      <FixRowButton />
                      <FixRowButton />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. column guide by type */}
            <section className="flex w-[511px] shrink-0 flex-col gap-[10px] rounded-[12px] border border-[#E5E7EB] bg-white p-5">
              <h2 className="text-[14px] leading-[1.2] font-semibold text-[#374151]">
                3. Column Guide by Type
              </h2>

              {/* header */}
              <div className="grid h-12 w-[468px] grid-cols-[117px_117px_117px_117px] items-center bg-[#F9FAFB]">
                {GUIDE_HEADERS.map((h) => (
                  <span
                    key={h}
                    className="px-2 text-[12px] leading-[1.25] font-semibold text-[#374151]"
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* rows */}
              {GUIDE_ROWS.map((row) => (
                <div
                  key={row.join("-")}
                  className="grid h-[62px] w-[468px] grid-cols-[117px_117px_117px_117px] items-center border-b border-[#F1F1F5] py-2"
                >
                  {row.map((cell, i) => (
                    <GuideCell key={i} value={cell} />
                  ))}
                </div>
              ))}
            </section>
          </div>
        </div>

        {/* ---------------- footer ---------------- */}
        <div className="mt-6 flex w-full items-center justify-between">
          <button
            type="button"
            className="flex h-[36px] w-[78px] cursor-pointer items-center justify-center rounded-[6px] border border-[#D1D5DB] bg-white text-[12px] font-medium text-[#374151] transition-colors hover:bg-[#F3F4F6]"
          >
            Back
          </button>

          <button
            type="button"
            className="flex h-[36px] w-[160px] cursor-pointer items-center justify-center gap-2 rounded-[6px] bg-[#0B1F6B] text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            <LuArrowRight size={14} strokeWidth={2} aria-hidden />
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}