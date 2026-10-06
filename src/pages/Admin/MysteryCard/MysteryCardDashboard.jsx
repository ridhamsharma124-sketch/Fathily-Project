import { useNavigate } from "react-router-dom";
import {
  LuChartBar,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuCircleCheck,
  LuEllipsisVertical,
  LuEye,
  LuEyeOff,
  LuFileText,
  LuPencil,
  LuPlus,
  LuSearch,
} from "react-icons/lu";
import davidAndGoliath from "../../../assets/David and Goliath.png";
import hiddenTreasure from "../../../assets/Hidden Treasure.png";
import strengthForTheJourney from "../../../assets/Strength for the Journey.png";
import didYouKnow from "../../../assets/Did You Know.png";
import godsPromise from "../../../assets/God's Promise.png";

/* ==========================================================================
   TOKENS
   ========================================================================== */
const BORDER = "#E2DFFC";
const DEEP_NAVY = "#00007A";
const PAGE_BG = "#F8F8FF";

const CARD = "rounded-[7.5px] border-[0.75px] bg-white";

const GRID =
  "grid items-center grid-cols-[minmax(0,1fr)_140px_80px_minmax(0,190px)_95px_105px_124px]";

const ROWS = [
  {
    title: "David and Goliath",
    subtitle: "1 Samuel 17:45",
    category: "Bible Hero",
    testament: "OT",
    appearsIn: ["Quiz", "Group Play"],
    reward: "100 Points",
    status: "Active",
    image: davidAndGoliath,
  },
  {
    title: "Hidden Treasure",
    subtitle: "Psalm 119:18",
    category: "Scripture Insight",
    testament: "OT",
    appearsIn: ["Quiz", "Word Search"],
    reward: "50 Points",
    status: "Active",
    image: hiddenTreasure,
  },
  {
    title: "Strength for the Journey",
    subtitle: "James 4:8",
    category: "Hidden Wisdom",
    testament: "NT",
    appearsIn: ["Quiz", "Broad Spectrum"],
    reward: "75 Points",
    status: "Draft",
    image: strengthForTheJourney,
  },
  {
    title: "Did You Know?",
    subtitle: "1 Samuel 17:45",
    category: "Bible Hero",
    testament: "OT",
    appearsIn: ["Broad Spectrum"],
    reward: "100 Points",
    status: "Unpublished",
    image: didYouKnow,
  },
  {
    title: "God's Promise",
    subtitle: "Isaiah 41:10",
    category: "Scripture Insight",
    testament: "OT",
    appearsIn: ["Quiz", "Play With Me"],
    reward: "50 Points",
    status: "Active",
    image: godsPromise,
  },
];

/* ==========================================================================
   STAT CARD
   ========================================================================== */
const STATS = [
  { tile: "#E8EBFB", icon: "#3B4BDB", Glyph: LuChartBar, label: "Total Cards", value: "128", caption: "All time" },
  { tile: "#E6F6EA", icon: "#2E9E3E", Glyph: LuCircleCheck, label: "Active", value: "82", caption: "64%" },
  { tile: "#FBE9DC", icon: "#D9722B", Glyph: LuFileText, label: "Drafts", value: "28", caption: "22%" },
  { tile: "#EDEDED", icon: "#555555", Glyph: LuEyeOff, label: "Unpublished", value: "18", caption: "14%" },
];

function StatCard({ stat }) {
  const { tile, icon, Glyph, label, value, caption } = stat;
  return (
    <div className={`${CARD} flex items-center px-[14px]`} style={{ height: 124, borderColor: BORDER }}>
      <div
        className="flex shrink-0 items-center justify-center rounded-[10px]"
        style={{ width: 48, height: 48, background: tile }}
      >
        <Glyph size={24} style={{ color: icon }} />
      </div>

      <div className="ml-[14px] min-w-0">
        <p className="text-[14px] font-semibold text-[#1E1B4B]">{label}</p>
        <p className="mt-[3px] text-[22px] leading-none font-bold text-[#1E1B4B]">{value}</p>
        <p className="mt-[5px] text-[11px] text-[#6B6F8D]">{caption}</p>
      </div>
    </div>
  );
}

