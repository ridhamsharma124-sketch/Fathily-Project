import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuArrowLeft,
  LuArrowRight,
  LuBookOpen,
  LuChevronDown,
  LuCircleSlash,
  LuCloudUpload,
  LuCross,
  LuSave,
  LuShieldCheck,
  LuSparkles,
  LuStar,
} from "react-icons/lu";
import mysteryCardPreview from "../../../assets/Mystery card preview.png";

/* ==========================================================================
   TOKENS
   ========================================================================== */
const BORDER = "#E2DFFC";
const DEEP_NAVY = "#00007A";
const PAGE_BG = "#F8F8FF";
const UPLOAD_BG = "#E8E9F7";
const GOLD = "#D9A93A";

/* ==========================================================================
   SHARED
   ========================================================================== */
const FIELD =
  "w-full rounded-[6px] border border-[#E2DFFC] bg-white px-[14px] text-[14px] text-[#2A2750] outline-none placeholder:text-[#8B8FA8] focus:border-[#00007A]";

function Label({ children, optional = false }) {
  return (
    <span className="block text-[14px] font-semibold text-[#2A2750]">
      {children}
      {optional ? (
        <span className="font-normal text-[#8B8FA8]"> (optional)</span>
      ) : (
        <span className="text-[#C2185B]"> *</span>
      )}
    </span>
  );
}

