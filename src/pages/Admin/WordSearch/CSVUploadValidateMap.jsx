import { Fragment, useState } from "react";
import { LuArrowRight } from "react-icons/lu";


const HEADING = "#0A0847";
const NAVY = "#001984";
const LABEL = "rgba(10, 8, 71, 0.8)";
const MUTED = "rgba(10, 8, 71, 0.6)";
const BORDER = "#E2DFFC";
const ROW_BORDER = "#E9E9E9";
const HEADER_BG = "#F3F3FD";
const PAGE_BG = "#F8F8FC";
const GREEN = "#22C55E";
const GREEN_TEXT = "#16A34A";
const TICK_GREEN = "#21AC1C";
const RED_TEXT = "#D80027";


function CsvFileIcon() {
  return (
    <svg width="27" height="30" viewBox="0 0 27 30" fill="none" aria-hidden>
      <path d="M5 1.5h10.5l8 8v19H5v-27Z" stroke={NAVY} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M15.5 1.5v8h8" stroke={NAVY} strokeWidth="1.3" strokeLinejoin="round" />
      <text x="13.5" y="24.4" textAnchor="middle" fontSize="7.4" fontWeight="700" fontFamily="Inter, sans-serif" fill={NAVY}>
        CSV
      </text>
    </svg>
  );
}

function TickIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7.4 11.6 10.9 15.1 16.2 8.9" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronSvg() {
  return (
    <svg width="7.5" height="4.84" viewBox="0 0 8 5" fill="none" aria-hidden>
      <path d="M0.75 0.75 4 4 7.25 0.75" stroke={MUTED} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


function FieldSelect({ value, options, onChange, ariaLabel }) {
  return (
    <div className="relative w-[112px]">
      <select
        aria-label={ariaLabel}
        title={value}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-[36px] w-[112px] cursor-pointer appearance-none truncate rounded-[7.47px] border bg-white pr-[32px] pl-[12px] text-[11px] font-medium outline-none focus:border-[#001984]/40"
        style={{ color: LABEL, borderColor: BORDER }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute top-1/2 right-[12px] flex -translate-y-1/2 items-center">
        <ChevronSvg />
      </span>
    </div>
  );
}


function ValidatedCell() {
  return (
    <div className="flex items-center gap-[8px]">
      <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: TICK_GREEN }}>
        <TickIcon />
      </span>
      <span
        className="flex h-[28px] w-[80px] shrink-0 items-center justify-center rounded-[8px] text-[12px] font-medium whitespace-nowrap"
        style={{ color: GREEN_TEXT, backgroundColor: "rgba(33, 172, 28, 0.1)" }}
      >
        Validated
      </span>
    </div>
  );
}


function FixRowButton() {
  return (
    <button
      type="button"
      className="flex h-[32px] w-[79px] shrink-0 cursor-pointer items-center justify-center rounded-[8px] border bg-white text-[12px] font-medium transition-colors hover:bg-[#F3F5FC]"
      style={{ borderColor: NAVY, color: NAVY }}
    >
      Fix Row
    </button>
  );
}


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

const GUIDE_HEADERS = ["Hidden Restoration", "Verse Restoration", "Audio Revelation", "Mystery Scripture"];

const GUIDE_ROWS = [
  ["clue", "verse_reference", "audio_file", "scripture_reference"],
  ["answer", "verse_text", "question", "clue"],
  ["created_by", "missing_word", "answer", "answer"],
  ["difficulty", "created_by", "created_by", "created_by"],
  ["reward_points", "difficulty", "difficulty", "difficulty"],
];

function GuideCell({ value }) {
  const className = "px-[20px] text-[11px] leading-[16px] font-medium break-words";

  if (value === "reward_points") {
    return (
      <span className={className} style={{ color: LABEL }}>
        reward_poi
        <wbr />
        nts
      </span>
    );
  }

  const parts = value.split("_");

  return (
    <span className={className} style={{ color: LABEL }}>
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


export default function CSVUploadValidateMap() {
  const [mapping, setMapping] = useState(() => ({
    clue: "Clue",
    answer: "Answer (Hidden Word)",
    created_by: "Created By",
    difficulty: "Difficulty Level",
    reward_points: "Reward Points",
  }));

  return (
    <div className="min-h-[calc(100vh-72px)] font-[Inter]" style={{ backgroundColor: PAGE_BG, color: HEADING }}>
      <div className="mx-auto w-full max-w-[1110px] px-6 py-6">
        <p className="text-[16px] leading-none font-medium" style={{ color: MUTED }}>
          Add / Edit Word Search - CSV Upload
        </p>

        <h1 className="mt-[12px] text-[22px] leading-none font-semibold" style={{ color: HEADING }}>
          1. CSV Upload — Validate &amp; Map
        </h1>

        <p className="mt-[12px] text-[14px] leading-none font-medium" style={{ color: MUTED }}>
          We&apos;ve validated your file and mapped the columns to the correct fields.
        </p>

        <div className="mt-[24px] flex items-start gap-[24px]">
          <section
            className="flex h-[149px] w-[340px] shrink-0 flex-col gap-[10px] rounded-[7.5px] border-[0.75px] bg-white px-[20px] py-[20px]"
            style={{ borderColor: BORDER }}
          >
            <h2 className="text-[14px] leading-none font-semibold" style={{ color: HEADING }}>
              Uploaded File
            </h2>

            <div className="flex items-center gap-[12px]">
              <CsvFileIcon />

              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] leading-none font-semibold" style={{ color: HEADING }}>
                  genesis_word_search.csv
                </p>
                <p className="mt-[6px] text-[10px] leading-[20px] font-medium" style={{ color: MUTED }}>
                  12.4 KB • 24 rows
                </p>
              </div>

              <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: TICK_GREEN }}>
                <TickIcon />
              </span>
            </div>
          </section>

          <section
            className="flex h-[149px] flex-1 flex-col gap-[10px] rounded-[7.5px] border-[0.75px] bg-white px-[20px] py-[20px]"
            style={{ borderColor: BORDER }}
          >
            <h2 className="text-[14px] leading-none font-semibold" style={{ color: HEADING }}>
              Validation Summary
            </h2>

            <div className="flex items-center justify-between">
              <div className="flex h-[90px] w-[209px] shrink-0 flex-col items-center justify-center gap-[6px] rounded-[8px] border-[0.75px] bg-[#F0FAF0]" style={{ borderColor: GREEN }}>
                <p className="text-[22px] leading-none font-semibold" style={{ color: "#15803D" }}>22</p>
                <p className="text-[12px] leading-none font-semibold" style={{ color: "#15803D" }}>Valid Rows</p>
              </div>

              <div className="flex h-[90px] w-[209px] shrink-0 flex-col items-center justify-center gap-[6px] rounded-[8px] border-[0.75px] bg-[#FFF6EE]" style={{ borderColor: "#F97316" }}>
                <p className="text-[22px] leading-none font-semibold" style={{ color: "#EA580C" }}>2</p>
                <p className="text-[12px] leading-none font-semibold" style={{ color: "#EA580C" }}>Need Review</p>
              </div>

              <div className="flex h-[90px] w-[209px] shrink-0 flex-col items-center justify-center gap-[6px] rounded-[8px] border-[0.75px] bg-white" style={{ borderColor:"#E2DFFC" }}>
                <p className="text-[22px] leading-none font-semibold" style={{ color: HEADING }}>0</p>
                <p className="text-[12px] leading-none font-semibold" style={{ color: HEADING }}>Duplicates</p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-[24px] grid grid-cols-[517px_517px] gap-[24px]">
          <section
            className="flex min-h-[742px] w-[517px] flex-col gap-[10px] rounded-[7.5px] border-[0.75px] bg-white pt-[21px] pr-[10px] pb-[32px] pl-[16px]"
            style={{ borderColor: BORDER }}
          >
            <h2 className="text-[14px] leading-none font-semibold" style={{ color: HEADING }}>
              1. Column Mapping
            </h2>

            <div className="mt-[6px] w-full">
              <div
                className="grid h-[50px] w-full grid-cols-[90px_135px_130px_134px] items-center border-b-[0.75px]"
                style={{ borderColor: ROW_BORDER, backgroundColor: HEADER_BG }}
              >
                <span className="px-[8px] text-[12px] leading-[15px] font-semibold" style={{ color: HEADING }}>
                  CSV Column
                </span>
                <span className="px-[8px] text-[12px] leading-[15px] font-semibold" style={{ color: HEADING }}>
                  Sample Data
                </span>
                <span className="px-[8px] text-[12px] leading-[15px] font-semibold" style={{ color: HEADING }}>
                  Maps To (App Field)
                </span>
                <span className="px-[8px] text-[12px] leading-[15px] font-semibold" style={{ color: HEADING }}>
                  Status
                </span>
              </div>

              {MAPPING_ROWS.map(({ column, sample, options }) => (
                <div
                  key={column}
                  className="grid h-[62px] w-full grid-cols-[90px_135px_130px_134px] items-center border-b-[0.75px]"
                  style={{ borderColor: ROW_BORDER }}
                >
                  <span className="px-[8px] text-[12px] leading-[15px] font-medium break-words" style={{ color: LABEL }}>
                    {column}
                  </span>

                  <span className="px-[8px] text-[11px] leading-[16px] font-medium" style={{ color: LABEL }}>
                    {sample}
                  </span>

                  <div className="px-[8px]">
                    <FieldSelect
                      ariaLabel={`Maps ${column} to app field`}
                      value={mapping[column]}
                      options={options}
                      onChange={(v) => setMapping((prev) => ({ ...prev, [column]: v }))}
                    />
                  </div>

                  <div className="px-[8px]">
                    <ValidatedCell />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex w-[517px] flex-col gap-[24px]">
            <section
              className="flex w-[517px] shrink-0 flex-col gap-[24px] rounded-[7.5px] border-[0.75px] bg-white px-[23px] py-[20px]"
              style={{ borderColor: BORDER }}
            >
              <h2 className="text-[14px] leading-none font-semibold" style={{ color: HEADING }}>
                2. Rows Needing Review (2)
              </h2>

              <div className="w-full">
                <div
                  className="grid h-[50px] w-full grid-cols-[68px_117px_80px_1fr] items-center border-b-[0.75px]"
                  style={{ borderColor: ROW_BORDER, backgroundColor: HEADER_BG }}
                >
                  <span className="px-[20px] text-[12px] leading-none font-semibold" style={{ color: HEADING }}>Row #</span>
                  <span className="px-[20px] text-[12px] leading-none font-semibold" style={{ color: HEADING }}>Issue</span>
                  <span className="px-[20px] text-[12px] leading-none font-semibold" style={{ color: HEADING }}>Data</span>
                  <span className="text-center text-[12px] leading-none font-semibold" style={{ color: HEADING }}>
                    Actions
                  </span>
                </div>

                {REVIEW_ROWS.map(({ row, issue, data }) => (
                  <div
                    key={row}
                    className="grid h-[62px] w-full grid-cols-[68px_117px_80px_1fr] items-center border-b-[0.75px]"
                    style={{ borderColor: "#DDAEAE", backgroundColor: "#FEF5F5" }}
                  >
                    <span className="px-[20px] text-[11px] leading-none font-medium" style={{ color: RED_TEXT }}>{row}</span>

                    <span className="px-[20px] text-[11px] leading-[16px] font-medium" style={{ color: RED_TEXT }}>{issue}</span>

                    <span className="px-[20px] text-[11px] leading-none font-medium" style={{ color: RED_TEXT }}>{data}</span>

                    <div className="flex items-center justify-center gap-[8px]">
                      <FixRowButton />
                      <FixRowButton />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="flex w-[517px] flex-1 flex-col gap-[20px] rounded-[7.5px] border-[0.75px] bg-white px-[17px] py-[20px]"
              style={{ borderColor: BORDER }}
            >
              <h2 className="text-[14px] leading-none font-semibold" style={{ color: HEADING }}>
                3. Column Guide by Type
              </h2>

              <div className="w-[483px]">
                <div
                  className="grid h-[50px] w-[483px] grid-cols-[107px_124px_117px_1fr] items-center border-b-[0.75px]"
                  style={{ borderColor: ROW_BORDER, backgroundColor: HEADER_BG }}
                >
                  {GUIDE_HEADERS.map((h) => (
                    <span key={h} className="px-[20px] text-[12px] leading-[15px] font-semibold" style={{ color: HEADING }}>
                      {h}
                    </span>
                  ))}
                </div>

                {GUIDE_ROWS.map((row) => (
                  <div
                    key={row.join("-")}
                    className="grid h-[62px] w-[483px] grid-cols-[107px_124px_117px_1fr] items-center border-b-[0.75px]"
                    style={{ borderColor: ROW_BORDER }}
                  >
                    {row.map((cell, i) => (
                      <GuideCell key={i} value={cell} />
                    ))}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="mt-[24px] flex h-[43px] w-full items-center justify-between">
          <button
            type="button"
            className="flex h-[43px] w-[97px] cursor-pointer items-center justify-center rounded-[6px] border bg-white text-[14px] font-semibold transition-colors hover:bg-[#F5F8FD]"
            style={{ borderColor: BORDER, color: NAVY }}
          >
            Back
          </button>

          <button
            type="button"
            className="flex h-[43px] w-[200px] cursor-pointer items-center justify-center gap-[8px] rounded-[6px] text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: NAVY }}
          >
            <LuArrowRight size={16} strokeWidth={2} aria-hidden />
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}