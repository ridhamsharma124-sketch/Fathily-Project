import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  PiArrowUpRight,
  PiArrowsLeftRight,
  PiBell,
  PiBookOpenText,
  PiCalendarBlank,
  PiCaretDown,
  PiCaretRight,
  PiChartBar,
  PiDotsThreeCircle,
  PiGear,
  PiGlobeSimple,
  PiHandsPraying,
  PiHeadphones,
  PiHeadset,
  PiHouse,
  PiIdentificationCard,
  PiQuestion,
  PiSignOut,
  PiSparkle,
  PiStar,
  PiTag,
  PiUserCircle,
  PiUserGear,
  PiUsers,
} from "react-icons/pi";
import Logo from "../components/shared/Logo";
import ChatFab from "../components/shared/ChatFab";

/* ---------------- Sidebar ---------------- */

const NAV_GROUPS = [
  [{ id: "dashboard", label: "Dashboard", icon: PiHouse }],
  [{ id: "subscription", label: "Subscription", icon: PiIdentificationCard }],
  [
    {
      id: "daily",
      label: "Daily",
      icon: PiCalendarBlank,
      children: [
        { id: "daily-verse", label: "Daily Verse" },
        { id: "daily-reflection", label: "Daily Reflection" },
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
    onNavigate(item.id);
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
              onClick={() => onNavigate(child.id)}
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

function Sidebar({ collapsed, onToggle, active, onNavigate }) {
  return (
    <aside
      className={`sticky top-0 flex h-screen shrink-0 flex-col bg-[#16235c] transition-all duration-200 ${
        collapsed ? "w-[72px]" : "w-[250px]"
      }`}
    >
      <div
        className={`flex h-[70px] items-center border-b border-white/10 ${
          collapsed ? "justify-center px-2" : "px-4"
        }`}
      >
        {collapsed && (
          <button
            onClick={onToggle}
            title="Expand sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-hover/60 text-gold transition hover:bg-navy-hover hover:text-white"
          >
            <PiCaretRight size={14} />
          </button>
        )}
        {!collapsed && (
          <>
            <span className="flex flex-1 justify-center">
              <Logo className="h-6" />
            </span>
            <button
              onClick={onToggle}
              title="Collapse sidebar"
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition hover:bg-navy-hover/50 hover:text-white"
            >
              <PiCaretRight size={14} className="rotate-180" />
            </button>
          </>
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

function Navbar({ collapsed }) {
  return (
    <header
      className={`flex h-[70px] shrink-0 items-center justify-between gap-4 bg-surface px-6 ${
        collapsed ? "lg:pl-4 lg:pr-6" : ""
      }`}
    >
      <div>
        <h1 className="text-[20px] font-bold text-navy">Hello, Admin! 👋</h1>
        <p className="text-[13px] text-subtext">Welcome back, Admin</p>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex h-10 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-[13px] font-medium text-navy transition hover:border-navy/40">
          <PiGlobeSimple size={16} className="text-subtext" />
          English
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path
              d="M1 1l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white text-navy transition hover:border-navy/40"
          aria-label="Notifications"
        >
          <PiBell size={18} />
          <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
            1
          </span>
        </button>

        <button className="flex h-10 items-center gap-1.5 rounded-lg border border-navy bg-white px-4 text-[13px] font-semibold text-navy transition hover:bg-navy hover:text-white">
          View Website
          <PiArrowUpRight size={15} />
        </button>
      </div>
    </header>
  );
}

/* ---------------- Dashboard Layout (Sidebar + Navbar) ---------------- */

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        active={active}
        onNavigate={setActive}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar collapsed={collapsed} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <ChatFab />
    </div>
  );
}