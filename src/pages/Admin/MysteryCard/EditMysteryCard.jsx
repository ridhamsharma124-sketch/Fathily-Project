import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuArrowLeft,
  LuArrowRight,
  LuCalendar,
  LuCircleSlash,
  LuClock,
  LuCross,
  LuEye,
  LuGem,
  LuLock,
  LuShieldCheck,
  LuSparkles,
  LuStar,
  LuTrash2,
} from "react-icons/lu";
import mysteryCardPreview from "../../../assets/Mystery card preview.webp";
import cardBookImg from "../../../assets/Card book img.webp";
import liveBook from "../../../assets/mystery-card/Live Preview book.webp";
import floppyIcon from "../../../assets/mystery-card/icon-floppy.svg";
import bookIcon from "../../../assets/mystery-card/icon-book.svg";

const FIELD =
  "w-full rounded-[7.47px] border border-edge-input bg-white px-[12px] text-[12px] font-medium text-field-navy outline-none placeholder:text-faint-navy focus:border-publish-navy";

function Label({ children, optional = false, bare = false }) {
  return (
    <span className="block text-[12px] leading-[15px] font-semibold text-deep-navy">
      {children}
      {bare ? null : optional ? (
        <span className="font-semibold text-deep-navy"> (optional)</span>
      ) : (
        <span className="text-rose-strong">*</span>
      )}
    </span>
  );
}

