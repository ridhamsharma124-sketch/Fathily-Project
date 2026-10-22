import { Children, useState } from "react";
import Logo from "../../../components/shared/Logo";


function makeIcon(children, { viewBox = "0 0 24 24", fill = "none" } = {}) {
  return function Icon({ size = 16, strokeWidth = 2, className = "", ...rest }) {
    return (
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        fill={fill}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
        {...rest}
      >
        {children}
      </svg>
    );
  };
}

const Tag = makeIcon(
  <>
    <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
    <circle cx="7.5" cy="7.5" r=".6" fill="currentColor" />
  </>,
);

const Video = makeIcon(
  <>
    <path d="m16 10.5 5.25-3.1a.5.5 0 0 1 .75.43v8.34a.5.5 0 0 1-.75.43L16 13.5z" fill="currentColor" />
    <rect x="2" y="6" width="14" height="12" rx="2.5" fill="currentColor" />
  </>,
);

const UserPlus = makeIcon(
  <>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20.5a6.5 6.5 0 0 1 9.6-5.7" />
    <circle cx="17" cy="6.6" r="2.6" />
    <path d="M15.6 11.6A4.6 4.6 0 0 1 21.5 15" />
    <path d="M17.5 16.5v5M15 19h5" />
  </>,
);

const Upload = makeIcon(
  <>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m17 8-5-5-5 5" />
    <path d="M12 3v12" />
  </>,
);

const Heart = makeIcon(
  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
);

const LinkIcon = makeIcon(
  <>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </>,
  { viewBox: "-2.3 -2.3 28.6 28.6" },
);

const Info = makeIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </>,
);

const Star = makeIcon(
  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />,
);

function GripVertical({ size = 18, className = "" }) {
  return (
    <svg
      width={size * 0.5}
      height={size}
      viewBox="0 0 10 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {[3, 10, 17].map((y) =>
        [2.5, 7.5].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />),
      )}
    </svg>
  );
}

const Trash2 = makeIcon(
  <>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <path d="M10 11v6M14 11v6" />
  </>,
);

const Plus = makeIcon(<path d="M5 12h14M12 5v14" />);

const Mail = makeIcon(
  <>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </>,
);

const Save = makeIcon(
  <>
    <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
    <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
    <path d="M7 3v4a1 1 0 0 0 1 1h7" />
  </>,
);

const ShieldCheck = makeIcon(
  <>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </>,
);

/* ---------- brand marks  ---------- */
function AppleMark({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 384 512" fill="currentColor" className={className} aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function GooglePlayMark({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="gp-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00E3FF" />
          <stop offset="1" stopColor="#00A0FF" />
        </linearGradient>
        <linearGradient id="gp-green" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#00E676" />
          <stop offset="1" stopColor="#00C853" />
        </linearGradient>
        <linearGradient id="gp-yellow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFD600" />
          <stop offset="1" stopColor="#FFBC00" />
        </linearGradient>
        <linearGradient id="gp-red" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF6E40" />
          <stop offset="1" stopColor="#FF3A44" />
        </linearGradient>
      </defs>
      <path fill="url(#gp-blue)" d="M4 2.5 13 12 4 12Z" />
      <path fill="url(#gp-green)" d="M4 12 13 12 4 21.5Z" />
      <path fill="url(#gp-yellow)" d="M4 2.5 19.5 12 13 12Z" />
      <path fill="url(#gp-red)" d="M13 12 19.5 12 4 21.5Z" />
    </svg>
  );
}

function FacebookMark({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#fff"
        d="M16.671 15.469 17.203 12h-3.328V9.749c0-.949.465-1.874 1.956-1.874h1.514V4.922s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669V12H7.078v3.469h3.047v8.385a12.1 12.1 0 0 0 3.75 0V15.469z"
      />
    </svg>
  );
}

function InstagramMark({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7024C4" />
          <stop offset="0.38" stopColor="#C21975" />
          <stop offset="0.7" stopColor="#C74C4D" />
          <stop offset="1" stopColor="#E09B3D" />
        </linearGradient>
      </defs>
      <rect x="0.8" y="0.8" width="14.4" height="14.4" rx="4.2" fill="none" stroke="url(#ig-grad)" strokeWidth="1.6" />
      <circle cx="8" cy="8" r="3.3" fill="none" stroke="url(#ig-grad)" strokeWidth="1.6" />
      <circle cx="12.1" cy="3.9" r="1" fill="url(#ig-grad)" />
    </svg>
  );
}

