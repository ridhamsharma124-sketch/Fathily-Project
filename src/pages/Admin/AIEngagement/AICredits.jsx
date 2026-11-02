import { useState } from "react";
import biblicalHistoryImage from "../../../assets/Biblical History.webp";
import IconBadge from "../../../components/shared/IconBadge";
import { PiCaretRight, PiPlus, PiStar, PiX } from "react-icons/pi";

const inputCls =
  "h-[40px] w-full min-w-0 rounded-[8px] border border-edge-input bg-white px-[14px] text-[13px] font-semibold text-ink-body outline-none transition placeholder:text-ink-muted focus:border-ink focus:ring-2 focus:ring-ink/10";
const taCls =
  "w-full min-w-0 resize-none rounded-[8px] border border-edge-input bg-white px-[14px] py-[12px] text-[13px] font-medium leading-[1.5] text-ink-body outline-none transition placeholder:text-ink-muted focus:border-ink focus:ring-2 focus:ring-ink/10";
const introTextCls =
  "block h-[79px] w-full min-w-0 resize-none rounded-[7.47px] border border-edge-input bg-white px-[12px] py-[10px] font-[Inter] text-[12px] font-medium leading-[1.4] text-ink-body outline-none transition placeholder:text-ink-muted focus:border-ink focus:ring-2 focus:ring-ink/10";
const labelCls = "mb-[6px] block text-[12px] font-semibold text-ink-body";
const headingCls = "block text-[14px] font-bold leading-[1.25] text-ink sm:text-[16px]";
const groupHeadingCls =
  "mb-[10px] block text-[14px] font-bold leading-[1.25] text-ink sm:text-[16px]";
const formCardCls =
  "flex h-full min-w-0 flex-col rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] sm:p-[16px]";

function Field({ label, htmlFor, heading = false, labelClassName, children }) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={htmlFor}
        className={labelClassName || (heading ? headingCls : labelCls)}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function FormCard({ children }) {
  return <section className={formCardCls}>{children}</section>;
}

function DragHandle() {
  return (
    <span
      aria-hidden="true"
      className="grid h-[15.2px] w-[9.2px] shrink-0 cursor-grab grid-cols-2 gap-x-[3.2px] gap-y-[3.1px]"
    >
      {Array.from({ length: 6 }).map((_, dotIndex) => (
        <span key={dotIndex} className="h-[3px] w-[3px] rounded-full bg-drag" />
      ))}
    </span>
  );
}

