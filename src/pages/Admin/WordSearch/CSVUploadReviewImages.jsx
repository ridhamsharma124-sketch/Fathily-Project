import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PiSquaresFour,
  PiCheckCircle,
  PiFileText,
  PiXCircle,
  PiCaretLeft,
  PiCaretRight,
} from "react-icons/pi";
import audioRevelationImage from "../../../assets/word search/Audio Revelation.png";
import mysteryScriptureImage from "../../../assets/word search/Mystery Scripture.png";
import selectedPuzzlePreview from "../../../assets/word search/Selected Puzzle Preview.png";

/* ==========================================================================
   SHARED
   ========================================================================== */

function Radio({ checked }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
        checked ? "border-[#041581]" : "border-[#D5DAE3]"
      }`}
    >
      {checked && <span className="h-2.5 w-2.5 rounded-full bg-[#041581]" />}
    </span>
  );
}

function SourceBadge({ children = "Chapter Default" }) {
  return (
    <span className="inline-flex items-center rounded-[6px] bg-[#E4E8F1] px-2.5 py-1.5 text-[11px] font-medium text-[#1E2A6B]">
      {children}
    </span>
  );
}

function RowAction({ children }) {
  return (
    <button
      type="button"
      className="flex h-[26px] cursor-pointer items-center justify-center rounded-[4px] border border-[#D5DAE3] bg-white px-2.5 text-[11px] text-[#1F2040] transition-colors hover:bg-[#F5F8FD]"
    >
      {children}
    </button>
  );
}

function OutlineButton({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`flex h-9 cursor-pointer items-center justify-center rounded-[6px] border border-[#E3E7F0] bg-white px-5 text-[13px] font-semibold text-[#1F2040] transition-colors hover:bg-[#F5F8FD] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function PrimaryButton({ children, icon, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`flex h-9 cursor-pointer items-center justify-center gap-2 rounded-[6px] bg-[#041581] px-5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

/* ==========================================================================
   DATA
   ========================================================================== */

const IMAGE_OPTIONS = ["chapter", "ai"];

const STAT_CARDS = [
  { label: "Total Puzzles", value: 248, Icon: PiSquaresFour, color: "#7C3AED", bg: "#EDE5FD" },
  { label: "Published", value: 216, Icon: PiCheckCircle, color: "#22A04B", bg: "#EDF7EF" },
  { label: "Drafts", value: 21, Icon: PiFileText, color: "#C2570C", bg: "#F7EEE5" },
  { label: "Disabled", value: 11, Icon: PiXCircle, color: "#D6204B", bg: "#F9E2EA" },
];

const PUZZLE_ROWS = [
  {
    no: 1,
    clue: "Who created the heavens and the earth?",
    answer: "God",
    image: audioRevelationImage,
  },
  {
    no: 2,
    clue: "What was the name of the first man?",
    answer: "Adam",
    image: mysteryScriptureImage,
  },
  {
    no: 3,
    clue: "Who was the first woman?",
    answer: "Eve",
    image: audioRevelationImage,
  },
  {
    no: 4,
    clue: "Which tree were they commanded not to eat from?",
    answer: "Tree of Knowledge",
    image: mysteryScriptureImage,
  },
  {
    no: 5,
    clue: "Which tree were they commanded not to eat from?",
    answer: "Serpent",
    image: audioRevelationImage,
  },
];

const PREVIEW_KEYS = [
  { label: "Clue", value: "Who created the heavens and the earth?" },
  { label: "Answer", value: "God" },
  { label: "Image Source", badge: true },
  { label: "Note", value: "Images can be changed individually at any time." },
];

const PAGE_NUMBERS = [1, 2, 3, 4, 5];

/* ==========================================================================
   PAGE
   ========================================================================== */

export default function CSVUploadReviewImages() {
  const navigate = useNavigate();
  const [imageMode, setImageMode] = useState("chapter");
  const [selectedRow, setSelectedRow] = useState(1);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#F9FAFE] font-inter text-[#0A1050]">
      <div className="mx-auto w-full max-w-[1068px] px-6 py-6">
        {/* ---------------- page heading ---------------- */}
        <p className="text-[14px] font-normal text-[#6B6A80]">
          Add / Edit Word Search — CSV Upload
        </p>

        <h1 className="mt-1 text-[24px] leading-[1.2] font-bold text-[#0A1050]">
          3. CSV Upload — Review Images
        </h1>

        <p className="mt-1.5 text-[13px] text-[#6B6A80]">
          We&apos;ve validated your file and mapped the columns to the correct fields.
        </p>

        {/* ---------------- row A : radio options + generate button ---------------- */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            {IMAGE_OPTIONS.map((option) => {
              const checked = imageMode === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setImageMode(option)}
                  className="flex cursor-pointer items-center gap-2 text-[14px]"
                >
                  <Radio checked={checked} />
                  <span
                    className={
                      checked ? "font-semibold text-[#1F2040]" : "font-normal text-[#6B6A80]"
                    }
                  >
                    {option === "chapter"
                      ? "Keep chapter default images"
                      : "Generate unique AI image for every imported puzzle"}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="flex h-11 cursor-pointer items-center justify-center rounded-[6px] bg-[#041581] px-6 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            Generate All AI Images
          </button>
        </div>

        {/* ---------------- row B : stat cards ---------------- */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {STAT_CARDS.map(({ label, value, Icon, color, bg }) => (
            <section
              key={label}
              className="flex h-[114px] items-center gap-4 rounded-[12px] border border-[#E8ECF4] bg-white p-5"
            >
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[12px]"
                style={{ backgroundColor: bg, color }}
              >
                <Icon size={24} strokeWidth={1.8} />
              </span>

              <div className="min-w-0">
                <p className="text-[24px] leading-none font-bold text-[#1A1F4B]">{value}</p>
                <p className="mt-1.5 text-[14px] font-semibold text-[#0B1F6B]">{label}</p>
              </div>
            </section>
          ))}
        </div>

        {/* ---------------- main card : preview table + selected preview ---------------- */}
        <section className="mt-6 flex flex-col rounded-[12px] border border-[#E8ECF4] bg-white p-5 lg:flex-row">
          {/* left : table */}
          <div className="min-w-0 flex-1">
            <h2 className="text-[14px] font-semibold text-[#0B1F6B]">Import Preview (24 Puzzles)</h2>

            <div className="mt-4 overflow-x-auto">
              <div className="w-[700px] min-w-[700px]">
                {/* header */}
                <div className="grid h-11 grid-cols-[36px_170px_88px_124px_282px] items-center rounded-[6px] bg-[#F5F8FD]">
                  <span className="px-2 text-[14px] font-medium text-[#3A3A4F]">#</span>
                  <span className="px-2 text-[14px] font-medium text-[#3A3A4F]">Clue / Prompt</span>
                  <span className="px-2 text-[14px] font-medium text-[#3A3A4F]">Answer</span>
                  <span className="px-2 text-[14px] font-medium text-[#3A3A4F]">Image Source</span>
                  <span className="text-center text-[14px] font-medium text-[#3A3A4F]">
                    Actions
                  </span>
                </div>

                {/* body */}
                {PUZZLE_ROWS.map((row) => (
                  <div
                    key={row.no}
                    onClick={() => setSelectedRow(row.no)}
                    className={`grid h-16 cursor-pointer grid-cols-[36px_170px_88px_124px_282px] items-center border-b border-[#EEF1F6] ${
                      selectedRow === row.no ? "bg-[#F7F9FE]" : ""
                    }`}
                  >
                    <span className="px-2">
                      <Radio checked={selectedRow === row.no} />
                    </span>

                    <span className="flex items-center gap-2 px-2">
                      <img
                        src={row.image}
                        alt=""
                        className="h-9 w-9 shrink-0 rounded-[6px] bg-[#F5F8FD] object-cover"
                      />
                      <span className="line-clamp-2 text-[12px] leading-[1.3] text-[#1F2040]">
                        {row.clue}
                      </span>
                    </span>

                    <span className="px-2 text-[12px] leading-[1.3] text-[#1F2040]">
                      {row.answer}
                    </span>

                    <span className="px-2">
                      <SourceBadge />
                    </span>

                    <span className="flex items-center justify-center gap-1.5 px-2">
                      <RowAction>Replace</RowAction>
                      <RowAction>Generate AI</RowAction>
                      <RowAction>Reset Default</RowAction>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* table footer : display + pagination */}
            <div className="mt-5 flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-2 text-[#6B6A80]">
                <span>Display</span>
                <select
                  aria-label="Rows per page"
                  defaultValue="10"
                  className="h-[26px] w-[44px] cursor-pointer appearance-none rounded-[4px] border border-[#D5DAE3] bg-white text-center text-[12px] text-[#1F2040] outline-none"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
                <span>Words search</span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  disabled
                  aria-label="Previous page"
                  className="flex h-6 w-6 cursor-not-allowed items-center justify-center rounded-[4px] border border-[#E3E7F0] bg-white text-[#C4C9D4]"
                >
                  <PiCaretLeft size={11} />
                </button>

                {PAGE_NUMBERS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-[4px] text-[12px] transition-colors ${
                      n === 1
                        ? "bg-[#041581] font-semibold text-white"
                        : "border border-[#E3E7F0] bg-white text-[#1F2040] hover:bg-[#F5F8FD]"
                    }`}
                  >
                    {n}
                  </button>
                ))}

                <button
                  type="button"
                  aria-label="Next page"
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[4px] border border-[#041581] bg-white text-[#041581]"
                >
                  <PiCaretRight size={11} />
                </button>
              </div>
            </div>
          </div>

          {/* divider */}
          <span className="mx-5 hidden w-px shrink-0 bg-[#EEF1F6] lg:block" aria-hidden />

          {/* right : selected puzzle preview */}
          <div className="mt-6 w-full shrink-0 lg:mt-0 lg:w-[299px]">
            <h2 className="text-[14px] font-semibold text-[#0B1F6B]">Selected Puzzle Preview</h2>

            <img
              src={selectedPuzzlePreview}
              alt="Selected puzzle preview"
              className="mt-3 aspect-square w-full rounded-[8px] bg-[#F5F8FD] object-contain"
            />

            <div className="mt-3 flex flex-col gap-3">
              {PREVIEW_KEYS.map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span className="w-16 shrink-0 text-[11px] font-semibold text-[#0B1F6B]">
                    {item.label}
                  </span>

                  {item.badge ? (
                    <SourceBadge />
                  ) : (
                    <span className="text-[11px] leading-[1.4] text-[#6B6A80]">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- bottom action bar ---------------- */}
        <div className="mt-8 flex items-center justify-between">
          <OutlineButton
            onClick={() => navigate("/admin/word-search/add-edit/csv-upload/validate-map")}
          >
            Back
          </OutlineButton>

          <PrimaryButton
            onClick={() => navigate("/admin/word-search/add-edit/csv-upload/import-review")}
          >
            Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}