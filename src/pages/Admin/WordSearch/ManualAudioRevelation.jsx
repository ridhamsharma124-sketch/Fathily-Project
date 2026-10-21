import { useState } from "react";
import puzzleImg from "../../../assets/word search/Puzzle img.webp";
import replaceIcon from "../../../assets/word search/mh_replace.svg";
import resetIcon from "../../../assets/word search/mh_reset.svg";
import aiImageIcon from "../../../assets/word search/pu_ai_image.svg";
import chevronIcon from "../../../assets/word search/mh_chevron.svg";
import floppyIcon from "../../../assets/word search/dr_save_floppy.svg";
import eyeIcon from "../../../assets/word search/mh_eye.svg";
import arrowRightIcon from "../../../assets/word search/mh_arrow_right.svg";
import fileMusicIcon from "../../../assets/word search/au_file_music.svg";
import volumeIcon from "../../../assets/word search/au_volume.svg";


const INK = "#0A0847";
const NAVY = "#001984";
const GREEN = "#2EB84B";
const PAGE_BG = "#F8F9FE";

const TABS = ["Manual Entry", "CSV Upload", "AI Generate"];

const FILTER_FIELDS = [
  { id: "testament", label: "Testament", w: "w-[221px]", value: "Old Testament", options: ["Old Testament", "New Testament"] },
  { id: "book", label: "Book", w: "w-[162px]", value: "Genesis", options: ["Genesis", "Exodus", "Psalms", "John"] },
  { id: "chapter", label: "Chapter", w: "w-[130px]", value: "1", options: ["1", "2", "3"] },
  { id: "level", label: "Level", w: "w-[139px]", value: "Level 1", options: ["Level 1", "Level 2", "Level 3"] },
  { id: "difficulty", label: "Difficulty", w: "w-[159px]", value: "Easy", options: ["Easy", "Medium", "Hard"] },
];

const GRID_OPTIONS = ["10 × 10", "12 × 12", "15 × 15", "20 × 20"];
const GRID_VALUE = "15 × 15";

const TRANSCRIPT =
  "...The LORD is my shepherd; I shall not want. He makes me lie down in green pastures...";
const PROMPT = "Listen to the audio and find the hidden words.";
const CORRECT_ANSWER = "Psalm 23 (NIV)";
const DISTRACTORS = ["Psalm 22 (NIV)", "Psalm 34 (NIV)", "Psalm 27 (NIV)"];


const WAVE_BARS = Array.from({ length: 78 }, (_, i) => {
  const s = Math.sin(i * 0.7) * 0.5 + Math.sin(i * 0.31 + 1.2) * 0.5;
  return 4 + Math.round(((s + 1) / 2) * 24);
});

const cardCls = "rounded-[8px] border border-[#EFECFB] bg-white";
const field =
  "h-[38px] w-full rounded-[8px] border border-[#E4E5F0] bg-white px-3 text-[12px] font-medium text-[#0A0847]/60 outline-none focus:border-[#001984]";
const area =
  "w-full resize-none rounded-[8px] border border-[#E4E5F0] bg-white px-3 py-2 text-[12px] font-medium leading-[1.5] text-[#0A0847]/60 outline-none focus:border-[#001984]";
const lbl = "mb-[6px] block text-[12px] font-semibold text-[#0A0847]/80";
const cardTitle = "text-[12px] font-semibold text-[#0A0847]/80";



function Icon({ src, w = 16, h = w, className = "", style }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      width={w}
      height={h}
      className={`shrink-0 ${className}`}
      style={style}
    />
  );
}

function Chevron({ className = "top-1/2 right-2.5 -translate-y-1/2", size = 14 }) {
  return (
    <Icon
      src={chevronIcon}
      w={size}
      className={`pointer-events-none absolute ${className}`}
    />
  );
}

