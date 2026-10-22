import { useState } from "react";
import earthImg from "../../../assets/word search/earth.webp";
import waterImg from "../../../assets/word search/water.webp";
import floppyIcon from "../../../assets/word search/dr_save_floppy.svg";
import {
  LuChevronDown,
  LuChevronUp,
  LuRotateCw,
  LuX,
  LuArrowRight,
  LuPencil,
  LuImage,
} from "react-icons/lu";


const NAVY = "#001984";                 
const HEADING = "#0A0847";
const LABEL = "rgba(10,8,71,0.8)";      
const VALUE = "rgba(10,8,71,0.6)";      
const BORDER = "#E2DFFC";               
const PAGE_BG = "#F9FAFE";
const GREEN = "#55BD7A";                
const BADGE_BG = "#E9F8E8";
const BADGE_TEXT = "#16A34A";
const LAVENDER = "#F1EFFC";


const HEADER_FIELDS = [
  { id: "testament", label: "Testament", value: "Old Testament", options: ["Old Testament", "New Testament"] },
  { id: "book", label: "Book", value: "Genesis", options: ["Genesis", "Exodus", "Psalms", "John"] },
  { id: "chapter", label: "Chapter", value: "1", options: ["1", "2", "3"] },
  { id: "difficulty", label: "Difficulty", value: "Easy", options: ["Easy", "Medium", "Hard"] },
];

const VERSE_RANGE_OPTIONS = ["Genesis 1:1–5", "Genesis 1:1–8", "Genesis 1 — Full Chapter"];
const TRANSLATION_OPTIONS = [
  "English Standard Version (ESV)",
  "New International Version (NIV)",
  "King James Version (KJV)",
  "New Living Translation (NLT)",
];
const MISSING_OPTIONS = ["2", "3", "4", "5", "6"];
const WORD_BANK_OPTIONS = ["Show", "Hide"];
const PUZZLE_COUNT_OPTIONS = ["1", "2", "3", "4", "5"];
const IMAGE_STYLE_OPTIONS = ["Biblical Illustration", "Watercolour", "Modern Art", "Line Art"];
const SAFETY_OPTIONS = ["Family Safe", "Family Safe (Strict)", "Unfiltered"];



const selectCls =
  "h-[40px] w-full cursor-pointer appearance-none rounded-[7.47px] border border-[#E2DFFC] bg-white py-[10px] pl-3 pr-9 text-[12px] font-medium leading-none outline-none focus:border-[#001984]";


const lbl = "mb-2 block text-[12px] font-semibold leading-none";

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

