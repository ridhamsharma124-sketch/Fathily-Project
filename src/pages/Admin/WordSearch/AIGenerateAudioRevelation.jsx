import { useState } from "react";
import {
  LuChevronDown,
  LuChevronUp,
  LuPencil,
  LuRotateCw,
  LuArrowRight,
  LuX,
  LuImage,
} from "react-icons/lu";
import sunImg from "../../../assets/word search/sun.webp";
import floppyIcon from "../../../assets/word search/dr_save_floppy.svg";
import seaWaterImg from "../../../assets/word search/sea water.webp";

const HEADING = "#0A0847";
const PRIMARY = "#001984";
const LABEL_COLOR = "rgba(10, 8, 71, 0.8)";   
const MUTED = "rgba(10, 8, 71, 0.6)";          
const DIVIDER_COLOR = "rgba(10, 8, 71, 0.1)";
const BORDER = "#E2DFFC";
const TOGGLE_ON = "#55BD7A";
const GREEN_TEXT = "#2BA452";                  
const BADGE_BG = "#E8F9EA";
const LH = "leading-[1.21]";
const CONTROL_CLS =
  "h-[40px] w-full cursor-pointer appearance-none rounded-[7.47px] border border-[#E2DFFC] bg-white py-[10px] pl-3 pr-9 text-[12px] font-medium outline-none focus:border-[#001984]/40";

