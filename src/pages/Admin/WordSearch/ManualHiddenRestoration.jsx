import { useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import puzzleImg from "../../../assets/word search/Puzzle img.webp";
import replaceIcon from "../../../assets/word search/mh_replace.svg";
import resetIcon from "../../../assets/word search/mh_reset.svg";
import aiImageIcon from "../../../assets/word search/pu_ai_image.svg";
import chevronIcon from "../../../assets/word search/mh_chevron.svg";
import floppyIcon from "../../../assets/word search/dr_save_floppy.svg";
import eyeIcon from "../../../assets/word search/mh_eye.svg";
import arrowRightIcon from "../../../assets/word search/mh_arrow_right.svg";
import plusIcon from "../../../assets/word search/mh_plus.svg";
import sortIcon from "../../../assets/word search/mh_sort.svg";
import trashIcon from "../../../assets/word search/mh_trash.svg";


const HEADING = "#0A0847";
const MUTED = "rgba(10, 8, 71, 0.6)";
const NAVY = "#001984";
const GREEN = "#2EB84B";
const PAGE_BG = "#F8F9FE";
const BORDER = "#E4E5F0";
const CARD_BORDER = "#EFECFB";

const TABS = ["Manual Entry", "CSV Upload", "AI Generate"];

const FILTER_FIELDS = [
  { id: "testament", label: "Testament", value: "Old Testament", options: ["Old Testament", "New Testament"] },
  { id: "book", label: "Book", value: "Genesis", options: ["Genesis", "Exodus", "Psalms", "John"] },
  { id: "chapter", label: "Chapter", value: "1", options: ["1", "2", "3"] },
  { id: "level", label: "Level", value: "Level 1", options: ["Level 1", "Level 2", "Level 3"] },
  { id: "difficulty", label: "Difficulty", value: "Easy", options: ["Easy", "Medium", "Hard"] },
];

const GRID_OPTIONS = ["10 × 10", "12 × 12", "15 × 15", "20 × 20"];
const GRID_VALUE = "15 × 15";

const HIDDEN_WORDS = [
  { n: 1, word: "CREATION", clue: "The act of bringing something into existence" },
  { n: 2, word: "HEAVENS", clue: "The sky and space above the earth" },
  { n: 3, word: "EARTH", clue: "The world God made" },
  { n: 4, word: "LIGHT", clue: "God said, “Let there be light”" },
  { n: 5, word: "WATERS", clue: "The waters above and below" },
  { n: 6, word: "PLANTS", clue: "Vegetation God caused to grow" },
];

const cardCls = "rounded-[8px] border bg-white";
const field =
  "h-[38px] w-full rounded-[8px] border bg-white px-[12px] text-[14px] font-medium outline-none focus:border-[#001984]";
const lbl = "mb-[8px] block text-[14px] font-semibold";


function Select({ value, onChange, options, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${field} cursor-pointer appearance-none pr-[30px]`}
        style={{ color: HEADING, borderColor: BORDER }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <img
        src={chevronIcon}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[12px] h-auto w-[10px] -translate-y-1/2"
      />
    </div>
  );
}

function Toggle({ on, onChange, label, color = "#0552AA" }) {
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

function ToggleRow({ label, on, onChange }) {
  return (
    <div className="flex h-[40px] items-center justify-between gap-3">
      <span className="text-[14px] font-medium" style={{ color: HEADING }}>
        {label}
      </span>
      <Toggle on={on} onChange={onChange} label={label} />
    </div>
  );
}


function Breadcrumb() {
  return (
    <nav className="text-[16px] font-medium" style={{ color: MUTED }}>
      Word Search <span className="mx-[6px]">&gt;</span> Add <span className="mx-[6px]">&gt;</span> Manual
    </nav>
  );
}

/* Mobile: 2-column grid. sm and up: all six fields (5 filters + Reward Points) in one row that shares the width. */
function FilterFields() {
  const [values, setValues] = useState(() =>
    FILTER_FIELDS.reduce((acc, f) => ({ ...acc, [f.id]: f.value }), {}),
  );
  const [reward, setReward] = useState(10);

  return (
    <div className="grid grid-cols-2 items-start gap-x-[16px] gap-y-[16px] sm:flex sm:flex-nowrap sm:gap-[16px]">
      {FILTER_FIELDS.map(({ id, label, options }) => (
        <div key={id} className="w-full min-w-0 sm:flex-1">
          <label htmlFor={id} className="mb-[8px] block text-[14px] font-medium" style={{ color: HEADING }}>
            {label}
          </label>
          <Select
            value={values[id]}
            onChange={(v) => setValues((p) => ({ ...p, [id]: v }))}
            options={options}
            className="w-full"
          />
        </div>
      ))}

      <div className="w-full min-w-0 sm:w-[130px] sm:shrink-0">
        <label htmlFor="reward" className="mb-[8px] block text-[14px] font-medium" style={{ color: HEADING }}>
          Reward Points
        </label>
        <div className="relative">
          <input
            id="reward"
            type="number"
            min="0"
            value={reward}
            onChange={(e) => setReward(Number(e.target.value))}
            className={`${field} pr-[24px]`}
            style={{ color: HEADING, borderColor: BORDER }}
          />
          <span className="absolute top-1/2 right-[6px] flex -translate-y-1/2 flex-col">
            <button
              type="button"
              tabIndex={-1}
              aria-label="Increase reward points"
              onClick={() => setReward((n) => n + 1)}
              className="flex h-[9px] w-[14px] cursor-pointer items-center justify-center"
              style={{ color: "#9B96B8" }}
            >
              <LuChevronUp size={11} />
            </button>
            <button
              type="button"
              tabIndex={-1}
              aria-label="Decrease reward points"
              onClick={() => setReward((n) => Math.max(0, n - 1))}
              className="flex h-[9px] w-[14px] cursor-pointer items-center justify-center"
              style={{ color: "#9B96B8" }}
            >
              <LuChevronDown size={11} />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

function TabsRow() {
  return (
    <div className="mt-[30px] flex items-stretch overflow-x-auto border-b" style={{ borderColor: BORDER }}>
      {TABS.map((t) => {
        const active = t === "Manual Entry";
        return (
          <button
            key={t}
            type="button"
            className={`h-[50px] shrink-0 whitespace-nowrap px-[16px] text-[14px] sm:px-[24px] ${
              active ? "-mb-px border-b-2 font-semibold" : "font-medium"
            }`}
            style={active ? { borderColor: NAVY, color: NAVY } : { color: MUTED }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

/* Status on the left; Save draft, Preview and Add Puzzle on the right, all in one line on desktop. */
function BottomBar() {
  const [published, setPublished] = useState(true);
  return (
    <div className="mt-[48px] flex flex-col gap-[16px] sm:flex-row sm:flex-nowrap sm:items-center sm:justify-between">
      <div className="flex items-center gap-[12px]">
        <span className="text-[14px] font-semibold" style={{ color: MUTED }}>
          Status
        </span>
        <Toggle on={published} onChange={setPublished} label="Toggle status" color={GREEN} />
        <span
          className="whitespace-nowrap rounded-[6px] px-[10px] py-[2px] text-[14px] font-medium"
          style={{ backgroundColor: "#E3F7E6", color: GREEN }}
        >
          Published
        </span>
      </div>

      <div className="grid grid-cols-2 gap-[12px] sm:flex sm:flex-nowrap sm:items-center">
        <button
          type="button"
          className="flex h-[42px] w-full cursor-pointer items-center justify-center gap-[8px] whitespace-nowrap rounded-[8px] border bg-white text-[14px] font-semibold transition-colors hover:bg-[#F7F8FE] sm:w-[119px] sm:shrink-0"
          style={{ borderColor: BORDER, color: NAVY }}
        >
          <img src={floppyIcon} alt="" aria-hidden className="h-[16px] w-[16px] shrink-0 object-contain" />
          Save draft
        </button>
        <button
          type="button"
          className="flex h-[42px] w-full cursor-pointer items-center justify-center gap-[8px] whitespace-nowrap rounded-[8px] border bg-white text-[14px] font-semibold transition-colors hover:bg-[#F7F8FE] sm:w-[158px] sm:shrink-0"
          style={{ borderColor: BORDER, color: NAVY }}
        >
          <img src={eyeIcon} alt="" aria-hidden className="h-[12px] w-[16px] shrink-0" />
          Preview
        </button>
        <button
          type="button"
          className="col-span-2 flex h-[42px] w-full cursor-pointer items-center justify-center gap-[10px] whitespace-nowrap rounded-[8px] text-[14px] font-bold text-white transition-opacity hover:opacity-90 sm:col-auto sm:w-[196px] sm:shrink-0"
          style={{ backgroundColor: NAVY }}
        >
          <img src={arrowRightIcon} alt="" aria-hidden className="h-[12px] w-[12px]" />
          Add Puzzle
        </button>
      </div>
    </div>
  );
}

function PuzzleImageCard() {
  return (
    <div className={`${cardCls} flex w-full shrink-0 flex-col p-[16px] xl:w-[305px]`} style={{ borderColor: CARD_BORDER }}>
      <h2 className="text-[14px] font-semibold" style={{ color: "rgba(10, 8, 71, 0.8)" }}>
        Puzzle Image
      </h2>

      <img
        src={puzzleImg}
        alt="Genesis garden and lake"
        className="mt-[16px] h-[152px] w-full rounded-[8px] object-cover"
      />

      <div className="mt-[16px] flex items-center justify-between gap-[8px]">
        <p className="text-[14px] leading-[16px] font-medium" style={{ color: MUTED }}>
          Chapter default image
          <br />
          applied automatically
        </p>
        <span
          className="flex h-[30px] w-[79px] shrink-0 items-center justify-center rounded-[4px] text-[12px] font-semibold"
          style={{ backgroundColor: "#E3E4F6", color: NAVY }}
        >
          DEFAULT
        </span>
      </div>

      <div className="mt-[16px] flex flex-wrap items-center gap-[10px]">
        <button
          type="button"
          className="flex h-[32px] w-full shrink-0 cursor-pointer items-center justify-center gap-[6px] whitespace-nowrap rounded-[8px] bg-white text-[12px] font-semibold transition-colors hover:bg-[#F7F8FE] sm:w-[123px]"
          style={{ border: "1px solid #E2DFFC", color: HEADING }}
        >
          <img src={replaceIcon} alt="" aria-hidden className="h-[13px] w-[13px]" />
          Replace Default
        </button>
        <button
          type="button"
          className="flex h-[32px] w-full shrink-0 cursor-pointer items-center justify-center gap-1 rounded-[8px] px-1 text-[12px] font-medium whitespace-nowrap text-white transition-opacity hover:opacity-90 sm:w-[131px]"
          style={{ backgroundColor: NAVY }}
        >
          <img src={aiImageIcon} alt="" aria-hidden className="h-[15px] w-[15px] shrink-0" />
          Generate AI Image
        </button>
      </div>

      <button
        type="button"
        className="mt-[16px] flex h-[32px] w-full cursor-pointer items-center justify-center gap-[6px] whitespace-nowrap rounded-[8px] bg-white text-[12px] font-semibold transition-colors hover:bg-[#F7F8FE]"
        style={{ border: "1px solid #E2DFFC", color: HEADING }}
      >
        <img src={resetIcon} alt="" aria-hidden className="h-[16px] w-[14px] shrink-0" />
        Reset to Chapter Default
      </button>
    </div>
  );
}


function WordListTable({ rows }) {
  return (
    <>
      <p className={lbl} style={{ color: HEADING }}>
        Word List
      </p>
      <div className="mt-[16px] w-full min-w-0 overflow-x-auto">
        <table className="w-full min-w-[520px] table-fixed border-collapse text-left">
          <colgroup>
            <col style={{ width: "9.5%" }} />
            <col style={{ width: "21.4%" }} />
            <col style={{ width: "40.6%" }} />
            <col style={{ width: "28.5%" }} />
          </colgroup>
          <thead>
            <tr style={{ backgroundColor: "#F1F2FA" }} className="h-[46px]">
              {["#", "Word", "Clue", "Actions"].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-[8px] text-[14px] font-medium"
                  style={{
                    color: HEADING,
                    textAlign: h === "#" || h === "Actions" ? "center" : "left",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.n} className="h-[51px] border-b" style={{ borderColor: "#EEEEF3" }}>
                <td className="px-[8px] py-[8px] text-center align-middle text-[14px] font-medium" style={{ color: HEADING }}>
                  {row.n}
                </td>
                <td className="px-[8px] py-[8px] align-middle text-[12px] font-medium" style={{ color: "rgba(10, 8, 71, 0.8)" }}>
                  {row.word}
                </td>
                <td className="px-[8px] py-[8px] align-middle text-[12px] leading-[15px] font-medium" style={{ color: "rgba(10, 8, 71, 0.8)" }}>
                  {row.clue}
                </td>
                <td className="px-[8px] py-[8px] align-middle">
                  <div className="flex items-center justify-center gap-[8px]">
                    <button
                      type="button"
                      aria-label={`Reorder ${row.word}`}
                      className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[6px] border bg-white transition-colors hover:bg-[#F7F8FE]"
                      style={{ borderColor: BORDER }}
                    >
                      <img src={sortIcon} alt="" aria-hidden className="h-[18px] w-[18px]" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${row.word}`}
                      className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[6px] border bg-white transition-colors hover:bg-[#FEF2F4]"
                      style={{ borderColor: BORDER }}
                    >
                      <img src={trashIcon} alt="" aria-hidden className="h-[18px] w-[18px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="mt-[24px] flex h-[40px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[8px] border bg-white text-[14px] font-medium transition-colors hover:bg-[#F7F8FE] sm:w-[128px]"
        style={{ borderColor: BORDER, color: "#3D3561" }}
      >
        <img src={plusIcon} alt="" aria-hidden className="h-[14px] w-[14px]" />
        Add Word
      </button>
    </>
  );
}

function HiddenMiddle() {
  const [title, setTitle] = useState("Hidden Restoration");
  const [instructions, setInstructions] = useState("Find the hidden words from Genesis 1.");
  const [scripture, setScripture] = useState("Genesis 1 – The Creation");

  return (
    <div className={`${cardCls} flex min-w-0 flex-1 flex-col p-[16px]`} style={{ borderColor: CARD_BORDER }}>
      <div className="flex flex-col items-start gap-[16px] sm:flex-row sm:gap-[16px]">
        <div className="w-full min-w-0 sm:w-[231px] sm:shrink-0">
          <label className={lbl} style={{ color: HEADING }}>Puzzle Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={field}
            style={{ color: HEADING, borderColor: BORDER }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <label className={lbl} style={{ color: HEADING }}>Instructions</label>
          <input
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className={field}
            style={{ color: HEADING, borderColor: BORDER }}
          />
        </div>
      </div>
      <div className="mt-[16px]">
        <label className={lbl} style={{ color: HEADING }}>Scripture / Topic</label>
        <input
          value={scripture}
          onChange={(e) => setScripture(e.target.value)}
          className={field}
          style={{ color: HEADING, borderColor: BORDER }}
        />
      </div>
      <div className="mt-[16px] border-b pb-[16px]" style={{ borderColor: BORDER }} />
      <WordListTable rows={HIDDEN_WORDS} />
    </div>
  );
}

function HiddenRight() {
  const [size, setSize] = useState(GRID_VALUE);
  const [a, setA] = useState(true);
  const [b, setB] = useState(true);
  const [c, setC] = useState(true);
  return (
    <div className={`${cardCls} h-full w-full p-[16px]`} style={{ borderColor: CARD_BORDER }}>
      <label className={lbl} style={{ color: HEADING }}>Grid Size</label>
      <Select value={size} onChange={setSize} options={GRID_OPTIONS} className="w-full" />
      <div className="mt-[30px]">
        <ToggleRow label="Allow Diagonal" on={a} onChange={setA} />
        <ToggleRow label="Allow Backward" on={b} onChange={setB} />
        <ToggleRow label="Show Hints" on={c} onChange={setC} />
      </div>
    </div>
  );
}


export default function ManualHiddenRestoration() {
  return (
    <div
      className="min-h-[calc(100vh-72px)]"
      style={{
        backgroundColor: PAGE_BG,
        color: HEADING,
        fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="mx-auto w-full max-w-[1118px] px-[16px] py-[24px] sm:px-[28px]">
        <Breadcrumb />

        <h1 className="mt-[13px] text-[22px] leading-[22px] font-semibold" style={{ color: HEADING }}>
          Add Word Search — Manual Entry
        </h1>

        <p className="mt-[13px] text-[14px] leading-[14px] font-semibold" style={{ color: MUTED }}>
          Manual — Hidden Restoration
        </p>

        <div className="mt-[20px]">
          <FilterFields />
        </div>

        <TabsRow />

        <div className="mt-[30px]">
          <div className="flex flex-col items-stretch gap-[20px] xl:flex-row">
            <PuzzleImageCard />
            <div className="flex min-w-0 flex-1 flex-col items-stretch gap-[20px] xl:flex-row">
              <HiddenMiddle />
              <div className="flex w-full min-w-0 shrink-0 flex-col xl:w-[200px]">
                <HiddenRight />
              </div>
            </div>
          </div>
        </div>

        <BottomBar />
      </div>
    </div>
  );
}