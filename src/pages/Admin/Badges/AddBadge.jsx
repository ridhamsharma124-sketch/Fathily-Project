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
  "mb-[6px] block text-[13px] font-medium text-[#0A0847]/80";

const inputClass =
  "h-[45px] w-full rounded-lg border border-[#E5E4EC] bg-white pl-3 pr-4 text-[13.5px] text-[#0A0847] outline-none transition placeholder:text-[#0A0847]/80 focus:border-[#041581]";

const selectClass =
  "h-[45px] w-full cursor-pointer appearance-none rounded-lg border border-[#E5E4EC] bg-white pl-3 pr-10 text-[13.5px] text-[#0A0847] outline-none transition focus:border-[#041581]";

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
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0A0847]/80"
      />
    </div>
  );
}

function CounterField({ id, placeholder }) {
  return (
    <div className="relative">
      <textarea
        id={id}
        placeholder={placeholder}
        className="h-[96px] w-full resize-none rounded-lg border border-[#E5E4EC] bg-white px-3 py-3 pr-12 text-[13.5px] text-[#0A0847] outline-none transition placeholder:text-[#0A0847]/80 focus:border-[#041581]"
      />
      <span className="pointer-events-none absolute right-3 bottom-2.5 text-[14px] text-[#0A0847]/80">
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
      className={`relative h-4 w-[26px] shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-[#001984]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`absolute top-[2px] h-3 w-3 rounded-full bg-white transition-all ${
          checked ? "left-[12px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

function Card({ title, children, divider = true }) {
  return (
    <div className="rounded-xl border border-[#EFEDF8] bg-white">
      <div
        className={`px-6 ${
          divider ? "border-b border-[#EFEDF8] py-4" : "pt-6"
        }`}
      >
        <h2 className="text-[16px] font-semibold text-[#0A0847]">{title}</h2>
      </div>
      <div className={`px-6 pb-6 ${divider ? "pt-6" : "pt-4"}`}>
        {children}
      </div>
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
      className="h-[44px] w-[46px] shrink-0"
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
      <div className="w-full px-7 py-6">
        <div className="mx-auto w-full max-w-[1072px] space-y-6">
          {/* header */}
          <div>
            <h1 className="text-[22px] leading-none font-semibold text-[#0A0847]">
              Add New Badge
            </h1>
            <p className="mt-[19px] text-[16px] leading-none text-[#0A0847]/60">
              Create, edit and manage all badges in the system.
            </p>
          </div>

          {/* two columns */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,527px)_minmax(0,1fr)]">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-[19px]">
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

                <div className="mt-4">
                  <label htmlFor="badge-description" className={labelClass}>
                    Badge Description <span className="text-[#E11D48]">*</span>
                  </label>
                  <CounterField
                    id="badge-description"
                    placeholder="Describe what this badge represents"
                  />
                </div>

                <div className="mt-4">
                  <p className={labelClass}>
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
                    className="relative flex h-[100px] w-[395px] cursor-pointer flex-row items-center justify-center gap-3 overflow-hidden rounded-lg border-[1.5px] border-dashed border-[#001984] bg-[#F5F6FF] transition-colors hover:bg-[#EDEFFF]"
                  >
                    {badgeImage ? (
                      <>
                        <img
                          src={badgeImage}
                          alt="Badge icon preview"
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute right-2 bottom-2 rounded bg-white/90 px-2 py-1 text-[11px] font-semibold text-[#0A0847]/80">
                          Change Image
                        </span>
                      </>
                    ) : (
                      <>
                        <LuCloudUpload
                          size={48}
                          className="shrink-0 text-[#001984]"
                        />
                        <span className="text-[16px] font-normal text-[#001984]">
                          Upload / Replace Image
                        </span>
                      </>
                    )}
                  </button>
                  {badgeImageName && (
                    <p className="mt-2 text-[14px] text-[#0A0847]/80">
                      {badgeImageName}
                    </p>
                  )}
                  <p className="mt-2 text-[14px] font-light text-[#0A0847]/80">
                    Recommended size: 1200×628px
                  </p>
                  <p className="text-[14px] font-light text-[#0A0847]/80">
                    JPG, PNG or WebP
                  </p>
                </div>

                <div className="mt-4">
                  <label htmlFor="badge-tier" className={labelClass}>
                    Tier <span className="text-[#E11D48]">*</span>
                  </label>
                  <FieldSelect
                    id="badge-tier"
                    options={["Select tier", "Seed", "Sprout", "Tree"]}
                  />
                </div>

                <div className="mt-4 flex items-center">
                  <span className="w-[244px] shrink-0 text-[13px] font-medium text-[#0A0847]/80">
                    Status
                  </span>
                  <div className="flex items-center gap-2.5">
                    <Toggle
                      checked={active}
                      onChange={setActive}
                      label="Status"
                    />
                    <span className="text-[14px] text-[#0A0847]/80">Active</span>
                  </div>
                </div>
              </Card>

              <Card title="Preview" divider={false}>
                <div className="flex items-center gap-4">
                  <Medal />
                  <div>
                    <p className="text-[22px] font-semibold text-[#0A0847]/80">
                      Badge Title
                    </p>
                    <p className="mt-1 text-[16px] text-[#0A0847]/60">
                      Badge description will appear here.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-4">
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

                <div className="mt-4">
                  <label htmlFor="req-details" className={labelClass}>
                    Requirement Details{" "}
                    <span className="text-[#E11D48]">*</span>
                  </label>
                  <CounterField
                    id="req-details"
                    placeholder="Enter requirement details"
                  />
                </div>

                <div className="mt-4">
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

                <div className="mt-4">
                  <label htmlFor="display-order" className={labelClass}>
                    Display Order <span className="text-[#E11D48]">*</span>
                  </label>
                  <CounterField
                    id="display-order"
                    placeholder="Enter display order"
                  />
                </div>

                <div className="mt-4">
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

                <div className="mt-4">
                  <label className={labelClass}>
                    Badge Color (Optional)
                    <span className="text-[#E11D48]">*</span>
                  </label>
                  <div className="flex items-center gap-[22px]">
                    {SWATCHES.map((swatch) => {
                      const selected = color === swatch.hex;
                      return (
                        <button
                          key={swatch.hex}
                          type="button"
                          aria-label={`Color ${swatch.hex}`}
                          aria-pressed={selected}
                          onClick={() => setColor(swatch.hex)}
                          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-black/10 transition-transform hover:scale-105"
                          style={{ backgroundColor: swatch.hex }}
                        >
                          {selected && (
                            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-white">
                              <LuCheck
                                size={15}
                                className="text-[#001984]"
                                strokeWidth={3}
                              />
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
    </div>
  );
}
