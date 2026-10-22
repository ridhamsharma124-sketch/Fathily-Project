import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import audioRevelationImage from "../../../assets/word search/Audio Revelation.webp";
import mysteryScriptureImage from "../../../assets/word search/Mystery Scripture.webp";
import selectedPuzzlePreview from "../../../assets/word search/Selected Puzzle Preview.webp";
import totalPuzzlesIcon from "../../../assets/word search/icon-total-puzzles.svg";
import checkMarkIcon from "../../../assets/word search/CheckMarkIcon.svg";
import draftsIcon from "../../../assets/word search/icon-drafts.svg";
import disabledIcon from "../../../assets/word search/icon-disabled.svg";


const NAVY = "#001984";
const HEADING = "#0A0847";
const TEXT_80 = "rgba(10,8,71,0.8)";
const TEXT_60 = "rgba(10,8,71,0.6)";
const CARD_BORDER = "#E2DFFC";
const LINE = "#E9E9E9";
const HEADER_BG = "#F2F5FC";

// Layout switches, based on the width of the page content (not the screen), so it also works
// when the sidebar is open or closed.
const STATS_4_COLS_AT = 860; // 4 stat cards in one row
const STATS_2_COLS_AT = 420; // 2 per row (below this: 1 per row)
const TWO_PANE_AT = 1061; // table (714px) + divider + Selected Puzzle Preview (271px) side by side
const PREVIEW_ROW_AT = 560; // stacked preview: image beside its details

// Figma crop of the preview image: a 289x289 image at left -10 / top -55 inside a 271x152 box,
// written in % so the same crop scales with the box.
const PREVIEW_IMG_STYLE = { width: "106.64%", height: "190.13%", left: "-3.69%", top: "-36.18%" };


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


