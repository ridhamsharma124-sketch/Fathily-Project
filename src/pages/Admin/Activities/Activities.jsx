import { useState } from "react";
import bookImage from "../../../assets/book.png";
import {
  LuEye,
  LuSettings,
  LuBookOpen,
  LuFileText,
  LuInfo,
  LuCircleHelp,
  LuHeadphones,
  LuBookmark,
  LuLayers,
  LuUsers,
  LuPuzzle,
  LuClock,
  LuCircleCheck,
  LuExternalLink,
  LuPlus,
  LuPencil,
  LuTrash2,
  LuEllipsis,
  LuChevronDown,
  LuLightbulb,
} from "react-icons/lu";
import { WordSearchGlyph, MemoryVerseGlyph } from "./activityGlyphs";

/* ==========================================================================
   MOCK DATA — hardcoded exactly as specified
   ========================================================================== */
const SELECTORS = [
  { label: "Testament", value: "New Testament", iconBg: "bg-[#EEE3FE]", iconColor: "#5B0FEE", Glyph: LuBookOpen },
  { label: "Book", value: "John", iconBg: "bg-[#EEE3FE]", iconColor: "#5B0FEE", Glyph: LuBookOpen },
  { label: "Book", value: "John", iconBg: "bg-[#FBE7DA]", iconColor: "#F97316", Glyph: LuFileText },
];

const ACTIVITY_CARDS = [
  {
    id: "quiz",
    title: "Quiz",
    description: "Test knowledge with multiple question types.",
    iconBg: "bg-[#4F46E5]",
    iconColor: "#FFFFFF",
    Glyph: LuCircleHelp,
    stats: [
      { label: "Active", value: "12", Glyph: LuLayers, statBg: "bg-[#EEE3FE]", color: "#4F46E5" },
      { label: "Questions", value: "12", Glyph: LuCircleHelp, statBg: "bg-[#EEE3FE]", color: "#4F46E5" },
    ],
    buttons: [
      { label: "View Quiz", Glyph: LuEye },
      { label: "Preview", Glyph: LuExternalLink },
    ],
  },
  {
    id: "word-search",
    title: "Word Search",
    description: "Test knowledge with multiple question types.",
    iconBg: "bg-[#22C55E]",
    iconColor: "#FFFFFF",
    Glyph: WordSearchGlyph,
    stats: [
      { label: "Active", value: "8", Glyph: LuUsers, statBg: "bg-[#DCFCE7]", color: "#16A34A" },
      { label: "Words", value: "96", Glyph: LuPuzzle, statBg: "bg-[#DCFCE7]", color: "#16A34A" },
    ],
    buttons: [
      { label: "View Word Search", Glyph: LuEye },
      { label: "Preview", Glyph: LuExternalLink },
    ],
  },
  {
    id: "audio-stream",
    title: "Chapter Audio Stream",
    description: "Listen to engaging audio content.",
    iconBg: "bg-[#EEE3FE]",
    iconColor: "#041581",
    Glyph: LuHeadphones,
    stats: [
      { label: "Sessions", value: "5", Glyph: LuHeadphones, statBg: "bg-[#EEE3FE]", color: "#041581" },
      { label: "Duration", value: "25m", Glyph: LuClock, statBg: "bg-[#EEE3FE]", color: "#041581" },
    ],
    buttons: [
      { label: "View Audio Stream", Glyph: LuEye },
      { label: "Preview", Glyph: LuExternalLink },
    ],
  },
  {
    id: "memory-verse",
    title: "Memory Verse",
    description: "Learn and memorize key Bible verses.",
    iconBg: "bg-[#FDF1E4]",
    iconColor: "#F97316",
    Glyph: MemoryVerseGlyph,
    stats: [
      { label: "Verses", value: "6", Glyph: LuBookmark, statBg: "bg-[#FDF1E4]", color: "#F97316" },
      { label: "Practiced", value: "24", Glyph: LuCircleCheck, statBg: "bg-[#FDF1E4]", color: "#D4A017" },
    ],
    buttons: [
      { label: "Manage Memory Verse", Glyph: LuSettings },
      { label: "Preview", Glyph: LuExternalLink },
    ],
  },
];

