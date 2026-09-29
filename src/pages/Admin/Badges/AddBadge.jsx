import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuChevronDown,
  LuCloudUpload,
  LuSave,
  LuCheck,
} from "react-icons/lu";

/* ==========================================================================
   PRIMITIVES
   ========================================================================== */
const labelClass =
  "mb-[6px] block text-[13px] font-semibold text-[#0A0847]";

const inputClass =
  "h-11 w-full rounded-lg border border-[#E5E4EC] bg-white px-4 text-[13.5px] text-[#0A0847] outline-none transition placeholder:text-[#0A084799] focus:border-[#041581]";

const selectClass =
  "h-11 w-full cursor-pointer appearance-none rounded-lg border border-[#E5E4EC] bg-white pl-4 pr-10 text-[13.5px] text-[#0A0847] outline-none transition focus:border-[#041581]";

const helperClass = "mt-[6px] text-[12px] text-[#0A084799]";

const fieldSelectClass =
  "relative w-full [&>svg]:pointer-events-none";

function FieldSelect({ id, options }) {
  return (
    <div className={fieldSelectClass}>
      <select id={id} className={selectClass}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <LuChevronDown
        size={16}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0A0847CC]"
      />
    </div>
  );
}

function CounterField({ id, placeholder, rows = 3 }) {
  return (
    <div className="relative">
      <textarea
        id={id}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none rounded-lg border border-[#E5E4EC] bg-white px-4 py-3 pr-12 text-[13.5px] text-[#0A0847] outline-none transition placeholder:text-[#0A084799] focus:border-[#041581]"
      />
      <span className="pointer-events-none absolute bottom-2.5 right-3 text-[12px] text-[#0A084799]">
        0/150
      </span>
    </div>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-[#0A55A6]" : "bg-[#D1D5DB]"
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

function Card({ title, children }) {
  return (
    <div className="rounded-xl border border-[#EFEDF8] bg-white">
      <div className="border-b border-[#EFEDF8] px-5 py-4">
        <h2 className="text-[20px] font-bold text-[#0A0847]">{title}</h2>
      </div>
      <div className="space-y-4 p-5">{children}</div>
    </div>
  );
}

/* ==========================================================================
   MEDAL ILLUSTRATION — red circle, gold star, gold scalloped edge
   ========================================================================== */
function Medal() {
  return (
    <svg
      viewBox="0 0 60 60"
      className="h-[60px] w-[60px] shrink-0"
      role="img"
      aria-label="Badge preview"
    >
      {/* gold scalloped edge */}
      <circle
        cx="30"
        cy="30"
        r="25.5"
        fill="#F5C518"
        stroke="#C79A00"
        strokeWidth="0.5"
        strokeDasharray="3 3.4"
      />
      <circle cx="30" cy="30" r="22.5" fill="#F5C518" />
      {/* red disc */}
      <circle cx="30" cy="30" r="18" fill="#E11D48" />
      <circle cx="30" cy="30" r="18" fill="none" stroke="#B0103B" />
      {/* gold star */}
      <path
        d="M30 21.8 32.4 28.1 39.2 28.7 34 33.3 35.5 40 30 36.4 24.5 40 26 33.3 20.8 28.7 27.6 28.1Z"
        fill="#F5C518"
        stroke="#E0A800"
        strokeWidth="0.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SWATCHES = [
  { hex: "#120B41" },
  { hex: "#46B863" },
  { hex: "#8043E6" },
  { hex: "#2973F8" },
  { hex: "#F6A53C" },
  { hex: "#F15D6B" },
  { hex: "#9AA0B4" },
];

/* ==========================================================================
   PAGE 2 — ADD NEW BADGE
   ========================================================================== */
export default function AddBadge() {
  const navigate = useNavigate();
  const [active, setActive] = useState(true);
  const [color, setColor] = useState("#120B41");
  const [badgeImage, setBadgeImage] = useState(null);
  const [badgeImageName, setBadgeImageName] = useState("");
  const badgeImageRef = useRef(null);

  const handleBadgeImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBadgeImage(URL.createObjectURL(file));
      setBadgeImageName(file.name);
    }
    e.target.value = "";
  };

  return (
    <div className="min-h-screen bg-[#F9FAFE] font-[Inter] text-[#0A0847]">
      <div className="mx-auto max-w-[1200px] space-y-6 px-5 py-6">
        {/* header */}
        <div>
<h1 className="text-xl font-bold text-[#0A0847]">Add New Badge</h1>
            <p className="mt-[6px] text-sm text-[#0A084799]">
            Create, edit and manage all badges in the system.
          </p>
        </div>

        {/* two columns */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            <Card title="Badge Information">
              <div>
                <label htmlFor="badge-title" className={labelClass}>
                  Badge Title <span className="text-[#E11D48]">*</span>
                </label>
                <input
                  id="badge-title"
                  type="text"
                  placeholder="Enter badge title"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="badge-description" className={labelClass}>
                  Badge Description <span className="text-[#E11D48]">*</span>
                </label>
                <CounterField
                  id="badge-description"
                  placeholder="Describe what this badge represents"
                  rows={4}
                />
              </div>

              <div>
                <p className="mb-2 text-[16px] font-semibold text-[#0A0847]">
                  Badge Icon <span className="text-[#E11D48]">*</span>
                </p>
                <input
                  ref={badgeImageRef}
                  type="file"
                  accept="image/*"
                  onChange={handleBadgeImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => badgeImageRef.current?.click()}
                  className="relative flex h-[110px] w-full max-w-[334px] cursor-pointer flex-row items-center justify-center gap-3 overflow-hidden rounded-xl border border-dashed border-[#0A0847]/50 bg-[#F5F6FF] transition-colors hover:bg-[#EDEFFF]"
                >
                  {badgeImage ? (
                    <>
                      <img
                        src={badgeImage}
                        alt="Badge icon preview"
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute bottom-2 rounded bg-white/90 px-2 py-1 text-[11px] font-semibold text-[#0A0847CC]">
                        Change Image
                      </span>
                    </>
                  ) : (
                    <>
                      <LuCloudUpload size={40} className="shrink-0 text-[#001984]" />
                      <span className="text-[15px] font-normal text-[#001984]">
                        Upload / Replace Image
                      </span>
                    </>
                  )}
                </button>
                {badgeImageName && (
                  <p className="mt-2 text-[11px] text-[#0A084799]">
                    {badgeImageName}
                  </p>
                )}
                <p className="mt-2 text-[11px] font-light text-[#0A084799]">
                  Recommended size: 1200×628px
                </p>
                <p className="text-[11px] font-light text-[#0A084799]">JPG, PNG or WebP</p>
              </div>

              <div>
                <label htmlFor="badge-tier" className={labelClass}>
                  Tier <span className="text-[#E11D48]">*</span>
                </label>
                <FieldSelect
                  id="badge-tier"
                  options={["Select tier", "Seed", "Sprout", "Tree"]}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#0A0847]">
                  Status
                </span>
                <div className="flex items-center gap-2.5">
                  <Toggle
                    checked={active}
                    onChange={setActive}
                    label="Status"
                  />
                  <span className="text-[14px] text-[#0A0847CC]">Active</span>
                </div>
              </div>
            </Card>

            <Card title="Preview">
              <div className="flex items-center gap-4">
                <Medal />
                <div>
                  <p className="text-[22px] font-bold text-[#0A0847]">
                    Badge Title
                  </p>
                  <p className="mt-1 text-sm text-[#0A084799]">
                    Badge description will appear here.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            <Card title="Requirements">
              <div>
                <label htmlFor="req-type" className={labelClass}>
                  Requirement Type <span className="text-[#E11D48]">*</span>
                </label>
                <FieldSelect
                  id="req-type"
                  options={[
                    "Select requirement type",
                    "Complete quiz",
                    "Prayer streak",
                    "Read chapters",
                    "Invite friends",
                    "Log prayers",
                  ]}
                />
                <p className={helperClass}>
                  Choose how users will earn this badge.
                </p>
              </div>

              <div>
                <label htmlFor="req-details" className={labelClass}>
                  Requirement Details{" "}
                  <span className="text-[#E11D48]">*</span>
                </label>
                <CounterField
                  id="req-details"
                  placeholder="Enter requirement details"
                  rows={4}
                />
              </div>

              <div>
                <label htmlFor="req-target" className={labelClass}>
                  Target Amount <span className="text-[#E11D48]">*</span>
                </label>
                <FieldSelect
                  id="req-target"
                  options={[
                    "Enter target amount",
                    "1 time",
                    "7 times",
                    "30 times",
                    "365 times",
                  ]}
                />
                <p className={helperClass}>
                  Number of times / days / count required to earn this badge.
                </p>
              </div>
            </Card>

            <Card title="Points & Display">
              <div>
                <label htmlFor="points-awarded" className={labelClass}>
                  Points Awarded <span className="text-[#E11D48]">*</span>
                </label>
                <FieldSelect
                  id="points-awarded"
                  options={[
                    "Enter points to award",
                    "50 pts",
                    "100 pts",
                    "250 pts",
                    "500 pts",
                  ]}
                />
                <p className={helperClass}>
                  Points users will receive when they earn this badge
                </p>
              </div>

              <div>
                <label htmlFor="display-order" className={labelClass}>
                  Display Order <span className="text-[#E11D48]">*</span>
                </label>
                <CounterField
                  id="display-order"
                  placeholder="Enter display order"
                  rows={2}
                />
              </div>

              <div>
                <label htmlFor="target-amount-2" className={labelClass}>
                  Target Amount <span className="text-[#E11D48]">*</span>
                </label>
                <FieldSelect
                  id="target-amount-2"
                  options={[
                    "Enter target amount",
                    "1 time",
                    "7 times",
                    "30 times",
                    "365 times",
                  ]}
                />
                <p className={helperClass}>
                  Lower numbers appear first (1, 2, 3...).
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  Badge Color (Optional)
                  <span className="text-[#E11D48]">*</span>
                </label>
                <div className="flex items-center gap-[14px]">
                  {SWATCHES.map((swatch) => {
                    const selected = color === swatch.hex;
                    return (
                      <button
                        key={swatch.hex}
                        type="button"
                        aria-label={`Color ${swatch.hex}`}
                        aria-pressed={selected}
                        onClick={() => setColor(swatch.hex)}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-black/10 transition-transform hover:scale-105"
                        style={{ backgroundColor: swatch.hex }}
                      >
                        {selected && (
                          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white">
                            <LuCheck size={13} className="text-[#001984]" strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* bottom action row */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/badges")}
            className="h-9 w-[135px] cursor-pointer rounded-lg border border-[#E5E4EC] bg-white text-[13px] font-semibold text-[#0A0847] transition-colors hover:bg-[#F9FAFE]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/badges")}
            className="flex h-9 w-[145px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#041581] text-[13px] font-semibold text-white transition-colors hover:bg-[#030D5C]"
          >
            <LuSave size={15} />
            Save Badge
          </button>
        </div>
      </div>
    </div>
  );
}