import { useNavigate } from "react-router-dom";
import {
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuEllipsisVertical,
  LuEye,
  LuPencil,
  LuPlus,
  LuSearch,
} from "react-icons/lu";
import davidAndGoliath from "../../../assets/David and Goliath.webp";
import hiddenTreasure from "../../../assets/Hidden Treasure.webp";
import strengthForTheJourney from "../../../assets/Strength for the Journey.webp";
import didYouKnow from "../../../assets/Did You Know.webp";
import godsPromise from "../../../assets/God's Promise.webp";
import statTotal from "../../../assets/mystery-card/icon-signal.svg";
import statActive from "../../../assets/mystery-card/icon-check-circle.svg";
import statDrafts from "../../../assets/mystery-card/icon-doc.svg";
import statUnpublished from "../../../assets/mystery-card/icon-eye-off.svg";

const BORDER = "#E2DFFC";
const DEEP_NAVY = "#00007A";
const PAGE_BG = "bg-[#F8F8FF]";
const INK = "text-[#0A0847]";

const CARD = "rounded-[8px] border border-[#E2DFFC] bg-white";


const ICON = { xs: 12, sm: 14, md: 16, lg: 28 };
const ICON_STROKE = 1.5;

const GRID =
  "grid items-center gap-x-[40px] grid-cols-[minmax(0,1fr)_105px_60px_144px_86px_62px_140px]";

const TXT = "text-[#0A0847CC]";

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

const STATS = [
  { icon: statTotal, label: "Total Cards", value: "128", caption: "All time" },
  { icon: statActive, label: "Active", value: "82", caption: "64%" },
  { icon: statDrafts, label: "Drafts", value: "28", caption: "22%" },
  { icon: statUnpublished, label: "Unpublished", value: "18", caption: "14%" },
];

function StatCard({ stat }) {
  const { icon, label, value, caption } = stat;
  return (
    <div className={`flex h-[155px] min-w-0 items-center gap-[10px] pl-[16px] pr-[16px] ${CARD}`}>
      <img
        src={icon}
        alt=""
        aria-hidden
        className="h-[62px] w-[62px] shrink-0 object-contain"
        draggable={false}
      />

      <div className="flex min-w-0 flex-col gap-[8px]">
        <p className="truncate text-[14px] font-medium text-[#001984]">{label}</p>
        <p className="text-[24px] leading-none font-semibold text-[#001984]">{value}</p>
        <p className={`text-[12px] font-medium ${INK} opacity-60`}>{caption}</p>
      </div>
    </div>
  );
}


function FilterSelect({ label }) {
  return (
    <button
      type="button"
      className={`flex h-[38px] w-[111px] cursor-pointer items-center justify-between rounded-[7.5px] border border-[#E2DFFC] bg-white px-[12px] text-[12px] font-medium ${INK}`}
    >
      <span className="opacity-80">{label}</span>
      <LuChevronDown size={ICON.sm} strokeWidth={ICON_STROKE} className="shrink-0" />
    </button>
  );
}


const TESTAMENT_STYLE = {
  OT: { bg: "rgba(33, 172, 28, 0.10)", fg: "#21AC1C", bd: "rgba(33, 172, 28, 0.20)" },
  NT: { bg: "#E6E8FB", fg: "#3B4BDB", bd: "rgba(59, 75, 219, 0.20)" },
};

const STATUS_STYLE = {
  Active: { bg: "#E6F6EA", fg: "#21AC1C", bd: "rgba(33, 172, 28, 0.20)" },
  Draft: { bg: "#FBE9DC", fg: "#C65408", bd: "rgba(198, 84, 8, 0.20)" },
  Unpublished: { bg: "#EDEDED", fg: "#666666", bd: "rgba(102, 102, 102, 0.20)" },
};

function TestamentBadge({ value }) {
  const s = TESTAMENT_STYLE[value];
  return (
    <span
      className="inline-flex h-[25px] items-center justify-center rounded-[6px] border px-[7px] text-[12px] font-medium"
      style={{ background: s.bg, color: s.fg, borderColor: s.bd }}
    >
      {value}
    </span>
  );
}

