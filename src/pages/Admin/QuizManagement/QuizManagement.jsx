import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuCircleHelp,
  LuCopy,
  LuEllipsisVertical,
  LuEye,
  LuFileSearch,
  LuFilter,
  LuHeadphones,
  LuInfo,
  LuPencil,
  LuPlus,
  LuSave,
  LuScrollText,
  LuSearch,
  LuSettings,
  LuSparkles,
  LuUpload,
} from "react-icons/lu";
import { FaTrash } from "react-icons/fa6";
import bibleVerseImg from "../../../assets/quiz-management/Bible Verse img.webp";
import floppyIcon from "../../../assets/mystery-card/icon-floppy.svg";

const PANEL = "rounded-[7.5px] border-[0.75px] border-[#E2DFFC] bg-white";
const CARD = "rounded-[8px] border border-[#E2DFFC] bg-white";
const OUTLINE_BTN =
  "flex cursor-pointer items-center rounded-[8px] border border-[#0A0847] bg-[#FEFEFE] text-[14px] font-semibold text-[#0A0847]";
const FIELD =
  "w-full appearance-none rounded-[7.47px] border border-[#E2DFFC] bg-white pl-[12px] pr-[50px] text-[12px] font-medium text-[#0A0847] outline-none";

const nextId = () => Date.now();


const LOCATION_SELECTORS = [
  { step: "1", label: "Testament", value: "Old Testament" },
  { step: "2", label: "Book", value: "Genesis" },
  { step: "3", label: "Chapter", value: "Chapter 1" },
];

const ACTIVITY_CARDS = [
  {
    title: "Quiz",
    description: "Test knowledge with different question types.",
    count: "42 Questions",
    tileBg: "rgba(98,9,253,0.10)",
    iconColor: "#6209FD",
    Glyph: LuCircleHelp,
  },
  {
    title: "Word Search",
    description: "Find hidden words from the chapter.",
    count: "12 Puzzles",
    tileBg: "#E6F6EA",
    iconColor: "#2E9E3E",
    Glyph: LuFileSearch,
  },
  {
    title: "Audio Stories",
    description: "Listen to engaging Bible stories.",
    count: "5 Stories",
    tileBg: "#E0F6F8",
    iconColor: "#1E88C7",
    Glyph: LuHeadphones,
  },
  {
    title: "Memory Verses",
    description: "Learn and memorize key Bible verses.",
    count: "8 Verses",
    tileBg: "#FBEBDD",
    iconColor: "#D9722B",
    Glyph: LuScrollText,
  },
];

const LEVEL_TABS = [
  { line1: "Level 1", line2: "( 12 Qs)", count: 12, active: true },
  { line1: "Level 2", line2: "(12 Qs)", count: 12, active: false },
  { line1: "Level 3", line2: "(12 Qs)", count: 12, active: false },
  { line1: "Level 4", line2: "6 Qs", count: 6, active: false },
];

const TYPE_PILL = {
  "Multiple Choice": { bg: "#F0E6FA", border: "#D9C5F0", fg: "#6B2FB3" },
  "Fill in the Blank": { bg: "#E6F6EA", border: "#BFE3C7", fg: "#2E9E3E" },
  "True / False": { bg: "#E3F2FB", border: "#BFDDF2", fg: "#1E88C7" },
  "Tap in Order": { bg: "#FBEBDD", border: "#F2CFB0", fg: "#D9722B" },
  "Who Am I": { bg: "#F0E6FA", border: "#D9C5F0", fg: "#6B2FB3" },
};

const DIFFICULTY = {
  Easy: { bg: "#E6F6EA", fg: "#2E9E3E" },
  Medium: { bg: "#FBEBDD", fg: "#D9722B" },
  Hard: { bg: "#FBE3E8", fg: "#D1264A" },
};

const STATUS = {
  Published: { bg: "#E6F6EA", fg: "#2E9E3E" },
  Draft: { bg: "#FBEBDD", fg: "#D9722B" },
};

