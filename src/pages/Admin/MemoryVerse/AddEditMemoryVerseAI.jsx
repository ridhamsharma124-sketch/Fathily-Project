import { useState } from "react";
import {
  LuCheck,
  LuChevronDown,
  LuEye,
  LuImage,
  LuInfo,
  LuPencil,
  LuRefreshCw,
  LuSave,
  LuSend,
  LuSparkles,
  LuX,
} from "react-icons/lu";
import { Breadcrumb } from "../Activities/quizShared";
import {
  labelClass,
  pageBodyClass,
  pageShellClass,
  Toggle,
} from "../Activities/activityFormShared";
import trustInLord1 from "../../../assets/Trust in the Lord 1.png";
import trustInLord2 from "../../../assets/Trust in the Lord 2.png";

const TABS = ["Manual Entry", "CSV Upload", "AI Generate"];

const TESTAMENTS = ["Old Testament", "New Testament"];
const BOOKS = ["Joshua", "Proverbs", "Psalms", "Philippians"];
const CHAPTERS = ["1", "3", "4", "5", "6", "9", "13", "23"];
const TRANSLATIONS = [
  "NIV – New International Version",
  "KJV – King James Version",
  "ESV – English Standard Version",
];
const VERSE_COUNTS = ["1 verse", "2 verses", "3 verses", "5 verses"];
const DIFFICULTIES = [
  "Level 1 (Ages 4-6)",
  "Level 2 (Ages 7-8)",
  "Level 3 (Ages 9-11)",
  "Level 4 (Ages 12-14)",
  "Level 5 (Ages 15+)",
];
const ALL_LEVELS = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];

const AI_CHECKLIST = [
  "Verse Selection",
  "Title & Instructions",
  "All 5 Learning Steps",
  "Hints & Feedback",
  "Audio Narration",
  "Unique Image for Each Verse",
];

const GENERATED = [
  {
    id: 1,
    title: "Trust in the Lord 1",
    reference: "Proverbs 3:5–6",
    description:
      "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reward: "50 pts",
    level: "Level 3",
    image: trustInLord2,
  },
  {
    id: 2,
    title: "Trust in the Lord —",
    reference: "Proverbs 3:5–6",
    description:
      "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reward: "50 pts",
    level: "Level 3",
    image: trustInLord1,
  },
];

/* ==========================================================================
   SMALL PIECES
   ========================================================================== */
function Dropdown({ value, onChange, options, ariaLabel }) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className="h-[38px] w-full cursor-pointer appearance-none rounded-lg border border-[#E5E4EC] bg-white py-0 pr-8 pl-3 text-[12px] text-[#0A0847] outline-none transition focus:border-[#041581]"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <LuChevronDown
        size={14}
        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[#0A084799]"
      />
    </div>
  );
}

function LabelledField({ label, children }) {
  return (
    <div>
      <p className={labelClass}>{label}</p>
      {children}
    </div>
  );
}

const outlineBtn =
  "flex h-[38px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#041581] bg-white px-4 text-[12px] font-semibold text-[#0A0847] transition-colors hover:bg-[#F1F1F9]";

const filledBtn =
  "flex h-[38px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#041581] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#030F63]";