function Select({ placeholder }) {
  return (
    <div className="relative w-full">
      <select
        defaultValue=""
        aria-label={placeholder}
        className={`${FIELD} h-[46px] cursor-pointer appearance-none pr-9`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        <option>Option</option>
      </select>
      <LuChevronDown
        size={16}
        className="pointer-events-none absolute top-1/2 right-[14px] -translate-y-1/2 text-[#2A275099]"
      />
    </div>
  );
}

/* segmented control — buttons touch, shared borders */
function Segmented({ options, value, onChange, widthClass = "w-full" }) {
  return (
    <div className={`flex ${widthClass}`}>
      {options.map((opt, i) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`h-[46px] cursor-pointer border border-[#E2DFFC] px-2 text-[14px] first:rounded-l-[6px] last:rounded-r-[6px] ${
              i > 0 ? "-ml-px" : ""
            } ${
              active
                ? "relative z-10 border-[1.5px] border-[#1B1A52] bg-[#E6E8F7] font-medium text-[#1B1A52]"
                : "bg-white font-normal text-[#6B6F8A]"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

const CHECKBOX =
  "flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border-[1.5px] border-[#1B1A52]";

function CheckOption({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex cursor-pointer items-center gap-[9px]"
    >
      <span
        className={`${CHECKBOX} ${
          checked ? "border-[#1B1A52] bg-[#1B1A52] text-white" : "bg-white text-transparent"
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
      <span className="text-[14px] font-normal text-[#2A2750]">{label}</span>
    </button>
  );
}

/* ==========================================================================
   GOLD ORNAMENTS
   ========================================================================== */
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
      <span
        className="h-[9px] w-[9px] rotate-45"
        style={{ background: GOLD }}
      />
      <span className="h-px" style={{ width: 64, background: GOLD }} />
    </div>
  );
}

/* blue watercolor open-book illustration, bleeding off the bottom */
function BookWatercolor() {
  return (
    <svg
      width="300"
      height="190"
      viewBox="0 0 300 190"
      fill="none"
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
    >
      <ellipse cx="66" cy="70" rx="52" ry="22" fill="#CFE0F5" opacity="0.55" />
      <ellipse cx="238" cy="58" rx="46" ry="18" fill="#CFE0F5" opacity="0.45" />
      <ellipse cx="150" cy="150" rx="120" ry="34" fill="#B9D3F1" opacity="0.4" />

      <path
        d="M150 74c-18-16-42-24-72-24H44v92h34c30 0 54 8 72 24 18-16 42-24 72-24h34V50h-34c-30 0-54 8-72 24z"
        fill="#8FB8E4"
      />
      <path
        d="M150 74v92c-18-16-42-24-72-24H44V50h34c30 0 54 8 72 24z"
        fill="#B7D2F0"
      />
      <path
        d="M150 74v92c18-16 42-24 72-24h34V50h-34c-30 0-54 8-72 24z"
        fill="#9CC3EC"
      />
      <path
        d="M150 74v92" stroke="#6E9BD1" strokeWidth="2.5" strokeLinecap="round" />
      <g stroke="#7FA8D8" strokeWidth="2" strokeLinecap="round" opacity="0.65">
        <path d="M62 82h58M62 98h58M62 114h44" />
        <path d="M180 82h58M180 98h58M180 114h44" />
      </g>
    </svg>
  );
}

/* ==========================================================================
   REWARD TILE
   ========================================================================== */
const TILE_ICON = {
  None: LuCircleSlash,
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
      className={`flex h-[100px] flex-1 cursor-pointer flex-col items-center justify-center rounded-[8px] border bg-white ${
        active ? "relative z-10 border-[1.5px] border-[#1B1A52] bg-[#E6E8F7]" : "border-[#E2DFFC]"
      }`}
    >
      <Icon size={28} strokeWidth={1.7} className="text-[#1B1A52]" />
      <span className="mt-[10px] text-[15px] font-semibold text-[#1B1A52]">{label}</span>
    </button>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
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
      className="min-h-screen w-full p-6"
      style={{ background: PAGE_BG, fontFamily: "Inter, sans-serif" }}
    >
      {/* ============ OUTER CARD ============ */}
      <div
        className="rounded-[8px] border bg-white"
        style={{ borderColor: BORDER, padding: 24 }}
      >
        {/* ---- back ---- */}
        <button
          type="button"
          onClick={() => navigate("/admin/mystery-card")}
          aria-label="Back to Mystery Card Dashboard"
          className="mb-[16px] flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-[6px] border border-[#E2DFFC] bg-white text-[#00007A]"
        >
          <LuArrowLeft size={18} strokeWidth={2} />
        </button>

        {/* ---- header ---- */}
        <h1 className="text-[24px] font-bold text-[#2A2750]">Create New Mystery Card</h1>
        <p className="mt-2 text-[15px] text-[#6B6F8A]">
          Fill in the details below to create a new Mystery Card.
        </p>

        {/* ---- two cards ---- */}
        <div className="mt-6 flex items-start" style={{ gap: 18 }}>
          {/* ===== LEFT — form ===== */}
          <div
            className="flex flex-col rounded-[8px] border bg-white"
            style={{
              width: 627,
              height: 1042,
              borderColor: BORDER,
              paddingTop: 21,
              paddingRight: 20,
              paddingBottom: 41,
              paddingLeft: 20,
              gap: 10,
            }}
          >
            <div>
              <Label>Card Title</Label>
              <input
                type="text"
                placeholder="Enter a compelling title"
                className={`${FIELD} mt-[6px] h-[46px]`}
              />
            </div>

            <div>
              <Label>Category</Label>
              <div className="mt-[6px]">
                <Select placeholder="Select category" />
              </div>
            </div>

            <div>
              <Label>Testament</Label>
              <div className="mt-[6px]">
                <Segmented
                  options={["Old Testament", "New Testament", "General"]}
                  value={testament}
                  onChange={setTestament}
                />
              </div>
            </div>

            <div>
              <Label>Eligible Activities</Label>
              <div className="mt-[10px] flex flex-wrap" style={{ gap: 18, rowGap: 14 }}>
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

            <div className="flex" style={{ gap: 16 }}>
              <div className="flex-1">
                <Label optional>Book</Label>
                <div className="mt-[6px]">
                  <Select placeholder="Select book" />
                </div>
              </div>
              <div className="flex-1">
                <Label optional>Chapter</Label>
                <input
                  type="text"
                  placeholder="e.g. 1-17"
                  className={`${FIELD} mt-[6px] h-[46px]`}
                />
              </div>
            </div>

            <div>
              <Label>Card Content</Label>
              <textarea
                placeholder="Write the card content here..."
                className={`${FIELD} mt-[6px] resize-none py-[10px]`}
                style={{ height: 66 }}
              />
            </div>

            <div className="flex" style={{ gap: 16 }}>
              <div className="flex-1">
                <Label>Bible Verse Reference</Label>
                <div className="mt-[6px]">
                  <Select placeholder="e.g. 1 Samuel 17:45" />
                </div>
              </div>
              <div className="flex-1">
                <Label>Bible Verse Text</Label>
                <input
                  type="text"
                  placeholder="Enter the full verse text..."
                  className={`${FIELD} mt-[6px] h-[46px]`}
                />
              </div>
            </div>

            <div>
              <Label>Encouragement Message</Label>
              <textarea
                placeholder="Write an encouraging message..."
                className={`${FIELD} mt-[6px] resize-none py-[10px]`}
                style={{ height: 66 }}
              />
            </div>

            <div className="h-px w-full" style={{ background: "#EEF0F8" }} />

            <div>
              <Label>Encouragement Message</Label>
              <textarea
                placeholder="Write an encouraging message..."
                className={`${FIELD} mt-[6px] resize-none py-[10px]`}
                style={{ height: 66 }}
              />
            </div>

            <div className="flex" style={{ gap: 16 }}>
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

          {/* ===== RIGHT — live preview ===== */}
          <div
            className="rounded-[13px] border bg-white"
            style={{ width: 316, height: 784, borderColor: BORDER, padding: 14 }}
          >
            <h2 className="text-[16px] font-semibold text-[#2A2750]">Live Preview</h2>

            <div
              className="relative mt-[12px] w-full overflow-hidden rounded-[12px] border bg-[#E8F0FB] bg-cover bg-center bg-no-repeat"
              style={{
                height: 730,
                borderColor: "#CFE0F5",
                backgroundImage: `url(${mysteryCardPreview})`,
              }}
            >
              <GoldCorner />
              <GoldCorner flip />

              {/* centered content */}
              <div className="relative z-10 flex flex-col items-center px-[22px] pt-[86px] text-center">
                <div className="relative mb-[26px]">
                  <LuCross
                    size={26}
                    strokeWidth={2.4}
                    className="absolute -top-[18px] left-1/2 -translate-x-1/2 text-[#D9A93A]"
                  />
                  <LuBookOpen size={56} strokeWidth={1.5} className="text-[#2A2750]" />
                </div>

                <p className="text-[20px] font-bold text-[#2A2750]">
                  Your card preview will appear here
                </p>
                <p className="mt-[10px] text-[14px] text-[#6B6F8A]">
                  Add content and details to see how it looks.
                </p>

                <div className="mt-[22px]">
                  <GoldDivider />
                </div>
              </div>

              <BookWatercolor />
            </div>
          </div>
        </div>

        {/* ---- below the two cards ---- */}
        <div className="mt-6">
          {/* reward amount + rarity */}
          <div className="flex items-end" style={{ gap: 28 }}>
            <div style={{ width: "45%" }}>
              <Label optional>Reward Amount</Label>
              <input
                type="text"
                placeholder="e.g. 100"
                className={`${FIELD} mt-[6px] h-[46px]`}
              />
            </div>
            <div className="flex-1">
              <Label optional>Rarity</Label>
              <div className="mt-[6px]">
                <Segmented
                  options={["Common", "Uncommon", "Rare", "Legendary"]}
                  value={rarity}
                  onChange={setRarity}
                />
              </div>
            </div>
          </div>

          {/* card image upload */}
          <div className="mt-6">
            <Label optional>Card Image</Label>
            <div
              className="mt-[6px] flex w-full cursor-pointer items-center justify-center rounded-[6px] border-[1.5px] border-dashed"
              style={{ height: 90, borderColor: DEEP_NAVY, background: UPLOAD_BG }}
              title={uploadedName || undefined}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex items-center" style={{ gap: 14 }}>
                <LuCloudUpload size={36} strokeWidth={1.6} className="text-[#00007A]" />
                <div className="flex flex-col">
                  <span className="text-[18px] font-semibold text-[#00007A]">Upload an image</span>
                  <span className="text-[13px] text-[#6B6F8A]">PNG or JPG, max 5MB</span>
                </div>
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
          </div>

          {/* status */}
          <div className="mt-6">
            <Label optional>Status</Label>
            <div className="mt-[6px]">
              <Segmented
                options={["Draft", "Active", "Unpublished"]}
                value={status}
                onChange={setStatus}
                widthClass="w-[55%]"
              />
            </div>
          </div>

          {/* footer actions */}
          <div className="mt-6 flex justify-end" style={{ gap: 14 }}>
            <button
              type="button"
              className="h-[46px] cursor-pointer rounded-[6px] border border-[#E2DFFC] bg-white px-[28px] text-[14px] font-semibold text-[#00007A]"
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex h-[46px] cursor-pointer items-center rounded-[6px] border border-[#E2DFFC] bg-white px-[28px] text-[14px] font-semibold text-[#00007A]"
              style={{ gap: 9 }}
            >
              <LuSave size={17} strokeWidth={1.8} /> Save draft
            </button>
            <button
              type="button"
              className="flex h-[46px] cursor-pointer items-center rounded-[6px] bg-[#00007A] px-[22px] text-[14px] font-semibold text-white"
              style={{ gap: 9 }}
            >
              <LuArrowRight size={17} strokeWidth={2} /> Publish Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}