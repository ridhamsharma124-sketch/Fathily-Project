import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuPlus,
  LuSearch,
  LuEye,
  LuPencil,
  LuEllipsis,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import audioRevelation from "../../../assets/word search/Audio Revelation.webp";
import mysteryScripture from "../../../assets/word search/Mystery Scripture.webp";
import EditWordSearchPanel from "./EditWordSearchPanel";


const NAVY = "#001984";
const HEADING = "#0A0847";
const GRAY = "rgba(10,8,71,0.6)";
const TEXT_80 = "rgba(10,8,71,0.8)";
const BORDER = "#E2DFFC";
const PAGE_BG = "#F7F8FF";
const TH_BG = "#F2F5FD"; 


function StatSvg({ size = 62, style, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 62 62"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      {...rest}
    >
      {children}
    </svg>
  );
}


const PuzzleGridIcon = (props) => (
  <StatSvg {...props}>
    <g strokeWidth="1.6">
      <rect x="18.1" y="17.5" width="10.6" height="10.6" rx="2.2" />
      <rect x="33.3" y="17.5" width="10.6" height="10.6" rx="2.2" />
      <rect x="18.1" y="33.1" width="10.6" height="10.6" rx="2.2" />
      <rect x="33.3" y="33.1" width="10.6" height="10.6" rx="2.2" />
    </g>
  </StatSvg>
);


const PublishedIcon = (props) => (
  <StatSvg {...props}>
    <path d="M39.55 19.9A14 14 0 1 0 44.35 26.8" strokeWidth="1.8" />
    <path
      d="M23.2 29.4 29.4 31.3 43.1 22.5 43.1 23.8 29.7 37 22.8 30.8Z"
      fill="currentColor"
      strokeWidth="1.2"
    />
  </StatSvg>
);


const DraftIcon = (props) => (
  <StatSvg {...props}>
    <g strokeWidth="1.5">
      <path d="M24.6 20.35H33L39.45 26.9V39.25a2 2 0 0 1-2 2H24.6a2 2 0 0 1-2-2V22.35a2 2 0 0 1 2-2Z" />
      <path d="M27.25 29.7h4.4M27.25 34.4h7.65" />
    </g>
  </StatSvg>
);


const DisabledIcon = (props) => (
  <StatSvg {...props}>
    <circle cx="31" cy="31" r="13.2" strokeWidth="1.8" />
    <path d="M25.9 25.9l10.2 10.2M36.1 25.9L25.9 36.1" strokeWidth="1.8" />
  </StatSvg>
);


function ArticlesIcon({ size = 20, className = "", style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M4.5 9.5 10 4h7a2 2 0 0 1 2 2v12.5a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2Z" />
      <path d="M4.5 9.5H8a2 2 0 0 0 2-2V4" />
      <path d="M9 14h6M9 17.2h6" />
    </svg>
  );
}


const CHECK_TICK =
  "checked:bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3.5 8.5l3 3 6-6.5'/%3E%3C/svg%3E\")]";
const checkboxClass = `h-[14px] w-[14px] shrink-0 cursor-pointer appearance-none rounded-[3px] border-[1.5px] border-[#8A8A93] bg-white bg-center bg-no-repeat checked:border-[#001984] checked:bg-[#001984] ${CHECK_TICK}`;


const STAT_CARDS = [
  { iconBg: "rgba(98,9,253,0.10)", iconColor: "#6209FD", Glyph: PuzzleGridIcon, value: "248", label: "Total Puzzles" },
  { iconBg: "rgba(43,164,82,0.10)", iconColor: "#2BA452", Glyph: PublishedIcon, value: "216", label: "Published" },
  { iconBg: "rgba(198,84,6,0.10)", iconColor: "#C65406", Glyph: DraftIcon, value: "21", label: "Drafts" },
  { iconBg: "rgba(216,0,39,0.10)", iconColor: "#D80027", Glyph: DisabledIcon, value: "11", label: "Disabled" },
];

const STATUS = {
  Published: { pillBg: "rgba(43,164,82,0.10)", pillBorder: "rgba(43,164,82,0.25)", pillColor: "#2BA452", trackOn: "#2BA452", on: true },
  Draft: { pillBg: "rgba(198,84,6,0.10)", pillBorder: "rgba(198,84,6,0.25)", pillColor: "#C65406", trackOn: "#C65406", on: false },
  Disable: { pillBg: "rgba(216,0,39,0.10)", pillBorder: "rgba(216,0,39,0.25)", pillColor: "#D80027", trackOn: "#D80027", on: false },
};

