import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  PiArrowsLeftRight,
  PiArrowSquareOut,
  PiBell,
  PiBookOpenText,
  PiCalendarBlank,
  PiCaretDown,
  PiCaretRight,
  PiChartBar,
  PiDotsThreeCircle,
  PiGear,
  PiHandsPraying,
  PiHeadphones,
  PiHeadset,
  PiHouse,
  PiIdentificationCard,
  PiList,
  PiMagnifyingGlass,
  PiQuestion,
  PiSignOut,
  PiSparkle,
  PiStar,
  PiTag,
  PiUserCircle,
  PiUserGear,
  PiUsers,
  PiX,
} from "react-icons/pi";
import Logo from "../components/shared/Logo";

/* ---------------- Sidebar ---------------- */

const NAV_GROUPS = [
  [{ id: "dashboard", label: "Dashboard", icon: PiHouse, path: "/admin" }],
  [
    {
      id: "subscription",
      label: "Subscription",
      icon: PiIdentificationCard,
      path: "/admin/subscriptions",
    },
  ],
  [
    {
      id: "daily",
      label: "Daily",
      icon: PiCalendarBlank,
      children: [
  {
    id: "daily-verse",
    label: "Daily Verse",
    path: "/admin/dailyverse",
  },
  {
    id: "daily-reflection",
    label: "Daily Reflection",
    path: "/admin/dailyreflection",
  },
],
    },
    { id: "pray", label: "Pray with Me", icon: PiHandsPraying },
    { id: "audio", label: "Audio Library", icon: PiHeadphones },
    { id: "jesus", label: "Jesus Story", icon: PiBookOpenText },
  ],
  [
    {
      id: "users",
      label: "Users",
      icon: PiUsers,
      children: [
        { id: "roles", label: "Roles" },
        { id: "activities", label: "Activities" },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: PiGear,
      children: [
        { id: "set-subscription", label: "Subscription" },
        { id: "set-ai", label: "AI Model" },
        { id: "set-look", label: "Lock & Feel" },
        { id: "set-email", label: "Email Service" },
      ],
    },
    { id: "more", label: "More Info", icon: PiDotsThreeCircle },
  ],
  [
    { id: "help", label: "Help Center", icon: PiQuestion },
    { id: "support", label: "Support", icon: PiHeadset },
    { id: "rate", label: "Rate the App", icon: PiStar },
  ],
  [
    {
      id: "cms",
      label: "CMS",
      icon: PiUserGear,
      children: [
        { id: "cms-resources", label: "Help & Resources" },
        { id: "cms-pages", label: "Pages" },
      ],
    },
    { id: "report", label: "Report", icon: PiChartBar },
    { id: "quiz", label: "Quiz & Answers", icon: PiTag },
    { id: "reflection", label: "Reflection", icon: PiArrowsLeftRight },
    { id: "ai", label: "AI Engagement", icon: PiSparkle },
  ],
];

function NavItem({ item, active, collapsed, onNavigate }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;
  const isActive = active === item.id;

  const handleClick = () => {
    if (hasChildren) setOpen((v) => !v);
    onNavigate(item);
  };

  if (collapsed) {
    return (
      <button
        onClick={handleClick}
        title={item.label}
        className={`flex h-10 w-10 items-center justify-center rounded-nav transition ${
          isActive ? "bg-navy-hover text-white" : "text-muted hover:bg-navy-hover/40 hover:text-white"
        }`}
      >
        <Icon size={16} strokeWidth={1.5} />
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className={`flex h-10 w-full items-center gap-3 rounded-nav px-3 text-[14px] transition ${
          isActive
            ? "bg-navy-hover font-bold text-white"
            : "text-muted hover:bg-navy-hover/40 hover:text-white"
        }`}
      >
        <Icon size={16} className={isActive ? "text-white" : "text-muted"} strokeWidth={1.5} />
        <span className="flex-1 truncate text-left">{item.label}</span>
        {hasChildren && (open ? <PiCaretDown size={14} /> : <PiCaretRight size={14} />)}
      </button>

      {hasChildren && open && !collapsed && (
        <div className="ml-[22px] border-l border-white/20 pl-3">
          {item.children.map((child) => (
            <button
              key={child.id}
              onClick={() => onNavigate(child)}
              className={`flex h-9 w-full items-center rounded-md px-2 text-[13px] transition ${
                active === child.id ? "font-semibold text-white" : "text-[#a8b3d8] hover:text-white"
              }`}
            >
              {child.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Sidebar({ collapsed, mobileOpen, onToggle, onClose, active, onNavigate }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-[100dvh] w-[250px] shrink-0 flex-col bg-[#16235c] transition-all duration-200 lg:sticky lg:top-0 lg:bottom-auto lg:z-auto lg:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      } ${collapsed ? "lg:w-[72px]" : "lg:w-[250px]"}`}
    >
      <div
        className={`relative flex shrink-0 items-center border-b border-white/10 ${
          collapsed ? "h-[88px] flex-col justify-center gap-[6px]" : "h-[108px] justify-start px-[24px]"
        }`}
      >
        <Logo
          className={`object-contain object-left ${
            collapsed ? "h-[40px] w-auto" : "h-[92px] w-[209px]"
          }`}
        />

        {!collapsed && (
          <button
            onClick={onClose}
            title="Close sidebar"
            className="absolute right-[16px] top-[16px] z-20 flex h-7 w-7 items-center justify-center rounded-md text-muted transition hover:bg-navy-hover/50 hover:text-white lg:hidden"
          >
            <PiX size={16} />
          </button>
        )}

        {collapsed ? (
          <button
            onClick={onToggle}
            title="Expand sidebar"
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition hover:bg-navy-hover/50 hover:text-white"
          >
            <PiCaretRight size={14} />
          </button>
        ) : (
          <button
            onClick={onToggle}
            title="Collapse sidebar"
            className="absolute -right-[10px] top-1/2 z-20 hidden h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-navy shadow-sm transition hover:bg-surface lg:flex"
          >
            <PiCaretRight size={11} />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto px-3 py-4">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className="space-y-1">
            {group.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                active={active}
                collapsed={collapsed}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <div
          className={`flex items-center rounded-xl border border-white/15 bg-navy-deep/60 p-2.5 ${
            collapsed ? "justify-center border-0" : ""
          }`}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
            <PiUserCircle size={24} className="text-white" />
          </div>
          {!collapsed && (
            <>
              <div className="ml-2.5 min-w-0 flex-1">
                <p className="truncate text-[14px] font-bold text-white">John Doe</p>
                <p className="text-[12px] text-muted">Admin</p>
              </div>
              <PiCaretRight size={13} className="rotate-90 text-muted" />
            </>
          )}
        </div>

        {!collapsed && (
          <button className="mt-2 flex h-10 w-full items-center gap-3 rounded-nav px-3 text-[14px] text-[#fca5a5] transition hover:bg-red-500/10">
            <PiSignOut size={16} strokeWidth={1.5} />
            Logout
          </button>
        )}
      </div>
    </aside>
  );
}

/* ---------------- Navbar ---------------- */

function Navbar({ collapsed, onMenuClick }) {
  return (
    <header
      className={`flex h-[64px] shrink-0 items-center justify-between gap-3 whitespace-nowrap border-b border-[#E8ECF4] bg-white px-4 sm:px-6 ${
        collapsed ? "lg:pl-4 lg:pr-6" : ""
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-navy transition hover:border-navy/40 lg:hidden"
        >
          <PiList size={20} />
        </button>

        <div className="relative min-w-0 max-w-[280px] flex-1">
          <PiMagnifyingGlass
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtext"
          />
          <input
            type="text"
            placeholder="Search anything..."
            className="h-[36px] w-full rounded-[8px] border border-[#E5E7EB] bg-white pl-9 pr-3 text-[12px] text-navy outline-none transition placeholder:text-[#9AA0B4] focus:border-navy/40"
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
        <button className="flex h-[32px] items-center gap-1.5 rounded-[8px] border border-[#E5E7EB] bg-white px-2.5 text-[12px] font-medium text-navy transition hover:border-navy/40">
          <span className="text-[14px] leading-none">🇬🇧</span>
          <span className="hidden sm:inline">English</span>
          <svg
            className="hidden sm:block"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
          >
            <path
              d="M1 1l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span className="h-4 w-px bg-[#E8ECF4]" aria-hidden />

        <button
          className="relative flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[8px] border border-[#E5E7EB] bg-white text-navy transition hover:border-navy/40"
          aria-label="Notifications"
        >
          <PiBell size={16} />
          <span className="absolute right-[7px] top-[7px] h-[6px] w-[6px] rounded-full bg-red-500" />
        </button>

        <button className="flex h-[32px] items-center gap-1.5 rounded-[8px] border border-navy bg-white px-2.5 text-[12px] font-semibold text-navy transition hover:bg-navy hover:text-white sm:px-3">
          <span className="hidden sm:inline">View Website</span>
          <PiArrowSquareOut size={14} />
        </button>
      </div>
    </header>
  );
}

/* ---------------- Dashboard Layout (Sidebar + Navbar) ---------------- */

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches,
  );
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleNavigate = (item) => {
    setActive(item.id);
    if (item.path) navigate(item.path);
    setMobileOpen(false);
  };

  return (
    <div className="flex min-h-screen overflow-x-clip bg-surface">
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      <Sidebar
        collapsed={isDesktop && collapsed}
        mobileOpen={mobileOpen}
        onToggle={() => setCollapsed((v) => !v)}
        onClose={() => setMobileOpen(false)}
        active={active}
        onNavigate={handleNavigate}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar collapsed={collapsed} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}