import { useState } from "react";
import bookImage from "../../../assets/activities/book.webp";
import {
  LuEye,
  LuSettings,
  LuFileText,
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
} from "react-icons/lu";
import quizIcon from "../../../assets/activities/quiz.png";
import wordSearchIcon from "../../../assets/activities/icon-grid-green.svg";
import memoryTileIcon from "../../../assets/activities/memory_verse_tile.svg";
import microphoneIcon from "../../../assets/activities/microphone.svg";
import audioHeadphones from "../../../assets/activities/icon-headphones-outline.svg";
import selectorBook from "../../../assets/activities/icon-book-purple.svg";
import statClock from "../../../assets/activities/icon-clock.svg";
import btnEye from "../../../assets/activities/icon-eye.svg";
import btnExternal from "../../../assets/activities/btn_external.svg";
import tipBulb from "../../../assets/activities/icon-lightbulb-orange.svg";
import infoIcon from "../../../assets/activities/icon-info.svg";
import statQuizActive from "../../../assets/activities/stat_quiz_active.png";
import statQuizQuestions from "../../../assets/activities/stat_quiz_questions.png";
import statWsActive from "../../../assets/activities/stat_ws_active.png";
import statWsWords from "../../../assets/activities/icon-meeting-green.svg";

const btnImage = (label) =>
  label.startsWith("View") ? btnEye : label.startsWith("Preview") ? btnExternal : null;

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const SELECTORS = [
  { label: "Testament", value: "New Testament", tileBg: "#F1EBFF", img: selectorBook },
  { label: "Book", value: "John", tileBg: "#F1EBFF", img: selectorBook },
  { label: "Book", value: "John", tileBg: "#FFF1E3", iconColor: "#F97316", Glyph: LuFileText },
];

