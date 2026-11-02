import { useState } from "react";
import liveQuestionImage from "../../../assets/activities/live question img.webp";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import selectorBookIcon from "../../../assets/activities/icon-book-purple.svg";

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const QUESTION_TYPE_OPTIONS = ["Multiple Choice"];
const DIFFICULTY_OPTIONS = ["Medium", "Easy", "Hard"];
/* NOTE: the spec lists the Reward Points select value as "John 3:1–21".
   Implemented verbatim; it looks like a copy-paste slip in the spec. */
const REWARD_POINT_OPTIONS = ["John 3:1–21", "10", "20", "50", "100"];
const STATUS_OPTIONS = ["Active", "Inactive"];

const OPTION_DEFAULTS = [
  { key: "a", label: "Option (A)", value: "How to perform miracles" },
  { key: "b", label: "Option (B)", value: "How to be born again" },
  { key: "c", label: "Option (C)", value: "How to become a disciple" },
  { key: "d", label: "Option (D)", value: "How to teach the law" },
];

const CORRECT_ANSWER_OPTIONS = [
  "Option A – How to perform miracles",
  "Option B – How to be born again",
  "Option C – How to become a disciple",
  "Option D – How to teach the law",
];

const REFERENCE = "John 3:1–21";

/* ==========================================================================
   PAGE-LOCAL STYLES
   ========================================================================== */
const labelCls = "mb-2 block text-[12px] font-semibold text-[#0A0847]";

const fieldCls =
  "h-10 w-full min-w-0 rounded-[7.47px] border border-[#E2DFFC] bg-white py-[10px] pl-[12px] pr-[40px] text-[12px] font-medium text-[#0A0847]/80 outline-none transition focus:border-[#001984]";

const outlineButton =
  "flex h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#001984] bg-white px-4 text-[13px] font-semibold text-[#0A0847] transition-colors hover:bg-[#F1F1F9] sm:w-auto";

const purpleButton =
  "flex h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#4022D1] px-4 py-[10px] text-[13px] font-semibold text-white transition-colors hover:opacity-90 sm:w-[174px]";

/* ==========================================================================
   SUB-COMPONENTS
   ========================================================================== */