/* Defined at module level (not inside VerseForm) so it isn't re-created on every render. */
function FormSelect({ id, value, onChange, options, className = "w-full" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectCls}
        style={{ color: VALUE }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Chevron />
    </div>
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

function NumberStepper({ id, value, onChange, label }) {
  return (
    <div className="relative">
      <input
        id={id}
        type="number"
        min="0"
        aria-label={label}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-[40px] w-full rounded-[7.47px] border border-[#E2DFFC] bg-white py-[10px] pr-8 pl-3 text-[12px] font-medium leading-none outline-none focus:border-[#001984]"
        style={{ color: VALUE }}
      />
      <span className="absolute top-1/2 right-3 flex -translate-y-1/2 flex-col">
        <button
          type="button"
          tabIndex={-1}
          aria-label={`Increase ${label}`}
          onClick={() => onChange(value + 1)}
          className="flex h-[10px] w-[14px] cursor-pointer items-center justify-center"
          style={{ color: HEADING }}
        >
          <LuChevronUp size={11} />
        </button>
        <button
          type="button"
          tabIndex={-1}
          aria-label={`Decrease ${label}`}
          onClick={() => onChange(Math.max(0, value - 1))}
          className="flex h-[10px] w-[14px] cursor-pointer items-center justify-center"
          style={{ color: HEADING }}
        >
          <LuChevronDown size={11} />
        </button>
      </span>
    </div>
  );
}


function ImageSparkleIcon({ size = 10.5 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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
      <path d="M7 12.4l3.3 3.3L17 9" fill="none" stroke={NAVY} strokeWidth="2.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


const TABS = ["Manual Entry", "CSV Upload", "AI Generate"];

/* Tabs share the width on mobile; original padding from sm up. */
function TabsRow() {
  return (
    <div className="mt-[30px] flex items-stretch overflow-x-auto border-b" style={{ borderColor: BORDER }}>
      {TABS.map((t) => {
        const active = t === "AI Generate";
        return (
          <button
            key={t}
            type="button"
            className={`-mb-px min-w-0 flex-1 whitespace-nowrap px-2 pb-[18px] text-[14px] leading-none sm:flex-none sm:px-8 ${
              active ? "border-b-2 font-semibold" : "font-medium"
            }`}
            style={{
              borderColor: active ? NAVY : "transparent",
              color: active ? NAVY : VALUE,
            }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}


/* Each row: 2-col grid on mobile (wide fields span both), original flex row from sm up. */
function VerseForm() {
  const [verseRange, setVerseRange] = useState(VERSE_RANGE_OPTIONS[0]);
  const [translation, setTranslation] = useState(TRANSLATION_OPTIONS[0]);
  const [missing, setMissing] = useState(MISSING_OPTIONS[2]);
  const [wordBank, setWordBank] = useState(WORD_BANK_OPTIONS[0]);
  const [preserve, setPreserve] = useState(true);
  const [count, setCount] = useState("2");
  const [levels, setLevels] = useState(["Level 1", "Level 2"]);
  const [aiImage, setAiImage] = useState(true);
  const [imageStyle, setImageStyle] = useState(IMAGE_STYLE_OPTIONS[0]);
  const [safety, setSafety] = useState(SAFETY_OPTIONS[0]);
  const [noText, setNoText] = useState(true);

  const removeLevel = (lv) => setLevels((p) => p.filter((x) => x !== lv));

  const row = "grid grid-cols-2 gap-x-3 gap-y-4 sm:flex sm:flex-wrap sm:items-start sm:gap-6";

  return (
    <div
      className="flex w-full flex-col rounded-[7.5px] border bg-white px-4 pt-4 pb-4 sm:pr-7 sm:pl-[27px]"
      style={{ borderWidth: "0.75px", borderColor: BORDER }}
    >
      <div className={`${row} items-end`}>
        <div className="col-span-2 w-full sm:col-auto sm:w-[190px] sm:shrink-0">
          <label className={lbl} style={{ color: LABEL }}>Verse Range</label>
          <FormSelect value={verseRange} onChange={setVerseRange} options={VERSE_RANGE_OPTIONS} />
        </div>
        <div className="col-span-2 w-full sm:col-auto sm:w-[228px] sm:shrink-0">
          <label className={lbl} style={{ color: LABEL }}>Bible Translation</label>
          <FormSelect value={translation} onChange={setTranslation} options={TRANSLATION_OPTIONS} />
        </div>
        <div className="w-full sm:w-[163px] sm:shrink-0">
          <label className={`${lbl} sm:whitespace-nowrap`} style={{ color: LABEL }}>Missing Words per Verse</label>
          <FormSelect value={missing} onChange={setMissing} options={MISSING_OPTIONS} />
        </div>
        <div className="w-full sm:w-[131px] sm:shrink-0">
          <label className={lbl} style={{ color: LABEL }}>Word Bank</label>
          <FormSelect value={wordBank} onChange={setWordBank} options={WORD_BANK_OPTIONS} />
        </div>
        <div className="col-span-2 flex min-w-0 items-center gap-3 sm:col-auto sm:flex-1 sm:pt-6">
          <span className="whitespace-nowrap text-[12px] font-semibold leading-none" style={{ color: LABEL }}>
            Preserve Verse Wording
          </span>
          <Toggle on={preserve} onChange={setPreserve} label="Preserve Verse Wording" />
        </div>
      </div>

      <div className="mt-[19px] mb-[21px] h-px w-full" style={{ backgroundColor: BORDER }} />

      <div className={row}>
        <div className="w-full sm:w-[169px] sm:shrink-0">
          <label className={lbl} style={{ color: LABEL }}>Number of Puzzles</label>
          <FormSelect value={count} onChange={setCount} options={PUZZLE_COUNT_OPTIONS} />
        </div>

        <div className="w-full sm:w-[133px] sm:shrink-0">
          <label className={lbl} style={{ color: LABEL }}>Grid Size</label>
          <div className="relative">
            <select
              disabled
              value="—"
              onChange={() => {}}
              className={`${selectCls} cursor-not-allowed`}
              style={{ color: VALUE }}
            >
              <option>—</option>
            </select>
            <Chevron />
          </div>
        </div>

        <div className="col-span-2 w-full sm:col-auto sm:w-[335px] sm:shrink-0">
          <label className={lbl} style={{ color: LABEL }}>New Levels</label>
          <div
            className="flex min-h-[40px] w-full flex-wrap items-center gap-2 rounded-[7.47px] border bg-white px-3 py-[6px]"
            style={{ borderColor: BORDER }}
          >
            {levels.map((lv) => (
              <span
                key={lv}
                className="flex h-[23px] shrink-0 items-center gap-1.5 rounded-[6px] px-2.5 text-[11px] font-medium leading-none"
                style={{ backgroundColor: LAVENDER, color: HEADING }}
              >
                {lv}
                <button type="button" aria-label={`Remove ${lv}`} onClick={() => removeLevel(lv)} className="cursor-pointer" style={{ color: "#0926FD" }}>
                  <LuX size={11} strokeWidth={2.5} />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="col-span-2 min-w-0 sm:col-auto sm:flex-1">
          <label className={lbl} style={{ color: LABEL }}>Puzzles per Level</label>
          <div
            className="flex min-h-[40px] flex-wrap items-center gap-x-6 gap-y-1 rounded-[7.47px] border bg-white px-3 py-2 text-[12px] font-medium leading-none sm:py-0"
            style={{ borderColor: BORDER, color: VALUE }}
          >
            {levels.map((lv) => (
              <span key={lv} className="whitespace-nowrap">{lv}: 1</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[19px] mb-[21px] h-px w-full" style={{ backgroundColor: BORDER }} />

      <div className={row}>
        <div className="col-span-2 flex w-full items-center gap-3.5 sm:col-auto sm:w-[333px] sm:shrink-0 sm:pt-[6px]">
          <Toggle on={aiImage} onChange={setAiImage} label="Generate a unique AI image for every puzzle" />
          <span className="text-[12px] font-semibold leading-[1.3]" style={{ color: LABEL }}>
            Generate a unique AI image for every puzzle
          </span>
        </div>

        <div className="w-full sm:w-[202px] sm:shrink-0">
          <label className={lbl} style={{ color: LABEL }}>AI Image Style</label>
          <FormSelect
            value={imageStyle}
            onChange={setImageStyle}
            options={IMAGE_STYLE_OPTIONS}
            className="w-full sm:w-[173px]"
          />
        </div>

        <div className="w-full sm:w-[178px] sm:shrink-0">
          <label className={lbl} style={{ color: LABEL }}>Image Safety</label>
          <FormSelect
            value={safety}
            onChange={setSafety}
            options={SAFETY_OPTIONS}
            className="w-full sm:w-[149px]"
          />
        </div>

        <div className="col-span-2 flex min-w-0 items-center gap-6 sm:col-auto sm:flex-1 sm:pt-[6px]">
          <span className="whitespace-nowrap text-[12px] font-semibold leading-none" style={{ color: LABEL }}>
            No text in image
          </span>
          <Toggle on={noText} onChange={setNoText} label="No text in image" />
        </div>
      </div>
    </div>
  );
}


const CARD_TITLE = "Restore the missing words in Genesis 1:1–3 (ESV)";
const CARD_VERSES = [
  "In the beginning, God created the _____ and the _____.",
  "The earth was _____ and _____, and darkness was over the _____ of the deep. And the Spirit of God was hovering over the _____.",
  "And God said, “Let there be _____,” and there was light.",
];

const CARD_2_TITLE = "Restore the missing words in Genesis 1:4–5 (ESV)";
const CARD_2_VERSES = [
  "And God saw that the light was _____, and God _____ the light from the darkness.",
  "God called the light _____, and the darkness he called _____. And there was evening and there was morning, the _____ day.",
];

function ImagePlaceholder({ src, alt }) {
  return (
    <div
      className="flex h-[225px] w-full max-w-[229px] shrink-0 items-center justify-center overflow-hidden rounded-[8px]"
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


function SmallOutline({ icon: Icon, label }) {
  return (
    <button
      type="button"
      className="flex h-[32px] cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[8px] border bg-white px-[10px] text-[11px] font-semibold leading-none transition-colors hover:bg-[#F7F8FE]"
      style={{ borderColor: BORDER, color: LABEL }}
    >
      <span className="flex items-center" style={{ color: NAVY }}>
        <Icon size={10.5} />
      </span>
      {label}
    </button>
  );
}

function VersePuzzleCard({ level, puzzle, title = CARD_TITLE, verses = CARD_VERSES, listStyle = "ol" }) {
  const List = listStyle === "ol" ? "ol" : "ul";
  const leading = listStyle === "ol" ? "leading-[24px]" : "leading-[26px]";

  return (
    <div
      className="flex w-full min-w-0 flex-col rounded-[7.5px] border bg-white px-4 pt-[15px] pb-[28px] sm:pr-[21px] sm:pl-5"
      style={{ minHeight: "413px", borderWidth: "0.75px", borderColor: BORDER }}
    >
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-medium leading-[24px]" style={{ color: LABEL }}>
          {level} • Puzzle {puzzle}
        </p>
        <span
          className="flex h-[24px] items-center rounded-[8px] px-3 text-[11px] font-medium leading-none"
          style={{ backgroundColor: BADGE_BG, color: BADGE_TEXT }}
        >
          AI IMAGE
        </span>
      </div>

      <div className="mt-[10px] flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <ImagePlaceholder src={level === "Level 1" ? earthImg : waterImg} alt={`${level} image`} />

        <div className="w-full max-w-[229px] shrink-0">
          <p className="text-justify text-[10px] font-bold leading-[12px]" style={{ color: LABEL }}>
            {title}
          </p>
          <List className="mt-2 text-justify">
            {verses.map((v, i) => (
              <li key={i} className={`flex items-start gap-1.5 text-[10px] font-medium ${leading}`} style={{ color: VALUE }}>
                <span className="shrink-0">{listStyle === "ol" ? `${i + 1}.` : "•"}</span>
                <span className="text-justify">{v}</span>
              </li>
            ))}
          </List>
        </div>
      </div>

      <div className="mt-[14px] flex flex-wrap items-center gap-2.5">
        <SmallOutline icon={LuRotateCw} label="Regenerate Puzzle" />
        <SmallOutline icon={ImageSparkleIcon} label="Regenerate Image" />
        <SmallOutline icon={ImageSparkleIcon} label="Replace Image" />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2.5">
        <SmallOutline icon={LuPencil} label="Edit" />
        <button
          type="button"
          className="flex h-[32px] cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[8px] px-[10px] text-[11px] font-semibold leading-none text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: NAVY }}
        >
          <CircleCheckFilled size={14} />
          Publish Approved
        </button>
      </div>
    </div>
  );
}


export default function AIGenerateVerseRestoration() {
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
      <div className="mx-auto w-full max-w-[1102px] px-4 py-6 sm:px-5">
        <h1 className="text-[22px] font-semibold leading-[1.2]" style={{ color: HEADING }}>
          Add / Edit Word Search
        </h1>
        <p className="mt-3 text-[14px] leading-[1.35]" style={{ color: VALUE }}>
          Choose the activity type and how you want to create it.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-6 lg:grid-cols-5">
          {HEADER_FIELDS.map(({ id, label, options }) => (
            <div key={id}>
              <label htmlFor={id} className={lbl} style={{ color: LABEL }}>{label}</label>
              <FormSelect
                id={id}
                value={values[id]}
                onChange={(v) => setValues((p) => ({ ...p, [id]: v }))}
                options={options}
              />
            </div>
          ))}

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="points" className={lbl} style={{ color: LABEL }}>Points per Puzzle</label>
            <NumberStepper id="points" value={points} onChange={setPoints} label="Points per Puzzle" />
          </div>
        </div>

        <TabsRow />

        <h2 className="mt-[30px] text-[20px] font-semibold leading-[1.2] sm:text-[22px]" style={{ color: HEADING }}>
          AI Generate — Verse Restoration
        </h2>
        <p className="mt-3 text-[14px] leading-[1.35] sm:text-[16px]" style={{ color: VALUE }}>
          Generate puzzles where players restore missing words in Bible verses.
        </p>

        <div className="mt-6">
          <VerseForm />
        </div>

        <h3 className="mt-[26px] text-[14px] font-semibold leading-none" style={{ color: LABEL }}>
          Generated Puzzles Preview
        </h3>

        {/* Two columns only from xl: each card needs ~519px for image + text. */}
        <div className="mt-4 grid grid-cols-1 gap-[21px] xl:grid-cols-2">
          <VersePuzzleCard level="Level 1" puzzle={1} listStyle="ol" />
          <VersePuzzleCard level="Level 2" puzzle={1} title={CARD_2_TITLE} verses={CARD_2_VERSES} listStyle="ul" />
        </div>

        <div className="mt-[40px] flex flex-col-reverse gap-3 pb-6 sm:mt-[44px] sm:flex-row sm:items-center sm:justify-end sm:gap-4">
          <button
            type="button"
            className="flex h-[38px] w-full cursor-pointer items-center justify-center rounded-[7.47px] border bg-white text-[12px] font-semibold transition-colors hover:bg-[#F0F2FB] sm:w-[89px]"
            style={{ borderColor: BORDER, color: HEADING }}
          >
            Cancel
          </button>

          <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center">
            <button
              type="button"
              className="flex h-[38px] w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[7.47px] border bg-white text-[12px] font-semibold transition-colors hover:bg-[#F0F2FB] sm:w-[124px]"
              style={{ borderColor: BORDER, color: HEADING }}
            >
              <img src={floppyIcon} alt="" aria-hidden className="h-[16px] w-[16px] shrink-0 object-contain" />
              Save draft
            </button>
            <button
              type="button"
              className="flex h-[38px] w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[7.47px] text-[12px] font-semibold text-white transition-opacity hover:opacity-90 sm:w-[190px]"
              style={{ backgroundColor: NAVY }}
            >
              <LuArrowRight size={14} />
              Publish Approved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}