function Select({ value, onChange, options, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${field} cursor-pointer appearance-none pr-8`}
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


function PlayButton({ size = 28, tri = 11 }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full"
      style={{ width: size, height: size, backgroundColor: NAVY }}
    >
      <svg width={tri} height={tri} viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden>
        <path d="M5 3.5v17l15-8.5z" />
      </svg>
    </span>
  );
}

function Slider({ fill = 55 }) {
  return (
    <div className="relative h-[14px] min-w-0 flex-1">
      <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#E4E5F0]" />
      <div
        className="absolute top-1/2 left-0 h-[3px] -translate-y-1/2 rounded-full"
        style={{ width: `${fill}%`, backgroundColor: NAVY }}
      />
      <span
        className="absolute top-1/2 h-[12px] w-[12px] -translate-y-1/2 rounded-full"
        style={{ left: `calc(${fill}% - 6px)`, backgroundColor: NAVY }}
      />
    </div>
  );
}

function Waveform() {
  return (
    <div className="flex h-[28px] min-w-0 flex-1 items-center justify-between">
      {WAVE_BARS.map((h, i) => (
        <span
          key={i}
          className="w-[2px] shrink-0 rounded-full"
          style={{ height: `${h}px`, backgroundColor: "#1F2A8C" }}
        />
      ))}
    </div>
  );
}

function DistractorChip({ children }) {
  return (
    <span
      className="inline-flex h-[24px] shrink-0 items-center gap-1.5 rounded-[8px] border px-2 text-[10px] font-semibold whitespace-nowrap text-[#0A0847]/80"
      style={{ backgroundColor: "#F4F2FC", borderColor: "#E3DFF6" }}
    >
      {children}
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden className="shrink-0">
        <path d="M2 2 8 8M8 2 2 8" stroke="#0926FD" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}


function FilterFields() {
  const [values, setValues] = useState(() =>
    FILTER_FIELDS.reduce((acc, f) => ({ ...acc, [f.id]: f.value }), {}),
  );
  const [reward, setReward] = useState(10);

  return (
    <div className="flex items-start gap-6">
      {FILTER_FIELDS.map(({ id, label, w, options }) => (
        <div key={id} className={w}>
          <label htmlFor={id} className="mb-2 block text-[14px] font-medium text-[#0A0240]">
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

      <div className="w-[130px] shrink-0">
        <label htmlFor="reward" className="mb-2 block text-[14px] font-medium text-[#0A0240]">
          Reward Points
        </label>
        <div className="relative">
          <input
            id="reward"
            type="number"
            min="0"
            value={reward}
            onChange={(e) => setReward(Number(e.target.value))}
            className={`${field} pr-6`}
          />
          <span className="pointer-events-none absolute top-1/2 right-1.5 flex -translate-y-1/2 flex-col">
            <button
              type="button"
              tabIndex={-1}
              aria-label="Increase reward points"
              onClick={() => setReward((n) => n + 1)}
              className="pointer-events-auto flex h-[9px] w-[14px] cursor-pointer items-center justify-center"
            >
              <Icon src={chevronIcon} w={9} className="rotate-180" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              aria-label="Decrease reward points"
              onClick={() => setReward((n) => Math.max(0, n - 1))}
              className="pointer-events-auto flex h-[9px] w-[14px] cursor-pointer items-center justify-center"
            >
              <Icon src={chevronIcon} w={9} />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

function TabsRow() {
  return (
    <div className="mt-[30px] flex items-stretch border-b border-[#E4E5F0]">
      {TABS.map((t) => {
        const active = t === "Manual Entry";
        return (
          <button
            key={t}
            type="button"
            className={`h-[46px] px-6 text-[14px] ${
              active
                ? "-mb-px border-b-2 border-[#001984] font-semibold text-[#001984]"
                : "font-medium text-[#0A0847]/60"
            }`}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

function BottomBar() {
  const [published, setPublished] = useState(true);
  return (
    <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="text-[14px] font-semibold text-[#0A0847]/60">Status</span>
        <Toggle on={published} onChange={setPublished} label="Toggle status" color={GREEN} />
        <span
          className="rounded-[6px] px-2.5 py-1 text-[12px] font-medium"
          style={{ backgroundColor: "#E3F7E6", color: GREEN }}
        >
          Published
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex h-[40px] w-[119px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#E4E5F0] bg-white text-[14px] font-semibold whitespace-nowrap text-[#0A0847]/80 transition-colors hover:bg-[#F7F8FE]"
        >
          <img src={floppyIcon} alt="" aria-hidden className="h-[16px] w-[16px] shrink-0 object-contain" />
          Save draft
        </button>
        <button
          type="button"
          className="flex h-[40px] w-[158px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#E4E5F0] bg-white text-[14px] font-semibold whitespace-nowrap text-[#0A0847]/80 transition-colors hover:bg-[#F7F8FE]"
        >
          <Icon src={eyeIcon} w={16} h={12} />
          Preview
        </button>
        <button
          type="button"
          className="flex h-[40px] w-[190px] cursor-pointer items-center justify-center gap-2 rounded-[8px] text-[14px] font-semibold whitespace-nowrap text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: NAVY }}
        >
          <Icon src={arrowRightIcon} w={16} />
          Add Puzzle
        </button>
      </div>
    </div>
  );
}

function PuzzleImageCard() {
  return (
    <div className={`${cardCls} flex w-[298px] shrink-0 flex-col px-[17px] py-4`}>
      <h2 className="text-[14px] font-semibold text-[#0A0847]/80">Puzzle Image</h2>

      <img
        src={puzzleImg}
        alt="Genesis garden and lake"
        className="mt-4 h-[152px] w-[264px] rounded-[8px] border border-[#AEB7D0] object-cover"
      />

      <div className="mt-4 flex items-start justify-between gap-2">
        <p className="text-[14px] leading-[16px] font-medium text-[#0A0847]/60">
          Chapter default image
          <br />
          applied automatically
        </p>
        <span
          className="flex h-[30px] w-[79px] shrink-0 items-center justify-center rounded-[4px] text-[12px] font-semibold text-[#001984]"
          style={{ backgroundColor: "#E3E4F6" }}
        >
          DEFAULT
        </span>
      </div>

      <div className="mt-4 flex h-[32px] items-center gap-2">
        <button
          type="button"
          className="flex h-[32px] w-[122px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[8px] bg-[#FEFEFE] px-2 text-[12px] font-semibold whitespace-nowrap text-[#0A0240] transition-colors hover:bg-[#F7F8FE]"
          style={{ border: "1px solid #E2DFFC" }}
        >
          <Icon src={replaceIcon} w={14} />
          Replace Default
        </button>
        <button
                        type="button"
                        className="flex h-[32px] w-[131px] shrink-0 cursor-pointer items-center gap-1 rounded-[8px] px-1 text-[12px] font-medium whitespace-nowrap text-white transition-opacity hover:opacity-90"
                        style={{ backgroundColor: NAVY }}
                      >
                                  <img src={aiImageIcon} alt="" aria-hidden className="h-[15px] w-[15px] shrink-0" />
      
                        Generate AI Image
                      </button>
      </div>

      <button
        type="button"
        className="mt-4 flex h-[32px] w-full cursor-pointer items-center justify-center gap-1.5 rounded-[8px] bg-white px-3 text-[12px] font-semibold whitespace-nowrap text-[#0A0240] transition-colors hover:bg-[#F7F8FE]"
        style={{ border: "1px solid #E2DFFC" }}
      >
        <Icon src={resetIcon} w={14} h={16} />
        Reset to Chapter Default
      </button>
    </div>
  );
}


function UploadAudioCard() {
  return (
    <div className={`${cardCls} w-[403px] shrink-0 px-[19px] py-4`}>
      <h2 className={cardTitle}>Upload Audio</h2>

      <div className="mt-3 flex h-[56px] items-center gap-3 rounded-[8px] border border-[#E4E5F0] bg-white px-3.5">
        <Icon src={fileMusicIcon} w={32} h={36} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-semibold text-[#0A0847]/80">psalm-23-niv.mp3</p>
          <p className="mt-0.5 text-[10px] font-medium text-[#0A0847]/60">4.2 MB</p>
        </div>
        <button
          type="button"
          className="h-[32px] shrink-0 cursor-pointer rounded-[8px] bg-white px-4 text-[12px] font-semibold whitespace-nowrap text-[#001984] transition-colors hover:bg-[#F7F8FE]"
          style={{ border: "1px solid #001984" }}
        >
          Change File
        </button>
      </div>

      <div className="mt-3 flex h-[48px] items-center gap-2 rounded-[8px] border border-[#E4E5F0] bg-white px-3.5">
        <PlayButton size={28} tri={18} />
        <Waveform />
        <span className="shrink-0 text-[12px] font-medium text-[#0A0847]/80">00:10 / 00:10</span>
      </div>

      <p className="mt-3.5 text-[12px] font-semibold text-[#0A0847]/80">Preview (15 seconds)</p>
      <div className="mt-2 flex items-center gap-2.5">
        <PlayButton size={24} tri={15} />
        <span className="shrink-0 text-[12px] font-medium text-[#0A0847]/80">00:00 / 0:15</span>
        <Slider fill={55} />
      </div>
    </div>
  );
}

function TranscriptCard() {
  const [transcript, setTranscript] = useState(TRANSCRIPT);
  return (
    <div className={`${cardCls} flex w-[403px] shrink-0 flex-1 flex-col px-[19px] py-4`}>
      <label className={lbl}>Transcript (optional)</label>
      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        className={`${area} h-[53px]`}
      />
      <p className="mt-2 text-[10px] font-medium italic text-[#0A0847]/60">
        Shown only in admin preview.
      </p>
    </div>
  );
}

function PromptCard() {
  const [prompt, setPrompt] = useState(PROMPT);
  const [answer, setAnswer] = useState(CORRECT_ANSWER);
  return (
    <div className={`${cardCls} shrink-0 px-[19px] py-4`}>
      <label className={lbl}>Prompt</label>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className={`${area} h-[65px]`}
      />
      <label className={`${lbl} mt-3`}>Correct Answer</label>
      <input value={answer} onChange={(e) => setAnswer(e.target.value)} className={field} />
    </div>
  );
}

function DistractorCard() {
  return (
    <div className={`${cardCls} shrink-0 px-[19px] py-4`}>
      <span className={`block ${cardTitle}`}>Distractor Answers</span>
      <span className="block text-[10px] font-medium italic text-[#0A0847]/60">
        (use incorrect options in word bank)
      </span>
      <div className="mt-2 flex items-stretch gap-2 rounded-[8px] border border-[#E4E5F0] bg-white p-2">
        <div className="flex min-w-0 flex-1 flex-wrap items-start gap-x-2 gap-y-2">
          {DISTRACTORS.map((d) => (
            <DistractorChip key={d}>{d}</DistractorChip>
          ))}
        </div>
        <span className="flex w-[24px] shrink-0 items-center justify-center self-stretch rounded-[6px] bg-[#F4F4FA]">
          <Icon src={chevronIcon} w={14} />
        </span>
      </div>
    </div>
  );
}

function VolumeCard() {
  return (
    <div className={`${cardCls} flex min-h-[84px] flex-1 flex-col px-[19px] py-4`}>
      <h2 className={cardTitle}>Volume Preview</h2>
      <div className="mt-3 flex items-center gap-2.5">
        <Icon src={volumeIcon} w={24} h={19} />
        <Slider fill={70} />
        <span className="shrink-0 text-[12px] font-medium text-[#0A0847]/80">70%</span>
      </div>
    </div>
  );
}


export default function ManualAudioRevelation() {
  const [puzzleTitle, setPuzzleTitle] = useState("Verse Restoration – Genesis 1:1");
  const [size, setSize] = useState(GRID_VALUE);

  return (
    <div
      className="min-h-[calc(100vh-72px)]"
      style={{
        backgroundColor: PAGE_BG,
        color: INK,
        fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="mx-auto max-w-[1118px] px-7 py-6">
        <nav className="text-[16px] font-medium text-[#0A0847]/60">
          Word Search <span className="mx-1">&gt;</span> Add <span className="mx-1">&gt;</span> Manual
        </nav>

        <h1 className="mt-[13px] text-[22px] leading-[1.2] font-semibold text-[#0A0240]">
          Add Word Search — Manual Entry
        </h1>

        <p className="mt-[13px] text-[14px] font-semibold text-[#0A0847]/60">
          Manual — Audio Revelation
        </p>

        <div className="mt-[23px]">
          <FilterFields />
        </div>

        <TabsRow />

        <div className="mt-8">
          <div className="flex items-stretch gap-5">
            <PuzzleImageCard />

            <div className="flex w-[744px] shrink-0 flex-col">
              <div className="flex h-[97px] items-stretch gap-[18px]">
                <div className={`${cardCls} w-[526px] shrink-0 px-[19px] py-4`}>
                  <label className={lbl}>Puzzle Title</label>
                  <input
                    value={puzzleTitle}
                    onChange={(e) => setPuzzleTitle(e.target.value)}
                    className={field}
                  />
                </div>
                <div className={`${cardCls} w-[200px] shrink-0 px-[19px] py-4`}>
                  <label className={lbl}>Grid Size</label>
                  <Select value={size} onChange={setSize} options={GRID_OPTIONS} className="w-full" />
                </div>
              </div>

              <div className="mt-[21px] flex min-h-[437px] items-stretch gap-[23px]">
                <div className="flex w-[403px] shrink-0 flex-col gap-3">
                  <UploadAudioCard />
                  <TranscriptCard />
                </div>
                <div className="flex w-[318px] shrink-0 flex-col gap-3">
                  <PromptCard />
                  <DistractorCard />
                  <VolumeCard />
                </div>
              </div>
            </div>
          </div>
        </div>

        <BottomBar />
      </div>
    </div>
  );
}