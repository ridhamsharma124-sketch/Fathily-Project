import { Fragment, useState } from "react";
import {
  LuBookOpen,
  LuCheck,
  LuChevronDown,
  LuCircleHelp,
  LuClock,
  LuEye,
  LuHistory,
  LuMinus,
  LuPlus,
  LuRefreshCw,
  LuTrash2,
} from "react-icons/lu";
import realistic1 from "../../../assets/quiz-management/Realistic1.webp";
import realistic2 from "../../../assets/quiz-management/Realistic2.webp";
import realistic3 from "../../../assets/quiz-management/Realistic3.webp";
import realistic4 from "../../../assets/quiz-management/Realistic4.webp";
import aiGenImg1 from "../../../assets/quiz-management/AI Generator img1.webp";
import aiGenImg2 from "../../../assets/quiz-management/AI Generator img2.webp";
import aiGenImg3 from "../../../assets/quiz-management/AI Generator img3.webp";
import aiGenImg4 from "../../../assets/quiz-management/AI Generator img4.webp";
import aiGenImg5 from "../../../assets/quiz-management/AI Generator img5.webp";


const CARD = "rounded-[8px] border border-[#E2DFFC] bg-[#FEFFFF]";
const SELECT_FIELD =
  "h-full w-full cursor-pointer appearance-none rounded-[8px] border border-[#E2DFFC] bg-[#FEFFFF] pl-[12px] pr-[50px] text-[14px] text-[#0A0847]/80 outline-none";
const LABEL = "text-[14px] leading-none font-semibold text-[#0A0847]";
const HELPER = "text-[12px] leading-none font-medium text-[#0A0847]/60";


const LOCATION_SELECTORS = [
  { label: "Testament", value: "Old Testament" },
  { label: "Book", value: "Genesis" },
  { label: "Chapter", value: "Chapter 1" },
  { label: "Level", value: "Level 1" },
];

const QUESTION_TYPES = [
  { id: "mc", label: "Multiple Choice", kind: "list" },
  { id: "fitb", label: "Fill in the Blank", kind: "fitb" },
  { id: "tf", label: "True / False", kind: "tf" },
  { id: "order", label: "Tag an Order", kind: "order" },
];

const DIFFICULTY_MIX = [
  { label: "Easy", value: 40 },
  { label: "Medium", value: 40 },
  { label: "Hard", value: 20 },
];

const IMAGE_STYLES = [
  { id: "s1", src: realistic1, caption: "Realistic" },
  { id: "s2", src: realistic2, caption: "Realistic" },
  { id: "s3", src: realistic3, caption: "Realistic" },
  { id: "s4", src: realistic4, caption: "Realistic" },
];

const TYPE_BADGE = {
  "Multiple Choice": { bg: "rgba(93,28,172,0.1)", fg: "#5D1CAC" },
  "Fill in the Blank": { bg: "rgba(43,164,82,0.1)", fg: "#2BA452" },
  "True / False": { bg: "#E3F2FB", fg: "#1E88C7" },
  "Tag an Order": { bg: "rgba(239,100,31,0.1)", fg: "#EF641F" },
  "Who Am I": { bg: "#FBE3E8", fg: "#6B2FB3" },
};

const DIFF_BADGE = {
  Easy: { bg: "rgba(43,164,82,0.1)", fg: "rgba(10,8,71,0.8)" },
  Medium: { bg: "rgba(239,100,31,0.1)", fg: "#EF641F" },
  Hard: { bg: "rgba(216,0,39,0.1)", fg: "#D80027" },
};

