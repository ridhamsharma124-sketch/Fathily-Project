import { useState } from "react";
import lionImg from "../../../assets/word search/lion1.webp";
import lion2Img from "../../../assets/word search/lion2.webp";
import floppyIcon from "../../../assets/word search/dr_save_floppy.svg";


const NAVY = "#001984"; 
const HEADING = "#0A0847";
const TEXT_80 = "rgba(10,8,71,0.8)"; 
const TEXT_60 = "rgba(10,8,71,0.6)"; 
const BORDER = "#E5E4EC"; 
const CARD_BORDER = "#E2DFFC"; 
const DIVIDER = "rgba(10,8,71,0.1)"; 
const PAGE_BG = "#F9FAFE";
const TOGGLE_ON = "#4EB179"; 
const CHIP_BG = "#F5F4FE";
const BADGE_GREEN = "#21AC1C";


const HEADER_FIELDS = [
  { id: "testament", label: "Testament", value: "Old Testament", options: ["Old Testament", "New Testament"] },
  { id: "book", label: "Book", value: "Genesis", options: ["Genesis", "Exodus", "Psalms", "John"] },
  { id: "chapter", label: "Chapter", value: "1", options: ["1", "2", "3"] },
  { id: "difficulty", label: "Difficulty", value: "Easy", options: ["Easy", "Medium", "Hard"] },
];

const HEADER_COL_W = ["w-[220px]", "w-[186px]", "w-[158px]", "w-[195px]", "min-w-0 flex-1"];

const TOPIC_OPTIONS = ["Creation (Genesis 1)", "Creation (Genesis 1:1-8)", "Genesis 1 — Full Chapter"];
const CLUE_STYLE_OPTIONS = ["Short Clues", "Long Clues", "Mixed Clues"];
const UNIQUE_OPTIONS = ["High (No Duplicates)", "Medium", "Low"];
const PUZZLE_COUNT_OPTIONS = ["1", "2", "3", "4", "5"];
const GRID_OPTIONS = ["10 x 10", "12 x 12", "15 x 15", "20 x 20"];
const IMAGE_STYLE_OPTIONS = ["Biblical Illustration", "Watercolour", "Modern Art", "Line Art"];
const SAFETY_OPTIONS = ["Family Safe", "Family Safe (Strict)", "Unfiltered"];
const LEVEL_OPTIONS = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];


const LEVEL1_ROWS = ["LIGHTSOFCREDH", "EAVENWATERSA", "YVEINDGIOORFI", "SHBIRDSCASEAR", "TFNDAYFOU"];
const LEVEL2_ROWS = [
  "LIGHTSOFCREDH",
  "EAVENWATERSA",
  "YVEINDGIOORFI",
  "SHBIRDSCASEAR",
  "TFNDAYFOULIGH",
  "TSOFCREDHEAVE",
  "NWATERSAYVEIN",
  "DGIOORFISHBIR",
  "DSCASEARTFND",
  "AYFOU",
];
const CLUES = [
  "The expanse above the earth",
  "The waters separated together",
  "Made on the fifth day",
  "The planet we live on",
  "The day God began",
  "The light which is on the day",
];



function ChevronSvg({ up = false }) {
  return (
    <svg
      width="7.5"
      height="4.84"
      viewBox="0 0 8 5"
      fill="none"
      aria-hidden
      style={{ transform: up ? "rotate(180deg)" : undefined }}
    >
      <path d="M0.75 0.75 4 4 7.25 0.75" stroke={TEXT_60} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


function RefreshIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8M21 3v5h-5"
        stroke={NAVY}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


function ImageSparkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M6.3 3H2.8A1.8 1.8 0 0 0 1 4.8v5A1.8 1.8 0 0 0 2.8 11.6h4.6a1.8 1.8 0 0 0 1.8-1.8V6.7"
        stroke={NAVY}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <circle cx="5.6" cy="5.9" r="0.85" stroke={NAVY} strokeWidth="1" />
      <path d="M1.2 8.7C3.2 7.7 5.3 8.2 6.7 10.3L7.2 11.3" stroke={NAVY} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M6.3 9.2c1-.6 1.9-.7 2.9-.5" stroke={NAVY} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M10.6 0.5 11.4 2.4 13.3 3.2 11.4 4 10.6 5.9 9.8 4 7.9 3.2 9.8 2.4Z" fill={NAVY} />
    </svg>
  );
}


function PencilIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"
        stroke={NAVY}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


function CheckCircleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="7" fill="#fff" />
      <path d="M4 7.2 6.1 9.3 10 5" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


function EyeIcon() {
  return (
    <svg width="16" height="11.25" viewBox="0 0 16 11.25" fill="none" aria-hidden>
      <path
        d="M0.8 5.625C2.4 2.4 5 0.8 8 0.8s5.6 1.6 7.2 4.825C13.6 8.85 11 10.45 8 10.45S2.4 8.85 0.8 5.625Z"
        stroke={NAVY}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="5.625" r="2.1" stroke={NAVY} strokeWidth="1.4" />
    </svg>
  );
}

function CloseSvg() {
  return (
    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" aria-hidden>
      <path d="M1 1 6 6M6 1 1 6" stroke="#0926FD" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PlusSvg() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
      <path d="M4.5 1v7M1 4.5h7" stroke={NAVY} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}


const selectCls =
  "h-[40px] w-full cursor-pointer appearance-none rounded-[6px] border border-[#E5E4EC] bg-white pl-3 pr-[34px] text-[12px] font-medium leading-[15px] outline-none focus:border-[#001984]";


const lblCls = "mb-[8px] block text-[12px] font-semibold leading-[15px]";

function Label({ children, htmlFor, center = false }) {
  return (
    <label htmlFor={htmlFor} className={`${lblCls} ${center ? "text-center" : ""}`} style={{ color: TEXT_80 }}>
      {children}
    </label>
  );
}


function Chevron() {
  return (
    <span className="pointer-events-none absolute top-1/2 right-[8px] flex h-[18px] w-[18px] -translate-y-1/2 items-center justify-center">
      <ChevronSvg />
    </span>
  );
}

function Select({ id, value, onChange, options }) {
  return (
    <div className="relative">
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={selectCls} style={{ color: TEXT_60 }}>
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

function Toggle({ on, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="relative h-[15.17px] w-[25.67px] shrink-0 cursor-pointer rounded-full transition-colors"
      style={{ backgroundColor: on ? TOGGLE_ON : "#D6D5E4" }}
    >
      <span
        className="absolute h-[12.83px] w-[12.83px] rounded-full bg-white shadow-sm transition-all"
        style={{ top: 1.17, left: on ? 11.03 : 1.17 }}
      />
    </button>
  );
}

function NumberStepper({ value, onChange, label, id }) {
  return (
    <div className="relative">
      <input
        id={id}
        type="number"
        min="0"
        aria-label={label}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-[40px] w-full rounded-[6px] border border-[#E5E4EC] bg-white pr-8 pl-3 text-[12px] leading-[15px] font-medium outline-none focus:border-[#001984] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        style={{ color: TEXT_60 }}
      />
      <span className="absolute top-1/2 right-[12px] flex -translate-y-1/2 flex-col items-center gap-[3px]">
        <button
          type="button"
          tabIndex={-1}
          aria-label={`Increase ${label}`}
          onClick={() => onChange((n) => (n ?? 0) + 1)}
          className="flex h-[8px] w-[10px] cursor-pointer items-center justify-center"
        >
          <ChevronSvg up />
        </button>
        <button
          type="button"
          tabIndex={-1}
          aria-label={`Decrease ${label}`}
          onClick={() => onChange((n) => Math.max(0, (n ?? 0) - 1))}
          className="flex h-[8px] w-[10px] cursor-pointer items-center justify-center"
        >
          <ChevronSvg />
        </button>
      </span>
    </div>
  );
}


const TABS = ["Manual Entry", "CSV Upload", "AI Generate"];

function TabsRow() {
  return (
    <div className="mt-[10px] flex h-[50px] items-stretch gap-[4px] border-b" style={{ borderColor: DIVIDER }}>
      {TABS.map((t) => {
        const active = t === "AI Generate";
        return (
          <button
            key={t}
            type="button"
            className={`flex w-[143px] items-center justify-center text-[14px] leading-[17px] ${
              active ? "-mb-px border-b-2 font-semibold" : "font-medium"
            }`}
            style={{ borderColor: active ? NAVY : "transparent", color: active ? NAVY : TEXT_60 }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}


function AIGenerateForm() {
  const [topic, setTopic] = useState(TOPIC_OPTIONS[0]);
  const [words, setWords] = useState(12);
  const [clueStyle, setClueStyle] = useState(CLUE_STYLE_OPTIONS[0]);
  const [diagonal, setDiagonal] = useState(true);
  const [backward, setBackward] = useState(true);
  const [uniqueness, setUniqueness] = useState(UNIQUE_OPTIONS[0]);
  const [count, setCount] = useState("2");
  const [gridSize, setGridSize] = useState(GRID_OPTIONS[2]);
  const [levels, setLevels] = useState(["Level 1", "Level 2", "Level 3"]);
  const [aiImage, setAiImage] = useState(true);
  const [imageStyle, setImageStyle] = useState(IMAGE_STYLE_OPTIONS[0]);
  const [safety, setSafety] = useState(SAFETY_OPTIONS[0]);
  const [noText, setNoText] = useState(true);

  const removeLevel = (lv) => setLevels((p) => p.filter((x) => x !== lv));

  const perLevel = levels.map((lv, i) => ({ label: lv, value: i === 2 ? 0 : 1 }));

  return (
    <div
      className="relative box-border h-[321px] w-[1059px] rounded-[7.5px] border-[0.75px] bg-white pt-[16px] pr-[28px] pl-[27px]"
      style={{ borderColor: BORDER }}
    >
      <div className="pointer-events-none absolute right-[28px] left-[27px] h-px" style={{ top: 99, backgroundColor: DIVIDER }} />
      <div className="pointer-events-none absolute right-[28px] left-[27px] h-px" style={{ top: 203, backgroundColor: DIVIDER }} />

      <div className="flex items-start gap-[25px]">
        <div className="w-[190px] shrink-0">
          <Label htmlFor="topic">Topic / Passage</Label>
          <Select id="topic" value={topic} onChange={setTopic} options={TOPIC_OPTIONS} />
        </div>

        <div className="w-[132px] shrink-0">
          <Label htmlFor="words">Words per Puzzle</Label>
          <NumberStepper id="words" value={words} onChange={setWords} label="Words per Puzzle" />
        </div>

        <div className="w-[138px] shrink-0">
          <Label htmlFor="clue">Clue Style</Label>
          <Select id="clue" value={clueStyle} onChange={setClueStyle} options={CLUE_STYLE_OPTIONS} />
        </div>

        <div className="w-[117px] shrink-0">
          <Label center>Allow Diagonal</Label>
          <div className="flex h-[40px] items-center justify-center">
            <Toggle on={diagonal} onChange={setDiagonal} label="Allow Diagonal" />
          </div>
        </div>

        <div className="w-[113px] shrink-0">
          <Label center>Allow Backward</Label>
          <div className="flex h-[40px] items-center justify-center">
            <Toggle on={backward} onChange={setBackward} label="Allow Backward" />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <Label htmlFor="unique">Answer Uniqueness</Label>
          <Select id="unique" value={uniqueness} onChange={setUniqueness} options={UNIQUE_OPTIONS} />
        </div>
      </div>

      <div className="mt-[41px] flex items-start gap-[25px]">
        <div className="w-[169px] shrink-0">
          <Label htmlFor="count">Number of Puzzles</Label>
          <Select id="count" value={count} onChange={setCount} options={PUZZLE_COUNT_OPTIONS} />
        </div>

        <div className="w-[133px] shrink-0">
          <Label htmlFor="grid">Grid Size</Label>
          <Select id="grid" value={gridSize} onChange={setGridSize} options={GRID_OPTIONS} />
        </div>

        <div className="w-[336px] shrink-0">
          <Label>New Levels</Label>
          <div className="flex h-[40px] w-full items-center gap-[5px] rounded-[6px] border border-[#E5E4EC] bg-white pr-2 pl-[11px]">
            {levels.map((lv) => (
              <span
                key={lv}
                className="flex h-[26px] w-[75px] shrink-0 items-center justify-center gap-[10px] whitespace-nowrap rounded-[8px] border px-[13px] text-[10px] leading-[12px] font-medium"
                style={{ backgroundColor: CHIP_BG, borderColor: CARD_BORDER, color: TEXT_80 }}
              >
                {lv}
                <button
                  type="button"
                  aria-label={`Remove ${lv}`}
                  onClick={() => removeLevel(lv)}
                  className="flex cursor-pointer items-center"
                  style={{ color: "#0926FD" }}
                >
                  <CloseSvg />
                </button>
              </span>
            ))}
            {levels.length < LEVEL_OPTIONS.length && (
              <label
                className="relative ml-auto flex h-[24px] w-[24px] shrink-0 cursor-pointer items-center justify-center rounded-[5px] border"
                style={{ borderColor: BORDER }}
              >
                <PlusSvg />
                <select
                  aria-label="Add level"
                  value=""
                  onChange={(e) => {
                    if (e.target.value && !levels.includes(e.target.value)) {
                      setLevels((p) => [...p, e.target.value]);
                    }
                  }}
                  className="absolute inset-0 cursor-pointer opacity-0"
                >
                  <option value="">Add…</option>
                  {LEVEL_OPTIONS.filter((o) => !levels.includes(o)).map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <Label>Puzzles per Level</Label>
          <div
            className="flex h-[40px] items-center gap-[20px] rounded-[6px] border border-[#E5E4EC] bg-white px-3 text-[12px] leading-[15px] font-medium"
            style={{ color: TEXT_60 }}
          >
            {perLevel.map((p) => (
              <span key={p.label} className="whitespace-nowrap">
                {p.label}: {p.value}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[40px] flex items-start gap-[53px]">
        <div className="flex h-[29px] w-[306px] shrink-0 items-center gap-[12px]">
          <Toggle on={aiImage} onChange={setAiImage} label="Generate a unique AI image for every puzzle" />
          <span className="text-[12px] leading-[15px] font-semibold whitespace-nowrap" style={{ color: TEXT_80 }}>
            Generate a unique AI image for every puzzle
          </span>
        </div>

        <div className="w-[172px] shrink-0">
          <Label htmlFor="imgstyle">AI Image Style</Label>
          <Select id="imgstyle" value={imageStyle} onChange={setImageStyle} options={IMAGE_STYLE_OPTIONS} />
        </div>

        <div className="w-[150px] shrink-0">
          <Label htmlFor="safety">Image Safety</Label>
          <Select id="safety" value={safety} onChange={setSafety} options={SAFETY_OPTIONS} />
        </div>

        <div className="flex h-[29px] items-center gap-[23px]">
          <span className="text-[12px] leading-[15px] font-semibold whitespace-nowrap" style={{ color: TEXT_80 }}>
            No text in image
          </span>
          <Toggle on={noText} onChange={setNoText} label="No text in image" />
        </div>
      </div>
    </div>
  );
}




function LetterRows({ rows }) {
  return (
    <div className="w-[229px] pt-[2px]">
      {rows.map((row, i) => {
        const last = i === rows.length - 1;
        return (
          <div key={i} className={`flex h-[19px] items-center ${last ? "gap-[10.5px]" : "justify-between"}`}>
            {row.split("").map((ch, j) => (
              <span key={j} className="text-[12px] leading-[19px] font-medium" style={{ color: TEXT_80 }}>
                {ch}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function ClueList() {
  return (
    <div className="mt-[20.5px] w-[229px]">
      <p className="text-[10px] leading-[12px] font-bold" style={{ color: TEXT_80 }}>
        CLUES
      </p>
      <ol className="mt-[4px]">
        {CLUES.map((c, i) => (
          <li key={c} className="flex items-start text-[10px] leading-[15px] font-medium" style={{ color: TEXT_60 }}>
            <span className="w-[16px] shrink-0">{i + 1}.</span>
            <span>{c}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}


function PuzzleImage({ src, alt, left }) {
  return (
    <div className="relative h-[223px] w-[229px] shrink-0 overflow-hidden rounded-[7.5px]">
      <img
        src={src}
        alt={alt}
        className="absolute max-w-none object-cover"
        style={{ width: 280.31, height: 231.42, left, top: -4.21 }}
      />
    </div>
  );
}


function AiBadge() {
  return (
    <span
      className="flex h-[25px] w-[71px] shrink-0 items-center justify-center rounded-[8px] border text-[10px] leading-[12px] font-semibold"
      style={{
        backgroundColor: "rgba(33,172,28,0.1)",
        borderColor: "rgba(33,172,28,0.2)",
        color: BADGE_GREEN,
      }}
    >
      AI IMAGE
    </span>
  );
}


function CardBtn({ icon, children, className = "" }) {
  return (
    <button
      type="button"
      className={`flex h-[32px] cursor-pointer items-center gap-[2px] rounded-[8px] border-[0.75px] bg-white px-[9px] text-[10px] leading-[12px] font-semibold whitespace-nowrap transition-colors hover:bg-[#F7F8FE] ${className}`}
      style={{ borderColor: CARD_BORDER, color: TEXT_80 }}
    >
      <span className="flex h-[14px] w-[14px] items-center justify-center">{icon}</span>
      {children}
    </button>
  );
}

function PublishApprovedSmall() {
  return (
    <button
      type="button"
      className="flex h-[32px] w-[121px] cursor-pointer items-center justify-center gap-[4px] rounded-[8px] text-[10px] leading-[12px] font-semibold whitespace-nowrap text-white transition-opacity hover:opacity-90"
      style={{ backgroundColor: NAVY }}
    >
      <CheckCircleIcon />
      Publish Approved
    </button>
  );
}

function CardActions({ row1Gap, row2Gap }) {
  return (
    <>
      <div className="flex items-center gap-[9px]" style={{ marginTop: row1Gap }}>
        <CardBtn icon={<RefreshIcon />}>Regenerate Puzzle</CardBtn>
        <CardBtn icon={<ImageSparkIcon />}>Regenerate Image</CardBtn>
        <CardBtn icon={<ImageSparkIcon />}>Replace Image</CardBtn>
      </div>
      <div className="flex items-center gap-[9px]" style={{ marginTop: row2Gap }}>
        <CardBtn icon={<PencilIcon />} className="w-[76px] justify-center gap-[5px]">
          Edit
        </CardBtn>
        <PublishApprovedSmall />
      </div>
    </>
  );
}

const cardCls =
  "box-border flex h-[413px] w-[519px] flex-col rounded-[7.5px] border-[0.75px] bg-white pt-[15px] pr-[21px] pl-[20px]";


function LevelOneCard({ level, puzzle }) {
  return (
    <div className={cardCls} style={{ borderColor: CARD_BORDER }}>
      <div className="mt-[9.5px] flex h-[25px] items-end justify-between">
        <p className="text-[12px] leading-[15px] font-medium" style={{ color: TEXT_80 }}>
          {level} • Puzzle {puzzle}
        </p>
        <AiBadge />
      </div>

      <div className="mt-[12.5px] flex h-[223px] gap-[20px]">
        <PuzzleImage src={lionImg} alt="Level 1 puzzle" left={-34.21} />
        <div className="w-[229px] shrink-0">
          <LetterRows rows={LEVEL1_ROWS} />
          <ClueList />
        </div>
      </div>

      <CardActions row1Gap={16} row2Gap={23} />
    </div>
  );
}


function PuzzleCard({ level, puzzle }) {
  return (
    <div className={cardCls} style={{ borderColor: CARD_BORDER }}>
      <div className="flex h-[25px] items-end justify-between">
        <p className="text-[12px] leading-[15px] font-medium" style={{ color: TEXT_80 }}>
          {level} • Puzzle {puzzle}
        </p>
        <AiBadge />
      </div>

      <div className="mt-[22px] flex h-[223px] gap-[20px]">
        <PuzzleImage src={lion2Img} alt="Level 2 puzzle" left={-2.21} />
        <LetterRows rows={LEVEL2_ROWS} />
      </div>

      <CardActions row1Gap={25} row2Gap={11} />
    </div>
  );
}


function BottomBtn({ icon, children }) {
  return (
    <button
      type="button"
      className="flex h-[40px] cursor-pointer items-center gap-[8px] rounded-[8px] border-[0.75px] bg-white px-[15px] text-[14px] leading-[17px] font-semibold transition-colors hover:bg-[#F7F8FE]"
      style={{ borderColor: CARD_BORDER, color: TEXT_80 }}
    >
      {icon}
      {children}
    </button>
  );
}


export default function AIGeneratePage() {
  const [reward, setReward] = useState(10);
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
      <div className="mx-auto max-w-[1103px] px-5 py-6">
        <div>
          <h1 className="text-[22px] leading-[27px] font-bold" style={{ color: HEADING }}>
            Add / Edit Word Search
          </h1>
          <p className="mt-[15px] text-[16px] leading-[19px] font-medium" style={{ color: TEXT_60 }}>
            hoose the activity type and how you want to create it.
          </p>
        </div>

        <div className="mt-[24px] flex items-start gap-[25px]">
          {HEADER_FIELDS.map(({ id, label, options }, i) => (
            <div key={id} className={`${HEADER_COL_W[i]} shrink-0`}>
              <Label htmlFor={id}>{label}</Label>
              <Select
                id={id}
                value={values[id]}
                onChange={(v) => setValues((p) => ({ ...p, [id]: v }))}
                options={options}
              />
            </div>
          ))}

          <div className={HEADER_COL_W[4]}>
            <Label htmlFor="reward">Reward Points</Label>
            <NumberStepper id="reward" value={reward} onChange={setReward} label="Reward Points" />
          </div>
        </div>

        <TabsRow />

        <div className="mt-[24px]">
          <h2 className="text-[22px] leading-[27px] font-bold" style={{ color: HEADING }}>
            Add / Edit Word Search
          </h2>
          <p className="mt-[12px] text-[16px] leading-[19px] font-medium" style={{ color: TEXT_60 }}>
            hoose the activity type and how you want to create it.
          </p>
        </div>

        <div className="mt-[24px]">
          <AIGenerateForm />
        </div>

        <h3 className="mt-[22px] text-[14px] leading-[17px] font-bold" style={{ color: HEADING }}>
          Generated Puzzles Preview
        </h3>

        <div className="mt-[18px] grid w-[1059px] grid-cols-[519px_519px] gap-[21px]">
          <LevelOneCard level="Level 1" puzzle={1} />
          <PuzzleCard level="Level 2" puzzle={1} />
        </div>

        <div className="mt-[48px] flex w-[1059px] items-center justify-between pb-6">
          <BottomBtn>Cancel</BottomBtn>

          <div className="flex items-center gap-[14px]">
            <BottomBtn icon={<img src={floppyIcon} alt="" aria-hidden className="h-[16px] w-[16px] shrink-0 object-contain" />}>Save draft</BottomBtn>
            <BottomBtn icon={<EyeIcon />}>Preview</BottomBtn>
            <button
              type="button"
              className="flex h-[40px] cursor-pointer items-center rounded-[8px] px-[26px] text-[14px] leading-[17px] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: NAVY }}
            >
              → Publish Approved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}