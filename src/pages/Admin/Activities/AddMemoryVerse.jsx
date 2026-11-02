import { useState } from "react";
import giftIcon from "../../../assets/activities/mv_gift.png";
import shuffleIcon from "../../../assets/activities/mv_shuffle.png";
import bookIcon from "../../../assets/activities/icon-book-purple.svg";
import selectorBookIcon from "../../../assets/activities/icon-book-purple.svg";
import memoryVerseBg from "../../../assets/activities/memory-verse-bg.webp";
import liveQuestionImage from "../../../assets/activities/live question img.webp";
import {
  AudioFileCard,
  AudioPlayer,
  Field,
  ImageUploadBox,
  Select,
  TextArea,
  TextInput,
  Toggle,
  labelClass,
  outlineButton,
  purpleButton,
} from "./activityFormShared";

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const TRANSLATION_OPTIONS = ["NIV", "KJV", "ESV", "NASB", "NLT"];
const TEXT_SIZE_OPTIONS = ["Semi-Extra Large", "Extra Large", "Large", "Medium", "Small"];
const ALIGNMENT_OPTIONS = ["0 / 300", "Left", "Center", "Right"];
const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];
const MEMORY_UNIT_OPTIONS = ["Both Full Verse", "Full Verse", "Partial Verse"];
const SCORE_OPTIONS = ["Points", "None"];

const BREADCRUMB = ["Bible Content", "Activities", "John", "Chapter 3", "Memory Verse"];
const LOCATION_PARTS = ["New Testament", "John", "Chapter 3"];

const IMAGE_ALT = "Memory verse background";
const IMAGE_CAPTION = [
  "Use an image: You can drag and drop",
  "an image, or click to select.",
];

const BACKGROUND_MUSIC_TIME = "00:00 / 03:45";

/* shown in the preview while the "Verse Text" field is still empty */
const MOCK_VERSE_TEXT = `For God so loved the
world that he gave his one and
only Son,  that whoever believes
in him shall not perish
but have eternal life.`;

/* Page-level layout classes (local, so shared classes can't pin widths) */
const PAGE_SHELL =
  "min-h-screen min-w-0 overflow-x-hidden bg-[#F9FAFE] font-[Inter] text-[#0A0847]";
const PAGE_BODY = "flex w-full min-w-0 flex-col px-4 py-6 sm:px-6";
const CARD_ROW =
  "mt-6 grid min-w-0 grid-cols-1 items-stretch gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]";
const FORM_CARD =
  "flex min-w-0 flex-col gap-5 rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] p-4 sm:p-[24px]";
const ACTION_ROW =
  "mt-6 flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between";

/* ==========================================================================
   PAGE HEADER (local)
   ========================================================================== */
