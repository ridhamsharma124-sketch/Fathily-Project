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
import johnDoeImg from "../../../assets/StreakManagemnetSvgs/John Doe.png";
import sarahJImg from "../../../assets/StreakManagemnetSvgs/Sarah J..png";
import michaelRImg from "../../../assets/StreakManagemnetSvgs/Michael R..png";
import emilyKImg from "../../../assets/StreakManagemnetSvgs/Emily K..png";
import davidLImg from "../../../assets/StreakManagemnetSvgs/David L..png";
import rachelMImg from "../../../assets/StreakManagemnetSvgs/Rachel M..png";
import EditIcon from "../../../assets/StreakManagemnetSvgs/EditIcon.svg";
import ExportIcon from "../../../assets/StreakManagemnetSvgs/ExportIcon.svg";
import InfoIcon from "../../../assets/StreakManagemnetSvgs/InfoIcon.svg";
import ViewIcon from "../../../assets/StreakManagemnetSvgs/ViewIcon.svg";


const SvgIcon = ({ src, size = 16, className = "" }) => (
              <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
            );
            
    const EditIconSvg = (p) => <SvgIcon src={EditIcon} {...p} />;
    const ExportIconSvg = (p) => <SvgIcon src={ExportIcon} {...p} />;
    const InfoIconSvg = (p) => <SvgIcon src={InfoIcon} {...p} />;
    const ViewIconSvg = (p) => <SvgIcon src={ViewIcon} {...p} />;

const TEXT = "#0A0847";
const PAGE_BG = "#F9FAFE";

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
    avatar: johnDoeImg,
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
    avatar: sarahJImg,
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
    avatar: michaelRImg,
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
    avatar: emilyKImg,
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
    avatar: davidLImg,
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
    avatar: rachelMImg,
    tint: "bg-[#E4F1F7] text-[#14607F]",
    current: "3 days",
    longest: "50 days",
    lastActivity: { date: "Jul 25, 2026", source: "Group Play" },
    status: "Active",
  },
];

const STATUS_STYLES = {
  Active: "bg-[#21AC1C1A] text-[#21AC1C] border-[#DAF3C8]",
  Inactive: "bg-[#F8EAEC] text-[#C44552] border-[#F3C9CE]",
};

const HOW_IT_WORKS = [
  "A streak increases when a user completes at least one qualifying activity per day.",
  "Login alone does not count toward the streak.",
  "Only one streak day can be earned per calendar day.",
  "Streaks reset if no qualifying activity is completed for 2+ days.",
];

/* 6 columns: Story | Current | Longest | Last Activity | Status | Actions */
const GRID =
  "grid grid-cols-[minmax(190px,1fr)_repeat(5,146px)] items-center gap-4";

function Select({
  value,
  onChange,
  options,
  className = "",
  selectClassName = "",
  showChevron = true,
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-full w-full cursor-pointer appearance-none border border-[#E2DFFC] bg-white outline-none transition focus:border-[#001984] ${selectClassName}`}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {showChevron && (
        <FiChevronDown
          size={14}
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#8B87AD]"
        />
      )}
    </div>
  );
}