function CategoryBadge({ value }) {
  return (
    <span
      className="inline-flex h-[42px] w-[105px] items-center justify-center rounded-[8px] border px-[12px] py-[4px] text-center text-[12px] leading-[1.2] font-medium"
      style={{ background: "rgba(19, 65, 227, 0.10)", borderColor: "rgba(19, 65, 227, 0.30)", color: "#1341E3" }}
    >
      {value}
    </span>
  );
}

function StatusBadge({ value }) {
  const s = STATUS_STYLE[value];
  return (
    <span
      className="inline-flex h-[25px] items-center justify-center rounded-[8px] border px-[12px] text-[12px] font-medium"
      style={{ background: s.bg, color: s.fg, borderColor: s.bd }}
    >
      {value}
    </span>
  );
}

const CHIP = `inline-flex h-[29px] min-w-[59px] shrink-0 items-center justify-center rounded-[8px] border border-[#E2DFFC] bg-white px-[9px] text-[11px] font-medium whitespace-nowrap ${TXT}`;

function ActionGroup({ title, onEdit }) {
  const box =
    "flex h-[32px] w-[32px] shrink-0 cursor-pointer items-center justify-center rounded-[7.5px] border border-[#E2DFFC] bg-white transition-colors hover:bg-[#F7F7FC]";
  return (
    <div className="flex h-[32px] w-[112px] items-center gap-[8px]">
      <button type="button" aria-label={`View ${title}`} className={box} style={{ color: DEEP_NAVY }}>
        <LuEye size={20} strokeWidth={2} />
      </button>
      <button
        type="button"
        aria-label={`Edit ${title}`}
        onClick={onEdit}
        className={box}
        style={{ color: DEEP_NAVY }}
      >
        <LuPencil size={20} strokeWidth={2} />
      </button>
      <button
        type="button"
        aria-label={`More actions for ${title}`}
        className="flex h-[32px] w-[32px] shrink-0 cursor-pointer items-center justify-center rounded-[7.5px] bg-[#E7E6EE] text-[#555555] transition-colors hover:bg-[#DDDCE8]"
      >
        <LuEllipsisVertical size={20} strokeWidth={2} />
      </button>
    </div>
  );
}


