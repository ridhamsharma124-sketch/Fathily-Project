import { useState } from "react";
import level1Image from "../../../assets/level1.png";
import level2Image from "../../../assets/level2.png";
import level3Image from "../../../assets/level3.png";
import {
  LuPencil,
  LuExternalLink,
  LuRefreshCw,
  LuSave,
  LuSparkles,
  LuChevronDown,
} from "react-icons/lu";
import { Breadcrumb, LocationChip, Toggle } from "./quizShared";

/* ==========================================================================
   MOCK DATA — hardcoded exactly as specified
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
   PAGE-LOCAL STYLES (kept here so the shared quizShared.jsx is untouched)
   ========================================================================== */
const labelCls = "mb-1.5 block text-[12px] font-semibold text-[#0A0847]";

const inputCls =
  "h-10 w-full rounded-lg border border-[#E5E4EC] bg-white px-3 text-[13px] text-[#0A0847] outline-none transition placeholder:text-[#0A084799] focus:border-[#041581]";

/* soft pill button — Regenerate All / Edit / Regenerate Question / Regenerate Image */
const softButton =
  "flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-[#E2DFFC] bg-[#F1F1F9] px-3 text-[13px] font-semibold text-[#0A0847] transition-colors hover:bg-[#E8E8F3]";

/* bottom action row */
const purpleButton =
  "flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#4C1DD6] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#4318B8]";

const outlineButton =
  "flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#0A0847] bg-white px-5 text-[13px] font-semibold text-[#0A0847] transition-colors hover:bg-[#F1F1F9]";

/* ==========================================================================
   SUB-COMPONENTS
   ========================================================================== */
function Panel({ title, subtitle, children, bodyClassName = "" }) {
  return (
    <section className="rounded-xl border border-[#E2DFFC] bg-white">
      <div className="px-5 py-4">
        {title && (
          <h2 className="text-[20px] font-bold text-[#0A0847]">{title}</h2>
        )}
        {subtitle && (
          <p className="mt-1 text-[12px] text-[#0A084799]">{subtitle}</p>
        )}
        <div className={bodyClassName}>{children}</div>
      </div>
    </section>
  );
}

function CompactSelect({ id, value, options, onChange }) {
  return (
    <div className="relative w-full">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`${inputCls} cursor-pointer appearance-none pr-9`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <LuChevronDown
        size={15}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#0A084799]"
        aria-hidden
      />
    </div>
  );
}