function Avatar({ initials, tint, src, name }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span
        className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${tint}`}
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
      className="h-[38px] w-[38px] shrink-0 rounded-full bg-[#F1F2F8] object-cover"
    />
  );
}

function StreakTable() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [, setTier] = useState(TIER_OPTIONS[0]);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);

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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full shrink-0 sm:w-[340px]">
          <FiSearch
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#8B87AD]"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email..."
            className={`h-10 w-full rounded-[7.47px] border border-[#E2DFFC] bg-white pr-3 pl-10 text-[13px] text-[#0A0847CC] outline-none transition placeholder:text-[#0A084799] focus:border-[#001984]`}
          />
        </div>

        <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:shrink-0">
          <Select
            value={status}
            onChange={setStatus}
            options={STATUS_OPTIONS}
            className="h-10 w-full rounded-[7.47px] sm:w-[183px]"
            selectClassName={`rounded-[7.47px] py-0 pr-[50px] pl-3 text-[13px] font-medium text-[#0A0847CC]`}
          />
          <Select
            value={TIER_OPTIONS[0]}
            onChange={setTier}
            options={TIER_OPTIONS}
            className="h-10 w-full rounded-[7.47px] sm:w-[183px]"
            selectClassName={`rounded-[7.47px] py-0 pr-[50px] pl-3 text-[13px] font-medium text-[#0A0847CC]`}
          />

          <button
            type="button"
            className={`flex h-10 w-full shrink-0 cursor-pointer items-center justify-center gap-[13px] rounded-[7.47px] bg-[#001984] text-[14px] font-medium text-white transition hover:opacity-90 sm:w-[162px]`}
          >
            <ExportIconSvg size={16} /> Export
          </button>
        </div>
      </div>

      {/* ---------------- table ---------------- */}
<div className="mt-8 overflow-x-auto">
  <table className="w-full text-left text-xs min-w-[900px]">
    <thead className="bg-[#F3F7FD] border-b border-[#E2DFFC]">
      <tr>
        <th className="p-4 w-10">
          <input
            type="checkbox"
            checked={rows.length > 0 && rows.every((u) => selected.includes(u.email))}
            onChange={(e) => {
              const ids = rows.map((u) => u.email);
              setSelected((p) => (e.target.checked ? [...new Set([...p, ...ids])] : p.filter((i) => !ids.includes(i))));
            }}
            className="rounded border-gray-300 accent-[#001984] cursor-pointer"
          />
        </th>
        {["User", "Current Streak", "Longest Streak", "Last Activity", "Status"].map((h) => (
          <th key={h} className="p-4 font-medium text-sm text-[#0A0847CC]">{h}</th>
        ))}
        <th className="p-4 font-medium text-sm text-[#0A0847CC] text-right">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-[#E2DFFC] text-[#0A0847]">
      {rows.length === 0 && (
        <tr><td colSpan={7} className="p-8 text-center text-gray-400">No streak records match your filters.</td></tr>
      )}
      {rows.map((u) => (
        <tr key={u.email} className="hover:bg-gray-50/50 transition-colors">
          <td className="p-4">
            <input
              type="checkbox"
              checked={selected.includes(u.email)}
              onChange={() => setSelected((p) => (p.includes(u.email) ? p.filter((i) => i !== u.email) : [...p, u.email]))}
              className="rounded border-gray-300 accent-[#001984] cursor-pointer"
            />
          </td>
          <td className="p-4">
            <div className="flex items-center gap-3">
              <Avatar initials={u.initials} tint={u.tint} src={u.avatar} name={u.name} />
              <div className="min-w-0">
                <p className="font-medium text-[#0A0847CC] truncate">{u.name}</p>
                <p className="font-medium text-[#0A084799] truncate">{u.email}</p>
              </div>
            </div>
          </td>
          <td className="p-4 font-medium text-[#0A0847CC] whitespace-nowrap">{u.current}</td>
          <td className="p-4 font-medium text-[#0A0847CC] whitespace-nowrap">{u.longest}</td>
          <td className="p-4 whitespace-nowrap">
            {typeof u.lastActivity === "string" ? (
              <p className="font-medium text-[#0A0847CC]">{u.lastActivity}</p>
            ) : (
              <>
                <p className="font-medium text-[#0A0847CC]">{u.lastActivity.date}</p>
                <p className="font-medium text-[#0A084799]">{u.lastActivity.source}</p>
              </>
            )}
          </td>
          <td className="p-4">
            <span className={`w-24 py-1 rounded-md text-xs font-medium border inline-block text-center ${STATUS_STYLES[u.status]}`}>
              {u.status}
            </span>
          </td>
          <td className="p-4">
            <div className="flex justify-end gap-2">
              <button
                type="button"
                aria-label={`View ${u.name}`}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[#E2DFFC] bg-white text-[#001984] transition hover:border-[#001984]"
              >
                <ViewIconSvg size={16} />
              </button>
              <button
                type="button"
                aria-label={`Edit ${u.name}`}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[#E2DFFC] bg-white text-[#001984] transition hover:border-[#001984]"
              >
                <EditIconSvg size={16} />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* ---------------- table footer ---------------- */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={`text-[12px] font-medium text-[#0A0847CC]`}>
            Display
          </span>
          <Select
            value={pageSize}
            onChange={setPageSize}
            options={PAGE_SIZES}
            className="h-[28px] w-[42px] rounded-[4px]"
            selectClassName={`rounded-[4px] px-0 text-center text-[12px] font-normal text-[#0A0847CC]`}
            showChevron={false}
          />
          <span className={`text-[12px] font-normal text-[#0A084799]`}>
            users
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous page"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-[4px] border border-[#E2DFFC] text-[#0A0847CC] transition disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <FiChevronLeft size={14} />
          </button>

          {PAGE_NUMBERS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={`h-7 w-7 cursor-pointer rounded-[4px] text-[12px] font-medium transition ${
                page === n
                  ? `bg-[#001984] text-white`
                  : `border border-[#E2DFFC] text-[#0A0847CC] hover:border-[#001984]`
              }`}
            >
              {n}
            </button>
          ))}

          <button
            type="button"
            aria-label="Next page"
            onClick={() => setPage((p) => Math.min(PAGE_NUMBERS.length, p + 1))}
            className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-[4px] border border-[#E2DFFC] text-[#0A0847CC] transition`}
          >
            <FiChevronRight size={14} />
          </button>
        </div>
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
      style={{ backgroundColor: PAGE_BG, color: TEXT }}
    >
      <div className="flex w-full min-w-0 flex-col px-4 py-6 sm:px-6">
        {/* ---------------- header ---------------- */}
        <div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className={`flex cursor-pointer items-center justify-center text-[#0A0847CC] transition hover:text-[#001984]`}
            >
              <FiArrowLeft size={20} />
            </button>
            <h1
              className="text-xl font-semibold text-[#0A0847]"
            >
              Streak Milestones &amp; Rewards
            </h1>
          </div>
            <p className="text-sm text-[#0A084799] font-medium mt-2">
            View and manage user streak records.
          </p>
        </div>

        {/* ---------------- tabs ---------------- */}
        <div className="mt-[27px]">
          <div className="flex gap-[10px]">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-12 py-3.5 text-sm font-semibold rounded-t-md cursor-pointer transition-colors ${
                  tab === t
                    ? `bg-[#001984] text-white`
                    : `bg-transparent text-[#0A0847CC] hover:text-[#001984]`
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="h-[2px] w-full bg-[#E8E8E8]" />
        </div>

        {/* ---------------- tab content ---------------- */}
        {tab === TABS[1] ? (
          <div className="mt-6 border border-dashed border-[#E2DFFC] rounded-lg bg-white p-12 text-center text-xs font-medium text-gray-400">
            User Streak Records isn't built yet.
          </div>
        ) : (
          <>
            {/* ---------------- main card ---------------- */}
            <div
              className={`mt-6 w-full rounded-lg border border-[#E2DFFC] bg-white p-5`}
            >
              <StreakTable />
            </div>

            {/* ---------------- how streaks work ---------------- */}
            <div
              className={`mt-6 flex w-full flex-col gap-[10px] rounded-lg border border-[#E2DFFC] bg-[#F4F5FA] px-[25px] py-3`}
            >
              <div className="flex items-center gap-2">
                <InfoIconSvg size={16} className={`text-[#001984]`} />
                <h2 className={`text-[14px] font-semibold text-[#0A0847]`}>
                  How Streaks Work
                </h2>
              </div>

              <ul className="flex flex-col gap-2 ml-6">
                {HOW_IT_WORKS.map((line) => (
                  <li
                    key={line}
                    className={`relative pl-4 text-[13px] font-medium leading-6 text-[#0A084799]`}
                  >
                    <span
                      className={`absolute top-[10px] left-0 h-[4px] w-[4px] rounded-full bg-[#0A084799]`}
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
