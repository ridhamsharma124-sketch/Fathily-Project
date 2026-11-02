import { useState } from "react";
import level1Image from "../../../assets/activities/level1.webp";
import level2Image from "../../../assets/activities/level2.webp";
import level3Image from "../../../assets/activities/level3.webp";
import { LuPencil, LuExternalLink, LuRefreshCw } from "react-icons/lu";

import selectorBookIcon from "../../../assets/activities/icon-book-purple.svg";

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const BREADCRUMBS = ["Bible Content", "Articles", "John", "Chapter 3", "Quiz"];
const LOCATION_PARTS = ["New Testament", "John", "Chapter 3"];

const QUESTION_TYPE_OPTIONS = ["Multiple Choice"];
const DIFFICULTY_OPTIONS = ["Medium", "Easy", "Hard"];
const LEVEL_COUNT_OPTIONS = ["3", "4", "5"];
const QUESTIONS_PER_LEVEL_OPTIONS = ["5", "10", "15"];

const LEVELS = [
  { id: 1, selected: false },
  { id: 2, selected: true },
  { id: 3, selected: false },
  { id: 4, selected: true },
  { id: 5, selected: true },
];

const LEVEL_SUMMARY = ["Level 2 = 5", "Level 3 = 5", "Level 4 = 5"];

const LEVEL_TABS = [
  { id: "create", label: "Create New Levels" },
  { id: "existing", label: "Use Existing Levels" },
];

const LEVEL_IMAGES = {
  "level 1": level1Image,
  "level 2": level2Image,
  "level 3": level3Image,
};

const GENERATED_QUESTIONS = [
  {
    id: 1,
    level: "level 1",
    text: "1. What did Nicodemus come to Jesus at night to discuss?",
    options: [
      "How to perform miracles",
      "How to be born again",
      "How to become a disciple",
      "How to teach the law",
    ],
  },
  {
    id: 2,
    level: "level 2",
    text: "2. Why could Nicodemus not understand what Jesus was explaining?",
    options: [
      "He had never read the law",
      "He was listening to the crowd",
      "He was a teacher of the law",
      "He came during the day",
    ],
  },
  {
    id: 3,
    level: "level 3",
    text: "3. What does Jesus compare the new birth to being born of?",
    options: ["Water", "The Spirit", "Fire", "Wind"],
  },
];

/* label: Inter 600 / 12px / lh 15 */
const labelCls = "block text-[12px] font-semibold leading-[15px] text-[#0A0847]";

/* input / select: full width, radius 7.47, Inter 500 / 12px */
const fieldCls =
  "h-10 w-full rounded-[7.47px] border border-[#E2DFFC] bg-white pl-3 pr-10 text-[12px] font-medium leading-[15px] text-[#0A0847]/80 outline-none transition focus:border-[#001984]";

/* helper text: Inter 500 / 10px, #0A0847 @ 60% */
const helperCls = "text-[10px] font-medium leading-[12px] text-[#0A0847]/60";

/* soft action button inside question cards */
const actionButton =
  "flex h-[38px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#9CAFF4] bg-[#F3F7FD] text-[12px] font-semibold leading-[15px] text-[#0A0847] transition-colors hover:bg-[#E8EEFB]";

const requiredMark = <span className="text-[#D4001A]"> *</span>;

/* ==========================================================================
   PAGE-LOCAL PRIMITIVES
   ========================================================================== */
