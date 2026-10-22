import { useState } from "react";
import {
  LuCheck,
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
import trustInLord1 from "../../../assets/Trust in the Lord 1.webp";
import trustInLord2 from "../../../assets/Trust in the Lord 2.webp";

import icAngleDown from "../../../assets/memory-verse/ic-angle-down.svg";
import icCheckCircle from "../../../assets/memory-verse/ic-check-circle.svg";
import icRegenerateAll from "../../../assets/memory-verse/ic-regenerate-all.svg";

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
    title: "Trust in the Lord —",
    reference: "Proverbs 3:5–6",
    description:
      "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reward: "50 pts",
    level: "Level 3",
    image: trustInLord1,
  },
  {
    id: 2,
    title: "Trust in the Lord —",
    reference: "Proverbs 3:5–6",
    description:
      "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reward: "50 pts",
    level: "Level 3",
    image: trustInLord2,
  },
];

const shellClass = "min-h-[calc(100vh-72px)] bg-[#F9FAFE] font-inter text-[#0A0847]";
const bodyClass = "mx-auto w-full max-w-[1107px] px-4 py-6 sm:px-5";

const fieldLabelClass = "mb-2 block text-[12px] font-semibold leading-[15px] text-[#0A0847CC]";


const headerBtnBase =
  "flex h-[42px] cursor-pointer items-center justify-center gap-[10px] rounded-[8px] px-4 text-[14px] font-semibold leading-none transition-colors";
const headerOutlineBtn = `${headerBtnBase} border border-[#E1DFFC] bg-white text-[#0A0847] hover:bg-[#F1F1F9]`;
const headerFilledBtn = `${headerBtnBase} bg-[#001984] text-white hover:bg-[#030F63]`;


const rowBtn =
  "flex h-[28px] w-full cursor-pointer items-center justify-start gap-[10px] rounded-[7.5px] border border-[#001984] bg-white px-3 text-[12px] font-medium leading-none text-[#00198499] transition-colors hover:bg-[#F1F1F9]";


function Dropdown({ value, onChange, options, ariaLabel }) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className="h-[39px] w-full cursor-pointer appearance-none rounded-[7.5px] border border-[#E1DFFC] bg-white py-0 pr-9 pl-3 text-[12px] font-medium text-[#0A084799] outline-none transition focus:border-[#001984]"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <img
        src={icAngleDown}
        alt=""
        className="pointer-events-none absolute top-1/2 right-1.5 h-[18px] w-[18px] -translate-y-1/2"
      />
    </div>
  );
}

function LabelledField({ label, children }) {
  return (
    <div>
      <p className={fieldLabelClass}>{label}</p>
      {children}
    </div>
  );
}

function Checkbox({ checked, onChange, label }) {
  return (
    <span className="relative inline-flex h-4 w-4 shrink-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={label}
        className="peer h-4 w-4 cursor-pointer appearance-none rounded-[3px] border border-[#0A084799] bg-white checked:border-[#001984] checked:bg-[#001984]"
      />
      <LuCheck
        size={12}
        strokeWidth={3}
        className="pointer-events-none absolute top-[2px] left-[2px] hidden text-white peer-checked:block"
      />
    </span>
  );
}

function RadioDot({ checked, onChange, name }) {
  return (
    <input
      type="radio"
      name={name}
      checked={checked}
      onChange={onChange}
      className="h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-[#0A0847B3] bg-white checked:border-[#001984] checked:bg-[#001984] checked:shadow-[inset_0_0_0_3px_#fff]"
    />
  );
}

function StepCircles() {
  return (
    <div className="flex items-center gap-3">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#001984] text-[10px] font-semibold leading-none text-white"
        >
          {n}
        </span>
      ))}
    </div>
  );
}

