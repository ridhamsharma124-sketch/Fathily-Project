import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiCheckCircle, PiCloudArrowUp, PiFloppyDisk, PiX } from "react-icons/pi";
import chapterDefaultImage from "../../../assets/word search/Chapter Default Image.png";
import clues1Image from "../../../assets/word search/Clues1.png";
import clues2Image from "../../../assets/word search/Clues2.png";

/* ==========================================================================
   SHARED
   ========================================================================== */

function CsvFileIcon() {
  return (
    <svg width="22" height="25" viewBox="0 0 27 30" fill="none" aria-hidden className="shrink-0">
      <path
        d="M5 1.5h10.5l8 8v19H5v-27Z"
        stroke="#0B1F6B"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M15.5 1.5v8h8" stroke="#0B1F6B" strokeWidth="1.3" strokeLinejoin="round" />
      <text
        x="14"
        y="24.4"
        textAnchor="middle"
        fontSize="7.4"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
        fill="#0B1F6B"
      >
        CSV
      </text>
    </svg>
  );
}

function Radio({ checked }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
        checked ? "border-[#041581]" : "border-[#D5DAE3]"
      }`}
    >
      {checked && <span className="h-2.5 w-2.5 rounded-full bg-[#041581]" />}
    </span>
  );
}

function Toggle({ on }) {
  return (
    <span
      className={`relative flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
        on ? "bg-[#1456C8]" : "bg-[#DDE3F0]"
      }`}
    >
      <span
        className={`absolute h-4 w-4 rounded-full bg-white transition-all ${
          on ? "left-[18px]" : "left-[2px]"
        }`}
      />
    </span>
  );
}

function GreyBadge({ children }) {
  return (
    <span className="inline-flex items-center rounded-[6px] bg-[#E4E8F1] px-2 py-1.5 text-[11px] text-[#1E2A6B]">
      {children}
    </span>
  );
}

function ReadyBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#E7F8E6] px-3 py-1.5 text-[12px] font-semibold text-[#22A04B]">
      <PiCheckCircle size={14} weight="fill" className="shrink-0" />
      Ready
    </span>
  );
}

function OutlineButton({ children, icon, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`flex cursor-pointer items-center justify-center gap-2 rounded-[6px] border border-[#E3E7F0] bg-white px-5 text-[12px] font-semibold text-[#041581] transition-colors hover:bg-[#F5F8FD] ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

function PrimaryButton({ children, icon, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`flex cursor-pointer items-center justify-center gap-2 rounded-[6px] bg-[#041581] text-[12px] font-semibold text-white transition-opacity hover:opacity-90 ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

function OptionToggle({ label, sub, on, onToggle }) {
  return (
    <button type="button" onClick={onToggle} className="flex cursor-pointer items-center gap-3">
      <Toggle on={on} />

      <span className="text-left">
        <span className="block text-[12px] font-semibold text-[#1F2040]">{label}</span>
        <span className="mt-0.5 block text-[10px] text-[#6B7280]">{sub}</span>
      </span>
    </button>
  );
}

/* ==========================================================================
   DATA
   ========================================================================== */

const SUMMARY_CARDS = [
  {
    value: "22",
    label: "Ready to Import",
    sub: "All set to be imported",
    box: "bg-[#EDFDF0] border-[#4CAF6A]",
    valueColor: "#2EA44F",
    labelColor: "#2EA44F",
  },
  {
    value: "2",
    label: "Needs Review",
    sub: "Will be imported after fixes",
    box: "bg-[#FFF8F0] border-[#F2874B]",
    valueColor: "#E8590C",
    labelColor: "#E8590C",
  },
  {
    value: "12",
    label: "AI Images Generated",
    sub: "AI Images Generated",
    box: "bg-white border-[#1E2A8A]",
    valueColor: "#0B1F6B",
    labelColor: "#0B1F6B",
  },
];

const SUMMARY_ROWS = [
  {
    no: 1,
    type: "Hidden Restoration",
    clue: "Who created the heavens and the earth?",
    answer: "God",
    level: "Level 1",
    reward: "10",
    mapsTo: "Chapter Default",
    image: chapterDefaultImage,
  },
  {
    no: 2,
    type: "Verse Restoration",
    clue: "In the beginning, God created the ________.",
    answer: "heavens and the earth",
    level: "Level 1",
    reward: "10",
    mapsTo: "AI Generated",
    image: clues1Image,
  },
  {
    no: 3,
    type: "Audio Revelation",
    clue: "What did God create on the first day?",
    answer: "In the beginning, God created the heavens and the earth.",
    level: "Level 1",
    reward: "10",
    mapsTo: "AI Generated",
    image: clues2Image,
  },
  {
    no: 4,
    type: "Mystery Scripture",
    clue: "Genesis 1:1",
    answer: "Adam",
    level: "Level 1",
    reward: "10",
    mapsTo: "Chapter Default",
    image: chapterDefaultImage,
  },
];

const READY_TO_IMPORT = 22;

/* ==========================================================================
   PAGE
   ========================================================================== */

export default function CSVUploadImportReview() {
  const navigate = useNavigate();
  const [publishAfterImport, setPublishAfterImport] = useState(true);
  const [showToast, setShowToast] = useState(true);
  const [selectedRow, setSelectedRow] = useState(1);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#F9FAFE] font-inter text-[#0A1050]">
      <div className="mx-auto w-full max-w-[1068px] px-6 py-6 pb-12">
        {/* ---------------- page heading ---------------- */}
        <p className="text-[14px] font-normal text-[#6B6A80]">
          Add / Edit Word Search — CSV Upload
        </p>

        <h1 className="mt-1 text-[24px] leading-[1.2] font-bold text-[#0A1050]">
          4. CSV Upload — Import Review
        </h1>

        <p className="mt-1.5 text-[13px] text-[#6B6A80]">
          Review your import summary before finalizing.
        </p>

        {/* ---------------- row A : summary cards ---------------- */}
        <div className="mt-6 grid grid-cols-4 gap-6">
          {SUMMARY_CARDS.map((card) => (
            <section
              key={card.label}
              className={`flex h-[104px] flex-col items-center justify-center rounded-[8px] border px-4 ${card.box}`}
            >
              <p className="text-[24px] leading-none font-bold" style={{ color: card.valueColor }}>
                {card.value}
              </p>
              <p className="mt-1.5 text-[12px] font-semibold" style={{ color: card.labelColor }}>
                {card.label}
              </p>
              <p className="mt-1 text-[10px] text-[#6B7280]">{card.sub}</p>
            </section>
          ))}

          {/* file summary */}
          <section className="flex h-[104px] flex-col justify-center rounded-[8px] border border-[#E8ECF4] bg-white p-4">
            <p className="text-[13px] font-semibold text-[#0B1F6B]">File Summary</p>

            <div className="mt-2 flex items-center gap-2">
              <CsvFileIcon />

              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold text-[#0A1050]">
                  genesis_word_search.csv
                </p>
                <p className="mt-0.5 text-[10px] text-[#6B7280]">24 rows • 12.4 KB</p>
              </div>
            </div>
          </section>
        </div>

        {/* ---------------- main card ---------------- */}
        <section className="mt-6 rounded-[12px] border border-[#E8ECF4] bg-white p-5 pb-10">
          <h2 className="text-[14px] font-semibold text-[#0B1F6B]">
            Import Summary (24 Puzzles)
          </h2>

          <div className="mt-4 overflow-x-auto">
            <div className="w-[978px] min-w-[978px]">
              {/* header */}
              <div className="grid h-12 grid-cols-[40px_126px_216px_182px_86px_104px_118px_106px] items-center bg-[#F4F7FC]">
                <span className="px-2 text-[13px] font-medium text-[#3A3A4F]">#</span>
                <span className="px-2 text-[13px] font-medium text-[#3A3A4F]">Type</span>
                <span className="px-2 text-[13px] font-medium text-[#3A3A4F]">
                  Clue / Prompt / Reference
                </span>
                <span className="px-2 text-[13px] font-medium text-[#3A3A4F]">Answer / Focus</span>
                <span className="px-2 text-[13px] leading-[1.25] font-medium text-[#3A3A4F]">
                  Level
                </span>
                <span className="px-2 text-[13px] leading-[1.25] font-medium text-[#3A3A4F]">
                  Reward
                  <br />
                  Points
                </span>
                <span className="px-2 text-[13px] leading-[1.25] font-medium text-[#3A3A4F]">
                  Maps To
                  <br />
                  (App Field)
                </span>
                <span className="px-2 text-[13px] font-medium text-[#3A3A4F]">Status</span>
              </div>

              {/* body */}
              {SUMMARY_ROWS.map((row) => (
                <div
                  key={row.no}
                  onClick={() => setSelectedRow(row.no)}
                  className={`grid h-[70px] cursor-pointer grid-cols-[40px_126px_216px_182px_86px_104px_118px_106px] items-center border-b border-[#EEF1F6] ${
                    selectedRow === row.no ? "bg-[#F7F9FE]" : ""
                  }`}
                >
                  <span className="px-2">
                    <Radio checked={selectedRow === row.no} />
                  </span>

                  <span className="flex items-center gap-2 px-2">
                    <img
                      src={row.image}
                      alt=""
                      className="h-9 w-9 shrink-0 rounded-[6px] object-cover"
                    />
                    <span className="line-clamp-2 text-[12px] leading-[1.3] font-medium text-[#1F2040]">
                      {row.type}
                    </span>
                  </span>

                  <span className="px-2 text-[12px] leading-[1.3] text-[#1F2040]">{row.clue}</span>

                  <span className="px-2 text-[12px] leading-[1.3] text-[#1F2040]">{row.answer}</span>

                  <span className="px-2">
                    <GreyBadge>{row.level}</GreyBadge>
                  </span>

                  <span className="px-2 text-[12px] text-[#1F2040]">{row.reward}</span>

                  <span className="px-2">
                    <GreyBadge>{row.mapsTo}</GreyBadge>
                  </span>

                  <span className="px-2">
                    <ReadyBadge />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- import options ---------------- */}
          <div className="mt-6">
            <h2 className="text-[14px] font-semibold text-[#0B1F6B]">Import Options</h2>

            <div className="mt-4 flex items-center gap-12">
              <OptionToggle
                label="Save as Draft"
                sub="Save puzzles as draft for later review"
                on={!publishAfterImport}
                onToggle={() => setPublishAfterImport(false)}
              />

              <OptionToggle
                label="Publish after Import"
                sub="Make puzzles available immediately"
                on={publishAfterImport}
                onToggle={() => setPublishAfterImport(true)}
              />

              {showToast && (
                <div className="ml-auto flex h-12 w-[277px] items-center gap-2.5 rounded-[8px] border border-[#BFE7CB] bg-[#EAF8EE] px-4">
                  <PiCheckCircle
                    size={20}
                    weight="fill"
                    className="shrink-0 text-[#22A04B]"
                  />

                  <span className="flex-1 text-[13px] font-medium text-[#4B5563]">
                    CSV validated and images assigned
                  </span>

                  <button
                    type="button"
                    onClick={() => setShowToast(false)}
                    aria-label="Close notification"
                    className="cursor-pointer text-[#6B7280] transition-colors hover:text-[#374151]"
                  >
                    <PiX size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ---------------- bottom action bar ---------------- */}
        <div className="mt-8 flex items-center justify-between">
          <OutlineButton
            className="h-8 w-[76px] px-0 text-[#1F2040]"
            onClick={() => navigate("/admin/word-search/add-edit/csv-upload/review-images")}
          >
            Back
          </OutlineButton>

          <div className="flex items-center gap-3">
            <OutlineButton
              className="h-8 w-[99px] px-0"
              icon={<PiFloppyDisk size={16} className="shrink-0" />}
            >
              Save draft
            </OutlineButton>

            <PrimaryButton
              className="h-8 w-[154px]"
              icon={<PiCloudArrowUp size={16} className="shrink-0" />}
            >
              Import {READY_TO_IMPORT} Puzzles
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}