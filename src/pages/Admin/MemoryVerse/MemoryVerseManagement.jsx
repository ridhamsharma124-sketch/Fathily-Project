import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuArchive,
  LuCalendar,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuCircleCheck,
  LuCopy,
  LuFileText,
  LuFilter,
  LuEllipsisVertical,
  LuPlus,
  LuScroll,
  LuSearch,
  LuTrash2,
} from "react-icons/lu";
import { pageBodyClass, pageShellClass, Toggle } from "../Activities/activityFormShared";
import beStrongAndCourageous from "../../../assets/Be strong and courageous.png";
import harpImg from "../../../assets/harp.png";
import ruinsImg from "../../../assets/ruins.png";
import coverImg from "../../../assets/cover-img.png";

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const STATS = [
  { label: "Total Verses", value: "128", icon: LuScroll, tint: "bg-[#EDE9FE] text-[#7C3AED]" },
  { label: "Published", value: "94", icon: LuCircleCheck, tint: "bg-[#DCFCE7] text-[#16A34A]" },
  { label: "Drafts", value: "18", icon: LuFileText, tint: "bg-[#FFEDD5] text-[#EA8C00]" },
  { label: "Scheduled", value: "16", icon: LuCalendar, tint: "bg-[#EDE9FE] text-[#7C3AED]" },
];

const STATUS_STYLES = {
  Published: "bg-[#E9F8E8] text-[#29C31E] border-[#C6EFC3]",
  Scheduled: "bg-[#F3EEFE] text-[#6D28D9] border-[#DCC9FB]",
  Draft: "bg-[#FDF0E4] text-[#B45309] border-[#F7D9BE]",
};

const ROW_MENU = [
  { id: "schedule", label: "Schedule", icon: LuCalendar },
  { id: "duplicate", label: "Duplicate", icon: LuCopy },
  { id: "archive", label: "Archive", icon: LuArchive },
  { id: "delete", label: "Delete", icon: LuTrash2, danger: true },
];

const VERSES = [
  {
    id: 1,
    title: "Be strong and courageous",
    subtitle: "Have I not commanded you?...",
    location: "Joshua 1:9",
    reward: "50 pts",
    status: "Published",
    updatedDate: "May 8, 2024",
    updatedTime: "2:30 PM",
    image: beStrongAndCourageous,
    live: true,
  },
  {
    id: 2,
    title: "Trust in the Lord",
    subtitle: "Trust in the Lord with all your...",
    location: "Proverbs 3:5-6",
    reward: "50 pts",
    status: "Scheduled",
    updatedDate: "May 6, 2024",
    updatedTime: "11:15 AM",
    image: harpImg,
    live: true,
  },
  {
    id: 3,
    title: "I can do all things",
    subtitle: "I can do all things through...",
    location: "Philippians 4:13",
    reward: "50 pts",
    status: "Draft",
    updatedDate: "May 3, 2024",
    updatedTime: "9:45 AM",
    image: ruinsImg,
    live: false,
  },
  {
    id: 4,
    title: "The Lord is my shepherd",
    subtitle: "The Lord is my shepherd, I...",
    location: "Psalm 23:1",
    reward: "50 pts",
    status: "Published",
    updatedDate: "Apr 28, 2024",
    updatedTime: "4:20 PM",
    image: coverImg,
    live: true,
  },
];

const PAGE_NUMBERS = [1, 2, 3, 4, 5];
const PAGE_SIZES = ["10", "25", "50", "100"];

/* ==========================================================================
   SMALL PIECES
   ========================================================================== */
function FilterSelect({ label, options, value, onChange, width = "w-[124px]" }) {
  return (
    <div className={`relative ${width} shrink-0`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="h-[38px] w-full cursor-pointer appearance-none rounded-lg border border-[#E5E4EC] bg-white py-0 pr-8 pl-3 text-[12px] text-[#0A0847] outline-none transition focus:border-[#041581]"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <LuChevronDown
        size={14}
        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[#0A084799]"
      />
    </div>
  );
}

/* the five numbered learning-step circles, filled navy */
function StepDots() {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className="flex h-[19px] w-[19px] items-center justify-center rounded-full bg-[#041581] text-[10px] font-bold text-white"
        >
          {n}
        </span>
      ))}
    </div>
  );
}