const FILTERS = [
  { id: "ws-testament", w: 137, all: "All Testaments", options: ["Old Testament", "New Testament"] },
  { id: "ws-book", w: 112, all: "All Books", options: ["Genesis", "Exodus", "Psalms", "John"] },
  { id: "ws-chapter", w: 119, all: "All Chapters", options: ["1", "3", "14", "23"] },
  {
    id: "ws-type",
    w: 122,
    all: "All Types",
    options: ["Hidden Restoration", "Verse Restoration", "Audio Revelation", "Mystery Scripture"],
  },
  { id: "ws-method", w: 169, all: "Creation Method", options: ["Chapter Default", "AI Generated"] },
];

const PAGES = [1, 2, 3, 4, 5];
const PAGE_SIZES = [10, 20, 50];


const PUZZLES = [
  {
    id: 1,
    topic: "Hidden Restoration",
    image: audioRevelation,
    type: "Hidden Restoration",
    location: "Genesis 1",
    level: "Level 1",
    words: "12 words",
    imageSource: "Chapter Default",
    createdBy: "Admin User",
    status: "Published",
    updated: "May 12, 2024",
  },
  {
    id: 2,
    topic: "Verse Restoration",
    image: mysteryScripture,
    type: "Verse Restoration",
    location: "John 3",
    level: "Level 2",
    words: "8 words",
    imageSource: "Chapter Default",
    createdBy: "Admin User",
    status: "Draft",
    updated: "Apr 28, 2024",
  },
  {
    id: 3,
    topic: "Audio Revelation",
    image: audioRevelation,
    type: "Audio Revelation",
    location: "Psalms 23",
    level: "Level 1",
    words: "10 words",
    imageSource: "AI Generated",
    createdBy: "Admin User",
    status: "Published",
    updated: "Apr 22, 2024",
  },
  {
    id: 4,
    topic: "Mystery Scripture",
    image: mysteryScripture,
    type: "Mystery Scripture",
    location: "Exodus 14",
    level: "Level 2",
    words: "14 words",
    imageSource: "AI Generated",
    createdBy: "Admin User",
    status: "Disable",
    updated: "May 12, 2024",
  },
];


const selectClass =
  "h-[36px] w-full cursor-pointer appearance-none rounded-[7.47px] border border-[#E2DFFC] bg-white py-[10px] pl-[12px] pr-[30px] text-[12px] font-medium text-[#0A0847]/80 outline-none focus:border-[#001984]";



function Toggle({ on, color, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="relative h-[15px] w-[26px] shrink-0 cursor-pointer rounded-full transition-colors"
      style={{ backgroundColor: on ? color : "#D9DCEA" }}
    >
      <span
        className="absolute top-[2px] h-[11px] w-[11px] rounded-full bg-white shadow-sm transition-all"
        style={{ left: on ? 13 : 2 }}
      />
    </button>
  );
}

function RowToggle({ row, value, onChange }) {
  const cfg = STATUS[row.status];
  return (
    <Toggle
      on={value}
      color={cfg.trackOn}
      onChange={onChange}
      label={`Toggle ${row.topic}`}
    />
  );
}


function StatusPill({ status }) {
  const cfg = STATUS[status];
  return (
    <span
      className="inline-block whitespace-nowrap rounded-[8px] border px-[10px] py-[4px] text-[12px] leading-[15px] font-medium"
      style={{ backgroundColor: cfg.pillBg, borderColor: cfg.pillBorder, color: cfg.pillColor }}
    >
      {status}
    </span>
  );
}


const actionBtn =
  "flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[6px] border border-[#ECECEC] bg-white transition-colors";

const TABLE_COLUMNS = [
  { label: "Topic", w: "w-[186px]" },
  { label: "Type", w: "w-[120px]" },
  { label: "Bible Location", w: "w-[100px]" },
  { label: "Level", w: "w-[80px]" },
  { label: "Words / Items", w: "w-[96px]" },
  { label: "Image Source", w: "w-[100px]" },
  { label: "Created By", w: "w-[84px]" },
  { label: "Status", w: "w-[150px]" },
  { label: "Updated", w: "w-[110px]" },
  { label: "Actions", w: "w-[130px]" },
];