function DraggableList({
  items,
  setItems,
  placeholder,
  addLabel = "Add Item",
  inputIdPrefix = "credits",
}) {
  const update = (index, value) =>
    setItems((previous) =>
      previous.map((item, itemIndex) => (itemIndex === index ? value : item)),
    );
  const remove = (index) =>
    setItems((previous) => previous.filter((_, itemIndex) => itemIndex !== index));
  const add = () => setItems((previous) => [...previous, ""]);

  return (
    <div className="mt-[14px] min-w-0">
      <div className="space-y-[16px]">
        {items.map((item, index) => (
          <div key={index} className="flex min-w-0 items-center gap-[10px]">
            <DragHandle />
            <div className="flex h-[43px] min-w-0 flex-1 items-center rounded-[5px] border border-edge-row bg-white px-[12px] sm:px-[14px]">
              <input
                id={`${inputIdPrefix}-${index}`}
                value={item}
                onChange={(event) => update(index, event.target.value)}
                placeholder={placeholder}
                className="min-w-0 flex-1 bg-transparent text-[13px] font-semibold text-ink-body outline-none placeholder:text-ink-muted focus:ring-0"
              />
              <button
                type="button"
                aria-label="Remove item"
                onClick={() => remove(index)}
                className="shrink-0 cursor-pointer text-remove transition hover:text-[#EF4444]"
              >
                <PiX size={16} weight="bold" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-[14px] flex cursor-pointer items-center gap-[6px] rounded-[8px] border border-edge-input bg-action-soft px-[14px] py-[8px] text-[13px] font-semibold text-ink transition hover:bg-[#E7E9F9]"
      >
        <PiPlus size={18} />
        {addLabel}
      </button>
    </div>
  );
}

function ConversionRow({ prefix, numberValue, inputId, unit }) {
  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-[10px] gap-y-[8px] sm:grid-cols-[minmax(0,1fr)_97px_auto]">
      <label htmlFor={inputId} className="min-w-0 text-[13px] font-medium leading-snug text-ink-body">
        {prefix}
      </label>
      <input
        id={inputId}
        type="number"
        defaultValue={numberValue}
        className="h-[33px] w-[80px] rounded-[8px] border border-edge-input bg-white px-[12px] text-[14px] font-semibold text-ink-body outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10 sm:w-[97px]"
      />
      <span className="col-span-2 text-left text-[12px] font-medium text-ink-muted sm:col-span-1">
        {unit}
      </span>
    </div>
  );
}

const BookCrossIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="4.5" y="2.5" width="14" height="19" rx="2" fill="#8E4116" />
    <rect x="6.5" y="2.5" width="12" height="18" rx="1.5" fill="#A0521E" />
    <rect x="4.5" y="19" width="15" height="2.5" rx="1" fill="#F3E3C3" />
    <rect x="11" y="6" width="2.2" height="7" rx="0.6" fill="#FFC94D" />
    <rect x="8.9" y="8.4" width="6.4" height="2.2" rx="0.6" fill="#FFC94D" />
  </svg>
);

const MagnifierIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="10" cy="10" r="7" fill="#33475B" />
    <circle cx="10" cy="10" r="5.3" fill="#CFE3F3" />
    <path d="M6.6 8.2a3.6 3.6 0 0 1 2-2.3" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M14.2 14.2L18.6 18.6" stroke="#33475B" strokeWidth="3.2" strokeLinecap="round" />
    <path d="M16.6 16.6L20.6 20.6" stroke="#FF9F1C" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M18.4 18.8L19.6 20" stroke="#FFD27A" strokeWidth="0.8" strokeLinecap="round" />
  </svg>
);

const GroupPersonIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="7.8" r="4" fill="#3B82F6" />
    <path d="M1.6 21a7.4 6.6 0 0 1 14.8 0z" fill="#3B82F6" />
    <circle cx="17" cy="8.4" r="3.4" fill="#B6CBF8" />
    <path d="M15.4 13.6a5.8 5.2 0 0 1 7.4 4.6v2.8h-5.2z" fill="#B6CBF8" />
  </svg>
);

const CalendarGridIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2.6" y="5" width="18.8" height="16.4" rx="2.6" fill="#FFFFFF" />
    <path d="M2.6 7.6a2.6 2.6 0 0 1 2.6-2.6h13.6a2.6 2.6 0 0 1 2.6 2.6V9H2.6z" fill="#2196F3" />
    <rect x="6.4" y="2" width="2.2" height="5" rx="1.1" fill="#1976D2" />
    <rect x="15.4" y="2" width="2.2" height="5" rx="1.1" fill="#1976D2" />
    <g fill="#2196F3">
      <rect x="5.6" y="11.2" width="3" height="2.4" rx="0.5" />
      <rect x="10.5" y="11.2" width="3" height="2.4" rx="0.5" />
      <rect x="15.4" y="11.2" width="3" height="2.4" rx="0.5" />
    </g>
    <g fill="#90CAF9">
      <rect x="5.6" y="15.6" width="3" height="2.4" rx="0.5" />
      <rect x="10.5" y="15.6" width="3" height="2.4" rx="0.5" />
    </g>
  </svg>
);

const JourneyLeafIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2.6l2.2 3.3 3.4-1.1-.9 3.4 3.1 1.6-2.7 2.2 1.4 3.2-3.5-.4L14.3 17l-2.3-2.4-2.3 2.4-.8-3.9-3.5.4 1.4-3.2-2.7-2.2 3.1-1.6-.9-3.4 3.4 1.1z" fill="#EA6A22" />
    <path d="M12 6.4V19.2" stroke="#8C3A10" strokeWidth="0.9" strokeLinecap="round" />
  </svg>
);

const QuestionIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.2 9.2a2.8 2.8 0 1 1 3.9 2.6c-.7.3-1.1.9-1.1 1.7v.5" />
    <circle cx="12" cy="17.6" r="0.6" fill={color} />
  </svg>
);

const LockIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke={color} strokeWidth="2.2" />
    <rect x="5" y="11" width="14" height="10" rx="2" fill={color} />
    <path d="M12 14.5v2.5" stroke="#EEF0FF" strokeWidth="1.8" />
  </svg>
);

