import { useState } from "react";
import {
  LuPlus,
  LuPencil,
  LuTrash2,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuSprout,
  LuTreePine,
  LuShield,
  LuShell,
} from "react-icons/lu";

/* ==========================================================================
   MOCK DATA — hardcoded exactly as specified
   ========================================================================== */
const TIERS = [
  {
    id: "seed",
    name: "Seed",
    subtitle: "Beginning your faith journey",
    iconBg: "#E8F5E9",
    iconColor: "#2E7D32",
    Glyph: LuShell,
    points: "0–999",
    description: "Starting faith journey",
    benefits: [
      "Full access to all basic features",
      "Daily challenges",
      "Standard profile",
      "Basic achievements",
      "Standard community cards",
    ],
  },
  {
    id: "sprout",
    name: "Sprout",
    subtitle: "Growing through God's Word",
    iconBg: "#F3E8FF",
    iconColor: "#6B3FA0",
    Glyph: LuSprout,
    points: "1,000–4,999",
    description: "Building skills and growing spiritually",
    benefits: [
      "New profile frame",
      "Additional themes",
      "Reward bonuses",
      "Daily activities",
      "Achievement showcase",
      "Special celebration badge",
    ],
  },
  {
    id: "tree",
    name: "Tree",
    subtitle: "Rooted in Scripture",
    iconBg: "#E8F5E9",
    iconColor: "#2E7D32",
    Glyph: LuTreePine,
    points: "5,000–19,999",
    description: "Deepening your understanding and helping others",
    benefits: [
      "Exclusive app themes",
      "Tree profile frame",
      "Premium notifications",
      "Enhanced statistics",
      "Early access features",
      "Create custom quizzes",
    ],
  },
  {
    id: "faithful",
    name: "Faithful",
    subtitle: "Accomplished and dedicated learner",
    iconBg: "#FEF9E7",
    iconColor: "#B7791F",
    Glyph: LuShield,
    points: "20,000+",
    description: "Making impact and inspiring others",
    benefits: [
      "Faithful profile badge",
      "Celebration animations",
      "Lifetime bonus points",
      "Complete journey timeline",
      "Advanced insights",
      "Publish public quizzes",
      "Community recognition",
      "Invite to Faithly Competition",
    ],
  },
];

const PAGES = [1, 2, 3, 4, 5];
const PAGE_SIZES = [10, 20, 50];

/* ==========================================================================
   SMALL PRIMITIVES
   ========================================================================== */
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

/* ==========================================================================
   PAGE — TIERS MANAGEMENT
   ========================================================================== */
