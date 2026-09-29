import { useEffect, useRef, useState } from "react";
import {
  LuCircleX,
  LuChevronDown,
  LuPaperclip,
  LuSend,
  LuCheck,
  LuImage,
  LuUser,
} from "react-icons/lu";

const ASSIGNEES = ["Maya", "Unassigned", "Peter", "Alex"];
const STATUSES = ["Open", "Waiting", "Resolved"];

/* ==========================================================================
   TICKET DETAIL — centered modal dialog (~700px)
   ========================================================================== */
export default function TicketModal({ ticket, onClose }) {
  const dialogRef = useRef(null);

  const [assignee, setAssignee] = useState(ticket.assignee);
  const [status, setStatus] = useState(ticket.status);
  const [reply, setReply] = useState("");
  const [internalNote, setInternalNote] = useState(ticket.note);
  const [noteOn, setNoteOn] = useState(true);

  const agentInitials =
    ticket.agent.replace(" (Admin)", "").charAt(0).toUpperCase() + "A";

  /* lock page scroll while the dialog is open */
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  /* focus trap + return focus to whatever opened the dialog */
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const node = dialogRef.current;

    const focusables = () =>
      Array.from(
        node?.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    node?.addEventListener("keydown", onKeyDown);
    return () => {
      node?.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose]);

  const selectClass =
    "h-[38px] w-full cursor-pointer appearance-none rounded-lg border border-[#E5E7EB] bg-white pl-3 pr-8 text-[13px] text-[#111C44] outline-none transition focus:border-[#0A1172]";

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        className="anim-overlay-in absolute inset-0 backdrop-blur-[3px]"
        style={{ background: "var(--support-overlay)" }}
        onClick={onClose}
        aria-hidden
      />

      {/* dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ticket.subject}
        className="anim-dialog-in relative flex max-h-[85vh] w-[calc(100%-2rem)] max-w-[700px] flex-col overflow-hidden rounded-2xl bg-white font-[Inter]"
        style={{ boxShadow: "var(--support-shadow)" }}
      >
        {/* header — fixed */}
        <div className="flex items-start justify-between gap-4 border-b border-[#E5E7EB] px-6 py-4">
          <h2 className="text-[18px] font-bold text-[#111C44]">
            {ticket.subject}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close ticket"
            className="-mr-1 -mt-0.5 flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#0A1172] text-[#0A1172] transition-colors hover:bg-[#F8F9FC]"
          >
            <LuCircleX size={19} strokeWidth={1.5} />
          </button>
        </div>

        {/* body — scrolls internally */}
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-5">
          {/* user block */}
          <div className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${ticket.avatarClass}`}
            >
              {ticket.initials ? (
                ticket.initials
              ) : (
                <LuUser size={18} className="text-white" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-[#111C44]">
                {ticket.name}
              </p>
              <p className="truncate text-[12.5px] text-[#6B7280]">
                {ticket.email}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-[#F0FDF4] px-2.5 py-1 text-[12px] font-semibold text-[#15803D]">
              {ticket.plan}
            </span>
          </div>
          <p className="text-[12px] text-[#6B7280]">{ticket.member}</p>

          {/* message card 1 — customer */}
          <div className="rounded-xl bg-[#EEF0FF] p-3.5">
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${ticket.avatarClass}`}
              >
                {ticket.initials ? (
                  ticket.initials
                ) : (
                  <LuUser size={13} className="text-white" />
                )}
              </span>
              <span className="text-[12.5px] font-semibold text-[#111C44]">
                {ticket.name}
              </span>
              <span className="ml-auto text-[11.5px] text-[#6B7280]">
                {ticket.customerTime}
              </span>
            </div>
            <p className="text-[13px] leading-[1.55] text-[#111C44]">
              {ticket.customerMsg}
            </p>

            {ticket.attachment && (
              <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-[#E5E7EB] bg-white p-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#F8F9FC] text-[#6B7280]">
                  <LuImage size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-medium text-[#111C44]">
                    {ticket.attachment.file}
                  </p>
                  <p className="text-[11.5px] text-[#6B7280]">
                    {ticket.attachment.size}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Download ${ticket.attachment.file}`}
                  className="shrink-0 cursor-pointer rounded-md p-1.5 text-[#111C44] transition-colors hover:bg-[#F8F9FC]"
                >
                  <LuPaperclip size={15} />
                </button>
              </div>
            )}
          </div>

          {/* message card 2 — agent */}
          <div className="rounded-xl bg-[#EEF0FF] p-3.5">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FDE68A] text-[10px] font-bold text-[#92400E]">
                {agentInitials}
              </span>
              <span className="text-[12.5px] font-semibold text-[#111C44]">
                {ticket.agent}
              </span>
              <span className="ml-auto text-[11.5px] text-[#6B7280]">
                {ticket.agentTime}
              </span>
            </div>
            <p className="text-[13px] leading-[1.55] text-[#111C44]">
              {ticket.agentMsg}
            </p>
          </div>

          {/* internal note */}
          <div>
            <label
              htmlFor="internal-note"
              className="mb-[6px] block text-[12.5px] font-semibold text-[#111C44]"
            >
              Internal Note
            </label>
            <div className="flex items-start gap-3">
              <textarea
                id="internal-note"
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                rows={2}
                className="flex-1 resize-none rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-[13px] text-[#111C44] outline-none transition focus:border-[#0A1172]"
              />
              <button
                type="button"
                role="switch"
                aria-checked={noteOn}
                aria-label="Internal Note"
                onClick={() => setNoteOn(!noteOn)}
                className={`relative mt-0.5 h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
                  noteOn ? "bg-[#1D5FBF]" : "bg-[#D1D5DB]"
                }`}
              >
                <span
                  className={`absolute top-[2px] h-4 w-4 rounded-full bg-white transition-all ${
                    noteOn ? "left-[18px]" : "left-[2px]"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* assignee + status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="modal-assignee"
                className="mb-[6px] block text-[12.5px] font-semibold text-[#111C44]"
              >
                Assignee
              </label>
              <div className="relative">
                <select
                  id="modal-assignee"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className={selectClass}
                >
                  {ASSIGNEES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <LuChevronDown
                  size={15}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7280]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="modal-status"
                className="mb-[6px] block text-[12.5px] font-semibold text-[#111C44]"
              >
                Status
              </label>
              <div className="relative">
                <select
                  id="modal-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={selectClass}
                >
                  {STATUSES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <LuChevronDown
                  size={15}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7280]"
                />
              </div>
            </div>
          </div>

          {/* reply */}
          <div>
            <label
              htmlFor="modal-reply"
              className="mb-[6px] block text-[12.5px] font-semibold text-[#111C44]"
            >
              Reply
            </label>
            <textarea
              id="modal-reply"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write a reply..."
              rows={3}
              className="w-full resize-none rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-[13px] text-[#111C44] outline-none transition placeholder:text-[#6B7280] focus:border-[#0A1172]"
            />
          </div>

          {/* actions */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-[42px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0A1172] text-[13.5px] font-semibold text-white transition-colors hover:bg-[#080D5C]"
          >
            <LuSend size={15} />
            Send Reply
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-[42px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#15803D] bg-white text-[13.5px] font-semibold text-[#15803D] transition-colors hover:bg-[#F0FDF4]"
          >
            <LuCheck size={15} />
            Resolve
          </button>
        </div>
      </div>
    </div>
  );
}