const EARN_BADGE_BACKGROUND = "#EEF0FF";

const EARN_LIST = [
  { label: "Complete Bible Quizzes", Icon: BookCrossIcon, color: "#F59E0B", backgroundColor: EARN_BADGE_BACKGROUND },
  { label: "Study Memory Verse", Icon: BookCrossIcon, color: "#7C3AED", backgroundColor: EARN_BADGE_BACKGROUND },
  { label: "Play Word Search", Icon: MagnifierIcon, color: "#4F46E5", backgroundColor: EARN_BADGE_BACKGROUND },
  { label: "Join Group Play", Icon: GroupPersonIcon, color: "#EC4899", backgroundColor: EARN_BADGE_BACKGROUND },
  { label: "Finish Daily Activities", Icon: CalendarGridIcon, color: "#F97316", backgroundColor: EARN_BADGE_BACKGROUND },
  { label: "Go on Seasonal Journey", Icon: JourneyLeafIcon, color: "#22C55E", backgroundColor: EARN_BADGE_BACKGROUND },
];

const PACKS = [
  { name: "Starter Pack", credits: "100 Credits", price: "$0.99", popular: false },
  { name: "Popular Pack", credits: "500 Credits", price: "$4.99", popular: true },
  { name: "Best Value", credits: "1,300 Credits", price: "$9.99", popular: false },
  { name: "Mega Pack", credits: "2,500 Credits", price: "$19.99", popular: false },
];

const INFO_DESCRIPTIONS = [
  "Earn points and convert them into AI Credits.",
  "Each question you ask uses 1 AI Credit.",
  "Your conversations are private and protected.",
];

const INFO_ICONS = [
  { Icon: PiStar, backgroundColor: "#FDF6E3", color: "#F5C518" },
  { Icon: QuestionIcon, backgroundColor: "#EEF0FF", color: "#3231DB" },
  { Icon: LockIcon, backgroundColor: "#EEF0FF", color: "#3231DB" },
];