const QUESTIONS = [
  {
    id: 1,
    image: aiGenImg1,
    question: "What did the serpent say to the woman in the garden?",
    options: [
      "A. You will surely die.",
      "B. You will surely not die.",
      "C. God is watching you.",
      "D. This fruit is not for you.",
    ],
    correct: 1,
    answer: null,
    verse: "Genesis 3:4",
    difficulty: "Easy",
    type: "Multiple Choice",
  },
  {
    id: 2,
    image: aiGenImg2,
    question: "Fill in the blank: The woman saw that the tree was ______ to the eyes",
    options: [],
    correct: null,
    answer: "pleasing",
    verse: "Genesis 3:4",
    difficulty: "Easy",
    type: "Fill in the Blank",
  },
  {
    id: 3,
    image: aiGenImg3,
    question: "Is it true that Adam blamed Eve for eating the fruit?",
    options: ["A. True", "B. False"],
    correct: 0,
    answer: null,
    verse: "Genesis 3:4",
    difficulty: "Medium",
    type: "True / False",
  },
  {
    id: 4,
    image: aiGenImg4,
    question: "Place the events in order:",
    order: ["1. Serpent talks to Eve", "2. Eve eats the fruit", "3. Adam eats the fruit"],
    options: [],
    correct: null,
    answer: null,
    verse: "Genesis 3:4",
    difficulty: "Hard",
    type: "Tag an Order",
  },
  {
    id: 5,
    image: aiGenImg5,
    question: "Who am I? I was created from Adam's rib.",
    options: [],
    correct: null,
    answer: "Eve",
    verse: "Genesis 3:4",
    difficulty: "Easy",
    type: "Who Am I",
  },
];


function StepDot({ children }) {
  return (
    <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#001984] text-[12px] leading-none font-semibold text-white">
      {children}
    </span>
  );
}

function SectionTitle({ step, title }) {
  return (
    <div className="flex items-center gap-[12px]">
      <StepDot>{step}</StepDot>
      <h3 className="text-[14px] leading-none font-semibold text-[#0A0847]">{title}</h3>
    </div>
  );
}

function Chevron({ className = "" }) {
  return <LuChevronDown size={18} className={`text-[#0A0847]/60 ${className}`} />;
}

function FieldSelect({ value, options, className = "", chevronClass = "right-[16px]" }) {
  return (
    <div className={`relative h-full ${className}`}>
      <select aria-label={value} defaultValue={value} className={SELECT_FIELD}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Chevron className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${chevronClass}`} />
    </div>
  );
}

function Badge({ children, bg, fg, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-[4px] p-[8px] text-[12px] leading-none font-semibold whitespace-nowrap ${className}`}
      style={{ background: bg, color: fg }}
    >
      {children}
    </span>
  );
}

function GlyphIcon({ kind }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (kind === "list") {
    return (
      <svg {...common}>
        <rect x="2.5" y="4.5" width="3.5" height="3.5" rx="1" fill="currentColor" stroke="none" />
        <rect x="2.5" y="10.25" width="3.5" height="3.5" rx="1" fill="currentColor" stroke="none" />
        <rect x="2.5" y="16" width="3.5" height="3.5" rx="1" fill="currentColor" stroke="none" />
        <path d="M10 6.25h11M10 12h11M10 17.75h11" />
      </svg>
    );
  }

  if (kind === "fitb") {
    return (
      <svg {...common} strokeWidth="2">
        <rect x="2.5" y="3" width="7" height="7" rx="1.5" />
        <path d="m4.4 6.6 1.3 1.3 2-2.4" strokeWidth="1.6" />
        <rect x="2.5" y="14" width="7" height="7" rx="1.5" />
        <path d="M13 5h8M13 8.5h5M13 16h8M13 19.5h5" />
      </svg>
    );
  }

  return (
    <svg {...common} strokeWidth="2">
      <circle cx="6" cy="6.5" r="3.8" />
      <path d="m4.3 6.6 1.3 1.3 2-2.4" strokeWidth="1.6" />
      <circle cx="6" cy="17.5" r="3.8" />
      <path d="m4.4 15.9 3.2 3.2M7.6 15.9l-3.2 3.2" strokeWidth="1.6" />
      <path d="M13 5h8M13 8.5h5M13 16h8M13 19.5h5" />
    </svg>
  );
}

function AiGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#1A56C4]">
      <rect x="2.5" y="2.5" width="15" height="15" rx="3.5" stroke="currentColor" strokeWidth="1.8" />
      <text x="10" y="13.6" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="currentColor" fontFamily="Inter, sans-serif">AI</text>
      <path d="M19 14.5l1.1 3.4 3.4 1.1-3.4 1.1L19 23.5l-1.1-3.4-3.4-1.1 3.4-1.1z" fill="currentColor" />
    </svg>
  );
}

function SparkleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 5l2.2 6.8L19 14l-6.8 2.2L10 23l-2.2-6.8L1 14l6.8-2.2z" />
      <path d="M19 1l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" />
    </svg>
  );
}

function TypeGlyph({ kind }) {
  if (kind === "order") {
    return (
      <span className="flex h-[32px] items-center gap-[2px]">
        {[1, 2, 3].map((n, index) => (
          <Fragment key={n}>
            {index > 0 && <span className="h-px w-[4px] bg-[#001984]" />}
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#001984] text-[11px] leading-none font-bold text-white">
              {n}
            </span>
          </Fragment>
        ))}
      </span>
    );
  }

  return (
    <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#001984] text-white">
      <GlyphIcon kind={kind} />
    </span>
  );
}


export default function AIQuizGenerator() {
  const [count, setCount] = useState(15);
  const [activeTypes, setActiveTypes] = useState(QUESTION_TYPES.map((type) => type.id));
  const [styleId, setStyleId] = useState("s1");
  const [selectAll, setSelectAll] = useState(false);
  const [note, setNote] = useState("");

  const toggleType = (id) =>
    setActiveTypes((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  return (
    <div className="min-h-screen w-full bg-[#F8F8FF] p-4 font-inter sm:p-6">
      <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-[22px] leading-none font-semibold text-[#0A0847]">
            AI Question Generator
          </h1>
          <p className="mt-[12px] text-[15px] leading-[1.4] text-[#0A0847]/60">
            Generate high-quality Bible quiz questions with images using AI.
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-[12px] sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-[14px]">
          <button
            type="button"
            className="flex h-[44px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[8px] border border-[#001984] bg-[#FEFEFE] p-[12px] text-[14px] font-semibold whitespace-nowrap text-[#001984] sm:w-[163px]"
          >
            <LuCircleHelp size={18} strokeWidth={1.8} />
            How it works
          </button>
          <button
            type="button"
            className="flex h-[44px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[8px] border border-[#001984] bg-[#FEFEFE] p-[12px] text-[14px] font-semibold text-[#001984] sm:w-[156px]"
          >
            <LuHistory size={18} strokeWidth={1.8} />
            History
          </button>
        </div>
      </div>

      {/* Location selectors: 2x2 grid on mobile, one row from sm up. */}
      <div className={`mt-[40px] flex h-auto flex-col items-stretch gap-[12px] px-[12px] py-[16px] sm:min-h-[92px] sm:flex-row sm:items-center sm:px-[24px] ${CARD}`}>
        <div className="grid w-full grid-cols-2 gap-x-[8px] gap-y-[14px] sm:flex sm:flex-1 sm:items-center sm:gap-0 sm:overflow-x-auto">
          {LOCATION_SELECTORS.map((selector, index) => (
            <Fragment key={selector.label}>
              {index > 0 && <span className="hidden h-[48px] w-px bg-[#E2DFFC] sm:block" />}
              <div className="flex min-w-0 flex-1 items-center gap-[8px] px-[4px] sm:gap-[10px] sm:px-[16px]">
                <span className="flex min-w-0 flex-col gap-[4px]">
                  <span className="text-[12px] leading-none font-medium text-[#0A0847]/60">
                    {selector.label}
                  </span>
                  <span className="truncate text-[16px] leading-none font-semibold text-[#0A0847]">
                    {selector.value}
                  </span>
                </span>
                <Chevron className="ml-auto shrink-0" />
              </div>
            </Fragment>
          ))}
        </div>

        <div className="flex w-full shrink-0 flex-col justify-center gap-[10px] rounded-[6px] bg-[#F1EFFD] p-[12px] sm:ml-[16px] sm:w-[226px]">
          <span className="text-[14px] leading-none font-semibold text-[#0A0847]">
            Select Location
          </span>
          <span className={HELPER}>Genesis › Chapter 3 › Level 1</span>
        </div>
      </div>

      <div className="mt-[28px] grid grid-cols-1 items-stretch gap-[24px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className={`flex min-w-0 flex-col px-[16px] pt-[20px] pb-[24px] sm:px-[20px] ${CARD}`}>
          <div>
            <div className="flex h-auto min-h-[48px] items-start gap-[24px] overflow-x-auto sm:gap-[32px]">
              <button
                type="button"
                className="relative flex h-[48px] shrink-0 cursor-pointer items-center whitespace-nowrap text-[15px] font-medium text-[#0A0847]"
              >
                Generate Questions
                <span className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#001984]" />
              </button>
              <button
                type="button"
                className="flex h-[48px] shrink-0 cursor-pointer items-center whitespace-nowrap text-[15px] font-medium text-[#0A0847]/60"
              >
                Generation History
              </button>
            </div>
            <div className="h-px w-full bg-[#0A0847]/10" />
          </div>

          <div className="mt-[24px]">
            <SectionTitle step="1" title="Question Settings" />
          </div>

          <div className="mt-[20px]">
            <p className={LABEL}>
              Number of Questions to Generate <span className="text-[#D80027]">*</span>
            </p>
            <div className="mt-[8px] flex h-[47px] w-full max-w-[337px] items-stretch overflow-hidden rounded-[8px] border border-[#E2DFFC] bg-white">
              <button
                type="button"
                aria-label="Decrease"
                onClick={() => setCount((current) => Math.max(1, current - 1))}
                className="flex w-[40px] shrink-0 cursor-pointer items-center justify-center border-r border-[#E2DFFC] text-[#001984]"
              >
                <LuMinus size={16} />
              </button>
              <span className="flex flex-1 items-center justify-center text-[14px] font-medium text-[#001984]">
                {count}
              </span>
              <button
                type="button"
                aria-label="Increase"
                onClick={() => setCount((current) => current + 1)}
                className="flex w-[45px] shrink-0 cursor-pointer items-center justify-center border-l border-[#E2DFFC] text-[#001984]"
              >
                <LuPlus size={16} />
              </button>
            </div>
            <p className={`mt-[8px] ${HELPER}`}>Recommended: 5–30 at a time for best results.</p>
          </div>

          <div className="mt-[24px]">
            <p className={LABEL}>Question Types</p>
            <div className="mt-[8px] grid grid-cols-2 gap-[8px] sm:grid-cols-4">
              {QUESTION_TYPES.map((type) => {
                const active = activeTypes.includes(type.id);
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => toggleType(type.id)}
                    className={`relative flex h-[84px] min-w-0 cursor-pointer flex-col items-center justify-center gap-[10px] rounded-[8px] border px-[4px] text-center ${
                      active ? "border-[#001984] bg-[#F4F1FE]" : "border-[#E2DFFC] bg-[#F9F8FF]"
                    }`}
                  >
                    <TypeGlyph kind={type.kind} />
                    <span className="max-w-full truncate text-[12px] leading-none font-semibold text-[#0A0847]/80">
                      {type.label}
                    </span>
                    {active && (
                      <span className="absolute top-[6px] right-[6px] z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#2E9E3E] text-white">
                        <LuCheck size={12} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="mt-[12px] flex h-[39px] w-full cursor-pointer items-center gap-[10px] rounded-[8px] border border-[#E2DFFC] bg-white px-[16px] py-[7px] text-[14px] font-medium text-[#0A0847]/80"
            >
              + 6 more
              <Chevron />
            </button>
          </div>

          <div className="mt-[24px]">
            <div className="flex items-center gap-[8px]">
              <p className="text-[14px] leading-none font-semibold text-[#0A0847]">Difficulty Mix</p>
              <LuCircleHelp size={16} className="text-[#0A0847]/60" />
            </div>
            <div className="mt-[8px] grid grid-cols-3 gap-[8px] sm:flex sm:flex-wrap sm:gap-[12px]">
              {DIFFICULTY_MIX.map((entry) => (
                <div
                  key={entry.label}
                  className="flex h-[71px] min-w-0 flex-col justify-center gap-[10px] rounded-[8px] border border-[#E2DFFC] bg-[#FEFFFF] p-[10px] sm:w-full sm:max-w-[160px] sm:flex-1 sm:p-[12px]"
                >
                  <span className="flex items-center justify-between text-[14px] leading-none font-medium text-[#0A0847]/80">
                    <span className="truncate">{entry.label}</span>
                    <Chevron className="shrink-0" />
                  </span>
                  <span className="text-[14px] leading-none font-medium text-[#0A0847]/80">
                    {entry.value} %
                  </span>
                </div>
              ))}
            </div>
            <p className={`mt-[8px] ${HELPER}`}>
              AI will split approximately balanced difficulty questions.
            </p>
          </div>

          <div className="mt-[16px]">
            <p className="text-[12px] leading-none font-semibold text-[#0A0847]">
              Additional Instructions <span className="font-medium">(Optional)</span>
            </p>
            <div className="relative mt-[6px]">
              <textarea
                rows={2}
                value={note}
                maxLength={500}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Add any special instructions for the AI..."
                className="h-[56px] w-full resize-none rounded-[8px] border border-[#E2DFFC] bg-white p-[12px] text-[14px] text-[#0A0847] outline-none placeholder:text-[#0A0847]/60"
              />
              <span className="absolute right-[10px] bottom-[6px] text-[12px] italic text-[#0A0847]/60">
                {note.length} / 500
              </span>
            </div>
          </div>

          <div className="mt-[16px] h-px w-full bg-[#0A0847]/10" />

          <div className="mt-[24px]">
            <SectionTitle step="2" title="Image Settings" />
          </div>

          <p className={`mt-[20px] ${LABEL}`}>Image Style</p>
          <div className="mt-[8px] grid grid-cols-2 gap-[8px] sm:flex sm:flex-wrap">
            {IMAGE_STYLES.map((style) => {
              const active = styleId === style.id;
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setStyleId(style.id)}
                  className={`relative flex w-full min-w-0 cursor-pointer flex-col items-stretch rounded-[8px] border px-[8px] pt-[8px] pb-[12px] sm:max-w-[140px] sm:flex-1 sm:px-[13px] sm:pt-[11px] sm:pb-[15px] ${
                    active ? "border-[#001984] bg-[#FEFFFF]" : "border-[#E2DFFC] bg-[#FEFFFF]"
                  }`}
                >
                  <span className="block aspect-[113/95] w-full shrink-0 overflow-hidden rounded-[8px] border border-[#E2DFFC] bg-[#EEEAFB]">
                    <img
                      src={style.src}
                      alt={style.caption}
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.visibility = "hidden";
                      }}
                    />
                  </span>
                  <span className="mt-[10px] text-center text-[14px] leading-none font-medium text-[#0A0847]/80">
                    {style.caption}
                  </span>
                  {active && (
                    <span className="absolute top-[12px] right-[14px] z-10 flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#2E9E3E] text-white sm:top-[10px] sm:right-[12px]">
                      <LuCheck size={10} strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-[20px] flex flex-col gap-[16px] sm:flex-row sm:gap-[8px]">
            <div className="w-full min-w-0 sm:w-[272px] sm:shrink-0">
              <p className={LABEL}>Image Quality</p>
              <div className="mt-[6px] h-[44px]">
                <FieldSelect value="High (Recommended)" options={["High (Recommended)", "Standard"]} chevronClass="right-[16px] sm:right-[43px]" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className={LABEL}>Image Format</p>
              <div className="mt-[6px] h-[44px]">
                <FieldSelect value="Landscape (16:9)" options={["Landscape (16:9)", "Square (1:1)"]} chevronClass="right-[16px] sm:right-[6px]" />
              </div>
            </div>
          </div>

          <div className="mt-[16px] grid grid-cols-1 items-end gap-[12px] lg:grid-cols-[46%_minmax(0,1fr)]">
            <div className="flex min-w-0 flex-col gap-[8px] rounded-[8px] border border-[#E2DFFC] bg-[#F1EFFD] p-[12px]">
              <div className="flex items-center gap-[8px]">
                <AiGlyph />
                <span className="text-[14px] leading-none font-medium text-[#0A0847]/80">
                  AI will generate
                </span>
              </div>
              <ul className="flex flex-col gap-[3px] pl-[4px] text-[12px] leading-[1.5] font-medium text-[#0B4DBB]">
                {[
                  "Questions with answers and options",
                  "Relevant Bible verses",
                  "Explanations",
                  "Hints",
                  "High-quality images for each question",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-[8px]">
                    <span className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full bg-[#0B4DBB]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex min-w-0 flex-col justify-end gap-[20px] pb-[8px]">
              <div className="flex flex-wrap items-center gap-[8px] text-[12px] leading-none font-medium text-[#0A0847]/60">
                <LuClock size={20} className="shrink-0 text-[#1A56C4]" />
                Estimated time: 30–60 seconds
              </div>
              <button
                type="button"
                className="flex h-[38px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[6px] border border-[#001984] bg-[#E8E8F6] text-[14px] font-semibold whitespace-nowrap text-[#001984]"
              >
                <SparkleGlyph />
                Generate Questions &amp; Images
              </button>
            </div>
          </div>
        </div>

        <div className={`flex min-w-0 flex-col p-[16px] ${CARD}`}>
          <div className="flex flex-col gap-[12px] sm:flex-row sm:items-start sm:justify-between sm:gap-[10px]">
            <div className="min-w-0">
              <div className="flex items-center gap-[12px]">
                <StepDot>3</StepDot>
                <h3 className="text-[14px] leading-none font-semibold text-[#0A0847]">
                  Generated Questions Preview
                </h3>
              </div>
              <p className={`mt-[10px] pl-[36px] sm:pl-[24px] ${HELPER}`}>
                Review and edit before adding to Level 1.
              </p>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-[12px] sm:flex-col sm:items-end">
              <span className="rounded-[6px] bg-[#E8E8F6] px-[10px] py-[4px] text-[12px] font-medium whitespace-nowrap text-[#0A0847]">
                15 Questions Generated
              </span>
              <label className="flex cursor-pointer items-center gap-[8px]">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={(event) => setSelectAll(event.target.checked)}
                  className="h-[16px] w-[16px] cursor-pointer appearance-none rounded-[3px] border-[1.5px] border-[#6B6F8D] bg-white checked:border-[#001984] checked:bg-[#001984]"
                />
                <span className="text-[12px] leading-none font-medium text-[#0A0847]/80">Select All</span>
              </label>
            </div>
          </div>

          <div className="mt-[16px] flex w-full flex-col gap-[16px]">
            {QUESTIONS.map((q) => {
              const type = TYPE_BADGE[q.type];
              const diff = DIFF_BADGE[q.difficulty];
              return (
                <div
                  key={q.id}
                  className="mx-auto w-full max-w-none rounded-[8px] border border-[#E2DFFC] bg-[#FEFFFF] p-[12px] sm:p-[16px]"
                >
                  <div className="relative aspect-[401/186] w-full overflow-hidden rounded-[8px] border border-[#E2DFFC] bg-white">
                    <img
                      src={q.image}
                      alt=""
                      className="block h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.visibility = "hidden";
                      }}
                    />
                  </div>

                  <p className="mt-[12px] text-[14px] leading-[1.35] font-semibold text-[#0A0847]/80">
                    {q.question}
                  </p>

                  {q.order && (
                    <div className="mt-[8px] space-y-[4px] text-[12px] font-medium text-[#0A0847]/80">
                      {q.order.map((step) => (
                        <p key={step}>{step}</p>
                      ))}
                    </div>
                  )}

                  {q.options.length > 0 && (
                    <div className="mt-[8px] flex flex-col gap-[6px]">
                      {q.options.map((option, index) => {
                        const active = q.correct === index;
                        return (
                          <div key={option} className="flex items-center gap-[8px]">
                            <span
                              className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-2 ${
                                active ? "border-[#2E9E3E]" : "border-[#C9CCE0]"
                              }`}
                            >
                              {active && <span className="h-[9px] w-[9px] rounded-full bg-[#2E9E3E]" />}
                            </span>
                            <span
                              className={`rounded-[6px] px-[12px] py-[6px] text-[12px] font-medium ${
                                active ? "bg-[#EAF7EC] text-[#2E9E3E]" : "text-[#0A0847]/80"
                              }`}
                            >
                              {option}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {q.answer && (
                    <p className="mt-[8px] text-[12px] font-medium text-[#0A0847]/80">
                      Correct Answer:{" "}
                      <span className="font-semibold text-[#2E9E3E]">{q.answer}</span>
                    </p>
                  )}

                  <div className="mt-[12px] h-px w-full bg-[#0A0847]/10" />

                  <div className="mt-[10px] flex items-end justify-between gap-[10px]">
                    <div className="flex min-w-0 flex-col gap-[16px]">
                      <span className="flex items-center gap-[8px] text-[16px] leading-none font-semibold text-[#001984]">
                        <LuBookOpen size={22} className="shrink-0 text-[#001984]" />
                        {q.verse}
                      </span>
                      <div className="flex flex-col items-start gap-[8px]">
                        <span className="text-[14px] leading-none font-semibold text-[#0A0847]/80">Difficulty</span>
                        <Badge bg={diff.bg} fg={diff.fg} className="h-[26px] w-[79px] justify-center">
                          {q.difficulty}
                        </Badge>
                      </div>
                      <div className="flex flex-col items-start gap-[8px]">
                        <span className="text-[14px] leading-none font-semibold text-[#0A0847]/80">Type</span>
                        <Badge bg={type.bg} fg={type.fg} className="h-[31px] min-w-[131px] justify-center">
                          {q.type}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col gap-[8px]">
                      <button
                        type="button"
                        className="flex h-[32px] w-[46px] cursor-pointer items-center justify-center rounded-[4px] border border-[#E2DFFC] bg-white text-[12px] font-medium text-[#0A0847]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        aria-label="Preview"
                        className="flex h-[32px] w-[46px] cursor-pointer items-center justify-center rounded-[4px] border border-[#E2DFFC] bg-white text-[#001984]"
                      >
                        <LuEye size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label="Delete"
                        className="flex h-[32px] w-[46px] cursor-pointer items-center justify-center rounded-[4px] border border-[#E2DFFC] bg-white text-[#D80027]"
                      >
                        <LuTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-[24px] flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[14px] font-semibold text-[#0A0847]">15 questions generated</span>
        <div className="flex flex-col items-stretch gap-[10px] sm:flex-row sm:items-center">
          <button
            type="button"
            className="h-[42px] w-full cursor-pointer rounded-[4px] border border-[#E2DFFC] bg-white text-[14px] font-semibold text-[#0A0847] sm:w-[158px]"
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex h-[42px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[4px] border border-[#E2DFFC] bg-white text-[14px] font-semibold text-[#0A0847] sm:w-[130px]"
          >
            <LuRefreshCw size={15} />
            Regenerate
          </button>
          <button
            type="button"
            className="flex h-[42px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[4px] bg-[#001984] text-[14px] font-semibold whitespace-nowrap text-white sm:w-[189px]"
          >
            <LuPlus size={16} strokeWidth={2.2} />
            Add All to Level 1
          </button>
        </div>
      </div>

      <div className="h-[40px]" />
    </div>
  );
}