function ToggleRow({ title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-[13px] font-bold text-[#0A0847]">{title}</p>
        <p className="mt-0.5 text-[11px] text-[#0A084799]">{description}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  );
}

function QuestionCard({ question }) {
  return (
    <article className="rounded-lg border border-[#E2DFFC] bg-[#FEFEFF] p-4">
      <div className="flex gap-[31px]">
        {/* column 1 — portrait image with checkbox over its top-left corner */}
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
            className="absolute left-2 top-2 h-[18px] w-[18px] cursor-pointer rounded border-[#E5E4EC] accent-[#0A0847]"
          />
        </div>

        {/* column 2 — badge, title, options */}
        <div className="min-w-0 flex-1">
          <span className="inline-block rounded-md bg-[#F1F1F9] px-2 py-0.5 text-[11px] font-semibold text-[#0A0847]">
            {question.level}
          </span>
          <p className="mt-2 line-clamp-2 text-[14px] font-semibold text-[#0A0847]">
            {question.text}
          </p>
          <ul className="mt-2.5">
            {question.options.map((option, index) => (
              <li
                key={option}
                className="text-[12px] leading-5 text-[#0A084799]"
              >
                <span className="font-bold text-[#0A0847]">
                  {String.fromCharCode(65 + index)}.
                </span>{" "}
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* buttons — full width under image + text */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className={softButton}>
          <LuPencil size={14} />
          Edit
        </button>
        <button type="button" className={softButton}>
          <LuExternalLink size={14} />
          Regenerate Question
        </button>
        <button type="button" className={softButton}>
          <LuRefreshCw size={14} />
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
      <div className="mx-auto max-w-[1200px] space-y-5 px-5 py-6">
        <Breadcrumb
          items={["Bible Content", "Articles", "John", "Chapter 3", "Quiz"]}
        />

        <div>
          <h1 className="text-[22px] font-bold text-[#0A0847]">AI Quiz Generator</h1>
          <p className="mt-[6px] text-[14px] text-[#0A084799]">
            Engage and track activities for each chapter.
          </p>
        </div>

        <LocationChip />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[40fr_60fr]">
          {/* LEFT — configure */}
          <Panel title="Configure Your Quiz" bodyClassName="mt-4 space-y-3">
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
                className={inputCls}
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
                className={inputCls}
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

            {/* AI image toggle — plain row, no box */}
            <ToggleRow
              title="Generate an AI Image for Every Question"
              description="Each generated question includes a unique image."
              checked={aiImage}
              onChange={setAiImage}
            />

            {/* Level Setup — one joined segmented control */}
            <div>
              <p className={labelCls}>
                Level Setup <span className="text-[#E11D48]">*</span>
              </p>
              <div className="flex overflow-hidden rounded-lg border border-[#E5E4EC]">
                {LEVEL_TABS.map((tab, index) => {
                  const active = levelSetup === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setLevelSetup(tab.id)}
                      className={`flex-1 cursor-pointer px-2 py-2 text-[12px] font-semibold transition-colors ${
                        index === 0 ? "border-r border-[#E5E4EC]" : ""
                      } ${
                        active
                          ? "border-[#041581] bg-[#E4E7F0] text-[#0A0847] shadow-[inset_0_0_0_1px_#041581]"
                          : "bg-white text-[#0A0847]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Level counts */}
            <div className="grid grid-cols-2 gap-3">
              <div>
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
              <div>
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

            <p className="text-[12px] italic text-[#041581]">
              15 questions = 3 levels × 5 questions
            </p>

            {/* Existing levels */}
            <div>
              <p className="text-[13px] font-bold text-[#0A0847]">Existing Levels</p>
              <p className="mt-0.5 text-[11px] text-[#0A084799]">
                Choose multiple levels and set the number of questions for each.
              </p>
              <div className="mt-2.5 flex flex-nowrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => toggleLevel(level.id)}
                    className={`cursor-pointer whitespace-nowrap rounded-md border px-3 py-1.5 text-[12px] font-medium transition-colors ${
                      level.selected
                        ? "border-[#041581] bg-[#041581] text-white"
                        : "border-[#E5E4EC] bg-white text-[#0A0847]"
                    }`}
                  >
                    Level {level.id}
                  </button>
                ))}
              </div>
              <div className="mt-2.5 rounded-lg bg-[#F3F4F8] px-[14px] py-3 text-[12px] leading-[1.6] text-[#0A0847]">
                {LEVEL_SUMMARY.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>

            {/* Verse refs + duplicates — plain rows with 1px separators */}
            <div className="divide-y divide-[#E5E4EC] border-t border-[#E5E4EC]">
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

            {/* AI instructions — counter inside the textarea */}
            <div>
              <label htmlFor="ai-instructions" className={labelCls}>
                AI Instructions (Optional)
              </label>
              <p className="mb-1.5 text-[11px] text-[#0A084799]">
                Add any special instructions for the AI to follow.
              </p>
              <div className="relative">
                <textarea
                  id="ai-instructions"
                  rows={4}
                  maxLength={500}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g., Focus on application-based questions, include real-life scenarios, etc."
                  className="w-full resize-none rounded-lg border border-[#E5E4EC] bg-white px-3 py-2.5 pb-7 text-[13px] leading-relaxed text-[#0A0847] outline-none transition placeholder:text-[#0A084799] focus:border-[#041581]"
                />
                <span className="absolute bottom-2 right-3 text-[11px] text-[#0A084799]">
                  {instructions.length} / 500
                </span>
              </div>
            </div>
          </Panel>

          {/* RIGHT — preview */}
          <Panel
            title="Generated Questions Preview"
            subtitle="Review the AI generated questions below and select the ones to keep."
            bodyClassName="mt-4 space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2.5 text-[13px] font-semibold text-[#0A0847]">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-[18px] w-[18px] cursor-pointer rounded border-[#E5E4EC] accent-[#0A0847]"
                />
                Select All (15)
              </label>
              <button type="button" className={softButton}>
                <LuRefreshCw size={14} />
                Regenerate All
              </button>
            </div>

            {GENERATED_QUESTIONS.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </Panel>
        </div>

        {/* BOTTOM ACTION ROW — full width, below both cards */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button type="button" className={purpleButton}>
            <LuSparkles size={15} />
            Generate Questions &amp; Images
          </button>
          <div className="flex flex-wrap gap-3">
            <button type="button" className={outlineButton}>
              <LuSave size={15} />
              Save as Draft
            </button>
            <button type="button" className={purpleButton}>
              Publish Selected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