const TABLE_ROWS = [
  {
    id: 1,
    level: 1,
    question: "What did the serpent say to the woman in the garden?",
    type: "Multiple Choice",
    verse: "Genesis 3:1",
    difficulty: "Easy",
    status: "Published",
  },
  {
    id: 2,
    level: 1,
    question: "Fill in the blank: The woman saw that the tree was ______",
    type: "Fill in the Blank",
    verse: "Genesis 3:6",
    difficulty: "Medium",
    status: "Published",
  },
  {
    id: 3,
    level: 1,
    question: "Is it true that Adam blamed Eve for eating the fruit?",
    type: "True / False",
    verse: "Genesis 3:12",
    difficulty: "Easy",
    status: "Published",
  },
  {
    id: 4,
    level: 1,
    question:
      "Place the events in order: 1. Serpent talks to Eve, 2. Eve eats the fruit, 3. Adam eats the fruit",
    type: "Tap in Order",
    verse: "Genesis 3:1–6",
    difficulty: "Hard",
    status: "Draft",
  },
  {
    id: 5,
    level: 1,
    question: "Who am I? I was created from Adam's rib.",
    type: "Who Am I",
    verse: "Genesis 2:22",
    difficulty: "Easy",
    status: "Published",
  },
];

const COLUMNS = [
  { key: "id", label: "#", width: "7.06%", align: "center" },
  { key: "question", label: "Question", width: "15.64%", align: "left" },
  { key: "type", label: "Type", width: "17.18%", align: "center" },
  { key: "verse", label: "Bible Verse", width: "12.73%", align: "center" },
  { key: "difficulty", label: "Difficulty", width: "13.04%", align: "center" },
  { key: "image", label: "Image", width: "9.2%", align: "center" },
  { key: "status", label: "Status", width: "13.8%", align: "center" },
  { key: "actions", label: "Actions", width: "11.35%", align: "center" },
];


