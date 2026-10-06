import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiEdit2,
  FiEye,
  FiInfo,
  FiSearch,
} from "react-icons/fi";

/* Figma tokens for this page */
const NAVY = "#0A0847";
const PRIMARY = "#041581";
const PAGE_BG = "#F9FAFE";
const INFO_BG = "#F4F5FA";
const MUTED = "#6B668F";

const TABS = ["Streak Settings", "User Streak Records"];

const STATUS_OPTIONS = ["All Streak Status", "Active", "Inactive"];
const TIER_OPTIONS = ["All Tiers", "Tier 1", "Tier 2", "Tier 3"];
const PAGE_SIZES = ["10", "25", "50", "100"];
const PAGE_NUMBERS = [1, 2, 3, 4, 5];

const USERS = [
  {
    name: "John Doe",
    email: "john.doe@daily.com",
    initials: "JD",
    avatar: "https://i.pravatar.cc/160?img=12",
    tint: "bg-[#E8EDFB] text-[#041581]",
    current: "12 days",
    longest: "34 days",
    lastActivity: "100 Points",
    status: "Active",
  },
  {
    name: "Sarah J.",
    email: "sarah.j@daily.com",
    initials: "SJ",
    avatar: "https://i.pravatar.cc/160?img=47",
    tint: "bg-[#FBE9F0] text-[#A61E62]",
    current: "7 days",
    longest: "28 days",
    lastActivity: { date: "Jul 25, 2026", source: "Quiz Completion" },
    status: "Active",
  },
  {
    name: "Michael R.",
    email: "michael.r@daily.com",
    initials: "MR",
    avatar: "https://i.pravatar.cc/160?img=33",
    tint: "bg-[#E6F6EE] text-[#12734A]",
    current: "1 day",
    longest: "12 days",
    lastActivity: { date: "Jul 25, 2026", source: "Prayer Log" },
    status: "Active",
  },
  {
    name: "Emily K.",
    email: "emily.k@daily.com",
    initials: "EK",
    avatar: "https://i.pravatar.cc/160?img=26",
    tint: "bg-[#FDF0E4] text-[#9A5B12]",
    current: "0 days",
    longest: "45 days",
    lastActivity: { date: "Jul 24, 2026", source: "Missed Day" },
    status: "Inactive",
  },
  {
    name: "David L.",
    email: "david.l@daily.com",
    initials: "DL",
    avatar: "https://i.pravatar.cc/160?img=52",
    tint: "bg-[#EDEBFB] text-[#4B32B8]",
    current: "20 days",
    longest: "20 days",
    lastActivity: { date: "Jul 25, 2026", source: "Memory Verse" },
    status: "Active",
  },
  {
    name: "Rachel M.",
    email: "rachel.m@daily.com",
    initials: "RM",
    avatar: "https://i.pravatar.cc/160?img=44",
    tint: "bg-[#E4F1F7] text-[#14607F]",
    current: "3 days",
    longest: "50 days",
    lastActivity: { date: "Jul 25, 2026", source: "Group Play" },
    status: "Active",
  },
];

const STATUS_STYLES = {
  Active: "bg-[#E9F8E8] text-[#29C31E] border-[#C6EFC3]",
  Inactive: "bg-[#F8EAEC] text-[#C44552] border-[#F2D3D7]",
};

const HOW_IT_WORKS = [
  "A streak increases when a user completes at least one qualifying activity per day.",
  "Login alone does not count toward the streak.",
  "Only one streak day can be earned per calendar day.",
  "Streaks reset if no qualifying activity is completed for 2+ days.",
];

/* 6 columns: Story | Current | Longest | Last Activity | Status | Actions */
const GRID = "grid grid-cols-[minmax(190px,1fr)_118px_118px_186px_104px_92px] items-center gap-4";

