import { useRef, useState } from "react";
import { LuCheck, LuDownload } from "react-icons/lu";
import chapterDefaultImage from "../../../assets/word search/Chapter Default Image.webp";
import typeGrid from "../../../assets/word search/ws_type_grid.svg";
import typeGears from "../../../assets/word search/ws_type_gears.svg";
import typeAudio from "../../../assets/word search/ws_type_audio.svg";
import typeMystery from "../../../assets/word search/ws_type_mystery.svg";
import cloudUploadIcon from "../../../assets/word search/CloudUploadIcon.svg";


const HEADING = "#0A0847";
const NAVY = "#001984";
const LABEL = "rgba(10, 8, 71, 0.8)";
const MUTED = "rgba(10, 8, 71, 0.6)";
const BORDER = "#E2DFFC";
const PAGE_BG = "#F9FAFE";



const FILTERS = [
  { id: "testament", label: "Testament", w: 222, value: "Old Testament", options: ["Old Testament", "New Testament"] },
  { id: "book", label: "Book", w: 162, value: "Genesis", options: ["Genesis", "Exodus", "Psalms", "John"] },
  { id: "chapter", label: "Chapter", w: 130, value: "1", options: ["1", "2", "3"] },
  { id: "level", label: "Level", w: 139, value: "Level 1", options: ["Level 1", "Level 2", "Level 3"] },
];

const WORD_SEARCH_TYPES = [
  {
    id: "hidden",
    title: "Hidden Restoration",
    description: "Find hidden Bible words from clues.",
    icon: typeGrid,
    columns: [
      { name: "clue", type: "Text", description: "Puzzle clue" },
      { name: "answer", type: "Text", description: "Hidden word answer" },
      { name: "created_by", type: "Text", description: "Creator name (optional)" },
      { name: "difficulty", type: "Number", description: "1=Easy, 2=Medium, 3=Hard" },
      { name: "reward_points", type: "Number", description: "Points for correct answer" },
    ],
  },
  {
    id: "verse",
    title: "Verse Restoration",
    description: "Restore missing words in a verse.",
    icon: typeGears,
    columns: [
      { name: "verse", type: "Text", description: "Full verse text" },
      { name: "missing_word", type: "Text", description: "Blanked out word" },
      { name: "created_by", type: "Text", description: "Creator name (optional)" },
      { name: "difficulty", type: "Number", description: "1=Easy, 2=Medium, 3=Hard" },
      { name: "reward_points", type: "Number", description: "Points for correct answer" },
    ],
  },
  {
    id: "audio",
    title: "Audio Revelation",
    description: "Listen and identify the correct answer.",
    icon: typeAudio,
    columns: [
      { name: "audio_url", type: "Text", description: "Audio file URL" },
      { name: "clue", type: "Text", description: "Puzzle clue" },
      { name: "created_by", type: "Text", description: "Creator name (optional)" },
      { name: "difficulty", type: "Number", description: "1=Easy, 2=Medium, 3=Hard" },
      { name: "reward_points", type: "Number", description: "Points for correct answer" },
    ],
  },
  {
    id: "mystery",
    title: "Mystery Scripture",
    description: "Reveal the hidden Scripture.",
    icon: typeMystery,
    columns: [
      { name: "scripture", type: "Text", description: "Hidden Scripture text" },
      { name: "clue", type: "Text", description: "Puzzle clue" },
      { name: "created_by", type: "Text", description: "Creator name (optional)" },
      { name: "difficulty", type: "Number", description: "1=Easy, 2=Medium, 3=Hard" },
      { name: "reward_points", type: "Number", description: "Points for correct answer" },
    ],
  },
];



