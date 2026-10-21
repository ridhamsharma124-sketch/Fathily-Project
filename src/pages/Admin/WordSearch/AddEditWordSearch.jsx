import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuChevronDown, LuChevronUp, LuCheck, LuEye } from "react-icons/lu";
import puzzleImg from "../../../assets/word search/Puzzle img.webp";
import typeGrid from "../../../assets/word search/ws_type_grid.svg";
import typeGears from "../../../assets/word search/ws_type_gears.svg";
import typeAudio from "../../../assets/word search/ws_type_audio.svg";
import typeMystery from "../../../assets/word search/ws_type_mystery.svg";
import replaceIcon from "../../../assets/word search/ws_replace.svg";
import aiImageIcon from "../../../assets/word search/ws_ai_image.svg";
import resetIcon from "../../../assets/word search/ws_reset.svg";
import pencilIcon from "../../../assets/word search/ws_pencil.svg";
import uploadIcon from "../../../assets/word search/ws_upload.svg";
import sparkleIcon from "../../../assets/word search/ws_sparkle.svg";
import manualDocIcon from "../../../assets/word search/ws_manual_doc.svg";
import csvDocIcon from "../../../assets/word search/ws_csv_doc.svg";
import aiSparkleIcon from "../../../assets/word search/ws_ai_sparkle.svg";
import arrowRightIcon from "../../../assets/word search/ws_arrow_right.svg";
import chevronIcon from "../../../assets/word search/ws_chevron.svg";
import floppyIcon from "../../../assets/word search/dr_save_floppy.svg";


const NAVY = "#001984";
const HEADING = "#0A0847";
const BORDER = "#E4E7F5";
const PAGE_BG = "#F7F8FF";
const TINT_BG = "#F2F3FC";
const TINT_BORDER = "#AEB7D0";
const ICON_CIRCLE = "#D9D9D9";
const MUTED = "rgba(10, 8, 71, 0.6)";


const FIELDS = [
  { id: "testament", label: "Testament", value: "Old Testament", options: ["Old Testament", "New Testament"], width: 220 },
  { id: "book", label: "Book", value: "Genesis", options: ["Genesis", "Exodus", "Psalms", "John"], width: 142 },
  { id: "chapter", label: "Chapter", value: "1", options: ["1", "2", "3"], width: 111 },
  { id: "level", label: "Level", value: "Level 1", options: ["Level 1", "Level 2", "Level 3"], width: 122 },
  { id: "difficulty", label: "Difficulty", value: "Easy", options: ["Easy", "Medium", "Hard"], width: 142 },
];
const REWARD_WIDTH = 195;

const WORD_SEARCH_TYPES = [
  { id: "hidden", title: "Hidden Restoration", description: ["Find hidden Bible words from clues."], icon: typeGrid },
  { id: "verse", title: "Verse Restoration", description: ["Restore missing words in a verse."], icon: typeGears },
  { id: "audio", title: "Audio Revelation", description: ["Listen and identify the correct answer."], icon: typeAudio },
  { id: "mystery", title: "Mystery Scripture", description: ["Reveal the hidden Scripture."], icon: typeMystery },
];

const CREATION_METHODS = [
  {
    id: "manual",
    title: "Add Manually",
    description: ["Create and enter puzzles", "one by one."],
    icon: pencilIcon,
    descLeading: "leading-[15px]",
    descGap: "mt-[8px]",
    buttons: [{ label: "Start Manual Entry", variant: "primary", width: "w-[145px]", height: "h-[30px]" }],
  },
  {
    id: "csv",
    title: "Bulk Upload CSV",
    description: ["Upload multiple puzzles at once."],
    icon: uploadIcon,
    descLeading: "leading-[15px]",
    descGap: "mt-[8px]",
    buttons: [
      { label: "Download Template", variant: "outline", width: "", height: "h-[32px]", padding: "px-[14px]" },
      { label: "Generate AI Image", variant: "dashed", width: "w-[291px]", height: "h-[37px]", icon: uploadIcon, flush: true },
    ],
  },
  {
    id: "ai",
    title: "AI Generate",
    description: ["Let AI create puzzles for this", "chapter."],
    icon: sparkleIcon,
    descLeading: "leading-[23px]",
    descGap: "mt-[4px]",
    buttons: [{ label: "Generate with AI", variant: "primary", width: "w-[144px]", height: "h-[30px]" }],
  },
];