const ACTIVITY_CARDS = [
  {
    id: "quiz",
    title: "Quiz",
    description: "Test knowledge with multiple question types.",
    icon: quizIcon,
    stats: [
      { label: "Active", value: "12", Glyph: LuLayers, img: statQuizActive },
      { label: "Questions", value: "12", Glyph: LuCircleHelp, img: statQuizQuestions },
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
    icon: wordSearchIcon,
    stats: [
      { label: "Active", value: "8", Glyph: LuUsers, img: statWsActive, tileBg: "#E8F3EA" },
      { label: "Words", value: "96", Glyph: LuPuzzle, img: statWsWords, tileBg: "#E8F3EA" },
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
    icon: microphoneIcon,
    tileBg: "#E5E8F3",
    stats: [
      { label: "Sessions", value: "5", Glyph: LuHeadphones, img: audioHeadphones },
      { label: "Duration", value: "25m", Glyph: LuClock, img: statClock },
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
    icon: memoryTileIcon,
    stats: [
      { label: "Verses", value: "6", Glyph: LuBookmark, iconColor: "#F97316", tileBg: "#FBEEE3" },
      { label: "Practiced", value: "24", Glyph: LuCircleCheck, iconColor: "#F97316", tileBg: "#FBEEE3" },
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
    icon: quizIcon,
  },
  {
    id: "2",
    name: "Word Search",
    description: "Word search puzzle game",
    status: "Enabled",
    content: "8 puzzles • 96 words",
    updated: "May 12, 2024",
    icon: wordSearchIcon,
  },
  {
    id: "3",
    name: "Chapter Audio Stream",
    description: "Audio narration of the chapter",
    status: "Enabled",
    content: "5 sessions • 25 min",
    updated: "May 12, 2024",
    icon: microphoneIcon,
    tileBg: "#E5E8F3",
  },
  {
    id: "4",
    name: "Memory Verse",
    description: "Key verses for memorization and practice",
    status: "Enabled",
    content: "6 verses • 24 practiced",
    updated: "May 12, 2024",
    icon: memoryTileIcon,
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
      className="relative h-[18px] w-[32px] shrink-0 cursor-pointer rounded-full transition-colors"
      style={{ backgroundColor: checked ? "#001984" : "#D6D6DE" }}
    >
      <span
        className="absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white transition-all"
        style={{ left: checked ? 16 : 2 }}
      />
    </button>
  );
}

function CheckBox({ label }) {
  return (
    <input
      type="checkbox"
      aria-label={label}
      className="h-[14px] w-[14px] shrink-0 cursor-pointer appearance-none rounded-[2px] border-[1.5px] border-[#64828A] bg-white transition-colors checked:bg-[#64828A]"
    />
  );
}

/* Shared icon renderer for selector, card header, stats and table.
   - img only                -> image shown bare at `size`
   - img + tileBg            -> tile at `size`, image at `imgSize` inside
   - Glyph (no img)          -> react-icons glyph inside the tile */
function IconTile({ img, Glyph, tileBg, iconColor = "#001984", size = 53, imgSize = 36, radius = "rounded-[10px]" }) {
  if (img && !tileBg) {
    return <img src={img} alt="" className="shrink-0" style={{ width: size, height: size }} />;
  }
  return (
    <span
      className={`flex shrink-0 items-center justify-center ${radius}`}
      style={{ width: size, height: size, backgroundColor: tileBg }}
    >
      {img ? (
        <img src={img} alt="" style={{ width: imgSize, height: imgSize }} />
      ) : (
        <Glyph size={imgSize * 0.72} strokeWidth={1.5} style={{ color: iconColor }} aria-hidden />
      )}
    </span>
  );
}

function SelectorCard({ selector }) {
  const { label, value, tileBg, img, Glyph, iconColor } = selector;
  return (
    <button
      type="button"
      className="flex h-[106px] min-w-0 items-center gap-4 rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] px-[18px] py-[22px] text-left transition-colors hover:border-[#001984]/40"
    >
      <IconTile
        img={img}
        Glyph={Glyph}
        tileBg={tileBg}
        iconColor={iconColor}
        size={66}
        imgSize={36}
        radius="rounded-[16px]"
      />
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] leading-none text-[#0A0847]/60">{label}</span>
        <span className="mt-2 block truncate text-[18px] leading-none font-semibold text-[#0A0847]">
          {value}
        </span>
      </span>
      <LuChevronDown size={18} className="shrink-0 text-[#0A0847]/60" aria-hidden />
    </button>
  );
}

function ActivityCard({ card, enabled, onToggle }) {
  const { title, description, tileBg, icon, stats, buttons } = card;
  return (
    <article className="flex min-w-0 flex-col gap-[10px] rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] p-[18px] sm:pt-[22px] sm:pb-[26px] sm:pl-[17px]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <IconTile img={icon} tileBg={tileBg} size={53} imgSize={36} />
          <div className="min-w-0 flex-1">
            <h3 className="text-[16px] leading-none font-semibold text-[#0A0847]">{title}</h3>
            <p className="mt-2 text-[12px] leading-[16px] font-medium text-[#0A0847]/60">
              {description}
            </p>
          </div>
        </div>
        <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center">
          <Toggle checked={enabled} onChange={onToggle} label={`Toggle ${title}`} />
        </span>
      </div>

      <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex min-h-[77px] min-w-0 items-center gap-[10px] rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-[#FAF9FE] p-[12px]"
          >
            <IconTile
              img={stat.img}
              Glyph={stat.Glyph}
              tileBg={stat.tileBg || "#E5E8F3"}
              iconColor={stat.iconColor}
              size={46}
              imgSize={28}
              radius="rounded-lg"
            />
            <div className="min-w-0">
              <p className="text-[12px] leading-none text-[#0A0847]/60">{stat.label}</p>
              <p className="mt-1.5 text-[18px] leading-none font-semibold text-[#0A0847]">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-2">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            type="button"
            className="flex h-[43px] min-w-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#001984] bg-white px-2 text-[14px] font-medium text-[#001984] transition-colors hover:bg-[#001984]/5"
          >
            {btnImage(btn.label) ? (
              <img src={btnImage(btn.label)} alt="" className="h-[18px] w-[18px] shrink-0" />
            ) : (
              <btn.Glyph size={18} className="shrink-0" />
            )}
            <span className="truncate">{btn.label}</span>
          </button>
        ))}
      </div>
    </article>
  );
}

function StatusBadge({ status }) {
  return (
    <span className="inline-flex h-[28px] items-center rounded-lg bg-[#21AC1C]/10 px-3 text-[12px] font-medium whitespace-nowrap text-[#21AC1C]">
      {status}
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

  const setToggle = (id) => setToggles((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-[#F9FAFE] font-[Inter] text-[#0A0847]">
      <div className="flex w-full min-w-0 flex-col gap-6 px-4 py-6 sm:px-6">
        {/* HEADER */}
        <div className="flex w-full min-w-0 flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[22px] font-semibold text-[#0A0847]">Activities</h1>
            <p className="mt-1.5 text-[14px] font-medium text-[#0A0847]/60">
              Engage and track activities for each chapter.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="flex h-[42px] cursor-pointer items-center gap-2 rounded-lg border border-[#E2DFFC] bg-white px-4 text-[14px] font-medium text-[#0A0847] transition-colors hover:bg-[#F9FAFE]"
            >
              <LuEye size={16} />
              Preview as User
            </button>
            <button
              type="button"
              className="flex h-[42px] cursor-pointer items-center gap-2 rounded-lg bg-[#001984] px-4 text-[14px] font-medium text-white transition-colors hover:opacity-90"
            >
              <LuSettings size={16} />
              Activity Settings
            </button>
          </div>
        </div>

        {/* SELECTORS */}
        <div className="grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-3">
          {SELECTORS.map((selector, i) => (
            <SelectorCard key={`${selector.label}-${selector.value}-${i}`} selector={selector} />
          ))}
        </div>

        {/* SELECTED LOCATION */}
        <section className="flex w-full min-w-0 flex-col items-center gap-4 overflow-hidden rounded-lg border border-[#E2DFFC] bg-gradient-to-r from-[#FBF8FF] to-[#F6F1FF] px-5 py-6 text-center sm:flex-row sm:justify-between sm:gap-6 sm:px-6 sm:text-left">
          <div className="min-w-0">
            <p className="text-[16px] font-semibold text-[#0A0847]">Selected Location</p>
            <p className="mt-2 break-words text-[13px] text-[#0A0847]/60">
              New Testament &gt; John &gt; Chapter 3
            </p>
            <p className="mt-1.5 text-[13px] text-[#0A0847]/60">Total Activities: 6</p>
          </div>
          <img
            src={bookImage}
            alt="Open book illustration"
            className="h-[110px] w-auto max-w-full shrink-0 object-contain"
          />
        </section>

        {/* INFO BANNER */}
        <section className="flex w-full min-w-0 items-center gap-[10px] rounded-[8px] border border-[#E5E2FC] bg-[#F4F4FE] px-[13px] py-[14px]">
          <img src={infoIcon} alt="" className="h-[24px] w-[24px] shrink-0" />
          <div className="min-w-0">
            <p className="text-[12px] leading-[15px] font-medium text-[#686690]">
              Choose which activities are available for this chapter.
            </p>
            <p className="text-[12px] leading-[15px] text-[#686690]">
              You can enable or disable activities anytime. Controls will be visible to manage
              them easily.
            </p>
          </div>
        </section>

        {/* ACTIVITY CARDS */}
        <div className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
          {ACTIVITY_CARDS.map((card) => (
            <ActivityCard
              key={card.id}
              card={card}
              enabled={toggles[card.id]}
              onToggle={() => setToggle(card.id)}
            />
          ))}
        </div>

        {/* TABLE SECTION */}
        <section className="w-full min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-[16px] font-semibold text-[#0A0847]">
                All Activities for This Chapter
              </h2>
              <p className="mt-1 text-[13px] text-[#0A0847]/60">
                Overview of all activities and their status.
              </p>
            </div>
            <button
              type="button"
              className="flex h-[43px] w-[164px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#E2DFFC] bg-white text-[14px] font-medium text-[#0A0847] transition-colors hover:bg-[#F9FAFE]"
            >
              <LuPlus size={15} />
              Add New Activity
            </button>
          </div>

          <div className="mt-4 w-full min-w-0 overflow-x-auto rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="h-[50px] bg-[#F3F7FD]">
                  <th scope="col" className="px-5 py-[11.85px]">
                    <CheckBox label="Select all activities" />
                  </th>
                  {["Activity", "Description", "Status", "Content", "Updated", "Actions"].map(
                    (heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-5 py-[11.85px] text-[12px] font-medium whitespace-nowrap text-[#0A0847]/80"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row) => (
                  <tr
                    key={row.id}
                    className="h-[61px] border-b-[0.75px] border-[#E2DFFC] transition-colors hover:bg-[#FAFAFE]"
                  >
                    <td className="px-5 py-[10px]">
                      <CheckBox label={`Select ${row.name}`} />
                    </td>
                    <td className="px-5 py-[10px]">
                      <div className="flex items-center gap-2.5">
                        <IconTile
                          img={row.icon}
                          tileBg={row.tileBg}
                          size={40}
                          imgSize={24}
                          radius="rounded-[8px]"
                        />
                        <span className="text-[12px] font-medium text-[#0A0847]">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-[10px] text-[12px] text-[#0A0847]/60">
                      {row.description}
                    </td>
                    <td className="px-5 py-[10px]">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-5 py-[10px] text-[12px] font-medium whitespace-nowrap text-[#0A0847]/60">
                      {row.content}
                    </td>
                    <td className="px-5 py-[10px] text-[12px] font-medium whitespace-nowrap text-[#0A0847]/60">
                      {row.updated}
                    </td>
                    <td className="px-5 py-[10px]">
                      <div className="flex items-center gap-[10px]">
                        <button
                          type="button"
                          aria-label={`Edit ${row.name}`}
                          className="flex h-[32px] w-[31px] cursor-pointer items-center justify-center rounded-md text-[#001984] transition-colors hover:bg-[#001984]/5"
                        >
                          <LuPencil size={18} />
                        </button>
                        <button
                          type="button"
                          aria-label={`Delete ${row.name}`}
                          className="flex h-[32px] w-[31px] cursor-pointer items-center justify-center rounded-md text-[#DC2626] transition-colors hover:bg-[#DC2626]/5"
                        >
                          <LuTrash2 size={18} />
                        </button>
                        <button
                          type="button"
                          aria-label={`More actions for ${row.name}`}
                          className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[3px] bg-[#0A0847]/10 text-[#0A0847] transition-colors hover:bg-[#0A0847]/15"
                        >
                          <LuEllipsis size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* TIP BANNER */}
        <section className="flex min-h-[75px] w-full min-w-0 flex-col items-start justify-between gap-[10px] rounded-lg bg-[#FE9809]/10 px-[18px] py-4 sm:h-[75px] sm:flex-row sm:items-center sm:pr-[31px] sm:pb-[15px] sm:pl-[18px]">
          <p className="flex min-w-0 items-start gap-[10px] text-[12px] font-medium text-[#FE9809]">
            <img src={tipBulb} alt="" className="mt-[1px] h-[27px] w-[27px] shrink-0" />
            <span>
              Tip: You can reorder and hide an Activity Settings by using the order flow against
              the icon.
            </span>
          </p>
          <button
            type="button"
            className="flex h-[43px] w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-4 text-[14px] font-medium text-[#FE9809] transition-colors hover:bg-[#FFF7ED] sm:w-auto sm:justify-start"
          >
            <LuSettings size={15} style={{ color: "#FE9809" }} />
            Go to Activity Settings
          </button>
        </section>
      </div>
    </div>
  );
}