function Select({ value, onChange, options, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[38px] w-full cursor-pointer appearance-none rounded-lg border border-[#E5E4EC] bg-white py-0 pr-9 pl-3 text-[13px] text-[#0A0847] outline-none transition focus:border-[#041581]"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <FiChevronDown
        size={14}
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#8B87AD]"
      />
    </div>
  );
}

function Avatar({ initials, tint, src, name }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${tint}`}
      >
        {initials}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className="h-10 w-10 shrink-0 rounded-full bg-[#F1F2F8] object-cover"
    />
  );
}

function StreakTable() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [, setTier] = useState(TIER_OPTIONS[0]);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);

  const rows = USERS.filter((u) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchesStatus = status === STATUS_OPTIONS[0] || u.status === status;
    return matchesQuery && matchesStatus;
  });

  return (
    <>
      {/* ---------------- filter row ---------------- */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1">
          <FiSearch
            size={15}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#8B87AD]"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="h-[38px] w-full rounded-lg border border-[#E5E4EC] bg-white pr-3 pl-9 text-[13px] text-[#0A0847] outline-none transition placeholder:text-[#8B87AD] focus:border-[#041581]"
          />
        </div>

        <Select
          value={status}
          onChange={setStatus}
          options={STATUS_OPTIONS}
          className="w-[168px]"
        />
        <Select
          value={TIER_OPTIONS[0]}
          onChange={setTier}
          options={TIER_OPTIONS}
          className="w-[132px]"
        />

        <button
          type="button"
          className="flex h-[38px] shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-[#041581] px-4 text-[13px] font-semibold text-white transition hover:bg-[#030F63]"
        >
          <FiDownload size={14} /> Export
        </button>
      </div>

      {/* ---------------- table ---------------- */}
      <div className="mt-6 w-full max-w-[1067px] rounded-xl border border-[#E5E4EC] bg-white px-6 py-6">
        <div className={`${GRID} pb-4`}>
          {["Story", "Current Streak", "Longest Streak", "Last Activity", "Status", "Actions"].map(
            (h) => (
              <span key={h} className="text-[14px] font-bold" style={{ color: NAVY }}>
                {h}
              </span>
            ),
          )}
        </div>
        <div className="border-b border-[#E5E4EC]" />

        <div className="flex flex-col gap-8 pt-8">
          {rows.map((u) => (
            <div key={u.email} className={GRID}>
              <div className="flex min-w-0 items-center gap-3">
                <Avatar initials={u.initials} tint={u.tint} src={u.avatar} name={u.name} />
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-bold" style={{ color: NAVY }}>
                    {u.name}
                  </p>
                  <p className="mt-0.5 truncate text-[12px]" style={{ color: MUTED }}>
                    {u.email}
                  </p>
                </div>
              </div>

              <span className="text-[13px]" style={{ color: NAVY }}>
                {u.current}
              </span>
              <span className="text-[13px]" style={{ color: NAVY }}>
                {u.longest}
              </span>

              <div className="min-w-0">
                {typeof u.lastActivity === "string" ? (
                  <span className="text-[13px]" style={{ color: NAVY }}>
                    {u.lastActivity}
                  </span>
                ) : (
                  <>
                    <p className="text-[13px] font-bold" style={{ color: NAVY }}>
                      {u.lastActivity.date}
                    </p>
                    <p className="mt-0.5 text-[12px]" style={{ color: MUTED }}>
                      {u.lastActivity.source}
                    </p>
                  </>
                )}
              </div>

              <span
                className={`w-fit rounded-full border px-3 py-1 text-[12px] font-semibold ${STATUS_STYLES[u.status]}`}
              >
                {u.status}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={`View ${u.name}`}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[#E5E4EC] text-[#0A0847CC] transition hover:border-[#041581] hover:text-[#041581]"
                >
                  <FiEye size={15} />
                </button>
                <button
                  type="button"
                  aria-label={`Edit ${u.name}`}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[#E5E4EC] text-[#0A0847CC] transition hover:border-[#041581] hover:text-[#041581]"
                >
                  <FiEdit2 size={15} />
                </button>
              </div>
            </div>
          ))}

          {rows.length === 0 && (
            <p className="py-6 text-center text-[13px]" style={{ color: MUTED }}>
              No streak records match your filters.
            </p>
          )}
        </div>

        {/* ---------------- table footer ---------------- */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E4EC] pt-5">
          <div className="flex items-center gap-2">
            <span className="text-[13px]" style={{ color: MUTED }}>
              Display
            </span>
            <Select
              value={pageSize}
              onChange={setPageSize}
              options={PAGE_SIZES}
              className="w-[68px]"
            />
            <span className="text-[13px]" style={{ color: MUTED }}>
              users
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Previous page"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[#E5E4EC] text-[#0A0847CC] transition hover:border-[#041581] hover:text-[#041581]"
            >
              <FiChevronLeft size={14} />
            </button>

            {PAGE_NUMBERS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={`h-8 w-8 cursor-pointer rounded-md text-[13px] font-semibold transition ${
                  page === n
                    ? "bg-[#041581] text-white"
                    : "border border-[#E5E4EC] text-[#0A0847CC] hover:border-[#041581] hover:text-[#041581]"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              type="button"
              aria-label="Next page"
              onClick={() => setPage((p) => Math.min(PAGE_NUMBERS.length, p + 1))}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[#E5E4EC] text-[#0A0847CC] transition hover:border-[#041581] hover:text-[#041581]"
            >
              <FiChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- how streaks work ---------------- */}
      <div
        className="mt-6 flex min-h-[175px] w-full max-w-[1066px] flex-col gap-[10px] rounded-lg border border-[#E5E4EC] px-[25px] py-3"
        style={{ backgroundColor: INFO_BG }}
      >
        <div className="flex items-center gap-2">
          <FiInfo size={16} style={{ color: PRIMARY }} />
          <h2 className="text-[15px] font-bold" style={{ color: NAVY }}>
            How Streaks Work
          </h2>
        </div>

        <ul className="flex flex-col gap-1.5">
          {HOW_IT_WORKS.map((line) => (
            <li
              key={line}
              className="relative pl-4 text-[13px] leading-[1.35]"
              style={{ color: MUTED }}
            >
              <span
                className="absolute top-[6px] left-0 h-[4px] w-[4px] rounded-full"
                style={{ backgroundColor: MUTED }}
              />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function StreakMilestonesRewards() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(TABS[0]);

  return (
    <div
      className="min-h-[calc(100vh-72px)] font-[Inter]"
      style={{ backgroundColor: PAGE_BG, color: NAVY }}
    >
      <div className="mx-auto w-full max-w-[1067px] px-5 py-6">
        {/* ---------------- header ---------------- */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="flex cursor-pointer items-center justify-center text-[#0A0847CC] transition hover:text-[#041581]"
          >
            <FiArrowLeft size={20} />
          </button>
          <h1 className="text-[22px] font-bold leading-tight" style={{ color: NAVY }}>
            Streak Milestones &amp; Rewards
          </h1>
        </div>
        <p className="mt-1.5 text-[14px]" style={{ color: MUTED }}>
          View and manage user streak records.
        </p>

        {/* ---------------- tabs ---------------- */}
        <div className="mt-5 flex w-fit items-center gap-1 rounded-xl bg-[#F1F2F8] p-1.5">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`cursor-pointer rounded-lg px-6 py-2.5 text-[13px] transition ${
                tab === t
                  ? "bg-[#041581] font-bold text-white"
                  : "font-medium text-[#6B668F] hover:text-[#0A0847]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ---------------- tab content ---------------- */}
        <StreakTable />
      </div>
    </div>
  );
}
