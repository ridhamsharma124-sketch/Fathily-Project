import { useState } from "react";
import level1Image from "../../../assets/level1.png";
import level2Image from "../../../assets/level2.png";
import level3Image from "../../../assets/level3.png";
import {
  LuPencil,
  LuExternalLink,
  LuRefreshCw,
  LuSparkles,
  LuChevronDown,
  LuBookOpen,
  LuChevronRight,
} from "react-icons/lu";

/* ==========================================================================
   MOCK DATA — hardcoded exactly as specified (unchanged)
   ========================================================================== */
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

/* ==========================================================================
   PAGE-LOCAL PRIMITIVES (quizShared.jsx left untouched for other pages)
   ========================================================================== */
const labelCls = "mb-2 block text-[12px] font-semibold text-[#0A0847]";

const fieldCls =
  "h-10 w-full rounded-[7.47px] border border-[#E2DFFC] bg-white py-[10px] pl-[12px] pr-[50px] text-[12px] font-medium text-[#0A0847]/80 outline-none transition focus:border-[#001984]";

const helperCls = "text-[10px] font-medium leading-[13px] text-[#0A0847]/60";

/* soft action button inside question cards */
const actionButton =
  "flex h-[38px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#9CAFF4] bg-[#001984]/5 px-3 text-[13px] font-medium text-[#001984] transition-colors hover:bg-[#001984]/10";

