import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  LuChartColumn,
  LuCircleCheck,
  LuFileText,
  LuThumbsUp,
  LuPlus,
  LuSearch,
  LuChevronDown,
  LuSettings,
  LuEllipsis,
  LuEllipsisVertical,
  LuEye,
  LuPencil,
  LuCopy,
  LuArchive,
  LuTrash2,
  LuCreditCard,
  LuGift,
  LuUser,
  LuBookOpen,
  LuHeart,
  LuBell,
  LuShieldCheck,
  LuLock,
} from "react-icons/lu";
import ArticleModal from "./ArticleModal";

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const STATS = [
  {
    label: "Total articles",
    value: 48,
    icon: LuChartColumn,
    badge: "bg-stat-purple-bg text-stat-purple",
    valueClass: "text-stat-purple-num",
  },
  {
    label: "Published",
    value: 42,
    icon: LuCircleCheck,
    badge: "bg-stat-green-bg text-stat-green-icon",
    valueClass: "text-stat-green-num",
  },
  {
    label: "Drafts",
    value: 6,
    icon: LuFileText,
    badge: "bg-stat-orange-bg text-stat-orange",
    valueClass: "text-stat-orange-num",
  },
  {
    label: "Scheduled",
    value: "91%",
    icon: LuThumbsUp,
    badge: "bg-stat-lav-bg text-stat-lav",
    valueClass: "text-stat-lav",
  },
];

const ARTICLES = [
  {
    id: "1",
    title: "Managing Your Subscription",
    category: "Subscription & Billing",
    views: "2,847",
    helpful: "94%",
    status: "Published",
    updated: "May 12, 2024",
  },
  {
    id: "2",
    title: "Payment Method",
    category: "Subscription & Billing",
    views: "2,847",
    helpful: "94%",
    status: "Published",
    updated: "Apr 28, 2024",
  },
  {
    id: "3",
    title: "Gift Code Redemption",
    category: "Gift Codes",
    views: "2,847",
    helpful: "94%",
    status: "Published",
    updated: "Apr 22, 2024",
  },
  {
    id: "4",
    title: "Set Reading Plan Goals",
    category: "Account Settings",
    views: "2,847",
    helpful: "94%",
    status: "Draft",
    updated: "May 12, 2024",
  },
  {
    id: "5",
    title: "Reset Password",
    category: "Account Settings",
    views: "2,847",
    helpful: "94%",
    status: "Published",
    updated: "May 12, 2024",
  },
];

const CATEGORIES = [
  { name: "Subscription & Billing", count: 8, icon: LuCreditCard },
  { name: "Gift Codes", count: 6, icon: LuGift },
  { name: "Account Settings", count: 7, icon: LuUser },
  { name: "Bible Content", count: 4, icon: LuBookOpen },
  { name: "Donations", count: 3, icon: LuHeart },
  { name: "Notifications", count: 2, icon: LuBell },
  { name: "Security", count: 5, icon: LuShieldCheck },
  { name: "Privacy Tips", count: 1, icon: LuLock },
];

const STATUS_PILL = {
  Published: "bg-[#DCFCE7] text-pill-published",
  Draft: "bg-pill-draft-bg text-pill-draft",
};

const MENU_ITEMS = [
  { key: "preview", label: "Preview", icon: LuEye },
  { key: "edit", label: "Edit", icon: LuPencil },
  { key: "duplicate", label: "Duplicate", icon: LuCopy },
  { key: "archive", label: "Archive", icon: LuArchive },
  { key: "delete", label: "Delete", icon: LuTrash2, danger: true },
];

/* ==========================================================================
   STATUS PILL
   ========================================================================== */
