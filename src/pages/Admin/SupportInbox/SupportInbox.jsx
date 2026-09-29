import { useState } from "react";
import {
  LuMail,
  LuClock,
  LuTriangleAlert,
  LuChartBar,
  LuSearch,
  LuFilter,
  LuPlus,
  LuUser,
  LuChevronDown,
  LuHeadset,
  LuExternalLink,
  LuGripVertical,
} from "react-icons/lu";
import TicketModal from "./TicketModal";
import coverImg from "../../../assets/cover-img.png";

/* ==========================================================================
   MOCK DATA — hardcoded exactly as specified
   ========================================================================== */
const STATS = [
  {
    tile: "bg-[#F3E8FF]",
    icon: LuMail,
    iconColor: "text-[#5B21B6]",
    value: "24",
    valueColor: "text-[#5B21B6]",
    label: "Total articles",
  },
  {
    tile: "bg-[#FFEDD5]",
    icon: LuClock,
    iconColor: "text-[#C2410C]",
    value: "7",
    valueColor: "text-[#C2410C]",
    label: "Waiting",
  },
  {
    tile: "bg-[#FFE4E6]",
    icon: LuTriangleAlert,
    iconColor: "text-[#BE123C]",
    value: "3",
    valueColor: "text-[#BE123C]",
    label: "Urgent",
  },
  {
    tile: "bg-[#DBEAFE]",
    icon: LuChartBar,
    iconColor: "text-[#001984]",
    value: null,
    valueColor: "",
    label: "Avg. Response",
  },
];

const STATUS_TABS = ["All 34", "Open 24", "Waiting 7", "Resolved 5", "Urgent 3"];

const TICKETS = [
  {
    id: "1",
    initials: "SJ",
    avatarClass: "bg-[#E0E7FF] text-[#3730A3]",
    name: "Sarah J.",
    email: "sarah.j@example.com",
    plan: "Pro Plan",
    member: "User ID: 10472 — Member since Mar 18, 2023",
    subject: "Subscription cancellation",
    priority: "High",
    priorityClass: "bg-[#FEF2F2] text-[#BE123C] border-[#FECACA]",
    category: "Billing",
    received: "12 min ago",
    assignee: "Maya",
    format: "Active",
    formatClass: "bg-[#EEF0FF] text-[#0A0847] border-[#C7CDF5]",
    status: "Open",
    customerTime: "12 min ago",
    agentTime: "9 min ago",
    agent: "Maya (Admin)",
    customerMsg:
      "Manage your subscription, payments, and billing information.",
    agentMsg:
      "Hi Sarah, thanks for reaching out. I'm sorry to hear about the issue. I'm looking into this for you now.",
    attachment: { file: "receipt-may-2024.png", size: "245 KB" },
    note: "Payment stuck with pending charges, escalate to billing team.",
  },
  {
    id: "2",
    initials: "DK",
    avatarClass: "bg-[#DBEAFE] text-[#1E40AF]",
    name: "Daniel K.",
    email: "daniel.k@example.com",
    plan: "Free Plan",
    member: "User ID: 10471 — Member since Jan 12, 2025",
    subject: "Quiz progress missing",
    priority: "Normal",
    priorityClass: "bg-[#EEF0FF] text-[#0A0847] border-[#C7CDF5]",
    category: "Technical",
    received: "38 min ago",
    assignee: "Peter",
    format: "Waiting",
    formatClass: "bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]",
    status: "Waiting",
    customerTime: "38 min ago",
    agentTime: "25 min ago",
    agent: "Peter (Admin)",
    customerMsg:
      "My quiz progress reset overnight and I've lost a full week of answered questions.",
    agentMsg:
      "Thanks for the details, Daniel. I've restored your last-known progress and I'm checking what caused the reset.",
    attachment: null,
    note: "Compare last sync timestamp in DB before closing.",
  },
  {
    id: "3",
    initials: null,
    avatarClass: "bg-[#EA580C]",
    name: "Monica R.",
    email: "monica.r@example.com",
    plan: "Pro Plan",
    member: "User ID: 10470 — Member since Oct 05, 2024",
    subject: "Report inappropriate post",
    priority: "Urgent",
    priorityClass: "bg-[#FEF2F2] text-[#BE123C] border-[#FECACA]",
    category: "Safety",
    received: "1 hr ago",
    assignee: "Unassigned",
    format: "Open",
    formatClass: "bg-[#EEF0FF] text-[#0A0847] border-[#C7CDF5]",
    status: "Open",
    customerTime: "1 hr ago",
    agentTime: "45 min ago",
    agent: "Maya (Admin)",
    customerMsg:
      "Hi, I'd like to report a post in the community feed that looks inappropriate.",
    agentMsg:
      "Appreciate you flagging this, Monica. The safety team is reviewing it now — usually within a few hours.",
    attachment: null,
    note: "Flag for safety review before sending a reply.",
  },
  {
    id: "4",
    initials: "JT",
    avatarClass: "bg-[#1F2937] text-white",
    name: "James T.",
    email: "james.t@example.com",
    plan: "Free Plan",
    member: "User ID: 10469 — Member since Feb 28, 2025",
    subject: "Gift code not working",
    priority: "Family",
    priorityClass: "bg-[#EEF0FF] text-[#0A0847] border-[#C7CDF5]",
    category: "Gift Codes",
    received: "2 hrs ago",
    assignee: "Alex",
    format: "Resolved",
    formatClass: "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]",
    status: "Resolved",
    customerTime: "2 hrs ago",
    agentTime: "1 hr ago",
    agent: "Alex (Admin)",
    customerMsg:
      "I received a gift code but it says invalid every time I try to redeem it.",
    agentMsg:
      "Thanks James — I've validated the code on our end and it is active. Please try again in a few minutes.",
    attachment: null,
    note: "Code was fixed on 21 Mar — confirm redeem status before closing.",
  },
];

