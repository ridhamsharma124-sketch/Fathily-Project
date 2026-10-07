import { useState } from "react";
import {
  PiChartPie,
  PiChatCircleDots,
  PiCoins,
  PiImage,
  PiMagnifyingGlass,
  PiMicrophone,
  PiPlus,
  PiRobot,
  PiSparkle,
  PiTranslate,
  PiTrendDown,
  PiTrendUp,
} from "react-icons/pi";

/* ==========================================================================
   SHARED STYLES
   ========================================================================== */
const inputCls =
  "h-[38px] w-[110px] rounded-[8px] border border-[#E5E7EB] bg-white px-[12px] text-[13px] text-sub outline-none transition focus:border-[#4338CA]";
const creditInputCls =
  "h-[38px] w-[109px] rounded-[8px] border border-field-border bg-white px-[12px] text-center text-[14px] font-medium text-sub outline-none transition focus:border-[#4338CA]";

function Switch({
  checked,
  onChange,
  disabled = false,
  onClass = "bg-toggle-on",
  knobOnClass = "bg-toggle-knob",
}) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      aria-pressed={checked}
      disabled={disabled}
      className={`relative h-[20px] w-[36px] cursor-pointer rounded-full transition-colors ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      } ${checked ? onClass : "bg-[#E5E7EB]"}`}
    >
      <span
        className={`absolute top-[2px] h-[16px] w-[16px] rounded-full shadow transition-all ${
          checked ? `left-[18px] ${knobOnClass}` : "left-[2px] bg-toggle-knob"
        }`}
      />
    </button>
  );
}

