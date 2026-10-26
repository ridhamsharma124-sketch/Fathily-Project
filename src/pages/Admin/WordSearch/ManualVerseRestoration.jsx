import { useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import puzzleImg from "../../../assets/word search/Puzzle img.webp";
import replaceIcon from "../../../assets/word search/mh_replace.svg";
import resetIcon from "../../../assets/word search/mh_reset.svg";
import aiImageIcon from "../../../assets/word search/pu_ai_image.svg";
import chevronIcon from "../../../assets/word search/mh_chevron.svg";
import floppyIcon from "../../../assets/word search/dr_save_floppy.svg";
import eyeIcon from "../../../assets/word search/mh_eye.svg";
import arrowRightIcon from "../../../assets/word search/mh_arrow_right.svg";


const HEADING = "#0A0847";
const MUTED = "rgba(10, 8, 71, 0.6)";
const NAVY = "#001984";
const GREEN = "#2EB84B";
const PAGE_BG = "#F8F9FE";
const BORDER = "#E4E5F0";
const CARD_BORDER = "#EFECFB";

const TABS = ["Manual Entry", "CSV Upload", "AI Generate"];

const FILTER_FIELDS = [
  { id: "testament", label: "Testament", value: "Old Testament", options: ["Old Testament", "New Testament"] },
  { id: "book", label: "Book", value: "Genesis", options: ["Genesis", "Exodus", "Psalms", "John"] },
  { id: "chapter", label: "Chapter", value: "1", options: ["1", "2", "3"] },
  { id: "level", label: "Level", value: "Level 1", options: ["Level 1", "Level 2", "Level 3"] },
  { id: "difficulty", label: "Difficulty", value: "Easy", options: ["Easy", "Medium", "Hard"] },
];

const GRID_OPTIONS = ["10 × 10", "12 × 12", "15 × 15", "20 × 20"];
const GRID_VALUE = "15 × 15";

const VERSE_TEXT = "In the beginning God created the heavens and the earth.";
const MISSING_WORDS = ["Beginning", "God", "created", "heavens", "heavens"];
const VERSE_ANSWERS = ["Beginning", "God", "created", "heavens", "heavens"];

const cardCls = "rounded-[8px] border bg-white";
const field =
  "h-[38px] w-full rounded-[8px] border bg-white px-[12px] text-[12px] font-medium outline-none focus:border-[#001984]";
const lbl = "mb-[8px] block text-[14px] font-semibold";


function Select({ id, value, onChange, options, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${field} cursor-pointer appearance-none pr-[30px]`}
        style={{ color: HEADING, borderColor: BORDER }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <img
        src={chevronIcon}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[12px] h-auto w-[10px] -translate-y-1/2"
      />
    </div>
  );
}

function Toggle({ on, onChange, label, color = "#0552AA" }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="relative h-[15px] w-[26px] shrink-0 cursor-pointer rounded-full transition-colors"
      style={{ backgroundColor: on ? color : "#D6D5E4" }}
    >
      <span
        className="absolute top-[2px] h-[11px] w-[11px] rounded-full bg-white shadow-sm transition-all"
        style={{ left: on ? 13 : 2 }}
      />
    </button>
  );
}

function DistractorChip({ children }) {
  return (
    <span
      className="inline-flex h-[24px] shrink-0 items-center gap-[6px] rounded-[6px] border px-[8px] text-[12px] font-medium whitespace-nowrap"
      style={{ backgroundColor: "#F4F2FC", borderColor: "#E3DFF6", color: HEADING }}
    >
      {children}
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden className="shrink-0">
        <path d="M1.2 1.2 6.8 6.8M6.8 1.2 1.2 6.8" stroke="#0926FD" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}


function Breadcrumb() {
  return (
    <nav className="flex flex-wrap items-center text-[14px] font-medium sm:text-[16px]" style={{ color: MUTED }}>
      Word Search <span className="mx-[6px]">&gt;</span> Add <span className="mx-[6px]">&gt;</span> Manual
    </nav>
  );
}

/* Mobile: 2-column grid. sm and up: 5 filters + Reward Points share one row. */
function FilterFields() {
  const [values, setValues] = useState(() =>
    FILTER_FIELDS.reduce((acc, f) => ({ ...acc, [f.id]: f.value }), {}),
  );
  const [reward, setReward] = useState(10);

  return (
    <div className="grid grid-cols-2 items-start gap-x-[12px] gap-y-[16px] sm:flex sm:flex-nowrap sm:gap-[16px]">
      {FILTER_FIELDS.map(({ id, label, options }) => (
        <div key={id} className="w-full min-w-0 sm:flex-1">
          <label htmlFor={id} className="mb-[8px] block text-[14px] font-medium" style={{ color: HEADING }}>
            {label}
          </label>
          <Select
            id={id}
            value={values[id]}
            onChange={(v) => setValues((p) => ({ ...p, [id]: v }))}
            options={options}
            className="w-full"
          />
        </div>
      ))}

      <div className="w-full min-w-0 sm:w-[130px] sm:shrink-0">
        <label htmlFor="reward" className="mb-[8px] block text-[14px] font-medium" style={{ color: HEADING }}>
          Reward Points
        </label>
        <div className="relative">
          <input
            id="reward"
            type="number"
            min="0"
            value={reward}
            onChange={(e) => setReward(Number(e.target.value))}
            className={`${field} pr-[24px]`}
            style={{ color: HEADING, borderColor: BORDER }}
          />
          <span className="absolute top-1/2 right-[6px] flex -translate-y-1/2 flex-col">
            <button
              type="button"
              tabIndex={-1}
              aria-label="Increase reward points"
              onClick={() => setReward((n) => n + 1)}
              className="flex h-[9px] w-[14px] cursor-pointer items-center justify-center"
              style={{ color: "#9B96B8" }}
            >
              <LuChevronUp size={11} />
            </button>
            <button
              type="button"
              tabIndex={-1}
              aria-label="Decrease reward points"
              onClick={() => setReward((n) => Math.max(0, n - 1))}
              className="flex h-[9px] w-[14px] cursor-pointer items-center justify-center"
              style={{ color: "#9B96B8" }}
            >
              <LuChevronDown size={11} />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

function TabsRow() {
  return (
    <div className="mt-[30px] flex items-stretch overflow-x-auto border-b" style={{ borderColor: BORDER }}>
      {TABS.map((t) => {
        const active = t === "Manual Entry";
        return (
          <button
            key={t}
            type="button"
            className={`h-[50px] shrink-0 whitespace-nowrap px-[16px] text-[14px] sm:px-[24px] ${
              active ? "-mb-px border-b-2 font-semibold" : "font-medium"
            }`}
            style={active ? { borderColor: NAVY, color: NAVY } : { color: MUTED }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

/* Mobile: status on top, then Save draft | Preview side by side, Add Puzzle full width. Desktop: all in one line. */
function BottomBar() {
  const [published, setPublished] = useState(true);
  return (
    <div className="mt-[40px] flex flex-col items-stretch gap-[16px] sm:mt-[48px] sm:flex-row sm:flex-nowrap sm:items-center sm:justify-between">
      <div className="flex items-center gap-[12px]">
        <span className="text-[14px] font-semibold" style={{ color: MUTED }}>
          Status
        </span>
        <Toggle on={published} onChange={setPublished} label="Toggle status" color={GREEN} />
        <span
          className="whitespace-nowrap rounded-[6px] px-[10px] py-[2px] text-[14px] font-medium"
          style={{ backgroundColor: "#E3F7E6", color: GREEN }}
        >
          Published
        </span>
      </div>

      <div className="grid grid-cols-2 gap-[12px] sm:flex sm:flex-nowrap sm:items-center">
        <button
          type="button"
          className="flex h-[42px] w-full cursor-pointer items-center justify-center gap-[8px] whitespace-nowrap rounded-[8px] border bg-white text-[14px] font-semibold transition-colors hover:bg-[#F7F8FE] sm:w-[119px] sm:shrink-0"
          style={{ borderColor: BORDER, color: NAVY }}
        >
          <img src={floppyIcon} alt="" aria-hidden className="h-[16px] w-[16px] shrink-0 object-contain" />
          Save draft
        </button>
        <button
          type="button"
          className="flex h-[42px] w-full cursor-pointer items-center justify-center gap-[8px] whitespace-nowrap rounded-[8px] border bg-white text-[14px] font-semibold transition-colors hover:bg-[#F7F8FE] sm:w-[158px] sm:shrink-0"
          style={{ borderColor: BORDER, color: NAVY }}
        >
          <img src={eyeIcon} alt="" aria-hidden className="h-[12px] w-[16px] shrink-0" />
          Preview
        </button>
        <button
          type="button"
          className="col-span-2 flex h-[42px] w-full cursor-pointer items-center justify-center gap-[10px] whitespace-nowrap rounded-[8px] text-[14px] font-bold text-white transition-opacity hover:opacity-90 sm:col-auto sm:w-[196px] sm:shrink-0"
          style={{ backgroundColor: NAVY }}
        >
          <img src={arrowRightIcon} alt="" aria-hidden className="h-[12px] w-[12px]" />
          Add Puzzle
        </button>
      </div>
    </div>
  );
}

function PuzzleImageCard() {
  return (
    <div className={`${cardCls} flex w-full shrink-0 flex-col p-[12px] xl:w-[335px]`} style={{ borderColor: CARD_BORDER }}>
      <h2 className="text-[14px] font-semibold" style={{ color: "rgba(10, 8, 71, 0.8)" }}>
        Puzzle Image
      </h2>

      <img
        src={puzzleImg}
        alt="Genesis garden and lake"
        className="mt-[16px] h-[152px] w-full rounded-[8px] object-cover sm:h-[200px] xl:h-[152px]"
      />

      <div className="mt-[16px] flex items-center justify-between gap-[8px]">
        <p className="text-[14px] leading-[16px] font-medium" style={{ color: MUTED }}>
          Chapter default image
          <br />
          applied automatically
        </p>
        <span
          className="flex h-[30px] w-[79px] shrink-0 items-center justify-center rounded-[4px] text-[12px] font-semibold"
          style={{ backgroundColor: "#E3E4F6", color: NAVY }}
        >
          DEFAULT
        </span>
      </div>

      <div className="mt-[16px] flex flex-wrap items-center gap-[10px]">
        <button
          type="button"
          className="flex h-[32px] w-full shrink-0 cursor-pointer items-center justify-center gap-[6px] whitespace-nowrap rounded-[8px] bg-white text-[12px] font-semibold transition-colors hover:bg-[#F7F8FE] sm:w-[123px]"
          style={{ border: "1px solid #E2DFFC", color: HEADING }}
        >
          <img src={replaceIcon} alt="" aria-hidden className="h-[13px] w-[13px]" />
          Replace Default
        </button>

        <button
          type="button"
          className="flex h-[32px] w-full shrink-0 cursor-pointer items-center justify-center gap-[8px] whitespace-nowrap rounded-[8px] px-[10px] text-[12px] font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
          style={{ backgroundColor: NAVY }}
        >
          <img src={aiImageIcon} alt="" aria-hidden className="h-[15px] w-[15px] shrink-0" />
          Generate AI Image
        </button>
      </div>

      <button
        type="button"
        className="mt-[16px] flex h-[32px] w-full cursor-pointer items-center justify-center gap-[6px] whitespace-nowrap rounded-[8px] bg-white text-[12px] font-semibold transition-colors hover:bg-[#F7F8FE]"
        style={{ border: "1px solid #E2DFFC", color: HEADING }}
      >
        <img src={resetIcon} alt="" aria-hidden className="h-[16px] w-[14px] shrink-0" />
        Reset to Chapter Default
      </button>
    </div>
  );
}


function VerseMiddle() {
  const [title, setTitle] = useState("Verse Restoration – Genesis 1:1");
  const [reference, setReference] = useState("Genesis");
  const [translation, setTranslation] = useState("NIV");
  const [verse, setVerse] = useState(VERSE_TEXT);
  const [answers, setAnswers] = useState(VERSE_ANSWERS);
  const [showBank, setShowBank] = useState(true);

  return (
    <div className={`${cardCls} flex min-w-0 flex-1 flex-col p-[12px] sm:p-[16px]`} style={{ borderColor: CARD_BORDER }}>
      <label className={lbl} style={{ color: HEADING }}>Puzzle Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={field}
        style={{ color: HEADING, borderColor: BORDER }}
      />

      <div className="mt-[16px] flex flex-col items-stretch gap-[16px] sm:flex-row sm:items-start">
        <div className="w-full min-w-0 sm:flex-1">
          <label className={lbl} style={{ color: HEADING }}>Verse Reference</label>
          <input
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className={field}
            style={{ color: HEADING, borderColor: BORDER }}
          />
        </div>
        <div className="w-full min-w-0 shrink-0 sm:w-[135px]">
          <label className={lbl} style={{ color: HEADING }}>Translation</label>
          <Select
            value={translation}
            onChange={setTranslation}
            options={["NIV", "KJV", "ESV", "NLT"]}
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-[16px]">
        <label className={lbl} style={{ color: HEADING }}>Full Verse Text</label>
        <textarea
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
          className="h-[80px] w-full resize-none rounded-[8px] border bg-white px-[12px] py-[10px] text-[12px] font-medium leading-[18px] outline-none focus:border-[#001984]"
          style={{ color: HEADING, borderColor: BORDER }}
        />
      </div>

      <div className="mt-[16px]">
        <label className={lbl} style={{ color: HEADING }}>Missing Words (these will be hidden in the puzzle)</label>
        <div
          className="relative flex min-h-[39px] w-full flex-wrap items-center gap-[6px] rounded-[8px] border bg-white py-[7px] pr-[36px] pl-[8px]"
          style={{ borderColor: BORDER }}
        >
          {MISSING_WORDS.map((w, i) => (
            <DistractorChip key={`${w}-${i}`}>{w}</DistractorChip>
          ))}
          <img
            src={chevronIcon}
            alt=""
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-[12px] h-auto w-[10px] -translate-y-1/2"
          />
        </div>
      </div>

      <div className="mt-[16px] flex flex-col items-stretch gap-[16px] sm:flex-row sm:items-start">
        <div className="w-full min-w-0 sm:flex-1">
          <p className="border-b pb-[10px] text-[14px] font-semibold" style={{ color: HEADING, borderColor: BORDER }}>
            Answer Word List (all hidden words)
          </p>
          <div className="mt-[14px] flex flex-col gap-[12px]">
            {answers.map((v, i) => (
              <div key={i} className="flex items-center gap-[12px]">
                <span className="w-[13px] shrink-0 text-[14px] font-semibold" style={{ color: "rgba(10, 8, 71, 0.8)" }}>
                  {i + 1}
                </span>
                <input
                  value={v}
                  onChange={(e) =>
                    setAnswers((p) => p.map((a2, j) => (j === i ? e.target.value : a2)))
                  }
                  className={`${field} min-w-0 flex-1`}
                  style={{ color: MUTED, borderColor: BORDER }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={`${cardCls} w-full shrink-0 p-[12px] sm:w-[211px]`} style={{ borderColor: CARD_BORDER }}>
          <div className="flex items-start justify-between gap-[10px]">
            <p className="text-[12px] leading-[15px] font-medium" style={{ color: HEADING }}>
              Show Word Bank (for verse restoration puzzles):
            </p>
            <Toggle on={showBank} onChange={setShowBank} label="Show Word Bank" />
          </div>
          <p className="mt-[10px] text-[10px] leading-[13px] font-medium" style={{ color: MUTED }}>
            Display a word bank to help players solve the puzzle.
          </p>
        </div>
      </div>
    </div>
  );
}

function VerseRight() {
  const [size, setSize] = useState(GRID_VALUE);
  return (
    <div className={`${cardCls} h-full w-full p-[12px] sm:p-[16px]`} style={{ borderColor: CARD_BORDER }}>
      <label className={lbl} style={{ color: HEADING }}>Grid Size</label>
      <Select value={size} onChange={setSize} options={GRID_OPTIONS} className="w-full" />
    </div>
  );
}


export default function ManualVerseRestoration() {
  return (
    <div
      className="min-h-[calc(100vh-72px)]"
      style={{
        backgroundColor: PAGE_BG,
        color: HEADING,
        fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="mx-auto w-full max-w-[1118px] px-[16px] py-[24px] sm:px-[28px]">
        <Breadcrumb />

        <h1 className="mt-[13px] text-[20px] leading-[1.2] font-semibold sm:text-[22px]" style={{ color: HEADING }}>
          Add Word Search — Manual Entry
        </h1>

        <p className="mt-[10px] text-[14px] leading-[1.3] font-semibold" style={{ color: MUTED }}>
          Manual — Verse Restoration
        </p>

        <div className="mt-[20px]">
          <FilterFields />
        </div>

        <TabsRow />

        <div className="mt-[24px] sm:mt-[30px]">
          <div className="flex flex-col items-stretch gap-[20px] xl:flex-row">
            <PuzzleImageCard />
            <div className="flex min-w-0 flex-1 flex-col items-stretch gap-[20px] xl:flex-row">
              <VerseMiddle />
              <div className="flex w-full min-w-0 shrink-0 flex-col xl:w-[200px]">
                <VerseRight />
              </div>
            </div>
          </div>
        </div>

        <BottomBar />
      </div>
    </div>
  );
}