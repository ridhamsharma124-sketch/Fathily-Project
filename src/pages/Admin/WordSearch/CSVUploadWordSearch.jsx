import { useRef, useState } from "react";
import {
  LuAudioWaveform,
  LuBookOpen,
  LuCheck,
  LuChevronDown,
  LuCloudUpload,
  LuDownload,
  LuGrid3X3,
  LuSettings,
} from "react-icons/lu";
import chapterDefaultImage from "../../../assets/word search/Chapter Default Image.png";

/* ==========================================================================
   DATA
   ========================================================================== */
const FILTERS = [
  {
    id: "testament",
    label: "Testament",
    value: "Old Testament",
    options: ["Old Testament", "New Testament"],
  },
  { id: "book", label: "Book", value: "Genesis", options: ["Genesis", "Exodus", "Psalms", "John"] },
  { id: "chapter", label: "Chapter", value: "1", options: ["1", "2", "3"] },
  { id: "level", label: "Level", value: "Level 1", options: ["Level 1", "Level 2", "Level 3"] },
];

const WORD_SEARCH_TYPES = [
  {
    id: "hidden",
    title: "Hidden Restoration",
    description: "Find hidden Bible words from clues.",
    Glyph: LuGrid3X3,
    columns: [
      { w: "w-[123px]", name: "clue", type: "Text", description: "Puzzle clue" },
      { w: "w-[123px]", name: "answer", type: "Text", description: "Hidden word answer" },
      { w: "w-[145px]", name: "created_by", type: "Text", description: "Creator name (optional)" },
      {
        w: "w-[157px]",
        name: "difficulty",
        type: "Number",
        description: "1=Easy, 2=Medium, 3=Hard",
      },
      {
        w: "w-[157px]",
        name: "reward_points",
        type: "Number",
        description: "Points for correct answer",
      },
    ],
  },
  {
    id: "verse",
    title: "Verse Restoration",
    description: "Restore missing words in a verse.",
    Glyph: LuSettings,
    columns: [
      { w: "w-[123px]", name: "verse", type: "Text", description: "Full verse text" },
      { w: "w-[123px]", name: "missing_word", type: "Text", description: "Blanked out word" },
      { w: "w-[145px]", name: "created_by", type: "Text", description: "Creator name (optional)" },
      {
        w: "w-[157px]",
        name: "difficulty",
        type: "Number",
        description: "1=Easy, 2=Medium, 3=Hard",
      },
      {
        w: "w-[157px]",
        name: "reward_points",
        type: "Number",
        description: "Points for correct answer",
      },
    ],
  },
  {
    id: "audio",
    title: "Audio Revelation",
    description: "Listen and identify the correct answer.",
    Glyph: LuAudioWaveform,
    columns: [
      { w: "w-[145px]", name: "audio_url", type: "Text", description: "Audio file URL" },
      { w: "w-[123px]", name: "clue", type: "Text", description: "Puzzle clue" },
      { w: "w-[145px]", name: "created_by", type: "Text", description: "Creator name (optional)" },
      {
        w: "w-[157px]",
        name: "difficulty",
        type: "Number",
        description: "1=Easy, 2=Medium, 3=Hard",
      },
      {
        w: "w-[157px]",
        name: "reward_points",
        type: "Number",
        description: "Points for correct answer",
      },
    ],
  },
  {
    id: "mystery",
    title: "Mystery Scripture",
    description: "Reveal the hidden Scripture.",
    Glyph: LuBookOpen,
    columns: [
      { w: "w-[123px]", name: "scripture", type: "Text", description: "Hidden Scripture text" },
      { w: "w-[123px]", name: "clue", type: "Text", description: "Puzzle clue" },
      { w: "w-[145px]", name: "created_by", type: "Text", description: "Creator name (optional)" },
      {
        w: "w-[157px]",
        name: "difficulty",
        type: "Number",
        description: "1=Easy, 2=Medium, 3=Hard",
      },
      {
        w: "w-[157px]",
        name: "reward_points",
        type: "Number",
        description: "Points for correct answer",
      },
    ],
  },
];

