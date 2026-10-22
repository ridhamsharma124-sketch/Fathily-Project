import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuPlus,
  LuSearch,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuPencil,
  LuTrash2,
} from "react-icons/lu";
import firstStepsIcon from "../../../assets/badges/first-steps.webp";
import dailyDevotionIcon from "../../../assets/badges/daily-devotion.webp";
import prayerWarriorIcon from "../../../assets/badges/prayer-warrior.webp";
import verseMasterIcon from "../../../assets/badges/verse-master.webp";
import faithfulFriendIcon from "../../../assets/badges/faithful-friend.webp";
import bibleScholarIcon from "../../../assets/badges/bible-scholar.webp";
import communityLeaderIcon from "../../../assets/badges/community-leader.webp";


const TIER_CLASS = {
  Seed: "border-[#3A9A45] bg-[#E9FAE7] text-[#3A9A45]",
  Sprout: "border-[#B9A4E8] bg-[#F3EEFF] text-[#5B2FA8]",
  Tree: "border-[#3A9FAA] bg-[#E6FAFB] text-[#3A9FAA]",
};

const BADGES = [
  {
    id: 1,
    title: "First Steps",
    subtitle: "Complete first quiz",
    tier: "Seed",
    points: "Subscription & Billing",
    requirement: "Complete your first quiz",
    iconSrc: firstStepsIcon,
  },
  {
    id: 2,
    title: "Daily Devotion",
    subtitle: "7-day reading streak",
    tier: "Seed",
    points: "Subscription & Billing",
    requirement: "Maintain a 7-day reading streak",
    iconSrc: dailyDevotionIcon,
  },
  {
    id: 3,
    title: "Prayer Warrior",
    subtitle: "Log 30 prayers",
    tier: "Sprout",
    points: "Gift Codes",
    requirement: "Log 30 prayers",
    iconSrc: prayerWarriorIcon,
  },
  {
    id: 4,
    title: "Verse Master",
    subtitle: "Memorize 10 verses",
    tier: "Sprout",
    points: "Account Settings",
    requirement: "Read all Bible chapters",
    iconSrc: verseMasterIcon,
  },
  {
    id: 5,
    title: "Faithful Friend",
    subtitle: "Invite 3 friends",
    tier: "Sprout",
    points: "Account Settings",
    requirement: "Invite 3 friends",
    iconSrc: faithfulFriendIcon,
  },
  {
    id: 6,
    title: "Bible Scholar",
    subtitle: "Read the entire Bible",
    tier: "Tree",
    points: "Account Settings",
    requirement: "Mentor 10 new users",
    iconSrc: bibleScholarIcon,
  },
  {
    id: 7,
    title: "Community Leader",
    subtitle: "Host 5 Group Pie sessions",
    tier: "Tree",
    points: "Account Settings",
    requirement: "Log 365 prayers",
    iconSrc: communityLeaderIcon,
  },
];