const TABLE_ROWS = [
  {
    id: "1",
    name: "Quiz",
    description: "Knowledge quiz with multiple question types",
    status: "Enabled",
    content: "12 active • 96 questions",
    updated: "May 12, 2024",
    iconBg: "bg-[#4F46E5]",
    iconColor: "#FFFFFF",
    Glyph: LuCircleHelp,
  },
  {
    id: "2",
    name: "Word Search",
    description: "Word search puzzle game",
    status: "Enabled",
    content: "8 puzzles • 96 words",
    updated: "May 12, 2024",
    iconBg: "bg-[#22C55E]",
    iconColor: "#FFFFFF",
    Glyph: WordSearchGlyph,
  },
  {
    id: "3",
    name: "Chapter Audio Stream",
    description: "Audio narration of the chapter",
    status: "Enabled",
    content: "5 sessions • 25 min",
    updated: "May 12, 2024",
    iconBg: "bg-[#EEE3FE]",
    iconColor: "#041581",
    Glyph: LuHeadphones,
  },
  {
    id: "4",
    name: "Memory Verse",
    description: "Key verses for memorization and practice",
    status: "Enabled",
    content: "6 verses • 24 practiced",
    updated: "May 12, 2024",
    iconBg: "bg-[#FDF1E4]",
    iconColor: "#F97316",
    Glyph: MemoryVerseGlyph,
  },
];

/* ==========================================================================
   PRIMITIVES
   ========================================================================== */
function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-[#0A55A6]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`absolute top-[3px] h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
          checked ? "left-[25px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}

function SelectorCard({ selector }) {
  const { label, value, iconBg, iconColor, Glyph } = selector;
  return (
    <button
      type="button"
      className="flex items-center gap-4 rounded-xl border border-[#E5E4EC] bg-white px-5 py-4 text-left transition-colors hover:border-[#041581]/40"
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] ${iconBg}`}
      >
        <Glyph size={20} style={{ color: iconColor }} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] text-[#0A084799]">{label}</span>
        <span className="block truncate text-[18px] font-bold text-[#0A0847]">
          {value}
        </span>
      </span>
      <LuChevronDown
        size={18}
        className="shrink-0 text-[#0A0847CC]"
        aria-hidden
      />
    </button>
  );
}

function BookIllustration() {
  return (
    <img
      src={bookImage}
      alt="Open book illustration"
      className="h-[160px] w-[280px] shrink-0 object-contain"
    />
  );
}

function ActivityCard({ card, enabled, onToggle }) {
  const { title, description, iconBg, iconColor, Glyph, stats, buttons } = card;
  return (
    <article className="rounded-xl border border-[#EFEDF8] bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] ${iconBg}`}
          >
            <Glyph size={22} style={{ color: iconColor }} />
          </span>
          <div className="min-w-0">
            <h3 className="text-[16px] font-bold text-[#0A0847]">{title}</h3>
            <p className="mt-1 text-[13px] text-[#0A084799]">{description}</p>
          </div>
        </div>
        <Toggle checked={enabled} onChange={onToggle} label={`Toggle ${title}`} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`flex flex-col gap-1.5 rounded-lg px-3 py-3 ${stat.statBg}`}
          >
            <div className="flex items-center gap-2">
              <stat.Glyph size={16} style={{ color: stat.color }} aria-hidden />
              <span className="text-[12px] text-[#0A084799]">{stat.label}</span>
            </div>
            <span className="text-[16px] font-bold leading-none text-[#0A0847]">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            type="button"
            className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#041581] text-[13px] font-semibold text-[#041581] transition-colors hover:bg-[#041581]/5"
          >
            <btn.Glyph size={15} />
            {btn.label}
          </button>
        ))}
      </div>
    </article>
  );
}