/* ==========================================================================
   FILTER SELECT
   ========================================================================== */
function FilterSelect({ id, label, value, options, onChange }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-[12px] font-medium text-[#0A0847]">
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-[30px] w-full cursor-pointer appearance-none rounded-[6px] border-[0.75px] border-[#E2DFFC] bg-white pr-8 pl-3 text-[11px] text-[#0A0847]/60 outline-none focus:border-[#0A0847]/40"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>

        <LuChevronDown
          size={12}
          strokeWidth={1.8}
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#0A0847]/60"
          aria-hidden
        />
      </div>
    </div>
  );
}

/* ==========================================================================
   WORD SEARCH TYPE CARD
   ========================================================================== */
function TypeCard({ id, title, description, Glyph, selected, onSelect }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(id)}
      className={`relative flex h-[156px] flex-1 cursor-pointer flex-col items-center justify-center gap-[10px] rounded-[7.5px] border-[0.75px] px-6 py-[14px] text-center transition-colors ${
        selected
          ? "border-[#0A0847]/40 bg-[#EDEFF8]"
          : "border-[#E2DFFC] bg-white hover:bg-[#EDEFF8]"
      }`}
    >
      <Glyph size={36} strokeWidth={1.2} className="shrink-0 text-[#0A0847]" aria-hidden />

      <span className="text-[12px] font-semibold text-[#0A0847]">{title}</span>

      <span className="max-w-[150px] min-h-[26px] text-[11px] leading-[1.3] text-[#0A0847]/60">
        {description}
      </span>

      {selected && (
        <span className="absolute -top-2.5 -right-2.5 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#0A0847]">
          <LuCheck size={12} strokeWidth={2.5} className="text-white" aria-hidden />
        </span>
      )}
    </button>
  );
}

/* ==========================================================================
   UPLOAD DROP ZONE
   ========================================================================== */
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
      className={`csv-dash mt-2.5 flex h-[195px] w-[650px] cursor-pointer flex-col items-center justify-center gap-1 rounded-[8px] px-6 py-5 transition-colors ${
        dragging ? "border-[#0A0847]/60 bg-[#E4E7F4]" : "border-[#0A0847]/40 bg-[#EDEFF8]"
      }`}
    >
      <LuCloudUpload size={36} strokeWidth={1.2} className="shrink-0 text-[#0A0847]" aria-hidden />

      <p className="text-[11px] text-[#0A0847]/60">Drag and drop your CSV file here</p>

      <p className="text-[10px] text-[#0A0847]/60">or</p>

      <button
        type="button"
        className="mt-0.5 flex h-[24px] w-[120px] cursor-pointer items-center justify-center rounded-[4px] bg-[#0A0A6E] text-[11px] font-semibold text-white transition-opacity hover:opacity-90"
      >
        Browse File
      </button>

      <div className="flex items-center gap-3 text-[10px] text-[#0A0847]/60">
        <span>Accepted format: .csv only</span>
        <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-[#0A0847]/60" />
        <span>Max file size: 10MB</span>
        <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-[#0A0847]/60" />
        <span>Max 1,000 rows</span>
      </div>

      <input ref={inputRef} type="file" accept=".csv" className="hidden" />
    </div>
  );
}

/* ==========================================================================
   REQUIRED COLUMNS PREVIEW
   ========================================================================== */