function StatCard({ stat }) {
  const Icon = stat.icon;
  return (
    <div className="flex h-[127px] min-w-0 flex-col justify-between rounded-lg border border-[#E5E4EC] bg-white p-4 xl:p-5">
      <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.tint}`}>
        <Icon size={19} />
      </span>
      <div>
        <p className="text-[24px] leading-none font-bold text-[#0A0847]">{stat.value}</p>
        <p className="mt-1.5 text-[12px] text-[#0A084799]">{stat.label}</p>
      </div>
    </div>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function MemoryVerseManagement() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [testament, setTestament] = useState("Testament: All");
  const [book, setBook] = useState("Book: All");
  const [chapter, setChapter] = useState("Chapter: All");
  const [status, setStatus] = useState("Status: All");
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);

  const rows = VERSES.filter((v) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      v.title.toLowerCase().includes(q) ||
      v.subtitle.toLowerCase().includes(q) ||
      v.location.toLowerCase().includes(q);
    const matchesStatus = status === "Status: All" || v.status === status;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className={`${pageShellClass} min-h-[calc(100vh-72px)]`}>
      <div className={`${pageBodyClass} max-w-[1068px] space-y-6`}>
        {/* ---------------- header ---------------- */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-bold text-[#0A0847]">Memory Verse Management</h1>
            <p className="mt-1.5 text-[14px] text-[#0A084799]">
              Create, organize, and publish five-step memory activities.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/memory-verse/add-edit")}
            className="flex h-[38px] cursor-pointer items-center gap-2 rounded-lg bg-[#041581] px-4 text-[13px] font-semibold text-white transition hover:bg-[#030F63]"
          >
            <LuPlus size={15} /> Add Memory Verse
          </button>
        </div>

        {/* ---------------- stat cards ---------------- */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>

        {/* ---------------- filter row ---------------- */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <LuSearch
              size={15}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#0A084799]"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search verses..."
              className="h-[38px] w-full rounded-lg border border-[#E5E4EC] bg-white pr-3 pl-9 text-[12px] text-[#0A0847] outline-none transition placeholder:text-[#0A084799] focus:border-[#041581]"
            />
          </div>

          <FilterSelect
            value={testament}
            onChange={setTestament}
            options={["Testament: All", "Old Testament", "New Testament"]}
          />
          <FilterSelect value={book} onChange={setBook} options={["Book: All", "Joshua", "Proverbs"]} />
          <FilterSelect value={chapter} onChange={setChapter} options={["Chapter: All", "1", "3", "4", "23"]} />
          <FilterSelect value={status} onChange={setStatus} options={["Status: All", "Published", "Scheduled", "Draft"]} />

          <button
            type="button"
            className="flex h-[38px] shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-[#E5E4EC] bg-white px-4 text-[12px] font-semibold text-[#0A0847] transition hover:border-[#041581]"
          >
            <LuFilter size={14} /> Filters
          </button>
        </div>

        {/* ---------------- table ---------------- */}
        <div className="w-full rounded-xl border border-[#E5E4EC] bg-white px-6 py-6">
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
          <div className="grid grid-cols-[minmax(230px,1fr)_150px_140px_84px_112px_128px_150px] items-center gap-4 pb-4">
            {["Verse", "Bible Location", "Steps", "Reward", "Status", "Updated", "Actions"].map(
              (h) => (
                <span key={h} className="text-[13px] font-bold text-[#0A0847]">
                  {h}
                </span>
              ),
            )}
          </div>
          <div className="border-b border-[#E5E4EC]" />

          <div className="flex flex-col gap-6 pt-6">
            {rows.map((v) => (
              <div
                key={v.id}
                className="grid grid-cols-[minmax(230px,1fr)_150px_140px_84px_112px_128px_150px] items-center gap-4"
              >
                {/* verse + thumbnail */}
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={v.image}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded-lg bg-[#F1F2F8] object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-bold text-[#0A0847]">{v.title}</p>
                    <p className="mt-0.5 truncate text-[11px] text-[#0A084799]">{v.subtitle}</p>
                  </div>
                </div>

                <span className="text-[12px] text-[#0A0847]">{v.location}</span>

                {/* steps */}
                <div>
                  <StepDots />
                  <p className="mt-1.5 text-[11px] text-[#0A084799]">5/5 Ready</p>
                </div>

                <span className="text-[12px] font-semibold text-[#0A0847]">{v.reward}</span>

                <span
                  className={`w-fit rounded-full border px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLES[v.status]}`}
                >
                  {v.status}
                </span>

                <div>
                  <p className="text-[12px] text-[#0A0847]">{v.updatedDate}</p>
                  <p className="mt-0.5 text-[11px] text-[#0A084799]">{v.updatedTime}</p>
                </div>

                {/* actions */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="cursor-pointer text-[12px] font-semibold text-[#041581] transition hover:underline"
                  >
                    Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/admin/memory-verse/add-edit")}
                    className="cursor-pointer text-[12px] font-semibold text-[#041581] transition hover:underline"
                  >
                    Edit
                  </button>

                  <Toggle checked={v.live} onChange={() => {}} label={`Toggle ${v.title}`} />

                  <div className="relative">
                    <button
                      type="button"
                      aria-label={`Actions for ${v.title}`}
                      onClick={() => setOpenMenu(openMenu === v.id ? null : v.id)}
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-[#0A084799] transition hover:bg-[#F1F2F8] hover:text-[#0A0847]"
                    >
                      <LuEllipsisVertical size={16} />
                    </button>

                    {openMenu === v.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenu(null)}
                          aria-hidden
                        />
                        <div className="absolute top-8 right-0 z-20 w-[152px] rounded-lg border border-[#E5E4EC] bg-white py-1 shadow-[0_8px_24px_rgba(10,8,71,0.12)]">
                          {ROW_MENU.map((item) => {
                            const Icon = item.icon;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setOpenMenu(null)}
                                className={`flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-[12px] transition hover:bg-[#F7F7FC] ${
                                  item.danger ? "text-[#D92D20]" : "text-[#0A0847]"
                                }`}
                              >
                                <Icon size={14} />
                                {item.label}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {rows.length === 0 && (
              <p className="py-6 text-center text-[12px] text-[#0A084799]">
                No memory verses match your filters.
              </p>
            )}
          </div>
            </div>
          </div>

          {/* ---------------- table footer ---------------- */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E4EC] pt-5">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#0A084799]">Display</span>
              <div className="relative w-[68px]">
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
                  aria-label="Entries per page"
                  className="h-[32px] w-full cursor-pointer appearance-none rounded-lg border border-[#E5E4EC] bg-white py-0 pr-7 pl-2.5 text-[12px] text-[#0A0847] outline-none focus:border-[#041581]"
                >
                  {PAGE_SIZES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <LuChevronDown
                  size={13}
                  className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-[#0A084799]"
                />
              </div>
              <span className="text-[12px] text-[#0A084799]">Entries</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous page"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[#E5E4EC] text-[#0A0847CC] transition hover:border-[#041581] hover:text-[#041581]"
              >
                <LuChevronLeft size={14} />
              </button>

              {PAGE_NUMBERS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={`h-8 w-8 cursor-pointer rounded-md text-[12px] font-semibold transition ${
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
                <LuChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