/* ==========================================================================
   FILTER SELECT BUTTON
   ========================================================================== */
function FilterSelect({ label }) {
  return (
    <button
      type="button"
      className="flex h-[40px] cursor-pointer items-center rounded-[6px] border-[0.75px] border-[#E2DFFC] bg-white px-[14px] text-[14px] text-[#1E1B4B]"
      style={{ gap: 10 }}
    >
      {label}
      <LuChevronDown size={15} className="text-[#6B6F8D]" />
    </button>
  );
}

/* ==========================================================================
   BADGES
   ========================================================================== */
const TESTAMENT_STYLE = {
  OT: { bg: "#E6F6EA", fg: "#2E9E3E" },
  NT: { bg: "#E6E8FB", fg: "#3B4BDB" },
};

const STATUS_STYLE = {
  Active: { bg: "#E6F6EA", fg: "#2E9E3E" },
  Draft: { bg: "#FBE9DC", fg: "#D9722B" },
  Unpublished: { bg: "#EDEDED", fg: "#666666" },
};

function TestamentBadge({ value }) {
  const s = TESTAMENT_STYLE[value];
  return (
    <span
      className="inline-block rounded-[4px] px-[8px] py-[2px] text-[12px] font-semibold"
      style={{ background: s.bg, color: s.fg }}
    >
      {value}
    </span>
  );
}

function StatusBadge({ value }) {
  const s = STATUS_STYLE[value];
  return (
    <span
      className="inline-block rounded-[4px] px-[10px] py-[3px] text-[12px] font-medium"
      style={{ background: s.bg, color: s.fg }}
    >
      {value}
    </span>
  );
}

const CHIP =
  "inline-block rounded-[4px] border border-[#D9DBEA] bg-white px-[10px] py-[3px] text-[12px] text-[#1E1B4B]";

