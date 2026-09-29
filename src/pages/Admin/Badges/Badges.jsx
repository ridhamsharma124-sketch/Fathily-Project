import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuPlus,
  LuSearch,
  LuChevronDown,
  LuPencil,
  LuTrash2,
  LuRocket,
  LuBookOpen,
  LuHandHeart,
  LuScrollText,
  LuCrown,
  LuBook,
  LuUsers,
} from "react-icons/lu";

/* ==========================================================================
   MOCK DATA — hardcoded exactly as specified
   ========================================================================== */
const TIER_CLASS = {
  Seed: "bg-[#E9FAE7] text-[#3A9A45]",
  Sprout: "bg-[#F3EEFF] border border-[#B9A4E8] text-[#5B2FA8]",
  Tree: "bg-[#E6FAFB] text-[#3A9FAA]",
};

const BADGES = [
  {
    id: 1,
    title: "First Steps",
    subtitle: "Complete first quiz",
    tier: "Seed",
    points: "Subscription & Billing",
    requirement: "Complete your first quiz",
    badgeClass: "bg-gradient-to-br from-[#1116A5] to-[#041581]",
    Glyph: LuRocket,
  },
  {
    id: 2,
    title: "Daily Devotion",
    subtitle: "7-day reading streak",
    tier: "Seed",
    points: "Subscription & Billing",
    requirement: "Maintain a 7-day reading streak",
    badgeClass: "bg-gradient-to-br from-[#F43F5E] to-[#BE123C]",
    Glyph: LuBookOpen,
  },
  {
    id: 3,
    title: "Prayer Warrior",
    subtitle: "Log 30 prayers",
    tier: "Sprout",
    points: "Gift Codes",
    requirement: "Log 30 prayers",
    badgeClass: "bg-gradient-to-br from-[#FB923C] to-[#EA580C]",
    Glyph: LuHandHeart,
  },
  {
    id: 4,
    title: "Verse Master",
    subtitle: "Memorize 10 verses",
    tier: "Sprout",
    points: "Account Settings",
    requirement: "Read all Bible chapters",
    badgeClass: "bg-gradient-to-br from-[#60A5FA] to-[#2973F8]",
    Glyph: LuScrollText,
  },
  {
    id: 5,
    title: "Faithful Friend",
    subtitle: "Invite 3 friends",
    tier: "Sprout",
    points: "Account Settings",
    requirement: "Invite 3 friends",
    badgeClass: "bg-gradient-to-br from-[#F87171] to-[#B91C1C]",
    Glyph: LuCrown,
  },
  {
    id: 6,
    title: "Bible Scholar",
    subtitle: "Read the entire Bible",
    tier: "Tree",
    points: "Account Settings",
    requirement: "Mentor 10 new users",
    badgeClass: "bg-gradient-to-br from-[#A78BFA] to-[#8043E6]",
    Glyph: LuBook,
  },
  {
    id: 7,
    title: "Community Leader",
    subtitle: "Host 5 Group Pie sessions",
    tier: "Tree",
    points: "Account Settings",
    requirement: "Log 365 prayers",
    badgeClass: "bg-gradient-to-br from-[#C4B5FD] to-[#7C3AED]",
    Glyph: LuUsers,
  },
];

/* ==========================================================================
   SMALL PRIMITIVES
   ========================================================================== */
