import { useState } from "react";
import { LuCircleX, LuDownload, LuPlus } from "react-icons/lu";
import {
  ActivityPageHeader,
  Field,
  Select,
  TextArea,
  TextInput,
  actionRowClass,
  cardRowClass,
  formCardClass,
  outlineButton,
  pageBodyClass,
  pageShellClass,
  purpleButton,
} from "./activityFormShared";

/* ==========================================================================
   MOCK DATA — hardcoded exactly as specified
   ========================================================================== */
const PUZZLE_SIZE_OPTIONS = ["12 × 12", "10 × 10", "14 × 14", "16 × 16"];
const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];
const STATUS_OPTIONS = ["Draft", "Active", "Inactive"];
const MAX_WORDS = 30;

const WORD_DIRECTIONS = ["Horizontal", "Vertical", "Diagonal", "Backward"];

const INITIAL_WORDS = [
  "JESUS",
  "NICODEMUS",
  "LIGHT",
  "WORLD",
  "SPIRIT",
  "BELIEVE",
  "ETERNAL",
  "TRUTH",
];

/* dot colour per word — drives the "Words to Find" list */
const WORD_DOT_COLORS = {
  JESUS: "#A8E6A1",
  NICODEMUS: "#A8E6A1",
  LIGHT: "#93B8F5",
  WORLD: "#C4A5F2",
  SPIRIT: "#93B8F5",
  BELIEVE: "#F7C77E",
  ETERNAL: "#F27C9A",
  TRUTH: "#F27C9A",
};

const CLUE_TEXT = "Find the hidden words from John 3.";

/* -------------------------------------------------------------------------
   12 × 12 LETTER GRID
   ---------------------------------------------------------------------- */
const GRID = [
  "JESUSXKMLNLL",
  "KIGAMMKKOJXY",
  "BTFEZHXNCBEF",
  "LIGHTIHOLEEY",
  "PMAVRIUYQOCW",
  "NZWEFCXRYNDQ",
  "NZBOKDMINTBE",
  "LIEVEHRKCRAH",
  "HCNKFNNKTRUT",
  "HDLGUZRULIIH",
  "YLACRTTHHMOT",
  "AWOMMZGQDIAV",
  "CLBUXWRTPYLL",
];

/* highlight pills: [row, col, length, orientation, tone] — 0-indexed */
const PILLS = {
  green: { bg: "#DBF6D6", border: "#AFE3A7" },
  blue: { bg: "#D9E7FC", border: "#B6CFF8" },
  purple: { bg: "#EBE2FC", border: "#D4C2F8" },
  orange: { bg: "#FCEAD7", border: "#F8D5AE" },
  pink: { bg: "#F9D7E0", border: "#F6B4C5" },
};

/* JESUS (R1 c1-5), HOLEE (R4 c7-11), MAV horizontal (R5 c2-4),
   NKFNNKTR (R9 c3-10), TTHHM (R11 c6-10) */
const HIGHLIGHTS = [
  { row: 0, col: 0, length: 5, axis: "x", tone: "green" },
  { row: 3, col: 6, length: 5, axis: "x", tone: "blue" },
  { row: 4, col: 1, length: 3, axis: "x", tone: "purple" },
  { row: 8, col: 2, length: 8, axis: "x", tone: "orange" },
  { row: 10, col: 5, length: 5, axis: "x", tone: "pink" },
];

/* maps a cell to its pill span so only the outer ends get rounded corners */
function buildPillMap() {
  const map = new Map();

  HIGHLIGHTS.forEach((pill) => {
    for (let i = 0; i < pill.length; i += 1) {
      const row = pill.axis === "y" ? pill.row + i : pill.row;
      const col = pill.axis === "x" ? pill.col + i : pill.col;
      map.set(`${row}-${col}`, {
        tone: pill.tone,
        start: i === 0,
        end: i === pill.length - 1,
        axis: pill.axis,
      });
    }
  });

  return map;
}