function UnitSelect({ options = [], value }) {
  return (
    <select
      defaultValue={value}
      className="h-[38px] cursor-pointer appearance-none rounded-[8px] border border-field-border bg-white px-[16px] text-center text-[14px] font-medium text-sub outline-none transition focus:border-[#4338CA]"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function SectionCard({ Icon, title, subtitle, children, figma = false }) {
  if (figma) {
    return (
      <div className="flex flex-col gap-[10px] rounded-[7.5px] border-[0.75px] border-field-border bg-white pb-[29px] pl-[27px] pr-[27px] pt-[28px]">
        <div className="flex items-center gap-[12px]">
          <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[10px] bg-icon-bg text-icon-color">
            <Icon size={18} />
          </div>
          <div>
            <h2 className="text-[16px] font-semibold text-heading">{title}</h2>
            <p className="mt-[1px] text-[12px] text-sub">{subtitle}</p>
          </div>
        </div>
        <div className="h-px w-full bg-line-faint" />
        <div>{children}</div>
      </div>
    );
  }
  return (
    <div className="rounded-[12px] border border-[#EEF0F5] bg-card p-[20px]">
      <div className="flex items-center gap-[12px]">
        <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[10px] bg-icon-bg text-icon-color">
          <Icon size={18} />
        </div>
        <div>
          <h2 className="text-[14px] font-bold text-heading">{title}</h2>
          <p className="mt-[1px] text-[11.5px] text-sub">{subtitle}</p>
        </div>
      </div>
      <div className="mt-[18px]">{children}</div>
    </div>
  );
}

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const STATS = [
  {
    label: "Success Rate",
    value: "12,455",
    pct: "8.5%",
    tone: "up",
    Arrow: PiTrendUp,
    type: "arrow",
  },
  {
    label: "Refunded",
    value: "3.25M",
    pct: "2.4%",
    tone: "flat",
    type: "dot",
  },
  {
    label: "Generate Coin",
    value: "896.62",
    pct: "4.6%",
    tone: "down",
    Arrow: PiTrendDown,
    type: "arrow",
  },
  {
    label: "Interaction",
    value: "97.6%",
    pct: "6.4%",
    tone: "up",
    Arrow: PiTrendUp,
    type: "arrow",
  },
];

const TONE_CLS = {
  up: "text-success",
  down: "text-danger",
  flat: "text-heading",
};

const ASSISTANTS = [
  { label: "AI Assistant", Icon: PiSparkle },
  { label: "Smart Investment", Icon: PiTrendUp },
  { label: "Image Generation", Icon: PiImage },
  { label: "Translation", Icon: PiTranslate },
  { label: "Chat Support", Icon: PiChatCircleDots },
  { label: "Data Analytics", Icon: PiChartPie },
  { label: "Voice Recognition", Icon: PiMicrophone },
  { label: "Automation", Icon: PiRobot },
];

const SEARCH_ROWS = [
  {
    label: "Enable AI Search",
    desc: "Allow AI-powered search across the app",
    type: "toggle",
  },
  {
    label: "Daily Website Search Limit",
    desc: "Set the maximum daily website search per user or IP",
    type: "number",
    value: 50,
  },
  {
    label: "Minimum Words per Search Query",
    desc: "Set minimum word requirement",
    type: "text",
    value: "2 words",
  },
  {
    label: "Maximum Search Suggestions",
    desc: "Limit search suggestions shown",
    type: "text",
    value: "5 List",
  },
  {
    label: "Max Settings per Rule",
    desc: "Limit settings configuration per rule",
    type: "number",
    value: 3,
  },
  {
    label: "Maximize Limit",
    desc: "Set the maximum limit allowed",
    type: "number",
    value: 50,
  },
  {
    label: "AI Visibility (Coming soon in future updates)",
    desc: "Enable/disable AI visibility at screen",
    type: "toggle",
    comingSoon: true,
  },
  {
    label: "Maximize Limit",
    desc: "Automatically deactivate inactive rules after (days)",
    type: "number",
    value: 50,
  },
];

const CREDIT_RULES = [
  {
    label: "Daily Website Search Limit",
    desc: "Set the maximum daily website search per user or IP",
    value: 10,
    unit: "Per Day",
    units: ["Per Day", "Per Week", "Per Month"],
  },
  {
    label: "Deduction/Use",
    desc: null,
    value: 1,
    unit: "Per Activity",
    units: ["Per Activity", "Per Day", "Per Session"],
  },
  {
    label: "Reverse Rules",
    desc: "If the fetched result is not as per Search deduct credit",
    type: "toggle",
  },
];

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AIOverview() {
  const [assistants, setAssistants] = useState(
    Object.fromEntries(ASSISTANTS.map((a) => [a.label, true])),
  );
  const [searchRows, setSearchRows] = useState({
    "Enable AI Search": true,
    "AI Visibility (Coming soon in future updates)": true,
  });
  const [reverseRules, setReverseRules] = useState(true);

  return (
    <div className="ai-theme min-h-screen space-y-6 bg-[#F8FAFC] p-6 font-[Inter]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-heading">
            AI Overview & Usage Controls
          </h1>
          <p className="mt-[2px] text-[13px] font-normal text-sub">
            Track AI usage, system health, and performance
          </p>
        </div>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-[6px] rounded-[8px] bg-primary px-[16px] py-[10px] text-[13px] font-semibold text-white transition hover:bg-primary-hover"
        >
          <PiPlus size={15} />
          Add New Journey
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-[16px]">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-[12px] border border-[#EEF0F5] bg-card p-[16px]"
          >
            <p className="text-[12px] font-medium text-emphasis">{s.label}</p>
            <p className="mt-[4px] text-[22px] font-bold leading-tight text-heading">
              {s.value}
            </p>
            <div className="mt-[8px] flex items-center gap-[5px] text-[11.5px] font-medium">
              <span className={`flex items-center gap-[5px] ${TONE_CLS[s.tone]}`}>
                {s.type === "arrow" ? (
                  <s.Arrow size={13} />
                ) : (
                  <span className="inline-block h-[6px] w-[6px] rounded-full bg-current" />
                )}
                <span>
                  {s.pct}
                  <span className="text-sub"> vs yesterday</span>
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Assistant Status */}
      <SectionCard
        Icon={PiSparkle}
        title="AI Assistant Status"
        subtitle="Set when and how your verse will be displayed"
      >
        <div className="grid grid-cols-4 gap-[16px]">
          {ASSISTANTS.map(({ label, Icon }) => (
            <div
              key={label}
              className="flex flex-col gap-[10px] rounded-[10px] border border-[#E5E7EB] p-[14px]"
            >
              <div className="flex min-w-0 items-center gap-[10px]">
                <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[8px] bg-icon-bg text-icon-color">
                  <Icon size={17} />
                </div>
                <p className="truncate text-[13px] font-semibold text-emphasis">
                  {label}
                </p>
              </div>
              <div className="ml-[46px] h-px bg-[#F0F1F5]" />
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-sub">Enable Share</p>
                <Switch
                  checked={assistants[label]}
                  onChange={(v) =>
                    setAssistants((p) => ({ ...p, [label]: v }))
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Search Engine */}
      <SectionCard
        Icon={PiMagnifyingGlass}
        title="Search Engine"
        subtitle="Configure search slots and limit per time"
      >
        <div className="divide-y divide-[#F0F1F5]">
          {SEARCH_ROWS.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-[16px] py-[14px] first:pt-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-heading">
                  {row.label}
                </p>
                <p
                  className={`mt-[2px] text-[12px] text-sub ${
                    row.comingSoon ? "italic" : ""
                  }`}
                >
                  {row.desc}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-[8px]">
                {row.type === "toggle" && (
                  <>
                    <Switch
                      checked={searchRows[row.label]}
                      onChange={(v) =>
                        setSearchRows((p) => ({ ...p, [row.label]: v }))
                      }
                      disabled={row.comingSoon}
                    />
                    {row.comingSoon && (
                      <span className="rounded-[6px] bg-[#F3F4FB] px-[8px] py-[3px] text-[11px] font-medium text-[#9CA3AF]">
                        Coming soon
                      </span>
                    )}
                  </>
                )}
                {row.type === "number" && (
                  <input
                    type="number"
                    defaultValue={row.value}
                    className={inputCls}
                  />
                )}
                {row.type === "text" && (
                  <input
                    type="text"
                    defaultValue={row.value}
                    className={inputCls}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[16px] flex justify-end">
          <button
            type="button"
            className="cursor-pointer rounded-[8px] bg-primary px-[18px] py-[10px] text-[13px] font-semibold text-white transition hover:bg-primary-hover"
          >
            Save Changes
          </button>
        </div>
      </SectionCard>

      {/* Credit Rules */}
      <div className="flex flex-col gap-[10px] rounded-[7.5px] border-[0.75px] border-field-border bg-white p-[28px_27px_29px] leading-none">
        <div className="flex items-center gap-[12px]">
          <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[10px] bg-icon-bg text-icon-color">
            <PiCoins size={18} />
          </div>
          <div>
            <h2 className="text-[16px] font-semibold text-heading">
              Credit Rules
            </h2>
            <p className="mt-[2px] text-[12px] text-sub">
              Define credit consumption and generation rules
            </p>
          </div>
        </div>
        <div className="h-px w-full bg-line-faint" />
        <div className="flex flex-col gap-[16px]">
          {CREDIT_RULES.filter((row) => row.type !== "toggle").map((row) => (
            <div
              key={row.label}
              className="flex w-full items-center justify-between gap-[16px] rounded-[7.5px] border border-line-faint bg-white p-[20px]"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-heading">
                  {row.label}
                </p>
                {row.desc && (
                  <p className="mt-[2px] text-[10px] font-normal text-sub">
                    {row.desc}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-[10px]">
                <input
                  type="number"
                  defaultValue={row.value}
                  className={creditInputCls}
                />
                <UnitSelect options={row.units} value={row.unit} />
              </div>
            </div>
          ))}
          {CREDIT_RULES.filter((row) => row.type === "toggle").map((row) => (
            <div key={row.label} className="flex flex-col gap-[16px]">
              <div className="flex items-center justify-between gap-[16px]">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold text-heading">
                    {row.label}
                  </p>
                  <p className="mt-[2px] text-[10px] font-normal text-sub">
                    {row.desc}
                  </p>
                </div>
                <Switch
                  checked={reverseRules}
                  onChange={setReverseRules}
                  onClass="bg-toggle-blue"
                  knobOnClass="bg-white"
                />
              </div>
              <div className="h-px w-full bg-line-faint" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}