function Chevron() {
  return (
    <svg
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill="none"
      aria-hidden
      className="pointer-events-none absolute top-1/2 right-[14px] -translate-y-1/2"
    >
      <path
        d="M1 1l3 3 3-3"
        stroke="#0A0847"
        strokeOpacity="0.6"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Select({ value }) {
  return (
    <div className="relative w-full">
      <select
        defaultValue={value}
        aria-label={value}
        className={`${FIELD} h-[40px] cursor-pointer appearance-none pr-[50px]`}
      >
        <option>{value}</option>
      </select>
      <Chevron />
    </div>
  );
}

function Segmented({ options, value, onChange, widthClass = "w-full", emphasized = [] }) {
  return (
    <div className={`flex ${widthClass}`}>
      {options.map((opt, i) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`flex h-[40px] min-w-0 flex-1 cursor-pointer items-center justify-center border border-edge-input px-1 text-[12px] font-medium first:rounded-l-[8px] last:rounded-r-[8px] ${
              i > 0 ? "-ml-px" : ""
            } ${
              active
                ? "relative z-10 border-action-navy bg-action-navy/10 text-action-navy"
                : emphasized.includes(opt)
                  ? "bg-white text-action-navy"
                  : "bg-white text-grey-navy"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function CheckOption({ label, checked, onChange }) {
  return (
    <button type="button" onClick={onChange} className="flex cursor-pointer items-center gap-[10px]">
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border-[1.5px] border-strong-navy ${
          checked ? "bg-strong-navy text-white" : "bg-white text-transparent"
        }`}
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M1.5 6.2 4.4 9.1 10.5 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-[12px] leading-[15px] font-semibold text-deep-navy">{label}</span>
    </button>
  );
}

function GoldCorner({ flip }) {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      aria-hidden
      className={`absolute top-0 text-ornament ${flip ? "right-0 -scale-x-100" : "left-0"}`}
    >
      <path
        d="M2 44V16C2 8.3 8.3 2 16 2h28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 44V19C8 12.8 12.8 8 19 8h25"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M14 14l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="34" r="2.5" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

function GoldDivider() {
  return (
    <div className="flex w-full items-center justify-center">
      <span className="h-[0.8px] w-[48px] bg-ornament" />
      <span className="h-[10px] w-[10px] rotate-45 bg-ornament" />
      <span className="h-[0.8px] w-[48px] bg-ornament" />
    </div>
  );
}

const TILE_ICON = {
  None: LuCircleSlash,
  "Faith Points": LuStar,
  "AI Credits": LuSparkles,
  Badge: LuShieldCheck,
};

function RewardTile({ label, active, onClick }) {
  const Icon = TILE_ICON[label];
  const filled = label === "Faith Points";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[85px] min-w-0 cursor-pointer flex-col items-center justify-center rounded-[8px] border px-[4px] ${
        active ? "border-action-navy bg-action-navy/10" : "border-edge-input bg-white"
      }`}
    >
      <Icon
        size={27}
        strokeWidth={label === "None" ? 2.5 : 1.7}
        className={filled ? "fill-star text-star" : "fill-none text-brand-navy"}
      />
      <span className="mt-[8px] truncate text-[14px] leading-[19px] font-semibold text-brand-navy sm:text-[16px]">
        {label}
      </span>
    </button>
  );
}

const OVERVIEW = [
  { Glyph: LuClock, label: "Last Updated", value: "May 12, 2025, 10:30 AM" },
  { Glyph: LuEye, label: "Times Shown", value: "1,245" },
  { Glyph: LuStar, label: "Reward Type", value: "Faith Points (100)" },
  { Glyph: LuGem, label: "Rarity", badge: { text: "Rarity", className: "bg-pale-indigo text-indigo-ink" } },
  { Glyph: LuLock, label: "Status", badge: { text: "Active", className: "bg-pale-green text-green-ink" } },
  { Glyph: LuCalendar, label: "Created", value: "Apr 28, 2025" },
];

function OverviewRow({ item }) {
  const { Glyph, label, value, badge } = item;
  return (
    <div className="flex items-center gap-[10px]">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-strong-navy/10">
        <Glyph size={17} strokeWidth={1.7} className="text-strong-navy" />
      </span>
      <div className="min-w-0">
        <p className="text-[14px] leading-[14px] font-semibold text-deep-navy">{label}</p>
        {badge ? (
          <span
            className={`mt-[5px] inline-block rounded-[4px] px-[8px] py-[1px] text-[12px] leading-[16px] font-semibold ${badge.className}`}
          >
            {badge.text}
          </span>
        ) : (
          <p className="mt-[5px] text-[12px] leading-[18px] font-medium text-grey-navy">{value}</p>
        )}
      </div>
    </div>
  );
}


export default function EditMysteryCard() {
  const navigate = useNavigate();

  const [testament, setTestament] = useState("Old Testament");
  const [rewardType, setRewardType] = useState("Faith Points");
  const [rarity, setRarity] = useState("Rare");
  const [status, setStatus] = useState("Active");
  const [activities, setActivities] = useState({
    Quiz: true,
    "Broad Spectrum": true,
    "Word Search": true,
    "Divine Counsel": false,
    "Group Play": true,
    "Pray With Me": false,
  });

  const toggleActivity = (k) => setActivities((prev) => ({ ...prev, [k]: !prev[k] }));

  const [cardImage, setCardImage] = useState(cardBookImg);
  const [cardImageName, setCardImageName] = useState("");
  const cardFileRef = useRef(null);
  const objectUrlRef = useRef(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const handleCardImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setCardImage(url);
    setCardImageName(file.name);
    e.target.value = "";
  };

  const handleCardImageDelete = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setCardImage(null);
    setCardImageName("");
  };

  return (
    <div className="min-h-screen w-full bg-page-canvas p-4 font-inter sm:p-6">
      <div className="rounded-[8px] border border-edge-input bg-white p-4 sm:p-6">
        <button
          type="button"
          onClick={() => navigate("/admin/mystery-card")}
          aria-label="Back to Mystery Card Dashboard"
          className="mb-[16px] flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-[6px] border border-edge-input bg-white text-publish-navy"
        >
          <LuArrowLeft size={18} strokeWidth={2} />
        </button>

        <div>
          <h1 className="text-[22px] font-bold text-deep-navy sm:text-[24px]">Edit Mystery Card</h1>
          <p className="mt-2 text-[14px] leading-[19px] font-medium text-grey-navy sm:text-[16px]">
            Update card details and manage its visibility.
          </p>
        </div>

        {/* Mobile/tablet: single column stack. lg+: form (left) + preview & overview (right). */}
        <div className="mt-6 flex flex-col items-stretch gap-[18px] lg:flex-row lg:items-start">
          <div className="flex min-w-0 flex-col gap-[24px] rounded-[8px] border border-edge-input bg-white p-4 sm:p-5 lg:flex-[627_1_0px] lg:min-h-[1406px] lg:pt-[21px] lg:pr-5 lg:pb-[41px] lg:pl-5">
            <h2 className="text-[16px] leading-[19px] font-semibold text-deep-navy">Card Information</h2>

            <div>
              <Label>Card Title</Label>
              <input type="text" defaultValue="Did You Know?" className={`${FIELD} mt-[8px] h-[40px]`} />
            </div>

            <div>
              <Label>Category</Label>
              <div className="mt-[8px]">
                <Select value="Bible Hero" />
              </div>
            </div>

            <div>
              <Label>Testament</Label>
              <div className="mt-[8px]">
                <Segmented
                  options={["Old Testament", "New Testament", "General"]}
                  value={testament}
                  onChange={setTestament}
                />
              </div>
            </div>

            <div>
              <Label>Eligible Activities</Label>
              <div className="mt-[10px] grid grid-cols-2 gap-x-[16px] gap-y-[14px] sm:flex sm:flex-wrap sm:gap-x-[24px]">
                {Object.keys(activities).map((k) => (
                  <CheckOption
                    key={k}
                    label={k}
                    checked={activities[k]}
                    onChange={() => toggleActivity(k)}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 sm:gap-[24px]">
              <div className="min-w-0">
                <Label optional>Book</Label>
                <div className="mt-[8px]">
                  <Select value="1 Samuel" />
                </div>
              </div>
              <div className="min-w-0">
                <Label optional>Chapter</Label>
                <input type="text" defaultValue="17" className={`${FIELD} mt-[8px] h-[40px]`} />
              </div>
            </div>

            <div>
              <Label>Card Content</Label>
              <textarea
                defaultValue="David was likely a teenager when he fought Goliath."
                className={`${FIELD} mt-[8px] h-[63px] resize-none py-[10px]`}
              />
            </div>

            <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 sm:gap-[24px]">
              <div className="min-w-0">
                <Label>Bible Verse Reference</Label>
                <div className="mt-[8px]">
                  <Select value="1 Samuel 17:45" />
                </div>
              </div>
              <div className="min-w-0">
                <Label>Bible Verse Text</Label>
                <textarea
                  defaultValue="You come to me with a sword and a spear and a javelin, but I come to you in the name of the Lord Almighty."
                  className={`${FIELD} mt-[8px] h-[63px] resize-none py-[10px]`}
                />
              </div>
            </div>

            <div>
              <Label>Encouragement Message</Label>
              <textarea
                defaultValue="Draw closer to God and discover the hidden treasures in His Word."
                className={`${FIELD} mt-[8px] h-[63px] resize-none py-[10px]`}
              />
            </div>

            <div className="h-px w-full bg-lavender-hair" />

            <div>
              <Label optional>Encouragement Message</Label>
              <textarea
                placeholder="Write an encouraging message..."
                className={`${FIELD} mt-[8px] h-[63px] resize-none py-[10px]`}
              />
            </div>

            <div className="grid grid-cols-2 gap-[12px] sm:grid-cols-4 sm:gap-[16px]">
              {["None", "Faith Points", "AI Credits", "Badge"].map((r) => (
                <RewardTile key={r} label={r} active={rewardType === r} onClick={() => setRewardType(r)} />
              ))}
            </div>

            <div className="flex flex-col items-stretch gap-[16px] sm:flex-row sm:items-start">
              <div className="min-w-0 flex-1">
                <Label bare>Reward Amount</Label>
                <input type="text" defaultValue="100" className={`${FIELD} mt-[8px] h-[40px]`} />
              </div>
              <div className="w-full min-w-0 sm:w-[388px] sm:shrink-0">
                <Label bare>Rarity</Label>
                <div className="mt-[8px]">
                  <Segmented
                    options={["Common", "Uncommon", "Rare", "Legendary"]}
                    value={rarity}
                    onChange={setRarity}
                    emphasized={["Common"]}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label bare>Card Image</Label>
              <div className="mt-[8px] flex flex-col gap-[12px] rounded-[7.47px] border border-edge-input bg-lavender p-3 sm:h-[98px] sm:flex-row sm:items-center">
                <div className="flex items-center gap-[16px]">
                  {cardImage ? (
                    <img
                      src={cardImage}
                      alt={cardImageName || "Card image"}
                      className="h-[64px] w-[64px] shrink-0 rounded-[4px] bg-lavender object-cover"
                    />
                  ) : (
                    <div className="h-[64px] w-[64px] shrink-0 rounded-[4px] bg-lavender-slot" />
                  )}

                  <div className="flex min-w-0 flex-col">
                    <button
                      type="button"
                      onClick={() => cardFileRef.current?.click()}
                      className="flex h-[35px] cursor-pointer items-center justify-center gap-[8px] whitespace-nowrap rounded-[8px] border border-action-navy bg-[#FEFEFE] px-[12px] text-[12px] font-semibold text-action-navy sm:w-[161px]"
                    >
                      Change Image
                    </button>
                    <span className="mt-[6px] truncate text-[11px] text-grey-navy">
                      {cardImageName || "PNG or JPG, max 5MB"}
                    </span>
                  </div>
                </div>

                <input
                  ref={cardFileRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={handleCardImageChange}
                />

                <button
                  type="button"
                  aria-label="Delete image"
                  onClick={handleCardImageDelete}
                  className="flex h-[44px] w-full cursor-pointer items-center justify-center rounded-[6px] border border-blush-edge bg-blush sm:ml-auto sm:w-[44px] sm:shrink-0"
                >
                  <LuTrash2 size={17} className="text-rose" />
                </button>
              </div>
            </div>

            <div>
              <Label bare>Status</Label>
              <div className="mt-[8px]">
                <Segmented
                  options={["Active", "Draft", "Unpublished"]}
                  value={status}
                  onChange={setStatus}
                />
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-[18px] lg:flex-[348_1_0px]">
            <div className="rounded-[8px] border border-edge-input bg-white p-[14px] lg:h-[856px]">
              <h2 className="text-[16px] leading-[19px] font-semibold text-deep-navy">Live Preview</h2>

              <div
                className="relative mx-auto mt-[12px] aspect-[348/804] w-full max-w-[420px] overflow-hidden rounded-[12px] border border-lavender-line bg-lavender-deep bg-cover bg-center bg-no-repeat lg:mx-0 lg:aspect-auto lg:h-[804px] lg:max-w-none"
                style={{ backgroundImage: `url(${mysteryCardPreview})` }}
              >
                <GoldCorner />
                <GoldCorner flip />

                <div className="relative z-10 flex flex-col items-center px-[22px] pt-[78px] text-center">
                  <div className="relative mb-[22px]">
                    <LuCross
                      size={26}
                      strokeWidth={2.4}
                      className="absolute -top-[18px] left-1/2 -translate-x-1/2 text-ornament"
                    />
                    <img
                      src={bookIcon}
                      alt=""
                      aria-hidden
                      className="h-[56px] w-[60px] object-contain"
                    />
                  </div>

                  <p className="text-[22px] leading-[27px] font-semibold text-deep-navy">Did You Know?</p>
                  <p className="mt-[10px] max-w-[189px] text-[14px] leading-[17px] font-semibold text-grey-navy">
                    David was likely a teenager when he fought Goliath.
                  </p>

                  <div className="mt-[20px] w-full">
                    <GoldDivider />
                  </div>

                  <p className="mt-[18px] text-[14px] font-bold italic text-deep-navy">
                    1 Samuel 17:45
                  </p>

                  <div className="mt-[20px] w-full">
                    <GoldDivider />
                  </div>
                </div>

                <img
                  src={liveBook}
                  alt=""
                  aria-hidden
                  draggable={false}
                  className="pointer-events-none absolute bottom-[8%] left-1/2 w-[80%] -translate-x-1/2 select-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[10px] rounded-[8px] border border-edge-input bg-white p-5 lg:h-[526px] lg:pt-[22px] lg:pr-[145px] lg:pb-[119px] lg:pl-[19px]">
              <h2 className="text-[16px] leading-[19px] font-semibold text-deep-navy">Card Overview</h2>

              <div className="mt-[6px] grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:flex lg:flex-col">
                {OVERVIEW.map((item) => (
                  <OverviewRow key={item.label} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="h-[44px] w-full cursor-pointer rounded-[6px] border-[1.5px] border-rose-strong bg-white px-10 text-[14px] font-semibold text-rose-strong sm:w-auto"
          >
            Unpublished
          </button>

          <div className="grid w-full grid-cols-2 gap-[12px] sm:flex sm:w-auto sm:items-center sm:gap-[14px]">
            <button
              type="button"
              className="flex h-[44px] cursor-pointer items-center justify-center gap-[9px] rounded-[6px] border border-edge-input bg-white px-3 text-[14px] font-semibold whitespace-nowrap text-strong-navy sm:px-5"
            >
              <img
                src={floppyIcon}
                alt=""
                aria-hidden
                draggable={false}
                className="h-[17px] w-[17px] shrink-0 object-contain"
              />{" "}
              Save Changes
            </button>
            <button
              type="button"
              className="flex h-[44px] cursor-pointer items-center justify-center gap-[9px] rounded-[6px] bg-publish-navy px-3 text-[14px] font-semibold whitespace-nowrap text-white sm:px-10"
            >
              <LuArrowRight size={17} strokeWidth={2} /> Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}