const CONTACT_SUBJECTS = [
  "Subscription & Billing",
  "Account & Login",
  "Technical Issue",
  "Report a Bug",
  "Other",
];

const SETTINGS_TABS = ["General", "Contact Form", "Automation", "Appearance"];

/* ==========================================================================
   SMALL PRIMITIVES
   ========================================================================== */
function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-[#1D5FBF]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`absolute top-[2px] h-4 w-4 rounded-full bg-white transition-all ${
          checked ? "left-[18px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

function Checkbox({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`flex h-4 w-4 cursor-pointer items-center justify-center rounded-[4px] border transition-colors ${
        checked
          ? "border-[#001984] bg-[#001984]"
          : "border-[#D1D5DB] bg-white"
      }`}
    >
      {checked && (
        <svg viewBox="0 0 12 12" className="h-3 w-3 fill-none stroke-white">
          <path
            d="M2 6.2 4.6 8.8 10 3.4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

function Select({ id, value, onChange, children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-[38px] w-full cursor-pointer appearance-none rounded-md border border-[#E2DFFC] bg-white pl-3 pr-8 text-xs font-medium text-[#0A0847CC] outline-none transition focus:border-[#001984]"
      >
        {children}
      </select>
      <LuChevronDown
        size={15}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}

function FieldLabel({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-[6px] block text-xs font-semibold text-[#0A0847CC]"
    >
      {children}
    </label>
  );
}

const inputClass =
  "h-[38px] w-full rounded-md border border-[#E2DFFC] bg-white px-3 text-xs text-[#0A0847] outline-none transition focus:border-[#001984]";

const outlineButton =
  "flex h-[38px] cursor-pointer items-center justify-center gap-2 rounded-md border border-[#E2DFFC] bg-white px-3.5 text-xs font-medium text-[#0A0847CC] transition-colors hover:bg-gray-50";

function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs font-semibold text-[#0A0847]">{label}</span>
      <Switch checked={checked} onChange={onChange} label={label} />
    </div>
  );
}

/* ==========================================================================
   COVER IMAGE THUMBNAIL — from src/assets/cover-img.png
   ========================================================================== */
function CoverThumb() {
  return (
    <img
      src={coverImg}
      alt="Cover image"
      className="w-full overflow-hidden rounded-lg border border-[#E2DFFC] object-cover object-center"
      style={{ height: 88 }}
    />
  );
}

/* ==========================================================================
   MAIN PAGE
   ========================================================================== */
export default function SupportInbox() {
  const [activeTab, setActiveTab] = useState("All 34");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [openTicket, setOpenTicket] = useState(null);
  const [settingsTab, setSettingsTab] = useState("General");
  const [toggles, setToggles] = useState({
    helpCenter: true,
    attachments: true,
    confirmation: true,
    emailNotifications: true,
    inAppNotifications: true,
    internalNote: true,
  });

  const toggleRow = (key) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleSelected = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const visible = TICKETS.filter((ticket) => {
    const q = search.toLowerCase();
    return (
      ticket.name.toLowerCase().includes(q) ||
      ticket.subject.toLowerCase().includes(q) ||
      ticket.category.toLowerCase().includes(q) ||
      ticket.assignee.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-[Inter] text-[#0A0847]">
      <div className="mx-auto max-w-[1200px] space-y-6 px-5 py-6">
        {/* ================= PAGE HEADER ================= */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-xl font-bold text-[#0A0847]">
              Support Inbox &amp; Settings
            </h1>
            <p className="mt-[6px] text-sm text-[#0A084799]">
              Review requests, reply to users, and control support option
            </p>
          </div>
          <button
            type="button"
            className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#001984] px-4 py-2.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-[#001266]"
          >
            <LuPlus size={16} />
            New Article
          </button>
        </div>

        {/* ================= STAT CARDS ================= */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center justify-center gap-4 rounded-lg border border-[#E2DFFC] bg-white px-4 py-8"
              >
                <div
                  className={`flex h-13 w-13 items-center justify-center rounded-2xl ${stat.tile}`}
                >
                  <Icon size={28} className={stat.iconColor} />
                </div>
                <div className="min-w-0">
                  {stat.value ? (
                    <p className="text-xl font-semibold text-[#0A0847] mt-0.5">
                      {stat.value}
                    </p>
                  ) : null}
                  <p className="text-xs font-semibold text-[#001984]">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= SEARCH + FILTER ================= */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-[370px]">
            <LuSearch
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search journeys..."
              className="w-full rounded-md border border-[#E2DFFC] bg-white py-3 pl-9 pr-3 text-xs text-[#0A084799] outline-none transition focus:border-[#001984]"
            />
          </div>
          <button type="button" className={`${outlineButton} shrink-0`}>
            <LuFilter size={15} />
            Filter
          </button>
        </div>

        {/* ================= STATUS PILL TABS ================= */}
        <div className="flex flex-wrap gap-2">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`h-[34px] cursor-pointer rounded-md px-4 text-xs font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#001984] text-white"
                  : "border border-[#E2DFFC] bg-white text-[#0A0847CC] hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ================= TABLE CARD ================= */}
        <div className="overflow-hidden rounded-lg border border-[#E2DFFC] bg-white p-[14px]">
          {/* bulk actions */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Select id="bulk-assign" className="w-[140px]">
              <option>Assign</option>
              <option>Maya</option>
              <option>Peter</option>
              <option>Alex</option>
            </Select>
            <Select id="bulk-resolve" className="w-[150px]">
              <option>Mark Resolved</option>
              <option>Mark Open</option>
              <option>Mark Waiting</option>
            </Select>
            <button
              type="button"
              className="flex h-[38px] cursor-pointer items-center rounded-md border border-[#BE123C] bg-white px-3.5 text-xs font-medium text-[#BE123C] transition-colors hover:bg-[#FEF2F2]"
            >
              Delete / Archive
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse">
              <thead>
                <tr className="border-b border-[#E2DFFC] bg-[#F3F7FD]">
                  <th className="w-10 p-3">
                    <Checkbox
                      checked={selected.length === TICKETS.length}
                      onChange={() =>
                        setSelected(
                          selected.length === TICKETS.length
                            ? []
                            : TICKETS.map((t) => t.id),
                        )
                      }
                      label="Select all tickets"
                    />
                  </th>
                  {["User", "Subject", "Priority", "Category", "Received", "Assignee", "Format"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className={`p-3 text-left text-sm font-medium text-[#0A0847CC]`}
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {visible.map((ticket) => (
                  <tr
                    key={ticket.id}
                    onClick={() => setOpenTicket(ticket)}
                    className="cursor-pointer border-b border-[#E2DFFC] transition-colors last:border-b-0 hover:bg-gray-50/50"
                  >
                    <td className="p-3">
                      <Checkbox
                        checked={selected.includes(ticket.id)}
                        onChange={() => toggleSelected(ticket.id)}
                        label={`Select ${ticket.name}`}
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg text-xs font-bold ${ticket.avatarClass}`}
                        >
                          {ticket.initials ? (
                            ticket.initials
                          ) : (
                            <LuUser size={17} className="text-white" />
                          )}
                        </span>
                        <span className="whitespace-nowrap text-xs font-medium text-[#0A0847]">
                          {ticket.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-xs text-[#0A0847]">
                      {ticket.subject}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-block whitespace-nowrap rounded-md border px-2 py-[3px] text-xs font-semibold ${ticket.priorityClass}`}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-[#0A084799]">
                      {ticket.category}
                    </td>
                    <td className="whitespace-nowrap p-3 text-xs text-[#0A084799]">
                      {ticket.received}
                    </td>
                    <td className="whitespace-nowrap p-3 text-xs text-[#0A0847]">
                      {ticket.assignee}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-[3px] text-xs font-semibold ${ticket.formatClass}`}
                      >
                        {ticket.format}
                      </span>
                    </td>
                  </tr>
                ))}

                {visible.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="p-3 py-10 text-center text-xs text-[#0A084799]"
                    >
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= SETTINGS TABS CARD ================= */}
        <div className="rounded-lg border border-[#E2DFFC] bg-white">
          {/* tab bar */}
          <div className="flex gap-7 border-b border-[#E2DFFC] px-4 pt-4">
            {SETTINGS_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setSettingsTab(tab)}
                className={`cursor-pointer border-b-[3px] pb-3 text-xs transition-colors ${
                  settingsTab === tab
                    ? "border-[#001984] font-bold text-[#001984]"
                    : "border-transparent font-semibold text-[#0A0847CC] hover:text-[#0A0847]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 4 columns */}
          <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 xl:grid-cols-4">
            {/* ---- COLUMN 1: General ---- */}
            <div
              className={`flex min-h-[470px] flex-col gap-4 rounded-lg border p-4 ${
                settingsTab === "General"
                  ? "border-[#1D5FBF]"
                  : "border-[#E2DFFC]"
              }`}
            >
              <ToggleRow
                label="Help Center Enabled"
                checked={toggles.helpCenter}
                onChange={() => toggleRow("helpCenter")}
              />

              <div>
                <FieldLabel htmlFor="support-hours">Support Hours</FieldLabel>
                <input
                  id="support-hours"
                  type="text"
                  defaultValue="Mon–Fri, 8:00 AM–6:00 PM (PST)"
                  className={inputClass}
                />
              </div>

              <div>
                <FieldLabel htmlFor="response-promise">
                  Response Promise
                </FieldLabel>
                <Select id="response-promise">
                  <option>Within 24 hours</option>
                  <option>Within 12 hours</option>
                  <option>Within 48 hours</option>
                </Select>
              </div>

              <div>
                <FieldLabel htmlFor="support-email">Support Email</FieldLabel>
                <input
                  id="support-email"
                  type="text"
                  defaultValue="support@faithlyplus.com"
                  className={inputClass}
                />
              </div>
            </div>

            {/* ---- COLUMN 2: Contact Form ---- */}
            <div
              className={`flex min-h-[470px] flex-col gap-4 rounded-lg border p-4 ${
                settingsTab === "Contact Form"
                  ? "border-[#1D5FBF]"
                  : "border-[#E2DFFC]"
              }`}
            >
              <h3 className="text-xs font-semibold text-[#0A0847CC]">
                Contact Form
              </h3>

              <div>
                <FieldLabel htmlFor="contact-subjects">
                  Manage contact subjects
                </FieldLabel>
                <input
                  id="contact-subjects"
                  type="text"
                  defaultValue="Mon–Fri, 8:00 AM–6:00 PM (PST)"
                  className={inputClass}
                />
              </div>

              <ul className="space-y-2">
                {CONTACT_SUBJECTS.map((subject) => (
                  <li
                    key={subject}
                    className="flex items-center gap-2"
                  >
                    <LuGripVertical
                      size={14}
                      className="shrink-0 cursor-grab text-[#9CA3AF]"
                    />
                    <span className="flex h-[34px] flex-1 cursor-grab items-center rounded-md border border-[#E2DFFC] bg-white px-2.5 text-xs text-[#0A0847]">
                      {subject}
                    </span>
                  </li>
                ))}
              </ul>

              <ToggleRow
                label="Allow Attachments"
                checked={toggles.attachments}
                onChange={() => toggleRow("attachments")}
              />
              <ToggleRow
                label="Send Confirmation Email"
                checked={toggles.confirmation}
                onChange={() => toggleRow("confirmation")}
              />

              <div>
                <FieldLabel htmlFor="max-file-size">Max File Size</FieldLabel>
                <Select id="max-file-size">
                  <option>5 MB</option>
                  <option>10 MB</option>
                  <option>25 MB</option>
                </Select>
              </div>
            </div>

            {/* ---- COLUMN 3: Automation ---- */}
            <div
              className={`flex min-h-[470px] flex-col gap-4 rounded-lg border p-4 ${
                settingsTab === "Automation"
                  ? "border-[#1D5FBF]"
                  : "border-[#E2DFFC]"
              }`}
            >
              <h3 className="text-xs font-semibold text-[#0A0847CC]">
                Automation
              </h3>

              <div>
                <FieldLabel htmlFor="auto-assign">
                  Auto-assign new requests
                </FieldLabel>
                <Select id="auto-assign">
                  <option>Round Robin</option>
                  <option>Load Based</option>
                  <option>Manual</option>
                </Select>
              </div>

              <div>
                <FieldLabel htmlFor="urgent-rules">
                  Urgent keyword rules
                </FieldLabel>
                <button
                  id="urgent-rules"
                  type="button"
                  className={`${inputClass} flex cursor-pointer items-center text-left`}
                >
                  Manage Rules
                </button>
              </div>

              <div>
                <FieldLabel htmlFor="auto-close">
                  Auto-close resolved requests after
                </FieldLabel>
                <Select id="auto-close">
                  <option>7 days</option>
                  <option>14 days</option>
                  <option>30 days</option>
                </Select>
              </div>

              <ToggleRow
                label="Email notifications"
                checked={toggles.emailNotifications}
                onChange={() => toggleRow("emailNotifications")}
              />
              <ToggleRow
                label="In-app notifications"
                checked={toggles.inAppNotifications}
                onChange={() => toggleRow("inAppNotifications")}
              />
            </div>

            {/* ---- COLUMN 4: Appearance ---- */}
            <div
              className={`flex min-h-[470px] flex-col gap-4 rounded-lg border p-4 ${
                settingsTab === "Appearance"
                  ? "border-[#1D5FBF]"
                  : "border-[#E2DFFC]"
              }`}
            >
              <h3 className="text-xs font-semibold text-[#0A0847CC]">
                Appearance
              </h3>

              <div>
                <FieldLabel htmlFor="short-description">
                  Short Description
                </FieldLabel>
                <div className="relative">
                  <textarea
                    id="short-description"
                    defaultValue="Manage your subscription, payments, and billing information."
                    rows={3}
                    className="w-full resize-none rounded-md border border-[#E2DFFC] bg-white px-3 py-2 pr-12 text-xs text-[#0A0847] outline-none transition focus:border-[#001984]"
                  />
                  <span className="absolute bottom-2 right-2.5 text-[11.5px] text-[#0A084799]">
                    63/160
                  </span>
                </div>
              </div>

              <div>
                <FieldLabel htmlFor="support-icon">Support Icon</FieldLabel>
                <div className="flex items-center gap-2">
                  <span className="flex h-[38px] w-[38px] items-center justify-center rounded-md border border-[#E2DFFC] bg-white text-[#001984]">
                    <LuHeadset size={17} />
                  </span>
                  <button type="button" className={outlineButton}>
                    Change Icon
                  </button>
                </div>
              </div>

              <div>
                <FieldLabel>Cover Image</FieldLabel>
                <CoverThumb />
              </div>

              <button type="button" className={`${outlineButton} w-full`}>
                Change Image
              </button>
              <button type="button" className={`${outlineButton} w-full`}>
                Preview User View
                <LuExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TICKET DETAIL MODAL ================= */}
      {openTicket && (
        <TicketModal ticket={openTicket} onClose={() => setOpenTicket(null)} />
      )}
    </div>
  );
}
