import { useState } from "react";
import liveQuestionImage from "../../../assets/live question img.png";
import { LuChevronDown } from "react-icons/lu";
import { Breadcrumb, LocationChip } from "./quizShared";

/* ==========================================================================
   MOCK DATA — hardcoded exactly as specified
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
const labelCls = "mb-1.5 block text-[13px] font-semibold text-[#0A0847]";

const inputCls =
  "h-11 w-full rounded-lg border border-[#E5E4EC] bg-white px-4 text-[13px] text-[#0A0847AA] outline-none transition placeholder:text-[#0A084799] focus:border-[#041581]";

const outlineButton =
  "flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#041581] bg-white px-8 text-[13px] font-semibold text-[#0A0847] transition-colors hover:bg-[#F1F1F9]";

const purpleButton =
  "flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#4C1DD6] px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#4318B8]";

/* ==========================================================================
   FORM PRIMITIVES
   ========================================================================== */
function Field({ label, required, htmlFor, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelCls}>
        {label} {required && <span className="text-[#E11D48]">*</span>}
      </label>
      {children}
    </div>
  );
}

function Select({ id, value, options, onChange, className = "" }) {
  return (
    <div className={`relative w-full ${className}`}>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`${inputCls} cursor-pointer appearance-none pr-10`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <LuChevronDown
        size={16}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0A084799]"
        aria-hidden
      />
    </div>
  );
}

/* textarea with the character counter sitting INSIDE, bottom-right */
function TextArea({ id, value, onChange, max, className = "" }) {
  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        maxLength={max}
        onChange={onChange}
        className={`w-full resize-none rounded-lg border border-[#E5E4EC] bg-white px-4 py-3 pb-7 text-[13px] leading-relaxed text-[#0A0847AA] outline-none transition placeholder:text-[#0A084799] focus:border-[#041581] ${className}`}
      />
      <span className="absolute bottom-2.5 right-4 text-[12px] italic text-[#0A084799]">
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
    <section className="h-full rounded-lg border border-[#E2DFFC] bg-[#F9F9FF] p-5">
      <h2 className="text-[20px] font-bold text-[#0A0847]">
        Live Question Preview
      </h2>
      <p className="mt-1 text-[14px] text-[#0A084799]">
        This is how your question will appear to users.
      </p>

      <div className="mt-5 space-y-5">
        <img
          src={liveQuestionImage}
          alt="Jesus and Nicodemus"
          className="h-[229px] w-full rounded-lg border border-[#E2DFFC] object-cover"
        />

        <p className="line-clamp-2 text-[14px] font-semibold text-[#0A0847]">
          Q. {question}
        </p>

        <ul>
          {options.map((option, index) => (
            <li key={index} className="text-[12px] leading-5 text-[#0A084799]">
              <span className="font-bold text-[#0A0847]">
                {String.fromCharCode(65 + index)}.
              </span>{" "}
              {option}
            </li>
          ))}
        </ul>

        <div className="rounded-lg border border-[#E2DFFC] bg-white p-3.5">
          <p className="text-[13px] text-[#0A084799]">
            This is a representative preview.
            <br />
            Final UI may differ from this.
          </p>
          <p className="mt-2 text-[13px] font-bold italic text-[#041581]">
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
  const [options, setOptions] = useState(
    OPTION_DEFAULTS.map((option) => option.value),
  );
  const [correctAnswer, setCorrectAnswer] = useState(
    "Option B – How to be born again",
  );
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
    <div className="min-h-screen bg-[#F9FAFE] font-[Inter] text-[#0A0847]">
      <div className="mx-auto max-w-[1200px] space-y-5 px-5 py-6">
        <Breadcrumb
          items={["Dashboard", "Activities", "John", "Chapter 3", "Quiz"]}
        />

        <div>
          <h1 className="text-[24px] font-bold text-[#0A0847]">
            Add Question Manually
          </h1>
          <p className="mt-[6px] text-[14px] text-[#0A084799]">
            Engage and track activities for each chapter.
          </p>
        </div>

        <LocationChip />

        <div className="flex flex-col gap-10 lg:flex-row">
          {/* LEFT — create form */}
          <section className="flex-1 rounded-lg border border-[#E2DFFC] bg-[#FEFEFF] px-[22px] py-5">
            <h2 className="text-[18px] font-bold text-[#0A0847]">
              Create a New Question
            </h2>
            <p className="mt-1 text-[14px] text-[#0A084799]">
              Fill in the details below to create your question manually.
            </p>

            <div className="mt-5 space-y-4">
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
                  className="h-[120px]"
                />
              </Field>

              {OPTION_DEFAULTS.map((option, index) => (
                <Field
                  key={option.key}
                  label={option.label}
                  required
                  htmlFor={`option-${option.key}`}
                >
                  <input
                    id={`option-${option.key}`}
                    type="text"
                    value={options[index]}
                    onChange={(e) => setOption(index, e.target.value)}
                    className={inputCls}
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
                  className="h-[104px]"
                />
              </Field>

              <Field label="Bible Reference" htmlFor="reference">
                <input
                  id="reference"
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className={inputCls}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
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

              <div>
                <p className={labelCls}>
                  Upload Image <span className="text-[#E11D48]">*</span>
                </p>
                <div className="flex gap-4">
                  <img
                    src={liveQuestionImage}
                    alt="JESUS AND NICODEMUS"
                    className="h-[172px] w-[258px] shrink-0 rounded-lg border border-[#E2DFFC] object-cover"
                  />
                  <div className="flex-1 rounded-lg border border-[#E2DFFC] bg-[#F1F1F9] p-3.5">
                    <p className="text-[15px] font-bold text-[#0A0847]">
                      JESUS AND NICODEMUS
                    </p>
                    <p className="mt-1 text-[13px] text-[#0A0847]">
                      Night conversation with Jesus
                    </p>
                    <p className="mt-2.5 text-[13px] font-bold italic text-[#041581]">
                      View / Replace | Delete
                    </p>
                    <p className="mt-2.5 text-[11px] text-[#0A084799]">
                      Recommended size: 1200 × 800px
                      <br />
                      Max size: 5 MB, (JPG, PNG)
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
                  className="w-[258px]"
                />
              </Field>
            </div>
          </section>

          {/* RIGHT — live preview */}
          <div className="lg:w-[465px] lg:shrink-0">
            <LivePreview
              question={question}
              options={options}
              reference={reference}
            />
          </div>
        </div>

        {/* BOTTOM ACTION ROW */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button type="button" className={outlineButton}>
            Cancel
          </button>
          <div className="flex flex-wrap gap-3">
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
