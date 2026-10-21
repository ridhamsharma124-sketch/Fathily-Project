import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuArrowLeft,
  LuArrowRight,
  LuBan,
  LuChevronDown,
  LuCross,
  LuShieldCheck,
  LuSparkles,
  LuStar,
} from "react-icons/lu";
import mysteryCardPreview from "../../../assets/Mystery card preview.webp";
import liveBook from "../../../assets/mystery-card/Live Preview book.webp";
import floppyIcon from "../../../assets/mystery-card/icon-floppy.svg";
import bookIcon from "../../../assets/mystery-card/icon-book.svg";

const BORDER = "#E2DFFC"; 
const NAVY = "#001984";
const BTN_NAVY = "#00007A"; 
const TEXT = "#0A0847"; 
const PAGE_BG = "#F8F8FF";
const GOLD = "#D9A93A";
const NAVY_TINT = "rgba(0, 25, 132, 0.10)"; 
const REQUIRED = "#C2185B";


const FIELD =
  "w-full rounded-[7.47px] border border-[#E2DFFC] bg-white pl-[12px] pr-[50px] text-[12px] font-medium text-[#0A0847] outline-none placeholder:text-[#0A0847]/60 focus:border-[#001984]";

function Label({ children, optional = false, bare = false }) {
  return (
    <span className="block text-[12px] font-semibold text-[#0A0847]">
      {children}
      {bare ? null : optional ? (
        <span className="font-normal text-[#0A0847]/60"> (optional)</span>
      ) : (
        <span style={{ color: REQUIRED }}>*</span>
      )}
    </span>
  );
}

function Field({ children, className = "" }) {
  return <div className={`flex flex-col gap-[8px] ${className}`}>{children}</div>;
}