function Chevron({ className = "" }) {
  return (
    <svg
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill="none"
      aria-hidden
      className={`pointer-events-none shrink-0 ${className}`}
    >
      <path
        d="M1 1l3 3 3-3"
        stroke="#0A0847"
        strokeOpacity="0.6"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Select({ value, className = "", options = [], onChange, fit = false }) {
  const selectProps = onChange ? { value, onChange } : { defaultValue: value };
  const sizeClass = fit ? "h-[36px] w-auto max-w-full !pr-[34px]" : "h-full";

  return (
    <div className={`relative ${className}`}>
      <select
        aria-label={value}
        className={`${FIELD} cursor-pointer whitespace-nowrap ${sizeClass}`}
        {...selectProps}
      >
        {options.length > 0 ? (
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        ) : (
          <option value={value}>{value}</option>
        )}
      </select>
      <Chevron className={`absolute top-1/2 -translate-y-1/2 ${fit ? "right-[12px]" : "right-[20px]"}`} />
    </div>
  );
}

function Toggle() {
  return (
    <span className="flex h-[13px] w-[24px] shrink-0 items-center rounded-full bg-[#1565C0] px-[2px]">
      <span className="h-[9px] w-[9px] translate-x-[11px] rounded-full bg-white" />
    </span>
  );
}

function StatBlock({ label, value, withInfo = false }) {
  return (
    <div className="flex flex-col gap-[12px]">
      <span className="flex items-center gap-[5px] text-[12px] leading-[15px] font-medium text-[#0A0847]/60">
        {label}
        {withInfo && <LuInfo size={13} className="text-[#0A0847]/60" />}
      </span>
      <span className="text-[14px] leading-[17px] font-semibold text-[#0A0847]">{value}</span>
    </div>
  );
}

function ActionTile({ className, icon, title, caption, titleClass, captionClass, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[62px] w-[131px] cursor-pointer flex-col justify-center gap-[4px] rounded-[8px] border p-[12px] text-left ${className}`}
    >
      <span className={`flex items-center gap-[6px] text-[10px] leading-[12px] font-semibold ${titleClass}`}>
        {icon}
        {title}
      </span>
      <span className={`text-[10px] leading-[12px] font-normal italic ${captionClass}`}>{caption}</span>
    </button>
  );
}

function FieldLabel({ children, required = false }) {
  return (
    <label className="block text-[14px] leading-[17px] font-medium text-[#0A0847]">
      {children}
      {required && <span className="font-bold text-[#D80027]"> *</span>}
    </label>
  );
}

const DETAIL_FIELD =
  "h-[45px] w-full appearance-none rounded-[7.47px] border border-[#E2DFFC] bg-white pl-[12px] pr-[50px] text-[12px] font-medium text-[#0A0847] outline-none";
const DETAIL_AREA =
  "w-full resize-none rounded-[7.47px] border border-[#E2DFFC] bg-white px-[12px] py-[10px] text-[12px] font-medium text-[#0A0847] outline-none";
const COUNTER = "flex justify-end text-[12px] leading-[15px] font-medium italic text-[#0A0847]/60";


export default function QuizManagement() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(TABLE_ROWS);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedQuestionId, setSelectedQuestionId] = useState(TABLE_ROWS[0]?.id ?? null);
  const [openMenu, setOpenMenu] = useState(null);
  const [page, setPage] = useState(1);
  const [correctOption, setCorrectOption] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [questionTypeFilter, setQuestionTypeFilter] = useState("All Question Types");
  const [difficultyFilter, setDifficultyFilter] = useState("All Difficulties");
  const [statusFilter, setStatusFilter] = useState("All Status");

  useEffect(() => {
    const handleOutsideClick = () => setOpenMenu(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const filteredQuestions = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return questions.filter((question) => {
      const matchesSearch =
        !query ||
        question.question.toLowerCase().includes(query) ||
        question.verse.toLowerCase().includes(query);
      const matchesType =
        questionTypeFilter === "All Question Types" || question.type === questionTypeFilter;
      const matchesDifficulty =
        difficultyFilter === "All Difficulties" || question.difficulty === difficultyFilter;
      const matchesStatus = statusFilter === "All Status" || question.status === statusFilter;

      return matchesSearch && matchesType && matchesDifficulty && matchesStatus;
    });
  }, [questions, searchTerm, questionTypeFilter, difficultyFilter, statusFilter]);

  const currentLevelQuestions = questions.filter((question) => question.level === selectedLevel);
  const selectedQuestion =
    questions.find((question) => question.id === selectedQuestionId) ?? currentLevelQuestions[0];

  const handleAddQuestion = () => {
    const nextLevelId = nextId();
    const newQuestion = {
      id: nextLevelId,
      level: selectedLevel,
      question: "New custom question for this level.",
      type: "Multiple Choice",
      verse: "Genesis 1:1",
      difficulty: "Easy",
      status: "Draft",
    };

    setQuestions((current) => [newQuestion, ...current]);
    setSelectedQuestionId(nextLevelId);
  };

  const handleDuplicateQuestion = (questionId) => {
    const target = questions.find((question) => question.id === questionId);
    if (!target) return;

    const duplicate = {
      ...target,
      id: nextId(),
      question: `${target.question} (Copy)`,
      status: "Draft",
    };

    setQuestions((current) => [duplicate, ...current]);
    setSelectedQuestionId(duplicate.id);
    setOpenMenu(null);
  };

  const handleDeleteQuestion = (questionId) => {
    setQuestions((current) => current.filter((question) => question.id !== questionId));
    setOpenMenu(null);

    const remaining = questions.filter((question) => question.id !== questionId);
    if (remaining.length > 0) {
      setSelectedQuestionId(remaining[0].id);
    }
  };

  const handlePublish = () => {
    setQuestions((current) =>
      current.map((question) =>
        question.level === selectedLevel ? { ...question, status: "Published" } : question,
      ),
    );
  };

  const updateSelected = (patch) =>
    setQuestions((current) =>
      current.map((question) =>
        question.id === selectedQuestion.id ? { ...question, ...patch } : question,
      ),
    );

  return (
    <div className="min-h-screen w-full bg-[#F8F8FF] p-6 font-inter">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[22px] leading-[27px] font-semibold text-[#0A0847]">
            Bible Book Activities Manager
          </h1>
          <p className="mt-[8px] text-[16px] leading-[19px] font-medium text-[#0A0847]/60">
            Manage questions and activities for each chapter.
          </p>
        </div>

        <div className="flex items-center gap-[16px]">
          <button
            type="button"
            className={`${OUTLINE_BTN} h-[42px] gap-[10px] px-[16px] text-[#0A0847]/80`}
          >
            <LuEye size={17} strokeWidth={1.8} />
            Preview as User
          </button>
          <button
            type="button"
            className="flex h-[42px] cursor-pointer items-center gap-[10px] rounded-[8px] bg-[#001984] px-[16px] text-[14px] font-semibold text-white"
            onClick={handlePublish}
          >
            <LuSave size={20} strokeWidth={1.6} className="text-white/90" />
            Publish Topic
          </button>
        </div>
      </div>

      <div className="mt-[24px] flex gap-[18px]">
        <div className={`flex h-[93px] min-w-0 flex-[727_1_0px] items-center pl-[24px] ${PANEL}`}>
          {LOCATION_SELECTORS.map((s, i) => (
            <div
              key={s.step}
              className={`relative flex h-[33px] w-[184px] shrink-0 flex-col justify-between ${
                i < LOCATION_SELECTORS.length - 1 ? "mr-[24px] border-r border-[#F2F2F2]" : ""
              }`}
            >
              <span className="flex items-center gap-[6px]">
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#001984] text-[12px] font-semibold text-white">
                  {s.step}
                </span>
                <span className="text-[12px] leading-[15px] font-medium text-[#0A0847]/60">{s.label}</span>
              </span>
              <span className="text-[14px] leading-[17px] font-semibold text-[#0A0847]/80">{s.value}</span>
              <Chevron className="absolute top-[24px] right-[21px]" />
            </div>
          ))}
        </div>

        <div className={`flex h-[93px] min-w-0 flex-[321_1_0px] flex-col gap-[10px] p-[16px] ${PANEL}`}>
          <p className="text-[12px] leading-[15px] font-semibold text-[#0A0847]">Select Location</p>
          <p className="text-[12px] leading-[15px] font-medium text-[#0A0847]/60">
            Bible Content &gt; <span className="font-semibold text-[#0A0847]">Genesis</span> &gt;{" "}
            <span className="font-semibold text-[#0A0847]">Chapter 1</span> &gt; Quiz
          </p>
          <p className="text-[12px] leading-[15px] font-medium text-[#0A0847]/60">
            Total Activities: <span className="font-semibold text-[#0A0847]">4</span> • Total Questions:{" "}
            <span className="font-semibold text-[#0A0847]">42</span>
          </p>
        </div>
      </div>

      <div className="mt-[24px] flex gap-[18px]">
        <div className="flex min-w-0 flex-[726_1_0px] flex-col">
          <div className="flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[14px] leading-[17px] font-semibold text-[#0A0847]">Chapter Activities</h2>
                <p className="mt-[8px] text-[12px] leading-[15px] font-medium text-[#0A0847]/60">
                  Enable or disable activities for this chapter.
                </p>
              </div>
              <button type="button" className={`${OUTLINE_BTN} h-[40px] px-[16.5px]`}>
                Manage All Activities
              </button>
            </div>

            <div className="mt-[16px] grid grid-cols-4 gap-[14px]">
              {ACTIVITY_CARDS.map((a) => (
                <div
                  key={a.title}
                  className="flex h-[111px] flex-col gap-[10px] rounded-[8px] border border-[#E2DFFC] bg-[#FEFEFE] p-[8px]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-[4px]">
                      <span
                        className="flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-[8px] p-[7px]"
                        style={{ background: a.tileBg }}
                      >
                        <a.Glyph size={18} style={{ color: a.iconColor }} />
                      </span>
                      <span className="text-[14px] leading-[17px] font-semibold text-[#0A0847]">{a.title}</span>
                    </div>
                    <Toggle />
                  </div>

                  <p className="max-w-[158px] pl-[33px] text-[10px] leading-[1.3] font-semibold text-[#0A0847]/60">
                    {a.description}
                  </p>

                  <p className="mt-auto text-[10px] leading-[12px] font-normal italic text-[#0A0847]/60">
                    {a.count}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`mt-[24px] flex min-h-[1028px] flex-1 flex-col gap-[24px] p-[20px] ${CARD}`}
          >
            <div>
              <h2 className="text-[14px] leading-[17px] font-semibold text-[#0A0847]">Quiz Level Manager</h2>
              <p className="mt-[8px] text-[12px] leading-[15px] font-medium text-[#0A0847]/60">
                Each level contains many questions. Three questions will appear to users per level.
              </p>
            </div>

            <div className="flex items-center">
              <div className="w-[143px]">
                <StatBlock
                  label={`Questions in Level ${selectedLevel}`}
                  value={String(LEVEL_TABS[selectedLevel - 1]?.count ?? 0)}
                />
              </div>
              <span className="h-[36px] w-px bg-[#E2DFFC]" />
              <div className="ml-[32px] w-[143px]">
                <StatBlock label={`Questions in Level ${selectedLevel}`} value="3" withInfo />
              </div>
              <span className="h-[36px] w-px bg-[#E2DFFC]" />
              <button
                type="button"
                className={`${OUTLINE_BTN} ml-[32px] h-[40px] gap-[8px] border-[#001984] px-[22px] text-[#0A0847]/80`}
              >
                <LuSettings size={16} strokeWidth={1.8} className="text-[#001984]" />
                Level Settings
              </button>
            </div>

            <div className="flex gap-[12px]">
              {LEVEL_TABS.map((tab) => {
                const isActive = LEVEL_TABS.indexOf(tab) + 1 === selectedLevel;

                return (
                  <button
                    key={tab.line1}
                    type="button"
                    onClick={() => {
                      const nextLevel = LEVEL_TABS.indexOf(tab) + 1;
                      setSelectedLevel(nextLevel);
                      setOpenMenu(null);
                      const firstQuestion = questions.find((question) => question.level === nextLevel);
                      if (firstQuestion) setSelectedQuestionId(firstQuestion.id);
                    }}
                    className={`flex h-[58px] w-[100px] cursor-pointer flex-col items-start justify-center rounded-[8px] p-[8px] text-left text-[14px] font-semibold leading-[17px] ${
                      isActive
                        ? "bg-[#001984] text-white"
                        : "border border-[#E2DFFC] bg-[#F9F8FF] text-[#0A0847]"
                    }`}
                  >
                    <span>{tab.line1}</span>
                    <span>{tab.line2}</span>
                  </button>
                );
              })}
              <button
                type="button"
                className="flex h-[58px] w-[113px] cursor-pointer items-center justify-center gap-[10px] rounded-[8px] border-[1.5px] border-dashed border-[#001984] bg-[#FEFEFE] p-[8px] text-[12px] font-semibold text-[#0A0847]"
              >
                <LuPlus size={16} strokeWidth={2} />
                Add Level
              </button>
            </div>

            <div className={`flex flex-1 flex-col gap-[14px] p-[20px] ${CARD}`}>
              <div className="flex items-start justify-between gap-[10px]">
                <div className="min-w-0 max-w-[300px] flex-1">
                  <h3 className="text-[14px] leading-[17px] font-semibold text-[#0A0847]">
                    Questions in Level {selectedLevel}
                  </h3>
                  <p className="mt-[8px] text-[12px] leading-[15px] font-medium text-[#0A0847]/60">
                    Manage questions for this level. Only 3 random questions will be shown to users.
                  </p>
                </div>

                <div className="ml-auto flex shrink-0 gap-[4px]">
                  <ActionTile
                    className="border-[#E1ECE3] bg-[#F0F7F1]"
                    icon={<LuPlus size={14} strokeWidth={2.2} />}
                    title="Add Question"
                    caption="Add one question at a time"
                    titleClass="text-[#2BA452]"
                    captionClass="text-[#0A0847]/60"
                    onClick={handleAddQuestion}
                  />
                  <ActionTile
                    className="border-[#DCDDF0] bg-[#EFF1FB]"
                    icon={<LuUpload size={14} strokeWidth={2} />}
                    title="Bulk Upload"
                    caption="Add one question at a time"
                    titleClass="text-[#0052B4]"
                    captionClass="text-[#0A0847]/60"
                  />
                  <ActionTile
                    className="border-[#001984] bg-[#001984]"
                    icon={<LuSparkles size={14} strokeWidth={2} />}
                    title="Generate AI Image"
                    caption="Create new questions & images"
                    titleClass="text-white"
                    captionClass="text-white/80"
                    onClick={() => navigate("/admin/quiz-management/ai-generator")}
                  />
                </div>
              </div>

              <div className="h-px w-full bg-[#EEF0F8]" />

              <div className="flex min-h-[42px] flex-wrap items-center gap-[10px]">
                <div className="relative h-[42px] w-[174px] shrink-0">
                  <LuSearch
                    size={15}
                    className="pointer-events-none absolute top-1/2 left-[12px] -translate-y-1/2 text-[#0A0847]/60"
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search questions..."
                    className="h-full w-full rounded-[7.47px] border border-[#E2DFFC] bg-white pr-[12px] pl-[34px] text-[12px] font-medium text-[#0A0847] outline-none placeholder:text-[#0A0847]/60"
                  />
                </div>

                <Select
                  fit
                  value={questionTypeFilter}
                  className="shrink-0"
                  options={[
                    { value: "All Question Types", label: "All Question Types" },
                    { value: "Multiple Choice", label: "Multiple Choice" },
                    { value: "Fill in the Blank", label: "Fill in the Blank" },
                    { value: "True / False", label: "True / False" },
                    { value: "Tap in Order", label: "Tap in Order" },
                    { value: "Who Am I", label: "Who Am I" },
                  ]}
                  onChange={(event) => setQuestionTypeFilter(event.target.value)}
                />
                <Select
                  fit
                  value={difficultyFilter}
                  className="shrink-0"
                  options={[
                    { value: "All Difficulties", label: "All Difficulties" },
                    { value: "Easy", label: "Easy" },
                    { value: "Medium", label: "Medium" },
                    { value: "Hard", label: "Hard" },
                  ]}
                  onChange={(event) => setDifficultyFilter(event.target.value)}
                />
                <Select
                  fit
                  value={statusFilter}
                  className="shrink-0"
                  options={[
                    { value: "All Status", label: "All Status" },
                    { value: "Published", label: "Published" },
                    { value: "Draft", label: "Draft" },
                  ]}
                  onChange={(event) => setStatusFilter(event.target.value)}
                />

                <button
                  type="button"
                  className="flex h-[36px] shrink-0 cursor-pointer items-center gap-[8px] rounded-[8px] border border-[#E2DFFC] bg-[#001984]/10 px-[12px] text-[12px] font-semibold whitespace-nowrap text-[#0A0847]"
                >
                  <LuFilter size={13} strokeWidth={2} className="text-[#001984]" />
                  Filters
                </button>
              </div>

              <table className="w-full table-fixed border-collapse">
                <colgroup>
                  {COLUMNS.map((c) => (
                    <col key={c.key} style={{ width: c.width }} />
                  ))}
                </colgroup>

                <thead>
                  <tr>
                    {COLUMNS.map((c) => (
                      <th
                        key={c.key}
                        className={`h-[50px] bg-[#F3F4FC] px-[16px] text-[14px] font-medium whitespace-nowrap text-[#0A0847] first:rounded-l-[6px] last:rounded-r-[6px] ${
                          c.align === "left" ? "text-left" : "text-center"
                        }`}
                      >
                        {c.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((r) => {
                      const type = TYPE_PILL[r.type];
                      const diff = DIFFICULTY[r.difficulty];
                      const st = STATUS[r.status];
                      return (
                        <tr
                          key={r.id}
                          className={`cursor-pointer transition-colors ${
                            selectedQuestionId === r.id ? "bg-[#F5F3FF]" : "bg-white"
                          }`}
                          onClick={() => setSelectedQuestionId(r.id)}
                        >
                          <td className="h-[81px] border-b-[0.75px] border-[#E2DFFC] px-[16px] text-center text-[12px] font-medium text-[#0A0847]">
                            {r.id}
                          </td>
                          <td className="h-[81px] border-b-[0.75px] border-[#E2DFFC] px-[16px] text-[10px] font-medium text-[#0A0847]">
                            {r.question}
                          </td>
                          <td className="h-[81px] border-b-[0.75px] border-[#E2DFFC] px-[16px] text-center">
                            <span
                              className="inline-block rounded-[6px] border px-[6px] py-[4px] text-[10px] leading-[12px] font-medium"
                              style={{
                                background: type.bg,
                                borderColor: type.border,
                                color: type.fg,
                              }}
                            >
                              {r.type}
                            </span>
                          </td>
                          <td className="h-[81px] border-b-[0.75px] border-[#E2DFFC] px-[16px] text-center text-[10px] font-medium whitespace-nowrap text-[#0A0847]">
                            {r.verse}
                          </td>
                          <td className="h-[81px] border-b-[0.75px] border-[#E2DFFC] px-[16px] text-center whitespace-nowrap">
                            <span
                              className="inline-block rounded-[6px] px-[6px] py-[4px] text-[10px] leading-[12px] font-medium"
                              style={{ background: diff.bg, color: diff.fg }}
                            >
                              {r.difficulty}
                            </span>
                          </td>
                          <td className="h-[81px] border-b-[0.75px] border-[#E2DFFC] px-[16px]">
                            <img
                              src={bibleVerseImg}
                              alt="Question illustration"
                              className="mx-auto h-[30px] w-[54px] max-w-none rounded-[4px] object-cover"
                            />
                          </td>
                          <td className="h-[81px] border-b-[0.75px] border-[#E2DFFC] px-[16px] text-center whitespace-nowrap">
                            <span
                              className="inline-block rounded-[6px] px-[6px] py-[4px] text-[10px] leading-[12px] font-medium"
                              style={{ background: st.bg, color: st.fg }}
                            >
                              {r.status}
                            </span>
                          </td>
                          <td className="h-[81px] border-b-[0.75px] border-[#E2DFFC] px-[16px]">
                            <div className="relative flex justify-center">
                              <button
                                type="button"
                                aria-label="Row actions"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setOpenMenu(openMenu === r.id ? null : r.id);
                                }}
                                className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] bg-[#E6E8F7]"
                              >
                                <LuEllipsisVertical size={17} className="text-[#0A0847]" />
                              </button>

                              {openMenu === r.id && (
                                <div className="absolute top-[34px] right-0 z-20 flex w-[104px] flex-col gap-[10px] rounded-[4px] border border-[#E2DFFC] bg-white p-[12px]">
                                  <button
                                    type="button"
                                    className="flex cursor-pointer items-center gap-[8px] text-[12px] font-medium text-[#0A0847]"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      setSelectedQuestionId(r.id);
                                      setOpenMenu(null);
                                    }}
                                  >
                                    <LuPencil size={14} strokeWidth={1.8} />
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    className="flex cursor-pointer items-center gap-[8px] text-[12px] font-medium text-[#0A0847]"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      handleDuplicateQuestion(r.id);
                                    }}
                                  >
                                    <LuCopy size={14} strokeWidth={1.8} />
                                    Duplicate
                                  </button>
                                  <button
                                    type="button"
                                    className="flex cursor-pointer items-center gap-[8px] text-[12px] font-medium text-[#D80027]"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      handleDeleteQuestion(r.id);
                                    }}
                                  >
                                    <FaTrash size={13} />
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={COLUMNS.length}
                        className="py-[20px] text-center text-[12px] font-medium text-[#0A0847]/60"
                      >
                        No questions match your current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-[12px] text-[#0A0847]">
              <div className="flex items-center gap-[8px]">
                <span className="font-medium">Display</span>
                <div className="relative h-[24px] w-[40px]">
                  <select
                    aria-label="Rows per page"
                    defaultValue="10"
                    className="h-full w-full cursor-pointer appearance-none rounded-[3px] border border-[#D2D2D2] bg-white pl-[10px] text-[12px] font-medium text-[#0A0847] outline-none"
                  >
                    <option>10</option>
                  </select>
                </div>
                <span className="font-normal">questions.</span>
              </div>

              <div className="flex items-center gap-[6px]">
                <button
                  type="button"
                  aria-label="Previous page"
                  disabled={page === 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  className="flex h-[24px] w-[25px] cursor-pointer items-center justify-center rounded-[3px] border border-[#E2DFFC] bg-white text-[12px] font-medium text-[#0A0847] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {"<"}
                </button>
                {[1, 2, 3, 4, 5].map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`flex h-[24px] w-[25px] cursor-pointer items-center justify-center rounded-[3px] text-[12px] font-medium ${
                      page === pageNumber
                        ? "bg-[#001984] text-white"
                        : "border border-[#E2DFFC] bg-white text-[#0A0847]"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  type="button"
                  aria-label="Next page"
                  disabled={page === 5}
                  onClick={() => setPage((current) => Math.min(5, current + 1))}
                  className="flex h-[24px] w-[25px] cursor-pointer items-center justify-center rounded-[3px] border border-[#E2DFFC] bg-white text-[12px] font-medium text-[#0A0847] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-[321_1_0px]">
          <div className={`flex h-full flex-col gap-[10px] p-[16px] ${PANEL}`}>
            <p className="text-[14px] leading-[17px] font-semibold text-[#0A0847]">Question Details</p>
            <p className="text-[12px] leading-[15px] font-medium text-[#0A0847]/60">Edit the selected question.</p>
            <div className="h-[110px]" />
            {selectedQuestion ? (
              <div className="flex flex-col gap-[12px]">
                <div className="flex flex-col gap-[8px]">
                  <FieldLabel>Question Type</FieldLabel>
                  <div className="relative">
                    <select
                      value={selectedQuestion.type}
                      onChange={(event) => updateSelected({ type: event.target.value })}
                      className={DETAIL_FIELD}
                    >
                      {Object.keys(TYPE_PILL).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <Chevron className="absolute top-1/2 right-[20px] -translate-y-1/2" />
                  </div>
                </div>

                <div className="flex flex-col gap-[8px]">
                  <FieldLabel required>Question Text</FieldLabel>
                  <textarea
                    value={selectedQuestion.question}
                    onChange={(event) => updateSelected({ question: event.target.value })}
                    rows={3}
                    className={DETAIL_AREA}
                  />
                  <div className={COUNTER}>0 / 500</div>
                </div>

                <div className="flex flex-col gap-[8px]">
                  <FieldLabel required>Options</FieldLabel>
                  <div className="flex flex-col gap-[10px]">
                    {[
                      "A. You will surely die.",
                      "B. You will not surely die.",
                      "C. God is watching you.",
                      "D. This fruit is not for you.",
                    ].map((option, index) => (
                      <div key={option} className="flex items-center gap-[12px]">
                        <button
                          type="button"
                          role="radio"
                          aria-checked={correctOption === index}
                          aria-label={option}
                          onClick={() => setCorrectOption(index)}
                          className={`flex h-[20px] w-[20px] shrink-0 cursor-pointer items-center justify-center rounded-full border-2 ${
                            correctOption === index ? "border-[#2BA452]" : "border-[#0A0847]/60"
                          }`}
                        >
                          {correctOption === index && (
                            <span className="h-[10px] w-[10px] rounded-full bg-[#2BA452]" />
                          )}
                        </button>
                        <div className="flex h-[44px] w-[201px] shrink-0 items-center rounded-[8px] border border-[#E2DFFC] bg-white py-[7px] pr-[15px] pl-[11px]">
                          <span className="text-[12px] font-medium text-[#0A0847]">{option}</span>
                        </div>
                        <button
                          type="button"
                          aria-label="Delete option"
                          className="flex shrink-0 cursor-pointer items-center justify-center text-[#D80027]"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-center gap-[6px] text-[14px] font-semibold text-[#0A0847]"
                  >
                    <span className="text-[16px]">+</span> Add Option
                  </button>
                </div>

                <div className="flex flex-col gap-[8px]">
                  <FieldLabel>Correct Answer</FieldLabel>
                  <div className="relative">
                    <select defaultValue="B" className={DETAIL_FIELD}>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                    <Chevron className="absolute top-1/2 right-[20px] -translate-y-1/2" />
                  </div>
                </div>

                <div className="flex flex-col gap-[8px]">
                  <FieldLabel>Explanation</FieldLabel>
                  <textarea
                    rows={3}
                    defaultValue="The serpent told Eve that she would not surely die if she ate the fruit."
                    className={DETAIL_AREA}
                  />
                  <div className={COUNTER}>72 / 500</div>
                </div>

                <div className="flex flex-col gap-[8px]">
                  <label className="block text-[14px] leading-[17px] font-semibold text-[#0A0847]">
                    Bible Verse
                  </label>
                  <div className="flex h-[45px] items-center rounded-[7.47px] border border-[#E2DFFC] bg-white px-[12px] text-[12px] font-medium text-[#0A0847]">
                    Genesis 3:4
                  </div>
                </div>

                <div className="flex flex-col gap-[8px]">
                  <FieldLabel>Note</FieldLabel>
                  <textarea
                    rows={3}
                    defaultValue="The serpent tried to make Eve doubt God's warning."
                    className={DETAIL_AREA}
                  />
                  <div className={COUNTER}>49 / 200</div>
                </div>

                <div className="grid grid-cols-2 gap-[25px]">
                  <div className="flex flex-col gap-[8px]">
                    <FieldLabel>Difficulty</FieldLabel>
                    <div className="relative">
                      <select
                        value={selectedQuestion.difficulty}
                        onChange={(event) => updateSelected({ difficulty: event.target.value })}
                        className={`${DETAIL_FIELD} pr-[40px]`}
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                      <Chevron className="absolute top-1/2 right-[16px] -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-[8px]">
                    <FieldLabel>Status</FieldLabel>
                    <div className="relative">
                      <select
                        value={selectedQuestion.status}
                        onChange={(event) => updateSelected({ status: event.target.value })}
                        className={`${DETAIL_FIELD} pr-[40px]`}
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                      </select>
                      <Chevron className="absolute top-1/2 right-[16px] -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[8px] pt-[4px]">
                  <button
                    type="button"
                    className="flex h-[40px] w-full cursor-pointer items-center justify-center gap-[10px] whitespace-nowrap rounded-[8px] border border-[#001984] bg-[#FEFEFE] text-[14px] font-semibold text-[#0A0847]/80"
                  >
                    <img
                      src={floppyIcon}
                      alt=""
                      aria-hidden
                      draggable={false}
                      className="h-[16px] w-[16px] shrink-0 object-contain"
                    />
                    Update Question
                  </button>
                  <button
                    type="button"
                    className="flex h-[40px] w-full cursor-pointer items-center justify-center gap-[10px] whitespace-nowrap rounded-[8px] border border-[#D80027] bg-[#FEFEFE] text-[14px] font-semibold text-[#D80027]"
                    onClick={() => handleDeleteQuestion(selectedQuestion.id)}
                  >
                    <FaTrash size={14} />
                    Delete Question
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-[12px] font-medium text-[#0A0847]/60">Select a question to view details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}