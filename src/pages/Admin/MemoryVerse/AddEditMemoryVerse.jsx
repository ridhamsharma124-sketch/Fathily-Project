import { useState } from "react";
import {
  LuArrowRight,
  LuCalendar,
  LuChevronLeft,
  LuChevronRight,
  LuCircleAlert,
  LuCircleCheck,
  LuCoins,
  LuEye,
  LuImage,
  LuMusic,
  LuPlay,
  LuRefreshCw,
  LuSave,
  LuSend,
  LuStar,
  LuUpload,
  LuVolume2,
} from "react-icons/lu";
import memoryVerseImg from "../../../assets/Memory Verse img.webp";



const PAGE_BG = "bg-[#F8F8FF]";
const CARD = "rounded-[8px] border-[0.75px] border-[#E2DFFC] bg-white";
const CARD_PAD = "p-[18px] pl-[20px] pr-[21px]";


const T_TITLE = "text-[24px] font-bold leading-[30px] text-[#1E1B4B]";
const T_SECTION = "text-[14px] font-semibold leading-[17px] text-[#1E1B4B]";
const T_LABEL = "text-[12px] font-semibold leading-[15px] text-[#1E1B4B]";
const T_INPUT = "text-[13px] text-[#1E1B4B]";
const T_HELPER = "text-[11px] italic text-[#6B7280]";
const T_MICRO = "text-[10px] text-[#6B7280]";


const FIELD =
  "w-full rounded-[6px] border-[0.75px] border-[#E2DFFC] bg-white px-3 text-[13px] text-[#1E1B4B] outline-none";
const INPUT_H = "h-[38px]";
const BTN_HEADER =
  "flex h-[40px] cursor-pointer items-center gap-2 rounded-[6px] px-4 text-[13px] font-semibold transition-colors";
const BTN_OUTLINE =
  "flex h-[34px] w-full cursor-pointer items-center justify-center gap-2 rounded-[6px] border-[0.75px] border-[#E2DFFC] bg-white text-[12px] font-semibold text-[#1E1B4B] transition-colors hover:bg-[#F7F7FC]";
const BTN_IMG_ACTION =
  "flex h-[32px] w-full cursor-pointer items-center justify-center gap-[6px] rounded-[6px] border-[0.75px] border-[#E2DFFC] bg-white px-[6px] text-[11px] font-semibold whitespace-nowrap text-[#1E1B4B] transition-colors hover:bg-[#F7F7FC]";

const BUILD_FIELD =
  "w-full rounded-[7.5px] border border-[#E2DFFC] bg-white py-[10px] pr-[50px] pl-3 text-[10px] font-medium text-[#0A0847]/80 outline-none";
const BUILD_LABEL = "text-[12px] font-semibold leading-[15px] text-[#1E1B4B]";


const ICON = { xs: 12, sm: 14, md: 16, lg: 20 };
const ICON_STROKE = 1.5;


const NAVY = "#00007A";
const NAVY_ACCENT = "#001984";
const NAVY_DEEP = "#0B0B6B";
const GREEN = "#3DBE4A";
const GREEN_TEXT = "#28923A";
const AMBER = "#F5A623";


function Field({ label, optional, required, children, className = "" }) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <p className={`mb-[6px] ${T_LABEL}`}>
          {label}
          {required && <span className="text-[#E53935]"> *</span>}
          {optional && <span className="font-normal text-[#6B7280]"> (Optional)</span>}
        </p>
      )}
      {children}
    </div>
  );
}

function TextInput({ value, readOnly = true, className = "", ...props }) {
  return (
    <input
      type="text"
      value={value}
      readOnly={readOnly}
      className={`${FIELD} ${INPUT_H} ${className}`}
      {...props}
    />
  );
}

