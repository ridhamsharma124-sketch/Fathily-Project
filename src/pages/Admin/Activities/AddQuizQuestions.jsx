import { useState } from "react";
import { LuDownload, LuChevronDown, LuPencil } from "react-icons/lu";
import {
  FiCheckSquare,
  FiXCircle,
  FiAlignLeft,
  FiUser,
  FiExternalLink,
  FiVolume2,
} from "react-icons/fi";
import { RiListUnordered } from "react-icons/ri";
import { IoImage } from "react-icons/io5";
import { BsBarChart } from "react-icons/bs";

import selectorBookIcon from "../../../assets/activities/icon-book-purple.svg";

// 4-point concave star ka path
function starPath(cx, cy, r) {
  const k = r * 0.22;
  return `M${cx} ${cy - r} Q${cx + k} ${cy - k} ${cx + r} ${cy} Q${cx + k} ${cy + k} ${cx} ${cy + r} Q${cx - k} ${cy + k} ${cx - r} ${cy} Q${cx - k} ${cy - k} ${cx} ${cy - r}Z`;
}

function SparklesIcon({ size = 62, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 62 62"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d={starPath(20, 40, 19)} />
      <path d={starPath(44, 14, 11)} />
      <path d={starPath(48, 44, 9)} />
    </svg>
  );
}

function CsvFileIcon({ size = 62, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 62 62"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
      {...props}
    >
      {/* back page */}
      <path d="M22 8h20l10 10v32a2 2 0 0 1-2 2h-4" />
      {/* front page */}
      <path d="M12 12h20l10 10v32a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V14a2 2 0 0 1 2-2Z" />
      <path d="M32 12v10h10" />
      {/* CSV label */}
      <rect x="5" y="30" width="30" height="14" rx="2" fill="#fff" />
      <text
        x="20"
        y="41"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
        fill="currentColor"
        stroke="none"
      >
        CSV
      </text>
    </svg>
  );
}

function FillBlankIcon() {
  return <span className="text-[15px] font-bold leading-none tracking-tighter">A...</span>;
}

function FlipMatchIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="2.5" strokeDasharray="3 2.4" />
      <path d="M9 8.5 17 11.5l-3.5 1.5L12 16.5Z" />
    </svg>
  );
}

function VideoIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M10 8.5 16 12l-6 3.5Z" />
    </svg>
  );
}

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const BREADCRUMBS = ["Dashboard", "Activities", "John", "Chapter 3", "Quiz"];

const LOCATION_PARTS = ["New Testament", "John", "Chapter 3"];

const QUESTION_TYPES = [
  { id: "multiple-choice", label: "Multiple Choice", Icon: RiListUnordered },
  { id: "multiple-select", label: "Multiple Select", Icon: FiCheckSquare },
  { id: "fill-blank", label: "Fill in the Blank", Icon: FillBlankIcon },
  { id: "true-false", label: "True / False", Icon: FiXCircle },
  { id: "short-answer", label: "Short Answer", Icon: FiAlignLeft },
  { id: "image-based", label: "Image Based", Icon: IoImage },
  { id: "flip-and-match", label: "Flip And Match", Icon: FlipMatchIcon },
  { id: "who-am-i", label: "Who Am I", Icon: FiUser },
  { id: "match-following", label: "Match the Following", Icon: FiExternalLink },
  { id: "audio-quiz", label: "Audio Quiz", Icon: FiVolume2 },
  { id: "video-questions", label: "Video Questions", Icon: VideoIcon },
  { id: "instant-analytics", label: "Instant Analytics", Icon: BsBarChart },
];

/* ==========================================================================
   PRIMITIVES
   ========================================================================== */
