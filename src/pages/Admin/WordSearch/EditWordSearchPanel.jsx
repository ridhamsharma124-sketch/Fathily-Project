import { useEffect, useState } from "react";


const INK = "#0A0847"; 
const NAVY = "#001984"; 
const CLOSE_BLUE = "#0926FD"; 
const GREEN = "#21AC1C"; 
const BUTTON_BORDER = "#E2DFFC"; 
const IMAGE_BORDER = "#EEEEF0"; 

const DETAIL_ROWS = [
  ["Type:", "Hidden Restoration"],
  ["Bible Location:", "Genesis 1"],
  ["Level:", "Level 1"],
  ["Words / Items:", "12 words"],
  ["Image Source:", "Chapter Default"],
  ["Created By:", "Admin User"],
  ["Created:", "May 20, 2025 12:30 AM"],
  ["Updated:", "May 20, 2025 13:32 AM"],
];

const TABS = ["Details", "Activity", "History"];




function CloseCircleIcon({ className = "" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9.6" />
      <path d="M8.4 8.4 15.6 15.6M15.6 8.4 8.4 15.6" />
    </svg>
  );
}


function ImageFrameIcon({ className = "" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="1" y="1" width="16" height="16" rx="3.4" />
      <circle cx="11.6" cy="5.8" r="1.5" />
      <path d="M1.8 14 6.4 9.2 10 12.6 12.9 10 16.3 13.8" />
    </svg>
  );
}


function ImageSparkleIcon({ className = "" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.4 3.3H5.3A2.8 2.8 0 0 0 2.5 6.1v7.1A2.8 2.8 0 0 0 5.3 16h7.3a2.8 2.8 0 0 0 2.8-2.8V9" />
        <circle cx="10.6" cy="7.6" r="1.25" />
        <path d="M2.7 12.9c2-1.9 5-2.2 7.2-.5 1 .8 1.9.9 2.9.3" />
        <path d="M10.6 14.6 12 13.1l3.3 2.4" />
      </g>
      <path
        d="M14.7 .8c.2 1.7 1.2 2.7 2.9 2.9-1.7.2-2.7 1.2-2.9 2.9-.2-1.7-1.2-2.7-2.9-2.9 1.7-.2 2.7-1.2 2.9-2.9Z"
        fill="currentColor"
      />
    </svg>
  );
}


function StatusPill({ children, published = true }) {
  return (
    <span
      className={`inline-flex h-[25px] min-w-[71px] shrink-0 items-center justify-center rounded-[8px] border px-[9px] text-[12px] leading-[normal] font-medium ${
        published
          ? "border-[#DAF3C8] bg-[#21AC1C]/10 text-[#21AC1C]"
          : "border-[#0A0847]/10 bg-[#0A0847]/5 text-[#0A0847]/60"
      }`}
    >
      {children}
    </span>
  );
}