function YoutubeMark({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="0.5" y="4" width="23" height="16" rx="4.5" fill="#FF0000" />
      <path d="M9.8 8.6 15.6 12l-5.8 3.4z" fill="#fff" />
    </svg>
  );
}

/* ==========================================================================
   STYLE TOKENS
   ========================================================================== */
const CARD = "flex flex-col gap-[18px] rounded-[10px] border border-[#E2DFFC] bg-white px-6 py-[26px]";
const INPUT_BASE =
  "h-[40px] rounded-[8px] border border-[#D9DCEA] bg-white pt-[7px] pr-[15px] pb-[7px] text-[13px] font-medium text-[#0A0847] outline-none placeholder:text-[#9AA1B2] focus:border-[#051383]";
const INPUT = `${INPUT_BASE} w-full pl-[11px]`;
const INPUT_WITH_ICON = `${INPUT_BASE} w-full pl-[34px]`;
const DASHED_BTN =
  "flex h-[40px] w-fit items-center justify-center gap-[8px] rounded-[8px] border border-dashed border-[#051383]/60 px-[24px] text-[13px] font-medium";

const APPLE_URL = "https://apps.apple.com/app/faithly";
const PLAY_URL = "https://play.google.com/store/apps/details?id=org.faithly.app";

function CardHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-[9px]">
      <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[10px] bg-[#EDEBFC]">
        <Icon size={24} strokeWidth={1.8} className="text-[#001984]" />
      </span>
      <span className="flex min-w-0 flex-col gap-[2px]">
        <h2 className="text-[15px] font-semibold text-[#0A0847]">{title}</h2>
        <p className="text-[12px] leading-[1.35] text-[#6B7280]">{subtitle}</p>
      </span>
    </div>
  );
}

function FieldLabel({ icon: Icon, iconClass = "text-[#0A0847]", children }) {
  return (
    <span className="flex items-center gap-[6px] text-[12px] font-medium text-[#0A0847]">
      {Icon ? <Icon size={16} strokeWidth={2} className={`shrink-0 ${iconClass}`} /> : null}
      {children}
    </span>
  );
}

function UrlInput({ defaultValue, value, onChange, placeholder, withIcon = true }) {
  return (
    <div className="relative min-w-0">
      {withIcon && (
        <LinkIcon
          size={16}
          strokeWidth={2}
          className="pointer-events-none absolute top-1/2 left-[12px] -translate-y-1/2 text-[#0A0847]/60"
        />
      )}
      <input
        type="text"
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={withIcon ? INPUT_WITH_ICON : INPUT}
      />
    </div>
  );
}

function Split({ leftClass, children }) {
  const [left, right] = Children.toArray(children);
  return (
    <div className="flex flex-col gap-6 min-[860px]:flex-row">
      <div className={`w-full min-w-0 min-[860px]:shrink-0 ${leftClass}`}>{left}</div>
      <div className="hidden w-px shrink-0 self-stretch bg-[#E2DFFC] min-[860px]:block" />
      <div className="min-w-0 min-[860px]:flex-1">{right}</div>
    </div>
  );
}

const INITIAL_FEATURES = [
  { id: 1, name: "Bible Brain", desc: "Text and audio. Ask questions. Get answers." },
  { id: 2, name: "Quizzes & Challenges", desc: "Test your knowledge and strengthen your faith." },
  { id: 3, name: "Word Search Puzzles", desc: "Enjoy fun and meaningful Bible-themed games." },
  { id: 4, name: "Daily Bible Verse", desc: "Receive uplifting verses to encourage your day." },
];

const INITIAL_SOCIALS = [
  { id: 1, platform: "Facebook", icon: "facebook", value: "https://facebook.com/faithlyplus", editable: false },
  { id: 2, platform: "Instagram", icon: "instagram", value: "https://instagram.com/faithlyplus", editable: false },
  { id: 3, platform: "YouTube", icon: "youtube", value: "https://youtube.com/@faithlyplus", editable: false },
];

const SOCIAL_ICONS = {
  facebook: { Icon: FacebookMark, color: "" },
  instagram: { Icon: InstagramMark, color: "" },
  youtube: { Icon: YoutubeMark, color: "" },
};