function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] font-medium leading-[20px] text-[#0A084799] sm:text-[18px] sm:leading-[22px] sm:gap-x-2.5">
        {BREADCRUMBS.map((crumb, index) => {
          const isLast = index === BREADCRUMBS.length - 1;
          return (
            <li key={crumb} className="flex items-center gap-2 sm:gap-2.5">
              {index > 0 && <span aria-hidden>&gt;</span>}
              <span aria-current={isLast ? "page" : undefined}>{crumb}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function LocationChip() {
  return (
    <div className="flex h-auto min-h-[49px] w-full max-w-[396px] items-center gap-2.5 rounded-lg border border-[#E5E3EB] bg-[#F7F7F9] px-3 py-3 sm:pt-[13px] sm:pr-3 sm:pb-3 sm:pl-[15px]">
      <img src={selectorBookIcon} alt="" width={24} height={24} className="h-6 w-6 shrink-0" />
      <p className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[14px] font-semibold leading-6 text-[#0A0847CC] sm:gap-x-4 sm:text-[16px]">
        {LOCATION_PARTS.map((part, index) => (
          <span key={part} className="flex items-center gap-2 sm:gap-4">
            {index > 0 && <span aria-hidden>&gt;</span>}
            <span>{part}</span>
          </span>
        ))}
      </p>
    </div>
  );
}

function SectionHeader({ title, required, subtitle }) {
  return (
    <div className="flex flex-col gap-2.5 sm:gap-[14px]">
      <h2 className="text-[18px] font-semibold leading-[24px] text-[#0A0847CC] sm:text-[22px] sm:leading-[27px]">
        {title}
        {required && <span className="text-[#D4001A]"> *</span>}
      </h2>
      <p className="text-[14px] font-medium leading-[18px] text-[#0A084799] sm:text-[16px] sm:leading-[19px]">
        {subtitle}
      </p>
    </div>
  );
}

function QuestionTypeRow({ type, selected, onSelect }) {
  const { Icon } = type;
  return (
    <label className="flex min-h-[46px] cursor-pointer items-center px-4 transition-colors hover:bg-[#FAFAFE] sm:px-[18px]">
      <input
        type="radio"
        name="question-type"
        value={type.id}
        checked={selected}
        onChange={() => onSelect(type.id)}
        className="h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-[#0A0847B3] bg-white checked:border-[#001984] checked:bg-[#001984] checked:shadow-[inset_0_0_0_3px_#fff]"
      />
      <span className="ml-3 flex h-5 w-6 shrink-0 items-center justify-center text-[#0A0847] sm:ml-[14px]">
        <Icon size={18} aria-hidden />
      </span>
      <span className="ml-2 min-w-0 text-[13px] font-semibold leading-5 text-[#0A0847CC] sm:text-[14px]">
        {type.label}
      </span>
    </label>
  );
}

function MethodCard({ title, description, icon, iconColor, active, children }) {
  return (
    <div
      className={`flex min-h-[320px] flex-col items-center rounded-lg border bg-[#F9F8FD] px-5 pt-10 pb-[22px] text-center sm:pt-12 lg:h-[374px] ${
        active ? "border-[#0A54AB]" : "border-[#E4DFFA]"
      }`}
    >
      <div className="flex h-[56px] items-center justify-center sm:h-[60px]" style={{ color: iconColor }}>
        {icon}
      </div>
      <h3 className="mt-4 text-[15px] font-semibold leading-5 text-[#0A0847CC] sm:mt-5 sm:text-[16px] sm:leading-4">
        {title}
      </h3>
      <p className="mt-3 w-full max-w-[240px] text-[13px] font-medium leading-[20px] text-[#0A0847CC] sm:max-w-[200px] sm:text-[14px] sm:leading-[21px]">
        {description}
      </p>
      <div className="mt-auto flex w-full flex-col gap-3 pt-6 sm:gap-4">{children}</div>
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
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[#F8F9FE] font-[Inter] text-[#0A0847]">
      <div className="w-full min-w-0 max-w-[1067px] px-4 py-6 sm:px-5">
        <Breadcrumb />

        <div className="mt-2.5 flex flex-col gap-2.5 sm:gap-[15px]">
          <h1 className="text-[20px] font-semibold leading-[26px] text-[#0A0847] sm:text-[22px] sm:leading-[27px]">
            Add Quiz Questions
          </h1>
          <p className="text-[14px] font-medium leading-[18px] text-[#0A084799] sm:text-[16px] sm:leading-[19px]">
            Engage and track activities for each chapter.
          </p>
        </div>

        <div className="mt-5">
          <LocationChip />
        </div>

        {/* section 1 */}
        <section className="mt-5 min-w-0 rounded-lg border border-[#E2DFFC] bg-white px-4 py-6 sm:px-[33px] sm:py-[29px]">
          <SectionHeader
            title="1. Choose Question Type"
            required
            subtitle="Engage and track activities for each chapter."
          />

          <div className="mt-6 w-full min-w-0 sm:mt-9 sm:w-[540px] sm:max-w-full">
            <div className="relative flex h-[39px] w-full items-center rounded-lg border border-[#0A0847] bg-white pl-[16px] sm:pl-[23px]">
              <span
                className={`truncate text-[13px] font-medium sm:text-[14px] ${
                  selectedType ? "text-[#0A0847CC]" : "text-[#0A084799]"
                }`}
              >
                {selectedType ? selectedType.label : "Select Question Type"}
              </span>
              <LuChevronDown
                size={14}
                aria-hidden
                className="pointer-events-none absolute top-1/2 right-[14px] -translate-y-1/2 text-[#0A0847] sm:right-[19px]"
              />
            </div>

            <div className="mt-0.5 overflow-hidden rounded-lg border border-[#E2DFFC] bg-white pt-2.5 pb-[13px]">
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
        <section className="mt-6 min-w-0 rounded-lg border border-[#E2DFFC] bg-white px-4 py-6 sm:px-[33px] sm:py-[29px]">
          <SectionHeader
            title="2. Choose How to Add Questions"
            subtitle="You can add questions manually, upload from a file, or generate with AI."
          />

          <div className="mt-6 grid grid-cols-1 gap-5 sm:mt-10 sm:gap-[25px] lg:grid-cols-3">
            <MethodCard
              title="AI Generation"
              description="Generate questions automatically using AI assistant"
              icon={<SparklesIcon size={56} />}
              iconColor="#4B1ECB"
            >
              <button
                type="button"
                className="h-[44px] w-full cursor-pointer rounded-lg bg-[#4B1ECB] text-[14px] font-semibold text-white transition-colors hover:bg-[#3F17AD] sm:h-[47px]"
              >
                Run AI Generate ✨
              </button>
            </MethodCard>

            <MethodCard
              title="Manual or File Upload"
              description="Add questions manually or upload questions from a file"
              icon={<LuPencil size={44} strokeWidth={1.6} aria-hidden />}
              iconColor="#189227"
            >
              <button
                type="button"
                className="h-[44px] w-full cursor-pointer rounded-lg bg-[#189227] text-[14px] font-semibold text-white transition-colors hover:bg-[#137A20] sm:h-[47px]"
              >
                Add Manually
              </button>
            </MethodCard>

            <MethodCard
              title="Bulk Upload (CSV)"
              description="Upload a CSV file with your quiz questions"
              icon={<CsvFileIcon size={58} />}
              iconColor="#0A54AB"
              active
            >
              <button
                type="button"
                className="flex h-[42px] w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-[#0A54AB] bg-white text-[14px] font-semibold text-[#0A54AB] transition-colors hover:bg-[#0A54AB]/5"
              >
                <LuDownload size={12} aria-hidden />
                Download Template
              </button>
              <button
                type="button"
                className="flex h-[42px] w-full cursor-pointer items-center justify-center rounded-lg border border-[#0A54AB] bg-white text-[14px] font-semibold text-[#0A54AB] transition-colors hover:bg-[#0A54AB]/5"
              >
                Upload CSV
              </button>
            </MethodCard>
          </div>
        </section>
      </div>
    </div>
  );
}