function StatusPill({ status }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ${
        STATUS_PILL[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

/* ==========================================================================
   MAIN PAGE
   ========================================================================== */
export default function HelpCenter() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [author, setAuthor] = useState("All Authors");
  const [menu, setMenu] = useState(null);
  const [modal, setModal] = useState(null);

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

  useEffect(() => {
    if (!modal) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setModal(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modal]);

  const openMenu = (e, id) => {
    e.stopPropagation();
    /* clicking the same 3-dot again closes the menu */
    if (menu?.id === id) {
      setMenu(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const width = 130;
    const x = Math.max(
      8,
      Math.min(rect.right - width, window.innerWidth - width - 8),
    );
    /* always opens downward */
    setMenu({ id, x, y: rect.bottom + 6 });
  };

  const handleMenuAction = (key, id) => {
    if (key === "edit") {
      setModal({ mode: "edit", article: ARTICLES.find((a) => a.id === id) });
    }
    setMenu(null);
  };

  const visible = ARTICLES.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      status === "All Statuses" ? true : article.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen space-y-6 bg-[#F8FAFC] p-6 font-[Inter]">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-[22px] font-semibold text-[#0A0847]">
            Help Center Management
          </h1>
          <p className="mt-2 text-[16px] font-medium text-[#0A084799]">
            Create, organize, and manage help content.
          </p>
        </div>
        <button
          onClick={() => setModal({ mode: "create", article: null })}
          className="flex h-[41px] w-[152px] cursor-pointer items-center justify-center gap-2 self-start rounded-lg bg-[#001984] text-[16px] font-semibold text-white transition-colors hover:bg-[#001266] sm:self-auto"
        >
          <LuPlus size={20} />
          New Article
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-[17px] sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex h-[155px] items-center gap-4 rounded-xl border border-[#E2DFFC] bg-white px-4"
            >
              <div
                className={`flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl ${stat.badge}`}
              >
                <Icon size={28} />
              </div>
              <div className="min-w-0">
                <p className={`text-[26px] font-bold ${stat.valueClass}`}>
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[14px] font-semibold text-[#0A0847]">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter row */}
      <div className="flex flex-col items-start justify-between gap-4 xl:flex-row xl:items-center">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-[409px]">
            <LuSearch
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search journeys..."
              className="h-[42px] w-full rounded-md border border-[#E2DFFC] bg-white pl-9 pr-3 text-xs text-[#0A084799] outline-none transition-colors placeholder:text-gray-400 focus:border-[#001984]"
            />
          </div>

          <div className="relative w-full sm:w-[125px]">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-[42px] w-full cursor-pointer appearance-none rounded-md border border-[#E2DFFC] bg-white pl-3.5 pr-8 text-xs font-medium text-[#0A0847CC] outline-none transition-colors focus:border-[#001984]"
            >
              {["All Statuses", "Published", "Draft", "Scheduled"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <LuChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
          <div className="relative w-full sm:w-[125px]">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-[42px] w-full cursor-pointer appearance-none rounded-md border border-[#E2DFFC] bg-white pl-3.5 pr-8 text-xs font-medium text-[#0A0847CC] outline-none transition-colors focus:border-[#001984]"
            >
              {["All Statuses", "Published", "Draft", "Scheduled"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <LuChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
          <div className="relative w-full sm:w-[125px]">
            <select
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="h-[42px] w-full cursor-pointer appearance-none rounded-md border border-[#E2DFFC] bg-white pl-3.5 pr-8 text-xs font-medium text-[#0A0847CC] outline-none transition-colors focus:border-[#001984]"
            >
              {["All Authors", "John Doe", "Jane Smith"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <LuChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        <button
          type="button"
          className="flex h-[42px] w-full cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-[#E2DFFC] bg-white px-3 text-xs font-medium text-[#0A0847CC] transition-colors hover:bg-gray-50 xl:w-[161px]"
        >
          <LuSettings size={16} className="shrink-0" />
          Manage Categories
        </button>
      </div>

      {/* Articles table card */}
      <div className="overflow-hidden rounded-lg border border-[#E2DFFC] bg-white p-[14px]">
        <div className="mb-3 flex items-center gap-2 px-1">
          <LuFileText size={16} className="text-[#001984]" />
          <h2 className="text-sm font-semibold text-[#0A0847CC]">Total articles</h2>
        </div>

        <div className="overflow-x-auto" onScroll={() => setMenu(null)}>
          <table className="w-full min-w-[900px] border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E2DFFC] bg-[#EFEDF8]">
                <th className="w-[130px] p-4 text-left text-sm font-medium text-[#0A0847CC]">
                  Title
                </th>
                <th className="p-4 text-left text-sm font-medium text-[#0A0847CC]">
                  Category
                </th>
                <th className="p-4 text-left text-sm font-medium text-[#0A0847CC]">
                  Views
                </th>
                <th className="p-4 text-left text-sm font-medium text-[#0A0847CC]">
                  Helpful
                </th>
                <th className="p-4 text-left text-sm font-medium text-[#0A0847CC]">
                  Status
                </th>
                <th className="p-4 text-left text-sm font-medium text-[#0A0847CC]">
                  Updated
                </th>
                <th className="p-4 text-center text-sm font-medium text-[#0A0847CC]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((article) => (
                <tr
                  key={article.id}
                  className="h-[75px] border-b border-[#E2DFFC] text-xs text-[#0A0847] transition-colors last:border-b-0 hover:bg-gray-50/50"
                >
                  <td className="p-4 text-[13px] font-medium text-[#0A0847]/80">
                    {article.title}
                  </td>
                  <td className="p-4 text-[13px] text-[#0A0847]">
                    {article.category}
                  </td>
                  <td className="p-4">{article.views}</td>
                  <td className="p-4">{article.helpful}</td>
                  <td className="p-4">
                    <StatusPill status={article.status} />
                  </td>
                  <td className="whitespace-nowrap p-4">{article.updated}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={(e) => openMenu(e, article.id)}
                      data-action-menu
                      aria-label={`Actions for ${article.title}`}
                      aria-haspopup="menu"
                      aria-expanded={menu?.id === article.id}
                      className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-[#E9E9E9] text-gray-500 transition-colors hover:bg-gray-50"
                    >
                      <LuEllipsis size={18} />
                    </button>
                  </td>
                </tr>
              ))}

              {visible.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="p-4 py-10 text-center text-xs text-[#0A084799]"
                  >
                    No articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Categories card */}
      <div className="overflow-hidden rounded-xl border border-[#E2DFFC] bg-white p-[14px]">
        <div className="flex flex-col items-start justify-between gap-3 border-b border-[#E2DFFC] px-1 pb-4 sm:flex-row sm:items-center">
          <h2 className="text-sm font-semibold text-[#0A0847CC]">Categories</h2>
          <button
            type="button"
            className="flex h-[42px] w-[166px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#E2DFFC] bg-white text-xs font-medium text-[#0A0847CC] transition-colors hover:bg-gray-50"
          >
            <LuPlus size={16} />
            Add Category
          </button>
        </div>

        <div>
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="flex h-[62px] items-center justify-between gap-3 border-b border-[#E2DFFC] last:border-b-0"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Icon size={20} className="shrink-0 text-[#0A0847CC]" />
                  <span className="truncate text-xs text-[#0A0847]">
                    {category.name}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="flex h-[28px] w-[28px] items-center justify-center rounded-md bg-[#F3F7FD] text-[13px] font-bold text-[#0A0847CC]">
                    {category.count}
                  </span>
                  <button
                    type="button"
                    aria-label={`Edit ${category.name}`}
                    className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-md border border-[#E2DFFC] bg-white text-[#0A0847CC] transition-colors hover:bg-gray-50"
                  >
                    <LuPencil size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label={`More actions for ${category.name}`}
                    className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-md bg-[#E9E9E9] text-gray-500 transition-colors hover:bg-gray-50"
                  >
                    <LuEllipsisVertical size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row actions menu */}
      {menu &&
        createPortal(
          <div
            data-menu
            className="fixed z-[60] w-[130px] rounded-lg border border-[#E2DFFC] bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
            style={{ left: menu.x, top: menu.y }}
          >
            {MENU_ITEMS.map((item) => {
              const ItemIcon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => handleMenuAction(item.key, menu.id)}
                  className={`flex h-10 w-full cursor-pointer items-center gap-2.5 px-3.5 text-left text-sm transition-colors ${
                    item.danger
                      ? "text-[#C44552] hover:bg-[#F8EAEC]"
                      : "text-[#0A0847CC] hover:bg-gray-50"
                  }`}
                >
                  <ItemIcon size={16} className="shrink-0 text-gray-500" />
                  {item.label}
                </button>
              );
            })}
          </div>,
          document.body,
        )}

      {/* Centered Create / Edit Article modal */}
      {modal && (
        <ArticleModal
          mode={modal.mode}
          article={modal.article}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