function ChevronSvg() {
  return (
    <svg width="7.5" height="4.84" viewBox="0 0 8 5" fill="none" aria-hidden>
      <path d="M0.75 0.75 4 4 7.25 0.75" stroke={MUTED} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


// Mobile: fills its grid cell (2 per row). sm and up: fixed Figma width via --filter-w.
function FilterSelect({ id, label, width, value, options, onChange }) {
  return (
    <div
      className="w-full min-w-0 sm:w-[var(--filter-w)] sm:max-w-full sm:shrink-0"
      style={{ "--filter-w": `${width}px` }}
    >
      <label htmlFor={id} className="mb-[8px] block text-[12px] leading-none font-semibold" style={{ color: LABEL }}>
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-[40px] w-full cursor-pointer appearance-none rounded-[7.47px] border bg-white pr-[32px] pl-[12px] text-[12px] font-medium outline-none focus:border-[#001984]"
          style={{ color: MUTED, borderColor: BORDER }}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute top-1/2 right-[12px] flex -translate-y-1/2 items-center">
          <ChevronSvg />
        </span>
      </div>
    </div>
  );
}


function TypeCard({ id, title, description, icon, selected, onSelect }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(id)}
      className="relative flex min-h-[156px] w-full min-w-0 cursor-pointer flex-col items-center rounded-[8px] border px-[24px] pt-[14px] pr-[25px] pb-[14px] text-center transition-colors hover:bg-[#EDEFF8]"
      style={{
        borderColor: selected ? NAVY : BORDER,
        backgroundColor: selected ? "#F1F0FB" : "#FFFFFF",
      }}
    >
      <img src={icon} alt="" aria-hidden className="h-[48px] w-[48px] shrink-0 object-contain" />

      <span className="mt-[10px] text-[14px] leading-none font-semibold" style={{ color: HEADING }}>
        {title}
      </span>

      <span className="mt-[10px] max-w-[157px] text-[12px] leading-[20px] font-medium" style={{ color: MUTED }}>
        {description}
      </span>

      {selected && (
        <span
          className="absolute top-[-10px] right-[-10px] flex h-[24px] w-[24px] items-center justify-center rounded-full"
          style={{ backgroundColor: NAVY }}
        >
          <LuCheck size={12} strokeWidth={2.5} className="text-white" aria-hidden />
        </span>
      )}
    </button>
  );
}


function UploadBox() {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.name.toLowerCase().endsWith(".csv")) {
      e.dataTransfer.clearData();
    }
  };

  return (
    <div
      onDragEnter={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragging(false);
      }}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      className="mt-[10px] flex min-h-[195px] w-full cursor-pointer flex-col items-center justify-center gap-[4px] rounded-[8px] px-[16px] py-[20px] text-center transition-colors sm:px-[24px]"
      style={{
        border: `1px dashed ${dragging ? NAVY : "rgba(10, 8, 71, 0.4)"}`,
        backgroundColor: dragging ? "#E4E7F4" : "#EDEFF8",
      }}
    >
      <img src={cloudUploadIcon} alt="" aria-hidden width={36} height={28} className="block shrink-0" />

      <p className="text-[10px] leading-[12px] font-medium" style={{ color: MUTED }}>
        Drag and drop your CSV file here
      </p>

      <p className="text-[10px] leading-[12px] font-medium" style={{ color: MUTED }}>
        or
      </p>

      <button
        type="button"
        className="mt-[2px] flex h-[30px] w-[100px] cursor-pointer items-center justify-center rounded-[6px] text-[10px] font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: NAVY }}
      >
        Browse File
      </button>

      {/* Mobile: stacked lines, no dots. sm and up: one row with dots (wraps if the column is narrow). */}
      <div
        className="mt-[4px] flex flex-col items-center gap-[2px] text-[10px] leading-[12px] font-medium sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-[8px] sm:gap-y-[2px]"
        style={{ color: MUTED }}
      >
        <span>Accepted format: .csv only</span>
        <span className="hidden sm:inline">•</span>
        <span>Max file size: 10MB</span>
        <span className="hidden sm:inline">•</span>
        <span>Max 1,000 rows</span>
      </div>

      <input ref={inputRef} type="file" accept=".csv" className="hidden" />
    </div>
  );
}