function LivePreview({ intro, items }) {
  return (
    <div
      className="flex h-full w-full min-w-0 flex-col gap-[10px] overflow-hidden rounded-[7.5px] border border-[#E5E7EB] bg-[#F7F8FC] p-4 sm:p-[24px]"
      style={{ borderWidth: "0.75px" }}
    >
      <div
        className="-mx-4 -mt-4 flex min-w-0 flex-col gap-[10px] rounded-t-[7.5px] px-4 pt-4 sm:-mx-[24px] sm:-mt-[24px] sm:px-[24px] sm:pt-[24px]"
        style={{ backgroundImage: "linear-gradient(180deg, #F3F0FF 0%, #FCFBFF 100%)" }}
      >
        <div className="mx-auto w-full max-w-[482px]" style={{ aspectRatio: "482 / 296" }}>
          <img
            src={biblicalHistoryImage}
            alt="Biblical History"
            className="block h-full w-full object-cover object-center mix-blend-multiply"
          />
        </div>

        <h3 className="text-center text-[18px] font-bold text-[#1A1B4B] sm:text-[20px]">
          Today in Biblical History
        </h3>
        <p className="mt-[10px] break-words text-center text-[12px] leading-snug text-[#6B7280] sm:text-[13px]">
          {intro}
        </p>
      </div>

      <div className="mt-[10px] flex min-w-0 flex-col gap-[10px]">
        {(items.length ? items : [""]).map((item, index) => {
          const meta = INFO_ICONS[index] || INFO_ICONS[0];
          const { Icon } = meta;
          return (
            <div
              key={index}
              className="flex min-h-[96px] w-full min-w-0 items-center gap-[10px] rounded-[8px] border border-[#E2DFFC] bg-white px-[12px] sm:h-[118px] sm:px-[20px]"
              style={{ borderWidth: "0.75px" }}
            >
              <span
                className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[10px] sm:h-[56px] sm:w-[56px]"
                style={{ backgroundColor: meta.backgroundColor }}
              >
                <Icon size={24} color={meta.color} />
              </span>
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-[4px]">
                <p className="line-clamp-2 break-words text-[13px] font-bold leading-[1.3] text-[#1E1B4B] sm:text-[14px]">
                  {item || "(empty item)"}
                </p>
                <p className="line-clamp-2 break-words text-[12px] font-normal leading-[1.4] text-[#6B7280] sm:text-[13px]">
                  {INFO_DESCRIPTIONS[index] || INFO_DESCRIPTIONS[0]}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <h4 className="mt-[10px] text-[14px] font-bold text-[#1A1B4B] sm:text-[15px]">
        How to Earn More Points
      </h4>
      <div aria-hidden="true" className="h-px w-full bg-[#E5E7EB]" />
      <div className="flex flex-1 flex-col gap-[12px] sm:gap-[16px]">
        {EARN_LIST.map(({ label, Icon, color, backgroundColor }) => (
          <div
            key={label}
            className="flex min-h-[64px] w-full min-w-0 flex-1 items-center gap-[12px] rounded-[7.5px] border border-[#E5E7EB] bg-white px-[12px] py-[8px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] sm:min-h-[77px] sm:py-[10px]"
          >
            <IconBadge Icon={Icon} color={color} backgroundColor={backgroundColor} />
            <p className="min-w-0 flex-1 truncate text-[13px] font-semibold text-[#1A1B4B]">
              {label}
            </p>
            <PiCaretRight size={14} className="shrink-0 text-[#9CA3AF]" />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="w-full cursor-pointer rounded-[10px] bg-[#16235C] px-[16px] py-[12px] text-[13px] font-bold text-white transition hover:bg-[#1E2A5E]"
      >
        Go Earn Points
      </button>
    </div>
  );
}

function CreditPacksPreview({ onManage }) {
  return (
    <div className="min-w-0 rounded-[12px] border border-[#E5E7EB] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] sm:p-[20px]">
      <div className="flex flex-wrap items-center justify-between gap-[12px]">
        <h2 className="text-[15px] font-bold text-[#1A1B4B] sm:text-[16px]">
          AI Credit Packs &amp; Bonuses (Admin View)
        </h2>
        <button
          type="button"
          onClick={onManage}
          className="cursor-pointer rounded-[8px] border border-[#E5E7EB] bg-white px-[16px] py-[8px] text-[13px] font-semibold text-[#1E1B4B] transition hover:bg-[#1E1B4B]/5"
        >
          Manage
        </button>
      </div>

      <div className="mt-[16px] grid grid-cols-1 gap-[12px] min-[420px]:grid-cols-2 sm:mt-[20px] sm:gap-[16px] xl:grid-cols-4">
        {PACKS.map((pack) => (
          <div
            key={pack.name}
            className={`relative min-w-0 rounded-[10px] p-[14px] text-center shadow-[0_1px_3px_rgba(15,23,42,0.04)] sm:p-[16px] ${
              pack.popular
                ? "border-2 border-[#F5C518] bg-[#FFFDF5]"
                : "border border-[#E5E7EB] bg-white"
            }`}
          >
            {pack.popular && (
              <span className="absolute -top-[11px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#F5C518] px-[12px] py-[3px] text-[11px] font-bold text-white shadow-sm">
                Popular
              </span>
            )}
            <p className="text-[12px] font-medium text-[#6B7280]">{pack.name}</p>
            <p
              className={`mt-[8px] break-words text-[15px] font-bold sm:text-[16px] ${
                pack.popular ? "text-[#F5C518]" : "text-[#1A1B4B]"
              }`}
            >
              {pack.credits}
            </p>
            <p className="mt-[6px] text-[12px] font-semibold text-[#6B7280]">{pack.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AICredits() {
  const [tab, setTab] = useState("Configuration");
  const [title, setTitle] = useState("About AI Credits");
  const [intro, setIntro] = useState(
    "AI Credits power smart and meaningful answers. Use your credits to ask questions and grow in faith.",
  );
  const [cardDesc, setCardDesc] = useState("See what happened on this day in Scripture.");
  const [infoItems, setInfoItems] = useState([
    "1 AI Credit = 50 Points",
    "1 AI Question = 1 AI Credit",
    "Private & Secure",
  ]);
  const [privacyNote, setPrivacyNote] = useState(
    "AI Credits power smart and meaningful answers. Use your credits to ask questions and grow in faith.",
  );
  const [earnItems, setEarnItems] = useState([
    "Complete Bible Quizzes",
    "Study Memory Verse",
    "Play Word Search",
    "Join Group Play",
    "Finish Daily Activities",
    "Go on Seasonal Journey",
  ]);

  return (
    <div className="min-h-screen min-w-0 space-y-[16px] overflow-x-hidden bg-[#F7F8FC] p-4 font-[Inter] text-[#1A1B4B] sm:p-6">
      <div className="min-w-0">
        <h1 className="text-[20px] font-bold leading-tight text-[#1A1B4B] sm:text-[22px]">
          AI Credits &amp; Info Page Manager
        </h1>
        <p className="mt-[4px] text-[14px] text-[#6B7280] sm:text-[16px]">
          Configure the user-facing AI credit education and rewards.
        </p>
      </div>

      <div className="flex items-center gap-[4px] overflow-x-auto border-b border-[#E5E7EB]">
        {["Configuration", "Credit Packs & Bonuses"].map((tabName) => (
          <button
            key={tabName}
            type="button"
            onClick={() => setTab(tabName)}
            className={`-mb-px flex h-[41px] min-w-[150px] shrink-0 cursor-pointer items-center justify-center whitespace-nowrap border-b-2 px-3 text-[13px] transition sm:w-[196px] ${
              tab === tabName
                ? "rounded-t-[8px] border-transparent bg-[#E4E7F4] font-semibold text-[#1E1B4B]"
                : "border-transparent font-medium text-[#6B7280] hover:text-[#1E1B4B]"
            }`}
          >
            {tabName}
          </button>
        ))}
      </div>

      {tab === "Configuration" ? (
        <>
          {/* Stacked below xl (1280px) so the sidebar layout never gets squeezed */}
          <div className="grid min-w-0 grid-cols-1 gap-[16px] xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] xl:items-stretch">
            <FormCard>
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-[16px]">
                <Field label="About AI Credits Title" htmlFor="credits-title">
                  <input
                    id="credits-title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    className={inputCls}
                  />
                </Field>

                <Field label="Intro Text" htmlFor="credits-intro">
                  <textarea
                    id="credits-intro"
                    value={intro}
                    onChange={(event) => setIntro(event.target.value)}
                    className={introTextCls}
                  />
                </Field>

                <Field label="Card Description:" htmlFor="credits-card-desc">
                  <textarea
                    id="credits-card-desc"
                    value={cardDesc}
                    onChange={(event) => setCardDesc(event.target.value)}
                    rows={2}
                    className={taCls}
                  />
                </Field>

                <Field label="Info Items (Highlights)" heading>
                  <DraggableList
                    items={infoItems}
                    setItems={setInfoItems}
                    placeholder="Enter info item..."
                    inputIdPrefix="credits-info"
                  />
                </Field>

                <div className="min-w-0 space-y-[10px]">
                  <Field label="Points to Credit Conversion" labelClassName={groupHeadingCls}>
                    <ConversionRow
                      prefix="1 AI Credit="
                      numberValue={50}
                      inputId="credits-conversion-points"
                      unit="Points"
                    />
                  </Field>

                  <Field label="AI Response Cost" labelClassName={groupHeadingCls}>
                    <ConversionRow
                      prefix="1 AI Question Uses"
                      numberValue={1}
                      inputId="credits-conversion-question"
                      unit="Credits"
                    />
                  </Field>

                  <Field label="AI Session Cost (Optional)" labelClassName={groupHeadingCls}>
                    <ConversionRow
                      prefix="1 Session (Continuous Chat) Uses"
                      numberValue={2}
                      inputId="credits-conversion-session"
                      unit="Credits"
                    />
                  </Field>
                </div>

                <Field label="Privacy Note" htmlFor="credits-privacy">
                  <textarea
                    id="credits-privacy"
                    value={privacyNote}
                    onChange={(event) => setPrivacyNote(event.target.value)}
                    className={`${taCls} h-[79px]`}
                  />
                </Field>

                <Field label="How to Earn More Points" heading>
                  <DraggableList
                    items={earnItems}
                    setItems={setEarnItems}
                    placeholder="Enter activity..."
                    addLabel="Add Activity"
                    inputIdPrefix="credits-earn"
                  />
                </Field>
              </div>
            </FormCard>

            <div className="min-w-0">
              <LivePreview intro={intro} items={infoItems} />
            </div>
          </div>

          <CreditPacksPreview onManage={() => setTab("Credit Packs & Bonuses")} />
        </>
      ) : (
        <CreditPacksPreview onManage={() => setTab("Credit Packs & Bonuses")} />
      )}
    </div>
  );
}