import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  PiBroadcast,
  PiCalendarBlank,
  PiCaretDown,
  PiCaretLeft,
  PiCaretRight,
  PiCheck,
  PiClockCountdown,
  PiCopy,
  PiDotsThree,
  PiEye,
  PiEyeSlash,
  PiMagnifyingGlass,
  PiPencilSimple,
  PiPencilSimpleLine,
  PiPlus,
  PiSpeakerHigh,
  PiSquaresFour,
  PiTrash,
} from "react-icons/pi";

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const STORIES = [
  {
    id: "1",
    date: "May 25, 2026",
    day: "Mon",
    homepageTitle: "David Strengthened",
    fullTitle: "David Encourages Himself in the Lord",
    scripture: "1 Samuel 30:6",
    status: "Live",
    reward: "+1 Treasure",
    views: "12,451",
    completions: "7,832",
  },
  {
    id: "2",
    date: "May 24, 2026",
    day: "Sun",
    homepageTitle: "Rahab's Faith",
    fullTitle: "Rahab Showed Unwavering Faith",
    scripture: "Joshua 2:11",
    status: "Scheduled",
    reward: "+1 Treasure",
    views: "10,872",
    completions: "6,994",
  },
  {
    id: "3",
    date: "May 23, 2026",
    day: "Sat",
    homepageTitle: "Paul's Courage",
    fullTitle: "Paul Stood Firm Before Kings",
    scripture: "Acts 26:22",
    status: "Draft",
    reward: "+1 Treasure",
    views: "9,214",
    completions: "5,800",
  },
  {
    id: "4",
    date: "May 26, 2026",
    day: "Tue",
    homepageTitle: "Naaman Healed",
    fullTitle: "Naaman Was Healed by God's Power",
    scripture: "Luke 10:27",
    status: "Scheduled",
    reward: "+1 Treasure",
    views: null,
    completions: null,
  },
  {
    id: "5",
    date: "May 28, 2026",
    day: "Wed",
    homepageTitle: "Esther's Courage",
    fullTitle: "Esther Risked Her Life for Her People",
    scripture: "Daniel 6:22",
    status: "Draft",
    reward: "+1 Treasure",
    views: null,
    completions: null,
  },
];

const STATS = [
  {
    label: "All Stories",
    value: 48,
    caption: "Total stories",
    box: "bg-[#EFE9FB]",
    icon: PiSquaresFour,
    iconColor: "#7C4DDB",
  },
  {
    label: "Live",
    value: 1,
    caption: "Currently live",
    box: "bg-[#E8F7EE]",
    icon: PiBroadcast,
    iconColor: "#22A45D",
  },
  {
    label: "Scheduled",
    value: 3,
    caption: "Upcoming",
    box: "bg-[#E9E9FB]",
    icon: PiClockCountdown,
    iconColor: "#2A2FCB",
  },
  {
    label: "Drafts",
    value: 2,
    caption: "In progress",
    box: "bg-[#FBEDE1]",
    icon: PiPencilSimpleLine,
    iconColor: "#D9601A",
  },
];

const STATUS_STYLES = {
  Live: "bg-[#E4F6EA] text-[#22A45D]",
  Scheduled: "bg-[#E6E6FA] text-[#2A2FA8]",
  Draft: "bg-[#FDF1E7] border border-[#E2621B] text-[#E2621B]",
};

const MENU_ITEMS = [
  { key: "preview", label: "Preview", icon: PiEye },
  { key: "edit", label: "Edit", icon: PiPencilSimple },
  { key: "duplicate", label: "Duplicate", icon: PiCopy },
  { key: "unpublish", label: "Unpublish", icon: PiEyeSlash },
  { key: "delete", label: "Delete", icon: PiTrash, danger: true },
];

/* ==========================================================================
   STATUS BADGE
   ========================================================================== */