export default function WordSearchManagement() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState({});
  const [selected, setSelected] = useState({});
  const [toggles, setToggles] = useState(() =>
    PUZZLES.reduce((acc, row) => ({ ...acc, [row.id]: STATUS[row.status].on }), {}),
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [panelRow, setPanelRow] = useState(null);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return PUZZLES.filter((row) => {
      const matchesSearch = !q || row.topic.toLowerCase().includes(q);
      const matchesFilters = FILTERS.every(({ id, options }) => {
        const value = filterValues[id];
        return !value || options.includes(value);
      });
      return matchesSearch && matchesFilters;
    });
  }, [search, filterValues]);

  const allSelected = visible.length > 0 && visible.every((row) => selected[row.id]);

  const toggleAll = () =>
    setSelected((prev) => {
      const next = { ...prev };
      visible.forEach((row) => {
        next[row.id] = !allSelected;
      });
      return next;
    });

  return (
    <div className="min-h-[calc(100vh-72px)] font-[Inter]" style={{ backgroundColor: PAGE_BG, color: HEADING }}>
      <div className="mx-auto max-w-[1220px] px-5 py-6">
        <div className="flex flex-nowrap items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[22px] leading-[27px] font-semibold" style={{ color: HEADING }}>
              Word Search Management
            </h1>
            <p className="mt-[8px] text-[16px] leading-[19px] font-medium whitespace-nowrap" style={{ color: GRAY }}>
              Create, organize, and manage help content.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/word-search/add-edit")}
            className="flex h-[42px] w-[182px] shrink-0 cursor-pointer items-center justify-center gap-[16px] rounded-[8px] px-[16px] text-[14px] font-semibold whitespace-nowrap text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: NAVY }}
          >
            <LuPlus size={16} strokeWidth={2.2} />
            Add Word Search
          </button>
        </div>

        <div className="mt-[40px] grid grid-cols-4 gap-[17px]">
          {STAT_CARDS.map(({ iconBg, iconColor, Glyph, value, label }) => (
            <div
              key={label}
              className="flex h-[115px] items-center gap-[16px] rounded-[8px] border bg-white pl-[16px]"
              style={{ borderColor: BORDER }}
            >
              <span
                className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-[18px]"
                style={{ backgroundColor: iconBg }}
              >
                <Glyph size={62} style={{ color: iconColor }} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-[22px] leading-[27px] font-semibold" style={{ color: TEXT_80 }}>
                  {value}
                </p>
                <p className="mt-[9px] truncate text-[14px] leading-[17px] font-semibold" style={{ color: NAVY }}>
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[40px] flex flex-nowrap items-center justify-between gap-[10px]">
          <div className="relative w-[300px] shrink-0">
            <LuSearch
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: GRAY }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search puzzles"
              className="h-[40px] w-full rounded-[7.47px] border border-[#E2DFFC] bg-white pr-3 pl-9 text-[13px] font-normal outline-none placeholder:text-[rgba(10,8,71,0.6)] focus:border-[#001984]"
              style={{ color: HEADING }}
            />
          </div>

          <div className="flex flex-nowrap items-center gap-[10px]">
            {FILTERS.map(({ id, w, all, options }) => (
              <div key={id} className="relative shrink-0" style={{ width: w }}>
                <select
                  id={id}
                  value={filterValues[id] || ""}
                  onChange={(e) =>
                    setFilterValues((prev) => ({ ...prev, [id]: e.target.value }))
                  }
                  className={`${selectClass} whitespace-nowrap`}
                >
                  <option value="">{all}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <svg
                  width="8"
                  height="5"
                  viewBox="0 0 8 5"
                  fill="none"
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-[17px] -translate-y-1/2"
                >
                  <path
                    d="M1 1l3 3 3-3"
                    stroke="#0A0847"
                    strokeOpacity="0.6"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[7.5px] border-[0.75px] bg-white" style={{ borderColor: BORDER }}>
          <div className="flex items-center gap-[8px] px-[16px] py-[14px]">
            <ArticlesIcon size={20} style={{ color: NAVY }} />
            <h2 className="text-[14px] leading-[17px] font-semibold" style={{ color: NAVY }}>
              Total articles
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1180px] table-fixed border-collapse text-left">
              <thead>
                <tr style={{ backgroundColor: TH_BG }}>
                  <th scope="col" className="h-[50px] w-[40px] px-[12px]">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      aria-label="Select all puzzles"
                      className={checkboxClass}
                    />
                  </th>
                  {TABLE_COLUMNS.map(({ label, w }) => (
                    <th
                      key={label}
                      scope="col"
                      className={`${w} h-[50px] px-[12px] text-[14px] leading-[17px] font-medium [overflow-wrap:anywhere]`}
                      style={{ color: TEXT_80 }}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {visible.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => setPanelRow(row)}
                    className="h-[62px] cursor-pointer border-t-[0.75px] transition-colors hover:bg-[#FAFAFE]"
                    style={{ borderColor: BORDER }}
                  >
                    <td className="px-[12px]" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={!!selected[row.id]}
                        onChange={() =>
                          setSelected((prev) => ({ ...prev, [row.id]: !prev[row.id] }))
                        }
                        aria-label={`Select ${row.topic}`}
                        className={checkboxClass}
                      />
                    </td>

                    <td className="px-[12px]">
                      <div className="flex items-center gap-[10px]">
                        <img
                          src={row.image}
                          alt=""
                          className="h-[38px] w-[38px] shrink-0 rounded-[8px] border object-cover"
                          style={{ borderColor: BORDER }}
                        />
                        <span
                          className="text-[12px] leading-[15px] font-medium"
                          style={{ color: TEXT_80 }}
                        >
                          {row.topic}
                        </span>
                      </div>
                    </td>

                    {[row.type, row.location, row.level, row.words, row.imageSource, row.createdBy].map(
                      (cell, i) => (
                        <td
                          key={i}
                          className="px-[12px] text-[12px] leading-[15px] font-medium"
                          style={{ color: TEXT_80 }}
                        >
                          {cell}
                        </td>
                      ),
                    )}

                    <td className="px-[12px]" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-[2px]">
                        <RowToggle
                          row={row}
                          value={!!toggles[row.id]}
                          onChange={(next) =>
                            setToggles((prev) => ({ ...prev, [row.id]: next }))
                          }
                        />
                        <StatusPill status={row.status} />
                      </div>
                    </td>

                    <td
                      className="px-[12px] text-[12px] leading-[15px] font-medium whitespace-nowrap"
                      style={{ color: TEXT_80 }}
                    >
                      {row.updated}
                    </td>

                    <td className="px-[12px]" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-[8px]">
                        <button
                          type="button"
                          onClick={() => setPanelRow(row)}
                          aria-label={`View ${row.topic}`}
                          className={`${actionBtn} hover:bg-[#F0F2FB]`}
                          style={{ color: NAVY }}
                        >
                          <LuEye size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setPanelRow(row)}
                          aria-label={`Edit ${row.topic}`}
                          className={`${actionBtn} hover:bg-[#F0F2FB]`}
                          style={{ color: NAVY }}
                        >
                          <LuPencil size={16} />
                        </button>
                        <button
                          type="button"
                          aria-label={`More actions for ${row.topic}`}
                          className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px]"
                          style={{ backgroundColor: "rgba(10,8,71,0.10)", color: GRAY }}
                        >
                          <LuEllipsis size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {visible.length === 0 && (
                  <tr>
                    <td colSpan={11} className="px-4 py-12 text-center text-[13px]" style={{ color: GRAY }}>
                      No puzzles match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[12px] font-medium" style={{ color: HEADING }}>
            Display
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                aria-label="Items per page"
                className="h-[30px] w-[60px] cursor-pointer appearance-none rounded-[8px] border border-[#E2DFFC] bg-white pr-5 pl-2.5 text-[12px] outline-none focus:border-[#001984]"
                style={{ color: HEADING }}
              >
                {PAGE_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <LuChevronDown
                size={12}
                className="pointer-events-none absolute top-1/2 right-1.5 -translate-y-1/2"
                style={{ color: GRAY }}
                aria-hidden
              />
            </div>
            Total articles
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              aria-label="Previous page"
              className="flex h-[30px] w-[30px] cursor-not-allowed items-center justify-center rounded-[8px] text-[14px]"
              style={{ color: "#C3C7DA" }}
            >
              <LuChevronLeft size={15} />
            </button>

            {PAGES.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                aria-current={page === p ? "page" : undefined}
                className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] border text-[12px] font-semibold transition-colors"
                style={
                  page === p
                    ? { backgroundColor: NAVY, borderColor: NAVY, color: "#FFFFFF" }
                    : { borderColor: BORDER, backgroundColor: "#FFFFFF", color: HEADING }
                }
              >
                {p}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(p + 1, PAGES.length))}
              aria-label="Next page"
              className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] text-[14px] transition-colors hover:bg-[#F0F2FB]"
              style={{ borderColor: NAVY, backgroundColor: "#FFFFFF", color: NAVY }}
            >
              <LuChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {panelRow && (
        <EditWordSearchPanel row={panelRow} onClose={() => setPanelRow(null)} />
      )}
    </div>
  );
}