import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import musicIcon from "../../../assets/activities/icon-music-app.svg";
import liveQuestionImage from "../../../assets/activities/live question img.webp";
import {
  ActivityPageHeader,
  AudioFileCard,
  AudioPlayer,
  Field,
  ImageUploadBox,
  TextArea,
  TextInput,
  Toggle,
  cardRowClass,
  formCardClass,
  labelClass,
  outlineButton,
  pageBodyClass,
  pageInnerClass,
  pageShellClass,
  purpleButton,
} from "./activityFormShared";

/* ==========================================================================
   MOCK DATA — hardcoded exactly as specified
   ========================================================================== */
const DEFAULT_STORY_IMAGE = liveQuestionImage;

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

/* Bottom action row: its own layout, so the shared row class can't pin it.
   Mobile → stacked, full-width buttons.  sm+ → Cancel left, rest grouped right.
   "!" prefix forces the width override even if the shared button class sets one. */
const ACTION_ROW = "flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between";
const ACTION_BTN_FULL = "!w-full sm:!w-auto";
const ACTION_BTN_CANCEL = "!w-full sm:!w-[152px]";
const ACTION_BTN_DRAFT = "!w-full sm:!w-[152px]";
const ACTION_BTN_PREVIEW = "!w-full sm:!w-[188px]";
const ACTION_GROUP = "grid w-full grid-cols-1 gap-4 sm:flex sm:w-auto sm:flex-row sm:justify-end";

function StoryEntryPreview({ title, description, image }) {
  return (
    <section className="w-full min-w-0 shrink-0 rounded-lg border border-[#E2DFFC] bg-[#F9F9FF] p-8">
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-[22px] font-semibold leading-none text-[#0A0847]">
            Story Entry Preview
          </h2>
          <p className="mt-2 text-[16px] text-[#0A084799]">
            This is how the story will appear to users.
          </p>
        </div>

        {image && (
          <img
            src={image}
            alt={IMAGE_ALT}
            className="h-[229px] w-full rounded-lg border border-[#E2DFFC] object-cover"
          />
        )}

        <p className="mt-1 text-[16px] font-semibold leading-[30px] text-[#0A0847]">
          {title}
        </p>

        <p className="text-[14px] font-semibold italic leading-[30px] text-[#041581]">
          John 3
        </p>

        <div className="flex items-center gap-2">
          <img src={musicIcon} alt="" className="h-[14px] w-[14px] shrink-0" />
          <p className="text-[14px] font-medium italic leading-[30px] text-[#0A084799]">
            <span className="font-semibold">09:48</span> • 24 Plays
          </p>
        </div>

        <p className="line-clamp-2 text-[14px] font-medium italic leading-[21px] text-[#0A084799]">
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
    <div className={pageShellClass}>
      <div className={pageBodyClass}>
        <div className={pageInnerClass}>
          <ActivityPageHeader
            breadcrumb={[
              "Bible Content",
              "Articles",
              "John",
              "Chapter 3",
              "Chapter Audio Stories",
            ]}
            title="Add Chapter Audio Story"
          />

          <div className={cardRowClass}>
            {/* LEFT — story form */}
            <section className={formCardClass}>
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

              <div>
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

              <div>
                <AudioFileCard>
                  <p className="pt-[26px] pr-4 pb-[44px] pl-[82px] text-[12px] font-medium leading-[15px] text-[#0A0847]">
                    This audio will be used as the story narration.
                    <br />
                    Supported formats: MP3, WAV, AAC (max 25 MB)
                  </p>
                </AudioFileCard>
              </div>

              <div>
                <p className="text-[14px] font-semibold text-[#0A0847]">
                  Duration (Based on Audio)
                </p>
                <p className="mt-1 text-[12px] font-medium text-[#0A084799]">
                  {DURATION_LABEL}
                </p>
              </div>

              <div>
                <p className="mb-[6px] text-[14px] font-semibold text-[#0A0847]">
                  10-Second Intro/Preview
                </p>
                <AudioPlayer time={INTRO_TIME} />
              </div>

              <Field
                label="Intro / Trailer after Transcription"
                required
                htmlFor="intro-trailer"
              >
                <TextInput
                  id="intro-trailer"
                  value={introLabel}
                  onChange={(e) => setIntroLabel(e.target.value)}
                />
              </Field>

              <Field label="Note" required htmlFor="note">
                <TextInput
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </Field>

              <div className="flex items-center gap-[60px]">
                <p className="text-[14px] font-semibold text-[#0A0847]">
                  Enable Transcriber
                </p>
                <Toggle
                  checked={transcriberOn}
                  onChange={setTranscriberOn}
                  label="Enable Transcriber"
                />
              </div>

              <button
                type="button"
                className="flex h-12 w-fit cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#001984] bg-white px-8 text-[14px] font-semibold text-[#0A0847]/60 transition-colors hover:bg-[#F1F1F9]"
              >
                <LuUpload size={15} aria-hidden />
                Upload Transcriber or Paste Text
              </button>
            </section>

            {/* RIGHT — story entry preview */}
            <StoryEntryPreview
              title={title}
              description={description}
              image={image}
            />
          </div>
        </div>

        {/* BOTTOM ACTION ROW */}
        <div className={ACTION_ROW}>
          <button
            type="button"
            className={`${outlineButton} ${ACTION_BTN_CANCEL}`}
          >
            Cancel
          </button>

          <div className={ACTION_GROUP}>
            <button
              type="button"
              className={`${outlineButton} ${ACTION_BTN_DRAFT}`}
            >
              Save as Draft
            </button>
            <button
              type="button"
              className={`${outlineButton} ${ACTION_BTN_PREVIEW}`}
            >
              Preview as User
            </button>
            <button
              type="button"
              className={`${purpleButton} ${ACTION_BTN_FULL}`}
            >
              Publish Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}