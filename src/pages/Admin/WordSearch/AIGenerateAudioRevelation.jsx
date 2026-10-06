import { useState } from "react";
import sunImg from "../../../assets/word search/sun.png";
import seaWaterImg from "../../../assets/word search/sea water.png";
import {
  LuChevronDown,
  LuChevronUp,
  LuRotateCw,
  LuCheck,
  LuX,
  LuImagePlus,
  LuSave,
  LuArrowRight,
  LuZap,
  LuPencil,
  LuImage,
  LuPlay,
} from "react-icons/lu";

/* ==========================================================================
   TOKENS
   ========================================================================== */
const NAVY = "#041581";
const HEADING = "#0A0847";
const GRAY = "#6B7194";
const BORDER = "#E5E4EC";
const PAGE_BG = "#F9FAFE";
const GREEN = "#16A34A";
const LAVENDER = "#F1EFFC";

/* ==========================================================================
   HEADER FIELDS
   ========================================================================== */
const HEADER_FIELDS = [
  { id: "testament", label: "Testament", value: "Old Testament", options: ["Old Testament", "New Testament"] },
  { id: "book", label: "Book", value: "Genesis", options: ["Genesis", "Exodus", "Psalms", "John"] },
  { id: "chapter", label: "Chapter", value: "1", options: ["1", "2", "3"] },
  { id: "difficulty", label: "Difficulty", value: "Easy", options: ["Easy", "Medium", "Hard"] },
];

const PASSAGE_OPTIONS = ["Creation (Genesis 1)", "Noah's Ark (Genesis 6)", "Abraham's Call (Genesis 12)", "The Exodus (Exodus 14)"];
const VOICE_OPTIONS = ["Male – Warm", "Male – Deep", "Female – Warm", "Female – Soft"];
const AUDIO_LENGTH_OPTIONS = ["1", "2", "3", "4", "5"];
const WORD_BANK_OPTIONS = ["Show", "Hide"];
const PUZZLE_COUNT_OPTIONS = ["1", "2", "3", "4", "5"];
const IMAGE_STYLE_OPTIONS = ["Biblical Illustration", "Watercolour", "Modern Art", "Line Art"];
const SAFETY_OPTIONS = ["Family Safe", "Family Safe (Strict)", "Unfiltered"];

/* ==========================================================================
   PRIMITIVES
   ========================================================================== */
const selectCls =
  "h-[38px] w-full cursor-pointer appearance-none rounded-[6px] border border-[#E5E4EC] bg-white pl-3 pr-8 text-[13px] outline-none focus:border-[#041581]";

const lbl = "mb-1.5 block text-[12px] font-bold";

function Chevron() {
  return (
    <LuChevronDown
      size={15}
      className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2"
      style={{ color: GRAY }}
      aria-hidden
    />
  );
}

function Toggle({ on, onChange, label, color = GREEN }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="relative h-[15px] w-[26px] shrink-0 cursor-pointer rounded-full transition-colors"
      style={{ backgroundColor: on ? color : "#D6D5E4" }}
    >
      <span
        className="absolute top-[2px] h-[11px] w-[11px] rounded-full bg-white shadow-sm transition-all"
        style={{ left: on ? 13 : 2 }}
      />
    </button>
  );
}