function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-[6px] px-[12px] py-[4px] text-[12px] font-medium ${
        STATUS_STYLES[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

/* ==========================================================================
   TABLE CHECKBOX (custom, rounded 3px)
   ========================================================================== */
function TableCheckbox({ checked, onChange }) {
  return (
    <label className="relative inline-flex h-[18px] w-[18px] cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer h-[18px] w-[18px] appearance-none rounded-[3px] border border-[#6B7280] bg-white transition checked:border-[#0B1F7A] checked:bg-[#0B1F7A]"
      />
      <PiCheck className="pointer-events-none absolute left-[2px] top-[2px] h-[14px] w-[14px] text-white opacity-0 transition peer-checked:opacity-100" />
    </label>
  );
}

/* ==========================================================================
   MAIN PAGE
   ========================================================================== */
export default function DailyReflectionList() {
  const [menu, setMenu] = useState(null);
  const [selected, setSelected] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (
        !e.target.closest("[data-action-menu]") &&
        !e.target.closest("[data-menu]")
      ) {
        setMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openMenu = (e, id) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const width = 150;
    const x = Math.max(
      8,
      Math.min(rect.right - width, window.innerWidth - width - 8),
    );
    setMenu({ id, x, y: rect.bottom + 10 });
  };

  const toggleRow = (id) => setSelected((p) => ({ ...p, [id]: !p[id] }));

  const allChecked = STORIES.every((s) => selected[s.id]);
  const toggleAll = () => {
    if (allChecked) setSelected({});
    else setSelected(Object.fromEntries(STORIES.map((s) => [s.id, true])));
  };

  return (
    <div className="flex min-h-screen flex-col gap-[20px] bg-[#F8FAFC] p-6 font-[Inter]">
      {/* Header */}
      <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0A0847]">
            Today in Biblical History
          </h1>
          <p className="mt-2 text-sm font-medium text-[#0A084799]">
            Create, schedule, and manage daily biblical history experiences.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/dailyreflection/add")}
          className="flex cursor-pointer items-center justify-center gap-2 self-start rounded-lg bg-[#001984] px-4 py-2.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-[#001266] md:self-auto"
        >
          <PiPlus size={16} />
          Add Historical Story
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-[16px] min-[560px]:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex h-[118px] items-center gap-4 rounded-lg border border-[#E2DFFC] bg-white px-4"
            >
              <div
                className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl ${stat.box}`}
              >
                <Icon size={28} color={stat.iconColor} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#001984]">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-xl font-semibold text-[#0A0847]">
                  {stat.value}
                </p>
                <p className="text-[11px] text-[#0A084799]">{stat.caption}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-[12px]">
        <div className="relative w-full sm:w-[272px]">
          <PiMagnifyingGlass
            size={18}
            className="pointer-events-none absolute left-[12px] top-1/2 -translate-y-1/2 text-[#5B5F8C]"
          />
          <input
            type="text"
            placeholder="Search stories.."
            className="h-[40px] w-full rounded-[8px] border border-[#E5E7EB] bg-white pl-[40px] pr-[12px] text-[13px] text-[#0B1250] outline-none transition placeholder:text-[#6B7280] focus:border-[#0B1F7A]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-[10px]">
          <button className="flex h-[38px] cursor-pointer items-center gap-[8px] rounded-[6px] border border-[#E5E7EB] bg-white px-[14px] text-[13px] text-[#0B1250]">
            Status (All)
            <PiCaretDown size={14} />
          </button>
          <button className="flex h-[38px] cursor-pointer items-center gap-[8px] rounded-[6px] border border-[#E5E7EB] bg-white px-[14px] text-[13px] text-[#0B1250]">
            <PiCalendarBlank size={18} />
            Featured Date
          </button>
          <button className="flex h-[38px] cursor-pointer items-center gap-[8px] rounded-[6px] border border-[#E5E7EB] bg-white px-[14px] text-[13px] text-[#0B1250]">
            Scripture (All)
            <PiCaretDown size={14} />
          </button>
          <button className="flex h-[38px] cursor-pointer items-center gap-[8px] rounded-[6px] border border-[#E5E7EB] bg-white px-[14px] text-[13px] text-[#0B1250]">
            Audio (All)
            <PiCaretDown size={14} />
          </button>
          <button className="flex h-[38px] cursor-pointer items-center rounded-[6px] border border-[#0B1F7A] bg-white px-[22px] text-[13px] font-medium text-[#0B1F7A] transition hover:bg-[#0B1F7A]/5">
            Reset
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-[14px]">
        <div
          className="overflow-x-auto"
          onScroll={() => setMenu((m) => (m ? null : m))}
        >
          <table className="w-full min-w-[1120px] border-collapse table-auto">
            <thead>
              <tr>
                <th className="h-[48px] w-[44px] rounded-l-[6px] bg-[#F1F3FB] pl-[14px] pr-[12px] text-left text-[13px] font-medium text-[#0B1250] whitespace-nowrap">
                  <TableCheckbox checked={allChecked} onChange={toggleAll} />
                </th>
                <th className="h-[48px] min-w-[130px] bg-[#F1F3FB] px-[12px] text-left text-[13px] font-medium text-[#0B1250] whitespace-nowrap">
                  Featured Date
                </th>
                <th className="h-[48px] min-w-[140px] bg-[#F1F3FB] px-[12px] text-left text-[13px] font-medium text-[#0B1250] whitespace-nowrap">
                  Homepage Title
                </th>
                <th className="h-[48px] min-w-[190px] bg-[#F1F3FB] px-[12px] text-left text-[13px] font-medium text-[#0B1250] whitespace-nowrap">
                  Full Story Title
                </th>
                <th className="h-[48px] min-w-[110px] bg-[#F1F3FB] px-[12px] text-left text-[13px] font-medium text-[#0B1250] whitespace-nowrap">
                  Scripture
                </th>
                <th className="h-[48px] min-w-[110px] bg-[#F1F3FB] px-[12px] text-left text-[13px] font-medium text-[#0B1250] whitespace-nowrap">
                  Status
                </th>
                <th className="h-[48px] min-w-[70px] bg-[#F1F3FB] px-[12px] text-left text-[13px] font-medium text-[#0B1250] whitespace-nowrap">
                  Audio
                </th>
                <th className="h-[48px] min-w-[110px] bg-[#F1F3FB] px-[12px] text-left text-[13px] font-medium text-[#0B1250] whitespace-nowrap">
                  Reward
                </th>
                <th className="h-[48px] min-w-[80px] bg-[#F1F3FB] px-[12px] text-left text-[13px] font-medium text-[#0B1250] whitespace-nowrap">
                  Views
                </th>
                <th className="h-[48px] min-w-[110px] bg-[#F1F3FB] px-[12px] text-left text-[13px] font-medium text-[#0B1250] whitespace-nowrap">
                  Completions
                </th>
                <th className="h-[48px] min-w-[80px] rounded-r-[6px] bg-[#F1F3FB] px-[12px] text-center text-[13px] font-medium text-[#0B1250] whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {STORIES.map((story) => (
                <tr
                  key={story.id}
                  className="h-[62px] border-b border-[#EEF0F5] text-[12px] text-[#0B1250]"
                >
                  <td className="w-[44px] px-[12px] py-[10px] align-middle">
                    <TableCheckbox
                      checked={!!selected[story.id]}
                      onChange={() => toggleRow(story.id)}
                    />
                  </td>

                  <td className="min-w-[130px] whitespace-nowrap px-[12px] py-[10px] align-middle text-[12px] font-normal text-[#0B1250]">
                    <p className="leading-[1.3]">{story.date}</p>
                    <p className="text-[11px] leading-[1.3] text-[#5B5F8C]">
                      {story.day}
                    </p>
                  </td>

                  <td className="min-w-[140px] px-[12px] py-[10px] align-middle text-[12px] font-normal text-[#0B1250]">
                    <p className="leading-[1.3] line-clamp-2">
                      {story.homepageTitle}
                    </p>
                  </td>

                  <td className="min-w-[190px] px-[12px] py-[10px] align-middle text-[12px] font-normal text-[#0B1250]">
                    <p className="leading-[1.3] line-clamp-3">
                      {story.fullTitle}
                    </p>
                  </td>

                  <td className="min-w-[110px] whitespace-nowrap px-[12px] py-[10px] align-middle text-[12px] font-normal text-[#0B1250]">
                    {story.scripture}
                  </td>

                  <td className="min-w-[110px] whitespace-nowrap px-[12px] py-[10px] align-middle text-[12px] font-normal text-[#0B1250]">
                    <StatusBadge status={story.status} />
                  </td>

                  <td className="min-w-[70px] px-[12px] py-[10px] align-middle">
                    <PiSpeakerHigh size={26} color="#2A2FCB" />
                  </td>

                  <td className="min-w-[110px] whitespace-nowrap px-[12px] py-[10px] align-middle text-[12px] font-semibold text-[#16A34A]">
                    {story.reward}
                  </td>

                  <td className="min-w-[80px] whitespace-nowrap px-[12px] py-[10px] align-middle text-[12px] font-semibold text-[#0B1250]">
                    {story.views ?? (
                      <span className="font-normal text-[#9CA3AF]">—</span>
                    )}
                  </td>

                  <td className="min-w-[110px] whitespace-nowrap px-[12px] py-[10px] align-middle text-[12px] font-semibold text-[#0B1250]">
                    {story.completions ?? (
                      <span className="font-normal text-[#9CA3AF]">—</span>
                    )}
                  </td>

                  <td className="min-w-[80px] px-[12px] py-[10px] text-center align-middle">
                    <button
                      onClick={(e) => openMenu(e, story.id)}
                      data-action-menu
                      aria-label={`Actions for ${story.homepageTitle}`}
                      className="inline-flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-[6px] bg-[#E5E7EB] text-[#0B1250] transition hover:bg-[#d7dbe3]"
                    >
                      <PiDotsThree size={20} strokeWidth={1.5} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="mt-[14px] flex flex-col gap-3 px-[6px] text-[13px] text-[#0B1250] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            Display
            <span className="relative">
              <select className="h-[28px] w-[56px] cursor-pointer appearance-none rounded-[6px] border border-[#E5E7EB] bg-white pl-3 pr-6 text-[13px] outline-none">
                <option>05</option>
                <option>10</option>
                <option>25</option>
              </select>
              <PiCaretDown
                size={12}
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#5B5F8C]"
              />
            </span>
            Entries
          </div>

          <div className="flex items-center gap-[8px]">
            <button
              disabled
              aria-label="Previous page"
              className="flex h-[28px] w-[28px] items-center justify-center rounded-[4px] bg-[#E5E7EB] text-[#9CA3AF]"
            >
              <PiCaretLeft size={14} />
            </button>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-[4px] text-[13px] ${
                  num === 1
                    ? "bg-[#0B1F7A] font-semibold text-white"
                    : "bg-white text-[#0B1250]"
                }`}
              >
                {num}
              </button>
            ))}
            <button
              aria-label="Next page"
              className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-[4px] border border-[#0B1F7A] text-[#0B1F7A] transition hover:bg-[#0B1F7A] hover:text-white"
            >
              <PiCaretRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Actions Dropdown (portal so table overflow does not clip it) */}
      {menu &&
        createPortal(
          <div
            data-menu
            className="fixed z-[60] w-[150px] rounded-[8px] border border-[#E5E7EB] bg-white py-[6px] shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
            style={{ left: menu.x, top: menu.y }}
          >
            {MENU_ITEMS.map((item) => {
              const ItemIcon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => setMenu(null)}
                  className={`flex h-[34px] w-full cursor-pointer items-center gap-[10px] px-[14px] text-[13px] transition ${
                    item.danger
                      ? "font-medium text-[#DC2626] hover:bg-red-50"
                      : "text-[#0B1250] hover:bg-[#F5F7FB]"
                  }`}
                >
                  <ItemIcon size={16} />
                  {item.label}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </div>
  );
}