function StatusBadge() {
  return (
    <span className="inline-block rounded-full bg-[#EAF9E9] px-3 py-[5px] text-[12px] font-semibold text-[#16A34A]">
      Enabled
    </span>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function Activities() {
  const [toggles, setToggles] = useState(() =>
    Object.fromEntries(ACTIVITY_CARDS.map((card) => [card.id, true])),
  );

  const setToggle = (id) =>
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-[#F9FAFE] font-[Inter] text-[#0A0847]">
      <div className="mx-auto max-w-[1200px] space-y-6 px-5 py-6">
        {/* header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-bold text-[#0A0847]">Activities</h1>
            <p className="mt-[6px] text-[14px] text-[#0A084799]">
              Engage and track activities for each chapter.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-[#E5E4EC] bg-white px-4 text-[13px] font-semibold text-[#0A0847] transition-colors hover:bg-[#F9FAFE]"
            >
              <LuEye size={16} />
              Preview as User
            </button>
            <button
              type="button"
              className="flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-[#041581] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#030D5C]"
            >
              <LuSettings size={16} />
              Activity Settings
            </button>
          </div>
        </div>

        {/* selector row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SELECTORS.map((selector) => (
            <SelectorCard key={`${selector.label}-${selector.value}-${selector.iconBg}`} selector={selector} />
          ))}
        </div>

        {/* selected location banner */}
        <div className="flex h-[175px] w-[1066px] max-w-full items-center justify-between gap-6 overflow-hidden rounded-xl border border-[#E5E4EC] bg-gradient-to-r from-[#F3E8FF] to-[#EDE9FE] px-6 py-5">
          <div className="min-w-0">
            <p className="text-[16px] font-bold text-[#0A0847]">Selected Location</p>
            <p className="mt-1.5 text-[13px] text-[#0A084799]">
              New Testament &gt; John &gt; Chapter 3
            </p>
            <p className="mt-1 text-[13px] text-[#0A084799]">Total Activities: 6</p>
          </div>
          <BookIllustration />
        </div>

        {/* info notice */}
        <div className="flex items-start gap-3 rounded-lg bg-[#F3F1FC] px-4 py-3.5">
          <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0A0847]/10">
            <LuInfo size={13} className="text-[#0A0847]" aria-hidden />
          </span>
          <p className="text-[13px] leading-relaxed">
            <span className="font-bold text-[#0A0847]">
              Choose which activities are available for this chapter.
            </span>
            <span className="mt-0.5 block text-[12.5px] text-[#0A084799]">
              You can enable or disable them anytime. Controls will be visible
              to manage them easily.
            </span>
          </p>
        </div>

        {/* activity cards */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {ACTIVITY_CARDS.map((card) => (
            <ActivityCard
              key={card.id}
              card={card}
              enabled={toggles[card.id]}
              onToggle={() => setToggle(card.id)}
            />
          ))}
        </div>

        {/* table section */}
        <section>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-[18px] font-bold text-[#0A0847]">
                All Activities for This Chapter
              </h2>
              <p className="mt-1 text-[13px] text-[#0A084799]">
                Overview of all activities and their status.
              </p>
            </div>
            <button
              type="button"
              className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-[#041581] bg-white px-4 text-[13px] font-semibold text-[#041581] transition-colors hover:bg-[#041581]/5"
            >
              <LuPlus size={15} />
              Add New Activity
            </button>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-[#E5E4EC] bg-white">
            <table className="w-full border-collapse text-left">
              <thead className="bg-[#F2F5FC]">
                <tr>
                  <th scope="col" className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      aria-label="Select all activities"
                      className="h-4 w-4 cursor-pointer rounded border-[#E5E4EC] accent-[#041581]"
                    />
                  </th>
                  {["Activity", "Description", "Status", "Content", "Updated", "Actions"].map(
                    (heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-4 py-3 text-[12px] font-semibold uppercase tracking-wide text-[#0A084799]"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row) => {
                  const { Glyph } = row;
                  return (
                    <tr
                      key={row.id}
                      className="border-t border-[#EFEDF8] transition-colors hover:bg-[#FAFAFE]"
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          aria-label={`Select ${row.name}`}
                          className="h-4 w-4 cursor-pointer rounded border-[#E5E4EC] accent-[#041581]"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] ${row.iconBg}`}
                          >
                            <Glyph size={16} style={{ color: row.iconColor }} aria-hidden />
                          </span>
                          <span className="text-[13.5px] font-semibold text-[#0A0847]">
                            {row.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[13px] text-[#0A084799]">
                        {row.description}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge />
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-[13px] text-[#0A084799]">
                        {row.content}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-[13px] text-[#0A084799]">
                        {row.updated}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            aria-label={`Edit ${row.name}`}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#041581] transition-colors hover:bg-[#041581]/5"
                          >
                            <LuPencil size={15} />
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete ${row.name}`}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#DC2626] transition-colors hover:bg-[#DC2626]/5"
                          >
                            <LuTrash2 size={15} />
                          </button>
                          <button
                            type="button"
                            aria-label={`More actions for ${row.name}`}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#0A084799] transition-colors hover:bg-[#0A0847]/5"
                          >
                            <LuEllipsis size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* tip banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-[#FDF1E7] px-4 py-3.5">
          <p className="flex items-start gap-2.5 text-[13px] leading-relaxed text-[#D2691E]">
            <LuLightbulb size={17} className="mt-[1px] shrink-0" aria-hidden />
            <span>
              Tip: You can reorder and hide an Activity Settings by using the
              order flow against the icon.
            </span>
          </p>
          <button
            type="button"
            className="flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-[#F97316] bg-white px-4 text-[13px] font-semibold text-[#D2691E] transition-colors hover:bg-[#F97316]/5"
          >
            <LuSettings size={15} />
            Go to Activity Settings
          </button>
        </div>
      </div>
    </div>
  );
}