function NumberStepper({ value, onChange, label }) {
  return (
    <div className="relative">
      <input
        type="number"
        min="0"
        aria-label={label}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-[38px] w-full rounded-[6px] border border-[#E5E4EC] bg-white pr-8 pl-3 text-[13px] outline-none focus:border-[#041581]"
        style={{ color: HEADING }}
      />
      <span className="pointer-events-none absolute top-1/2 right-2 flex -translate-y-1/2 flex-col">
        <button
          type="button"
          tabIndex={-1}
          aria-label={`Increase ${label}`}
          onClick={() => onChange((n) => (n ?? 0) + 1)}
          className="flex h-[10px] w-[16px] cursor-pointer items-center justify-center text-[#6B7194]"
        >
          <LuChevronUp size={11} />
        </button>
        <button
          type="button"
          tabIndex={-1}
          aria-label={`Decrease ${label}`}
          onClick={() => onChange((n) => Math.max(0, (n ?? 0) - 1))}
          className="flex h-[10px] w-[16px] cursor-pointer items-center justify-center text-[#6B7194]"
        >
          <LuChevronDown size={11} />
        </button>
      </span>
    </div>
  );
}

/* ==========================================================================
   TABS
   ========================================================================== */
const TABS = ["Manual Entry", "CSV Upload", "AI Generate"];

function TabsRow() {
  return (
    <div className="mt-[30px] flex items-stretch border-b border-[#E5E4EC]">
      {TABS.map((t) => {
        const active = t === "AI Generate";
        return (
          <button
            key={t}
            type="button"
            className={`h-[50px] px-6 text-[15px] ${
              active ? "-mb-px border-b-2 font-bold" : "font-normal"
            }`}
            style={{
              borderColor: active ? NAVY : "transparent",
              color: active ? NAVY : GRAY,
            }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

/* ==========================================================================
   AUDIO REVELATION AI GENERATE FORM
   ========================================================================== */
function AudioForm() {
  const [passage, setPassage] = useState(PASSAGE_OPTIONS[0]);
  const [voice, setVoice] = useState(VOICE_OPTIONS[0]);
  const [audioLength, setAudioLength] = useState(AUDIO_LENGTH_OPTIONS[3]);
  const [wordBank, setWordBank] = useState(WORD_BANK_OPTIONS[0]);
  const [preserve, setPreserve] = useState(true);
  const [count, setCount] = useState(PUZZLE_COUNT_OPTIONS[1]);
  const [gridSize, setGridSize] = useState("—");
  const [levels, setLevels] = useState(["Level 1", "Level 2"]);
  const [aiImage, setAiImage] = useState(true);
  const [imageStyle, setImageStyle] = useState(IMAGE_STYLE_OPTIONS[0]);
  const [safety, setSafety] = useState(SAFETY_OPTIONS[0]);
  const [noText, setNoText] = useState(true);
  const [transcript, setTranscript] = useState(true);

  const removeLevel = (lv) => setLevels((p) => p.filter((x) => x !== lv));

  return (
    <div
      className="flex w-full flex-col rounded-[7.5px] border bg-white pt-4 pr-7 pb-4 pl-[27px]"
      style={{ borderWidth: "0.75px", borderColor: BORDER }}
    >
      {/* ROW 1 — 5 items */}
      <div className="flex items-start gap-[10px]">
        <div className="w-[180px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>Passage / Topic</label>
          <div className="relative">
            <select value={passage} onChange={(e) => setPassage(e.target.value)} className={selectCls} style={{ color: HEADING }}>
              {PASSAGE_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
            <Chevron />
          </div>
        </div>

        <div className="w-[180px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>AI Narration Voice</label>
          <div className="relative">
            <select value={voice} onChange={(e) => setVoice(e.target.value)} className={selectCls} style={{ color: HEADING }}>
              {VOICE_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
            <Chevron />
          </div>
        </div>

        <div className="w-[120px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>Audio Length</label>
          <div className="relative">
            <select value={audioLength} onChange={(e) => setAudioLength(e.target.value)} className={selectCls} style={{ color: HEADING }}>
              {AUDIO_LENGTH_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
            <Chevron />
          </div>
        </div>

        <div className="w-[120px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>Word Bank</label>
          <div className="relative">
            <select value={wordBank} onChange={(e) => setWordBank(e.target.value)} className={selectCls} style={{ color: HEADING }}>
              {WORD_BANK_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
            <Chevron />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex h-[38px] items-center gap-2">
            <span className="text-[12px] font-bold whitespace-nowrap" style={{ color: HEADING }}>
              Preserve Verse Wording
            </span>
            <Toggle on={preserve} onChange={setPreserve} label="Preserve Verse Wording" />
          </div>
        </div>
      </div>

      {/* divider */}
      <div className="my-[14px] h-px w-full" style={{ backgroundColor: BORDER }} />

      {/* ROW 2 — 4 items */}
      <div className="flex items-start gap-[10px]">
        <div className="w-[150px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>Number of Puzzles</label>
          <div className="relative">
            <select value={count} onChange={(e) => setCount(e.target.value)} className={selectCls} style={{ color: HEADING }}>
              {PUZZLE_COUNT_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
            <Chevron />
          </div>
        </div>

        <div className="w-[150px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>Grid Size</label>
          <div className="relative">
            <select
              disabled
              value={gridSize}
              onChange={(e) => setGridSize(e.target.value)}
              className={`${selectCls} cursor-not-allowed`}
              style={{ color: GRAY, backgroundColor: "#F9F9FB" }}
            >
              <option>—</option>
            </select>
            <Chevron />
          </div>
        </div>

        <div className="w-[280px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>New Levels</label>
          <div className="flex h-[38px] w-full items-center gap-1.5 rounded-[6px] border border-[#E5E4EC] bg-white px-2">
            {levels.map((lv) => (
              <span
                key={lv}
                className="flex h-[24px] shrink-0 items-center gap-1 rounded-[5px] px-2 text-[12px] font-semibold"
                style={{ backgroundColor: LAVENDER, color: NAVY }}
              >
                {lv}
                <button
                  type="button"
                  aria-label={`Remove ${lv}`}
                  onClick={() => removeLevel(lv)}
                  className="cursor-pointer"
                  style={{ color: NAVY }}
                >
                  <LuX size={11} />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <label className={lbl} style={{ color: HEADING }}>Puzzles per Level</label>
          <div
            className="flex h-[38px] items-center gap-3 rounded-[6px] border border-[#E5E4EC] bg-white px-3 text-[12px]"
            style={{ color: HEADING }}
          >
            {levels.map((lv) => (
              <span key={lv} className="whitespace-nowrap">
                <span className="font-bold">{lv}:</span> 1
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 3 — 5 items */}
      <div className="mt-[10px] flex items-start gap-[10px]">
        <div className="w-[292px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>Generate a unique AI image for every puzzle</label>
          <div className="flex h-[38px] items-center">
            <Toggle on={aiImage} onChange={setAiImage} label="Generate a unique AI image for every puzzle" />
          </div>
        </div>

        <div className="w-[178px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>AI Image Style</label>
          <div className="relative">
            <select value={imageStyle} onChange={(e) => setImageStyle(e.target.value)} className={selectCls} style={{ color: HEADING }}>
              {IMAGE_STYLE_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
            <Chevron />
          </div>
        </div>

        <div className="w-[145px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>Image Safety</label>
          <div className="relative">
            <select value={safety} onChange={(e) => setSafety(e.target.value)} className={selectCls} style={{ color: HEADING }}>
              {SAFETY_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
            </select>
            <Chevron />
          </div>
        </div>

        <div className="w-[150px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>No text in image</label>
          <div className="flex h-[38px] items-center">
            <Toggle on={noText} onChange={setNoText} label="No text in image" />
          </div>
        </div>

        <div className="w-[150px] shrink-0">
          <label className={lbl} style={{ color: HEADING }}>Generate Transcript</label>
          <div className="flex h-[38px] items-center">
            <Toggle on={transcript} onChange={setTranscript} label="Generate Transcript" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   PUZZLE CARD
   ========================================================================== */
const WAVEFORM = [4, 8, 12, 6, 10, 14, 7, 11, 5, 9, 13, 6, 10, 8, 4, 7, 11, 5, 9, 12, 6, 8, 10, 4, 6, 9, 7, 11, 5, 8];

function ImagePlaceholder({ src, alt }) {
  if (src) {
    return (
      <div
        className="flex h-[225px] w-[250px] shrink-0 items-center justify-center overflow-hidden rounded-lg"
        style={{ backgroundColor: "#F3F4F6" }}
      >
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div
      className="flex h-[225px] w-[250px] shrink-0 items-center justify-center rounded-lg"
      style={{ backgroundColor: "#F3F4F6" }}
    >
      <LuImage size={28} style={{ color: "#9CA3AF" }} aria-hidden />
    </div>
  );
}

function AudioPlayer() {
  return (
    <div
      className="mt-3 flex h-[38px] items-center gap-3 rounded-[7px] border px-3"
      style={{ borderColor: BORDER, backgroundColor: "#FAFAFD" }}
    >
      <button
        type="button"
        aria-label="Play audio"
        className="flex h-[26px] w-[26px] shrink-0 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-90"
        style={{ backgroundColor: NAVY }}
      >
        <LuPlay size={11} className="text-white" fill="white" aria-hidden />
      </button>

      <div className="flex h-full min-w-0 flex-1 items-center gap-[3px] overflow-hidden">
        {WAVEFORM.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-full"
            style={{ height: h, backgroundColor: i % 4 === 0 ? NAVY : "#B9BAD1", minWidth: "1px" }}
          />
        ))}
      </div>

      <span className="flex-shrink-0 text-[11px] whitespace-nowrap" style={{ color: GRAY }}>
        0:00 / 0:30
      </span>
    </div>
  );
}

function AudioOption({ option, index, correct }) {
  return (
    <div className="flex items-start gap-2">
      <span
        className={`mt-[2px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full ${
          correct ? "" : "border"
        }`}
        style={
          correct
            ? { backgroundColor: GREEN }
            : { borderWidth: "1.5px", borderColor: "#C3C4D4" }
        }
      >
        {correct && <LuCheck size={10} className="text-white" aria-hidden />}
      </span>
      <span className="text-[13px] leading-[1.4]" style={{ color: correct ? GREEN : HEADING }}>
        {`${String.fromCharCode(65 + index)}. ${option}`}
      </span>
    </div>
  );
}

function AudioPuzzleCard({ level, puzzle, question, options, correctIndex }) {
  return (
    <div
      className="flex w-full flex-col rounded-[7.5px] border bg-white pt-[15px] pr-[21px] pb-[28px] pl-5"
      style={{ minHeight: "413px", borderWidth: "0.75px", borderColor: BORDER }}
    >
      {/* top row */}
      <div className="flex items-start justify-between">
        <p className="text-[13px] font-bold" style={{ color: HEADING }}>
          {level} • Puzzle {puzzle}
        </p>
        <span
          className="flex h-[20px] items-center rounded-[10px] px-2.5 text-[10px] font-bold tracking-[0.4px]"
          style={{ backgroundColor: "#E3F7E6", color: GREEN }}
        >
          AI IMAGE
        </span>
      </div>

      {/* 2-column body — image placeholder left, audio content right */}
      <div className="mt-3 flex flex-1 items-start gap-5">
        <ImagePlaceholder src={level === "Level 1" ? sunImg : seaWaterImg} alt={`${level} image`} />

        <div className="min-w-0 flex-1">
          <p className="text-[13px]" style={{ color: GRAY }}>
            Listen to the audio. Then answer the question.
          </p>

          <AudioPlayer />

          <p className="mt-3 text-[14px] font-bold" style={{ color: HEADING }}>
            {question}
          </p>

          <div className="mt-2.5 space-y-2">
            {options.map((opt, i) => (
              <AudioOption key={`${opt}-${i}`} option={opt} index={i} correct={i === correctIndex} />
            ))}
          </div>
        </div>
      </div>

      {/* button row 1 */}
      <div className="mt-3 flex items-center gap-2">
        <SmallOutline icon={LuRotateCw} label="Regenerate Puzzle" />
        <SmallOutline icon={LuZap} label="Regenerate Image" />
        <SmallOutline icon={LuImagePlus} label="Replace Image" />
      </div>

      {/* button row 2 */}
      <div className="mt-2 flex items-center gap-2">
        <SmallOutline icon={LuPencil} label="Edit" />
        <button
          type="button"
          className="flex h-[30px] cursor-pointer items-center gap-1.5 rounded-[6px] px-3 text-[12px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: NAVY }}
        >
          <LuCheck size={13} />
          Publish Approved
        </button>
      </div>
    </div>
  );
}

function SmallOutline({ icon: Icon, label }) {
  return (
    <button
      type="button"
      className="flex h-[30px] cursor-pointer items-center gap-1.5 rounded-[6px] border px-3 text-[12px] font-semibold transition-colors hover:bg-[#F7F8FE]"
      style={{ borderColor: NAVY, color: NAVY }}
    >
      <Icon size={13} />
      {label}
    </button>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AIGenerateAudioRevelation() {
  const [points, setPoints] = useState(10);
  const [values, setValues] = useState(() =>
    HEADER_FIELDS.reduce((acc, f) => ({ ...acc, [f.id]: f.value }), {}),
  );

  return (
    <div
      className="min-h-[calc(100vh-72px)]"
      style={{
        backgroundColor: PAGE_BG,
        color: HEADING,
        fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="mx-auto max-w-[1119px] px-5 py-6">
        {/* page header */}
        <h1 className="text-[22px] font-bold" style={{ color: HEADING }}>
          Add / Edit Word Search
        </h1>
        <p className="mt-1 text-[14px]" style={{ color: GRAY }}>
          Choose the activity type and how you want to create it.
        </p>

        {/* filter fields */}
        <div className="mt-6 grid grid-cols-5 gap-4">
          {HEADER_FIELDS.map(({ id, label, options }) => (
            <div key={id}>
              <label htmlFor={id} className={lbl} style={{ color: HEADING }}>
                {label}
              </label>
              <div className="relative">
                <select
                  id={id}
                  value={values[id]}
                  onChange={(e) => setValues((p) => ({ ...p, [id]: e.target.value }))}
                  className={selectCls}
                  style={{ color: HEADING }}
                >
                  {options.map((o) => (<option key={o} value={o}>{o}</option>))}
                </select>
                <Chevron />
              </div>
            </div>
          ))}

          <div>
            <label htmlFor="points" className={lbl} style={{ color: HEADING }}>
              Points per Puzzle
            </label>
            <NumberStepper value={points} onChange={setPoints} label="Points per Puzzle" />
          </div>
        </div>

        <TabsRow />

        {/* section heading */}
        <h2 className="mt-[30px] text-[22px] font-bold" style={{ color: HEADING }}>
          AI Generate — Audio Revelation
        </h2>
        <p className="mt-1 text-[13px]" style={{ color: GRAY }}>
          Generate puzzles with audio clues for listening and answering.
        </p>

        {/* AI generate form */}
        <div className="mt-6">
          <AudioForm />
        </div>

        {/* generated puzzles preview */}
        <h3 className="mt-8 text-[15px] font-bold" style={{ color: HEADING }}>
          Generated Puzzles Preview
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-[21px]">
          <AudioPuzzleCard
            level="Level 1"
            puzzle={1}
            question="1. What did God create in the beginning?"
            options={["The earth", "The sun", "The heavens and the earth", "The stars"]}
            correctIndex={2}
          />
          <AudioPuzzleCard
            level="Level 2"
            puzzle={1}
            question="2. What did God call the light?"
            options={["Day", "Day", "Night", "Evening"]}
            correctIndex={0}
          />
        </div>

        {/* bottom page actions */}
        <div className="mt-8 flex items-center justify-between gap-4 pb-6">
          <button
            type="button"
            className="flex h-[44px] cursor-pointer items-center rounded-[6px] border px-4 text-[13px] font-semibold transition-colors hover:bg-[#F0F2FB]"
            style={{ borderColor: NAVY, color: NAVY }}
          >
            Cancel
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="flex h-[44px] cursor-pointer items-center gap-2 rounded-[6px] border px-4 text-[13px] font-semibold transition-colors hover:bg-[#F0F2FB]"
              style={{ borderColor: NAVY, color: NAVY }}
            >
              <LuSave size={15} />
              Save draft
            </button>
            <button
              type="button"
              className="flex h-[44px] cursor-pointer items-center gap-2 rounded-[6px] px-4 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: NAVY }}
            >
              <LuArrowRight size={15} />
              Publish Approved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}