function ImageSparkleIcon({ size = 10.5 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
      <circle cx="9" cy="9" r="1.8" />
      <path d="m21 16-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
      <path d="M19 2.2l.9 2.1 2.1.9-2.1.9L19 8.2l-.9-2.1-2.1-.9 2.1-.9z" />
    </svg>
  );
}
function CircleCheckFilled({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="11.5" fill="#fff" />
      <path d="M7 12.4l3.3 3.3L17 9" fill="none" stroke={PRIMARY} strokeWidth="2.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Chevron() {
  return (
    <LuChevronDown
      size={18}
      className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
      style={{ color: HEADING }}
      aria-hidden
    />
  );
}
function FieldLabel({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-[12px] ${LH} font-semibold whitespace-nowrap`}
      style={{ color: LABEL_COLOR }}
    >
      {children}
    </label>
  );
}
function SelectControl({ id, value, defaultValue, onChange, options, disabled = false }) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        className={`${CONTROL_CLS} ${disabled ? "cursor-not-allowed" : ""}`}
        style={{ color: MUTED }}
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <Chevron />
    </div>
  );
}
function NumberStepper({ value, onChange, label }) {
  return (
    <div className="relative">
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="h-[40px] w-full rounded-[7.47px] border border-[#E2DFFC] bg-white py-[10px] pr-[30px] pl-3 text-[12px] font-medium outline-none focus:border-[#001984]/40"
        style={{ color: MUTED }}
      />
      <span className="absolute top-1/2 right-3 flex -translate-y-1/2 flex-col">
        <button type="button" tabIndex={-1} aria-label={`Increase ${label}`}
          onClick={() => onChange((value ?? 0) + 1)}
          className="flex h-[10px] w-[14px] cursor-pointer items-center justify-center" style={{ color: HEADING }}>
          <LuChevronUp size={11} />
        </button>
        <button type="button" tabIndex={-1} aria-label={`Decrease ${label}`}
          onClick={() => onChange(Math.max(0, (value ?? 0) - 1))}
          className="flex h-[10px] w-[14px] cursor-pointer items-center justify-center" style={{ color: HEADING }}>
          <LuChevronDown size={11} />
        </button>
      </span>
    </div>
  );
}

function Toggle({ on, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="relative h-[15px] w-[26px] shrink-0 cursor-pointer rounded-full transition-colors"
      style={{ backgroundColor: on ? TOGGLE_ON : "#D6D6DE" }}
    >
      <span
        className="absolute top-[2px] h-[11px] w-[11px] rounded-full bg-white shadow-sm transition-all"
        style={{ left: on ? 13 : 2 }}
      />
    </button>
  );
}

function ToggleRight({ label, on, onChange, className = "" }) {
  return (
    <div className={`flex items-center gap-[24px] ${className}`}>
      <span className={`text-[12px] ${LH} font-semibold whitespace-nowrap`} style={{ color: LABEL_COLOR }}>
        {label}
      </span>
      <Toggle on={on} onChange={onChange} label={label} />
    </div>
  );
}

function ToggleLeft({ label, on, onChange, className = "" }) {
  return (
    <div className={`flex items-center gap-[14px] ${className}`}>
      <Toggle on={on} onChange={onChange} label={label} />
      <span className={`text-[12px] ${LH} font-semibold whitespace-nowrap`} style={{ color: LABEL_COLOR }}>
        {label}
      </span>
    </div>
  );
}

function Field({ label, htmlFor, width = "flex-1", children }) {
  return (
    <div className={`${width} min-w-0 shrink-0`}>
      <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
      <div className="mt-[8px]">{children}</div>
    </div>
  );
}


const HEADER_WIDTHS = ["w-[222px]", "w-[188px]", "w-[160px]", "w-[198px]"];
const TABS = ["Manual Entry", "CSV Upload", "AI Generate"];

function Tabs({ activeTab = "AI Generate", onTabChange }) {
  return (
    <div className="mt-[24px] flex w-full border-b border-[#E2DFFC]">
      {TABS.map((t) => {
        const active = t === activeTab;
        return (
          <button
            key={t}
            type="button"
            onClick={onTabChange ? () => onTabChange(t) : undefined}
            className={`-mb-px px-8 pb-[18px] text-[14px] ${LH} ${
              active ? "border-b-2 font-semibold" : "font-medium"
            }`}
            style={{
              color: active ? PRIMARY : MUTED,
              borderColor: active ? PRIMARY : "transparent",
            }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}
function PageHeader({ headerFields, pointsControl, activeTab, onTabChange }) {
  return (
    <>
      <h1 className={`text-[22px] ${LH} font-semibold`} style={{ color: HEADING }}>
        Add / Edit Word Search
      </h1>
      <p className={`mt-[14px] text-[16px] ${LH} font-medium`} style={{ color: MUTED }}>
        Choose the activity type and how you want to create it.
      </p>
      <div className="mt-[24px] flex gap-[24px]">
        {headerFields.map((f, i) => (
          <Field key={f.label} label={f.label} htmlFor={f.htmlFor} width={HEADER_WIDTHS[i]}>
            {f.control}
          </Field>
        ))}
        <Field label="Points per Puzzle" htmlFor="points" width="w-[195px]">
          {pointsControl}
        </Field>
      </div>
      <Tabs activeTab={activeTab} onTabChange={onTabChange} />
    </>
  );
}

function SectionHeading({ title, subtitle }) {
  return (
    <>
      <h2 className={`mt-[24px] text-[22px] ${LH} font-semibold`} style={{ color: HEADING }}>
        {title}
      </h2>
      <p className={`mt-[14px] text-[16px] ${LH} font-medium`} style={{ color: MUTED }}>
        {subtitle}
      </p>
    </>
  );
}
function FormCard({ children }) {
  return (
    <div className="mt-[24px] flex min-h-[311px] w-full max-w-[1059px] flex-col rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white pt-[16px] pr-[28px] pb-[16px] pl-[27px]">
      {children}
    </div>
  );
}

function FormRow({ children, className = "" }) {
  return <div className={`flex min-h-[63px] items-start gap-[24px] ${className}`}>{children}</div>;
}
function Divider() {
  return <div className="my-[20px] h-px w-full" style={{ backgroundColor: DIVIDER_COLOR }} />;
}

function LevelsSelect({ levels, onRemove }) {
  return (
    <div className="flex h-[40px] w-full items-center gap-[8px] overflow-hidden rounded-[7.47px] border border-[#E2DFFC] bg-white px-[12px]">
      {levels.map((lv) => (
        <span
          key={lv}
          className="flex h-[25px] shrink-0 items-center gap-[8px] rounded-[8px] border border-[#E2DFFC] bg-[#F4F3FD] px-[12px] text-[10px] font-semibold whitespace-nowrap"
          style={{ color: LABEL_COLOR }}
        >
          {lv}
          <button
            type="button"
            aria-label={`Remove ${lv}`}
            onClick={() => onRemove(lv)}
            className="cursor-pointer"
            style={{ color: "#0926FD" }}
          >
            <LuX size={12} strokeWidth={2.5} />
          </button>
        </span>
      ))}
    </div>
  );
}
function PuzzlesPerLevel({ levels }) {
  return (
    <div
      className="flex h-[40px] w-full items-center gap-[20px] rounded-[7.47px] border border-[#E2DFFC] bg-white px-[12px] text-[12px] font-medium"
      style={{ color: MUTED }}
    >
      {levels.map((lv) => (
        <span key={lv} className="whitespace-nowrap">{lv}: 1</span>
      ))}
    </div>
  );
}

function PreviewHeading() {
  return (
    <h3 className={`mt-[34px] text-[14px] ${LH} font-semibold`} style={{ color: LABEL_COLOR }}>
      Generated Puzzles Preview
    </h3>
  );
}
function PreviewGrid({ children }) {
  return <div className="mt-[16px] flex gap-[21px]">{children}</div>;
}

function PuzzleCard({ title, children, actions }) {
  return (
    <div className="flex h-[413px] w-[519px] shrink-0 flex-col gap-[16px] rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white pt-[24px] pr-[21px] pb-[28px] pl-[22px]">
      <div className="flex items-center justify-between">
        <p className={`text-[11px] ${LH} font-medium`} style={{ color: LABEL_COLOR }}>
          {title}
        </p>
        <span
          className="flex h-[24px] items-center rounded-[8px] px-[10px] text-[10px] font-semibold"
          style={{ backgroundColor: BADGE_BG, color: GREEN_TEXT }}
        >
          AI IMAGE
        </span>
      </div>
      <div className="flex h-[224px] w-full gap-[13px]">{children}</div>
      <div className="flex flex-col gap-[16px]">{actions}</div>
    </div>
  );
}
function PreviewImage({ src, alt }) {
  return (
    <div
      className="flex h-[224px] w-[230px] shrink-0 items-center justify-center overflow-hidden rounded-[8px]"
      style={{ backgroundColor: "#F3F4F6" }}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <LuImage size={28} style={{ color: "#9CA3AF" }} aria-hidden />
      )}
    </div>
  );
}

function OutlineAction({ icon: Icon, iconSize = 10.5, width, children }) {
  return (
    <button
      type="button"
      className="flex h-[32px] cursor-pointer items-center justify-center gap-[6px] rounded-[8px] border border-[#E2DFFC] bg-white text-[10px] font-semibold whitespace-nowrap transition-colors hover:bg-[#F7F8FE]"
      style={{ color: LABEL_COLOR, width }}
    >
      <span className="flex items-center" style={{ color: PRIMARY }}>
        <Icon size={iconSize} />
      </span>
      {children}
    </button>
  );
}
function CardActions() {
  return (
    <>
      <div className="flex gap-[12px]">
        <OutlineAction icon={LuRotateCw} width={127}>Regenerate Puzzle</OutlineAction>
        <OutlineAction icon={ImageSparkleIcon} width={122}>Regenerate Image</OutlineAction>
        <OutlineAction icon={ImageSparkleIcon} width={109}>Replace Image</OutlineAction>
      </div>
      <div className="flex gap-[12px]">
        <OutlineAction icon={LuPencil} iconSize={12} width={75}>Edit</OutlineAction>
        <button
          type="button"
          className="flex h-[32px] w-[121px] cursor-pointer items-center justify-center gap-[5px] rounded-[8px] text-[10px] font-semibold whitespace-nowrap text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: PRIMARY }}
        >
          <CircleCheckFilled size={14} />
           Approved
        </button>
      </div>
    </>
  );
}

function PageFooter() {
  const base =
    "flex h-[42px] cursor-pointer items-center justify-center rounded-[8px] text-[14px] font-semibold transition-colors";
  return (
    <div className="mt-[42px] flex items-center justify-end gap-[12px]">
      <button type="button" className={`${base} w-[97px] border border-[#E2DFFC] bg-white hover:bg-[#F5F8FD]`} style={{ color: LABEL_COLOR }}>
        Cancel
      </button>
      <button type="button" className={`${base} w-[119px] gap-[8px] border border-[#E2DFFC] bg-white hover:bg-[#F5F8FD]`} style={{ color: LABEL_COLOR }}>
        <img src={floppyIcon} alt="" aria-hidden className="h-[18px] w-[18px] shrink-0" />
        Save draft
      </button>
      <button type="button" className={`${base} w-[190px] gap-[6px] text-white hover:opacity-90`} style={{ backgroundColor: PRIMARY }}>
        <LuArrowRight size={16} />
        Publish Approved
      </button>
    </div>
  );
}

const HEADER_FIELDS = [
  { id: "testament", label: "Testament", value: "Old Testament", options: ["Old Testament", "New Testament"] },
  { id: "book", label: "Book", value: "Genesis", options: ["Genesis", "Exodus", "Psalms", "John"] },
  { id: "chapter", label: "Chapter", value: "1", options: ["1", "2", "3"] },
  { id: "difficulty", label: "Difficulty", value: "Easy", options: ["Easy", "Medium", "Hard"] },
];
const PASSAGE_OPTIONS = [
  "Creation (Genesis 1)",
  "Noah's Ark (Genesis 6)",
  "Abraham's Call (Genesis 12)",
  "The Exodus (Exodus 14)",
];
const VOICE_OPTIONS = ["Male – Warm", "Male – Deep", "Female – Warm", "Female – Soft"];
const AUDIO_LENGTH_OPTIONS = ["1", "2", "3", "4", "5"];
const WORD_BANK_OPTIONS = ["Show", "Hide"];
const PUZZLE_COUNT_OPTIONS = ["1", "2", "3", "4", "5"];
const IMAGE_STYLE_OPTIONS = ["Biblical Illustration", "Watercolour", "Modern Art", "Line Art"];
const SAFETY_OPTIONS = ["Family Safe", "Family Safe (Strict)", "Unfiltered"];
const WAVEFORM = [
  3, 6, 10, 5, 8, 12, 4, 9, 5, 11, 7, 12, 4, 8, 6, 10, 5, 12, 7, 9, 5, 11, 8, 4, 10, 6,
  11, 7, 5, 12, 8, 5, 10, 6, 4, 9, 11, 6, 8, 12, 5, 10, 7, 5, 9, 4, 8, 11, 6, 10,
];

function AudioPlayer() {
  return (
    <div
      className="mt-[12px] flex h-[36px] w-full items-center gap-[10px] rounded-[40px] px-[10px] py-[5px]"
      style={{ backgroundColor: "#F3F4F5" }}
    >
      <button
        type="button"
        aria-label="Play audio"
        className="flex h-[18px] w-[18px] shrink-0 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-90"
        style={{ backgroundColor: PRIMARY }}
      >
        <svg width="7" height="8" viewBox="0 0 7 8" aria-hidden>
          <path d="M1 .6v6.8L6.5 4z" fill="#fff" />
        </svg>
      </button>
      <div className="flex h-full min-w-0 flex-1 items-center justify-between overflow-hidden">
        {WAVEFORM.map((h, i) => (
          <span
            key={i}
            className="w-[1.5px] shrink-0 rounded-full"
            style={{ height: h * 1.5, backgroundColor: "#2E3FA8" }}
          />
        ))}
      </div>
      <span className="shrink-0 text-[10px] font-medium whitespace-nowrap" style={{ color: LABEL_COLOR }}>
        0:00 / 0:30
      </span>
    </div>
  );
}

function AudioOption({ option, index, correct }) {
  return (
    <div className="flex items-center gap-[10px]">
      <span
        className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full"
        style={{ border: `1.5px solid ${correct ? GREEN_TEXT : MUTED}` }}
      >
        {correct && <span className="h-[8px] w-[8px] rounded-full" style={{ backgroundColor: GREEN_TEXT }} />}
      </span>
      <span className="text-[10px] leading-[9px] whitespace-nowrap" style={{ color: HEADING }}>
        <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>{" "}
        <span
          className={correct ? "font-semibold" : "font-medium"}
          style={{ color: correct ? GREEN_TEXT : HEADING }}
        >
          {option}
        </span>
      </span>
    </div>
  );
}
function AudioBody({ src, alt, question, options, correctIndex }) {
  return (
    <>
      <PreviewImage src={src} alt={alt} />
      <div className="min-w-0 flex-1 pt-[6px]">
        <p className="text-[10px] leading-[9px] font-semibold whitespace-nowrap" style={{ color: LABEL_COLOR }}>
          Listen to the audio. Then answer the question.
        </p>
        <AudioPlayer />
        <p className={`mt-[12px] text-[12px] ${LH} font-semibold`} style={{ color: LABEL_COLOR }}>
          {question}
        </p>
        <div className="mt-[12px] flex flex-col gap-[9px]">
          {options.map((opt, i) => (
            <AudioOption key={`${opt}-${i}`} option={opt} index={i} correct={i === correctIndex} />
          ))}
        </div>
      </div>
    </>
  );
}

export default function AIGenerateAudioRevelation() {
  const [points, setPoints] = useState(10);
  const [values, setValues] = useState(() =>
    HEADER_FIELDS.reduce((acc, f) => ({ ...acc, [f.id]: f.value }), {}),
  );
  const [passage, setPassage] = useState(PASSAGE_OPTIONS[0]);
  const [voice, setVoice] = useState(VOICE_OPTIONS[0]);
  const [audioLength, setAudioLength] = useState(AUDIO_LENGTH_OPTIONS[3]);
  const [wordBank, setWordBank] = useState(WORD_BANK_OPTIONS[0]);
  const [preserve, setPreserve] = useState(true);
  const [count, setCount] = useState(PUZZLE_COUNT_OPTIONS[1]);
  const [levels, setLevels] = useState(["Level 1", "Level 2"]);
  const [aiImage, setAiImage] = useState(true);
  const [imageStyle, setImageStyle] = useState(IMAGE_STYLE_OPTIONS[0]);
  const [safety, setSafety] = useState(SAFETY_OPTIONS[0]);
  const [noText, setNoText] = useState(true);
  const [transcript, setTranscript] = useState(true);
  const removeLevel = (lv) => setLevels((p) => p.filter((x) => x !== lv));
  const headerFields = HEADER_FIELDS.map((f) => ({
    label: f.label,
    htmlFor: f.id,
    control: (
      <SelectControl
        id={f.id}
        value={values[f.id]}
        onChange={(e) => setValues((p) => ({ ...p, [f.id]: e.target.value }))}
        options={f.options}
      />
    ),
  }));
  return (
    <div className="min-h-[calc(100vh-72px)] font-[Inter]" style={{ backgroundColor: "#F9FAFE", color: HEADING }}>
      <div className="mx-auto w-full max-w-[1114px] px-6 pt-6 pb-[48px]">
        <PageHeader
          headerFields={headerFields}
          pointsControl={<NumberStepper value={points} onChange={setPoints} label="Points per Puzzle" />}
          activeTab="AI Generate"
        />
        <SectionHeading
          title="AI Generate — Audio Revelation"
          subtitle="Generate puzzles with audio clues for listening and answering."
        />
        <FormCard>
          <FormRow>
            <Field label="Passage / Topic" htmlFor="passage" width="w-[191px]">
              <SelectControl id="passage" value={passage} onChange={(e) => setPassage(e.target.value)} options={PASSAGE_OPTIONS} />
            </Field>
            <Field label="AI Narration Voice" htmlFor="voice" width="w-[133px]">
              <SelectControl id="voice" value={voice} onChange={(e) => setVoice(e.target.value)} options={VOICE_OPTIONS} />
            </Field>
            <Field label="Audio Length" htmlFor="audioLength" width="w-[162px]">
              <SelectControl id="audioLength" value={audioLength} onChange={(e) => setAudioLength(e.target.value)} options={AUDIO_LENGTH_OPTIONS} />
            </Field>
            <Field label="Word Bank" htmlFor="wordBank" width="w-[131px]">
              <SelectControl id="wordBank" value={wordBank} onChange={(e) => setWordBank(e.target.value)} options={WORD_BANK_OPTIONS} />
            </Field>
            <ToggleRight label="Preserve Verse Wording" on={preserve} onChange={setPreserve} className="pt-[24px]" />
          </FormRow>
          <Divider />

          <FormRow>
            <Field label="Number of Puzzles" htmlFor="numPuzzles" width="w-[169px]">
              <SelectControl id="numPuzzles" value={count} onChange={(e) => setCount(e.target.value)} options={PUZZLE_COUNT_OPTIONS} />
            </Field>
            <Field label="Grid Size" htmlFor="gridSize" width="w-[134px]">
              <SelectControl id="gridSize" disabled defaultValue="—" options={["—"]} />
            </Field>
            <Field label="New Levels" width="flex-1">
              <LevelsSelect levels={levels} onRemove={removeLevel} />
            </Field>
            <Field label="Puzzles per Level" width="w-[295px]">
              <PuzzlesPerLevel levels={levels} />
            </Field>
          </FormRow>
          <Divider />
          <FormRow>
            <ToggleLeft
              label="Generate a unique AI image for every puzzle"
              on={aiImage}
              onChange={setAiImage}
              className="w-[306px] shrink-0 pt-[6px]"
            />
            <Field label="AI Image Style" htmlFor="imageStyle" width="w-[160px]">
              <SelectControl id="imageStyle" value={imageStyle} onChange={(e) => setImageStyle(e.target.value)} options={IMAGE_STYLE_OPTIONS} />
            </Field>
            <Field label="Image Safety" htmlFor="imageSafety" width="w-[152px]">
              <SelectControl id="imageSafety" value={safety} onChange={(e) => setSafety(e.target.value)} options={SAFETY_OPTIONS} />
            </Field>
            <ToggleRight label="No text in image" on={noText} onChange={setNoText} className="pt-[6px]" />
            <ToggleRight label="Generate Transcript" on={transcript} onChange={setTranscript} className="ml-auto pt-[6px]" />
          </FormRow>
        </FormCard>
        <PreviewHeading />
        <PreviewGrid>
          <PuzzleCard title="Level 1 • Puzzle 1" actions={<CardActions />}>
            <AudioBody
              src={sunImg}
              alt="Level 1 image"
              question="1. What did God create in the beginning?"
              options={["The earth", "The sun", "The heavens and the earth", "The stars"]}
              correctIndex={2}
            />
          </PuzzleCard>
          <PuzzleCard title="Level 2 • Puzzle 1" actions={<CardActions />}>
            <AudioBody
              src={seaWaterImg}
              alt="Level 2 image"
              question="1. What did God create in the beginning?"
              options={["Day", "Day", "Night", "Evening"]}
              correctIndex={0}
            />
          </PuzzleCard>
        </PreviewGrid>
        <PageFooter />
      </div>
    </div>
  );
}