function ToggleSwitch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-[15px] w-[26px] shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? "bg-[#0B53A6]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`absolute top-[2px] h-[11px] w-[11px] rounded-full bg-white transition-all ${
          checked ? "left-[13px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <p className="w-[179px] text-[12px] font-medium leading-[15px] text-[#0A084799]">{label}</p>
      <ToggleSwitch checked={checked} onChange={onChange} label={label} />
    </div>
  );
}


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
    <div className={shellClass}>
      <div className={bodyClass}>
        <Breadcrumb items={["Bible Content", "Memory Verses", "Add / Edit"]} />

        <div className="mt-[10px] flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-[22px] font-bold leading-[27px] text-[#0A0847]">
            Add / Edit Memory Verse
          </h1>

          <div className="flex w-full flex-wrap items-center gap-[12px] sm:w-auto sm:gap-4">
            <button type="button" className={`${headerOutlineBtn} w-full sm:w-[120px]`}>
              <LuSave size={20} /> Save draft
            </button>
            <button type="button" className={`${headerOutlineBtn} w-full sm:w-auto`}>
              <LuEye size={20} /> Preview
            </button>
            <button type="button" className={`${headerFilledBtn} w-full sm:w-[178px]`}>
              <LuSend size={20} /> Publish Update
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center border-b border-[#E1DFFC]">
          {TABS.map((t) => {
            const active = t === "AI Generate";
            return (
              <button
                key={t}
                type="button"
                className={`relative w-[144px] cursor-pointer pb-4 text-center text-[14px] leading-[17px] transition-colors ${
                  active
                    ? "font-semibold text-[#001984]"
                    : "font-medium text-[#0A084799] hover:text-[#0A0847]"
                }`}
              >
                {t}
                {active && (
                  <span className="absolute right-0 -bottom-px left-0 h-[3px] rounded-full bg-[#001984]" />
                )}
              </button>
            );
          })}
        </div>

        <section className="mt-6 flex w-full max-w-full flex-col gap-6 rounded-[7.5px] border-[0.75px] border-[#E1DFFC] bg-white pt-5 pr-[15px] pb-5 pl-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-[14px] font-semibold leading-[17px] text-[#0A0847]">
              AI Memory Verse Generator
            </h2>
            <p className="text-[12px] leading-[15px] text-[#0A084799]">
              Choose the activity type and how you want to create it.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[546px_minmax(0,1fr)]">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-[167px_188px_160px]">
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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[270px_minmax(0,1fr)]">
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

              <div>
                <p className={fieldLabelClass}>Assign to Levels</p>
                <div className="relative">
                  <div className="flex min-h-[39px] w-full flex-wrap items-center gap-3 rounded-[7.5px] border border-[#E1DFFC] bg-white py-1 pr-1.5 pl-[11px]">
                    {levels.map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => toggleLevel(lvl)}
                        className={`flex h-[26px] min-w-[74px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[8px] border px-[10px] text-[10px] font-semibold leading-none transition ${
                          lvl === "Level 3"
                            ? "border-[#001984] bg-[#001984] text-white"
                            : "border-[#E7E5EF] bg-[#F4F2FC] text-[#0A0847CC] hover:border-[#001984]"
                        }`}
                      >
                        {lvl}
                        <LuX size={10} strokeWidth={3} />
                      </button>
                    ))}

                    <button
                      type="button"
                      aria-label="Add level"
                      onClick={() => setLevelMenuOpen((o) => !o)}
                      className="ml-auto flex h-[18px] w-[18px] shrink-0 cursor-pointer items-center justify-center"
                    >
                      <img src={icAngleDown} alt="" className="h-[18px] w-[18px]" />
                    </button>
                  </div>

                  {levelMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setLevelMenuOpen(false)}
                        aria-hidden
                      />
                      <div className="absolute top-[43px] right-0 z-20 w-[150px] rounded-[7.5px] border border-[#E1DFFC] bg-white py-1 shadow-[0_8px_24px_rgba(10,8,71,0.12)]">
                        {availableLevels.length === 0 && (
                          <p className="px-3 py-2 text-[11px] text-[#0A084799]">All levels added</p>
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

              <div className="pt-1">
                <p className="mb-3 text-[14px] font-semibold leading-[17px] text-[#0A0847CC]">
                  Create as
                </p>
                <div className="flex items-center gap-[50px]">
                  {["New Levels", "Existing Levels"].map((opt) => (
                    <label
                      key={opt}
                      className="flex cursor-pointer items-center gap-[10px] text-[14px] font-medium leading-[17px] text-[#0A0847CC]"
                    >
                      <RadioDot
                        name="create-as"
                        checked={createMode === opt}
                        onChange={() => setCreateMode(opt)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-6 lg:flex-row">
              <div className="flex h-auto min-h-[331px] w-full max-w-[201px] shrink-0 flex-col gap-3 rounded-[7.5px] border-[0.75px] border-[#E1DFFC] bg-white pt-3 pr-3 pb-3 pl-3 lg:w-[201px]">
                <p className="text-[14px] font-semibold leading-[17px] text-[#0A0847CC]">
                  AI Will Create
                </p>
                <ul className="flex flex-col gap-[14px]">
                  {AI_CHECKLIST.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <img src={icCheckCircle} alt="" className="h-5 w-5 shrink-0" />
                      <span className="pt-[2.5px] text-[12px] font-semibold leading-[15px] text-[#0A084799]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex w-full min-w-0 flex-col gap-[18px] lg:w-[224px]">
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

                <button
                  type="button"
                  className="mt-3 flex h-[35px] w-full cursor-pointer items-center justify-center gap-2 rounded-[7.5px] bg-[#001984] text-[12px] font-semibold leading-none text-white transition-colors hover:bg-[#030F63]"
                >
                  <LuSparkles size={12} /> Generate Memory Verses
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 w-[1065px] max-w-full overflow-hidden rounded-[7.5px] border-[0.75px] border-[#E1DFFC] bg-white">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-[#F2F5FC] pt-[19px] pr-[26px] pb-[19px] pl-5">
            <div className="flex flex-col gap-1">
              <p className="text-[14px] font-semibold leading-[17px] text-[#0A0847]">
                AI Memory Verse Generator
              </p>
              <p className="text-[12px] leading-[15px] text-[#0A084799]">
                Review your AI-generated verses before publishing.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex cursor-pointer items-center gap-2 text-[12px] font-medium leading-[15px] text-[#0A0847CC]">
                <Checkbox checked={allSelected} onChange={toggleAll} label="Select all" />
                Select all
              </label>
              <span className="text-[12px] font-medium leading-[15px] text-[#0A0847CC]">
                {selected.length} selected
              </span>
              <button
                type="button"
                className="flex h-[38px] cursor-pointer items-center justify-center gap-2 rounded-[7.5px] border border-[#E1DFFC] bg-white px-4 text-[12px] font-medium leading-none text-[#0A0847CC] transition-colors hover:bg-[#F1F1F9]"
              >
                <img src={icRegenerateAll} alt="" className="h-[11px] w-[10px]" />
                Regenerate All
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6 px-[25px] pt-5 pb-5">
            {GENERATED.map((v) => (
              <div
                key={v.id}
                className="border-b border-[#F1F1F1] pb-6 last:border-b-0 last:pb-0"
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[481px_217px_minmax(0,1fr)] lg:gap-0">
                  <div className="flex gap-[10px]">
                    <Checkbox
                      checked={selected.includes(v.id)}
                      onChange={() => toggleOne(v.id)}
                      label={`Select ${v.title}`}
                    />

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <img
                        src={v.image}
                        alt=""
                        className="h-[95px] w-full max-w-[129px] shrink-0 rounded-[6px] bg-[#F1F2F8] object-cover sm:w-[129px]"
                      />

                      <div className="w-full min-w-0 sm:w-[244px]">
                        <div className="flex items-center gap-2.5">
                          <p className="text-[12px] font-semibold leading-[15px] text-[#0A0847CC]">
                            {v.title}
                          </p>
                          <span className="rounded-[4px] bg-[#E7EAF5] px-2 py-[2px] text-[10px] font-medium leading-3 text-[#0A084799]">
                            AI
                          </span>
                        </div>

                        <p className="mt-3 text-[10px] font-semibold italic leading-3 text-[#0A084799]">
                          {v.reference}
                        </p>

                        <p className="mt-[6px] text-[10px] font-medium leading-[12.5px] text-[#0A084799]">
                          {v.description}
                        </p>

                        <div className="mt-2">
                          <StepCircles />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[15px] lg:border-x lg:border-[#E5E5E5] lg:pl-[62px]">
                    <div>
                      <p className="text-[10px] font-medium leading-3 text-[#0A084799]">Reward</p>
                      <p className="mt-[2px] text-[16px] font-medium leading-5 text-[#0A0847CC]">
                        {v.reward}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium leading-3 text-[#0A084799]">
                        Assigned Levels
                      </p>
                      <span className="mt-2 inline-flex h-6 w-[92px] items-center justify-center rounded-[8px] border border-[#E7E5EF] bg-[#F4F2FC] text-[10px] font-medium leading-none text-[#0A0847CC]">
                        {v.level}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 lg:pl-[62px]">
                    <button type="button" className={rowBtn}>
                      <LuPencil size={14} /> Edit
                    </button>
                    <button type="button" className={rowBtn}>
                      <LuRefreshCw size={14} /> Regenerate Verse
                    </button>
                    <button type="button" className={rowBtn}>
                      <LuImage size={14} /> Regenerate Image
                    </button>
                    <button type="button" className={rowBtn}>
                      <LuRefreshCw size={14} /> Replace Image
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t-[0.75px] border-[#E1DFFC] bg-[#F2F5FC] pt-[19px] pr-[26px] pb-[19px] pl-5">
            <p className="flex items-center gap-2 text-[14px] font-medium leading-[17px] text-[#0A084799]">
              <LuInfo size={18} /> {selected.length} verses selected for publishing.
            </p>
            <button type="button" className={`${headerFilledBtn} w-[178px]`}>
              <LuSend size={20} /> Publish Selected
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}