function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] font-medium text-[#0A0847]/60 sm:text-[16px]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item} className="flex min-w-0 items-center gap-1.5">
              {index > 0 && (
                <LuChevronRight size={14} className="shrink-0 text-[#0A0847]/60" aria-hidden />
              )}
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
    <div className="flex w-fit max-w-full items-center gap-[10px] rounded-[8px] border border-[#E2DFFC] bg-[#F7F7F9] px-3 py-3 sm:min-h-[49px] sm:w-[396px] sm:pt-[13px] sm:pr-[12px] sm:pb-[12px] sm:pl-[15px]">
      <img src={selectorBookIcon} alt="" width={24} height={24} className="h-6 w-6 shrink-0 object-contain" />
      <p className="flex min-w-0 flex-wrap items-center gap-x-[16px] gap-y-1 text-[14px] font-semibold leading-6 text-[#0A0847]/80 sm:text-[16px]">
        {parts.map((part, index) => (
          <span key={part} className="flex items-center gap-[16px] whitespace-nowrap">
            {index > 0 && <span aria-hidden>&gt;</span>}
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
      <label htmlFor={htmlFor} className={labelCls}>
        {label} {required && <span className="text-[#E11D48]">*</span>}
      </label>
      {children}
    </div>
  );
}

function Select({ id, value, options, onChange, className = "w-full" }) {
  return (
    <div className={`relative min-w-0 ${className}`}>
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

function TextArea({ id, value, onChange, max, className = "" }) {
  return (
    <div className="relative min-w-0">
      <textarea
        id={id}
        value={value}
        maxLength={max}
        onChange={onChange}
        className={`w-full resize-none rounded-[7.47px] border border-[#E2DFFC] bg-white px-3 py-[10px] pb-6 text-[12px] font-medium text-[#0A0847]/80 outline-none transition placeholder:text-[#0A0847]/60 focus:border-[#001984] ${className}`}
      />
      <span className="pointer-events-none absolute right-3 bottom-2 text-[10px] text-[#0A0847]/60">
        {value.length} / {max}
      </span>
    </div>
  );
}

/* ==========================================================================
   LIVE PREVIEW (right card)
   ========================================================================== */
function LivePreview({ question, options, reference }) {
  return (
    <section className="min-w-0 rounded-lg border border-[#E2DFFC] bg-[#F9F9FF] p-4 sm:p-6">
      <h2 className="text-[18px] font-semibold text-[#0A0847] sm:text-[20px]">
        Live Question Preview
      </h2>
      <p className="mt-1 text-[13px] text-[#0A0847]/60 sm:text-[14px]">
        This is how your question will appear to users.
      </p>

      <div className="mt-5 space-y-5">
        <img
          src={liveQuestionImage}
          alt="Jesus and Nicodemus"
          className="aspect-[402/229] w-full rounded-lg border border-[#E2DFFC] object-cover"
        />

        <p className="break-words text-[14px] font-semibold text-[#0A0847]">Q. {question}</p>

        <ul className="space-y-1">
          {options.map((option, index) => (
            <li
              key={index}
              className="break-words text-[13px] leading-[22px] font-medium text-[#0A0847]/60 sm:text-[14px] sm:leading-[24px]"
            >
              <span className="font-bold text-[#0A0847]">{String.fromCharCode(65 + index)}.</span>{" "}
              {option}
            </li>
          ))}
        </ul>

        <div className="flex min-h-[95px] flex-col justify-center rounded-lg border border-[#E2DFFC] bg-white p-3">
          <p className="text-[13px] font-medium text-[#0A0847]/60 sm:text-[14px]">
            This is a representative preview.
            <br />
            Final UI may differ from this.
          </p>
          <p className="mt-2 text-[13px] font-bold italic text-[#001984] sm:text-[14px]">
            {reference}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AddQuestionManually() {
  const [questionType, setQuestionType] = useState("Multiple Choice");
  const [question, setQuestion] = useState(
    "What did Nicodemus come to Jesus at night to discuss?",
  );
  const [options, setOptions] = useState(OPTION_DEFAULTS.map((option) => option.value));
  const [correctAnswer, setCorrectAnswer] = useState("Option B – How to be born again");
  const [explanation, setExplanation] = useState(
    "Nicodemus came to Jesus at night to learn about being born again.",
  );
  const [reference, setReference] = useState(REFERENCE);
  const [difficulty, setDifficulty] = useState("Medium");
  const [rewardPoints, setRewardPoints] = useState("John 3:1–21");
  const [status, setStatus] = useState("Active");

  const setOption = (index, value) =>
    setOptions((prev) => prev.map((item, i) => (i === index ? value : item)));

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[#F9FAFE] font-[Inter] text-[#0A0847]">
      <div className="flex w-full min-w-0 flex-col gap-6 px-4 py-6 sm:px-6">
        <Breadcrumb items={["Dashboard", "Activities", "John", "Chapter 3", "Quiz"]} />

        <div className="min-w-0">
          <h1 className="break-words text-[20px] font-semibold text-[#0A0847] sm:text-[22px]">
            Add Question Manually
          </h1>
          <p className="mt-1.5 text-[13px] text-[#0A0847]/60 sm:text-[14px]">
            Engage and track activities for each chapter.
          </p>
        </div>

        <div className="flex">
          <LocationChip />
        </div>

        {/* two columns: stacked below xl (1280px) so tablets get full width */}
        <div className="grid min-w-0 grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,578px)_minmax(0,1fr)]">
          {/* LEFT — create form */}
          <section className="flex min-w-0 flex-col gap-[10px] rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] px-4 pt-[19px] pb-[30px] sm:pr-[22px] sm:pb-[35px] sm:pl-[16px]">
            <div className="min-w-0">
              <h2 className="text-[16px] font-semibold text-[#0A0847]">Create a New Question</h2>
              <p className="mt-1 text-[13px] text-[#0A0847]/60 sm:text-[14px]">
                Fill in the details below to create your question manually.
              </p>
            </div>

            <Field label="Question Type" required htmlFor="q-type">
              <Select
                id="q-type"
                value={questionType}
                options={QUESTION_TYPE_OPTIONS}
                onChange={(e) => setQuestionType(e.target.value)}
              />
            </Field>

            <Field label="Question" required htmlFor="question">
              <TextArea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                max={500}
                className="h-[118px]"
              />
            </Field>

            {OPTION_DEFAULTS.map((option, index) => (
              <Field key={option.key} label={option.label} required htmlFor={`option-${option.key}`}>
                <input
                  id={`option-${option.key}`}
                  type="text"
                  value={options[index]}
                  onChange={(e) => setOption(index, e.target.value)}
                  className={fieldCls}
                />
              </Field>
            ))}

            <Field label="Correct Answer" required htmlFor="correct-answer">
              <Select
                id="correct-answer"
                value={correctAnswer}
                options={CORRECT_ANSWER_OPTIONS}
                onChange={(e) => setCorrectAnswer(e.target.value)}
              />
            </Field>

            <Field label="Explanation (Optional)" htmlFor="explanation">
              <TextArea
                id="explanation"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                max={1000}
                className="h-[93px]"
              />
            </Field>

            <Field label="Bible Reference" htmlFor="reference">
              <input
                id="reference"
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className={fieldCls}
              />
            </Field>

            {/* Difficulty + Reward Points: stacked on mobile, side by side from sm */}
            <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-2 sm:gap-[29px]">
              <Field label="Difficulty" htmlFor="difficulty">
                <Select
                  id="difficulty"
                  value={difficulty}
                  options={DIFFICULTY_OPTIONS}
                  onChange={(e) => setDifficulty(e.target.value)}
                />
              </Field>
              <Field label="Reward Points" required htmlFor="reward">
                <Select
                  id="reward"
                  value={rewardPoints}
                  options={REWARD_POINT_OPTIONS}
                  onChange={(e) => setRewardPoints(e.target.value)}
                />
              </Field>
            </div>

            {/* Upload Image */}
            <div className="min-w-0">
              <p className={labelCls}>
                Upload Image <span className="text-[#E11D48]">*</span>
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
                <img
                  src={liveQuestionImage}
                  alt="JESUS AND NICODEMUS"
                  className="h-auto w-full rounded-lg border border-[#E2DFFC] object-cover sm:h-[112px] sm:w-[200px] sm:shrink-0"
                />
                <div className="flex min-w-0 flex-1 flex-col justify-center rounded-lg border border-[#E2DFFC] bg-[#FAFBFE] p-3 sm:h-[112px]">
                  <p className="break-words text-[14px] font-semibold text-[#0A0847]">
                    JESUS AND NICODEMUS
                  </p>
                  <p className="mt-1 text-[12px] text-[#0A0847]">Night conversation with Jesus</p>
                  <p className="mt-2 text-[12px] font-medium italic text-[#001984]">
                    View / Replace / Delete
                  </p>
                  <p className="mt-2 text-[10px] leading-[13px] text-[#0A0847]/60">
                    Recommended size: 1200 x 800px
                    <br />
                    Max size: 5 MB (JPG, PNG)
                  </p>
                </div>
              </div>
            </div>

            <Field label="Status" htmlFor="status">
              <Select
                id="status"
                value={status}
                options={STATUS_OPTIONS}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full sm:max-w-[249px]"
              />
            </Field>
          </section>

          {/* RIGHT — live preview */}
          <LivePreview question={question} options={options} reference={reference} />
        </div>

        {/* FOOTER */}
        <div className="flex w-full min-w-0 flex-col gap-4 sm:h-[48px] sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="flex h-[48px] w-full cursor-pointer items-center justify-center rounded-lg border border-[#001984] bg-[#FEFEFE] px-3 text-[13px] font-semibold text-[#0A0847] transition-colors hover:bg-[#F1F1F9] sm:w-[152px]"
          >
            Cancel
          </button>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button type="button" className={outlineButton}>
              Save &amp; Add Another
            </button>
            <button type="button" className={outlineButton}>
              Save &amp; Exit
            </button>
            <button type="button" className={purpleButton}>
              Publish Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}