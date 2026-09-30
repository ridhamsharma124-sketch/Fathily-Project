import { useState } from "react";
import {
  LuBookOpen,
  LuChevronRight,
  LuChevronDown,
  LuList,
  LuSquareCheck,
  LuCaseUpper,
  LuCircleX,
  LuAlignLeft,
  LuImage,
  LuRepeat2,
  LuUser,
  LuShuffle,
  LuSpeaker,
  LuCirclePlay,
  LuChartColumn,
  LuSparkles,
  LuPencilLine,
  LuFileSpreadsheet,
  LuDownload,
  LuUpload,
} from "react-icons/lu";

/* ==========================================================================
   MOCK DATA — hardcoded exactly as specified
   ========================================================================== */
const BREADCRUMBS = ["Dashboard", "Activities", "John", "Chapter 3", "Quiz"];

const LOCATION_PARTS = ["New Testament", "John", "Chapter 3"];

const QUESTION_TYPES = [
  { id: "multiple-choice", label: "Multiple Choice", Glyph: LuList },
  { id: "multiple-select", label: "Multiple Select", Glyph: LuSquareCheck },
  { id: "fill-blank", label: "Fill in the Blank", Glyph: LuCaseUpper },
  { id: "true-false", label: "True / False", Glyph: LuCircleX },
  { id: "short-answer", label: "Short Answer", Glyph: LuAlignLeft },
  { id: "image-based", label: "Image Based", Glyph: LuImage },
  { id: "flip-and-match", label: "Flip And Match", Glyph: LuRepeat2 },
  { id: "who-am-i", label: "Who Am I", Glyph: LuUser },
  { id: "match-following", label: "Match the Following", Glyph: LuShuffle },
  { id: "audio-quiz", label: "Audio Quiz", Glyph: LuSpeaker },
  { id: "video-questions", label: "Video Questions", Glyph: LuCirclePlay },
  { id: "instant-analytics", label: "Instant Analytics", Glyph: LuChartColumn },
];

/* ==========================================================================
   PRIMITIVES
   ========================================================================== */