function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[16px] font-medium text-[#0A0847]/60">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item} className="flex items-center gap-1.5">
              {index > 0 && (
                <LuChevronRight size={14} className="text-[#0A0847]/60" aria-hidden />
              )}
              <span aria-current={isLast ? "page" : undefined}>{item}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function LocationChip({ parts = ["New Testament", "John", "Chapter 3"] }) {
  return (
    <div className="inline-flex w-fit items-center gap-[10px] self-start rounded-lg border border-[#E2DFFC] bg-[#F7F7F9] pt-[13px] pr-[12px] pb-[12px] pl-[15px]">
      <LuBookOpen size={16} className="shrink-0 text-[#5B0FEE]" aria-hidden />
      <p className="text-[13px] leading-[22px]">
        {parts.map((part, index) => (
          <span key={part}>
            {index > 0 && <span className="px-1.5 text-[#0A0847]/60">&gt;</span>}
            <span className="font-bold text-[#0A0847]">{part}</span>
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
      className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-[#001984]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`absolute top-[3px] h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
          checked ? "left-[25px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}

function CompactSelect({ id, value, options, onChange }) {
  return (
    <div className="relative w-full">
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
      <LuChevronDown
        size={15}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0A0847]/60"
        aria-hidden
      />
    </div>
  );
}

function ToggleRow({ title, description, checked, onChange }) {
  return (
    <div className="flex h-[32px] items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-[12px] leading-[15px] font-semibold text-[#0A0847]">{title}</p>
        <p className={`mt-[2px] ${helperCls}`}>{description}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  );
}

function QuestionCard({ question }) {
  return (
    <article className="flex min-w-0 flex-col gap-[10px] rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] pt-[19px] pr-[13px] pb-[20px] pl-[13px]">
      <div className="flex gap-[31px]">
        {/* image with checkbox at its top-left corner */}
        <div className="relative shrink-0">
          <img
            src={LEVEL_IMAGES[question.level]}
            alt={`${question.level} illustration`}
            width={194}
            height={229}
            className="h-[229px] w-[194px] rounded-lg border border-[#E2DFFC] object-cover"
          />
          <input
            type="checkbox"
            defaultChecked
            aria-label={`Select question ${question.id}`}
            className="absolute left-2 top-2 h-[18px] w-[18px] cursor-pointer rounded border border-[#E2DFFC] accent-[#0A0847]"
          />
        </div>

        {/* right column — tag, question, options */}
        <div className="flex min-w-0 flex-1 flex-col gap-[10px]">
          <span className="inline-flex h-[25px] w-fit items-center rounded-[4px] bg-[#001984]/5 px-2 text-[12px] font-medium text-[#001984]">
            {question.level}
          </span>
          <p className="max-w-[260px] text-[14px] leading-[30px] font-semibold text-[#0A0847]">
            {question.text}
          </p>
          <ul>
            {question.options.map((option, index) => (
              <li
                key={option}
                className="text-[14px] leading-[24px] font-medium text-[#0A0847]/60"
              >
                <span className="font-bold">{String.fromCharCode(65 + index)}.</span>{" "}
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* action buttons row */}
      <div className="flex flex-wrap items-center gap-2 p-[12px]">
        <button type="button" className={actionButton}>
          <LuPencil size={15} />
          Edit
        </button>
        <button type="button" className={`${actionButton} w-[179px]`}>
          <LuExternalLink size={15} />
          Regenerate Question
        </button>
        <button type="button" className={actionButton}>
          <LuRefreshCw size={15} />
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
  const [passage, setPassage] = useState("John 3:16-21");
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

  const toggleLevel = (id) =>
    setLevels((prev) =>
      prev.map((level) =>
        level.id === id ? { ...level, selected: !level.selected } : level,
      ),
    );

  return (
    <div className="min-h-screen bg-[#F9FAFE] font-[Inter] text-[#0A0847]">
      {/* ONE container — width 100%, every section a direct child */}
      <div className="flex w-full min-w-0 flex-col gap-6 px-6 py-6">
        <Breadcrumb
          items={["Bible Content", "Articles", "John", "Chapter 3", "Quiz"]}
        />

        <div className="w-full min-w-0">
          <h1 className="text-[22px] font-semibold text-[#0A0847]">AI Quiz Generator</h1>
          <p className="mt-1.5 text-[14px] font-medium text-[#0A0847]/60">
            Engage and track activities for each chapter.
          </p>
        </div>

        <LocationChip />

        {/* two columns — 376px fixed left, rest right, top-aligned */}
        <div className="grid grid-cols-[376px_minmax(0,1fr)] items-start gap-6">
          {/* LEFT — configure */}
          <section className="flex min-w-0 flex-col gap-[10px] rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] pt-[19px] pr-[22px] pb-[35px] pl-[16px]">
            <h2 className="text-[16px] font-semibold text-[#0A0847]">Configure Your Quiz</h2>

            {/* Question Type */}
            <div>
              <label htmlFor="q-type" className={labelCls}>
                Question Type <span className="text-[#E11D48]">*</span>
              </label>
              <CompactSelect
                id="q-type"
                value={questionType}
                options={QUESTION_TYPE_OPTIONS}
                onChange={(e) => setQuestionType(e.target.value)}
              />
            </div>

            {/* Bible Passage */}
            <div>
              <label htmlFor="passage" className={labelCls}>
                Bible Passage <span className="text-[#E11D48]">*</span>
              </label>
              <input
                id="passage"
                type="text"
                value={passage}
                onChange={(e) => setPassage(e.target.value)}
                className={fieldCls}
              />
            </div>

            {/* Number of Questions */}
            <div>
              <label htmlFor="q-count" className={labelCls}>
                Number of Questions <span className="text-[#E11D48]">*</span>
              </label>
              <input
                id="q-count"
                type="text"
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
                className={fieldCls}
              />
            </div>

            {/* Difficulty */}
            <div>
              <label htmlFor="difficulty" className={labelCls}>
                Difficulty <span className="text-[#E11D48]">*</span>
              </label>
              <CompactSelect
                id="difficulty"
                value={difficulty}
                options={DIFFICULTY_OPTIONS}
                onChange={(e) => setDifficulty(e.target.value)}
              />
            </div>

            {/* AI image toggle + divider below */}
            <ToggleRow
              title="Generate an AI Image for Every Question"
              description="Each generated question includes a unique image."
              checked={aiImage}
              onChange={setAiImage}
            />
            <div className="h-px w-full bg-[#0A0847]/10" />

            {/* Level Setup */}
            <div>
              <p className={labelCls}>
                Level Setup <span className="text-[#E11D48]">*</span>
              </p>
              <div className="flex">
                {LEVEL_TABS.map((tab, index) => {
                  const active = levelSetup === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setLevelSetup(tab.id)}
                      className={`flex h-[33px] cursor-pointer items-center justify-center px-2 py-1 text-[12px] font-medium transition-colors ${
                        index === 0
                          ? "-ml-px w-[169px] rounded-l-[7.47px]"
                          : "w-[172px] rounded-r-[7.47px]"
                      } ${
                        active
                          ? "border border-[#001984] bg-[#001984]/10 text-[#001984]"
                          : "border border-[#E2DFFC] bg-white text-[#0A0847]/80"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Level counts */}
            <div className="flex gap-[29px]">
              <div className="min-w-0 flex-1">
                <label htmlFor="level-count" className={labelCls}>
                  Number of Levels <span className="text-[#E11D48]">*</span>
                </label>
                <CompactSelect
                  id="level-count"
                  value={levelCount}
                  options={LEVEL_COUNT_OPTIONS}
                  onChange={(e) => setLevelCount(e.target.value)}
                />
              </div>
              <div className="min-w-0 flex-1">
                <label htmlFor="per-level" className={labelCls}>
                  Questions per Level <span className="text-[#E11D48]">*</span>
                </label>
                <CompactSelect
                  id="per-level"
                  value={perLevel}
                  options={QUESTIONS_PER_LEVEL_OPTIONS}
                  onChange={(e) => setPerLevel(e.target.value)}
                />
              </div>
            </div>

            <p className="text-[10px] italic text-[#001984]">
              15 questions = 3 levels x 5 questions
            </p>

            {/* Existing levels */}
            <div>
              <p className="text-[12px] font-semibold text-[#0A0847]">Existing Levels</p>
              <p className="mt-1 text-[10px] text-[#0A0847]/60">
                Choose multiple levels and set the number of questions for each.
              </p>
              <div className="mt-3 flex gap-2">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => toggleLevel(level.id)}
                    className={`flex h-[28px] w-[58px] cursor-pointer items-center justify-center rounded-[6px] border text-[12px] font-semibold transition-colors ${
                      level.selected
                        ? "border-[#001984] bg-[#001984] text-white"
                        : "border-[#E2DFFC] bg-white text-[#0A0847]"
                    }`}
                  >
                    Level {level.id}
                  </button>
                ))}
              </div>
              <div className="mt-3 h-[90px] w-full rounded-lg border border-[#E2DFFC] bg-[#FAFBFE] px-[14px] py-2">
                {LEVEL_SUMMARY.map((line) => (
                  <p key={line} className="text-[12px] leading-[24px] font-medium text-[#0A0847]">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Verse refs + duplicates */}
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

            {/* AI instructions */}
            <div>
              <label htmlFor="ai-instructions" className="block text-[12px] font-semibold text-[#0A0847]">
                AI Instructions (Optional)
              </label>
              <p className="mt-1 text-[10px] text-[#0A0847]/60">
                Add any special instructions for the AI to follow.
              </p>
              <div className="relative mt-2">
                <textarea
                  id="ai-instructions"
                  maxLength={500}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g., Focus on application-based questions, include real-life scenarios, etc."
                  className="h-[116px] w-full resize-none rounded-[7.47px] border border-[#E2DFFC] bg-white px-3 py-[10px] text-[12px] font-medium text-[#0A0847]/80 outline-none transition placeholder:text-[#0A0847]/60 focus:border-[#001984]"
                />
                <span className="absolute right-3 bottom-2 text-[10px] text-[#0A0847]/60">
                  {instructions.length} / 500
                </span>
              </div>
            </div>
          </section>

          {/* RIGHT — preview */}
          <section className="flex min-w-0 flex-col gap-4 rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] p-6">
            <div className="min-w-0">
              <h2 className="text-[20px] font-semibold text-[#0A0847]">
                Generated Questions Preview
              </h2>
              <p className="mt-1 text-[14px] text-[#0A0847]/60">
                Review the AI generated questions below and select the ones to keep.
              </p>
            </div>

            {/* select-all row — height 42 */}
            <div className="flex h-[42px] items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2.5 text-[13px] font-semibold text-[#0A0847]">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-[18px] w-[18px] cursor-pointer rounded border border-[#E2DFFC] accent-[#0A0847]"
                />
                Select All (15)
              </label>
              <button
                type="button"
                className="flex h-[42px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#E2DFFC] bg-white px-4 text-[13px] font-medium text-[#001984] transition-colors hover:bg-[#F9FAFE]"
              >
                <LuRefreshCw size={15} />
                Regenerate All
              </button>
            </div>

            {/* question stack — gap 24 */}
            <div className="flex flex-col gap-6">
              {GENERATED_QUESTIONS.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          </section>
        </div>

        {/* BOTTOM BAR — full width, height 48, space-between */}
        <div className="flex h-[48px] w-full min-w-0 items-center justify-between gap-4">
          <button
            type="button"
            className="flex h-[48px] cursor-pointer items-center gap-2 rounded-lg bg-[#4022D1] px-4 py-[10px] text-[13px] font-semibold text-white transition-colors hover:opacity-90"
          >
            <LuSparkles size={16} />
            Generate Questions &amp; Images
          </button>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex h-[48px] cursor-pointer items-center justify-center rounded-lg border border-[#001984] bg-white px-4 text-[13px] font-semibold text-[#0A0847] transition-colors hover:bg-[#F9FAFE]"
            >
              Save as Draft
            </button>
            <button
              type="button"
              className="flex h-[48px] cursor-pointer items-center justify-center rounded-lg bg-[#4022D1] px-4 text-[13px] font-semibold text-white transition-colors hover:opacity-90"
            >
              Publish Selected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