function ColumnsPreview({ typeTitle, columns }) {
  return (
    <div className="mt-[24px] w-full rounded-[7.5px] border-[0.75px] p-[16px]" style={{ borderColor: BORDER }}>
      <p className="text-[12px] leading-none font-semibold" style={{ color: LABEL }}>
        Required Columns Preview ({typeTitle})
      </p>

      {/* Below lg: 2-column grid so chips fill the card neatly. lg and up: natural-width chips that wrap (Figma look). */}
      <div className="mt-[16px] grid grid-cols-2 gap-[16px] lg:flex lg:flex-wrap">
        {columns.map(({ name, type, description }) => (
          <div
            key={name}
            className="flex min-h-[54px] min-w-0 flex-col justify-center gap-[4px] rounded-[8px] border-[0.75px] bg-white px-[12px] py-[8px] last:odd:col-span-2 lg:h-[54px] lg:max-w-full lg:shrink-0 lg:py-0"
            style={{ borderColor: BORDER }}
          >
            <p className="text-[12px] leading-[1.3] lg:leading-none lg:whitespace-nowrap">
              <span className="font-semibold" style={{ color: LABEL }}>
                {name}
              </span>{" "}
              <span className="font-medium" style={{ color: MUTED }}>
                ({type})
              </span>
            </p>
            <p className="text-[10px] leading-[18px] font-medium lg:whitespace-nowrap" style={{ color: MUTED }}>
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default function CSVUploadWordSearch() {
  const [typeId, setTypeId] = useState("hidden");
  const [filterValues, setFilterValues] = useState(() =>
    FILTERS.reduce((acc, f) => ({ ...acc, [f.id]: f.value }), {}),
  );

  const activeType = WORD_SEARCH_TYPES.find((t) => t.id === typeId);

  return (
    <div className="min-h-[calc(100vh-72px)] font-[Inter]" style={{ backgroundColor: PAGE_BG, color: HEADING }}>
      <div className="mx-auto w-full max-w-[1110px] px-4 pt-6 pb-6 sm:px-6 sm:pt-10">
        <p className="text-[16px] leading-none font-medium" style={{ color: MUTED }}>
          Add / Edit Word Search - CSV Upload
        </p>

        <h1 className="mt-[12px] text-[18px] leading-[1.3] font-semibold sm:text-[22px] md:leading-none" style={{ color: HEADING }}>
          1. CSV Upload — Choose Type &amp; File
        </h1>

        <p className="mt-[12px] text-[14px] leading-[1.4] font-medium md:leading-none" style={{ color: MUTED }}>
          Choose the word search type, select your Bible content, and upload your CSV file.
        </p>

        {/* Filters: 2 per row on mobile, fixed Figma widths from sm up (wraps if needed) */}
        <div className="mt-[20px] grid w-full grid-cols-2 gap-[16px] sm:flex sm:flex-wrap sm:gap-[24px]">
          {FILTERS.map(({ id, label, w, options }) => (
            <FilterSelect
              key={id}
              id={id}
              label={label}
              width={w}
              value={filterValues[id]}
              options={options}
              onChange={(v) => setFilterValues((prev) => ({ ...prev, [id]: v }))}
            />
          ))}
        </div>

        <h2 className="mt-[24px] text-[14px] leading-none font-semibold" style={{ color: HEADING }}>
          1. Choose Word Search Type
        </h2>

        {/* Type cards: 1 col (mobile) → 2 cols (sm) → 4 cols (xl) */}
        <div className="mt-[16px] grid w-full grid-cols-1 gap-[16px] sm:grid-cols-2 sm:gap-[24px] xl:grid-cols-4">
          {WORD_SEARCH_TYPES.map(({ id, title, description, icon }) => (
            <TypeCard
              key={id}
              id={id}
              title={title}
              description={description}
              icon={icon}
              selected={typeId === id}
              onSelect={setTypeId}
            />
          ))}
        </div>

        {/*
          Two columns that adapt to the available width (so it also works when the sidebar is open/closed):
          - left column: grows up to 650px, never smaller than 480px
          - right card: 381px beside the left column
          If both don't fit side by side, the right card drops below and stretches to the full width
          (up to 650px) so it lines up with the cards above it.
        */}
        <div className="mt-[24px] flex flex-wrap items-start gap-x-[31px] gap-y-[24px]">
          <div className="flex min-w-0 max-w-[650px] flex-[1000_1_480px] flex-col">
            <div>
              <h3 className="text-[14px] leading-[1.4] md:leading-none">
                <span className="font-semibold" style={{ color: HEADING }}>
                  2. Download CSV Template
                </span>{" "}
                <span className="font-medium" style={{ color: MUTED }}>
                  ({activeType.title})
                </span>
              </h3>

              <button
                type="button"
                className="mt-[12px] flex h-[38px] w-full max-w-[220px] cursor-pointer items-center justify-center gap-[8px] rounded-[7.5px] border bg-white text-[12px] font-semibold transition-colors hover:bg-[#EDEFF8]"
                style={{ borderColor: BORDER, color: HEADING }}
              >
                Download CSV Template
                <LuDownload size={12} strokeWidth={1.8} aria-hidden />
              </button>
            </div>

            <div className="mt-[28px]">
              <h3 className="text-[14px] leading-none font-semibold" style={{ color: HEADING }}>
                2. Upload CSV File
              </h3>

              <UploadBox />
            </div>

            <ColumnsPreview typeTitle={activeType.title} columns={activeType.columns} />
          </div>

          <aside
            className="flex h-auto min-h-[353px] min-w-0 max-w-[650px] flex-[1_1_381px] flex-col items-center gap-[10px] rounded-[7.5px] border-[0.75px] bg-white pt-[18px] pr-[24px] pb-[18px] pl-[23px]"
            style={{ borderColor: BORDER }}
          >
            <p className="text-center text-[14px] leading-none font-semibold" style={{ color: HEADING }}>
              Chapter Default Image
            </p>

            <img
              src={chapterDefaultImage}
              alt="Chapter Default Image"
              className="aspect-[334/271] max-h-[420px] w-full flex-none rounded-[8px] object-cover"
            />

            <p className="w-full max-w-[178px] text-center text-[12px] leading-none font-semibold" style={{ color: MUTED }}>
              Applied automatically to imported puzzles.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}