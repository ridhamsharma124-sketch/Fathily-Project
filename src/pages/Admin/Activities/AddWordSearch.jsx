import { useState } from "react";
import selectorBookIcon from "../../../assets/activities/icon-book-purple.svg";
import chevronIcon from "../../../assets/activities/icon-chevron-down.svg";
import plusIcon from "../../../assets/activities/ws_plus.svg";
import downloadIcon from "../../../assets/activities/icon-download.svg";

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const PUZZLE_SIZE_OPTIONS = ["12 × 12", "10 × 10", "14 × 14", "16 × 16"];
const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];
const STATUS_OPTIONS = ["Draft", "Active", "Inactive"];
const MAX_WORDS = 30;

const WORD_DIRECTIONS = ["Horizontal", "Vertical", "Diagonal", "Backward"];

const INITIAL_WORDS = [
  "JESUS",
  "NICODEMUS",
  "LIGHT",
  "WORLD",
  "SPIRIT",
  "BELIEVE",
  "ETERNAL",
  "TRUTH",
];

/* dot colour per word — drives the "Words to Find" list */
const WORD_DOT_COLORS = {
  JESUS: "#A8E6A1",
  NICODEMUS: "#A8E6A1",
  LIGHT: "#93B8F5",
  WORLD: "#C4A5F2",
  SPIRIT: "#93B8F5",
  BELIEVE: "#F7C77E",
  ETERNAL: "#F27C9A",
  TRUTH: "#F27C9A",
};

const CLUE_PLACEHOLDER = "Find the hidden words from John 3.";

/* -------------------------------------------------------------------------
   12 × 12 LETTER GRID
   ---------------------------------------------------------------------- */
const GRID = [
  "JESUSXKMLNLL",
  "KIGAMMKKOJXY",
  "BTFEZHXNCBEF",
  "LIGHTIHOLEEY",
  "PMAVRIUYQOCW",
  "NZWEFCXRYNDQ",
  "NZBOKDMINTBE",
  "LIEVEHRKCRAH",
  "HCNKFNNKTRUT",
  "HDLGUZRULIIH",
  "YLACRTTHHMOT",
  "AWOMMZGQDIAV",
];

/* highlight pills — ONE rounded rectangle behind each whole word */
const PILLS = {
  green: { bg: "rgba(33, 172, 28, 0.15)", border: "rgba(33, 172, 28, 0.4)" },
  blue: { bg: "rgba(152, 200, 253, 0.3)", border: "rgba(152, 200, 253, 0.8)" },
  purple: { bg: "rgba(64, 34, 209, 0.15)", border: "rgba(64, 34, 209, 0.35)" },
  orange: { bg: "rgba(245, 158, 11, 0.2)", border: "rgba(245, 158, 11, 0.5)" },
  pink: { bg: "rgba(244, 63, 94, 0.15)", border: "rgba(244, 63, 94, 0.35)" },
};

/* JESUS (r0 c0-4), HOLEE (r3 c6-10), MAV (r4 c1-3),
   NKFNNKTR (r8 c2-9), TTHHM (r10 c5-9) */
const HIGHLIGHTS = [
  { row: 0, col: 0, length: 5, tone: "green" },
  { row: 3, col: 6, length: 5, tone: "blue" },
  { row: 4, col: 1, length: 3, tone: "purple" },
  { row: 8, col: 2, length: 8, tone: "orange" },
  { row: 10, col: 5, length: 5, tone: "pink" },
];

/* ==========================================================================
   PAGE-LOCAL STYLES
   ========================================================================== */
const cardClass =
  "flex w-full min-w-0 flex-col gap-[10px] rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] px-4 pt-4 pb-6 sm:px-[22px] sm:pt-[16px] sm:pb-[35px] sm:pl-[24px]";

const labelCls = "mb-2 block text-[12px] font-semibold text-[#0A0847]";

const fieldCls =
  "h-10 w-full min-w-0 rounded-[7.47px] border border-[#E2DFFC] bg-white py-[10px] pl-[12px] pr-[40px] text-[12px] font-medium text-[#0A0847]/80 outline-none transition focus:border-[#001984] sm:pr-[50px]";