const PILL_MAP = buildPillMap();

/* ==========================================================================
   LIVE PUZZLE PREVIEW (right card)
   ========================================================================== */
function PuzzleGrid() {
  return (
    <div className="rounded-lg border border-[#E2DFFC] bg-white p-5">
      <div className="grid grid-cols-12">
        {GRID.map((rowLetters, rowIndex) =>
          [...rowLetters].map((letter, colIndex) => {
            const pill = PILL_MAP.get(`${rowIndex}-${colIndex}`);
            const colors = pill ? PILLS[pill.tone] : null;

            const radius = !pill
              ? ""
              : pill.axis === "x"
                ? `${pill.start ? "rounded-l-lg" : ""} ${pill.end ? "rounded-r-lg" : ""}`
                : `${pill.start ? "rounded-t-lg" : ""} ${pill.end ? "rounded-b-lg" : ""}`;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="relative flex h-[30px] items-center justify-center"
              >
                {colors && (
                  <span
                    style={{ background: colors.bg, borderColor: colors.border }}
                    className={`absolute inset-y-[3px] inset-x-0 border ${radius}`}
                  />
                )}
                <span className="relative text-[13px] font-medium text-[#0A0847]">
                  {letter}
                </span>
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}

function WordsToFind({ words }) {
  return (
    <div className="rounded-lg border border-[#E2DFFC] bg-white p-5">
      <h3 className="text-[18px] font-bold text-[#0A0847]">Words to Find</h3>

      <ul className="mt-4 grid grid-flow-col grid-rows-4 gap-x-6 gap-y-3">
        {words.map((word) => (
          <li
            key={word}
            className="flex items-center gap-2.5 text-[13px] font-semibold whitespace-nowrap text-[#0A0847]"
          >
            <span
              style={{ background: WORD_DOT_COLORS[word] }}
              className="h-[10px] w-[10px] shrink-0 rounded-full"
            />
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function AddWordSearch() {
  const [title, setTitle] = useState("John 3 Word Search");
  const [puzzleSize, setPuzzleSize] = useState("12 × 12");
  const [difficulty, setDifficulty] = useState("Medium");
  const [directions, setDirections] = useState(WORD_DIRECTIONS);
  const [words, setWords] = useState(INITIAL_WORDS);
  const [clue, setClue] = useState(CLUE_TEXT);
  const [timeLimit, setTimeLimit] = useState("10");
  const [rewardPoints, setRewardPoints] = useState("10");
  const [status, setStatus] = useState("Draft");

  const toggleDirection = (direction) =>
    setDirections((prev) =>
      prev.includes(direction)
        ? prev.filter((item) => item !== direction)
        : [...prev, direction],
    );

  const removeWord = (word) =>
    setWords((prev) => prev.filter((item) => item !== word));

  return (
    <div className={pageShellClass}>
      <div className={pageBodyClass}>
        <ActivityPageHeader
          breadcrumb={[
            "Bible Content",
            "Activities",
            "John",
            "Chapter 3",
            "Word Search",
          ]}
          title="Add Word Search"
          subtitle="Engage and track activities for each chapter."
        />

        <div className={cardRowClass}>
          {/* LEFT — configure form */}
          <section className={`${formCardClass} lg:w-[511px] lg:flex-none`}>
            <h2 className="text-[16px] font-bold text-[#041581]">
              Configure Your Quiz
            </h2>

            <Field label="Puzzle Title" required htmlFor="puzzle-title">
              <TextInput
                id="puzzle-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>

            <Field label="Puzzle Size" required htmlFor="puzzle-size">
              <Select
                id="puzzle-size"
                value={puzzleSize}
                options={PUZZLE_SIZE_OPTIONS}
                onChange={(e) => setPuzzleSize(e.target.value)}
              />
            </Field>

            <Field label="Difficulty" required htmlFor="difficulty">
              <Select
                id="difficulty"
                value={difficulty}
                options={DIFFICULTY_OPTIONS}
                onChange={(e) => setDifficulty(e.target.value)}
              />
            </Field>

            <div className="my-3 h-px w-full bg-[#E5E4EC]" />

            <div>
              <p className="text-[13px] font-semibold text-[#0A0847]">
                Word Direction
              </p>

              <div className="mt-2.5 flex flex-col gap-2">
                {WORD_DIRECTIONS.map((direction) => (
                  <label
                    key={direction}
                    className="flex cursor-pointer items-center gap-2.5 text-[14px] font-semibold text-[#0A0847]"
                  >
                    <input
                      type="checkbox"
                      checked={directions.includes(direction)}
                      onChange={() => toggleDirection(direction)}
                      className="h-[18px] w-[18px] shrink-0 cursor-pointer accent-[#041581]"
                    />
                    {direction}
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px w-full bg-[#E5E4EC]" />

            <div>
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-[#0A0847]">
                  Word Direction
                </p>
                <p className="text-[12px] text-[#0A084799]">
                  {words.length} / {MAX_WORDS}
                </p>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {words.map((word) => (
                  <span
                    key={word}
                    className="flex h-9 items-center gap-1.5 rounded-lg border border-[#E2DFFC] bg-white px-3"
                  >
                    <span className="text-[11px] font-semibold tracking-wide text-[#041581]">
                      {word}
                    </span>
                    <button
                      type="button"
                      aria-label={`Remove ${word}`}
                      onClick={() => removeWord(word)}
                      className="flex cursor-pointer items-center"
                    >
                      <LuCircleX size={16} className="text-[#041581]" aria-hidden />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#041581] bg-white px-4 text-[13px] font-semibold text-[#0A0847] transition-colors hover:bg-[#F1F1F9]"
              >
                <LuPlus size={15} aria-hidden />
                Add New Book
              </button>

              <button
                type="button"
                className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#041581] bg-white px-4 text-[13px] font-semibold text-[#0A0847] transition-colors hover:bg-[#F1F1F9]"
              >
                <LuDownload size={15} aria-hidden />
                Import Words from Chapter
              </button>
            </div>

            <Field label="Clue / Instruction" htmlFor="clue">
              <TextArea
                id="clue"
                value={clue}
                onChange={(e) => setClue(e.target.value)}
                max={200}
                className="h-[96px]"
              />
            </Field>

            <Field label="Time Limit (Optional)" htmlFor="time-limit">
              <TextInput
                id="time-limit"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                adornment="min"
              />
            </Field>

            <Field label="Reward Points" htmlFor="reward-points">
              <TextInput
                id="reward-points"
                value={rewardPoints}
                onChange={(e) => setRewardPoints(e.target.value)}
              />
            </Field>

            <Field label="Status" htmlFor="status">
              <Select
                id="status"
                value={status}
                options={STATUS_OPTIONS}
                onChange={(e) => setStatus(e.target.value)}
              />
            </Field>
          </section>

          {/* RIGHT — live puzzle preview */}
          <section className="w-full shrink-0 rounded-lg border border-[#E2DFFC] bg-[#F9F9FF] pt-[26px] pr-[26px] pb-[46px] pl-[26px] lg:w-[532px]">
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-[22px] font-bold text-[#0A0847]">
                  Live Puzzle Preview
                </h2>
                <p className="mt-1 max-w-[330px] text-[14px] leading-[1.4] text-[#0A084799]">
                  This is how your word search puzzle will appear to users.
                </p>
              </div>

              <PuzzleGrid />

              <WordsToFind words={words} />
            </div>
          </section>
        </div>

        {/* BOTTOM ACTION ROW */}
        <div className={actionRowClass}>
          <button type="button" className={outlineButton}>
            Cancel
          </button>

          <div className="flex flex-wrap gap-3">
            <button type="button" className={outlineButton}>
              Save as Draft
            </button>
            <button type="button" className={outlineButton}>
              Preview
            </button>
            <button type="button" className={purpleButton}>
              Publish Word Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
