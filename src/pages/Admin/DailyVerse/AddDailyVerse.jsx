import React, { useState, useRef } from "react";
import {
  FiSave,
  FiEye,
  FiArrowRight,
  FiArrowLeft,
  FiPlus,
  FiCalendar,
  FiClock,
  FiGlobe,
  FiUpload,
  FiTrash2,
  FiEdit2,
  FiPlay,
  FiRefreshCw,
  FiCheck,
  FiBold,
  FiItalic,
  FiUnderline,
  FiLink,
  FiList,
  FiImage,
  FiVideo,
  FiUsers,
  FiShare2,
  FiXCircle,
} from "react-icons/fi";
import {
  BsBook,
  BsHeart,
  BsChatSquareQuote,
  BsAward,
  BsVolumeUp,
  BsShare,
  BsSend,
  BsFillInfoCircleFill,
} from "react-icons/bs";

/* ==========================================================================
   REUSABLE ATOMIC & STYLED COMPONENTS
   ========================================================================== */

/** Reusable Input Styling */
const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full border border-[#E2DFFC] rounded-lg px-3 py-2 text-xs font-medium text-[#0A0847] placeholder-gray-400 bg-white outline-none focus:border-[#001984] focus:ring-1 focus:ring-[#001984] transition-all ${className}`}
    {...props}
  />
);

/** Reusable Select Styling */
const Select = ({ children, className = "", ...props }) => (
  <select
    className={`w-full border border-[#E2DFFC] rounded-lg px-3 py-2 text-xs font-semibold text-[#0A0847] bg-white outline-none focus:border-[#001984] focus:ring-1 focus:ring-[#001984] transition-all cursor-pointer ${className}`}
    {...props}
  >
    {children}
  </select>
);