function PageHeader() {
  return (
    <div className="min-w-0">
      <nav aria-label="Breadcrumb" className="min-w-0">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[14px] font-medium leading-[20px] text-[#0A0847]/60 sm:gap-x-2.5 sm:text-[16px] sm:leading-normal">
          {BREADCRUMB.map((item, index) => {
            const isLast = index === BREADCRUMB.length - 1;
            return (
              <li key={item} className="flex items-center gap-1.5 sm:gap-2.5">
                {index > 0 && <span aria-hidden>&gt;</span>}
                <span className="whitespace-nowrap" aria-current={isLast ? "page" : undefined}>
                  {item}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>

      <h1 className="mt-4 text-[20px] font-semibold leading-tight text-[#0A0847] sm:mt-5 sm:text-[22px]">
        Add Memory Verse
      </h1>
      <div className="mt-4 flex w-full max-w-full items-center gap-3 rounded-[8px] border border-[#E2DFFC] bg-[#F7F7F9] px-3 py-3 sm:h-[49px] sm:gap-[10px] sm:px-[15px] sm:py-0 xl:w-[calc((100%-1.5rem)/2)]">
        <img src={selectorBookIcon} alt="" width={24} height={24} className="h-5 w-5 shrink-0 object-contain sm:h-6 sm:w-6" />
        <p className="flex min-w-0 flex-wrap items-center text-[13px] font-semibold leading-6 text-[#0A0847]/80 sm:text-[16px]">
          {LOCATION_PARTS.map((part, index) => (
            <span key={part} className="flex items-center whitespace-nowrap">
              {index > 0 && (
                <span aria-hidden className="pl-3 pr-4 sm:pl-4 sm:pr-5">
                  &gt;
                </span>
              )}
              <span>{part}</span>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   USER MEMORY VERSE PREVIEW (right card)
   ========================================================================== */
function VersePreviewCard({ reference, verseText, translation, image }) {
  const typed = verseText.trim().length > 0;

  return (
    <div className="relative mx-auto aspect-[397/583] w-full max-w-[397px] overflow-hidden rounded-lg border border-[#E2DFFC] bg-white">
      <img
        src={image}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-bottom object-right"
        draggable={false}
      />

      <div className="relative z-10 flex flex-col items-center px-5 pt-6 text-center sm:px-8 sm:pt-8">
        <span className="font-serif text-[56px] font-bold leading-none text-[#6B6FB5] sm:text-[64px]">
          &ldquo;
        </span>

        <h3 className="mt-3 break-words text-[20px] font-bold text-[#041581] sm:text-[24px]">
          {reference}
        </h3>

        <p className="mt-4 max-w-[280px] text-[13px] italic leading-[1.7] whitespace-pre-line text-[#0A084799] sm:mt-5 sm:text-[14px]">
          {typed ? verseText : MOCK_VERSE_TEXT}
        </p>

        <p className="mt-4 text-[12px] italic text-[#0A084799] sm:text-[13px]">{translation}</p>
      </div>
    </div>
  );
}

function MemoryVersePreview({ reference, verseText, translation, image }) {
  return (
    <section className="min-w-0 rounded-lg border border-[#E2DFFC] bg-[#FEFEFF] p-4 sm:p-8">
      <div className="mx-auto flex w-full max-w-[397px] flex-col gap-[14px]">
        <div className="text-center">
          <h2 className="text-[15px] font-bold text-[#0A0847] sm:text-[16px]">
            User Memory Verse Preview
          </h2>
          <p className="mt-1 text-[14px] leading-[1.5] text-[#0A084799] sm:text-[16px]">
            This is how the memory verse
            <br />
            will appear to users.
          </p>
        </div>

        <VersePreviewCard
          reference={reference}
          verseText={verseText}
          translation={translation}
          image={image}
        />

        <div>
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-[#0A084799]">Memorization Progress</p>
            <p className="text-[10px] text-[#0A084799]">0%</p>
          </div>
          <div className="mt-1.5 h-2 w-full rounded-full bg-[#E5E7EB]" />
        </div>

        <div>
          <p className="mb-[6px] text-[12px] font-semibold text-[#0A0847]">Start to Earn</p>
          <button
            type="button"
            className="flex h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#4022D1] text-[14px] font-semibold text-white transition-colors hover:opacity-90"
          >
            <img src={giftIcon} alt="" className="h-[15px] w-auto" />
            10 Pts
          </button>
        </div>

        <div>
          <p className="mb-[6px] text-[12px] font-semibold text-[#0A0847]">Review in Quiz</p>
          <button
            type="button"
            className="flex h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#001984] bg-white text-[14px] font-semibold text-[#0A0847]/60 transition-colors hover:bg-[#F1F1F9]"
          >
            <img src={shuffleIcon} alt="" className="h-auto w-[16px]" />
            Begin Review
          </button>
        </div>

        <div>
          <p className="mb-[6px] text-[12px] font-semibold text-[#0A0847]">Practice Mode</p>
          <button
            type="button"
            className="flex h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#001984] bg-white text-[14px] font-semibold text-[#0A0847]/60 transition-colors hover:bg-[#F1F1F9]"
          >
            <img src={bookIcon} alt="" className="h-[15px] w-auto" />
            Begin Practice
          </button>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AddMemoryVerse() {
  const [reference, setReference] = useState("John 3:16");
  const [verseText, setVerseText] = useState("");
  const [translation, setTranslation] = useState("NIV");
  const [textSize, setTextSize] = useState("Semi-Extra Large");
  const [alignment, setAlignment] = useState("0 / 300");
  const [difficulty, setDifficulty] = useState("Medium");
  const [memoryTime, setMemoryTime] = useState("10");
  const [memoryUnit, setMemoryUnit] = useState("Both Full Verse");
  const [uploadImage, setUploadImage] = useState(liveQuestionImage);
  const [score, setScore] = useState("Points");
  const [showCountdown, setShowCountdown] = useState(true);
  const [includeInReview, setIncludeInReview] = useState(true);
  const [audioPlayback, setAudioPlayback] = useState(true);

  const toggleRows = [
    { label: "Show Countdown", value: showCountdown, setter: setShowCountdown },
    { label: "Include in Quiz Review", value: includeInReview, setter: setIncludeInReview },
    { label: "Enable Audio Playback", value: audioPlayback, setter: setAudioPlayback },
  ];

  return (
    <div className={PAGE_SHELL}>
      <div className={PAGE_BODY}>
        <PageHeader />

        <div className={CARD_ROW}>
          {/* LEFT — memory verse form */}
          <section className={FORM_CARD}>
            <Field label="Verse Reference" required htmlFor="verse-reference">
              <TextInput
                id="verse-reference"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </Field>

            <Field label="Verse Text" required htmlFor="verse-text">
              <TextArea
                id="verse-text"
                value={verseText}
                onChange={(e) => setVerseText(e.target.value)}
                max={300}
                className="h-[102px]"
              />
            </Field>

            <Field label="Translation" htmlFor="translation">
              <Select
                id="translation"
                value={translation}
                options={TRANSLATION_OPTIONS}
                onChange={(e) => setTranslation(e.target.value)}
              />
            </Field>

            <Field label="Text Size (Medium)" htmlFor="text-size">
              <Select
                id="text-size"
                value={textSize}
                options={TEXT_SIZE_OPTIONS}
                onChange={(e) => setTextSize(e.target.value)}
              />
            </Field>

            <div className="min-w-0">
              <p className={labelClass}>Verse Alignment (Centered)</p>
              <p className="text-[11px] leading-[1.5] text-[#0A084799] sm:text-[10.5px]">
                Select alignment &ndash; great for big screens
                <br />
                but can use on small screens also.
              </p>
              <div className="mt-2">
                <Select
                  id="verse-alignment"
                  value={alignment}
                  options={ALIGNMENT_OPTIONS}
                  onChange={(e) => setAlignment(e.target.value)}
                />
              </div>
            </div>

            <Field label="Difficulty" htmlFor="difficulty">
              <Select
                id="difficulty"
                value={difficulty}
                options={DIFFICULTY_OPTIONS}
                onChange={(e) => setDifficulty(e.target.value)}
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Memory Time" htmlFor="memory-time">
                <TextInput
                  id="memory-time"
                  value={memoryTime}
                  onChange={(e) => setMemoryTime(e.target.value)}
                />
              </Field>

              <Field label="Memory Unit" htmlFor="memory-unit">
                <Select
                  id="memory-unit"
                  value={memoryUnit}
                  options={MEMORY_UNIT_OPTIONS}
                  onChange={(e) => setMemoryUnit(e.target.value)}
                />
              </Field>
            </div>

            <div className="min-w-0">
              <p className={labelClass}>Image / Background</p>
              <ImageUploadBox
                image={uploadImage}
                onSelect={setUploadImage}
                onRemove={() => setUploadImage(null)}
                caption={IMAGE_CAPTION}
                alt={IMAGE_ALT}
              />
            </div>

            <div className="h-px w-full bg-[#E5E4EC]" />

            <div className="min-w-0">
              <p className="mb-[6px] text-[12px] font-semibold text-[#0A0847]">
                Background Music
              </p>
              <AudioFileCard>
                <div className="px-3 py-3">
                  <AudioPlayer time={BACKGROUND_MUSIC_TIME} />
                </div>
              </AudioFileCard>
            </div>

            <Field label="Score" htmlFor="score">
              <Select
                id="score"
                value={score}
                options={SCORE_OPTIONS}
                onChange={(e) => setScore(e.target.value)}
              />
            </Field>

            {toggleRows.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-3">
                <p className="min-w-0 text-[12px] font-semibold text-[#0A0847]">{row.label}</p>
                <Toggle checked={row.value} onChange={row.setter} label={row.label} />
              </div>
            ))}
          </section>

          {/* RIGHT — user memory verse preview */}
          <MemoryVersePreview
            reference={reference}
            verseText={verseText}
            translation={translation}
            image={memoryVerseBg}
          />
        </div>

        {/* BOTTOM ACTION ROW: stacked full width on mobile, split on sm+ */}
        <div className={ACTION_ROW}>
          <button type="button" className={`${outlineButton} w-full sm:w-[152px]`}>
            Cancel
          </button>

          <div className="grid w-full grid-cols-1 gap-4 sm:flex sm:w-auto sm:flex-wrap sm:justify-end">
            <button type="button" className={`${outlineButton} w-full sm:w-[152px]`}>
              Save as Draft
            </button>
            <button type="button" className={`${outlineButton} w-full sm:w-[188px]`}>
              Preview as User
            </button>
            <button type="button" className={`${purpleButton} w-full sm:w-auto`}>
              Publish Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}