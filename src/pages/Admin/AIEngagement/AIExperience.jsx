import { useState } from "react";
import {
  PiCaretRight,
  PiFloppyDisk,
  PiPencilSimple,
  PiPlus,
  PiShieldWarning,
  PiSlidersHorizontal,
  PiTrash,
  PiWarningOctagon,
} from "react-icons/pi";

/* ==========================================================================
   SHARED STYLES
   ========================================================================== */
const thCls =
  "whitespace-nowrap bg-[#F3F4FB] px-[16px] py-[12px] text-left text-[12.5px] font-semibold text-[#4B5563]";
const tdCls = "whitespace-nowrap px-[16px] py-[12px] text-[13.5px] text-[#2A2A2A]";

function StatusPill({ children, type = "enabled" }) {
  const styles = {
    enabled: "bg-[#E6F6EA] text-[#16A34A]",
    active: "bg-[#E8E7FF] text-[#4338CA]",
  };
  return (
    <span
      className={`inline-block rounded-[6px] px-[10px] py-[4px] text-[12px] font-medium ${styles[type]}`}
    >
      {children}
    </span>
  );
}

function RowActions() {
  return (
    <div className="flex items-center gap-[10px]">
      <button
        type="button"
        aria-label="Edit"
        className="cursor-pointer text-[#9CA3AF] transition hover:text-[#0A1E46]"
      >
        <PiPencilSimple size={16} />
      </button>
      <button
        type="button"
        aria-label="Delete"
        className="cursor-pointer text-[#9CA3AF] transition hover:text-[#EF4444]"
      >
        <PiTrash size={16} />
      </button>
    </div>
  );
}

