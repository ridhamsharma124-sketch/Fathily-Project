import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import musicIcon from "../../../assets/activities/icon-music-app.svg";
import selectorBookIcon from "../../../assets/activities/icon-book-purple.svg";
import liveQuestionImage from "../../../assets/activities/live question img.webp";
import {
  AudioFileCard,
  AudioPlayer,
  Field,
  ImageUploadBox,
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
const DEFAULT_STORY_IMAGE = liveQuestionImage;

const BREADCRUMB = ["Bible Content", "Articles", "John", "Chapter 3", "Chapter Audio Stories"];
const LOCATION_PARTS = ["New Testament", "John", "Chapter 3"];

const IMAGE_ALT = "Jesus and Nicodemus";
const IMAGE_CAPTION = [
  "Upload an image to represent the story",
  "and help capture attention.",
];

const DESCRIPTION =
  "A powerful dialogue between Jesus & Nicodemus on the new birth. Experience the conversation.";

const DURATION_LABEL = "09:48 min • 10.2 MB";
const INTRO_TIME = "00:10 / 00:10";

const PREVIEW_TRUNCATE_AT = 74;

function truncate(text, limit) {
  return text.length > limit ? `${text.slice(0, limit).trimEnd()}...` : text;
}

/* Page-level layout classes (local, so shared classes can't pin widths) */
const PAGE_SHELL =
  "min-h-screen min-w-0 overflow-x-hidden bg-[#F9FAFE] font-[Inter] text-[#0A0847]";
const PAGE_BODY = "flex w-full min-w-0 flex-col px-4 py-6 sm:px-6";
const CARD_ROW =
  "mt-6 grid min-w-0 grid-cols-1 items-stretch gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]";
const FORM_CARD =
  "flex min-w-0 flex-col gap-5 rounded-lg border border-[#E2DFFC] bg-[#FEFFFF] p-4 sm:p-[24px]";

/* Bottom action row */
const ACTION_ROW =
  "mt-6 flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between";
const ACTION_BTN_FULL = "!w-full sm:!w-auto";
const ACTION_BTN_CANCEL = "!w-full sm:!w-[152px]";
const ACTION_BTN_DRAFT = "!w-full sm:!w-[152px]";
const ACTION_BTN_PREVIEW = "!w-full sm:!w-[188px]";
const ACTION_GROUP = "grid w-full grid-cols-1 gap-4 sm:flex sm:w-auto sm:flex-row sm:justify-end";

/* ==========================================================================
   PAGE HEADER (local: breadcrumb, title, location chip)
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
        Add Chapter Audio Story
      </h1>

           <div className="mt-4 flex w-full max-w-full items-center gap-2.5 rounded-[8px] border border-[#E2DFFC] bg-[#F7F7F9] px-3 py-3 sm:w-[535px] sm:h-[49px] sm:gap-[10px] sm:px-[15px] sm:pt-[13px] sm:pr-[12px] sm:pb-[12px] sm:pl-[15px]">
        <img src={selectorBookIcon} alt="" width={24} height={24} className="h-5 w-5 shrink-0 object-contain sm:h-6 sm:w-6" />
        <p className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-semibold leading-6 text-[#0A0847]/80 sm:gap-x-6 sm:text-[16px]">
          {LOCATION_PARTS.map((part, index) => (
            <span key={part} className="flex items-center gap-2 whitespace-nowrap sm:gap-6">
              {index > 0 && <span aria-hidden>&gt;</span>}
              <span>{part}</span>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

function StoryEntryPreview({ title, description, image }) {
  return (
    <section className="min-w-0 rounded-lg border border-[#E2DFFC] bg-[#F9F9FF] p-4 sm:p-8">
      <div className="flex min-w-0 flex-col gap-3">
        <div>
          <h2 className="text-[18px] font-semibold leading-tight text-[#0A0847] sm:text-[22px]">
            Story Entry Preview
          </h2>
          <p className="mt-2 text-[14px] text-[#0A084799] sm:text-[16px]">
            This is how the story will appear to users.
          </p>
        </div>

        {image && (
          <img
            src={image}
            alt={IMAGE_ALT}
            className="h-[180px] w-full rounded-lg border border-[#E2DFFC] object-cover sm:h-[229px]"
          />
        )}

        <p className="mt-1 break-words text-[15px] font-semibold leading-[26px] text-[#0A0847] sm:text-[16px] sm:leading-[30px]">
          {title}
        </p>

        <p className="text-[13px] font-semibold italic leading-[24px] text-[#041581] sm:text-[14px] sm:leading-[30px]">
          John 3
        </p>

        <div className="flex min-w-0 items-center gap-2">
          <img src={musicIcon} alt="" className="h-[14px] w-[14px] shrink-0" />
          <p className="text-[13px] font-medium italic leading-[24px] text-[#0A084799] sm:text-[14px] sm:leading-[30px]">
            <span className="font-semibold">09:48</span> • 24 Plays
          </p>
        </div>

        <p className="line-clamp-2 break-words text-[13px] font-medium italic leading-[20px] text-[#0A084799] sm:text-[14px] sm:leading-[21px]">
          {truncate(description, PREVIEW_TRUNCATE_AT)}
        </p>

        <AudioPlayer time={INTRO_TIME} variant="preview" />
      </div>
    </section>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AddChapterAudioStory() {
  const [title, setTitle] = useState("The New Birth: Born Again");
  const [description, setDescription] = useState(DESCRIPTION);
  const [image, setImage] = useState(DEFAULT_STORY_IMAGE);
  const [introLabel, setIntroLabel] = useState("A");
  const [note, setNote] = useState("Draft 1");
  const [transcriberOn, setTranscriberOn] = useState(true);

  return (
    <div className={PAGE_SHELL}>
      <div className={PAGE_BODY}>
        <PageHeader />

        <div className={CARD_ROW}>
          {/* LEFT — story form */}
          <section className={FORM_CARD}>
            <Field label="Story Title" required htmlFor="story-title">
              <TextInput
                id="story-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>

            <Field label="Story Description" required htmlFor="story-description">
              <TextArea
                id="story-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                max={500}
                className="h-[116px]"
              />
            </Field>

            <div className="min-w-0">
              <p className={labelClass}>
                Upload Image <span className="text-[#E11D48]">*</span>
              </p>
              <ImageUploadBox
                image={image}
                onSelect={setImage}
                onRemove={() => setImage(null)}
                caption={IMAGE_CAPTION}
                alt={IMAGE_ALT}
              />
            </div>

            <div className="min-w-0">
              <AudioFileCard>
                <p className="pt-[22px] pr-4 pb-[30px] pl-5 text-[12px] font-medium leading-[15px] text-[#0A0847] sm:pt-[26px] sm:pb-[44px] sm:pl-[82px]">
                  This audio will be used as the story narration.
                  <br />
                  Supported formats: MP3, WAV, AAC (max 25 MB)
                </p>
              </AudioFileCard>
            </div>

            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-[#0A0847]">Duration (Based on Audio)</p>
              <p className="mt-1 text-[12px] font-medium text-[#0A084799]">{DURATION_LABEL}</p>
            </div>

            <div className="min-w-0">
              <p className="mb-[6px] text-[14px] font-semibold text-[#0A0847]">
                10-Second Intro/Preview
              </p>
              <AudioPlayer time={INTRO_TIME} />
            </div>

            <Field label="Intro / Trailer after Transcription" required htmlFor="intro-trailer">
              <TextInput
                id="intro-trailer"
                value={introLabel}
                onChange={(e) => setIntroLabel(e.target.value)}
              />
            </Field>

            <Field label="Note" required htmlFor="note">
              <TextInput id="note" value={note} onChange={(e) => setNote(e.target.value)} />
            </Field>

            <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-start sm:gap-[60px]">
              <p className="text-[14px] font-semibold text-[#0A0847]">Enable Transcriber</p>
              <Toggle checked={transcriberOn} onChange={setTranscriberOn} label="Enable Transcriber" />
            </div>

            <button
              type="button"
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#001984] bg-white px-4 text-[13px] font-semibold text-[#0A0847]/60 transition-colors hover:bg-[#F1F1F9] sm:w-fit sm:px-8 sm:text-[14px]"
            >
              <LuUpload size={15} aria-hidden />
              Upload Transcriber or Paste Text
            </button>
          </section>

          {/* RIGHT — story entry preview */}
          <StoryEntryPreview title={title} description={description} image={image} />
        </div>

        {/* BOTTOM ACTION ROW */}
        <div className={ACTION_ROW}>
          <button type="button" className={`${outlineButton} ${ACTION_BTN_CANCEL}`}>
            Cancel
          </button>

          <div className={ACTION_GROUP}>
            <button type="button" className={`${outlineButton} ${ACTION_BTN_DRAFT}`}>
              Save as Draft
            </button>
            <button type="button" className={`${outlineButton} ${ACTION_BTN_PREVIEW}`}>
              Preview as User
            </button>
            <button type="button" className={`${purpleButton} ${ACTION_BTN_FULL}`}>
              Publish Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}