function Select({ value, options, className = "" }) {
  return (
    <select
      className={`${FIELD} ${INPUT_H} cursor-pointer ${className}`}
      defaultValue={value}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function TextArea({ value, max, rows = 2, count, small = false }) {
  const len = count ?? value.length;
  return (
    <div>
      <textarea
        value={value}
        readOnly
        rows={rows}
        className={`${FIELD} resize-none py-2 leading-[1.45] ${small ? "text-[11px]" : "text-[13px]"}`}
      />
      <p className="mt-1 text-right text-[11px] italic text-[#6B7280]">
        {len}/{max}
      </p>
    </div>
  );
}


function InlineCounterInput({ value, max, count }) {
  return (
    <div className="relative">
      <input type="text" value={value} readOnly className={`${FIELD} ${INPUT_H} pr-[64px]`} />
      <span className="absolute top-1/2 right-3 -translate-y-1/2 text-[11px] italic text-[#6B7280]">
        {count ?? value.length}/{max}
      </span>
    </div>
  );
}

function BuildCounter({ count, max }) {
  return (
    <p className="mt-0.5 text-right text-[12px] font-semibold italic leading-[14px] text-[#0A0847]/60">
      {count}/{max}
    </p>
  );
}

function BuildTextArea({ value, max, count, className = "h-[45px]" }) {
  return (
    <div>
      <textarea
        value={value}
        readOnly
        className={`${BUILD_FIELD} block resize-none leading-[12.5px] ${className}`}
      />
      <BuildCounter count={count ?? value.length} max={max} />
    </div>
  );
}

function BuildInput({ value, max, count }) {
  return (
    <div>
      <input type="text" value={value} readOnly className={`${BUILD_FIELD} block h-[30px]`} />
      <BuildCounter count={count ?? value.length} max={max} />
    </div>
  );
}


function PlayButton({ size = 34, color = NAVY }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full text-white"
      style={{ width: size, height: size, backgroundColor: color }}
    >
      <LuPlay size={size * 0.4} fill="currentColor" strokeWidth={0} className="ml-[2px]" />
    </span>
  );
}


function AudioSlider({ fill = 70 }) {
  return (
    <div className="relative h-[4px] flex-1 rounded-full bg-[#D3D5E8]">
      <div
        className="h-full rounded-full bg-[#001984]"
        style={{ width: `${fill}%` }}
      />
      <span
        className="absolute top-1/2 h-[12px] w-[12px] -translate-y-1/2 rounded-full border-[1.5px] border-[#001984] bg-white"
        style={{ left: `calc(${fill}% - 6px)` }}
      />
    </div>
  );
}


const ANSWERS = [
  { key: "A", text: "Be strong and courageous.", correct: true },
  { key: "B", text: "Be kind and generous.", correct: false },
  { key: "C", text: "Be careful and quiet.", correct: false },
  { key: "D", text: "Be patient and gentle.", correct: false },
];

function AnswerLetter({ letter, correct }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
        correct
          ? "bg-[#3DBE4A] text-white"
          : "border-[1.5px] border-[#0A0847]/80 text-[#0A0847]/80"
      }`}
    >
      {letter}
    </span>
  );
}

function ChoiceRows() {
  return (
    <div className="flex flex-col gap-1">
      {ANSWERS.map((a) => (
        <div
          key={a.key}
          className={`flex h-9 items-center gap-[10px] rounded-[6px] border px-[9px] ${
            a.correct
              ? "border-[#CDEBCD] bg-gradient-to-r from-[#E3F6E1] to-white"
              : "border-[#E2DFFC] bg-white"
          }`}
        >
          <AnswerLetter letter={a.key} correct={a.correct} />
          <span className="truncate text-[12px] font-semibold text-[#0A0847]/80">
            {a.text}
          </span>
        </div>
      ))}
    </div>
  );
}


const STEP_LIST = [
  { n: 2, name: "Fill in the Blanks" },
  { n: 3, name: "Tap in Order" },
  { n: 4, name: "Verse Builder" },
  { n: 5, name: "I Recited It" },
];

function StepListCard() {
  return (
    <div className={`${CARD} px-4 py-[17px] pr-[22px]`}>
      <div className="flex flex-col gap-[10px]">
        {STEP_LIST.map((s) => (
          <div
            key={s.n}
            className="flex h-[38px] items-center rounded-[6px] border border-[#E2DFFC] bg-[#F2F5FA] px-3"
          >
            <div className="flex w-[209px] shrink-0 items-center gap-[10px]">
              <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#0A0847]/80 text-[12px] font-semibold text-[#0A0847]/80">
                {s.n}
              </span>
              <span className="truncate text-[14px] font-semibold text-[#0A0847]/80">
                {s.name}
              </span>
            </div>

            <span className="flex shrink-0 items-center gap-[5px]">
              <LuCircleCheck size={ICON.md} strokeWidth={ICON_STROKE} className="text-[#28923A]" />
              <span className="text-[12px] font-semibold text-[#28923A]">Confirmed</span>
            </span>

            <span className="ml-auto flex shrink-0 items-center gap-[3px]">
              <span className="text-[14px] font-semibold text-[#0A0847]/80">Edit</span>
              <LuChevronRight size={ICON.sm} strokeWidth={ICON_STROKE} className="text-[#0A0847]/80" />
            </span>
          </div>
        ))}

        <div className="flex items-center gap-2">
          <LuCircleAlert size={ICON.lg} strokeWidth={ICON_STROKE} className="shrink-0 text-[#001984]/80" />
          <span className="text-[14px] font-semibold text-[#001984]/80">
            Each step can be previewed before publishing.
          </span>
        </div>
      </div>
    </div>
  );
}


function PhonePreview() {
  return (
    <div className={`${CARD} flex flex-col gap-[10px] p-[14px]`}>
      <p className={T_SECTION}>Mobile Preview</p>

      <div className="relative w-full overflow-hidden rounded-[6px] border-[0.75px] border-[#E2DFFC] bg-white">
        <div className="relative h-[100px] w-full rounded-t-[6px] bg-[#CFE4F5]">
          <div className="absolute top-[10px] left-[10px] flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white">
            <LuChevronLeft size={ICON.sm} strokeWidth={ICON_STROKE} className="text-[#1E1B4B]" />
          </div>
          <div className="absolute top-[13px] left-[48px] flex h-[22px] items-center rounded-full bg-white px-[14px] text-[11px] font-medium text-[#1E1B4B]">
            Level 3
          </div>
          <div className="absolute top-[13px] right-[10px] flex h-[22px] items-center gap-[6px] rounded-full bg-white pr-3 pl-[14px]">
            <LuCoins size={ICON.xs} strokeWidth={ICON_STROKE} className="text-[#F5A623]" />
            <span className="text-[11px] font-semibold text-[#1E1B4B]">250</span>
          </div>
        </div>

        <div className="relative -mt-[10px] rounded-t-[12px] bg-white pt-[46px]">
          <div className="absolute top-[-18px] left-1/2 -translate-x-1/2">
            <div
              className="flex h-[56px] w-[56px] flex-col items-center justify-center rounded-full border-[3px] bg-white"
              style={{ borderColor: NAVY_DEEP }}
            >
              <span className="text-[15px] leading-none font-bold" style={{ color: NAVY_DEEP }}>
                1/5
              </span>
              <span className="mt-[3px] text-[7px] leading-none text-[#6B7280]">Step</span>
            </div>
          </div>

          <div
            className="mx-[8px] flex flex-col gap-[10px] rounded-[8px] p-3"
            style={{ backgroundColor: NAVY }}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-white">
                <LuMusic size={11} strokeWidth={ICON_STROKE} style={{ color: NAVY }} />
              </span>
              <span className="text-[13px] font-semibold text-white">Listen &amp; Choose</span>
            </div>

            <p className="text-left text-[10px] leading-[1.4] text-white/85">
              Listen to the verse and choose the correct one.
            </p>

            <div className="flex justify-center">
              <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-[2px] border-white">
                <LuVolume2 size={ICON.lg} strokeWidth={ICON_STROKE} className="text-white" />
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-[4px] w-[65%] overflow-hidden rounded-[2px] bg-white/30">
                <div className="h-full w-[30%] rounded-[2px] bg-white" />
              </div>
              <span className="shrink-0 text-[10px] font-medium text-white">00:00 / 00:18</span>
            </div>

            <div className="flex flex-col gap-2">
              {ANSWERS.map((a) => (
                <div
                  key={a.key}
                  className={`flex h-8 items-center gap-2 rounded-[6px] px-2 ${
                    a.correct ? "bg-[#F0FAF0]" : "bg-white"
                  }`}
                >
                  <span
                    className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      a.correct
                        ? "bg-[#2EAF4B] text-white"
                        : "border-[1.5px] bg-transparent"
                    }`}
                    style={a.correct ? undefined : { borderColor: NAVY_DEEP, color: NAVY_DEEP }}
                  >
                    {a.key}
                  </span>
                  <span className="text-[10px] font-semibold text-[#1E1B4B]">{a.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mx-[8px] mt-[8px] flex h-[42px] cursor-pointer items-center justify-center gap-[6px] rounded-[6px] text-[14px] font-semibold text-white"
            style={{ backgroundColor: GREEN }}
          >
            Next Step
            <LuArrowRight size={ICON.md} strokeWidth={ICON_STROKE} />
          </div>

          <div className="mt-3 px-2 pb-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-[#1E1B4B]">
                <LuStar size={ICON.sm - 2} strokeWidth={ICON_STROKE} style={{ color: AMBER }} fill={AMBER} />
                <span className="text-[10px]">50 pts</span>
              </span>
              <span className="text-[10px] text-[#6B7280]">1 of 5 Steps</span>
            </div>
            <div className="mt-[6px] h-[4px] w-full overflow-hidden rounded-[2px] bg-[#E6E8F7]">
              <div className="h-full w-[20%] rounded-[2px]" style={{ backgroundColor: NAVY_DEEP }} />
            </div>
          </div>
        </div>
      </div>

      <p className="w-full px-0 text-center text-[11px] leading-[1.4] italic text-[#8B8FA8] [text-wrap:balance]">
        This is a simplified preview of Step 1: Listen / Choose
      </p>
    </div>
  );
}