function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-4 w-[26px] shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-[#001984]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`absolute top-[2px] h-3 w-3 rounded-full bg-white transition-all ${
          checked ? "left-[12px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

const TH_CLASS =
  "px-4 text-[14px] font-medium leading-none text-[#0A0847]/80";
const TD_CLASS =
  "px-4 text-[12px] font-medium leading-none text-[#0A0847]/80 align-middle";


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
      <div className="w-full px-4 py-6 sm:px-7">
        <div className="mx-auto w-full max-w-[1072px] space-y-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:gap-6">
            <div>
              <h1 className="text-[22px] font-semibold leading-none text-[#0A0847]">
                Badges Management
              </h1>
              <p className="mt-[18px] text-[16px] leading-none text-[#0A0847]/60">
                Create, edit and manage all badges in the system.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/admin/badges/add")}
              className="flex h-[42px] w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#001984] text-[16px] font-semibold text-white transition-colors hover:bg-[#001984]/90 sm:w-[163px]"
            >
              <LuPlus size={16} />
              Add New Badge
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative w-full sm:w-[407px]">
              <LuSearch
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#0A0847]/60"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search badges..."
                className="h-[42px] w-full rounded-lg border border-[#E2DFFC] bg-white pl-9 pr-3 text-[12px] font-medium text-[#0A0847]/80 outline-none transition placeholder:text-[#0A0847]/60 focus:border-[#041581]"
              />
            </div>

            <div className="flex w-full flex-wrap items-center gap-[10px] sm:w-auto">
              {[
                { id: "badge-tier", w: "w-[129px]", options: ["All Tiers", "Seed", "Sprout", "Tree"] },
                {
                  id: "badge-status",
                  w: "w-[129px]",
                  options: ["All Statuses", "Active", "Inactive"],
                },
                {
                  id: "badge-sort",
                  w: "w-[144px]",
                  options: ["Sort Newest", "Sort Oldest", "A-Z"],
                },
              ].map((select) => (
                <div key={select.id} className={`relative ${select.w}`}>
                  <select
                    id={select.id}
                    className="h-[42px] w-full cursor-pointer appearance-none rounded-lg border border-[#E2DFFC] bg-white pl-3 pr-8 text-[12px] font-medium text-[#0A0847]/80 outline-none transition focus:border-[#041581]"
                  >
                    {select.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <LuChevronDown
                    size={15}
                    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#0A0847]/80"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white">
            <div className="min-w-[880px] px-[13px] pt-[13px]">
              <table className="w-full min-w-[880px] border-collapse">
                <thead>
                  <tr className="h-[50px] bg-[#EFEDF8]">
                    <th scope="col" className={`${TH_CLASS} text-left`}>
                      Badges
                    </th>
                    <th scope="col" className={`${TH_CLASS} text-center`}>
                      Tier
                    </th>
                    <th scope="col" className={`${TH_CLASS} text-left`}>
                      Points Awarded
                    </th>
                    <th scope="col" className={`${TH_CLASS} w-[155px] text-left`}>
                      Requirement
                    </th>
                    <th scope="col" className={`${TH_CLASS} text-left`}>
                      Status
                    </th>
                    <th scope="col" className={`${TH_CLASS} text-center`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((badge) => {
                    return (
                      <tr
                        key={badge.id}
                        className="h-[61px] border-t border-[#EFEDF8] transition-colors hover:bg-[#F9FAFE]"
                      >
                        <td className="px-4 align-middle">
                          <div className="flex items-center gap-3">
                            <img
                              src={badge.iconSrc}
                              alt=""
                              className="h-10 w-10 shrink-0"
                            />
                            <div>
                              <p className="text-[14px] font-medium leading-none text-[#0A0847]/80">
                                {badge.title}
                              </p>
                              <p className="mt-1 text-[10px] font-medium leading-none text-[#0A0847]/60">
                                {badge.subtitle}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 text-center align-middle">
                          <span
                            className={`inline-block rounded-lg border px-3 py-1 text-[12px] font-medium leading-none ${TIER_CLASS[badge.tier]}`}
                          >
                            {badge.tier}
                          </span>
                        </td>
                        <td className={TD_CLASS}>{badge.points}</td>
                        <td className={TD_CLASS}>{badge.requirement}</td>
                        <td className="px-4 align-middle">
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] font-medium leading-none text-[#0A0847]/80">
                              Active
                            </span>
                            <Toggle
                              checked={activeStates[badge.id] ?? true}
                              onChange={() => toggleActive(badge.id)}
                              label={`Toggle ${badge.title}`}
                            />
                          </div>
                        </td>
                        <td className="px-4 align-middle">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              aria-label={`Edit ${badge.title}`}
                              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[6px] border border-[#E2DFFC] bg-white text-[#001984] transition-colors hover:bg-[#F9FAFE]"
                            >
                              <LuPencil size={15} />
                            </button>
                            <button
                              type="button"
                              aria-label={`Delete ${badge.title}`}
                              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[6px] border border-[#E2DFFC] bg-white text-[#E11D48] transition-colors hover:bg-[#F9FAFE]"
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
                        className="px-4 py-10 text-center text-[12px] font-medium text-[#0A0847]/60"
                      >
                        No badges found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#EFEDF8] px-[13px] py-3">
              <div className="flex items-center gap-2 text-[12px] font-normal leading-none text-[#0A0847]/60">
                Display
                <div className="relative">
                  <select className="h-[32px] w-[64px] cursor-pointer appearance-none rounded-md border border-[#E2DFFC] bg-white pl-2 pr-6 text-[12px] font-normal text-[#0A0847]/80 outline-none">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>
                  <LuChevronDown
                    size={13}
                    className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[#0A0847]/80"
                  />
                </div>
                Badges
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled
                  aria-label="Previous page"
                  className="flex h-6 w-6 cursor-not-allowed items-center justify-center rounded-[3px] border border-[#E2DFFC] text-[#0A0847]/30"
                >
                  <LuChevronLeft size={14} />
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    type="button"
                    aria-current={page === 1 ? "page" : undefined}
                    className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-[3px] text-[12px] leading-none ${
                      page === 1
                        ? "bg-[#001984] font-semibold text-white"
                        : "border border-[#E2DFFC] font-medium text-[#0A0847]/80 transition-colors hover:bg-[#F9FAFE]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  aria-label="Next page"
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[3px] border border-[#001984] text-[#001984] transition-colors hover:bg-[#F1F1F9]"
                >
                  <LuChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}