function Select({ placeholder }) {
  return (
    <div className="relative w-full">
      <select
        defaultValue=""
        aria-label={placeholder}
        className={`${FIELD} h-[40px] cursor-pointer appearance-none ${"text-[#0A0847]/60"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        <option className="text-[#0A0847]">Option</option>
      </select>
      <span className="pointer-events-none absolute top-1/2 right-[16px] flex h-[18px] w-[18px] -translate-y-1/2 items-center justify-center">
        <LuChevronDown size={12} strokeWidth={2.2} className="text-[#0A0847]/60" />
      </span>
    </div>
  );
}

function Segmented({ options, value, onChange }) {
  return (
    <div className="flex w-full max-w-[573px]">
      {options.map((opt, i) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`h-[40px] flex-1 cursor-pointer border px-2 text-[12px] font-medium first:rounded-l-[7.47px] last:rounded-r-[7.47px] ${
              i > 0 ? "-ml-px" : ""
            } ${
              active
                ? "relative z-10 border-[#001984] font-semibold text-[#001984]"
                : "border-[#E2DFFC] bg-white text-[#0A0847]/60"
            }`}
            style={active ? { background: NAVY_TINT } : undefined}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

const CHECKBOX =
  "flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border-[1.5px]";

function CheckOption({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex cursor-pointer items-center gap-[12px]"
    >
      <span
        className={`${CHECKBOX} ${
          checked
            ? "border-[#00007A] bg-[#00007A] text-white"
            : "border-[#0A0847]/60 bg-white text-transparent"
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
      <span className="text-[12px] font-semibold text-[#0A0847]/80">{label}</span>
    </button>
  );
}

function UploadCloudIcon({ size = 36, style }) {
  return (
    <svg
      width={size}
      height={(size * 305) / 390}
      viewBox="85 70 390 305"
      fill="none"
      stroke="currentColor"
      strokeWidth="23"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={style}
    >
      <path d="M228 354H178A70 70 0 0 1 178 215L182 192A100 100 0 0 1 382 192V230A62 62 0 0 1 382 354H290A24 24 0 0 1 266 330V205" />
      <path d="M222 260L266 210L312 260" />
    </svg>
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
      style={flip ? { right: 0, transform: "scaleX(-1)" } : { left: 0 }}
      className="absolute top-0"
    >
      <path
        d="M2 44V16C2 8.3 8.3 2 16 2h28"
        stroke={GOLD}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 44V19C8 12.8 12.8 8 19 8h25"
        stroke={GOLD}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path d="M14 14l5 5-5 5" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="34" r="2.5" fill={GOLD} opacity="0.8" />
    </svg>
  );
}

function GoldDivider() {
  return (
    <div className="flex w-full items-center justify-center" style={{ gap: 10 }}>
      <span className="h-px" style={{ width: 64, background: GOLD }} />
      <span className="h-[9px] w-[9px] rotate-45" style={{ background: GOLD }} />
      <span className="h-px" style={{ width: 64, background: GOLD }} />
    </div>
  );
}

const TILE_ICON = {
  None: LuBan,
  "Faith Points": LuStar,
  "AI Credits": LuSparkles,
  Badge: LuShieldCheck,
};

function RewardTile({ label, active, onClick }) {
  const Icon = TILE_ICON[label];
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[85px] w-[134px] shrink-0 cursor-pointer flex-col items-center justify-center gap-[10px] rounded-[7.47px] border ${
        active ? "border-[#001984]" : "border-[#E2DFFC] bg-white"
      }`}
      style={active ? { background: NAVY_TINT } : undefined}
    >
      <Icon
        size={24}
        strokeWidth={1.8}
        style={{ color: NAVY, opacity: active ? 1 : 0.6 }}
      />
      <span className="text-[12px] font-semibold text-[#001984]">{label}</span>
    </button>
  );
}


export default function CreateMysteryCard() {
  const navigate = useNavigate();
  const [testament, setTestament] = useState("Old Testament");
  const [reward, setReward] = useState("None");
  const [rarity, setRarity] = useState("Common");
  const [status, setStatus] = useState("Draft");
  const [activities, setActivities] = useState({
    Quiz: true,
    "Broad Spectrum": true,
    "Word Search": false,
    "Divine Counsel": false,
    "Group Play": false,
    "Pray With Me": false,
  });
  const fileInputRef = useRef(null);
  const [uploadedName, setUploadedName] = useState("");

  const toggleActivity = (k) =>
    setActivities((prev) => ({ ...prev, [k]: !prev[k] }));

  return (
    <div
      className="min-h-screen w-full p-6 font-inter"
      style={{ background: PAGE_BG, fontFamily: "Inter, sans-serif" }}
    >
      <div
        className="relative w-full min-w-0 rounded-[8px] border bg-white p-[24px]"
        style={{ borderColor: BORDER }}
      >
        <button
          type="button"
          onClick={() => navigate("/admin/mystery-card")}
          aria-label="Back to Mystery Card Dashboard"
          className="absolute top-[30px] -left-[37px] flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-full border border-[#E2DFFC] bg-white text-[#001984]"
        >
          <LuArrowLeft size={14} strokeWidth={2.2} />
        </button>

        <h1 className="text-[18px] font-bold text-[#0A0847]">Create New Mystery Card</h1>
        <p className="mt-2 text-[14px] text-[#0A0847]/60">
          Fill in the details below to create a new Mystery Card.
        </p>

        <div className="mt-6 grid grid-cols-[627px_minmax(0,1fr)] items-start gap-[24px]">
          <div
            className="flex min-w-0 flex-col gap-[24px] rounded-[8px] border bg-white pt-[21px] pr-[20px] pb-[41px] pl-[20px]"
            style={{ borderColor: BORDER }}
          >
            <Field>
              <Label>Card Title</Label>
              <input
                type="text"
                placeholder="Enter a compelling title"
                className={`${FIELD} h-[40px]`}
              />
            </Field>

            <Field>
              <Label>Category</Label>
              <Select placeholder="Select category" />
            </Field>

            <Field>
              <Label>Testament</Label>
              <Segmented
                options={["Old Testament", "New Testament", "General"]}
                value={testament}
                onChange={setTestament}
              />
            </Field>

            <Field>
              <Label>Eligible Activities</Label>
              <div className="mt-[4px] flex max-w-[573px] flex-wrap gap-x-[28px] gap-y-[20px]">
                {Object.keys(activities).map((k) => (
                  <CheckOption
                    key={k}
                    label={k}
                    checked={activities[k]}
                    onChange={() => toggleActivity(k)}
                  />
                ))}
              </div>
            </Field>

            <div className="grid grid-cols-[264px_minmax(0,1fr)] gap-[24px]">
              <Field>
                <Label optional>Book</Label>
                <Select placeholder="Select book" />
              </Field>
              <Field>
                <Label optional>Chapter</Label>
                <input
                  type="text"
                  placeholder="e.g. 1–17"
                  className={`${FIELD} h-[40px]`}
                />
              </Field>
            </div>

            <Field>
              <Label>Card Content</Label>
              <textarea
                placeholder="Write the card content here..."
                className={`${FIELD} h-[63px] resize-none py-[10px]`}
              />
            </Field>

            <div className="grid grid-cols-[264px_minmax(0,1fr)] gap-[24px]">
              <Field>
                <Label>Bible Verse Reference</Label>
                <Select placeholder="e.g. 1 Samuel 17:45" />
              </Field>
              <Field>
                <Label>Bible Verse Text</Label>
                <input
                  type="text"
                  placeholder="Enter the full verse text..."
                  className={`${FIELD} h-[40px]`}
                />
              </Field>
            </div>

            <Field>
              <Label bare>Encouragement Message</Label>
              <textarea
                placeholder="Write an encouraging message..."
                className={`${FIELD} h-[63px] resize-none py-[10px]`}
              />
            </Field>

            <div className="h-px w-full" style={{ background: "#EEF0F8" }} />

            <Field>
              <Label bare>Encouragement Message</Label>
              <textarea
                placeholder="Write an encouraging message..."
                className={`${FIELD} h-[63px] resize-none py-[10px]`}
              />
            </Field>

            <div className="flex items-center justify-between">
              {["None", "Faith Points", "AI Credits", "Badge"].map((r) => (
                <RewardTile
                  key={r}
                  label={r}
                  active={reward === r}
                  onClick={() => setReward(r)}
                />
              ))}
            </div>
          </div>

          <div
            className="min-w-0 rounded-[8px] border bg-white p-[14px]"
            style={{ borderColor: BORDER }}
          >
            <p className="text-[14px] font-bold text-[#0A0847]">Live Preview</p>

            <div
              className="relative mt-[12px] h-[532px] w-full overflow-hidden rounded-[12px] border bg-[#EAF0FF] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${mysteryCardPreview})`,
                borderColor: BORDER,
              }}
            >
              <GoldCorner />
              <GoldCorner flip />

              <div className="relative z-10 flex flex-col items-center px-[22px] pt-[86px] text-center">
                <div className="relative mb-[26px]">
                  <LuCross
                    size={26}
                    strokeWidth={2.4}
                    className="absolute -top-[18px] left-1/2 -translate-x-1/2 text-[#D9A93A]"
                  />
                  <img
                    src={bookIcon}
                    alt=""
                    aria-hidden
                    className="h-[56px] w-[60px] object-contain"
                  />
                </div>

                <p className="text-[22px] leading-[1.2] font-bold text-[#0A0847]/90">
                  Your card preview will appear here
                </p>
                <p className="mt-[14px] text-[14px] font-semibold text-[#0A0847]/60">
                  Add content and details to see how it looks.
                </p>

                <div className="mt-[22px]">
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
        </div>

        <div className="mt-[24px] flex flex-col gap-[24px]">
          <div className="grid grid-cols-[336px_minmax(0,1fr)] gap-[24px]">
            <Field>
              <Label bare>Reward Amount</Label>
              <input
                type="text"
                placeholder="e.g. 100"
                className={`${FIELD} h-[40px]`}
              />
            </Field>
            <Field>
              <Label bare>Rarity</Label>
              <Segmented
                options={["Common", "Uncommon", "Rare", "Legendary"]}
                value={rarity}
                onChange={setRarity}
              />
            </Field>
          </div>

          <Field>
            <Label bare>Card Image</Label>
            <div
              className="flex h-[77px] w-full cursor-pointer items-center justify-center gap-[24px] rounded-[8px] border border-dashed border-[#001984]"
              style={{ borderColor: NAVY, background: NAVY_TINT }}
              title={uploadedName || undefined}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloudIcon size={36} style={{ color: NAVY }} />
              <div className="flex flex-col">
                <span className="text-[16px] leading-[1.2] font-semibold text-[#0A0847]">
                  Upload an image
                </span>
                <span className="text-[12px] leading-[1.2] font-medium text-[#0A0847]/70">
                  PNG or JPG, max 5MB
                </span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setUploadedName(f.name);
                }}
              />
            </div>
          </Field>

          <Field>
            <Label bare>Status</Label>
            <Segmented
              options={["Draft", "Active", "Unpublished"]}
              value={status}
              onChange={setStatus}
            />
          </Field>
        </div>

        <div className="mt-6 flex justify-end gap-[16px]">
          <button
            type="button"
            onClick={() => navigate("/admin/mystery-card")}
            className="h-[42px] w-[96px] cursor-pointer rounded-[8px] border border-[#E2DFFC] bg-white text-[14px] font-semibold text-[#0A0847]/80"
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex h-[42px] w-[118px] cursor-pointer items-center justify-center gap-[8px] rounded-[8px] border border-[#E2DFFC] bg-white text-[14px] font-semibold text-[#0A0847]/80"
          >
            <img
              src={floppyIcon}
              alt=""
              aria-hidden
              draggable={false}
              className="h-[16px] w-[16px] shrink-0 object-contain"
            />
            Save draft
          </button>
          <button
            type="button"
            className="flex h-[42px] w-[190px] cursor-pointer items-center justify-center gap-[8px] rounded-[8px] bg-[#00007A] text-[14px] font-semibold text-white"
          >
            <LuArrowRight size={16} strokeWidth={2} /> Publish Card
          </button>
        </div>
      </div>
    </div>
  );
}