export default function EditWordSearchPanel({ row, onClose }) {
  const [tab, setTab] = useState("Details");
  const [open, setOpen] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setOpen(true));
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-[4px] transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden
      />

      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Edit Word Search"
          className={`pointer-events-auto flex max-h-[94vh] w-[308px] max-w-full flex-col overflow-hidden rounded-[8px] border bg-white pt-[16px] pl-[13px] font-inter shadow-[0_24px_48px_rgba(0,0,0,0.25)] transition-all duration-200 ${
            open ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          style={{ borderColor: BUTTON_BORDER }}
        >
          <div className="w-[269px] max-w-full shrink-0">
            <div className="flex h-[24px] items-start justify-between">
              <h2 className="text-[14px] leading-[15px] font-semibold" style={{ color: INK }}>
                Edit Word Search
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mt-[2px] flex h-[24px] w-[24px] shrink-0 cursor-pointer items-center justify-center transition-opacity hover:opacity-70"
                style={{ color: CLOSE_BLUE }}
              >
                <CloseCircleIcon />
              </button>
            </div>

            <div className="mt-[28px] flex items-start gap-[12px]">
              <img
                src={row.image}
                alt=""
                className="h-[79px] w-[80px] shrink-0 rounded-[6px] object-cover object-top"
              />
              <div className="min-w-0">
                <p className="text-[16px] leading-[20px] font-semibold text-[#0A0847]/80">
                  {row.topic}
                </p>
                <p className="mt-[8px] text-[12px] leading-[15px] font-semibold text-[#0A0847]/60">
                  {row.location} &bull; {row.level}
                </p>
                <div className="mt-[10px]">
                  <StatusPill>{row.status}</StatusPill>
                </div>
              </div>
            </div>

            <div className="relative mt-[24px] flex h-[31px] items-start justify-between border-b border-[#0A0847]/10">
              {TABS.map((t, i) => {
                const active = tab === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={`relative flex h-full cursor-pointer items-start justify-center pt-[6px] text-center text-[12px] leading-[normal] font-semibold ${
                      i === 0 ? "px-[23px]" : i === TABS.length - 1 ? "mr-[6px]" : ""
                    } ${active ? "" : "text-[#0A0847]/60"}`}
                    style={active ? { color: NAVY } : undefined}
                  >
                    {t}
                    {active && (
                      <span
                        className="absolute -bottom-px left-0 h-[2px] w-full"
                        style={{ backgroundColor: NAVY }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {tab === "Details" ? (
            <div className="min-h-0 flex-1 overflow-y-auto pt-[16px] pr-[2px]">
              <div className="w-[269px] max-w-full">
                <div className="flex flex-col gap-[8px]">
                  <h3 className="text-[14px] leading-[normal] font-semibold text-[#0A0847]/80">
                    Puzzle Image
                  </h3>
                  <img
                    src={row.image}
                    alt={`${row.topic} puzzle image`}
                    className="h-[135px] w-[269px] max-w-full rounded-[8px] border object-cover object-top"
                    style={{ borderColor: IMAGE_BORDER }}
                  />
                </div>

                <div className="mt-[24px] flex flex-col gap-[12px]">
                  <button
                    type="button"
                    className="flex h-[43px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[8px] border bg-[#FDFCFF] text-[14px] leading-[normal] font-semibold text-[#0A0847]/80 transition-colors hover:bg-[#F3F2FD]"
                    style={{ borderColor: BUTTON_BORDER }}
                  >
                    <ImageFrameIcon className="text-[#0A0847]" />
                    Replace Image
                  </button>
                  <button
                    type="button"
                    className="flex h-[43px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[8px] border text-[14px] leading-[normal] font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: NAVY, borderColor: BUTTON_BORDER }}
                  >
                    <ImageSparkleIcon />
                    Generate AI Image
                  </button>
                </div>

                <div className="mt-[24px] h-px w-full bg-[#0A0847]/10" />

                <dl className="mt-[8px] flex flex-col">
                  {DETAIL_ROWS.map(([label, value]) => (
                    <div key={label} className="grid h-[30px] grid-cols-[109px_1fr] items-center">
                      <dt className="text-[12px] leading-[normal] font-semibold text-[#0A0847]/80">
                        {label}
                      </dt>
                      <dd className="text-[12px] leading-[normal] font-medium text-[#0A0847]/60">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-[16px] h-px w-full bg-[#0A0847]/10" />

                <div className="mt-[16px] flex items-center justify-between gap-4">
                  <span className="text-[14px] leading-[normal] font-semibold text-[#0A0847]/60">
                    Status
                  </span>
                  <div className="flex items-center gap-[2px]">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isPublished}
                      aria-label="Toggle status"
                      onClick={() => setIsPublished(!isPublished)}
                      className="relative h-[13px] w-[22px] shrink-0 cursor-pointer rounded-full transition-colors"
                      style={{ backgroundColor: isPublished ? GREEN : "#D9DCEA" }}
                    >
                      <span
                        className="absolute top-[1px] h-[11px] w-[11px] rounded-full bg-white transition-all"
                        style={{ left: isPublished ? 10.5 : 0.5 }}
                      />
                    </button>
                    <StatusPill published={isPublished}>
                      {isPublished ? "Published" : "Unpublished"}
                    </StatusPill>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="w-[269px] max-w-full py-10 text-center text-[12px] font-medium text-[#0A0847]/60">
              No {tab.toLowerCase()} to show.
            </p>
          )}

          <div className="w-[269px] max-w-full shrink-0 pt-[16px] pb-[24px]">
            <button
              type="button"
              onClick={onClose}
              className="flex h-[43px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[8px] border text-[14px] leading-[normal] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: NAVY, borderColor: BUTTON_BORDER }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 