function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-[#0A55A6]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`absolute top-[2px] h-4 w-4 rounded-full bg-white transition-all ${
          checked ? "left-[18px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

const filterSelectClass =
  "h-[38px] w-full cursor-pointer appearance-none rounded-lg border border-[#E5E4EC] bg-white pl-3 pr-8 text-[13px] text-[#0A0847CC] outline-none transition focus:border-[#041581]";

/* ==========================================================================
   PAGE 1 — BADGES MANAGEMENT
   ========================================================================== */
export default function Badges() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeStates, setActiveStates] = useState({});

  const toggleActive = (id) =>
    setActiveStates((prev) => ({ ...prev, [id]: !prev[id] }));

  const visible = BADGES.filter(
    (badge) =>
      badge.title.toLowerCase().includes(search.toLowerCase()) ||
      badge.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      badge.requirement.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#F9FAFE] font-[Inter] text-[#0A0847]">
      <div className="mx-auto max-w-[1200px] space-y-6 px-5 py-6">
        {/* header row */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-xl font-bold text-[#0A0847]">
              Badges Management
            </h1>
            <p className="mt-[6px] text-sm text-[#0A084799]">
              Create, edit and manage all badges in the system.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/admin/badges/add")}
            className="flex h-[38px] w-[150px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#041581] text-[13px] font-semibold text-white transition-colors hover:bg-[#030D5C]"
          >
            <LuPlus size={16} />
            Add New Badge
          </button>
        </div>

        {/* filter row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-[375px]">
            <LuSearch
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search badges..."
              className="h-[38px] w-full rounded-lg border border-[#E5E4EC] bg-white pl-9 pr-3 text-[13px] text-[#0A0847CC] outline-none transition focus:border-[#041581]"
            />
          </div>

          <div className="flex items-center gap-3">
            {[
              { id: "badge-tier", options: ["All Tiers", "Seed", "Sprout", "Tree"] },
              {
                id: "badge-status",
                options: ["All Statuses", "Active", "Inactive"],
              },
              {
                id: "badge-sort",
                options: ["Sort Newest", "Sort Oldest", "A-Z"],
              },
            ].map((select) => (
              <div key={select.id} className="relative w-[130px]">
                <select id={select.id} className={filterSelectClass}>
                  {select.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <LuChevronDown
                  size={15}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#0A0847CC]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* table card */}
        <div className="rounded-xl border border-[#EFEDF8] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] border-collapse">
              <thead>
                <tr className="h-[48px] bg-[#F4F7FC] text-left">
                  {["Badges", "Tier", "Points Awarded", "Requirement", "Status", "Actions"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-4 text-[15px] font-semibold text-[#0A0847CC]"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {visible.map((badge) => {
                  const Glyph = badge.Glyph;
                  return (
                    <tr
                      key={badge.id}
                      className="h-[60px] border-t border-[#EFEDF8] transition-colors hover:bg-[#F9FAFE]"
                    >
                      <td className="px-4">
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full ${badge.badgeClass}`}
                          >
                            <Glyph size={15} className="text-white" />
                          </span>
                          <div>
                            <p className="text-[14px] font-semibold text-[#0A0847]">
                              {badge.title}
                            </p>
                            <p className="text-[11px] text-[#0A084799]">
                              {badge.subtitle}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4">
                        <span
                          className={`inline-block rounded-md px-3 py-1 text-[12px] font-medium ${TIER_CLASS[badge.tier]}`}
                        >
                          {badge.tier}
                        </span>
                      </td>
                      <td className="px-4 text-[14px] text-[#0A0847]">
                        {badge.points}
                      </td>
                      <td className="px-4 text-[14px] text-[#0A0847]">
                        {badge.requirement}
                      </td>
                      <td className="px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] text-[#0A0847CC]">
                            Active
                          </span>
                          <Toggle
                            checked={activeStates[badge.id] ?? true}
                            onChange={() => toggleActive(badge.id)}
                            label={`Toggle ${badge.title}`}
                          />
                        </div>
                      </td>
                      <td className="px-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label={`Edit ${badge.title}`}
                            className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-md border border-[#E5E4EC] bg-white text-[#001984] transition-colors hover:bg-[#F9FAFE]"
                          >
                            <LuPencil size={15} />
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete ${badge.title}`}
                            className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-md border border-[#E5E4EC] bg-white text-[#E11D48] transition-colors hover:bg-[#F9FAFE]"
                          >
                            <LuTrash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {visible.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-[14px] text-[#0A084799]"
                    >
                      No badges found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#EFEDF8] px-4 py-3">
            <div className="flex items-center gap-2 text-[13px] text-[#0A084799]">
              Display
              <div className="relative">
                <select className="h-[32px] w-[64px] cursor-pointer appearance-none rounded-md border border-[#E5E4EC] bg-white pl-2 pr-6 text-[13px] text-[#0A0847CC] outline-none">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <LuChevronDown
                  size={13}
                  className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[#0A0847CC]"
                />
              </div>
              Badges
            </div>

            <div className="flex items-center gap-1.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E5E4EC] text-[15px] text-[#0A084780]">
                ‹
              </span>
              {[1, 2, 3, 4, 5].map((page) => (
                <span
                  key={page}
                  className={`flex h-8 w-8 items-center justify-center rounded-md text-[13px] ${
                    page === 1
                      ? "bg-[#041581] font-semibold text-white"
                      : "cursor-pointer border border-[#E5E4EC] text-[#0A0847CC] transition-colors hover:bg-[#F9FAFE]"
                  }`}
                >
                  {page}
                </span>
              ))}
              <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[#E5E4EC] text-[15px] text-[#0A0847CC] transition-colors hover:bg-[#F9FAFE]">
                ›
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}