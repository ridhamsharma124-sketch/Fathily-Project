import { LuChevronDown, LuRotateCw, LuImage, LuPencil, LuCheck, LuSave, LuArrowRight, LuX, LuImagePlus } from "react-icons/lu";
import { useState } from "react";
import Clues1Img from "../../../assets/word search/Clues1.png";
import Clues2Img from "../../../assets/word search/Clues2.png";

const NAVY = "#0A0847";
const GRAY = "#0A0847CC";
const GREEN = "#22C55E";
const BADGE_BG = "#E8FBEF";
const BADGE_BORDER = "#BBF7D0";
const CHIP_BG = "#EEF0FF";
const PAGE_BG = "#F9FAFE";

const selectCls =
  "h-[34px] w-full cursor-pointer appearance-none rounded-[6px] border border-[#E2DFFC] bg-white pl-[12px] pr-[28px] text-[11px] text-[#0A0847CC] outline-none";

const inputCls =
  "h-[32px] w-full rounded-[6px] border border-[#E2DFFC] bg-white px-[12px] text-[10px] text-[#0A0847CC] outline-none";

function Chevron() {
  return (
    <LuChevronDown
      size={14}
      className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2"
      style={{ color: "#444" }}
      aria-hidden
    />
  );
}

function Toggle({ on, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="relative h-[16px] w-[26px] shrink-0 cursor-pointer rounded-full transition-colors"
      style={{ backgroundColor: on ? GREEN : "#D6D6DE" }}
    >
      <span
        className="absolute top-[2px] h-[12px] w-[12px] rounded-full bg-white transition-all"
        style={{ left: on ? 12 : 2 }}
      />
    </button>
  );
}

const CLUES_1 = [
  "The waters covered the earth.",
  "Noah built one of these.",
  "Two of every kind entered.",
  "It rained for forty of these.",
  "The dove brought back an olive ___.",
  "The mountains were covered.",
  "God made a covenant with Noah.",
  "The sign in the sky.",
];

const CLUES_2 = [
  "God led His people by this.",
  "They crossed on dry ground.",
  "Manna fell from the sky.",
  "Water came from the rock.",
  "The mountain where God spoke.",
  "They traveled forty of these.",
  "God gave them His law.",
  "The land promised to them.",
];

