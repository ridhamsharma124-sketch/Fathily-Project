import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  LuCircleCheck,
  LuTriangleAlert,
  LuFileText,
  LuPlus,
  LuSearch,
  LuChevronDown,
  LuEllipsis,
  LuEye,
  LuPencil,
  LuCopy,
  LuArchive,
  LuTrash2,
} from "react-icons/lu";

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const DOCUMENTS = [
  {
    id: "1",
    name: "Terms of Use",
    version: "v2.4",
    effective: "Jul 19, 2026",
    status: "Published",
    acceptance: "Required",
  },
  {
    id: "2",
    name: "Privacy Policy",
    version: "v4.1",
    effective: "Jul 19, 2026",
    status: "Published",
    acceptance: "Required",
  },
  {
    id: "3",
    name: "Community Guidelines",
    version: "v1.0",
    effective: "Aug 07, 2026",
    status: "Draft",
    acceptance: "Not required",
  },
  {
    id: "4",
    name: "Cookie Policy",
    version: "v2.0",
    effective: "Aug 20, 2026",
    status: "Needs Review",
    acceptance: "Required",
  },
];

const STATS = [
  {
    label: "Published",
    value: 2,
    icon: LuCircleCheck,
    badge: "bg-green-bg text-green-icon",
    valueClass: "text-heading",
  },
  {
    label: "Needs Review",
    value: 1,
    icon: LuTriangleAlert,
    badge: "bg-red-bg text-red",
    valueClass: "text-indigo",
  },
  {
    label: "Draft",
    value: 1,
    icon: LuFileText,
    badge: "bg-orange-bg text-orange",
    valueClass: "text-orange-num",
  },
];

const STATUS_PILL = {
  Published: "bg-green-pill text-green",
  "Needs Review": "bg-red-bg text-red",
  Draft: "bg-orange-bg text-orange",
};

const STATUS_OPTIONS = ["All statuses", "Published", "Needs Review", "Draft"];

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
      className={`inline-block whitespace-nowrap rounded-lg border px-3 py-1 text-xs font-medium ${
        STATUS_PILL[status] || "border-transparent bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

/* ==========================================================================
   MAIN PAGE
   ========================================================================== */
export default function TermsPrivacy() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [menu, setMenu] = useState(null);
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
    const width = 130;
    const x = Math.max(
      8,
      Math.min(rect.right - width, window.innerWidth - width - 8),
    );
    setMenu({ id, x, y: rect.bottom + 6 });
  };

  const handleMenuAction = (key) => {
    // Edit opens the edit page for the selected document
    if (key === "edit") navigate(`/admin/terms-privacy/edit?id=${menu.id}`);
    setMenu(null);
  };

  const visible = DOCUMENTS.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      status === "All statuses" ? true : doc.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen space-y-6 bg-[#F8FAFC] p-6 font-[Inter]">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-[#0A0847]">Terms &amp; Privacy</h1>
          <p className="mt-2 text-sm font-medium text-[#0A084799]">
            Manage legal documents shown to users.
          </p>
        </div>

        {/* Add Document: onClick removed, so it does not open any page for now.
            To enable create mode later, add:
            onClick={() => navigate("/admin/terms-privacy/edit?mode=create")} */}
        <button
          className="flex cursor-pointer items-center gap-2 self-start rounded-lg bg-[#001984] px-4 py-2.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-[#001266] sm:self-auto"
        >
          <LuPlus size={16} />
          Add Document
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-lg border border-[#E2DFFC] bg-white px-4 py-8"
            >
              <div
                className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl ${stat.badge}`}
              >
                <Icon size={28} />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-semibold text-[#0A0847] mt-0.5">
                  {stat.value}
                </p>
                <p className="text-xs font-semibold text-[#001984]">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter row */}
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-[370px]">
          <LuSearch
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents"
            className="w-full rounded-md border border-[#E2DFFC] bg-white py-3 pl-9 pr-3 text-xs text-[#0A084799] outline-none transition-colors placeholder:text-gray-400 focus:border-[#001984]"
          />
        </div>

        <div className="relative w-full sm:w-[150px]">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-md border border-[#E2DFFC] bg-white py-2 pl-3.5 pr-8 text-xs font-medium text-[#0A0847CC] outline-none transition-colors focus:border-[#001984]"
          >
            {STATUS_OPTIONS.map((option) => (
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

      {/* Table card */}
      <div className="overflow-hidden rounded-lg border border-[#E2DFFC] bg-white p-[14px]">
        <div className="overflow-x-auto" onScroll={() => setMenu(null)}>
          <table className="w-full min-w-[820px] border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E2DFFC] bg-[#F3F7FD]">
                <th className="p-4 text-left text-sm font-medium text-[#0A0847CC]">
                  Document
                </th>
                <th className="p-4 text-left text-sm font-medium text-[#0A0847CC]">
                  Version
                </th>
                <th className="p-4 text-left text-sm font-medium text-[#0A0847CC]">
                  Effective Date
                </th>
                <th className="p-4 text-left text-sm font-medium text-[#0A0847CC]">
                  Status
                </th>
                <th className="p-4 text-left text-sm font-medium text-[#0A0847CC]">
                  User Acceptance
                </th>
                <th className="p-4 text-center text-sm font-medium text-[#0A0847CC]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-[#E2DFFC] text-xs text-[#0A0847] transition-colors last:border-b-0 hover:bg-gray-50/50"
                >
                  <td className="p-4 font-medium">{doc.name}</td>
                  <td className="p-4">{doc.version}</td>
                  <td className="whitespace-nowrap p-4">{doc.effective}</td>
                  <td className="p-4">
                    <StatusPill status={doc.status} />
                  </td>
                  <td className="whitespace-nowrap p-4">{doc.acceptance}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={(e) => openMenu(e, doc.id)}
                      data-action-menu
                      aria-label={`Actions for ${doc.name}`}
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
                    colSpan={6}
                    className="p-4 py-10 text-center text-xs text-[#0A084799]"
                  >
                    No documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row actions menu (portalled so table overflow does not clip it) */}
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
                  onClick={() => handleMenuAction(item.key)}
                  className={`flex h-10 w-full cursor-pointer items-center gap-2.5 px-3.5 text-left text-sm transition-colors ${
                    item.danger
                      ? "text-[#C0264A] hover:bg-[#F8EAEC]"
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
    </div>
  );
}