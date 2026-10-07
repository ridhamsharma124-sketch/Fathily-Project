import { useState } from "react";
import {
PiBellSlash,
  PiBookOpen,
  PiCaretDown,
  PiCaretLeft,
  PiCaretRight,
  PiCheckCircle,
  PiDownloadSimple,
  PiInfo,
  PiMagnifyingGlass,
  PiMedal,
  PiMusicNotes,
  PiMusicNoteSimple,
  PiPencilSimple,
  PiPlay,
  PiPlus,
  PiQuestion,
  PiSlidersHorizontal,
  PiStack,
  PiTrash,
  PiX,
} from "react-icons/pi";

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const CATEGORY_META = {
  "Background Music": { bg: "#E8F7EC", color: "#22A55A", Icon: PiMusicNotes },
  Quiz: { bg: "#E8E7FF", color: "#4338CA", Icon: PiQuestion },
  Rewards: { bg: "#F6ECE3", color: "#C2703A", Icon: PiMedal },
  Scripture: { bg: "#E7E5FB", color: "#4F46E5", Icon: PiBookOpen },
};

const CATEGORY_ORDER = [
  "Background Music",
  "Quiz",
  "Rewards",
  "Scripture",
  "Word Search",
  "System",
];

const AUDIO_ROWS = [
  {
    id: 1,
    title: "App Background Music",
    category: "Background Music",
    file: "faithly_theme.mp3",
    duration: "—",
    size: "8.4 MB",
    enabled: true,
  },
  {
    id: 2,
    title: "Quiz Background Music",
    category: "Quiz",
    file: "faithly_theme.mp3",
    duration: "02:18",
    size: "8.4 MB",
    enabled: true,
  },
  {
    id: 3,
    title: "Correct Answer",
    category: "Quiz",
    file: "faithly_theme.mp3",
    duration: "00:03",
    size: "8.4 MB",
    enabled: true,
  },
  {
    id: 4,
    title: "Wrong Answer",
    category: "Quiz",
    file: "faithly_theme.mp3",
    duration: "00:02",
    size: "8.4 MB",
    enabled: true,
  },
  {
    id: 5,
    title: "Level Complete",
    category: "Rewards",
    file: "faithly_theme.mp3",
    duration: "00:07",
    size: "8.4 MB",
    enabled: true,
  },
  {
    id: 6,
    title: "Reward Collected",
    category: "Rewards",
    file: "faithly_theme.mp3",
    duration: "00:07",
    size: "8.4 MB",
    enabled: true,
  },
  {
    id: 7,
    title: "Verse Released",
    category: "Scripture",
    file: "faithly_theme.mp3",
    duration: "00:07",
    size: "8.4 MB",
    enabled: true,
  },
  {
    id: 8,
    title: "Prayer Amen",
    category: "Scripture",
    file: "faithly_theme.mp3",
    duration: "00:07",
    size: "8.4 MB",
    enabled: true,
  },
];

const STATS = [
  { bg: "#E8E7FF", color: "#4338CA", Icon: PiMusicNoteSimple, label: "Total Audio", value: 15 },
  { bg: "#E8F7EC", color: "#22A55A", Icon: PiCheckCircle, label: "Enabled", value: 13 },
  { bg: "#F6ECE3", color: "#C2703A", Icon: PiBellSlash, label: "Disabled", value: 2 },
  { bg: "#E7E5FB", color: "#4F46E5", Icon: PiStack, label: "Storage Used", value: "48.6 MB" },
];

/* ==========================================================================
   SMALL UI BUILDING BLOCKS
   ========================================================================== */