export default function ManagePlansPage() {
  const [features, setFeatures] = useState(INITIAL_FEATURES);
  const [socials, setSocials] = useState(INITIAL_SOCIALS);

  const updateFeature = (id, key, value) =>
    setFeatures((current) => current.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  const removeFeature = (id) => setFeatures((current) => current.filter((f) => f.id !== id));
  const addFeature = () =>
    setFeatures((current) => [...current, { id: Date.now(), name: "", desc: "" }]);

  const updateSocial = (id, key, value) =>
    setSocials((current) => current.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
  const addSocial = () =>
    setSocials((current) => [
      ...current,
      { id: Date.now(), platform: "", icon: "link", value: "", editable: true },
    ]);

  return (
    <div className="mx-auto flex w-full max-w-[1114px] min-w-0 flex-col gap-6 px-3 py-6 font-inter sm:px-6">
      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col gap-[6px]">
        <h1 className="text-[20px] font-bold text-[#0A0847]">Manage Plans</h1>
        <p className="text-[12px] text-[#6B7280]">
          Create and manage your subscription plans and pricing.
        </p>
      </div>

      {/* ================= CARD 1 : Branding & App Links ================= */}
      <section className={CARD}>
        <CardHeader
          icon={Tag}
          title="Branding & App Links"
          subtitle="Manage your logo and important links that appear on the landing page."
        />

        <Split leftClass="min-[860px]:w-[350px]">
          <div className="flex flex-col gap-[8px]">
            <span className="text-[12px] font-medium text-[#0A0847]">Logo</span>
            <div className="flex flex-wrap items-center gap-[14px]">
              <div className="flex h-[90px] w-full max-w-[200px] shrink-0 items-center justify-center rounded-[8px] border border-[#E2DFFC] bg-[#F1EFFB] p-2">
                <Logo className="max-h-full max-w-full object-contain" />
              </div>
              <button
                type="button"
                className="flex h-[38px] w-fit shrink-0 items-center gap-[8px] rounded-[8px] border border-[#D9DCEA] bg-white px-[14px] text-[13px] font-medium text-[#0A0847] transition hover:border-[#051383]/40"
              >
                <Upload size={16} strokeWidth={2} />
                Upload Logo
              </button>
            </div>
            <p className="text-[11px] leading-[1.45] text-[#6B7280]">
              <span className="block">PNG, JPG or SVG recommended (400×200)</span>
              <span className="block">Current size: 280 × 80 px</span>
            </p>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-[14px]">
            <div className="flex flex-col gap-[6px]">
              <FieldLabel icon={Heart} iconClass="text-[#DE2128]">
                Give Link
              </FieldLabel>
              <UrlInput defaultValue="https://faithly.org/give" />
            </div>

            <div className="grid grid-cols-1 gap-[14px] min-[560px]:grid-cols-2">
              <div className="flex w-full max-w-[284px] min-w-0 flex-col gap-[6px]">
                <FieldLabel icon={AppleMark} iconClass="text-black">
                  Apple App Store Link
                </FieldLabel>
                <UrlInput defaultValue={APPLE_URL} />
              </div>
              <div className="flex w-full max-w-[284px] min-w-0 flex-col gap-[6px]">
                <FieldLabel icon={GooglePlayMark}>Google Play Store Link</FieldLabel>
                <UrlInput defaultValue={PLAY_URL} />
              </div>
            </div>
          </div>
        </Split>

        <div className="flex items-center gap-2 rounded-[8px] border border-[#EAE6FB] bg-[#F3F2FD] px-3 py-2.5">
          <Info size={16} strokeWidth={2} className="shrink-0 text-[#051383]" />
          <span className="text-[12px] leading-[1.45] text-[#0A0847]">
            QR codes are automatically generated from your App Store and Google Play links and will
            update on the landing page.
          </span>
        </div>
      </section>

      {/* ================= CARD 2 : Media & Features ================= */}
      <section className={CARD}>
        <CardHeader
          icon={Video}
          title="Media & Features"
          subtitle="Manage your promo video and key features that appear on the landing page."
        />

        <Split leftClass="min-[860px]:w-[253px]">
          <div className="flex flex-col gap-[6px]">
            <FieldLabel icon={AppleMark} iconClass="text-black">
              Apple App Store Link
            </FieldLabel>
            <UrlInput defaultValue={APPLE_URL} />
            <p className="text-[11px] leading-[1.4] text-[#6B7280]">
              Add a YouTube or Vimeo link to your promo video.
            </p>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-[12px]">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <span className="flex shrink-0 items-center gap-[7px]">
                <Star size={16} strokeWidth={1.8} className="text-[#001984]" />
                <span className="text-[15px] font-semibold text-[#0A0847]">Features</span>
              </span>
              <p className="min-w-0 flex-1 pr-[35px] text-right text-[11px] leading-[1.4] text-[#6B7280]">
                These features appear in the "Powerful Features" section.
              </p>
            </div>

            <div className="flex flex-col gap-[12px]">
              {features.map((feature) => (
                <div key={feature.id} className="flex flex-col gap-[8px] sm:flex-row sm:items-center sm:gap-[12px]">
                  <div className="flex items-center gap-[12px]">
                    <GripVertical size={20} className="shrink-0 text-[#001984]" />
                    <input
                      type="text"
                      value={feature.name}
                      onChange={(event) => updateFeature(feature.id, "name", event.target.value)}
                      className={`${INPUT_BASE} w-full min-w-0 sm:w-[230px] sm:shrink-0 pl-[11px]`}
                    />
                  </div>
                  <div className="flex items-center gap-[12px]">
                    <input
                      type="text"
                      value={feature.desc}
                      onChange={(event) => updateFeature(feature.id, "desc", event.target.value)}
                      className={`${INPUT_BASE} min-w-0 flex-1 pl-[11px]`}
                    />
                    <button
                      type="button"
                      aria-label="Remove feature"
                      onClick={() => removeFeature(feature.id)}
                      className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[6px] border border-[#E2DFFC] bg-white text-[#DE2128] transition hover:border-[#DE2128]/40 hover:bg-[#FEF2F2] sm:ml-[25px]"
                    >
                      <Trash2 size={16} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={addFeature}
                  className={`${DASHED_BTN} min-w-[173px] text-[#0A0847]`}
                >
                  <Plus size={16} strokeWidth={2} />
                  Add Feature
                </button>
              </div>
            </div>
          </div>
        </Split>
      </section>

      {/* ================= CARD 3 : Contact & Social ================= */}
      <section className={CARD}>
        <CardHeader
          icon={UserPlus}
          title="Contact & Social"
          subtitle="Manage your contact information and social media links."
        />

        <div className="grid grid-cols-1 gap-[15px] min-[520px]:grid-cols-2 min-[860px]:grid-cols-[0.85fr_1fr_1fr_1fr]">
          <div className="group flex min-w-0 flex-col gap-[6px]">
            <FieldLabel icon={Mail}>Email Address</FieldLabel>
            <UrlInput defaultValue="hello@faithlyplus.com" withIcon={false} />
          </div>

          {socials.map((social) => {
            const brand = SOCIAL_ICONS[social.icon];
            const Icon = brand ? brand.Icon : LinkIcon;
            const iconClass = brand ? brand.color : "text-[#0A0847]/60";
            return (
              <div key={social.id} className="flex min-w-0 flex-col gap-[6px]">
                <span className="flex items-center gap-[6px]">
                  <Icon size={16} className={`shrink-0 ${iconClass}`} />
                  {social.editable ? (
                    <input
                      type="text"
                      value={social.platform}
                      onChange={(event) => updateSocial(social.id, "platform", event.target.value)}
                      placeholder="Platform"
                      className="min-w-0 flex-1 bg-transparent text-[12px] font-medium text-[#0A0847] outline-none placeholder:text-[#9AA1B2]"
                    />
                  ) : (
                    <span className="min-w-0 truncate text-[12px] font-medium text-[#0A0847]">
                      {social.platform}
                    </span>
                  )}
                </span>
                <UrlInput
                  value={social.value}
                  onChange={(event) => updateSocial(social.id, "value", event.target.value)}
                />
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={addSocial}
          className={`${DASHED_BTN} min-w-[164px] text-[#0A0847]/80`}
        >
          <Plus size={16} strokeWidth={2} />
          Add Social
        </button>
      </section>

      {/* ================= FOOTER ================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-[10px]">
          <ShieldCheck size={24} strokeWidth={1.8} className="shrink-0 text-[#0A0847]" />
          <span className="text-[13px] text-[#6B7280]">
            Your changes will be reflected on the live site immediately.
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
          <button
            type="button"
            className="h-[42px] w-full rounded-[8px] border border-[#D9DCEA] bg-white text-[13px] font-medium text-[#0A0847] transition hover:border-[#051383]/40 sm:w-[110px]"
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex h-[42px] w-full items-center justify-center gap-[8px] rounded-[8px] bg-[#051383] text-[13px] font-medium text-white transition hover:bg-[#040F66] sm:w-[124px]"
          >
            <Save size={16} strokeWidth={2} />
            Save draft
          </button>
        </div>
      </div>
    </div>
  );
}