function ActionButton({ children, filled, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-[6px] ${
        filled ? "bg-[#E6E7F7]" : ""
      }`}
    >
      {children}
    </button>
  );
}

/* ==========================================================================
   PAGINATION
   ========================================================================== */
function Pagination() {
  const pages = ["1", "2", "3", "4", "5"];
  return (
    <div className="flex items-center" style={{ gap: 6 }}>
      <button
        type="button"
        disabled
        aria-label="Previous page"
        className="flex h-[26px] w-[26px] cursor-not-allowed items-center justify-center rounded-[4px]"
      >
        <LuChevronLeft size={14} style={{ color: "#C4C6D4" }} />
      </button>

      {pages.map((p) => {
        const active = p === "1";
        return (
          <button
            key={p}
            type="button"
            className="flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-[4px] text-[12px]"
            style={
              active
                ? { background: DEEP_NAVY, color: "#FFFFFF" }
                : { color: DEEP_NAVY, background: "#FFFFFF" }
            }
          >
            {p}
          </button>
        );
      })}

      <button
        type="button"
        aria-label="Next page"
        className="flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-[4px] border border-[#00007A]"
      >
        <LuChevronRight size={14} style={{ color: DEEP_NAVY }} />
      </button>
    </div>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function MysteryCardDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full p-6" style={{ background: PAGE_BG, fontFamily: "Inter, sans-serif" }}>
      <div className="mx-auto w-full" style={{ maxWidth: 1067 }}>
        {/* ---- header ---- */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[24px] font-bold text-[#1E1B4B]">Mystery Card Dashboard</h1>
            <p className="mt-2 text-[15px] text-[#6B6F8D]">
              Overview and management of all Mystery Cards.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/mystery-card/create")}
            className="flex h-[44px] cursor-pointer items-center rounded-[6px] px-5 text-[14px] font-semibold text-white"
            style={{ background: DEEP_NAVY, gap: 8 }}
          >
            <LuPlus size={16} strokeWidth={2.4} /> New Card
          </button>
        </div>

        {/* ---- stat cards ---- */}
        <div className="mt-6 grid grid-cols-4" style={{ gap: 18 }}>
          {STATS.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>

        {/* ---- filter row ---- */}
        <div className="mt-6 flex items-center justify-between">
          <div className="relative" style={{ width: 400 }}>
            <LuSearch
              size={16}
              className="pointer-events-none absolute top-1/2 left-[14px] -translate-y-1/2 text-[#6B6F8D]"
            />
            <input
              type="text"
              placeholder="Search cards..."
              className="h-[40px] w-full rounded-[6px] border-[0.75px] border-[#E2DFFC] bg-white pr-3 pl-[38px] text-[14px] text-[#1E1B4B] outline-none placeholder:text-[#8B8FA8]"
            />
          </div>

          <div className="flex items-center" style={{ gap: 12 }}>
            <FilterSelect label="Testament" />
            <FilterSelect label="Activity" />
            <FilterSelect label="Status" />
            <button
              type="button"
              className="h-[40px] cursor-pointer rounded-[6px] px-6 text-[14px] font-medium text-[#00007A]"
              style={{ background: "#E6E7F7" }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* ---- table card ---- */}
        <div
          className={`${CARD} mt-5 flex flex-col overflow-hidden p-[14px]`}
          style={{ height: 508, borderColor: BORDER }}
        >
          {/* header row */}
          <div
            className={`${GRID} shrink-0 rounded-[4px] px-3 text-[14px] font-semibold text-[#1E1B4B]`}
            style={{ height: 46, background: "#F3F4FC" }}
          >
            <span>Card</span>
            <span>Category</span>
            <span>Testament</span>
            <span>Appears In</span>
            <span>Reward</span>
            <span>Status</span>
            <span className="text-center">Actions</span>
          </div>

          {/* body rows */}
          {ROWS.map((r) => (
            <div
              key={r.title}
              className={`${GRID} shrink-0 border-b border-[#EEF0F8] px-3`}
              style={{ height: 66 }}
            >
              {/* card */}
              <div className="flex min-w-0 items-center" style={{ gap: 12 }}>
                <img
                  src={r.image}
                  alt=""
                  className="h-10 w-10 shrink-0 rounded-[6px] bg-[#F1F2F8] object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-medium text-[#1E1B4B]">{r.title}</p>
                  <p className="mt-[3px] text-[11px] text-[#6B6F8D]">{r.subtitle}</p>
                </div>
              </div>

              {/* category */}
              <span
                className="inline-block self-center rounded-[6px] border border-[#C9CDF5] px-[14px] py-[6px] text-[13px] leading-tight font-medium text-[#2B2FA8]"
                style={{ background: "#E6E8FB", width: "fit-content" }}
              >
                {r.category}
              </span>

              {/* testament */}
              <span className="self-center">
                <TestamentBadge value={r.testament} />
              </span>

              {/* appears in */}
              <div className="flex flex-wrap self-center" style={{ gap: 6 }}>
                {r.appearsIn.map((a) => (
                  <span key={a} className={CHIP}>
                    {a}
                  </span>
                ))}
              </div>

              {/* reward */}
              <span className="self-center text-[13px] whitespace-nowrap text-[#1E1B4B]">
                {r.reward}
              </span>

              {/* status */}
              <span className="self-center">
                <StatusBadge value={r.status} />
              </span>

              {/* actions */}
              <div className="flex justify-center" style={{ gap: 8 }}>
                <ActionButton>
                  <LuEye size={17} style={{ color: DEEP_NAVY }} />
                </ActionButton>
                <ActionButton label={`Edit ${r.title}`} onClick={() => navigate("/admin/mystery-card/edit")}>
                  <LuPencil size={17} style={{ color: DEEP_NAVY }} />
                </ActionButton>
                <ActionButton filled>
                  <LuEllipsisVertical size={17} style={{ color: DEEP_NAVY }} />
                </ActionButton>
              </div>
            </div>
          ))}

          {/* footer */}
          <div className="mt-auto flex items-center justify-between px-4 py-4">
            <div className="flex items-center" style={{ gap: 8 }}>
              <span className="text-[13px] text-[#1E1B4B]">Display</span>
              <select
                defaultValue="10"
                aria-label="Display"
                className="h-[26px] cursor-pointer rounded-[4px] border-[0.75px] border-[#E2DFFC] bg-white px-2 text-[13px] text-[#1E1B4B] outline-none"
              >
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="text-[13px] text-[#1E1B4B]">Entries</span>
            </div>

            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}