export default function TiersManagement() {
  const [activeStates, setActiveStates] = useState(() =>
    TIERS.reduce((acc, tier) => ({ ...acc, [tier.id]: true }), {}),
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const toggleActive = (id) =>
    setActiveStates((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-[#F9FAFE] font-[Inter] text-[#0A0847]">
      <div className="mx-auto max-w-[1200px] space-y-6 px-5 py-6">
        {/* header row */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-[22px] font-bold text-[#0A0847]">
              Tiers Management
            </h1>
            <p className="mt-[6px] text-[14px] text-[#0A084799]">
              Create, edit and manage faith journey tiers.
            </p>
          </div>

          <button
            type="button"
            className="flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#041581] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#030D5C]"
          >
            <LuPlus size={16} />
            Add New Tier
          </button>
        </div>

        {/* table card */}
        <div className="overflow-hidden rounded-xl border border-[#E5E4EC] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left">
              <thead>
                <tr className="bg-[#F2F5FC]">
                  <th scope="col" className="w-[22%] px-4 py-4 text-[13px] font-bold text-[#0A0847]">
                    Tier
                  </th>
                  <th scope="col" className="w-[10%] px-4 py-4 text-[13px] font-bold text-[#0A0847]">
                    Points Range
                  </th>
                  <th scope="col" className="w-[18%] px-4 py-4 text-[13px] font-bold text-[#0A0847]">
                    Description
                  </th>
                  <th scope="col" className="w-[30%] px-4 py-4 text-[13px] font-bold text-[#0A0847]">
                    Benefits Unlocked
                  </th>
                  <th scope="col" className="w-[10%] px-4 py-4 text-[13px] font-bold text-[#0A0847]">
                    Status
                  </th>
                  <th scope="col" className="w-[10%] px-4 py-4 text-[13px] font-bold text-[#0A0847]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {TIERS.map((tier) => {
                  const Glyph = tier.Glyph;

                  return (
                    <tr
                      key={tier.id}
                      className="border-b border-[#E5E4EC] align-top transition-colors hover:bg-[#FBFBFF]"
                    >
                      {/* Tier */}
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-3">
                          <span
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                            style={{ backgroundColor: tier.iconBg }}
                          >
                            <Glyph
                              size={24}
                              style={{ color: tier.iconColor }}
                              strokeWidth={1.6}
                              aria-hidden
                            />
                          </span>

                          <div className="min-w-0">
                            <p className="text-[15px] font-bold text-[#0A0847]">
                              {tier.name}
                            </p>
                            <p className="mt-0.5 text-[12px] leading-[1.4] text-[#0A084799]">
                              {tier.subtitle}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Points Range */}
                      <td className="px-4 py-5 text-[13px] whitespace-nowrap text-[#0A0847CC]">
                        {tier.points}
                      </td>

                      {/* Description */}
                      <td className="px-4 py-5 text-[13px] leading-[1.6] text-[#0A0847CC]">
                        {tier.description}
                      </td>

                      {/* Benefits Unlocked */}
                      <td className="px-4 py-5">
                        <ul className="list-inside list-disc space-y-0.5 pl-1 text-[13px] leading-[1.6] text-[#041581] marker:text-[#041581]">
                          {tier.benefits.map((benefit) => (
                            <li key={benefit}>{benefit}</li>
                          ))}
                        </ul>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] whitespace-nowrap text-[#0A0847CC]">
                            Active
                          </span>
                          <Toggle
                            checked={!!activeStates[tier.id]}
                            onChange={() => toggleActive(tier.id)}
                            label={`Toggle ${tier.name} tier`}
                          />
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label={`Edit ${tier.name} tier`}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[#041581] text-[#041581] transition-colors hover:bg-[#F1F1F9]"
                          >
                            <LuPencil size={15} />
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete ${tier.name} tier`}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[#DC2626] text-[#DC2626] transition-colors hover:bg-[#FEF2F2]"
                          >
                            <LuTrash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E5E4EC] px-4 py-3">
            <div className="flex items-center gap-2 text-[13px] text-[#0A084799]">
              Display
              <div className="relative">
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="h-[32px] w-[64px] cursor-pointer appearance-none rounded-md border border-[#E5E4EC] bg-white pr-6 pl-2 text-[13px] text-[#0A0847CC] outline-none focus:border-[#041581]"
                >
                  {PAGE_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <LuChevronDown
                  size={13}
                  className="pointer-events-none absolute top-1/2 right-1.5 -translate-y-1/2 text-[#0A0847CC]"
                  aria-hidden
                />
              </div>
              Badges
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled
                aria-label="Previous page"
                className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-md border border-[#E5E4EC] text-[#0A084733]"
              >
                <LuChevronLeft size={15} />
              </button>

              {PAGES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  aria-current={page === p ? "page" : undefined}
                  className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-[13px] transition-colors ${
                    page === p
                      ? "bg-[#041581] font-semibold text-white"
                      : "border border-[#E5E4EC] text-[#0A0847CC] hover:bg-[#F9FAFE]"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(p + 1, PAGES.length))}
                aria-label="Next page"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[#E5E4EC] text-[#0A0847CC] transition-colors hover:bg-[#F9FAFE]"
              >
                <LuChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