function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-[#0A084799]">
        {BREADCRUMBS.map((crumb, index) => {
          const isLast = index === BREADCRUMBS.length - 1;
          return (
            <li key={crumb} className="flex items-center gap-1.5">
              {index > 0 && (
                <LuChevronRight size={13} className="text-[#0A084766]" aria-hidden />
              )}
              <span
                aria-current={isLast ? "page" : undefined}
                className={isLast ? "font-bold text-[#0A0847]" : undefined}
              >
                {crumb}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function LocationChip() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-lg bg-[#F3F3F7] px-4 py-2.5">
      <LuBookOpen size={16} className="shrink-0 text-[#5B0FEE]" aria-hidden />
      <p className="text-[13px]">
        {LOCATION_PARTS.map((part, index) => (
          <span key={part}>
            {index > 0 && (
              <span className="px-1.5 text-[#0A084766]">&gt;</span>
            )}
            <span className="font-bold text-[#0A0847]">{part}</span>
          </span>
        ))}
      </p>
    </div>
  );
}

function QuestionTypeRow({ type, selected, onSelect }) {
  const { Glyph } = type;
  return (
    <label
      className="flex cursor-pointer items-center gap-3 px-4 py-2.5 transition-colors hover:bg-[#FAFAFE]"
    >
      <input
        type="radio"
        name="question-type"
        value={type.id}
        checked={selected}
        onChange={() => onSelect(type.id)}
        className="h-[18px] w-[18px] shrink-0 cursor-pointer accent-[#041581]"
      />
      <Glyph size={17} className="shrink-0 text-[#041581]" aria-hidden />
      <span
        className={`text-[13px] text-[#041581] ${
          selected ? "font-semibold" : ""
        }`}
      >
        {type.label}
      </span>
    </label>
  );
}

function MethodCard({ title, description, Glyph, iconColor, children, active }) {
  return (
    <div
      className={`flex flex-col items-center rounded-xl border bg-white p-6 text-center ${
        active ? "border-2 border-[#2563EB]" : "border-[#E5E4EC]"
      }`}
    >
      <Glyph size={30} style={{ color: iconColor }} aria-hidden />
      <h3 className="mt-3 text-[16px] font-bold text-[#0A0847]">{title}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-[#0A084799]">
        {description}
      </p>
      <div className="mt-5 flex w-full flex-col gap-2.5">{children}</div>
    </div>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AddQuizQuestions() {
  const [questionType, setQuestionType] = useState("multiple-choice");
  const selectedType = QUESTION_TYPES.find((type) => type.id === questionType);

  return (
    <div className="min-h-screen bg-[#F9FAFE] font-[Inter] text-[#0A0847]">
      <div className="mx-auto max-w-[1200px] space-y-6 px-5 py-6">
        <Breadcrumb />

        {/* header */}
        <div>
          <h1 className="text-[22px] font-bold text-[#0A0847]">
            Add Quiz Questions
          </h1>
          <p className="mt-[6px] text-[14px] text-[#0A084799]">
            Engage and track activities for each chapter.
          </p>
        </div>

        <LocationChip />

        {/* section 1 */}
        <section className="rounded-xl border border-[#E5E4EC] bg-white p-6">
          <h2 className="text-[17px] font-bold text-[#0A0847]">
            1. Choose Question Type <span className="text-[#E11D48]">*</span>
          </h2>
          <p className="mt-[6px] text-[13.5px] text-[#0A084799]">
            Engage and track activities for each chapter.
          </p>

          <div className="mt-4 w-full bg-white sm:max-w-[340px]">
            <div className="relative flex h-11 w-full items-center rounded-lg border border-[#041581] bg-white pr-10 pl-4">
              <span
                className={`text-[13px] ${
                  selectedType ? "text-[#0A0847]" : "text-[#0A084799]"
                }`}
              >
                {selectedType ? selectedType.label : "Select Question Type"}
              </span>
              <LuChevronDown
                size={16}
                className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#0A0847CC]"
                aria-hidden
              />
            </div>

            <div className="mt-1 overflow-hidden rounded-xl border border-[#E5E4EC] bg-white py-1">
              {QUESTION_TYPES.map((type) => (
                <QuestionTypeRow
                  key={type.id}
                  type={type}
                  selected={questionType === type.id}
                  onSelect={setQuestionType}
                />
              ))}
            </div>
          </div>
        </section>

        {/* section 2 */}
        <section>
          <h2 className="text-[17px] font-bold text-[#0A0847]">
            2. Choose How to Add Questions
          </h2>
          <p className="mt-[6px] text-[13.5px] text-[#0A084799]">
            You can add questions manually, upload from a file, or generate
            with AI.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <MethodCard
              title="AI Generation"
              description="Generate questions automatically using AI assistant"
              Glyph={LuSparkles}
              iconColor="#7C3AED"
            >
              <button
                type="button"
                className="h-10 w-full cursor-pointer rounded-lg bg-[#6D28D9] text-[13px] font-semibold text-white transition-colors hover:bg-[#5B21B6]"
              >
                Run AI Generate ✨
              </button>
            </MethodCard>

            <MethodCard
              title="Manual or File Upload"
              description="Add questions manually or upload questions from a file"
              Glyph={LuPencilLine}
              iconColor="#16A34A"
            >
              <button
                type="button"
                className="h-10 w-full cursor-pointer rounded-lg bg-[#16A34A] text-[13px] font-semibold text-white transition-colors hover:bg-[#15803D]"
              >
                Add Manually
              </button>
            </MethodCard>

            <MethodCard
              title="Bulk Upload (CSV)"
              description="Upload a CSV file with your quiz questions"
              Glyph={LuFileSpreadsheet}
              iconColor="#2563EB"
              active
            >
              <button
                type="button"
                className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#2563EB] bg-white text-[13px] font-semibold text-[#2563EB] transition-colors hover:bg-[#2563EB]/5"
              >
                <LuDownload size={15} />
                Download Template
              </button>
              <button
                type="button"
                className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#2563EB] bg-white text-[13px] font-semibold text-[#2563EB] transition-colors hover:bg-[#2563EB]/5"
              >
                <LuUpload size={15} />
                Upload CSV
              </button>
            </MethodCard>
          </div>
        </section>
      </div>
    </div>
  );
}