function SelectedRadio({ selected }) {
  return (
    <span
      className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 ${
        selected ? "border-[#04127F]" : "border-[#C9CDD6]"
      }`}
    >
      {selected && <span className="h-[8px] w-[8px] rounded-full bg-[#04127F]" />}
    </span>
  );
}

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const VERSIONS = [
  { name: "New International Version", abbr: "NIV", status: "Enabled", type: "enabled", selected: true },
  { name: "King James Version", abbr: "KJV", status: "Enabled", type: "enabled", selected: false },
  { name: "English Standard Version", abbr: "ESV", status: "Enabled", type: "enabled", selected: false },
  { name: "New Living Translation", abbr: "NLT", status: "Enabled", type: "enabled", selected: false },
  { name: "New American Standard Bible", abbr: "NASB", status: "Active", type: "active", selected: false },
  { name: "Amplified Bible", abbr: "AMP", status: "Active", type: "active", selected: false },
  { name: "Christian Standard Bible", abbr: "CSB", status: "Active", type: "active", selected: false },
];

const STYLES = [
  { name: "Encouraging", desc: "Warm, uplifting, and supportive responses" },
  { name: "Balanced", desc: "Neutral and informative with care" },
  { name: "Detailed", desc: "In-depth, comprehensive explanations" },
  { name: "Concise", desc: "Short, to-the-point and easy to understand" },
];

const PROMPTS = [
  "Explain John 3:16",
  "What does it mean to have faith?",
  "Write a prayer for healing",
  "What is the meaning of Psalm 23?",
  "Help me grow closer to God.",
];

const MODERATION = [
  {
    title: "Blocked Words / Topics",
    desc: "Manage blocked words and topics",
    Icon: PiShieldWarning,
    bg: "#E8E7FF",
    color: "#4338CA",
  },
  {
    title: "Sensitive Topics",
    desc: "Configure sensitive topic handling",
    Icon: PiWarningOctagon,
    bg: "#F6ECE3",
    color: "#C2703A",
  },
  {
    title: "Moderation Rules",
    desc: "Set rules and auto-moderation actions",
    Icon: PiSlidersHorizontal,
    bg: "#E8F7EC",
    color: "#22A55A",
  },
  {
    title: "Moderation Rules",
    desc: "Set rules and auto-moderation actions",
    Icon: PiSlidersHorizontal,
    bg: "#E8F7EC",
    color: "#22A55A",
  },
];

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AIExperience() {
  const [selectedVersion, setSelectedVersion] = useState("New International Version");

  return (
    <div className="min-h-screen space-y-[16px] bg-[#F8FAFC] p-6 font-[Inter]">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-bold text-[#0A1E46]">AI Experience Setup</h1>
        <p className="mt-[2px] text-[13px] font-normal text-[#6B7280]">
          Configure AI behavior, versions, and moderation.
        </p>
      </div>

      {/* Card 1: Bible Version Management */}
      <div className="overflow-hidden rounded-[12px] border border-[#EEF0F5] bg-white">
        <div className="flex items-center justify-between gap-[16px] border-b border-[#EEF0F5] px-[20px] py-[16px]">
          <div>
            <h2 className="text-[14px] font-bold text-[#0A1E46]">
              Bible Version Management
            </h2>
            <p className="mt-[1px] text-[11.5px] text-[#9CA3AF]">
              Manage available Bible versions for AI responses.
            </p>
          </div>
          <button
            type="button"
            className="flex shrink-0 cursor-pointer items-center gap-[6px] rounded-[8px] bg-[#04127F] px-[14px] py-[8px] text-[13px] font-semibold text-white transition hover:bg-[#0a1c68]"
          >
            <PiPlus size={15} />
            Add Version
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr>
                <th className={thCls}>Bible Version</th>
                <th className={thCls}>Abbreviation</th>
                <th className={thCls}>Status</th>
                <th className={thCls}>Default</th>
                <th className={`${thCls} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {VERSIONS.map((v) => (
                <tr key={v.abbr} className="border-b border-[#F0F1F5] last:border-0">
                  <td className={`${tdCls} font-semibold text-[#0A1E46]`}>{v.name}</td>
                  <td className={`${tdCls} font-semibold text-[#0A1E46]`}>{v.abbr}</td>
                  <td className={tdCls}>
                    <StatusPill type={v.type}>{v.status}</StatusPill>
                  </td>
                  <td className={tdCls}>
                    <button
                      type="button"
                      aria-label={`Set ${v.name} as default`}
                      onClick={() => setSelectedVersion(v.name)}
                      className="cursor-pointer"
                    >
                      <SelectedRadio selected={selectedVersion === v.name} />
                    </button>
                  </td>
                  <td className={`${tdCls} text-right`}>
                    <RowActions />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card 2: Response Style Management */}
      <div className="overflow-hidden rounded-[12px] border border-[#EEF0F5] bg-white">
        <div className="border-b border-[#EEF0F5] px-[20px] py-[16px]">
          <h2 className="text-[14px] font-bold text-[#0A1E46]">
            Response Style Management
          </h2>
          <p className="mt-[1px] text-[11.5px] text-[#9CA3AF]">
            Manage the style and tone of AI responses.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-left">
            <thead>
              <tr>
                <th className={thCls}>Style</th>
                <th className={thCls}>Description</th>
                <th className={thCls}>Status</th>
                <th className={`${thCls} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {STYLES.map((s) => (
                <tr key={s.name} className="border-b border-[#F0F1F5] last:border-0">
                  <td className={`${tdCls} font-semibold text-[#0A1E46]`}>{s.name}</td>
                  <td className="px-[16px] py-[12px] text-[13.5px] text-[#6B7280]">
                    {s.desc}
                  </td>
                  <td className={tdCls}>
                    <StatusPill>Enabled</StatusPill>
                  </td>
                  <td className={`${tdCls} text-right`}>
                    <RowActions />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-[20px] py-[16px]">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-[6px] rounded-[8px] border border-[#04127F] bg-white px-[14px] py-[8px] text-[13px] font-semibold text-[#04127F] transition hover:bg-[#04127F]/5"
          >
            <PiPlus size={15} />
            Add New
          </button>
        </div>
      </div>

      {/* Two column row */}
      <div className="grid grid-cols-1 items-stretch gap-[16px] lg:grid-cols-2">
        {/* Left: Homepage Prompt Suggestions */}
        <div className="overflow-hidden rounded-[12px] border border-[#EEF0F5] bg-white">
          <div className="border-b border-[#EEF0F5] px-[20px] py-[16px]">
            <h2 className="text-[14px] font-bold text-[#0A1E46]">
              Homepage Prompt Suggestions
            </h2>
            <p className="mt-[1px] text-[11.5px] text-[#9CA3AF]">
              Manage prompt suggestions shown on the homepage.
            </p>
          </div>

          <div className="divide-y divide-[#F0F1F5]">
            {PROMPTS.map((prompt, i) => (
              <div
                key={prompt}
                className="flex items-center justify-between gap-[12px] px-[20px] py-[12px]"
              >
                <div className="flex min-w-0 items-center gap-[12px]">
                  <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#F3F4FB] text-[12px] font-semibold text-[#0A1E46]">
                    {i + 1}
                  </span>
                  <p className="truncate text-[13.5px] font-medium text-[#0A1E46]">
                    {prompt}
                  </p>
                </div>
                <RowActions />
              </div>
            ))}
          </div>

          <div className="px-[20px] py-[16px]">
            <button
              type="button"
              className="flex cursor-pointer items-center gap-[6px] rounded-[8px] border border-[#04127F] bg-white px-[14px] py-[8px] text-[13px] font-semibold text-[#04127F] transition hover:bg-[#04127F]/5"
            >
              <PiPlus size={15} />
              Add Prompt
            </button>
          </div>
        </div>

        {/* Right: Content Moderation / Blocking */}
        <div className="overflow-hidden rounded-[12px] border border-[#EEF0F5] bg-white">
          <div className="border-b border-[#EEF0F5] px-[20px] py-[16px]">
            <h2 className="text-[14px] font-bold text-[#0A1E46]">
              Content Moderation / Blocking
            </h2>
            <p className="mt-[1px] text-[11.5px] text-[#9CA3AF]">
              Restrict or warn users against certain content.
            </p>
          </div>

          <div className="divide-y divide-[#F0F1F5] px-[20px]">
            {MODERATION.map((m, i) => (
              <button
                key={i}
                type="button"
                className="flex w-full cursor-pointer items-center justify-between gap-[12px] py-[12px] text-left transition hover:bg-[#F8FAFC]"
              >
                <div className="flex min-w-0 items-center gap-[12px]">
                  <div
                    className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[8px]"
                    style={{ backgroundColor: m.bg }}
                  >
                    <m.Icon size={17} style={{ color: m.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] font-semibold text-[#0A1E46]">
                      {m.title}
                    </p>
                    <p className="truncate text-[12px] text-[#6B7280]">{m.desc}</p>
                  </div>
                </div>
                <PiCaretRight size={15} className="shrink-0 text-[#9CA3AF]" />
              </button>
            ))}
          </div>

          <div className="px-[20px] py-[16px]">
            <button
              type="button"
              className="flex cursor-pointer items-center gap-[6px] rounded-[8px] border border-[#04127F] bg-white px-[14px] py-[8px] text-[13px] font-semibold text-[#04127F] transition hover:bg-[#04127F]/5"
            >
              <PiPlus size={15} />
              Add New
            </button>
          </div>
        </div>
      </div>

      {/* Bottom: Save All Changes */}
      <div className="flex justify-end">
        <button
          type="button"
          className="flex cursor-pointer items-center gap-[8px] rounded-[8px] bg-[#04127F] px-[20px] py-[10px] text-[13px] font-semibold text-white transition hover:bg-[#0a1c68]"
        >
          <PiFloppyDisk size={15} />
          Save All Changes
        </button>
      </div>
    </div>
  );
}