const STEP_TABS = [
  "1 Listen / Choose",
  "2 Fill in the Blanks",
  "3 Tap in Order",
  "4 Fill in the Blanks",
  "5 Tap in Order",
];

const BREADCRUMB = ["Old Testament", "Joshua", "Chapter 1", "Level 3"];

export default function AddEditMemoryVerse() {
  const [activeStep, setActiveStep] = useState(STEP_TABS[0]);
  const [showOnLevelMap, setShowOnLevelMap] = useState(true);

  return (
    <div className={`min-h-screen w-full font-[Inter] text-[#1E1B4B] ${PAGE_BG}`}>
      <div className="mx-auto w-full max-w-[1090px] px-4 pt-[18px] pb-[18px] md:px-[18px]">
        <div className="flex items-center gap-[10px]">
          <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full border-[0.75px] border-[#E2DFFC] bg-white">
            <LuChevronLeft size={ICON.md - 1} strokeWidth={ICON_STROKE} className="text-[#1E1B4B]" />
          </span>
          <nav className="flex flex-wrap items-center gap-[6px] text-[13px] text-[#6B668F]">
            {BREADCRUMB.map((c, i) => (
              <span key={c} className="flex items-center gap-[6px]">
                {i > 0 && <span className="text-[#6B668F66]">&gt;</span>}
                <span className={i === BREADCRUMB.length - 1 ? "font-semibold text-[#1E1B4B]" : undefined}>
                  {c}
                </span>
              </span>
            ))}
          </nav>
        </div>

        <div className="mt-[14px] flex flex-wrap items-center justify-between gap-[10px]">
          <h1 className={T_TITLE}>Add / Edit Memory Verse</h1>

          <div className="flex flex-wrap items-center gap-[10px]">
            <button type="button" className={`${BTN_HEADER} border-[0.75px] border-[#E2DFFC] bg-white text-[#1E1B4B] hover:bg-[#F7F7FC]`}>
              <LuSave size={ICON.sm} strokeWidth={ICON_STROKE} /> Save draft
            </button>
            <button type="button" className={`${BTN_HEADER} border-[0.75px] border-[#E2DFFC] bg-white text-[#1E1B4B] hover:bg-[#F7F7FC]`}>
              <LuEye size={ICON.sm} strokeWidth={ICON_STROKE} /> Preview
            </button>
            <button type="button" className={`${BTN_HEADER} bg-[#00007A] text-white transition-opacity hover:opacity-90`}>
              <LuSend size={ICON.sm} strokeWidth={ICON_STROKE} /> Publish
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 items-start gap-4 xl:grid-cols-[488px_285px_249px]">
          <div className="flex flex-col gap-4">
            <div className={`${CARD} ${CARD_PAD} flex min-h-[621px] flex-col gap-[10px] pt-[18px] pb-[18px]`}>
              <p className={T_SECTION}>Verse Details</p>

              <Field label="Title">
                <TextInput value="Be strong and courageous" />
              </Field>

              <Field label="Testament">
                <Select value="Old Testament" options={["Old Testament", "New Testament"]} />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Book">
                  <Select value="Joshua" options={["Joshua", "Proverbs", "Psalms"]} />
                </Field>
                <Field label="Chapter">
                  <Select value="1" options={["1", "2", "3", "4"]} />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Verse Reference">
                  <Select value="Joshua 1:9" options={["Joshua 1:9", "Joshua 1:8"]} />
                </Field>
                <Field label="Translation">
                  <Select value="NIV" options={["NIV", "KJV", "ESV"]} />
                </Field>
              </div>

              <Field label="Full Verse Text">
                <TextArea
                  small
                  rows={3}
                  max={1000}
                  count={133}
                  value="Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."
                />
              </Field>

              <Field label="Short Instruction">
                <InlineCounterInput max={100} count={99} value="Listen to the verse and choose the correct one." />
              </Field>

              <Field label="Activity Length">
                <Select value="5 Steps" options={["5 Steps", "3 Steps", "4 Steps"]} />
              </Field>
            </div>

            <div className={`${CARD} pt-4 pr-[25px] pb-[23px] pl-[15px]`}>
              <p className="text-[14px] font-semibold leading-[17px] text-[#0A0847]/80">
                Build the 5 Steps
              </p>

              <div className="mt-3 flex flex-wrap gap-x-[13px] gap-y-2">
                {STEP_TABS.map((t) => {
                  const active = t === activeStep;
                  const [num, ...rest] = t.split(" ");
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setActiveStep(t)}
                      className={`flex h-10 w-[133px] cursor-pointer items-center justify-center gap-[5px] rounded-lg border px-2 text-[12px] font-semibold transition-colors ${
                        active
                          ? "border-[#001984] bg-[#001984] text-white"
                          : "border-[#E2DFFC] bg-[#F2F5FA] text-[#0A0847]/80"
                      }`}
                    >
                      <span
                        className={`flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full text-[12px] font-semibold ${
                          active
                            ? "bg-white text-[#001984]"
                            : "border-[1.5px] border-[#0A0847]/80 text-[#0A0847]/80"
                        }`}
                      >
                        {num}
                      </span>
                      <span className="truncate">{rest.join(" ")}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-[10px] grid grid-cols-2 items-start gap-5">
                <div className="flex flex-col gap-4">
                  <Field label="Instruction Text" className="gap-1">
                    <BuildTextArea
                      max={100}
                      count={52}
                      value="Well done, faithful servant! Keep God's Word in your heart."
                    />
                  </Field>

                  <Field label="Audio" className="gap-1">
                    <div className="flex flex-col gap-[6px] rounded-[7.5px] border border-[#E2DFFC] bg-white px-[11px] py-3">
                      <div className="flex items-center gap-[10px]">
                        <PlayButton size={32} color={NAVY_ACCENT} />
                        <p className="min-w-0 flex-1 truncate text-[12px] font-semibold italic text-[#0A0847]/80">
                          joshua-1-9-niv.mp3
                        </p>
                        <span className="shrink-0 text-[12px] font-semibold italic text-[#0A0847]/60">
                          00:18
                        </span>
                      </div>
                      <div className="flex pr-[18px]">
                        <AudioSlider fill={70} />
                      </div>
                    </div>
                  </Field>

                  <Field label="Answer Choices" className="gap-1">
                    <ChoiceRows />
                  </Field>
                </div>

                <div className="flex flex-col gap-4">
                  <Field label="Correct Answer" className="gap-1">
                    <div className="flex flex-wrap items-center gap-4">
                      {["A", "B", "C", "D"].map((k, i) => (
                        <label key={k} className="flex cursor-pointer items-center gap-2 text-[14px] text-[#0A0847]">
                          <input
                            type="radio"
                            name="correct-answer"
                            defaultChecked={i === 0}
                            className="h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none rounded-full border-2 border-[#9AA0B8] checked:border-[#001984] checked:bg-[radial-gradient(circle,#001984_38%,transparent_42%)]"
                          />
                          {k}
                        </label>
                      ))}
                    </div>
                  </Field>

                  <Field label="Hint Text" optional className="gap-1">
                    <BuildTextArea
                      max={100}
                      className="h-[53px]"
                      value="Think about what God commands us to be"
                    />
                  </Field>

                  <Field label="Success Feedback" className="gap-1">
                    <BuildInput max={100} value="That's right! Great job!" />
                  </Field>

                  <Field label="Error Feedback" className="gap-1">
                    <BuildInput max={100} value="Not quite. Listen again and try!" />
                  </Field>
                </div>
              </div>
            </div>

            <StepListCard />
          </div>

          <div className="flex flex-col gap-4">
            <div className={`${CARD} ${CARD_PAD}`}>
              <p className={T_SECTION}>Media</p>

              <div className="mt-[10px]">
                <p className={`mb-[6px] ${T_HELPER} not-italic`}>Chapter Default Image</p>
                <div className="flex items-start gap-[10px]">
                  <div className="h-[131px] w-[115px] shrink-0 overflow-hidden rounded-[6px] border-[0.75px] border-[#E2DFFC] bg-[#F1F2F8]">
                    <img src={memoryVerseImg} alt="Chapter default image" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <button type="button" className={BTN_IMG_ACTION}>
                      <LuRefreshCw size={ICON.xs} strokeWidth={ICON_STROKE} /> Regenerate Puzzle
                    </button>
                    <button type="button" className={BTN_IMG_ACTION}>
                      <LuImage size={ICON.xs} strokeWidth={ICON_STROKE} /> Regenerate Image
                    </button>
                    <button type="button" className={BTN_IMG_ACTION}>
                      <LuUpload size={ICON.xs} strokeWidth={ICON_STROKE} /> Replace Image
                    </button>
                  </div>
                </div>
              </div>

              <div className="my-[10px] h-px w-full bg-[#E2DFFC]" />

              <div>
                <p className={`mb-[6px] ${T_HELPER} not-italic`}>Audio (Verse Narration)</p>
                <div className="flex items-center rounded-[6px] border-[0.75px] border-[#E2DFFC] bg-white p-[10px]">
                  <PlayButton size={30} />
                  <div className="ml-2 min-w-0">
                    <p className="truncate text-[11px] italic text-[#1E1B4B]">joshua-1-9-niv.mp3</p>
                    <p className={T_HELPER}>00:18</p>
                  </div>
                </div>

                <button type="button" className={`${BTN_OUTLINE} mt-[10px]`}>
                  <LuUpload size={ICON.sm - 1} strokeWidth={ICON_STROKE} /> Replace Audio
                </button>
                <p className={`mt-[6px] ${T_HELPER}`}>Recommended: MP3, max 5MB</p>
              </div>
            </div>

            <div className={`${CARD} ${CARD_PAD}`}>
              <p className={T_SECTION}>Completion &amp; Reward</p>

              <div className="mt-[10px] flex flex-col gap-[10px]">
                <Field label="Reward Points" required>
                  <TextInput value="50" />
                </Field>
                <Field label="Completion Title" required>
                  <TextInput value="Verse Memorized!" />
                </Field>
                <Field label="Completion Button Label" required>
                  <TextInput value="I Recited It" />
                </Field>
                <Field label="Success Page" required>
                  <Select
                    value="Use standard reward success page"
                    options={["Use standard reward success page", "Use custom success page"]}
                  />
                </Field>
                <Field label="Next Action" required>
                  <Select value="Collect Reward & Continue" options={["Collect Reward & Continue", "Return to Home"]} />
                </Field>
                <Field label="Amen / Encouragement Message" optional>
                  <TextArea max={100} rows={2} value="Well done, faithful servant! Keep God's Word in your heart." />
                </Field>
              </div>
            </div>

            <div className={`${CARD} flex flex-col gap-[10px] p-3`}>
              <p className={T_SECTION}>Publishing</p>

              <Field label="Status">
                <Select value="Published" options={["Published", "Draft", "Scheduled"]} />
              </Field>

              <div className="grid grid-cols-2 gap-[10px]">
                <Field label="Start Date">
                  <div className="relative">
                    <TextInput value="May 12, 2024" className="pr-8" />
                    <LuCalendar
                      size={ICON.sm - 1}
                      strokeWidth={ICON_STROKE}
                      className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[#6B7280]"
                    />
                  </div>
                </Field>
                <Field label="End Date">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="No end date"
                      className={`${FIELD} ${INPUT_H} pr-8 placeholder:text-[#6B7280]`}
                    />
                    <LuCalendar
                      size={ICON.sm - 1}
                      strokeWidth={ICON_STROKE}
                      className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[#6B7280]"
                    />
                  </div>
                </Field>
              </div>

              <Field label="Display Order">
                <TextInput value="10" />
              </Field>

              <div className="flex items-center justify-between">
                <p className={T_LABEL}>Show on Level Map</p>
                <button
                  type="button"
                  role="switch"
                  aria-checked={showOnLevelMap}
                  onClick={() => setShowOnLevelMap((v) => !v)}
                  className={`relative h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full transition-colors ${
                    showOnLevelMap ? "bg-[#041581]" : "bg-[#D1D5DB]"
                  }`}
                >
                  <span
                    className={`absolute top-[2px] h-4 w-4 rounded-full bg-white transition-all ${
                      showOnLevelMap ? "left-[18px]" : "left-[2px]"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <PhonePreview />
        </div>
      </div>
    </div>
  );
}