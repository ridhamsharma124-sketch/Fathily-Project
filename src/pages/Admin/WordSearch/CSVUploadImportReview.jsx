import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiCloudArrowUp } from "react-icons/pi";
import chapterDefaultImage from "../../../assets/word search/Chapter Default Image.webp";
import clues1Image from "../../../assets/word search/Clues1.webp";
import clues2Image from "../../../assets/word search/Clues2.webp";
import checkMarkIcon from "../../../assets/word search/CheckMarkIcon.svg";
import checkFilledIcon from "../../../assets/word search/CheckFilledIcon.svg";
import floppyIcon from "../../../assets/word search/dr_save_floppy.svg";
import csvDocIcon from "../../../assets/word search/ws_csv_doc.svg";
import closeIcon from "../../../assets/word search/mh_chip_x.svg";


const NAVY = "#001984";
const HEADING = "#0A0847";
const TEXT_80 = "rgba(10,8,71,0.8)";
const TEXT_60 = "rgba(10,8,71,0.6)";
const CARD_BORDER = "#E2DFFC";
const LINE = "#E9E9E9";
const HEADER_BG = "#F2F5FC";
const GREEN = "#21AC1C";

// Layout switches, based on the width of the page content (not the screen), so it also works
// when the sidebar is open or closed.
const CARDS_4_COLS_AT = 800; // 4 summary cards in one row
const CARDS_2_COLS_AT = 400; // 2 per row (below this: 1 per row)
const OPTIONS_INLINE_AT = 900; // Import Options toggles + green notice on one line


// Returns [ref, width]: the content width of the element the ref is attached to.
function useElementWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const measure = () => {
      const cs = getComputedStyle(el);
      return el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    };

    setWidth(measure());
    const ro = new ResizeObserver(() => setWidth(measure()));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, width];
}




function Radio({ checked }) {
  return (
    <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center">
      <span
        className="flex h-[20px] w-[20px] items-center justify-center rounded-full border-2"
        style={{ borderColor: checked ? NAVY : TEXT_60 }}
      >
        {checked && <span className="h-[10px] w-[10px] rounded-full" style={{ backgroundColor: NAVY }} />}
      </span>
    </span>
  );
}


function Toggle({ on }) {
  return (
    <span
      className="relative flex h-[14px] w-[26px] shrink-0 items-center rounded-full transition-colors"
      style={{ backgroundColor: on ? NAVY : "#DDE3F0" }}
    >
      <span
        className={`absolute h-[10px] w-[10px] rounded-full bg-white transition-all ${on ? "left-[14px]" : "left-[2px]"}`}
      />
    </span>
  );
}


function NavyBadge({ children, width }) {
  return (
    <span
      className="inline-flex h-[30px] items-center justify-center rounded-[8px] border px-[8px] text-[10px] leading-[12px] font-medium whitespace-nowrap"
      style={{ width, backgroundColor: "rgba(0,25,132,0.1)", borderColor: "#CFD6EF", color: NAVY }}
    >
      {children}
    </span>
  );
}


function ReadyBadge() {
  return (
    <span
      className="inline-flex h-[29px] w-[92px] items-center justify-center gap-[6px] rounded-[8px] border text-[12px] leading-[12px] font-medium"
      style={{ backgroundColor: "rgba(33,172,28,0.1)", borderColor: "rgba(33,172,28,0.1)", color: GREEN }}
    >
      <img src={checkFilledIcon} alt="" aria-hidden width={14} height={14} className="block" />
      Ready
    </span>
  );
}