function Pagination() {
  const pages = ["1", "2", "3", "4", "5"];
  return (
    <div className="flex items-center gap-[5px]">
      <button
        type="button"
        disabled
        aria-label="Previous page"
        className="flex h-[26px] w-[26px] cursor-not-allowed items-center justify-center rounded-[4px] border border-[#E2DFFC]"
      >
        <LuChevronLeft size={ICON.sm} strokeWidth={ICON_STROKE} style={{ color: "#C4C6D4" }} />
      </button>

      {pages.map((p) => {
        const active = p === "1";
        return (
          <button
            key={p}
            type="button"
            className="flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-[4px] text-[12px] font-medium"
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
        <LuChevronRight size={ICON.sm} strokeWidth={ICON_STROKE} style={{ color: DEEP_NAVY }} />
      </button>
    </div>
  );
}


export default function MysteryCardDashboard() {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen w-full p-6 font-[Inter] ${PAGE_BG}`}>
      <div className="w-full min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-[16px]">
          <div>
            <h1 className={`text-[22px] font-semibold leading-[27px] ${INK}`}>Mystery Card Dashboard</h1>
            <p className={`mt-2 text-[14px] ${INK} opacity-70`}>
              Overview and management of all Mystery Cards.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/mystery-card/create")}
            className="flex h-[42px] cursor-pointer items-center gap-[10px] rounded-[8px] px-[20px] text-[14px] font-semibold text-white"
            style={{ background: DEEP_NAVY }}
          >
            <LuPlus size={ICON.md} strokeWidth={2.4} /> New Card
          </button>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-[16px]">
          {STATS.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-[10px]">
          <div className="flex h-[42px] w-[408px] max-w-full items-center gap-[12px] rounded-[7.5px] border border-[#E2DFFC] bg-white px-[12px]">
            <LuSearch size={ICON.md} strokeWidth={ICON_STROKE} className={`shrink-0 ${INK} opacity-60`} />
            <input
              type="text"
              placeholder="Search cards..."
              className={`h-full min-w-0 flex-1 border-0 bg-transparent text-[14px] ${INK} outline-none placeholder:opacity-50`}
            />
          </div>

          <div className="flex flex-wrap items-center gap-[10px]">
            <FilterSelect label="Testament" />
            <FilterSelect label="Activity" />
            <FilterSelect label="Status" />
            <button
              type="button"
              className="h-[38px] w-[100px] cursor-pointer rounded-[7.5px] text-[12px] font-medium"
              style={{ background: "#E6E7F7", color: DEEP_NAVY }}
            >
              Reset
            </button>
          </div>
        </div>

        <div
          className={`${CARD} mt-5 flex min-h-[508px] w-full flex-col overflow-hidden p-[14px]`}
          style={{ borderColor: BORDER }}
        >
          <div
            className={`${GRID} shrink-0 rounded-[4px] px-5 text-left text-[14px] font-medium whitespace-nowrap ${TXT}`}
            style={{ height: 48, background: "#F3F4FC" }}
          >
            <span>Card</span>
            <span>Category</span>
            <span>Testament</span>
            <span>Appears In</span>
            <span>Reward</span>
            <span className="text-center">Status</span>
            <span className="ml-auto w-[112px] text-center">Actions</span>
          </div>

          {ROWS.map((r) => (
            <div
              key={r.title}
              className={`${GRID} shrink-0 border-b border-[#EEF0F8] px-5`}
              style={{ height: 68 }}
            >
              <div className="flex min-w-0 items-center gap-[10px]">
                <img
                  src={r.image}
                  alt=""
                  className="h-[38px] w-[38px] shrink-0 rounded-[8px] bg-[#F1F2F8] object-cover"
                />
                <div className="min-w-0">
                  <p className={`truncate text-[12px] leading-none font-medium ${TXT}`}>{r.title}</p>
                  <p className={`mt-1 truncate text-[10px] leading-none font-medium ${INK} opacity-60`}>{r.subtitle}</p>
                </div>
              </div>

              <span className="flex justify-start">
                <CategoryBadge value={r.category} />
              </span>

              <span className="flex justify-center">
                <TestamentBadge value={r.testament} />
              </span>

              <div className="flex flex-nowrap items-center justify-center gap-[4px]">
                {r.appearsIn.map((a) => (
                  <span key={a} className={CHIP}>
                    {a}
                  </span>
                ))}
              </div>

              <span className={`text-left text-[12px] font-medium whitespace-nowrap ${TXT}`}>
                {r.reward}
              </span>

              <span className="flex justify-center">
                <StatusBadge value={r.status} />
              </span>

              <div className="flex justify-end">
                <ActionGroup title={r.title} onEdit={() => navigate("/admin/mystery-card/edit")} />
              </div>
            </div>
          ))}

          <div className="mt-auto flex flex-wrap items-center justify-between gap-[10px] px-2 pt-4 pb-7">
            <div className="flex items-center gap-2">
              <span className={`text-[12px] font-medium ${TXT}`}>Display</span>
              <div className="relative">
                <select
                  defaultValue="10"
                  aria-label="Display"
                  className={`h-[26px] w-[40px] cursor-pointer appearance-none rounded-[5px] border border-[#E2DFFC] bg-white pr-[16px] pl-[6px] text-[12px] font-medium ${TXT} outline-none`}
                >
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <LuChevronDown
                  size={12}
                  strokeWidth={ICON_STROKE}
                  className="pointer-events-none absolute top-1/2 right-[4px] -translate-y-1/2 text-[#0A0847]/40"
                />
              </div>
              <span className={`text-[12px] font-medium ${INK} opacity-60`}>Entries</span>
            </div>

            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}