const POLICY = [
  { icon: manualDocIcon, label: "Manual:", text: ["chapter default image assigned", "automatically"], leading: "leading-[15px]" },
  { icon: csvDocIcon, label: "CSV:", text: ["chapter default image assigned", "unless changed"], leading: "leading-[15px]" },
  { icon: aiSparkleIcon, label: "AI Generate", text: ["unique AI image created", "for every puzzle"], leading: "leading-[23px]" },
];


function Lines({ lines }) {
  return lines.map((line) => (
    <span key={line} className="block">
      {line}
    </span>
  ));
}

function ActionButton({ label, onClick, variant = "primary", width = "", height = "h-[40px]", padding = "px-[16px]", icon }) {
  const base =
    "flex cursor-pointer items-center justify-center gap-[8px] whitespace-nowrap rounded-[6px] text-[12px] font-semibold transition-colors";
  const styles = {
    primary: { backgroundColor: NAVY, color: "#FFFFFF", border: "1px solid transparent" },
    outline: { backgroundColor: "#FFFFFF", color: NAVY, border: `1px solid ${NAVY}` },
    dashed: { backgroundColor: "#FFFFFF", color: HEADING, border: `1px dashed ${NAVY}` },
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${height} ${width} ${padding} hover:opacity-90`}
      style={styles[variant]}
    >
      {icon && <img src={icon} alt="" aria-hidden className="h-[16px] w-[16px] object-contain" />}
      {label}
    </button>
  );
}


export default function AddEditWordSearch() {
  const navigate = useNavigate();
  const [wsType, setWsType] = useState("hidden");
  const [reward, setReward] = useState(10);
  const [values, setValues] = useState(() =>
    FIELDS.reduce((acc, f) => ({ ...acc, [f.id]: f.value }), {}),
  );

  const openCreation = (id) => {
    if (id === "manual") navigate(`/admin/word-search/add-edit/manual-${wsType}`);
    if (id === "ai") {
      navigate(
        wsType === "verse"
          ? "/admin/word-search/add-edit/ai-generate/verse-restoration"
          : wsType === "audio"
          ? "/admin/word-search/add-edit/ai-generate/audio-revelation"
          : "/admin/word-search/add-edit/ai-generate",
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] font-[Inter]" style={{ backgroundColor: PAGE_BG, color: HEADING }}>
      <div className="mx-auto max-w-[1102px] px-5 py-6">
        <h1 className="text-[22px] leading-[22px] font-semibold" style={{ color: HEADING }}>
          Add / Edit Word Search
        </h1>
        <p className="mt-[18px] text-[16px] leading-[16px] font-medium" style={{ color: MUTED }}>
          Choose the activity type and how you want to create it.
        </p>

        <div className="mt-[28px] flex items-start gap-[26px]">
          {FIELDS.map(({ id, label, options, width }) => (
            <div key={id} style={{ width }} className="shrink-0">
              <label htmlFor={id} className="mb-[8px] block text-[14px] leading-[17px] font-semibold" style={{ color: HEADING }}>
                {label}
              </label>
              <div className="relative">
                <select
                  id={id}
                  value={values[id]}
                  onChange={(e) => setValues((prev) => ({ ...prev, [id]: e.target.value }))}
                  className="h-[40px] w-full cursor-pointer appearance-none rounded-[6px] border bg-white pr-[30px] pl-[12px] text-[14px] font-medium outline-none focus:border-[#001984]"
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
                  className="pointer-events-none absolute top-1/2 right-[12px] h-[8px] w-[8px] -translate-y-1/2"
                />
              </div>
            </div>
          ))}

          <div className="min-w-0 shrink-0" style={{ width: REWARD_WIDTH }}>
            <label htmlFor="reward" className="mb-[8px] block text-[14px] leading-[17px] font-semibold" style={{ color: HEADING }}>
              Reward Points
            </label>
            <div className="relative">
              <input
                id="reward"
                type="number"
                min="0"
                value={reward}
                onChange={(e) => setReward(Number(e.target.value))}
                className="h-[40px] w-full rounded-[6px] border bg-white pr-[30px] pl-[12px] text-[14px] font-medium outline-none focus:border-[#001984]"
                style={{ color: HEADING, borderColor: BORDER }}
              />
              <span className="absolute top-1/2 right-[8px] flex -translate-y-1/2 flex-col">
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label="Increase reward points"
                  onClick={() => setReward((n) => n + 1)}
                  className="flex h-[11px] w-[16px] cursor-pointer items-center justify-center"
                  style={{ color: MUTED }}
                >
                  <LuChevronUp size={10} />
                </button>
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label="Decrease reward points"
                  onClick={() => setReward((n) => Math.max(0, n - 1))}
                  className="flex h-[11px] w-[16px] cursor-pointer items-center justify-center"
                  style={{ color: MUTED }}
                >
                  <LuChevronDown size={10} />
                </button>
              </span>
            </div>
          </div>
        </div>

        <div
          className="mt-[24px] flex items-start rounded-[8px] border px-[26px] py-[28px]"
          style={{ backgroundColor: TINT_BG, borderColor: TINT_BORDER }}
        >
          <img
            src={puzzleImg}
            alt="Puzzle"
            className="h-[145px] w-[296px] shrink-0 rounded-[8px] border object-cover object-top"
            style={{ borderColor: "#AEB7E0" }}
          />

          <div className="ml-[16px] min-w-0">
            <p className="text-[16px] leading-[16px] font-semibold" style={{ color: HEADING }}>
              Default image: Genesis 1
            </p>
            <p className="mt-[16px] max-w-[480px] text-[12px] leading-[15px] font-medium" style={{ color: "rgba(10, 8, 71, 0.8)" }}>
              This image will be used as the default for all puzzles in this chapter when created
              manually or via CSV upload.
            </p>

            <div className="mt-[20px] flex items-center gap-[16px]">
              <ActionButton label="Replace Default" variant="outline" width="w-[164px]" icon={replaceIcon} />
              <ActionButton label="Generate AI Image" variant="primary" width="w-[171px]" icon={aiImageIcon} />
              <ActionButton label="Reset" variant="outline" width="w-[116px]" icon={resetIcon} />
            </div>
          </div>
        </div>

        <h2 className="mt-[24px] text-[16px] leading-[16px] font-semibold" style={{ color: HEADING }}>
          1. Choose Word Search Type
        </h2>

        <div className="mt-[22px] grid grid-cols-4 gap-[16px]">
          {WORD_SEARCH_TYPES.map(({ id, title, description, icon }) => {
            const selected = wsType === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setWsType(id)}
                className="relative flex h-[156px] cursor-pointer flex-col items-center rounded-[8px] border px-[20px] pt-[30px] text-center transition-colors"
                style={{
                  borderColor: selected ? NAVY : BORDER,
                  backgroundColor: selected ? TINT_BG : "#FFFFFF",
                }}
              >
                <img src={icon} alt="" aria-hidden className="h-[48px] w-[48px] object-contain" />
                <span className="mt-[18px] text-[14px] leading-[16px] font-semibold" style={{ color: HEADING }}>
                  {title}
                </span>
                <span className="mt-0 text-[12px] leading-[15px] font-medium" style={{ color: MUTED }}>
                  <Lines lines={description} />
                </span>

                {selected && (
                  <span
                    className="absolute top-[11px] right-[14px] flex h-[24px] w-[24px] items-center justify-center rounded-full"
                    style={{ backgroundColor: NAVY }}
                  >
                    <LuCheck size={12} strokeWidth={3} className="text-white" aria-hidden />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <h2 className="mt-[24px] text-[16px] leading-[16px] font-semibold" style={{ color: HEADING }}>
          2. Choose Creation Method
        </h2>

        <div
          className="mt-[22px] grid h-[182px] rounded-[8px] border bg-white"
          style={{ borderColor: BORDER, gridTemplateColumns: "359px 361px 1fr" }}
        >
          {CREATION_METHODS.map(({ id, title, description, icon, descLeading, descGap, buttons }) => (
            <div key={id} className="flex flex-col pt-[18px] pb-[24px] pl-[27px]">
              <div className="flex items-start gap-[12px]">
                <span
                  className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: ICON_CIRCLE }}
                >
                  <img src={icon} alt="" aria-hidden className="h-[28px] w-[28px] object-contain" />
                </span>
                <div>
                  <p className="text-[14px] leading-[16px] font-semibold" style={{ color: HEADING }}>
                    {title}
                  </p>
                  <p className={`${descGap} text-[12px] font-medium ${descLeading}`} style={{ color: MUTED }}>
                    <Lines lines={description} />
                  </p>
                </div>
              </div>

              <div className="mt-auto flex flex-col items-start gap-[12px]">
                {buttons.map((btn) => {
                  const indent = btn.flush ? "" : "ml-[48px]";
                  const onClick = btn.variant === "primary" ? () => openCreation(id) : undefined;
                  return (
                    <div key={btn.label} className={indent}>
                      <ActionButton
                        label={btn.label}
                        variant={btn.variant}
                        width={btn.width}
                        height={btn.height}
                        padding={btn.padding}
                        icon={btn.icon}
                        onClick={onClick}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-[22px] rounded-[8px] border pt-[27px] pb-[25px]"
          style={{ backgroundColor: TINT_BG, borderColor: TINT_BORDER }}
        >
          <p className="px-[27px] text-[16px] leading-[16px] font-semibold" style={{ color: HEADING }}>
            Image Usage Policy
          </p>

          <div className="mt-[33px] grid" style={{ gridTemplateColumns: "403px 372px 1fr" }}>
            {POLICY.map(({ icon, label, text, leading }) => (
              <div key={label} className="flex items-start gap-[12px] pl-[27px]">
                <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center">
                  <img src={icon} alt="" aria-hidden className="max-h-[40px] max-w-[40px] object-contain" />
                </span>
                <div>
                  <p className="text-[14px] leading-[16px] font-semibold" style={{ color: HEADING }}>
                    {label}
                  </p>
                  <p className={`mt-[8px] text-[12px] font-medium ${leading}`} style={{ color: MUTED }}>
                    <Lines lines={text} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[40px] flex items-center justify-between gap-[16px] pb-6">
          <button
            type="button"
            className="flex h-[40px] cursor-pointer items-center px-[20px] text-[14px] font-semibold"
            style={{ color: MUTED }}
          >
            Cancel
          </button>

          <div className="flex items-center gap-[16px]">
            <button
              type="button"
              className="flex h-[40px] cursor-pointer items-center gap-[8px] rounded-[6px] border bg-white px-[16px] text-[14px] font-semibold"
              style={{ color: NAVY, borderColor: BORDER }}
            >
              <img src={floppyIcon} alt="" aria-hidden className="h-[16px] w-[16px] shrink-0 object-contain" />
              Save draft
            </button>
            <button
              type="button"
              className="flex h-[40px] cursor-pointer items-center gap-[8px] rounded-[6px] border bg-white px-[16px] text-[14px] font-semibold"
              style={{ color: NAVY, borderColor: BORDER }}
            >
              <LuEye size={14} strokeWidth={2} aria-hidden />
              Preview
            </button>
            <button
              type="button"
              className="flex h-[40px] w-[190px] cursor-pointer items-center justify-center gap-[8px] rounded-[6px] text-[14px] font-semibold text-white"
              style={{ backgroundColor: NAVY }}
            >
              <img src={arrowRightIcon} alt="" aria-hidden className="h-[12px] w-[12px] object-contain" />
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}