function OutlineButton({ children, icon, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`flex h-[41px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[6px] border bg-white px-5 text-[14px] font-semibold transition-colors hover:bg-[#F5F8FD] ${className}`}
      style={{ borderColor: CARD_BORDER, color: NAVY }}
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
      className={`flex h-[41px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[6px] text-[14px] font-semibold text-white transition-opacity hover:opacity-90 ${className}`}
      style={{ backgroundColor: NAVY }}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

function OptionToggle({ label, sub, on, onToggle }) {
  return (
    <button type="button" onClick={onToggle} className="flex cursor-pointer items-center gap-3 text-left">
      <Toggle on={on} />
      <span>
        <span className="block text-[13px] leading-none font-semibold" style={{ color: TEXT_60 }}>
          {label}
        </span>
        <span className="mt-[6px] block text-[10px] leading-none font-medium" style={{ color: TEXT_60 }}>
          {sub}
        </span>
      </span>
    </button>
  );
}



const SUMMARY_CARDS = [
  {
    value: "22",
    label: "Ready to Import",
    sub: "All set to be imported",
    box: "bg-[#F0FAF0] border-[#4CAF6A]",
    color: "#2EA44F",
  },
  {
    value: "2",
    label: "Needs Review",
    sub: "Will be imported after fixes",
    box: "bg-[#FFF8F0] border-[#F2874B]",
    color: "#E8590C",
  },
  {
    value: "12",
    label: "AI Images Generated",
    sub: "AI Images Generated",
    box: "bg-white border-[#001984]",
    color: NAVY,
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


// Figma widths (37 / 133 / 162 / 150 / 102 / 86 / 158 / rest). The "fr" part makes the columns scale
// proportionally when the card is wider or narrower; each column has a floor (the Clue, Answer and
// Maps To columns can shrink a bit, the others keep their Figma width). Sum of the floors = 860px.
const TABLE_COLS =
  "grid-cols-[minmax(37px,37fr)_minmax(133px,133fr)_minmax(130px,162fr)_minmax(120px,150fr)_minmax(102px,102fr)_minmax(86px,86fr)_minmax(128px,158fr)_minmax(124px,193fr)]";



export default function CSVUploadImportReview() {
  const navigate = useNavigate();
  const [publishAfterImport, setPublishAfterImport] = useState(true);
  const [showToast, setShowToast] = useState(true);
  const [selectedRow, setSelectedRow] = useState(1);

  const [contentRef, contentWidth] = useElementWidth();
  const cardCols =
    contentWidth >= CARDS_4_COLS_AT ? "grid-cols-4" : contentWidth >= CARDS_2_COLS_AT ? "grid-cols-2" : "grid-cols-1";
  const optionsInline = contentWidth >= OPTIONS_INLINE_AT;

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#F9FAFE] font-inter text-[#0A1050]">
      <div ref={contentRef} className="mx-auto w-full max-w-[1111px] px-4 py-6 pb-12 sm:px-6">
        <p className="text-[16px] leading-[19px] font-medium" style={{ color: TEXT_60 }}>
          Add / Edit Word Search — CSV Upload
        </p>

        <h1 className="mt-[11px] text-[22px] leading-[27px] font-semibold" style={{ color: HEADING }}>
          4. CSV Upload — Import Review
        </h1>

        <p className="mt-[12px] text-[14px] leading-[17px] font-semibold" style={{ color: TEXT_60 }}>
          Review your import summary before finalizing.
        </p>

        {/* Summary cards: 4 / 2 / 1 per row, depending on the width of the page content */}
        <div className={`mt-[19px] grid gap-[22px] ${cardCols}`}>
          {SUMMARY_CARDS.map((card) => (
            <section
              key={card.label}
              className={`flex h-[115px] min-w-0 flex-col items-center justify-center gap-[4px] rounded-[8px] border px-4 text-center ${card.box}`}
            >
              <p className="text-[22px] leading-[27px] font-semibold" style={{ color: card.color }}>
                {card.value}
              </p>
              <p className="text-[14px] leading-[17px] font-semibold" style={{ color: card.color }}>
                {card.label}
              </p>
              <p className="text-[10px] leading-[12px] font-medium" style={{ color: TEXT_60 }}>
                {card.sub}
              </p>
            </section>
          ))}

          <section className="flex h-[115px] min-w-0 flex-col justify-center gap-[8px] rounded-[8px] border bg-white px-4" style={{ borderColor: CARD_BORDER }}>
            <p className="text-[14px] leading-[17px] font-semibold" style={{ color: NAVY }}>
              File Summary
            </p>

            <div className="flex items-center gap-[10px]">
              <img src={csvDocIcon} alt="" aria-hidden width={22} height={28} className="block shrink-0" />

              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] leading-[14px] font-semibold" style={{ color: HEADING }}>
                  genesis_word_search.csv
                </p>
                <p className="mt-[4px] text-[10px] leading-[12px] font-medium" style={{ color: TEXT_60 }}>
                  24 rows • 12.4 KB
                </p>
              </div>

            </div>
          </section>
        </div>

        <section
          className="mt-[30px] box-border flex flex-col gap-[24px] rounded-[7.5px] border-[0.75px] bg-white px-[20px] pt-[22px] pb-[24px]"
          style={{ borderColor: CARD_BORDER }}
        >
          <h2 className="text-[14px] leading-[17px] font-semibold" style={{ color: NAVY }}>
            Import Summary (24 Puzzles)
          </h2>

          {/* Header and rows share the same min width, so on small screens the table scrolls sideways as one piece */}
          <div className="w-full overflow-x-auto">
            <div
              className={`grid h-[50px] w-full min-w-[860px] items-center border-b-[0.75px] ${TABLE_COLS}`}
              style={{ backgroundColor: HEADER_BG, borderColor: LINE }}
            >
              <span className="flex justify-center text-[14px] leading-[17px] font-semibold" style={{ color: TEXT_80 }}>
                #
              </span>
              {["Type", "Clue / Prompt / Reference", "Answer / Focus", "Level", "Reward Points", "Maps To (App Field)", "Status"].map((h) => (
                <span key={h} className="px-4 text-[12px] leading-[15px] font-semibold" style={{ color: TEXT_80 }}>
                  {h === "Maps To (App Field)" ? (
                    <>
                      Maps To
                      <br />
                      (App Field)
                    </>
                  ) : (
                    h
                  )}
                </span>
              ))}
            </div>

            {SUMMARY_ROWS.map((row) => (
              <div
                key={row.no}
                onClick={() => setSelectedRow(row.no)}
                className={`grid min-h-[61px] w-full min-w-[860px] cursor-pointer items-center border-b-[0.75px] ${TABLE_COLS}`}
                style={{ borderColor: LINE }}
              >
                <span className="flex justify-center">
                  <Radio checked={selectedRow === row.no} />
                </span>

                <span className="flex items-center gap-[10px] px-4">
                  <img src={row.image} alt="" className="h-[38px] w-[38px] shrink-0 rounded-[8px] object-cover" />
                  <span className="text-[12px] leading-[15px] font-medium" style={{ color: TEXT_80 }}>
                    {row.type}
                  </span>
                </span>

                <span className="px-4 text-[12px] leading-[15px] font-medium" style={{ color: TEXT_80 }}>
                  {row.clue}
                </span>

                <span className="px-4 text-[12px] leading-[15px] font-medium" style={{ color: TEXT_80 }}>
                  {row.answer}
                </span>

                <span className="px-4">
                  <NavyBadge width={71}>{row.level}</NavyBadge>
                </span>

                <span className="px-4 text-center text-[12px] leading-[12px] font-medium" style={{ color: TEXT_80 }}>
                  {row.reward}
                </span>

                <span className="px-4">
                  <NavyBadge width={96}>{row.mapsTo}</NavyBadge>
                </span>

                <span className="px-4">
                  <ReadyBadge />
                </span>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-[14px] leading-[17px] font-semibold" style={{ color: NAVY }}>
              Import Options
            </h2>

            {/* Toggles + green notice on one line from 900px of content width, otherwise stacked */}
            <div
              className={`mt-[16px] flex gap-[12px] ${
                optionsInline ? "flex-row items-center" : "flex-col items-start"
              }`}
            >
              <div className="flex flex-wrap items-center gap-x-[61px] gap-y-[16px]">
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
              </div>

              {showToast && (
                <div
                  className={`flex h-auto min-h-[58px] w-full max-w-[355px] items-center gap-[10px] rounded-[8px] border px-4 ${
                    optionsInline ? "ml-auto" : ""
                  }`}
                  style={{ backgroundColor: "rgba(33,172,28,0.1)", borderColor: "#DAF3C8" }}
                >
                  <img src={checkMarkIcon} alt="" aria-hidden width={26} height={26} className="block shrink-0" />

                  <span className="flex-1 text-[14px] leading-[14px] font-semibold" style={{ color: TEXT_60 }}>
                    CSV validated and images assigned
                  </span>

                  <button
                    type="button"
                    onClick={() => setShowToast(false)}
                    aria-label="Close notification"
                    className="flex h-[16px] w-[16px] shrink-0 cursor-pointer items-center justify-center"
                  >
                    <img src={closeIcon} alt="" aria-hidden width={12} height={12} className="block" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Buttons: full width stacked on mobile; from sm they sit in one row and wrap if there is not enough room */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-[12px]">
          <OutlineButton
            className="w-full px-0 sm:w-[97px]"
            onClick={() => navigate("/admin/word-search/add-edit/csv-upload/review-images")}
          >
            Back
          </OutlineButton>

          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <OutlineButton
              className="w-full px-0 sm:w-[129px]"
              icon={<img src={floppyIcon} alt="" aria-hidden width={16} height={16} className="block shrink-0" />}
            >
              Save draft
            </OutlineButton>

            <PrimaryButton
              className="w-full sm:w-[201px]"
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