export default function AIGenerateMysteryScripture() {
  const [hideRef, setHideRef] = useState(true);
  const [uniqueImg, setUniqueImg] = useState(true);
  const [noTextImg, setNoTextImg] = useState(true);
  const [activeTab, setActiveTab] = useState("AI Generate");

  const tabs = ["Manual Entry", "CSV Upload", "AI Generate"];

  return (
    <div className="min-h-[calc(100vh-72px)] font-[Inter]" style={{ backgroundColor: PAGE_BG }}>
      <div className="mx-auto w-full max-w-[1098px] px-6 pt-6 pb-[48px]">
        {/* HEADER */}
        <h1 className="text-[22px] font-[700]" style={{ color: NAVY }}>
          Add / Edit Word Search
        </h1>
        <p className="mt-[4px] text-[14px] font-bold" style={{ color: GRAY }}>
          Choose the activity type and how you want to create it.
        </p>
        <div className="mt-[16px]" />

        {/* TOP FILTER ROW */}
        <div className="grid grid-cols-5 gap-[24px]">
          {/* 1 */}
          <div>
            <label className="block text-[11px] font-[700]" style={{ color: NAVY }}>
              Testament
            </label>
            <div className="relative mt-[6px]">
              <select className={selectCls} defaultValue="Old Testament">
                <option>Old Testament</option>
              </select>
              <Chevron />
            </div>
          </div>
          {/* 2 */}
          <div>
            <label className="block text-[11px] font-[700]" style={{ color: NAVY }}>
              Book
            </label>
            <div className="relative mt-[6px]">
              <select className={selectCls} defaultValue="Genesis">
                <option>Genesis</option>
              </select>
              <Chevron />
            </div>
          </div>
          {/* 3 */}
          <div>
            <label className="block text-[11px] font-[700]" style={{ color: NAVY }}>
              Chapter
            </label>
            <div className="relative mt-[6px]">
              <select className={selectCls} defaultValue="1">
                <option>1</option>
              </select>
              <Chevron />
            </div>
          </div>
          {/* 4 */}
          <div>
            <label className="block text-[11px] font-[700]" style={{ color: NAVY }}>
              Difficulty
            </label>
            <div className="relative mt-[6px]">
              <select className={selectCls} defaultValue="Easy">
                <option>Easy</option>
              </select>
              <Chevron />
            </div>
          </div>
          {/* 5 */}
          <div>
            <label className="block text-[11px] font-[700]" style={{ color: NAVY }}>
              Points per Puzzle
            </label>
            <div className="relative mt-[6px]">
              <input
                className="h-[34px] w-full rounded-[6px] border border-[#E2DFFC] bg-white pr-[28px] pl-[12px] text-[11px] text-[#0A0847CC] outline-none"
                defaultValue="10"
              />
              <div className="pointer-events-none absolute top-1/2 right-2 flex -translate-y-1/2 flex-col">
                <svg width="10" height="6" viewBox="0 0 10 6">
                  <path d="M1 4L5 1L9 4" stroke="#444" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <svg width="10" height="6" viewBox="0 0 10 6" className="mt-[1px]">
                  <path d="M1 1L5 4L9 1" stroke="#444" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-[16px] w-full border-b border-[#E2DFFC]">
          <div className="flex gap-[32px]">
            {tabs.map((t) => {
              const isActive = t === activeTab;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveTab(t)}
                  className={`relative py-[10px] text-[12px] ${
                    isActive ? "font-[600]" : "font-[500]"
                  }`}
                  style={{ color: isActive ? NAVY : GRAY }}
                >
                  {t}
                  {isActive && (
                    <span
                      className="absolute bottom-[-1px] left-0 h-[2px] w-full"
                      style={{ backgroundColor: NAVY }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION HEADING */}
        <h2 className="mt-[20px] text-[16px] font-[700]" style={{ color: NAVY }}>
          AI Generate — Mystery Scripture
        </h2>
        <p className="mt-[4px] text-[12px]" style={{ color: GRAY }}>
          Generate puzzles with Scripture clues to discover the hidden passage.
        </p>

        {/* CONFIG CARD */}
        <div
          className="mt-[12px] flex w-full flex-col rounded-[7.5px] border border-[#E2DFFC] bg-white px-[27px] py-[16px]"
        >
          {/* ROW 1 */}
          <div className="flex gap-[24px]">
            <div className="w-[182px]">
              <label className="block text-[11px] font-[700]" style={{ color: NAVY }}>
                Scripture Range
              </label>
              <div className="relative mt-[6px]">
                <select className={selectCls} defaultValue="Genesis 1:1–31">
                  <option>Genesis 1:1–31</option>
                </select>
                <Chevron />
              </div>
            </div>
            <div className="w-[100px]">
              <label className="block text-[11px] font-[700]" style={{ color: NAVY }}>
                Clue Count
              </label>
              <div className="relative mt-[6px]">
                <select className={selectCls} defaultValue="8">
                  <option>8</option>
                </select>
                <Chevron />
              </div>
            </div>
            <div className="w-[143px]">
              <label className="block text-[11px] font-[700]" style={{ color: NAVY }}>
                Clue Difficulty Progression
              </label>
              <div className="relative mt-[6px]">
                <select className={selectCls} defaultValue="Easy to Hard">
                  <option>Easy to Hard</option>
                </select>
                <Chevron />
              </div>
            </div>
            <div className="flex flex-1 items-center gap-[24px]">
              <span className="text-[11px] font-[500]" style={{ color: NAVY }}>
                Hide Reference Until Completion
              </span>
              <Toggle on={hideRef} onChange={setHideRef} />
            </div>
          </div>

          {/* DIVIDER */}
          <div className="my-[10px] h-[1px] w-full bg-[#E2DFFC]" />

          {/* ROW 2 */}
          <div className="flex gap-[24px]">
            <div className="w-[182px]">
              <label className="block text-[11px] font-[700]" style={{ color: NAVY }}>
                Number of Puzzles
              </label>
              <div className="relative mt-[6px]">
                <select className={selectCls} defaultValue="2">
                  <option>2</option>
                </select>
                <Chevron />
              </div>
            </div>
            <div className="w-[100px]">
              <label className="block text-[11px] font-[700]" style={{ color: NAVY }}>
                Grid Size
              </label>
              <div className="relative mt-[6px]">
                <select className={selectCls} defaultValue="15 × 15">
                  <option>15 × 15</option>
                </select>
                <Chevron />
              </div>
            </div>
            <div className="w-[340px]">
              <label className="block text-[11px] font-[700]" style={{ color: NAVY }}>
                New Levels
              </label>
              <div className="mt-[6px] flex h-[32px] items-center gap-[6px] rounded-[6px] border border-[#E2DFFC] bg-white px-[8px]">
                <span
                  className="flex h-[20px] items-center gap-[4px] rounded-[4px] px-[6px] text-[10px]"
                  style={{ backgroundColor: CHIP_BG, color: NAVY }}
                >
                  Level 1 <LuX size={10} />
                </span>
                <span
                  className="flex h-[20px] items-center gap-[4px] rounded-[4px] px-[6px] text-[10px]"
                  style={{ backgroundColor: CHIP_BG, color: NAVY }}
                >
                  Level 2 <LuX size={10} />
                </span>
              </div>
            </div>
            <div className="w-[170px]">
              <label className="block text-[11px] font-[700]" style={{ color: NAVY }}>
                Puzzles per Level
              </label>
              <input
                className={inputCls}
                defaultValue="Level 1: 1    Level 2: 1"
                readOnly
              />
            </div>
          </div>

          {/* DIVIDER */}
          <div className="my-[10px] h-[1px] w-full bg-[#E2DFFC]" />

          {/* ROW 3 */}
          <div className="flex items-center gap-[24px]">
            <div className="flex items-center gap-[10px]">
              <Toggle on={uniqueImg} onChange={setUniqueImg} />
              <span className="text-[11px] font-[500]" style={{ color: NAVY }}>
                Generate a unique AI image for every puzzle
              </span>
            </div>
            <div className="w-[143px]">
              <label className="block text-[11px] font-[700]" style={{ color: NAVY }}>
                AI Image Style
              </label>
              <div className="relative mt-[6px]">
                <select className={selectCls} defaultValue="Biblical Illustration">
                  <option>Biblical Illustration</option>
                </select>
                <Chevron />
              </div>
            </div>
            <div className="w-[130px]">
              <label className="block text-[11px] font-[700]" style={{ color: NAVY }}>
                Image Safety
              </label>
              <div className="relative mt-[6px]">
                <select className={selectCls} defaultValue="Family Safe">
                  <option>Family Safe</option>
                </select>
                <Chevron />
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <span className="text-[11px] font-[500]" style={{ color: NAVY }}>
                No text in image
              </span>
              <Toggle on={noTextImg} onChange={setNoTextImg} />
            </div>
          </div>
        </div>

        {/* PREVIEW */}
        <h3 className="mt-[24px] text-[13px] font-[700]" style={{ color: NAVY }}>
          Generated Puzzles Preview
        </h3>
        <div className="mt-[12px] grid grid-cols-2 gap-[24px]">
          {/* CARD 1 */}
          <div className="h-[413px] w-[519px] rounded-[8px] border border-[#E2DFFC] bg-white p-[16px]">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-[500]" style={{ color: NAVY }}>
                Level 1 • Puzzle 1
              </p>
              <span
                className="flex h-[20px] items-center rounded-[6px] border px-[8px] text-[9px] font-[700] uppercase"
                style={{ backgroundColor: BADGE_BG, color: GREEN, borderColor: BADGE_BORDER }}
              >
                AI IMAGE
              </span>
            </div>
            <div className="mt-[16px] flex gap-[21px]">
              <div className="h-[223px] w-[229px] overflow-hidden rounded-[6px] border border-[#E2DFFC] bg-[#F3F4F6]">
                <img src={Clues1Img} alt="Clues 1" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-[12px] font-[700]" style={{ color: NAVY }}>
                  Clues
                </p>
                <ol className="mt-[4px] list-decimal pl-[18px] text-[11px] leading-[21px]" style={{ color: GRAY }}>
                  {CLUES_1.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="mt-[14px] flex gap-[8px]">
              <button className="flex h-[28px] items-center gap-[6px] rounded-[6px] border border-[#E2DFFC] bg-white px-[10px] text-[10px] font-[600]" style={{ color: NAVY }}>
                <LuRotateCw size={12} /> Regenerate Puzzle
              </button>
              <button className="flex h-[28px] items-center gap-[6px] rounded-[6px] border border-[#E2DFFC] bg-white px-[10px] text-[10px] font-[600]" style={{ color: NAVY }}>
                <LuImage size={12} /> Regenerate Image
              </button>
              <button className="flex h-[28px] items-center gap-[6px] rounded-[6px] border border-[#E2DFFC] bg-white px-[10px] text-[10px] font-[600]" style={{ color: NAVY }}>
                <LuImagePlus size={12} /> Replace Image
              </button>
            </div>
            <div className="mt-[10px] flex gap-[8px]">
              <button className="flex h-[28px] items-center gap-[6px] rounded-[6px] border border-[#E2DFFC] bg-white px-[10px] text-[10px] font-[600]" style={{ color: NAVY }}>
                <LuPencil size={12} /> Edit
              </button>
              <button className="flex h-[28px] items-center gap-[6px] rounded-[6px] bg-[#0A0A6E] px-[10px] text-[10px] font-[600] text-white">
                <LuCheck size={14} /> Approved
              </button>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="h-[413px] w-[519px] rounded-[8px] border border-[#E2DFFC] bg-white p-[16px]">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-[500]" style={{ color: NAVY }}>
                Level 2 • Puzzle 1
              </p>
              <span
                className="flex h-[20px] items-center rounded-[6px] border px-[8px] text-[9px] font-[700] uppercase"
                style={{ backgroundColor: BADGE_BG, color: GREEN, borderColor: BADGE_BORDER }}
              >
                AI IMAGE
              </span>
            </div>
            <div className="mt-[16px] flex gap-[21px]">
              <div className="h-[223px] w-[229px] overflow-hidden rounded-[6px] border border-[#E2DFFC] bg-[#F3F4F6]">
                <img src={Clues2Img} alt="Clues 2" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-[12px] font-[700]" style={{ color: NAVY }}>
                  Clues
                </p>
                <ol className="mt-[4px] list-decimal pl-[18px] text-[11px] leading-[21px]" style={{ color: GRAY }}>
                  {CLUES_2.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="mt-[14px] flex gap-[8px]">
              <button className="flex h-[28px] items-center gap-[6px] rounded-[6px] border border-[#E2DFFC] bg-white px-[10px] text-[10px] font-[600]" style={{ color: NAVY }}>
                <LuRotateCw size={12} /> Regenerate Puzzle
              </button>
              <button className="flex h-[28px] items-center gap-[6px] rounded-[6px] border border-[#E2DFFC] bg-white px-[10px] text-[10px] font-[600]" style={{ color: NAVY }}>
                <LuImage size={12} /> Regenerate Image
              </button>
              <button className="flex h-[28px] items-center gap-[6px] rounded-[6px] border border-[#E2DFFC] bg-white px-[10px] text-[10px] font-[600]" style={{ color: NAVY }}>
                <LuImagePlus size={12} /> Replace Image
              </button>
            </div>
            <div className="mt-[10px] flex gap-[8px]">
              <button className="flex h-[28px] items-center gap-[6px] rounded-[6px] border border-[#E2DFFC] bg-white px-[10px] text-[10px] font-[600]" style={{ color: NAVY }}>
                <LuPencil size={12} /> Edit
              </button>
              <button className="flex h-[28px] items-center gap-[6px] rounded-[6px] bg-[#0A0A6E] px-[10px] text-[10px] font-[600] text-white">
                <LuCheck size={14} /> Approved
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-[24px] flex justify-end gap-[12px]">
          <button className="flex h-[36px] items-center rounded-[6px] border border-[#E2DFFC] bg-white px-[16px] text-[12px] font-[500]" style={{ color: NAVY }}>
            Cancel
          </button>
          <button className="flex h-[36px] items-center gap-[8px] rounded-[6px] border border-[#E2DFFC] bg-white px-[16px] text-[12px] font-[500]" style={{ color: NAVY }}>
            <LuSave size={16} /> Save draft
          </button>
          <button className="flex h-[36px] items-center gap-[8px] rounded-[6px] bg-[#0A0A6E] px-[16px] text-[12px] font-[600] text-white">
            Publish Approved <LuArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}