function ColumnsPreview({ typeTitle, columns }) {
  return (
    <div className="mt-6 ml-8 h-[208px] w-[618px] rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-[#EDEFF8] px-[14px] py-4">
      <p className="text-[11px] font-semibold text-[#0A0847]">
        Required Columns Preview ({typeTitle})
      </p>

      <div className="mt-3 flex flex-wrap gap-[10px]">
        {columns.map(({ w, name, type, description }) => (
          <div
            key={name}
            className={`flex h-[54px] ${w} flex-col justify-center gap-1 rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white px-3 py-2.5`}
          >
            <p className="text-[11px] leading-none">
              <span className="font-semibold text-[#0A0847]">{name}</span>{" "}
              <span className="font-normal text-[#0A0847]/60">({type})</span>
            </p>
            <p className="text-[9px] leading-none text-[#0A0847]/60">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function CSVUploadWordSearch() {
  const [typeId, setTypeId] = useState("hidden");
  const [filterValues, setFilterValues] = useState(() =>
    FILTERS.reduce((acc, f) => ({ ...acc, [f.id]: f.value }), {}),
  );

  const activeType = WORD_SEARCH_TYPES.find((t) => t.id === typeId);

  return (
    <div className="mx-auto min-h-[calc(100vh-72px)] w-full max-w-[1098px] bg-[#F9FAFE] px-6 pt-10 pb-6 font-inter text-[#0A0847]">
      {/* ---------------- header ---------------- */}
      <p className="text-[13px] font-bold text-[#0A0847]/60">
        Add / Edit Word Search — CSV Upload
      </p>

      <h1 className="mt-1.5 text-[22px] leading-[1.2] font-bold text-[#0A0847]">
        1. CSV Upload — Choose Type & File
      </h1>

      <p className="mt-1.5 text-[14px] font-bold text-[#0A0847]/60">
        Choose the word search type, select your Bible content, and upload your CSV file.
      </p>

      {/* ---------------- filter row ---------------- */}
      <div className="mt-4 grid grid-cols-4 gap-6">
        {FILTERS.map(({ id, label, options }) => (
          <FilterSelect
            key={id}
            id={id}
            label={label}
            value={filterValues[id]}
            options={options}
            onChange={(v) => setFilterValues((prev) => ({ ...prev, [id]: v }))}
          />
        ))}
      </div>

      {/* ---------------- 1. word search type ---------------- */}
      <h2 className="mt-5 text-[12px] font-semibold text-[#0A0847]">1. Choose Word Search Type</h2>

      <div className="mt-2 flex w-full gap-4">
        {WORD_SEARCH_TYPES.map(({ id, title, description, Glyph }) => (
          <TypeCard
            key={id}
            id={id}
            title={title}
            description={description}
            Glyph={Glyph}
            selected={typeId === id}
            onSelect={setTypeId}
          />
        ))}
      </div>

      {/* ---------------- two column area ---------------- */}
      <div className="mt-5 flex gap-6">
        {/* left */}
        <div className="flex w-[650px] flex-col gap-8">
          {/* 2. download csv template */}
          <div>
            <h3 className="text-[12px] leading-[15px]">
              <span className="font-semibold text-[#0A0847]">2. Download CSV Template</span>{" "}
              <span className="font-normal text-[#0A0847]/60">({activeType.title})</span>
            </h3>

            <button
              type="button"
              className="mt-2.5 flex h-[28px] w-[220px] cursor-pointer items-center justify-center gap-2 rounded-[6px] border-[0.75px] border-[#0A0847]/40 bg-white text-[11px] font-medium text-[#0A0847] transition-colors hover:bg-[#EDEFF8]"
            >
              Download CSV Template
              <LuDownload size={12} strokeWidth={1.8} aria-hidden />
            </button>
          </div>

          {/* 2. upload csv file */}
          <div>
            <h3 className="text-[12px] leading-[15px] font-semibold text-[#0A0847]">
              2. Upload CSV File
            </h3>

            <UploadBox />
          </div>

          {/* required columns preview */}
          <ColumnsPreview typeTitle={activeType.title} columns={activeType.columns} />
        </div>

        {/* right */}
        <aside className="flex h-[314px] w-[334px] flex-col gap-4 rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white p-4">
          <p className="text-center text-[12px] font-semibold text-[#0A0847]">
            Chapter Default Image
          </p>

          <img
            src={chapterDefaultImage}
            alt="Chapter Default Image"
            className="mx-auto h-[178px] w-[253px] shrink-0 rounded-[6px] object-cover"
          />

          <p className="mx-auto w-[150px] text-center text-[11px] leading-[1.4] text-[#0A0847]/60">
            Applied automatically to imported puzzles.
          </p>
        </aside>
      </div>
    </div>
  );
}