function StepCircles() {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#041581] text-[10px] font-bold text-white"
        >
          {n}
        </span>
      ))}
    </div>
  );
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-[12px] font-semibold text-[#0A0847]">{label}</p>
      <Toggle checked={checked} onChange={onChange} label={label} />
    </div>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AddEditMemoryVerseAI() {
  const [testament, setTestament] = useState(TESTAMENTS[0]);
  const [book, setBook] = useState(BOOKS[0]);
  const [chapter, setChapter] = useState(CHAPTERS[0]);
  const [translation, setTranslation] = useState(TRANSLATIONS[0]);
  const [verseCount, setVerseCount] = useState(VERSE_COUNTS[1]);
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[2]);

  const [levels, setLevels] = useState(["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"]);
  const [levelMenuOpen, setLevelMenuOpen] = useState(false);

  const [createMode, setCreateMode] = useState("Existing Levels");
  const [genImages, setGenImages] = useState(true);
  const [genAudio, setGenAudio] = useState(true);

  const [selected, setSelected] = useState(GENERATED.map((g) => g.id));

  const toggleLevel = (lvl) =>
    setLevels((prev) =>
      prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [...prev, lvl],
    );

  const availableLevels = ALL_LEVELS.filter((l) => !levels.includes(l));

  const allSelected = selected.length === GENERATED.length;
  const toggleAll = () => setSelected(allSelected ? [] : GENERATED.map((g) => g.id));
  const toggleOne = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className={`${pageShellClass} min-h-[calc(100vh-72px)]`}>
      <div className={`${pageBodyClass} max-w-[1068px] space-y-5`}>
        {/* ---------------- header ---------------- */}
        <Breadcrumb items={["Bible Content", "Memory Verses", "Add / Edit"]} />

        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="text-[22px] font-bold text-[#0A0847]">Add / Edit Memory Verse</h1>

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className={outlineBtn}>
              <LuSave size={14} /> Save draft
            </button>
            <button type="button" className={outlineBtn}>
              <LuEye size={14} /> Preview
            </button>
            <button type="button" className={filledBtn}>
              <LuSend size={14} /> Publish Update
            </button>
          </div>
        </div>

        {/* ---------------- tabs ---------------- */}
        <div className="flex items-center gap-6 border-b border-[#E5E4EC]">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              className={`relative cursor-pointer pb-3 text-[13px] font-semibold transition-colors ${
                t === "AI Generate" ? "text-[#041581]" : "text-[#0A084799] hover:text-[#0A0847]"
              }`}
            >
              {t}
              {t === "AI Generate" && (
                <span className="absolute right-0 -bottom-px left-0 h-[2px] rounded-full bg-[#041581]" />
              )}
            </button>
          ))}
        </div>

        {/* ---------------- form section ---------------- */}
        <section className="rounded-xl border border-[#E5E4EC] bg-white p-6">
          <h2 className="text-[16px] font-bold text-[#0A0847]">AI Memory Verse Generator</h2>
          <p className="mt-1 text-[13px] text-[#0A084799]">
            Choose the activity type and how you want to create it.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            {/* LEFT — form fields */}
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-3 gap-4">
                <LabelledField label="Testament">
                  <Dropdown
                    value={testament}
                    onChange={setTestament}
                    options={TESTAMENTS}
                    ariaLabel="Testament"
                  />
                </LabelledField>
                <LabelledField label="Book">
                  <Dropdown value={book} onChange={setBook} options={BOOKS} ariaLabel="Book" />
                </LabelledField>
                <LabelledField label="Chapter">
                  <Dropdown
                    value={chapter}
                    onChange={setChapter}
                    options={CHAPTERS}
                    ariaLabel="Chapter"
                  />
                </LabelledField>
              </div>

              <LabelledField label="Bible Translation">
                <Dropdown
                  value={translation}
                  onChange={setTranslation}
                  options={TRANSLATIONS}
                  ariaLabel="Bible Translation"
                />
              </LabelledField>

              <div className="grid grid-cols-2 gap-4">
                <LabelledField label="Number of Memory Verses">
                  <Dropdown
                    value={verseCount}
                    onChange={setVerseCount}
                    options={VERSE_COUNTS}
                    ariaLabel="Number of Memory Verses"
                  />
                </LabelledField>
                <LabelledField label="Difficulty">
                  <Dropdown
                    value={difficulty}
                    onChange={setDifficulty}
                    options={DIFFICULTIES}
                    ariaLabel="Difficulty"
                  />
                </LabelledField>
              </div>

              {/* assigned levels */}
              <div>
                <p className={labelClass}>Assign to Levels</p>
                <div className="flex flex-wrap items-center gap-2">
                  {levels.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => toggleLevel(lvl)}
                      className={`flex h-[30px] cursor-pointer items-center gap-1.5 rounded-full border px-3 text-[11px] font-semibold transition ${
                        lvl === "Level 3"
                          ? "border-[#041581] bg-[#041581] text-white"
                          : "border-[#E5E4EC] bg-white text-[#0A0847] hover:border-[#041581]"
                      }`}
                    >
                      {lvl}
                      <LuX size={11} />
                    </button>
                  ))}

                  <div className="relative">
                    <button
                      type="button"
                      aria-label="Add level"
                      onClick={() => setLevelMenuOpen((o) => !o)}
                      className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border border-dashed border-[#041581] text-[#041581] transition hover:bg-[#F1F1F9]"
                    >
                      <LuChevronDown size={14} />
                    </button>

                    {levelMenuOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setLevelMenuOpen(false)}
                          aria-hidden
                        />
                        <div className="absolute top-9 left-0 z-20 w-[150px] rounded-lg border border-[#E5E4EC] bg-white py-1 shadow-[0_8px_24px_rgba(10,8,71,0.12)]">
                          {availableLevels.length === 0 && (
                            <p className="px-3 py-2 text-[11px] text-[#0A084799]">
                              All levels added
                            </p>
                          )}
                          {availableLevels.map((lvl) => (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() => toggleLevel(lvl)}
                              className="flex w-full cursor-pointer px-3 py-2 text-left text-[12px] text-[#0A0847] transition hover:bg-[#F7F7FC]"
                            >
                              {lvl}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* create as */}
              <div>
                <p className={labelClass}>Create as</p>
                <div className="flex items-center gap-6">
                  {["New Levels", "Existing Levels"].map((opt) => (
                    <label
                      key={opt}
                      className="flex cursor-pointer items-center gap-2 text-[12px] text-[#0A0847]"
                    >
                      <input
                        type="radio"
                        name="create-as"
                        checked={createMode === opt}
                        onChange={() => setCreateMode(opt)}
                        className="h-[14px] w-[14px] accent-[#041581]"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — AI checklist + toggles */}
            <div className="flex flex-col gap-5">
              <div>
                <p className="mb-3 text-[13px] font-bold text-[#0A0847]">AI Will Create</p>
                <ul className="flex flex-col gap-2.5">
                  {AI_CHECKLIST.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <LuCheck size={15} className="shrink-0 text-[#041581]" />
                      <span className="text-[12px] text-[#0A0847]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <ToggleRow
                  label="Generate unique AI image for every verse"
                  checked={genImages}
                  onChange={setGenImages}
                />
                <ToggleRow
                  label="Generate audio narration (optional)"
                  checked={genAudio}
                  onChange={setGenAudio}
                />
              </div>

              <button type="button" className={`${filledBtn} w-full`}>
                <LuSparkles size={15} /> Generate Memory Verses
              </button>
            </div>
          </div>
        </section>

        {/* ---------------- generated verses preview ---------------- */}
        <section className="rounded-xl border border-[#E5E4EC] bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[13px] font-bold text-[#0A0847]">AI Memory Verse Generator</p>
              <p className="mt-1 text-[12px] text-[#0A084799]">
                Review your AI-generated verses before publishing.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-[12px] text-[#0A0847]">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="h-[14px] w-[14px] accent-[#041581]"
                />
                Select all
              </label>
              <span className="text-[12px] text-[#0A084799]">{selected.length} selected</span>
              <button type="button" className={outlineBtn}>
                <LuRefreshCw size={14} /> Regenerate All
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-6">
            {GENERATED.map((v) => (
              <div key={v.id} className="border-b border-[#E5E4EC] pb-6 last:border-b-0 last:pb-0">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_168px_172px]">
                  {/* left: checkbox + thumb + meta + steps */}
                  <div className="flex gap-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(v.id)}
                      onChange={() => toggleOne(v.id)}
                      aria-label={`Select ${v.title}`}
                      className="mt-1 h-[14px] w-[14px] shrink-0 accent-[#041581]"
                    />

                    <img
                      src={v.image}
                      alt=""
                      className="h-[70px] w-[90px] shrink-0 rounded-lg bg-[#F1F2F8] object-cover"
                    />

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[13px] font-bold text-[#0A0847]">{v.title}</p>
                        <span className="rounded-full bg-[#F1F2F8] px-2 py-0.5 text-[10px] font-semibold text-[#6B668F]">
                          AI
                        </span>
                        <span className="text-[12px] italic text-[#0A084799]">{v.reference}</span>
                      </div>

                      <p className="mt-1.5 text-[12px] leading-[1.5] text-[#0A084799]">
                        {v.description}
                      </p>

                      <div className="mt-3">
                        <StepCircles />
                      </div>
                    </div>
                  </div>

                  {/* middle: reward + assigned levels */}
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-[11px] text-[#0A084799]">Reward</p>
                      <p className="mt-1 text-[13px] font-bold text-[#0A0847]">{v.reward}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#0A084799]">Assigned Levels</p>
                      <span className="mt-1.5 inline-block rounded-full bg-[#F3EEFE] px-3 py-1 text-[11px] font-semibold text-[#6D28D9]">
                        {v.level}
                      </span>
                    </div>
                  </div>

                  {/* right: 4 stacked outline buttons */}
                  <div className="flex flex-col gap-2">
                    <button type="button" className={outlineBtn}>
                      <LuPencil size={13} /> Edit
                    </button>
                    <button type="button" className={outlineBtn}>
                      <LuRefreshCw size={13} /> Regenerate Verse
                    </button>
                    <button type="button" className={outlineBtn}>
                      <LuImage size={13} /> Regenerate Image
                    </button>
                    <button type="button" className={outlineBtn}>
                      <LuRefreshCw size={13} /> Replace Image
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ---------------- bottom bar ---------------- */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E4EC] pt-5">
            <p className="flex items-center gap-2 text-[12px] text-[#0A084799]">
              <LuInfo size={15} /> {selected.length} verses selected for publishing.
            </p>
            <button type="button" className={filledBtn}>
              <LuSend size={14} /> Publish Selected
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