const dividerCls = "h-px w-full bg-[#0A0847]/10";

const outlineButton =
  "flex h-12 w-full shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#001984] bg-[#FEFEFE] text-[14px] font-medium text-[#001984] transition-colors hover:bg-[#F1F1F9] sm:w-[152px]";

const purpleButton =
  "flex h-12 w-full shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#4022D1] px-4 py-[10px] text-[14px] font-medium text-white transition-colors hover:opacity-90 sm:w-[174px]";

const stepButton =
  "flex h-[43px] shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#001984] bg-[#FEFEFE] px-3 text-[13px] font-medium text-[#001984] transition-colors hover:bg-[#F1F1F9] sm:text-[14px]";

/* ==========================================================================
   ICONS
   ========================================================================== */
function ChipCloseIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="6.25" stroke="#0926FD" strokeWidth="1.5" />
      <path
        d="M4.8 4.8L9.2 9.2M9.2 4.8L4.8 9.2"
        stroke="#0926FD"
        strokeWidth="1.5"
        strokeLinecap="round"
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
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[14px] font-medium leading-[20px] text-[#0A0847]/60 sm:gap-x-[6px] sm:text-[16px] sm:leading-normal">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item} className="flex min-w-0 items-center gap-1.5 sm:gap-[6px]">
              {index > 0 && <span aria-hidden>&gt;</span>}
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
    <div className="inline-flex h-auto min-h-[49px] w-full max-w-[396px] items-center gap-3 self-start rounded-[8px] border border-[#E2DFFC] bg-[#F7F7F9] px-3 py-2.5 sm:gap-[12px] sm:pl-[15px] sm:pr-[12px]">
      <img src={selectorBookIcon} alt="" className="h-[19px] w-[24px] shrink-0" />
      <p className="flex min-w-0 flex-wrap items-center gap-y-0.5 text-[13px] font-semibold text-[#0A0847] sm:text-[14px]">
        {parts.map((part, index) => (
          <span key={part} className="flex items-center">
            {index > 0 && (
              <span className="px-[6px] font-medium text-[#0A0847]/60 sm:px-[8px]">&gt;</span>
            )}
            <span>{part}</span>
          </span>
        ))}
      </p>
    </div>
  );
}

function Field({ label, required, htmlFor, children }) {
  return (
    <div className="min-w-0">
      {label && (
        <label htmlFor={htmlFor} className={labelCls}>
          {label} {required && <span className="text-[#E11D48]">*</span>}
        </label>
      )}
      {children}
    </div>
  );
}