/** Label Component */
const Label = ({ children, required }) => (
  <label className="block text-xs font-semibold text-[#0A0847] mb-1.5">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

/** Custom Toggle Switch Component */
const Toggle = ({ checked, onChange, label }) => (
  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
    <div
      onClick={() => onChange(!checked)}
      className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
        checked ? "bg-[#001984]" : "bg-gray-200"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </div>
    {label && <span className="text-xs font-semibold text-[#0A0847]">{label}</span>}
  </label>
);

/** Time Picker Dropdowns (Hour and Minute Selectors) */
const TimePicker = ({ value, onChange }) => {
  const [hour, minute, ampm] = value ? value.split(/:| /) : ["06", "00", "AM"];

  const update = (h, m, a) => {
    onChange(`${h}:${m} ${a}`);
  };

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const minutes = ["00", "15", "30", "45"];

  return (
    <div className="flex items-center gap-1">
      <Select value={hour} onChange={(e) => update(e.target.value, minute, ampm)}>
        {hours.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </Select>
      <span className="text-xs font-bold text-gray-400">:</span>
      <Select value={minute} onChange={(e) => update(hour, e.target.value, ampm)}>
        {minutes.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </Select>
      <Select value={ampm} onChange={(e) => update(hour, minute, e.target.value)}>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </Select>
    </div>
  );
};

/** Section Header Block */
const SectionHeader = ({ icon: Icon, title, subtitle, iconBg = "bg-[#EEF2FF] text-[#001984]" }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
      <Icon size={20} />
    </div>
    <div>
      <h3 className="font-bold text-sm text-[#0A0847]">{title}</h3>
      {subtitle && <p className="text-[11px] text-[#0A084799] font-medium">{subtitle}</p>}
    </div>
  </div>
);

/* ==========================================================================
   MAIN ADD DAILY VERSE FORM COMPONENT
   ========================================================================== */
export default function AddDailyVerseWizard({ onCancel }) {
  const [currentStep, setCurrentStep] = useState(1);

  // Hidden File Inputs Refs
  const bgImageRef = useRef(null);
  const audioFileRef = useRef(null);
  const mediaFileRef = useRef(null);

  // Rich Text Styles for Prayer Body
  const [textFormatting, setTextFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  // COMPLETE UNIFIED FORM DATA STATE
  const [formData, setFormData] = useState({
    // Step 1 State
    displayDate: "",
    startTime: "06:00 AM",
    endTime: "11:59 PM",
    timeZone: "(UTC-04:00) US/Eastern Time",
    showOnFirstLogin: false,
    allowClose: true,
    keepAccessible: true,
    backgroundImage: "https://images.unsplash.com/photo-1509021436468-1b2a38325b51?auto=format&fit=crop&w=1200&q=80",
    imageAltText: "",
    scriptureRef: "",
    defaultVersion: "NIV",
    verseText: "",
    activeTranslations: ["NIV"],
    dailyTakeaway: "",
    audioFile: null,
    audioFileName: "",
    transcriptEnabled: true,
    playbackSpeed: "0.75x",
    highlightWords: true,
    chapterBook: "Psalms",
    chapterNum: "23",
    enableSave: true,
    enableShare: true,

    // Step 2 State
    selectedQuestion: "",
    selectedRotation: "Psalm 23:2",
    screenSelector: "New Feature (Launch App)",
    inspiresText: "",
    motivationText: "",
    prayerLoving: "",
    relationshipWith: "",
    prayerBody: "",
    appliedMedia: [],
    scriptureMediaList: [
      { id: "1", name: "Mountain-cross-light.jpg", size: "1920×1080px", url: "https://images.unsplash.com/photo-1509021436468-1b2a38325b51?auto=format&fit=crop&w=120&q=80" },
      { id: "2", name: "Mountain-cross-light.jpg", size: "1920×1080px", url: "https://images.unsplash.com/photo-1509021436468-1b2a38325b51?auto=format&fit=crop&w=120&q=80" },
    ],
    searchStock: true,
    searchScripture: false,
    enableReflection: true,
    reflectionTitle: "",
    reflectionLimit: "150",
    focusPrompt: "",
    rewardType: "Coins",
    rewardAmount: "",
    enablePersonalPrayer: true,
    personalPrayerPrompt: "",
    strongPrayer: "",
    visibleMode: "User Group",
    visibilityTo: "Only Me (Don't Add)",
  });

  // State Handler Helper
  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Form Submit / Console Log
  const handleSave = (actionType) => {
    console.log(`Action Executed: ${actionType}`);
    console.log("Full Form Payload:", formData);
    alert(`Form submitted! Check browser console for full payload. Action: ${actionType}`);
  };

  // Upload Handlers
  const handleBgImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateField("backgroundImage", URL.createObjectURL(file));
    }
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateField("audioFile", file);
      updateField("audioFileName", file.name);
    }
  };

  const handleApplyMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newMedia = {
        id: crypto.randomUUID(),
        name: file.name,
        size: "Uploaded File",
        url: URL.createObjectURL(file),
      };
      updateField("appliedMedia", [...formData.appliedMedia, newMedia]);
    }
  };

  const handleRemoveScriptureMedia = (id) => {
    updateField(
      "scriptureMediaList",
      formData.scriptureMediaList.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen p-6 font-[Inter] space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0A0847]">Add Daily Verse</h1>
          <p className="text-xs text-[#0A084799] font-medium mt-1">
            Create and customize your daily verse experience
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave("Draft Saved")}
            className="px-4 py-2 bg-white border border-[#E2DFFC] rounded-lg text-xs font-semibold text-[#0A0847] hover:bg-gray-50 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FiSave size={14} /> Save draft
          </button>
          <button
            onClick={() => handleSave("Preview 3 Screens")}
            className="px-4 py-2 bg-white border border-[#E2DFFC] rounded-lg text-xs font-semibold text-[#0A0847] hover:bg-gray-50 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FiEye size={14} /> Preview All 3 Screens
          </button>
          {currentStep === 1 ? (
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 bg-[#001984] text-white rounded-lg text-xs font-bold hover:bg-[#001266] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              Next <FiArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={() => handleSave("Schedule / Published")}
              className="px-4 py-2 bg-[#001984] text-white rounded-lg text-xs font-bold hover:bg-[#001266] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              Schedule Now
            </button>
          )}
        </div>
      </div>

      {/* Stepper Navigation Indicator */}
      <div className="flex items-center gap-6 border-b border-[#E2DFFC] pb-4">
        <div
          onClick={() => setCurrentStep(1)}
          className={`flex items-center gap-2 cursor-pointer ${
            currentStep === 1 ? "text-[#001984] font-bold" : "text-gray-400 font-medium"
          }`}
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              currentStep === 1 ? "bg-[#001984] text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            1
          </span>
          <span className="text-xs">Verse & Display</span>
        </div>

        <div className="h-0.5 w-8 bg-gray-200" />

        <div
          onClick={() => setCurrentStep(2)}
          className={`flex items-center gap-2 cursor-pointer ${
            currentStep === 2 ? "text-[#001984] font-bold" : "text-gray-400 font-medium"
          }`}
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              currentStep === 2 ? "bg-[#001984] text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            2
          </span>
          <span className="text-xs">Reflection & Prayer</span>
        </div>
      </div>

      {/* ===================================================================
          STEP 1 CONTENT: VERSE & DISPLAY
          =================================================================== */}
      {currentStep === 1 && (
        <div className="space-y-6">
          {/* Card 1: Schedule & Display */}
          <div className="bg-white rounded-2xl border border-[#E2DFFC] p-6 shadow-sm">
            <SectionHeader
              icon={FiCalendar}
              title="Schedule & Display"
              subtitle="Set when and how your verse will be displayed"
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
              <div>
                <Label>Display Date</Label>
                <Input
                  type="date"
                  value={formData.displayDate}
                  onChange={(e) => updateField("displayDate", e.target.value)}
                />
              </div>
              <div>
                <Label>Start Time</Label>
                <TimePicker
                  value={formData.startTime}
                  onChange={(val) => updateField("startTime", val)}
                />
              </div>
              <div>
                <Label>End Time</Label>
                <TimePicker
                  value={formData.endTime}
                  onChange={(val) => updateField("endTime", val)}
                />
              </div>
              <div>
                <Label>Time Zone</Label>
                <Select
                  value={formData.timeZone}
                  onChange={(e) => updateField("timeZone", e.target.value)}
                >
                  <option>(UTC-04:00) US/Eastern Time</option>
                  <option>(UTC+00:00) GMT</option>
                  <option>(UTC+05:30) India Standard Time</option>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-8 pt-2">
              <Toggle
                label="Show on first login only"
                checked={formData.showOnFirstLogin}
                onChange={(val) => updateField("showOnFirstLogin", val)}
              />
              <Toggle
                label="Allow users to close"
                checked={formData.allowClose}
                onChange={(val) => updateField("allowClose", val)}
              />
              <Toggle
                label="Keep accessible from Home"
                checked={formData.keepAccessible}
                onChange={(val) => updateField("keepAccessible", val)}
              />
            </div>
          </div>

          {/* Card 2: Background Image */}
          <div className="bg-white rounded-2xl border border-[#E2DFFC] p-6 shadow-sm">
            <SectionHeader
              icon={FiImage}
              title="Background Image"
              subtitle="Add a visually inspiring background"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <Label>Attach Your Files</Label>
                <input
                  type="file"
                  ref={bgImageRef}
                  onChange={handleBgImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <div
                  onClick={() => bgImageRef.current?.click()}
                  className="border-2 border-dashed border-[#E2DFFC] rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-[#F8FAFC] hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-[#EEF2FF] text-[#001984] flex items-center justify-center">
                    <FiUpload size={22} />
                  </div>
                  <span className="text-xs font-bold text-[#001984]">
                    Upload / Replace Image
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    Recommended: 1920 × 600 px
                  </span>
                </div>

                <div className="mt-4">
                  <Label>Image Alt Text</Label>
                  <Input
                    placeholder="Enter image alt text (e.g., Sunrise over mountains with cross)"
                    value={formData.imageAltText}
                    onChange={(e) => updateField("imageAltText", e.target.value)}
                  />
                </div>
              </div>

              {/* Preview Banner */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E2DFFC] group bg-gray-100 h-56 flex items-center justify-center">
                {formData.backgroundImage ? (
                  <>
                    <img
                      src={formData.backgroundImage}
                      alt="Background preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => bgImageRef.current?.click()}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-[#0A0847] shadow-md transition-colors cursor-pointer"
                    >
                      <FiEdit2 size={14} />
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-gray-400">No Image Uploaded</span>
                )}
              </div>
            </div>
          </div>

          {/* Card 3: Today's Verse */}
          <div className="bg-white rounded-2xl border border-[#E2DFFC] p-6 shadow-sm">
            <SectionHeader
              icon={BsBook}
              title="Today's Verse"
              subtitle="Enter the verse details"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-2">
                <Label>Scripture Reference</Label>
                <Input
                  placeholder="Enter Scripture (e.g. Psalm 23:1)"
                  value={formData.scriptureRef}
                  onChange={(e) => updateField("scriptureRef", e.target.value)}
                />
              </div>
              <div>
                <Label>Default Version</Label>
                <Select
                  value={formData.defaultVersion}
                  onChange={(e) => updateField("defaultVersion", e.target.value)}
                >
                  <option value="NIV">NIV</option>
                  <option value="KJV">KJV</option>
                  <option value="ESV">ESV</option>
                  <option value="NLT">NLT</option>
                </Select>
              </div>
            </div>

            <div className="mb-4">
              <Label>Verse Text</Label>
              <textarea
                rows={2}
                placeholder="Enter full verse text..."
                value={formData.verseText}
                onChange={(e) => updateField("verseText", e.target.value)}
                className="w-full border border-[#E2DFFC] rounded-lg p-3 text-xs font-medium text-[#0A0847] placeholder-gray-400 outline-none resize-none focus:border-[#001984]"
              />
            </div>

            <div className="mb-4">
              <Label>Translations</Label>
              <div className="flex items-center gap-3">
                {["KJV", "NIV", "NLT"].map((lang) => {
                  const isSelected = formData.activeTranslations.includes(lang);
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        const next = isSelected
                          ? formData.activeTranslations.filter((l) => l !== lang)
                          : [...formData.activeTranslations, lang];
                        updateField("activeTranslations", next);
                      }}
                      className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 border transition-colors cursor-pointer ${
                        isSelected
                          ? "border-[#10B981] bg-[#ECFDF5] text-[#059669]"
                          : "border-[#E2DFFC] bg-white text-[#0A0847]"
                      }`}
                    >
                      <FiGlobe size={14} /> {lang}
                      {isSelected && <FiCheck size={14} />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <Label>Daily Takeaway</Label>
              <Input
                placeholder="Enter daily takeaway message..."
                value={formData.dailyTakeaway}
                onChange={(e) => updateField("dailyTakeaway", e.target.value)}
              />
            </div>
          </div>

          {/* Card 4: Verse Audio & Accessibility */}
          <div className="bg-white rounded-2xl border border-[#E2DFFC] p-6 shadow-sm">
            <SectionHeader
              icon={BsVolumeUp}
              title="Verse Audio & Accessibility"
              subtitle="Enhance accessibility and user experience"
            />

            <input
              type="file"
              ref={audioFileRef}
              accept="audio/*"
              onChange={handleAudioUpload}
              className="hidden"
            />

            <div className="mb-4">
              <Label>Audio File</Label>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => audioFileRef.current?.click()}
                  className="px-4 py-2 bg-[#EEF2FF] text-[#001984] font-bold text-xs rounded-lg flex items-center gap-2 hover:bg-[#E2DFFC] transition-colors cursor-pointer"
                >
                  <FiUpload size={14} /> Upload Audio
                </button>
                <button
                  type="button"
                  onClick={() =>
                    alert(formData.audioFileName ? `Playing ${formData.audioFileName}` : "No audio loaded.")
                  }
                  className="px-4 py-2 bg-white border border-[#E2DFFC] text-[#0A0847] font-semibold text-xs rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <FiPlay size={14} /> Preview
                </button>
                <button
                  type="button"
                  onClick={() => audioFileRef.current?.click()}
                  className="px-4 py-2 bg-white border border-[#E2DFFC] text-[#0A0847] font-semibold text-xs rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <FiRefreshCw size={14} /> Replace
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateField("audioFile", null);
                    updateField("audioFileName", "");
                  }}
                  className="px-4 py-2 bg-[#FEF2F2] text-[#EF4444] font-bold text-xs rounded-lg flex items-center gap-2 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  <FiTrash2 size={14} /> Remove
                </button>
              </div>
              {formData.audioFileName && (
                <p className="text-xs text-[#059669] font-medium mt-2">
                  Loaded Audio: {formData.audioFileName}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <Toggle
                label="Transcript / Captions Enabled"
                checked={formData.transcriptEnabled}
                onChange={(val) => updateField("transcriptEnabled", val)}
              />
              <div>
                <Label>Playback Speed</Label>
                <Select
                  value={formData.playbackSpeed}
                  onChange={(e) => updateField("playbackSpeed", e.target.value)}
                >
                  <option>0.75x</option>
                  <option>1.0x</option>
                  <option>1.25x</option>
                </Select>
              </div>
              <Toggle
                label="Highlight Words"
                checked={formData.highlightWords}
                onChange={(val) => updateField("highlightWords", val)}
              />
            </div>
          </div>

          {/* Card 5: Verse Actions */}
          <div className="bg-white rounded-2xl border border-[#E2DFFC] p-6 shadow-sm">
            <SectionHeader
              icon={BsShare}
              title="Verse Actions"
              subtitle="Set where and how this verse will appear"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Read Full Chapter Destination</Label>
                <Select
                  value={formData.chapterBook}
                  onChange={(e) => updateField("chapterBook", e.target.value)}
                >
                  <option>Psalms</option>
                  <option>Proverbs</option>
                </Select>
              </div>
              <div>
                <Label>Chapter</Label>
                <Select
                  value={formData.chapterNum}
                  onChange={(e) => updateField("chapterNum", e.target.value)}
                >
                  <option>23</option>
                  <option>24</option>
                  <option>25</option>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <Toggle
                label="Enable Save"
                checked={formData.enableSave}
                onChange={(val) => updateField("enableSave", val)}
              />
              <Toggle
                label="Enable Share"
                checked={formData.enableShare}
                onChange={(val) => updateField("enableShare", val)}
              />
              <button className="px-4 py-2 border border-[#E2DFFC] text-[#001984] font-bold text-xs rounded-lg flex items-center gap-2 hover:bg-[#EEF2FF] transition-colors cursor-pointer">
                <FiShare2 size={14} /> Preview Share Card
              </button>
            </div>
          </div>

          {/* Step 1 Footer Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E2DFFC]">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 border border-[#E2DFFC] text-[#0A0847] font-semibold text-xs rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleSave("Draft Saved")}
                className="px-6 py-2.5 border border-[#E2DFFC] text-[#0A0847] font-bold text-xs rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <FiSave size={14} /> Save draft
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2.5 bg-[#001984] text-white font-bold text-xs rounded-lg hover:bg-[#001266] flex items-center gap-2 transition-colors cursor-pointer"
              >
                Next: Reflection & Prayer <FiArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          STEP 2 CONTENT: REFLECTION & PRAYER
          =================================================================== */}
      {currentStep === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-6">
            {/* Card 1: Today's Verse Rotation */}
            <div className="bg-white rounded-2xl border border-[#E2DFFC] p-6 shadow-sm">
              <SectionHeader
                icon={BsBook}
                title="Today's Verse"
                subtitle="Enter the verse details"
              />

              <div className="space-y-4">
                <div>
                  <Label required>Question</Label>
                  <div className="flex items-center gap-2">
                    <Select
                      value={formData.selectedQuestion}
                      onChange={(e) => updateField("selectedQuestion", e.target.value)}
                    >
                      <option value="">Select question</option>
                      <option value="q1">What does Psalm 23 mean to you?</option>
                    </Select>
                    <button className="p-2.5 bg-[#FEF2F2] text-[#EF4444] rounded-lg hover:bg-red-100 transition-colors">
                      <FiPlus size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <Label>Set Rotation</Label>
                  <Select
                    value={formData.selectedRotation}
                    onChange={(e) => updateField("selectedRotation", e.target.value)}
                    className="mb-3"
                  >
                    <option>Showing selected rotation (6 of 10 verses)</option>
                  </Select>

                  {/* Radio Group Items */}
                  <div className="space-y-2">
                    {[
                      { id: "A", label: "Psalm 23:1" },
                      { id: "B", label: "Psalm 23:2" },
                      { id: "C", label: "Psalm 23:3" },
                      { id: "D", label: "Psalm 23:4" },
                    ].map((item) => (
                      <div
                        key={item.id}
                        onClick={() => updateField("selectedRotation", item.label)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                          formData.selectedRotation === item.label
                            ? "bg-[#ECFDF5] border-[#10B981] text-[#0A0847]"
                            : "bg-white border-[#E2DFFC] text-[#0A0847]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px]">
                            {item.id}
                          </span>
                          <span>{item.label}</span>
                        </div>
                        {formData.selectedRotation === item.label && (
                          <div className="flex items-center gap-1.5 text-[#059669] font-bold">
                            <span className="text-[11px]">Use today</span>
                            <FiCheck size={14} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Screen Selector</Label>
                  <Select
                    value={formData.screenSelector}
                    onChange={(e) => updateField("screenSelector", e.target.value)}
                  >
                    <option>New Feature (Launch App)</option>
                  </Select>
                </div>

                <div>
                  <Label>Inspires Section</Label>
                  <Input
                    placeholder="Enter inspires section text..."
                    value={formData.inspiresText}
                    onChange={(e) => updateField("inspiresText", e.target.value)}
                  />
                </div>

                <div>
                  <Label>Motivation Section</Label>
                  <Input
                    placeholder="Enter motivation text..."
                    value={formData.motivationText}
                    onChange={(e) => updateField("motivationText", e.target.value)}
                  />
                </div>

                <button className="w-full py-2.5 border border-[#001984] text-[#001984] font-bold text-xs rounded-lg hover:bg-[#EEF2FF] flex items-center justify-center gap-2 transition-colors cursor-pointer">
                  <FiPlus size={16} /> Add Another Question
                </button>
                <p className="text-[11px] text-center text-gray-400 font-medium">
                  Add more questions to show more rotation options.
                </p>
              </div>
            </div>

            {/* Card 2: Let's Pray */}
            <div className="bg-white rounded-2xl border border-[#E2DFFC] p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-[#0A0847]">Let's Pray</h3>

              <div>
                <Label>Prayer Loving</Label>
                <Input
                  placeholder="e.g. Let's talk to God"
                  value={formData.prayerLoving}
                  onChange={(e) => updateField("prayerLoving", e.target.value)}
                />
              </div>

              <div>
                <Label>Relationship With</Label>
                <Input
                  placeholder="e.g. A Father of love"
                  value={formData.relationshipWith}
                  onChange={(e) => updateField("relationshipWith", e.target.value)}
                />
              </div>

              {/* Working Interactive Rich Text Editor */}
              <div>
                <Label>Prayer</Label>
                <div className="border border-[#E2DFFC] rounded-xl overflow-hidden focus-within:border-[#001984]">
                  <div className="bg-[#F8FAFC] border-b border-[#E2DFFC] p-2 flex items-center gap-2 text-gray-600">
                    <button
                      type="button"
                      onClick={() => setTextFormatting({ ...textFormatting, bold: !textFormatting.bold })}
                      className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
                        textFormatting.bold ? "bg-gray-300 font-bold" : ""
                      }`}
                    >
                      <FiBold size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setTextFormatting({ ...textFormatting, italic: !textFormatting.italic })}
                      className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
                        textFormatting.italic ? "bg-gray-300 italic" : ""
                      }`}
                    >
                      <FiItalic size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setTextFormatting({ ...textFormatting, underline: !textFormatting.underline })}
                      className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
                        textFormatting.underline ? "bg-gray-300 underline" : ""
                      }`}
                    >
                      <FiUnderline size={14} />
                    </button>
                    <span className="w-px h-4 bg-gray-300 mx-1" />
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded">
                      <FiLink size={14} />
                    </button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded">
                      <FiList size={14} />
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Type your prayer here..."
                    value={formData.prayerBody}
                    onChange={(e) => updateField("prayerBody", e.target.value)}
                    className={`w-full p-3 text-xs text-[#0A0847] placeholder-gray-400 outline-none resize-none ${
                      textFormatting.bold ? "font-bold" : "font-medium"
                    } ${textFormatting.italic ? "italic" : ""} ${
                      textFormatting.underline ? "underline" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Working Apply Media */}
              <div>
                <Label>Apply Media</Label>
                <input
                  type="file"
                  ref={mediaFileRef}
                  onChange={handleApplyMediaUpload}
                  className="hidden"
                />
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => mediaFileRef.current?.click()}
                    className="px-4 py-2 border border-[#E2DFFC] text-[#0A0847] font-semibold text-xs rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <FiUpload size={14} /> Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => mediaFileRef.current?.click()}
                    className="px-4 py-2 border border-[#E2DFFC] text-[#0A0847] font-semibold text-xs rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <FiImage size={14} /> Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => mediaFileRef.current?.click()}
                    className="px-4 py-2 border border-[#E2DFFC] text-[#0A0847] font-semibold text-xs rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <FiVideo size={14} /> Video
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField("appliedMedia", [])}
                    className="px-4 py-2 bg-[#FEF2F2] text-[#EF4444] font-bold text-xs rounded-lg hover:bg-red-100 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <FiTrash2 size={14} /> Remove All
                  </button>
                </div>

                {formData.appliedMedia.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.appliedMedia.map((m) => (
                      <div key={m.id} className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                        <img src={m.url} alt="Applied" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Card 3: Scriptures & Media with Working Remove Button */}
            <div className="bg-white rounded-2xl border border-[#E2DFFC] p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-[#0A0847]">Scriptures & Media</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.scriptureMediaList.map((item) => (
                  <div
                    key={item.id}
                    className="border border-[#E2DFFC] rounded-xl p-2 flex items-center justify-between bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.url}
                        alt="Media thumb"
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-bold text-[#0A0847] truncate">{item.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{item.size}</p>
                      </div>
                    </div>
                    {/* Working Remove Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveScriptureMedia(item.id)}
                      className="text-red-500 hover:text-red-700 p-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <FiXCircle size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6 pt-2">
                <Toggle
                  label="Search for Stock"
                  checked={formData.searchStock}
                  onChange={(val) => updateField("searchStock", val)}
                />
                <Toggle
                  label="Search Scripture Source"
                  checked={formData.searchScripture}
                  onChange={(val) => updateField("searchScripture", val)}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card 1: Reflection & Prayer Options */}
            <div className="bg-white rounded-2xl border border-[#E2DFFC] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2DFFC] pb-3">
                <SectionHeader
                  icon={BsChatSquareQuote}
                  title="Reflection & Prayer"
                  subtitle="Help users reflect and connect"
                />
                <Toggle
                  checked={formData.enableReflection}
                  onChange={(val) => updateField("enableReflection", val)}
                />
              </div>

              <div>
                <Label>Reflection Title</Label>
                <Input
                  placeholder="e.g. What is God showing you today?"
                  value={formData.reflectionTitle}
                  onChange={(e) => updateField("reflectionTitle", e.target.value)}
                />
              </div>

              <div>
                <Label>Reflection Limit</Label>
                <Select
                  value={formData.reflectionLimit}
                  onChange={(e) => updateField("reflectionLimit", e.target.value)}
                >
                  <option>150</option>
                  <option>250</option>
                  <option>500</option>
                </Select>
              </div>

              <div>
                <Label>Focus Prompt</Label>
                <Input
                  placeholder="e.g. Gentle reminder"
                  value={formData.focusPrompt}
                  onChange={(e) => updateField("focusPrompt", e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#001984] font-medium bg-[#EEF2FF] p-2.5 rounded-lg border border-[#E2DFFC]">
                <BsFillInfoCircleFill size={14} className="shrink-0" />
                <span>Reflections are also private notes.</span>
              </div>
            </div>

            {/* Card 2: Reward */}
            <div className="bg-white rounded-2xl border border-[#E2DFFC] p-6 shadow-sm space-y-4">
              <SectionHeader
                icon={BsAward}
                title="Reward"
                subtitle="Encourage engagement"
              />

              <div>
                <Label>Reward Type</Label>
                <Select
                  value={formData.rewardType}
                  onChange={(e) => updateField("rewardType", e.target.value)}
                >
                  <option>Coins</option>
                  <option>Badges</option>
                </Select>
              </div>

              <div>
                <Label>Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#F59E0B] text-white text-[10px] font-bold flex items-center justify-center">
                    $
                  </span>
                  <Input
                    type="number"
                    placeholder="50"
                    value={formData.rewardAmount}
                    onChange={(e) => updateField("rewardAmount", e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Personal Prayer */}
            <div className="bg-white rounded-2xl border border-[#E2DFFC] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2DFFC] pb-3">
                <SectionHeader
                  icon={BsHeart}
                  title="Personal Prayer"
                  subtitle="Enable Personal & Daily Prayer"
                />
                <Toggle
                  checked={formData.enablePersonalPrayer}
                  onChange={(val) => updateField("enablePersonalPrayer", val)}
                />
              </div>

              <div>
                <Label>Personal Prayer Prompt</Label>
                <Input
                  placeholder="e.g. Help me trust and grow in faith"
                  value={formData.personalPrayerPrompt}
                  onChange={(e) => updateField("personalPrayerPrompt", e.target.value)}
                />
              </div>

              <div>
                <Label>Strong Prayer</Label>
                <Input
                  placeholder="e.g. You guide and protect; give me trust"
                  value={formData.strongPrayer}
                  onChange={(e) => updateField("strongPrayer", e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#001984] font-medium bg-[#EEF2FF] p-2.5 rounded-lg border border-[#E2DFFC]">
                <BsFillInfoCircleFill size={14} className="shrink-0" />
                <span>Reflections are also private prayers.</span>
              </div>
            </div>

            {/* Card 4: Publishing */}
            <div className="bg-white rounded-2xl border border-[#E2DFFC] p-6 shadow-sm space-y-4">
              <SectionHeader
                icon={BsSend}
                title="Publishing"
                subtitle="Set schedule details"
              />

              <div className="bg-[#ECFDF5] border border-[#10B981] rounded-xl p-3 flex items-center gap-2 text-xs font-semibold text-[#059669]">
                <FiCalendar size={16} />
                <span>
                  This will be published on {formData.displayDate || "May 24, 2025"}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label>Visible Mode</Label>
                  <span className="text-[11px] text-gray-400 font-medium">
                    Choose who can see and engage
                  </span>
                </div>
                <Select
                  value={formData.visibleMode}
                  onChange={(e) => updateField("visibleMode", e.target.value)}
                >
                  <option>User Group</option>
                  <option>Public</option>
                </Select>
              </div>

              <div>
                <Label>Visibility To</Label>
                <div className="flex items-center gap-2 border border-[#E2DFFC] rounded-lg px-3 py-2 bg-white text-xs font-semibold text-[#0A0847]">
                  <FiUsers size={16} className="text-[#001984]" />
                  <span>{formData.visibilityTo}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 Bottom Full-Width Action Footer */}
          <div className="lg:col-span-12 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E2DFFC]">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="w-full sm:w-auto px-6 py-2.5 border border-[#E2DFFC] text-[#0A0847] font-semibold text-xs rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <FiArrowLeft size={14} /> Back
            </button>
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => handleSave("Draft Saved")}
                className="w-full sm:w-auto px-6 py-2.5 border border-[#E2DFFC] text-[#0A0847] font-bold text-xs rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FiSave size={14} /> Save draft
              </button>
              <button
                type="button"
                onClick={() => handleSave("Preview Single Screen")}
                className="w-full sm:w-auto px-6 py-2.5 border border-[#E2DFFC] text-[#0A0847] font-bold text-xs rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FiEye size={14} /> Preview
              </button>
              <button
                type="button"
                onClick={() => handleSave("Schedule / Published")}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#001984] text-white font-bold text-xs rounded-lg hover:bg-[#001266] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FiCalendar size={14} /> Schedule Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}