function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] font-medium leading-[18px] text-[#0A0847]/60 sm:text-[16px] sm:leading-[20px]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item} className="flex min-w-0 items-center gap-1.5">
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
function LocationChip({ parts }) {
  return (
    <div className="inline-flex max-w-full items-center gap-[10px] self-start rounded-[8px] border border-[#E2DFFC] bg-[#F7F7F9] px-3 py-3 sm:w-[396px] sm:pt-[13px] sm:pr-[12px] sm:pb-[12px] sm:pl-[15px]">
      <img src={selectorBookIcon} alt="" width={24} height={24} className="h-6 w-6 shrink-0" />
      <p className="flex min-w-0 flex-wrap items-center gap-x-[10px] gap-y-1 text-[14px] font-semibold leading-6 text-[#0A0847]/80 sm:text-[16px]">
        {parts.map((part, index) => (
          <span key={part} className="flex items-center gap-[12px] whitespace-nowrap">
            {index > 0 && <span aria-hidden>&gt;</span>}
            <span>{part}</span>
          </span>
        ))}
      </p>
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
      className={`relative h-[15px] w-[26px] shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-[#0A54AB]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`absolute top-px h-[13px] w-[13px] rounded-full border bg-white transition-all ${
          checked ? "left-[12px] border-[#0A54AB]" : "left-px border-[#D1D5DB]"
        }`}
      />
    </button>
  );
}

function Checkbox({ checked, onChange, label }) {
  return (
    <label className="relative inline-flex h-4 w-4 shrink-0 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={label}
        className="peer sr-only"
      />
      <span className="flex h-4 w-4 items-center justify-center rounded-[3px] border border-[#001984] bg-white transition-colors peer-checked:bg-[#001984] peer-focus-visible:ring-2 peer-focus-visible:ring-[#001984]/40">
        <svg viewBox="0 0 12 12" className="h-3 w-3 opacity-0 peer-checked:opacity-100" fill="none" aria-hidden>
          <path
            d="M2.5 6.3 5 8.8l4.5-5"
            stroke="#fff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </label>
  );
}

function SmallChevron({ className = "" }) {
  return (
    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden className={className}>
      <path
        d="M.75.75 4 4l3.25-3.25"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CompactSelect({ id, value, options, onChange }) {
  return (
    <div className="relative w-full min-w-0">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`${fieldCls} cursor-pointer appearance-none`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <SmallChevron className="pointer-events-none absolute right-[17px] top-1/2 -translate-y-1/2 text-[#0A0847]/60" />
    </div>
  );
}

function ToggleRow({ title, description, checked, onChange }) {
  return (
    <div className="flex min-h-[32px] items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-[13px] font-semibold leading-[16px] text-[#0A0847]">{title}</p>
        <p className={`mt-[2px] ${helperCls}`}>{description}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full shrink-0 bg-[#0A0847]/10" />;
}

function QuestionCard({ question, selected, onSelect }) {
  return (
    <article className="flex min-w-0 flex-col rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] px-3 pt-[19px] pb-5">
      <div className="flex items-start gap-3 sm:gap-5">
        <div className="mt-[2px] shrink-0 sm:ml-[2px]">
          <Checkbox checked={selected} onChange={onSelect} label={`Select question ${question.id}`} />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-5 sm:flex-row sm:gap-8">
          <img
            src={LEVEL_IMAGES[question.level]}
            alt={`${question.level} illustration`}
            width={194}
            height={229}
            className="h-auto w-full rounded-lg border border-[#E2DFFC] object-cover sm:h-[229px] sm:w-[194px] sm:shrink-0"
          />

          <div className="flex min-w-0 flex-1 flex-col gap-[15px]">
            <span className="inline-flex h-[26px] w-fit items-center rounded-[4px] border border-[#E2DFFC] bg-[#F3F4FC] px-[7px] text-[12px] font-semibold leading-[15px] text-[#0A0847]">
              {question.level}
            </span>

            <div className="flex min-w-0 flex-col gap-[18px]">
              <p className="break-words text-[14px] font-semibold leading-[18px] text-[#0A0847]">
                {question.text}
              </p>
              <ul>
                {question.options.map((option, index) => (
                  <li
                    key={option}
                    className="break-words text-[12px] font-medium leading-[22px] text-[#0A0847]/60"
                  >
                    <span className="font-bold text-[#0A0847]">{String.fromCharCode(65 + index)}.</span>{" "}
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center">
        <button type="button" className={`${actionButton} w-full sm:w-[101px]`}>
          <LuPencil size={16} aria-hidden />
          Edit
        </button>
        <button type="button" className={`${actionButton} w-full sm:w-[179px]`}>
          <LuExternalLink size={16} aria-hidden />
          Regenerate Question
        </button>
        <button type="button" className={`${actionButton} w-full sm:w-[161px]`}>
          <LuRefreshCw size={16} aria-hidden />
          Regenerate Image
        </button>
      </div>
    </article>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AIQuizGenerator() {
  const [questionType, setQuestionType] = useState("Multiple Choice");
  const [passage, setPassage] = useState("John 3:16–21");
  const [questionCount, setQuestionCount] = useState("15");
  const [difficulty, setDifficulty] = useState("Medium");
  const [levelSetup, setLevelSetup] = useState("create");
  const [levelCount, setLevelCount] = useState("3");
  const [perLevel, setPerLevel] = useState("5");
  const [levels, setLevels] = useState(LEVELS);
  const [aiImage, setAiImage] = useState(true);
  const [verseRefs, setVerseRefs] = useState(true);
  const [avoidDuplicates, setAvoidDuplicates] = useState(true);
  const [instructions, setInstructions] = useState("");
  const [selectedIds, setSelectedIds] = useState(GENERATED_QUESTIONS.map((q) => q.id));

  const allSelected = selectedIds.length === GENERATED_QUESTIONS.length;

  const toggleLevel = (id) =>
    setLevels((prev) =>
      prev.map((level) => (level.id === id ? { ...level, selected: !level.selected } : level)),
    );

  const toggleQuestion = (id, checked) =>
    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));

  const toggleAll = (checked) =>
    setSelectedIds(checked ? GENERATED_QUESTIONS.map((q) => q.id) : []);

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[#F9FAFE] font-[Inter] text-[#0A0847]">
      <div className="flex w-full min-w-0 flex-col px-4 py-6 sm:px-7">
        {/* header */}
        <Breadcrumb items={BREADCRUMBS} />

        <div className="mt-3 min-w-0">
          <h1 className="break-words text-[20px] font-semibold leading-[26px] text-[#0A0847] sm:text-[22px] sm:leading-[27px]">
            AI Quiz Generator
          </h1>
          <p className="mt-2 text-[14px] font-medium leading-[18px] text-[#0A0847]/60 sm:mt-[14px] sm:text-[16px] sm:leading-[19px]">
            Engage and track activities for each chapter.
          </p>
        </div>

        <div className="mt-5">
          <LocationChip parts={LOCATION_PARTS} />
        </div>

        {/* two columns: stacked below xl (1280px) */}
        <div className="mt-6 grid min-w-0 grid-cols-1 items-stretch gap-6 sm:mt-[30px] xl:grid-cols-[376px_minmax(0,1fr)]">
          {/* LEFT — configure */}
          <section className="flex min-w-0 flex-col gap-[14px] rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] px-4 pt-[19px] pb-[30px] sm:pr-[22px] sm:pl-[16px] sm:pb-[35px] xl:h-full">
            <h2 className="text-[16px] font-semibold leading-[20px] text-[#0A0847]">
              Configure Your Quiz
            </h2>

            <div className="flex flex-col gap-2">
              <label htmlFor="q-type" className={labelCls}>
                Question Type{requiredMark}
              </label>
              <CompactSelect
                id="q-type"
                value={questionType}
                options={QUESTION_TYPE_OPTIONS}
                onChange={(e) => setQuestionType(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="passage" className={labelCls}>
                Bible Passage{requiredMark}
              </label>
              <input
                id="passage"
                type="text"
                value={passage}
                onChange={(e) => setPassage(e.target.value)}
                className={fieldCls}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="q-count" className={labelCls}>
                Number of Questions{requiredMark}
              </label>
              <input
                id="q-count"
                type="text"
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
                className={fieldCls}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="difficulty" className={labelCls}>
                Difficulty{requiredMark}
              </label>
              <CompactSelect
                id="difficulty"
                value={difficulty}
                options={DIFFICULTY_OPTIONS}
                onChange={(e) => setDifficulty(e.target.value)}
              />
            </div>

            <ToggleRow
              title="Generate an AI Image for Every Question"
              description="Each generated question includes a unique image."
              checked={aiImage}
              onChange={setAiImage}
            />
            <Divider />

            {/* Level Setup */}
            <div className="flex flex-col gap-2">
              <p className={labelCls}>Level Setup{requiredMark}</p>
              <div className="grid grid-cols-2">
                {LEVEL_TABS.map((tab, index) => {
                  const active = levelSetup === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setLevelSetup(tab.id)}
                      className={`flex h-[33px] min-w-0 cursor-pointer items-center justify-center px-2 py-1 text-[12px] font-medium leading-[15px] transition-colors ${
                        index === 0 ? "rounded-l-[7.47px]" : "rounded-r-[7.47px]"
                      } ${
                        active
                          ? "z-10 border border-[#001984] bg-[#001984]/10 text-[#0A0847]"
                          : "border border-[#E2DFFC] bg-white text-[#0A0847]/80"
                      }`}
                    >
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex min-w-0 flex-col gap-2">
                <label htmlFor="level-count" className={labelCls}>
                  Number of Levels{requiredMark}
                </label>
                <CompactSelect
                  id="level-count"
                  value={levelCount}
                  options={LEVEL_COUNT_OPTIONS}
                  onChange={(e) => setLevelCount(e.target.value)}
                />
              </div>
              <div className="flex min-w-0 flex-col gap-2">
                <label htmlFor="per-level" className={labelCls}>
                  Questions per Level{requiredMark}
                </label>
                <CompactSelect
                  id="per-level"
                  value={perLevel}
                  options={QUESTIONS_PER_LEVEL_OPTIONS}
                  onChange={(e) => setPerLevel(e.target.value)}
                />
              </div>
            </div>

            <p className="text-[10px] italic leading-[12px] text-[#001984]">
              15 questions = 3 levels × 5 questions
            </p>
            <Divider />

            {/* Existing levels */}
            <div className="min-w-0">
              <p className="text-[12px] font-semibold leading-[15px] text-[#0A0847]">Existing Levels</p>
              <p className={`mt-1 max-w-[268px] ${helperCls}`}>
                Choose multiple levels and set the number of questions for each.
              </p>
              <div className="mt-3 grid grid-cols-5 gap-2 sm:gap-3">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => toggleLevel(level.id)}
                    className={`flex h-[28px] min-w-0 cursor-pointer items-center justify-center rounded-[6px] border px-1 text-[11px] font-semibold leading-[15px] transition-colors sm:text-[12px] ${
                      level.selected
                        ? "border-[#001984] bg-[#001984] text-white"
                        : "border-[#E2DFFC] bg-white text-[#0A0847]/80"
                    }`}
                  >
                    <span className="truncate">Level {level.id}</span>
                  </button>
                ))}
              </div>
              <div className="mt-3 min-h-[90px] w-full rounded-lg border border-[#E2DFFC] bg-[#FAF9FE] py-2 pr-3 pl-[14px]">
                {LEVEL_SUMMARY.map((line) => (
                  <p key={line} className="text-[12px] font-semibold leading-[24px] text-[#0A0847]/80">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <Divider />

            <div className="flex flex-col gap-4">
              <ToggleRow
                title="Include Verse References"
                description="Add verse references to questions and explanations."
                checked={verseRefs}
                onChange={setVerseRefs}
              />
              <ToggleRow
                title="Avoid Duplicates"
                description="Avoid exactly repeating similar questions."
                checked={avoidDuplicates}
                onChange={setAvoidDuplicates}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="ai-instructions"
                className="block text-[12px] font-semibold leading-[15px] text-[#0A0847]"
              >
                AI Instructions (Optional)
              </label>
              <p className="mt-1 text-[10px] font-medium leading-[12px] text-[#0A0847]/60">
                Add any special instructions for the AI to follow.
              </p>
              <div className="relative mt-[14px] h-[116px]">
                <textarea
                  id="ai-instructions"
                  maxLength={500}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="“e.g., Focus on application-based questions, include real-life scenarios, etc.”"
                  className="absolute inset-0 h-full w-full resize-none rounded-[7.47px] border border-[#E2DFFC] bg-white px-[15px] py-2 text-[12px] font-semibold leading-[15px] text-[#0A0847]/80 outline-none transition placeholder:font-semibold placeholder:text-[#0A0847]/60 focus:border-[#001984]"
                />
                <span className="pointer-events-none absolute right-3 bottom-2 text-[10px] italic text-[#0A0847]/60">
                  {instructions.length} / 500
                </span>
              </div>
            </div>
          </section>

          {/* RIGHT — preview */}
          <section className="flex min-w-0 flex-col rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] px-4 pt-6 pb-6 sm:pt-[29px] sm:pr-6 sm:pl-[29px]">
            <div className="min-w-0">
              <h2 className="text-[18px] font-semibold leading-[24px] text-[#0A0847] sm:text-[22px] sm:leading-[27px]">
                Generated Questions Preview
              </h2>
              <p className="mt-2 text-[14px] font-medium leading-[18px] text-[#0A0847]/60 sm:mt-3 sm:max-w-[490px] sm:text-[16px] sm:leading-[20px]">
                Review the AI generated questions below and select the ones to keep.
              </p>
            </div>

            <div className="mt-[18px] flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-[12px] font-semibold leading-[15px] text-[#0A0847]">
                <Checkbox checked={allSelected} onChange={toggleAll} label="Select all questions" />
                Select All (15)
              </label>
              <button
                type="button"
                className="flex h-[42px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#E2DFFC] bg-[#F3F7FD] px-[13px] py-3 text-[12px] font-semibold leading-[15px] text-[#0A0847] transition-colors hover:bg-[#E8EEFB] sm:w-[136px]"
              >
                <LuRefreshCw size={16} aria-hidden />
                Regenerate All
              </button>
            </div>

            <div className="mt-[10px] flex flex-col gap-6">
              {GENERATED_QUESTIONS.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  selected={selectedIds.includes(question.id)}
                  onSelect={(checked) => toggleQuestion(question.id, checked)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* bottom bar */}
        <div className="mt-8 flex w-full min-w-0 flex-col gap-4 sm:mt-10 sm:h-[48px] sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="flex h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#4B1ECB] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#3F17AD] sm:w-[309px]"
          >
            <span aria-hidden>✨</span>
            Generate Questions &amp; Images
          </button>
          <div className="grid grid-cols-1 gap-4 sm:flex sm:items-center">
            <button
              type="button"
              className="flex h-[48px] w-full cursor-pointer items-center justify-center rounded-lg border border-[#001984] bg-white text-[13px] font-semibold text-[#0A0847] transition-colors hover:bg-[#F9FAFE] sm:w-[152px]"
            >
              Save as Draft
            </button>
            <button
              type="button"
              className="flex h-[48px] w-full cursor-pointer items-center justify-center rounded-lg bg-[#4B1ECB] text-[13px] font-semibold text-white transition-colors hover:bg-[#3F17AD] sm:w-[175px]"
            >
              Publish Selected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}