function TextInput({ id, value, onChange, adornment }) {
  return (
    <div className="relative w-full min-w-0">
      <input id={id} type="text" value={value} onChange={onChange} className={fieldCls} />
      {adornment && (
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-[#0A0847]/60">
          {adornment}
        </span>
      )}
    </div>
  );
}

function Select({ id, value, options, onChange }) {
  return (
    <div className="relative w-full min-w-0">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldCls} cursor-pointer appearance-none`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <img
        src={chevronIcon}
        alt=""
        className="pointer-events-none absolute top-1/2 right-4 w-[10px] -translate-y-1/2"
      />
    </div>
  );
}

/* ==========================================================================
   LIVE PUZZLE PREVIEW
   ========================================================================== */
const GRID_COLS = 12;
const CELL_H = 36; // h-9
const ROW_GAP = 20; // gap-y-5

function PuzzleGrid() {
  return (
    <div className="w-full rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] p-3 sm:p-[26px]">
      <div className="overflow-x-auto">
        <div className="relative min-w-[330px]">
          {/* highlight pills — one rounded rectangle behind each whole word */}
          {HIGHLIGHTS.map((h) => (
            <span
              key={`pill-${h.row}-${h.col}`}
              aria-hidden
              style={{
                left: `${(h.col / GRID_COLS) * 100}%`,
                width: `${(h.length / GRID_COLS) * 100}%`,
                top: `${h.row * (CELL_H + ROW_GAP)}px`,
                background: PILLS[h.tone].bg,
                borderColor: PILLS[h.tone].border,
              }}
              className="absolute z-0 h-9 rounded-lg border"
            />
          ))}

          <div className="relative z-[1] grid grid-cols-12 gap-y-5">
            {GRID.map((rowLetters, rowIndex) =>
              [...rowLetters].map((letter, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="relative flex h-9 items-center justify-center"
                >
                  <span className="relative z-[1] text-[14px] font-medium text-[#0A0847] sm:text-[16px]">
                    {letter}
                  </span>
                </div>
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function WordsToFind({ words }) {
  return (
    <div className="rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] px-4 pt-4 pb-4 sm:px-[22px] sm:pt-[19px] sm:pb-[19px]">
      <h3 className="text-[18px] font-semibold text-[#0A0847] sm:text-[22px]">Words to Find</h3>

      <ul className="mt-4 grid grid-cols-1 gap-y-3 min-[420px]:grid-cols-2 sm:gap-x-6">
        {words.map((word) => (
          <li
            key={word}
            className="flex min-w-0 items-center gap-3 text-[13px] font-semibold whitespace-nowrap text-[#0A0847] uppercase sm:text-[14px]"
          >
            <span
              style={{ background: WORD_DOT_COLORS[word] }}
              className="h-3 w-3 shrink-0 rounded-full"
            />
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AddWordSearch() {
  const [title, setTitle] = useState("John 3 Word Search");
  const [puzzleSize, setPuzzleSize] = useState("12 × 12");
  const [difficulty, setDifficulty] = useState("Medium");
  const [directions, setDirections] = useState(WORD_DIRECTIONS);
  const [words, setWords] = useState(INITIAL_WORDS);
  const [clue, setClue] = useState("");
  const [timeLimit, setTimeLimit] = useState("10");
  const [rewardPoints, setRewardPoints] = useState("10");
  const [status, setStatus] = useState("Draft");

  const toggleDirection = (direction) =>
    setDirections((prev) =>
      prev.includes(direction)
        ? prev.filter((item) => item !== direction)
        : [...prev, direction],
    );

  const removeWord = (word) => setWords((prev) => prev.filter((item) => item !== word));

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[#F9FAFE] font-[Inter] text-[#0A0847]">
      <div className="flex w-full min-w-0 flex-col px-4 py-6 sm:px-5">
        <Breadcrumb items={["Bible Content", "Activities", "John", "Chapter 3", "Word Search"]} />

        <h1 className="mt-4 break-words text-[20px] font-semibold text-[#0A0847] sm:mt-5 sm:text-[22px]">
          Add Word Search
        </h1>
        <p className="mt-2 text-[14px] font-medium text-[#0A0847]/60 sm:text-[16px]">
          Engage and track activities for each chapter.
        </p>

        <div className="mt-5">
          <LocationChip />
        </div>

        {/* TWO COLUMNS — stacked below xl (1280px), equal columns from xl */}
        <div className="mt-5 grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* LEFT — configure form */}
          <section className={cardClass}>
            <h2 className="text-[14px] font-semibold text-[#001984]">Configure Your Quiz</h2>

            <Field label="Puzzle Title" required htmlFor="puzzle-title">
              <TextInput id="puzzle-title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Field>

            <Field label="Puzzle Size" required htmlFor="puzzle-size">
              <Select id="puzzle-size" value={puzzleSize} options={PUZZLE_SIZE_OPTIONS} onChange={setPuzzleSize} />
            </Field>

            <Field label="Difficulty" required htmlFor="difficulty">
              <Select id="difficulty" value={difficulty} options={DIFFICULTY_OPTIONS} onChange={setDifficulty} />
            </Field>

            <div className={dividerCls} />

            {/* WORD DIRECTION CHECKBOXES */}
            <div>
              <p className="text-[14px] font-semibold text-[#0A0847]">Word Direction</p>

              <div className="mt-2.5 flex w-full max-w-[245px] flex-col gap-3 sm:gap-4">
                {WORD_DIRECTIONS.map((direction) => (
                  <label
                    key={direction}
                    className="flex cursor-pointer items-center gap-2.5 text-[13px] font-medium text-[#0A0847] sm:text-[14px]"
                  >
                    <input
                      type="checkbox"
                      checked={directions.includes(direction)}
                      onChange={() => toggleDirection(direction)}
                      className="h-[16.67px] w-[16.67px] shrink-0 cursor-pointer accent-[#001984]"
                    />
                    {direction}
                  </label>
                ))}
              </div>
            </div>

            <div className={dividerCls} />

            {/* WORDS */}
            <div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-[14px] font-semibold text-[#0A0847]">Words</p>
                <p className="text-[12px] font-medium text-[#0A0847]/60">
                  {words.length} / {MAX_WORDS}
                </p>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 sm:gap-2.5">
                {words.map((word) => (
                  <span
                    key={word}
                    className="flex h-[35px] max-w-full items-center gap-2 rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] px-3 sm:px-[13px]"
                  >
                    <span className="truncate text-[12px] font-medium uppercase text-[#001984]">
                      {word}
                    </span>
                    <button
                      type="button"
                      aria-label={`Remove ${word}`}
                      onClick={() => removeWord(word)}
                      className="flex shrink-0 cursor-pointer items-center"
                    >
                      <ChipCloseIcon size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:flex sm:flex-wrap">
              <button type="button" className={`${stepButton} w-full font-semibold sm:w-[164px]`}>
                <img src={plusIcon} alt="" className="h-[16px] w-[16px] shrink-0" />
                Add New Book
              </button>

              <button type="button" className={`${stepButton} w-full font-semibold sm:w-[244px]`}>
                <img src={downloadIcon} alt="" className="h-[13px] w-[12px] shrink-0" />
                Import Words from Chapter
              </button>
            </div>

            {/* CLUE */}
            <Field label="Clue / Instruction" htmlFor="clue">
              <div className="relative">
                <textarea
                  id="clue"
                  value={clue}
                  maxLength={200}
                  placeholder={CLUE_PLACEHOLDER}
                  onChange={(e) => setClue(e.target.value)}
                  className="h-[85px] w-full resize-none rounded-[7.47px] border border-[#E2DFFC] bg-white px-3 py-[10px] text-[12px] leading-relaxed text-[#0A0847]/80 outline-none transition placeholder:text-[#0A0847]/60 focus:border-[#001984]"
                />
                <span className="absolute right-3 bottom-2.5 text-[10px] text-[#0A0847]/60">
                  {clue.length} / 200
                </span>
              </div>
            </Field>

            <Field label="Time Limit (Optional)" htmlFor="time-limit">
              <TextInput
                id="time-limit"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                adornment="min"
              />
            </Field>

            <Field label="Reward Points" htmlFor="reward-points">
              <TextInput
                id="reward-points"
                value={rewardPoints}
                onChange={(e) => setRewardPoints(e.target.value)}
              />
            </Field>

            <Field label="Status" htmlFor="status">
              <Select id="status" value={status} options={STATUS_OPTIONS} onChange={setStatus} />
            </Field>
          </section>

          {/* RIGHT — live puzzle preview */}
          <section className={cardClass}>
            <div className="flex flex-col gap-4 sm:gap-5">
              <div>
                <h2 className="text-[18px] font-semibold text-[#0A0847] sm:text-[22px]">
                  Live Puzzle Preview
                </h2>
                <p className="mt-1 max-w-[330px] text-[14px] leading-[1.4] font-medium text-[#0A0847]/60 sm:text-[16px]">
                  This is how your word search puzzle will appear to users.
                </p>
              </div>

              <PuzzleGrid />

              <WordsToFind words={words} />
            </div>
          </section>
        </div>

        {/* BOTTOM ACTION ROW */}
        <div className="mt-6 flex w-full flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <button type="button" className={outlineButton}>
            Cancel
          </button>

          <div className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <button type="button" className={outlineButton}>
              Save as Draft
            </button>
            <button type="button" className={outlineButton}>
              Preview
            </button>
            <button type="button" className={purpleButton}>
              Publish Word Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}