function CaretSvg({ dir = "right", color }) {
  return (
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      aria-hidden
      style={{ transform: dir === "left" ? "scaleX(-1)" : undefined }}
    >
      <path d="M1 1 5 5 1 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownSvg() {
  return (
    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden>
      <path d="M0.75 0.75 4 4 7.25 0.75" stroke={TEXT_60} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
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


function SourceBadge({ children = "Chapter Default", small = false }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[8px] border text-[10px] leading-[12px] font-medium whitespace-nowrap ${
        small ? "h-[23px] px-[3px]" : "h-[30px] px-[8px]"
      }`}
      style={{ backgroundColor: "rgba(0,25,132,0.1)", borderColor: "#CFD6EF", color: NAVY }}
    >
      {children}
    </span>
  );
}


function RowAction({ children }) {
  return (
    <button
      type="button"
      className="flex h-[30px] cursor-pointer items-center justify-center rounded-[6px] border bg-white px-[9px] text-[10px] leading-[12px] font-medium whitespace-nowrap transition-colors hover:bg-[#F5F8FD]"
      style={{ borderColor: CARD_BORDER, color: NAVY }}
    >
      {children}
    </button>
  );
}

function OutlineButton({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`flex h-[41px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[6px] border border-[#E2DFFC] bg-white px-5 text-[14px] font-semibold text-[#001984] transition-colors hover:bg-[#F5F8FD] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`flex h-[41px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[6px] bg-[#001984] px-7 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}



const IMAGE_OPTIONS = ["chapter", "ai"];


const STAT_CARDS = [
  { label: "Total Puzzles", value: 248, src: totalPuzzlesIcon, w: 28, h: 28, color: "#6209FD" },
  { label: "Published", value: 216, src: checkMarkIcon, w: 32, h: 32, color: "#2BA452" },
  { label: "Drafts", value: 21, src: draftsIcon, w: 18.71, h: 23.23, color: "#C65406" },
  { label: "Disabled", value: 11, src: disabledIcon, w: 28, h: 28, color: "#C4002B" },
];

const PUZZLE_ROWS = [
  { no: 1, clue: "Who created the heavens and the earth?", answer: "God", image: audioRevelationImage },
  { no: 2, clue: "What was the name of the first man?", answer: "Adam", image: mysteryScriptureImage },
  { no: 3, clue: "Who was the first woman?", answer: "Eve", image: audioRevelationImage },
  {
    no: 4,
    clue: "Which tree were they commanded not to eat from?",
    answer: "Tree of Knowledge",
    image: mysteryScriptureImage,
  },
  {
    no: 5,
    clue: "Which tree were they commanded not to eat from?",
    answer: "Serpent",
    image: mysteryScriptureImage,
  },
];


const PREVIEW_KEYS = [
  { label: "Clue", value: "Who created the heavens and the earth?", w: 168 },
  { label: "Answer", value: "God" },
  { label: "Image Source", badge: true },
  { label: "Note", value: "Images can be changed individually at any time.", w: 130 },
];

const PAGE_NUMBERS = [1, 2, 3, 4, 5];


// Figma widths (40 / 202 / 86 / 131 / rest). The "fr" part makes the columns scale up
// proportionally when the card is wider; the last column never gets narrower than 255px,
// which is what the three action buttons need.
const TABLE_COLS =
  "grid-cols-[minmax(40px,40fr)_minmax(202px,202fr)_minmax(86px,86fr)_minmax(131px,131fr)_minmax(255px,258fr)]";



export default function CSVUploadReviewImages() {
  const navigate = useNavigate();
  const [imageMode, setImageMode] = useState("chapter");
  const [selectedRow, setSelectedRow] = useState(1);

  const [contentRef, contentWidth] = useElementWidth();
  const statCols =
    contentWidth >= STATS_4_COLS_AT ? "grid-cols-4" : contentWidth >= STATS_2_COLS_AT ? "grid-cols-2" : "grid-cols-1";
  const twoPane = contentWidth >= TWO_PANE_AT;
  const previewRow = !twoPane && contentWidth >= PREVIEW_ROW_AT;

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#F9FAFE] font-inter text-[#0A1050]">
      <div ref={contentRef} className="mx-auto w-full max-w-[1111px] px-4 py-6 sm:px-6">
        <p className="text-[16px] leading-[19px] font-medium" style={{ color: TEXT_60 }}>
          Add / Edit Word Search — CSV Upload
        </p>

        <h1 className="mt-[11px] text-[22px] leading-[27px] font-semibold" style={{ color: HEADING }}>
          3. CSV Upload — Review Images
        </h1>

        <p className="mt-[12px] text-[14px] leading-[17px] font-semibold" style={{ color: TEXT_60 }}>
          We’ve validated your file and mapped the columns to the correct fields.
        </p>

        {/* Radios + button: the button drops below the radios when there is not enough room */}
        <div className="mt-[19px] flex h-auto min-h-[41px] flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 flex-wrap items-center gap-x-[18px] gap-y-[12px]">
            {IMAGE_OPTIONS.map((option) => {
              const checked = imageMode === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setImageMode(option)}
                  className="flex cursor-pointer items-center gap-[8px] text-left text-[14px] leading-[18px] font-semibold"
                >
                  <Radio checked={checked} />
                  <span style={{ color: checked ? TEXT_80 : TEXT_60 }}>
                    {option === "chapter"
                      ? "Keep chapter default images"
                      : "Generate unique AI image for every imported puzzle"}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="flex h-[41px] w-full shrink-0 cursor-pointer items-center justify-center rounded-[6px] text-[14px] leading-[17px] font-semibold text-white transition-opacity hover:opacity-90 sm:w-[200px]"
            style={{ backgroundColor: NAVY }}
          >
            Generate All AI Images
          </button>
        </div>

        {/* Stat cards: 4 / 2 / 1 per row, depending on the width of the page content */}
        <div className={`mt-[35px] grid gap-[17px] ${statCols}`}>
          {STAT_CARDS.map(({ label, value, src, w, h, color }) => (
            <section
              key={label}
              className="box-border flex h-[115px] min-w-0 items-center gap-[17px] rounded-[8px] border bg-[#FEFEFE] pl-[15px]"
              style={{ borderColor: CARD_BORDER }}
            >
              <span
                className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-[18px]"
                style={{ backgroundColor: `${color}1A` }}
              >
                <img src={src} alt="" aria-hidden width={w} height={h} className="block" />
              </span>

              <div className="flex min-w-0 flex-col self-start pt-[24.5px]">
                <p className="text-[22px] leading-[27px] font-semibold" style={{ color: TEXT_80 }}>
                  {value}
                </p>
                <p className="mt-[4.5px] text-[14px] leading-[17px] font-semibold" style={{ color: NAVY }}>
                  {label}
                </p>
              </div>
            </section>
          ))}
        </div>

        {/* Import Preview: table + preview panel side by side from 1061px of content width, otherwise stacked */}
        <section
          className={`mt-[30px] box-border flex rounded-[7.5px] border-[0.75px] bg-white px-[15px] pt-[22px] pb-[24px] ${
            twoPane ? "flex-row" : "flex-col"
          }`}
          style={{ borderColor: CARD_BORDER }}
        >
          <div className="flex min-w-0 flex-1 flex-col">
            <h2 className="text-[14px] leading-[17px] font-semibold" style={{ color: NAVY }}>
              Import Preview (24 Puzzles)
            </h2>

            <div className="mt-[20px] ml-0 overflow-x-auto sm:ml-[3px]">
              <div
                className={`grid h-[50px] w-full min-w-[714px] items-center border-b-[0.75px] ${TABLE_COLS}`}
                style={{ backgroundColor: HEADER_BG, borderColor: LINE }}
              >
                <span className="flex justify-center text-[18px] leading-[22px] font-semibold" style={{ color: TEXT_80 }}>
                  #
                </span>
                <span className="px-4 text-[14px] leading-[17px] font-medium" style={{ color: TEXT_80 }}>
                  Clue / Prompt
                </span>
                <span className="px-4 text-[14px] leading-[17px] font-medium" style={{ color: TEXT_80 }}>
                  Answer
                </span>
                <span className="px-4 text-[14px] leading-[17px] font-medium" style={{ color: TEXT_80 }}>
                  Image Source
                </span>
                <span className="px-4 text-center text-[14px] leading-[17px] font-medium" style={{ color: TEXT_80 }}>
                  Actions
                </span>
              </div>

              {PUZZLE_ROWS.map((row) => (
                <div
                  key={row.no}
                  onClick={() => setSelectedRow(row.no)}
                  className={`grid h-[62px] w-full min-w-[714px] cursor-pointer items-center border-b-[0.75px] ${TABLE_COLS}`}
                  style={{ borderColor: LINE }}
                >
                  <span className="flex justify-center">
                    <Radio checked={selectedRow === row.no} />
                  </span>

                  <span className="flex items-center gap-[10px] px-4">
                    <img src={row.image} alt="" className="h-[38px] w-[38px] shrink-0 rounded-[8px] object-cover" />
                    <span className="min-w-0 text-[11px] leading-[13px] font-medium" style={{ color: TEXT_80 }}>
                      {row.clue}
                    </span>
                  </span>

                  <span className="px-4 text-[10px] leading-[12px] font-medium" style={{ color: TEXT_80 }}>
                    {row.answer}
                  </span>

                  <span className="px-4">
                    <SourceBadge />
                  </span>

                  <span className="flex items-center justify-center gap-[4px] px-4">
                    <RowAction>Replace</RowAction>
                    <RowAction>Generate AI</RowAction>
                    <RowAction>Reset Default</RowAction>
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-[34px] -mr-[6px] flex flex-wrap items-center justify-between gap-[12px] pl-0 sm:pl-[11px]">
              <div className="flex items-center gap-2 text-[11px] leading-[13px] font-medium" style={{ color: TEXT_80 }}>
                <span>Display</span>
                <span className="relative">
                  <select
                    aria-label="Rows per page"
                    defaultValue="10"
                    className="h-[24px] w-[40px] cursor-pointer appearance-none rounded-[4px] border border-[#E3E7F0] bg-white pr-3 pl-2 text-[11px] font-bold outline-none"
                    style={{ color: TEXT_80 }}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-[6px] -translate-y-1/2">
                    <ChevronDownSvg />
                  </span>
                </span>
                <span>Words search</span>
              </div>

              <div className="flex flex-wrap items-center gap-[6px]">
                <button
                  type="button"
                  disabled
                  aria-label="Previous page"
                  className="flex h-[24px] w-[24px] cursor-not-allowed items-center justify-center rounded-[4px] border border-[#E3E7F0] bg-white"
                >
                  <CaretSvg dir="left" color="#C4C9D4" />
                </button>

                {PAGE_NUMBERS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[4px] text-[11px] leading-[13px] transition-colors ${
                      n === 1 ? "font-semibold text-white" : "font-medium hover:bg-[#F5F8FD]"
                    }`}
                    style={n === 1 ? { backgroundColor: NAVY } : { color: HEADING }}
                  >
                    {n}
                  </button>
                ))}

                <button
                  type="button"
                  aria-label="Next page"
                  className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[4px] border bg-white"
                  style={{ borderColor: NAVY }}
                >
                  <CaretSvg dir="right" color={NAVY} />
                </button>
              </div>
            </div>
          </div>

          {twoPane && <span className="mr-[21px] ml-[19px] w-px shrink-0" style={{ backgroundColor: LINE }} aria-hidden />}

          <div className={`flex shrink-0 flex-col ${twoPane ? "w-[271px]" : "mt-6 w-full"}`}>
            <h2 className="text-[14px] leading-[17px] font-semibold" style={{ color: NAVY }}>
              Selected Puzzle Preview
            </h2>

            <div className={`mt-[16px] flex ${previewRow ? "flex-row items-start gap-[24px]" : "flex-col gap-[16px]"}`}>
              {/* Always the same 271:152 box and the same Figma crop of the image, just scaled to the available width */}
              <div
                className={`relative shrink-0 overflow-hidden rounded-[8px] bg-[#F5F8FD] ${
                  previewRow ? "h-[152px] w-[271px]" : "aspect-[271/152] w-full"
                }`}
              >
                <img
                  src={selectedPuzzlePreview}
                  alt="Selected puzzle preview"
                  className="absolute max-w-none object-cover"
                  style={PREVIEW_IMG_STYLE}
                />
              </div>

              <div className="flex min-w-0 flex-col gap-[16px]">
                {PREVIEW_KEYS.map((item) => (
                  <div key={item.label} className="flex items-start gap-[10px]">
                    <span
                      className="w-[69px] shrink-0 text-[10px] leading-[12px] font-semibold"
                      style={{ color: TEXT_80 }}
                    >
                      {item.label}
                    </span>

                    {item.badge ? (
                      <SourceBadge small />
                    ) : (
                      <span
                        className="text-[10px] leading-[12px] font-medium"
                        style={{ color: TEXT_60, width: item.w }}
                      >
                        {item.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 flex items-center justify-between">
          <OutlineButton
            className="w-[97px] px-0"
            onClick={() => navigate("/admin/word-search/add-edit/csv-upload/validate-map")}
          >
            Back
          </OutlineButton>

          <PrimaryButton
            onClick={() => navigate("/admin/word-search/add-edit/csv-upload/import-review")}
          >
            Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}