function Switch({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className={`relative h-[20px] w-[36px] cursor-pointer rounded-full transition-colors ${
        checked ? "bg-[#159904]" : "bg-[#E5E7EB]"
      }`}
    >
      <span
        className={`absolute top-[2px] h-[16px] w-[16px] rounded-full bg-white shadow transition-all ${
          checked ? "left-[18px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

function Select({ value, onChange, options = [] }) {
  return (
    <span className="relative block">
      <select
        value={value}
        onChange={onChange}
        className="h-[38px] w-full cursor-pointer appearance-none rounded-[8px] border border-[#E5E7EB] bg-white pl-[12px] pr-[30px] text-[13px] text-body outline-none transition focus:border-[#4338CA]"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <PiCaretDown
        size={12}
        className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2 text-[#6B7280]"
      />
    </span>
  );
}

function Waveform({ width = "w-[60px]" }) {
  const bars = [6, 14, 10, 20, 12, 18, 8, 14, 20, 10, 16, 6, 12];
  return (
    <div className={`flex h-[20px] items-center gap-[2px] ${width}`}>
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-[#4338CA]"
          style={{ height: `${h}px`, opacity: 1 - (i % 4) * 0.15 }}
        />
      ))}
    </div>
  );
}

/* ==========================================================================
   MAIN PAGE
   ========================================================================== */
export default function SoundAudio() {
  const [rows, setRows] = useState(AUDIO_ROWS);
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [drawerRow, setDrawerRow] = useState(null);

  const allowedTabs = ["All", ...CATEGORY_ORDER];
  const tabs = allowedTabs.filter((t) => t !== "Word Search" && t !== "System");
  const tabOrder = [...tabs, "Word Search", "System"];

  const filteredRows = rows.filter((row) => {
    const matchesTab =
      tab === "All" || row.category === tab || tab === "Word Search" || tab === "System";
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      row.title.toLowerCase().includes(q) ||
      row.category.toLowerCase().includes(q) ||
      row.file.toLowerCase().includes(q);
    const matchesCategory =
      category === "All Categories" || row.category === category;
    const matchesStatus = status === "All Status" || (status === "Enabled" ? row.enabled : !row.enabled);
    return matchesTab && matchesSearch && matchesCategory && matchesStatus;
  });

  const toggleRow = (id) =>
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );

  return (
    <div className="min-h-screen bg-[#F8F9FC] p-6 font-[Inter]">
      {/* 1. Header row */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[#0A1E46]">Audio Management</h1>
          <p className="mt-[2px] text-[13px] font-normal text-[#6B7280]">
            Manage music and sound effects across the entire app.
          </p>
        </div>
        <div className="flex items-center gap-[12px]">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-[6px] rounded-[8px] border border-[#E5E7EB] bg-white px-[16px] py-[10px] text-[13px] font-semibold text-[#111827] transition hover:border-[#4338CA]"
          >
            <PiSlidersHorizontal size={15} />
            Audio Settings
          </button>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-[6px] rounded-[8px] bg-[#04127F] px-[16px] py-[10px] text-[13px] font-semibold text-white transition hover:bg-[#0a1c68]"
          >
            <PiPlus size={15} />
            Upload Audio
          </button>
        </div>
      </div>

      {/* 2. Stat cards */}
      <div className="mt-[20px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ bg, color, Icon, label, value }) => (
          <div
            key={label}
            className="flex h-[127px] w-full items-center gap-[10px] rounded-[8px] border border-[#E5E4EC] bg-white pl-[16px] pr-[29px]"
          >
            <div
              className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: bg }}
            >
              <Icon size={20} style={{ color }} strokeWidth={1.5} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-[#6B7280]">{label}</p>
              <p className="mt-[2px] truncate text-[20px] font-bold leading-tight text-[#0A1E46]">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Info banner */}
      <div className="mt-[16px] flex items-center gap-[8px] rounded-[8px] bg-[#EEF3FF] px-[12px] py-[8px] text-[12.5px] text-[#3B4A6B]">
        <PiInfo size={15} className="shrink-0 text-[#4338CA]" />
        Featured Date appears on the homepage card and both experience screens.
      </div>

      {/* 4. Search + filters */}
      <div className="mt-[16px] flex flex-wrap items-center justify-between gap-[12px]">
        <div className="relative w-[320px] max-w-full">
          <PiMagnifyingGlass
            size={16}
            className="pointer-events-none absolute left-[12px] top-1/2 -translate-y-1/2 text-[#9CA3AF]"
          />
          <input
            type="text"
            placeholder="Search audio or event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-[38px] w-full rounded-[8px] border border-[#E5E7EB] bg-white pl-[38px] pr-[12px] text-[13px] text-[#0A1E46] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#4338CA]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-[12px]">
          <div className="w-[150px]">
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={["All Categories", ...CATEGORY_ORDER]}
            />
          </div>
          <div className="w-[130px]">
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={["All Status", "Enabled", "Disabled"]}
            />
          </div>
          <span className="text-[13px] font-semibold text-[#4338CA]">
            {`${filteredRows.length} audio files`}
          </span>
        </div>
      </div>

      {/* 5. Tabs */}
      <div className="relative mt-[16px] flex items-center gap-[24px] overflow-x-auto border-b border-[#E5E7EB]">
        {tabOrder.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`-mb-px cursor-pointer whitespace-nowrap border-b-2 pb-[10px] text-[13px] transition ${
              tab === t
                ? "border-[#4338CA] font-semibold text-[#4338CA]"
                : "border-transparent font-medium text-[#6B7280] hover:text-[#4338CA]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 6. Table */}
      <div className="mt-[12px] overflow-hidden rounded-[10px] border border-[#EEF0F5] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr>
                {["Event & Usage", "Audio File", "Preview", "Duration", "Size", "Status", "Actions"].map(
                  (col) => (
                    <th
                      key={col}
                      className={`whitespace-nowrap bg-[#F3F4FB] px-[16px] py-[12px] text-[12.5px] font-semibold text-[#4B5563] ${
                        col === "Actions" ? "text-right" : "text-left"
                      }`}
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-[16px] py-[40px] text-center text-[13px] text-[#6B7280]"
                  >
                    No audio files found.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => {
                  const meta = CATEGORY_META[row.category] || CATEGORY_META.Quiz;
                  const Icon = meta.Icon;
                  return (
                    <tr
                      key={row.id}
                      className="border-b border-[#F0F1F5] last:border-0"
                    >
                      <td className="whitespace-nowrap px-[16px] py-[12px]">
                        <div className="flex items-center gap-[12px]">
                          <div
                            className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[8px]"
                            style={{ backgroundColor: meta.bg }}
                          >
                            <Icon size={18} style={{ color: meta.color }} strokeWidth={1.5} />
                          </div>
                          <div>
                            <p className="text-[13.5px] font-semibold text-[#0A1E46]">
                              {row.title}
                            </p>
                            <p className="mt-[1px] text-[11.5px] text-[#9CA3AF]">
                              {row.category}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-[16px] py-[12px] text-[12.5px] text-[#6B7280]">
                        {row.file}
                      </td>
                      <td className="whitespace-nowrap px-[16px] py-[12px]">
                        <div className="flex items-center gap-[12px]">
                          <button
                            type="button"
                            aria-label="Play preview"
                            className="flex h-[28px] w-[28px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#04127F] text-white transition hover:bg-[#0a1c68]"
                          >
                            <PiPlay size={13} weight="fill" />
                          </button>
                          <Waveform />
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-[16px] py-[12px] text-[13.5px] text-[#374151]">
                        {row.duration}
                      </td>
                      <td className="whitespace-nowrap px-[16px] py-[12px] text-[13.5px] text-[#374151]">
                        {row.size}
                      </td>
                      <td className="whitespace-nowrap px-[16px] py-[12px]">
                        <div className="flex items-center gap-[10px]">
                          <Switch checked={row.enabled} onChange={() => toggleRow(row.id)} />
                          <span
                            className={`text-[13px] ${
                              row.enabled ? "text-[#16A34A]" : "text-[#9CA3AF]"
                            }`}
                          >
                            {row.enabled ? "Enabled" : "Disabled"}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-[16px] py-[12px] text-right">
                        <div className="flex items-center justify-end gap-[12px]">
                          <button
                            type="button"
                            onClick={() => setDrawerRow(row)}
                            aria-label="Edit audio"
                            className="cursor-pointer text-[#9CA3AF] transition hover:text-[#0A1E46]"
                          >
                            <PiPencilSimple size={17} />
                          </button>
                          <button
                            type="button"
                            aria-label="Download"
                            className="cursor-pointer text-[#9CA3AF] transition hover:text-[#0A1E46]"
                          >
                            <PiDownloadSimple size={17} />
                          </button>
                          <button
                            type="button"
                            aria-label="Delete"
                            className="cursor-pointer text-[#EF4444] transition hover:opacity-70"
                          >
                            <PiTrash size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. Pagination footer */}
      <div className="mt-[16px] flex flex-col items-center justify-between gap-[12px] sm:flex-row">
        <div className="flex items-center gap-[8px]">
          <span className="text-[13px] text-[#0A1E46]">Display</span>
          <span className="relative">
            <select
              aria-label="Entries per page"
              className="h-[30px] w-[56px] cursor-pointer appearance-none rounded-[6px] border border-[#E5E7EB] bg-white pl-[12px] pr-[24px] text-[13px] text-[#0A1E46] outline-none"
              defaultValue="05"
            >
              <option>05</option>
              <option>10</option>
              <option>25</option>
            </select>
            <PiCaretDown
              size={12}
              className="pointer-events-none absolute right-[6px] top-1/2 -translate-y-1/2 text-[#6B7280]"
            />
          </span>
          <span className="text-[13px] text-[#0A1E46]">Entries</span>
        </div>

        <div className="flex items-center gap-[8px]">
          <button
            type="button"
            aria-label="Previous page"
            className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] border border-[#E5E7EB] bg-white text-[#6B7280] transition hover:text-[#0A1E46]"
          >
            <PiCaretLeft size={14} />
          </button>
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              className={`flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] text-[13px] transition ${
                num === 1
                  ? "bg-[#04127F] font-semibold text-white"
                  : "bg-white text-[#0A1E46] hover:bg-[#F3F4FB]"
              }`}
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            aria-label="Next page"
            className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] border border-[#E5E7EB] bg-white text-[#6B7280] transition hover:text-[#0A1E46]"
          >
            <PiCaretRight size={14} />
          </button>
        </div>
      </div>

      {/* 8. Edit Audio drawer */}
      {drawerRow && (
        <EditDrawer row={drawerRow} onClose={() => setDrawerRow(null)} />
      )}
    </div>
  );
}

/* ==========================================================================
   EDIT AUDIO DRAWER
   ========================================================================== */
function EditDrawer({ row, onClose }) {
  const [form, setForm] = useState({
    event: row.title,
    displayName: row.title,
    fileName: row.file,
    fileSize: row.size,
    loop: false,
    volume: 80,
    fadeIn: "0.0s",
    fadeOut: "0.0s",
    enabled: row.enabled,
  });

  const upd = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e && e.target ? e.target.value : e }));

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[6px]"
        onClick={onClose}
        aria-hidden
      />
      <aside className="fixed left-1/2 top-1/2 z-50 flex max-h-[92vh] w-[600px] max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_24px_48px_rgba(0,0,0,0.25)]">
        {/* Modal header */}
        <div className="flex items-start justify-between gap-[12px] border-b border-[#EEF0F5] p-[20px]">
          <div>
            <h3 className="text-[16px] font-bold text-heading">Edit Audio</h3>
            <p className="mt-[2px] text-[13px] text-sub">{row.title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-[28px] w-[28px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#E5E7EB] text-sub transition hover:text-heading"
          >
            <PiX size={15} />
          </button>
        </div>

        {/* Drawer body */}
        <div className="min-h-0 flex-1 space-y-[16px] overflow-y-auto p-[20px]">
          <Field label="Event / Usage">
            <Select
              value={form.event}
              onChange={upd("event")}
              options={[row.title, "App Background Music", "Quiz Background Music", "Correct Answer", "Wrong Answer", "Level Complete", "Reward Collected", "Verse Released", "Prayer Amen"]}
            />
          </Field>

          <Field label="Display Name">
            <input
              value={form.displayName}
              onChange={upd("displayName")}
              className="h-[40px] w-full rounded-[8px] border border-[#E5E7EB] bg-white px-[12px] text-[13.5px] text-body outline-none transition placeholder:text-[#9CA3AF] focus:border-[#4338CA]"
            />
          </Field>

          <Field label="Audio File">
            <div className="rounded-[8px] border border-[#E5E7EB] bg-[#F9FAFB] p-[12px]">
              <div className="flex items-center gap-[10px]">
                <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[8px] bg-[#E8E7FF] text-[#4338CA]">
                  <PiMusicNoteSimple size={17} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-body">
                    {form.fileName}
                  </p>
                  <p className="text-[11.5px] text-sub">{form.fileSize}</p>
                </div>
                <button
                  type="button"
                  aria-label="Play file"
                  className="flex h-[34px] w-[34px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#04127F] text-white transition hover:bg-[#0a1c68]"
                >
                  <PiPlay size={15} weight="fill" />
                </button>
              </div>
              <button
                type="button"
                className="mt-[12px] flex cursor-pointer items-center gap-[6px] rounded-[6px] border border-[#E5E7EB] bg-white px-[12px] py-[6px] text-[12px] font-medium text-body transition hover:bg-[#F3F4FB]"
              >
                Replace
              </button>
            </div>
          </Field>

          <p className="-mt-[6px] text-[11.5px] text-sub">
            Accepted format: MP3, WAV or M4A · Max 20 MB
          </p>

          <div className="flex items-center justify-between border-b border-[#EEF0F5] pb-[16px]">
            <div>
              <p className="text-[12.5px] font-semibold text-emphasis">Playback</p>
              <p className="text-[11.5px] text-sub">Loop</p>
            </div>
            <Switch checked={form.loop} onChange={upd("loop")} />
          </div>

          <Field label="Default Volume">
            <div className="flex items-center gap-[12px]">
              <input
                type="range"
                min={0}
                max={100}
                value={form.volume}
                onChange={upd("volume")}
                className="w-full cursor-pointer accent-[#04127F]"
              />
              <span className="shrink-0 rounded-[6px] bg-[#F3F4FB] px-[8px] py-[3px] text-[12px] font-semibold text-body">
                {form.volume}%
              </span>
            </div>
          </Field>

          <div className="flex gap-[12px]">
            <Field label="Fade In" className="flex-1">
              <input
                type="text"
                value={form.fadeIn}
                onChange={upd("fadeIn")}
                className="h-[40px] w-full rounded-[8px] border border-[#E5E7EB] bg-white px-[12px] text-[13.5px] text-body outline-none transition focus:border-[#4338CA]"
              />
            </Field>
            <Field label="Fade Out" className="flex-1">
              <input
                type="text"
                value={form.fadeOut}
                onChange={upd("fadeOut")}
                className="h-[40px] w-full rounded-[8px] border border-[#E5E7EB] bg-white px-[12px] text-[13.5px] text-body outline-none transition focus:border-[#4338CA]"
              />
            </Field>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12.5px] font-semibold text-emphasis">Status</p>
              <p className="text-[11.5px] text-sub">Enabled</p>
            </div>
            <Switch checked={form.enabled} onChange={upd("enabled")} />
          </div>
        </div>

        {/* Drawer footer */}
        <div className="flex items-center gap-[12px] border-t border-[#EEF0F5] bg-white p-[16px]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-[8px] border border-[#E5E7EB] bg-white px-[20px] py-[10px] text-[13px] font-semibold text-body transition hover:bg-[#F3F4FB]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-[8px] bg-[#04127F] px-[20px] py-[10px] text-[13px] font-semibold text-white transition hover:bg-[#0a1c68]"
          >
            Save Changes
          </button>
        </div>
      </aside>
    </>
  );
}

function Field({ label, className = "", children }) {
  return (
    <div className={className}>
      <label className="mb-[6px] block text-[12.5px] font-semibold text-emphasis">
        {label}
      </label>
      {children}
    </div>
  );
}