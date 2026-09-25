import React, { useState, useEffect } from "react";
import {
  FiEdit,
  FiPlus,
  FiTrash2,
  FiCalendar,
  FiStar,
  FiCheck,
  FiSave,
  FiInfo,
  FiEye,
  FiGrid,
  FiGift,
  FiSettings,
  FiClock,
  FiCreditCard,
  FiPlay,
  FiTrendingDown,
  FiMessageSquare,
} from "react-icons/fi";
import { BsGrid, BsFillInfoCircleFill, BsFillEyeFill } from "react-icons/bs";
import { BiSolidEditAlt, BiDollar } from "react-icons/bi";
import { MdOutlineDragIndicator } from "react-icons/md";
import { TbFileOff } from "react-icons/tb";
import { FaCalendarDays } from "react-icons/fa6";

/* ==========================================================================
   MOCK API FETCH (Returns full page payload)
   ========================================================================== */
const fetchSubscriptionData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        plans: [
          {
            id: "monthly",
            title: "Monthly Plan",
            iconColor: "bg-[#1060F6]",
            regPrice: "4.99",
            regDur: "month",
            promoPrice: "4.99",
            promoDur: "month",
            keepPrice: "4.99",
            keepDur: "month",
            status: "Active",
            isPopular: false,
          },
          {
            id: "quarterly",
            title: "Quarterly Plan",
            iconColor: "bg-[#29974B]",
            regPrice: "12.99",
            regDur: "3 month",
            promoPrice: "10.99",
            promoDur: "3 month",
            keepPrice: "9.99",
            keepDur: "3 month",
            status: "Active",
            isPopular: false,
          },
          {
            id: "biyearly",
            title: "Bi-Yearly Plan",
            iconColor: "bg-[#6D55FA]",
            regPrice: "24.99",
            regDur: "6 month",
            promoPrice: "21.99",
            promoDur: "6 month",
            keepPrice: "19.99",
            keepDur: "6 month",
            status: "Active",
            isPopular: false,
          },
          {
            id: "yearly",
            title: "Yearly Plan",
            iconColor: "bg-[#FDB802]",
            regPrice: "12.99",
            regDur: "3 month",
            promoPrice: "10.99",
            promoDur: "3 month",
            keepPrice: "9.99",
            keepDur: "3 month",
            status: "Active",
            isPopular: true,
          },
        ],
        features: [
          "Access to all 66 books",
          "Word search by chapter",
          "3 Bible photos",
          "Ad-free experience",
          "Daily verses",
          "Exclusive content",
          "Audio Bible",
          "Chapter-by-chapter quizzes",
          "Group Play",
          "Progress tracking",
          "Priority support",
          "Offline access",
        ],
        cancellationMetrics: {
          totalCancellations: 722,
          mostCommonReason: "Too expensive",
          mostCommonPercentage: "32.4%",
        },
        cancellationReasons: [
          "Too expensive",
          "Not using enough",
          "Using another app",
          "Technical issues",
          "Content not engaging",
          "Other",
        ],
        trialSettings: {
          enableTrial: true,
          trialDays: 3,
          requirePayment: true,
          autoStartPaid: true,
        },
      });
    }, 600);
  });

/* ==========================================================================
   REUSABLE UI COMPONENTS
   ========================================================================== */

/** 1. Reusable Price Input Row */
/** 1. Reusable Price Input Row */
const PriceInputRow = ({
  label,
  price,
  duration,
  isOptional,
  onChangePrice,
  onChangeDuration,
}) => (
  <div className="flex items-center justify-between text-xs font-[Inter] py-0.5">
    {/* Label on the left with responsive optional subtitle */}
    <div className="flex flex-col shrink-0 pr-2">
      <span className="text-[#0A0847] text-xs font-semibold whitespace-nowrap">
        {label}
      </span>
      {isOptional && (
        <span className="text-[10px] text-[#0A084799] font-medium lg:hidden">
          (Optional)
        </span>
      )}
    </div>

    {/* Inputs and inline optional tag on XL screens */}
    <div className="flex items-center gap-1.5 shrink-0">
      <div className="flex items-center border border-[#E2DFFC] rounded-lg px-2.5 py-1.5 bg-white w-20 sm:w-24">
        <span className="text-[#0A0847] font-bold mr-1">
          <BiDollar size={16} />
        </span>
        <input
          type="text"
          value={price || ""}
          onChange={(e) => onChangePrice && onChangePrice(e.target.value)}
          className="w-full text-xs font-extrabold text-[#0A0847CC] outline-none bg-transparent"
        />
      </div>

      <span className="text-[#0A0847] font-medium">/</span>

      <select
        value={duration || "month"}
        onChange={(e) => onChangeDuration && onChangeDuration(e.target.value)}
        className="border border-[#E2DFFC] rounded-lg px-2 py-1.5 bg-white text-xs font-medium text-[#0A0847] outline-none cursor-pointer"
      >
        <option value="month">month</option>
        <option value="3 month">3 month</option>
        <option value="6 month">6 month</option>
        <option value="year">year</option>
      </select>

      {/* Optional tag inline for XL screens only */}
      <div className="hidden lg:block w-16">
        {isOptional && (
          <span className="text-[11px] text-[#0A084799] font-medium ml-1.5">
            (Optional)
          </span>
        )}
      </div>
    </div>
  </div>
);

/** 2. Reusable Status Radio Selector */
const StatusRadioGroup = ({ status, planId, onChange }) => {
  const options = ["Active", "Paused", "Archived"];

  return (
    <div className="flex items-center justify-between pt-4 border-t border-[#E2DFFC] text-xs font-[Inter]">
      <span className="font-bold text-xs text-[#0A0847]">Status</span>
      <div className="flex items-center gap-5 sm:mr-5">
        {options.map((opt) => {
          const isSelected = status === opt;
          const isActive = opt === "Active";

          return (
            <label
              key={opt}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="radio"
                name={`status-${planId}`}
                value={opt}
                checked={isSelected}
                onChange={() => onChange(opt)}
                className="hidden"
              />

              {/* Custom Radio Button */}
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isSelected
                    ? isActive
                      ? "border-[#10B981] bg-white"
                      : "border-[#001984] bg-white"
                    : "border-[#52528C] bg-white group-hover:border-[#001984]"
                }`}
              >
                {isSelected && (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? "bg-[#10B981]" : "bg-[#001984]"
                    }`}
                  />
                )}
              </span>

              {/* Label Text */}
              <span
                className={`font-semibold ${
                  isSelected && isActive ? "text-[#10B981]" : "text-[#0A0847]"
                }`}
              >
                {opt}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

/** 3. Reusable Toggle Switch */
const ToggleSwitch = ({ enabled, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
      enabled ? "bg-[#001984]" : "bg-gray-200"
    }`}
  >
    <span
      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white ring-0 transition duration-200 ease-in-out ${
        enabled ? "translate-x-4" : "translate-x-0"
      }`}
    />
  </button>
);

/** 4. Reusable Add Item Form Row */
const AddItemInput = ({ placeholder, buttonText = "Add", onAdd }) => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };

  return (
    <div className="flex items-center gap-3 mt-6">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        className="flex-1 border border-[#E2DFFC] rounded-lg px-4 py-2.5 text-xs text-[#0A0847] placeholder-gray-400 outline-none focus:border-[#001984]"
      />
      <button
        onClick={handleAdd}
        className="bg-[#001984] hover:bg-[#001266] text-white font-semibold text-xs rounded-lg px-5 py-2.5 flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <FiPlus size={16} />
        {buttonText}
      </button>
    </div>
  );
};

/* ==========================================================================
   MAIN SUBSCRIPTION MANAGEMENT PAGE
   ========================================================================== */

export default function Subscription() {
  const [activeTab, setActiveTab] = useState("plans"); // 'plans' | 'cancellation'
  const [loading, setLoading] = useState(true);

  // States populated directly from API response
  const [plans, setPlans] = useState([]);
  const [features, setFeatures] = useState([]);
  const [cancellationMetrics, setCancellationMetrics] = useState(null);
  const [reasons, setReasons] = useState([]);
  const [trialSettings, setTrialSettings] = useState({
    enableTrial: false,
    trialDays: 0,
    requirePayment: false,
    autoStartPaid: false,
  });

  // Fetch API response on mount
  useEffect(() => {
    fetchSubscriptionData().then((res) => {
      setPlans(res.plans);
      setFeatures(res.features);
      setCancellationMetrics(res.cancellationMetrics);
      setReasons(res.cancellationReasons);
      setTrialSettings(res.trialSettings);
      setLoading(false);
    });
  }, []);

  // Update field helpers
  const handlePlanChange = (index, field, value) => {
    const updated = [...plans];
    updated[index][field] = value;
    setPlans(updated);
  };

  const handleAddFeature = (newFeature) =>
    setFeatures([...features, newFeature]);
  const handleAddReason = (newReason) => setReasons([...reasons, newReason]);
  const handleRemoveReason = (index) =>
    setReasons(reasons.filter((_, i) => i !== index));

  const handleTrialSettingChange = (field, value) => {
    setTrialSettings((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-500 text-sm font-[Inter]">
        Loading subscription settings...
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen p-6 font-[Inter] space-y-6">
      {/* Title Header */}
      <div>
        <h1 className="text-xl font-bold text-[#0A0847]">Plans & Features</h1>
        <p className="text-sm text-[#0A084799] font-medium mt-2">
          {activeTab === "plans"
            ? "Manage subscription pricing and features."
            : "Manage retention reasons and trial enrollment."}
        </p>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="border-b border-[#E2DFFC] flex items-center gap-8">
        <button
          onClick={() => setActiveTab("plans")}
          className={`flex items-center gap-2 px-4 pb-3 text-xs font-bold transition-colors border-b-2 ${
            activeTab === "plans"
              ? "border-[#001984] border-lg text-[#001984]"
              : "border-transparent text-gray-500 hover:text-gray-800 cursor-pointer"
          }`}
        >
          <BsGrid size={20} />
          Plans & Features
        </button>
        <button
          onClick={() => setActiveTab("cancellation")}
          className={`flex items-center gap-2 pb-3 text-xs font-bold transition-colors border-b-2 ${
            activeTab === "cancellation"
              ? "border-[#001984] border-lg text-[#001984]"
              : "border-transparent text-gray-500 hover:text-gray-800 cursor-pointer"
          }`}
        >
          <FiCalendar size={20} />
          Cancellation & Free Trial
        </button>
      </div>

      {/* TAB 1: PLANS & FEATURES */}
      {activeTab === "plans" && (
        <div className="space-y-6">
          {/* Plan Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plans.map((plan, idx) => (
              <div
                key={plan.id}
                className={`rounded-lg border p-5 space-y-4 relative transition-colors ${
                  plan.isPopular
                    ? "bg-[#FEFCF7] border-[#FBE7B7]"
                    : "bg-white border-[#E2DFFC]"
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#0019841A] pb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl ${plan.iconColor} text-white flex items-center justify-center`}
                    >
                      <FaCalendarDays size={18} />
                    </div>
                    <h3 className="font-semibold text-sm text-[#0A0847]">
                      {plan.title}
                    </h3>
                  </div>

                  {plan.isPopular ? (
                    <span className="bg-[#FEFCF7] text-[#ED8D31] border border-[#FEEAB5] text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 uppercase tracking-wider">
                      <FiStar size={12} className="fill-current" />
                      Most Popular
                    </span>
                  ) : (
                    <button className="flex items-center gap-1 text-xs font-medium text-[#001984] bg-[#F3F7FD] px-3 py-2 rounded-lg border border-[#E2DFFC] hover:bg-[#E2DFFC] transition-colors cursor-pointer">
                      <BiSolidEditAlt size={16} /> Edit Plan
                    </button>
                  )}
                </div>

                {/* Pricing Fields */}
                <div className="space-y-2.5 pt-1">
                  <PriceInputRow
                    label="Regular Price"
                    price={plan.regPrice}
                    duration={plan.regDur}
                    onChangePrice={(val) =>
                      handlePlanChange(idx, "regPrice", val)
                    }
                    onChangeDuration={(val) =>
                      handlePlanChange(idx, "regDur", val)
                    }
                  />
                  <PriceInputRow
                    label="Promotional Price"
                    price={plan.promoPrice}
                    duration={plan.promoDur}
                    isOptional
                    onChangePrice={(val) =>
                      handlePlanChange(idx, "promoPrice", val)
                    }
                    onChangeDuration={(val) =>
                      handlePlanChange(idx, "promoDur", val)
                    }
                  />
                  <PriceInputRow
                    label="Keep My Plan"
                    price={plan.keepPrice}
                    duration={plan.keepDur}
                    isOptional
                    onChangePrice={(val) =>
                      handlePlanChange(idx, "keepPrice", val)
                    }
                    onChangeDuration={(val) =>
                      handlePlanChange(idx, "keepDur", val)
                    }
                  />
                </div>

                {/* Status Options */}
                <StatusRadioGroup
                  planId={plan.id}
                  status={plan.status}
                  onChange={(newStatus) =>
                    handlePlanChange(idx, "status", newStatus)
                  }
                />
              </div>
            ))}
          </div>

          {/* Plan Features Card */}
          <div className="bg-white rounded-lg border border-[#E2DFFC] p-6 space-y-6">
            <div className="flex items-start gap-3">
              <FiSettings
                size={22}
                className="text-[#001984] mt-0.5 shrink-0"
              />
              <div>
                <h3 className="font-bold text-base text-[#0A0847] flex items-center gap-1.5">
                  Plan Features{" "}
                  <span className="text-sm font-normal text-[#0A0847]">
                    (Applies to All Plans)
                  </span>
                </h3>
                <p className="text-xs text-gray-400 italic mt-0.5">
                  All features apply to all plans. Plan cancel after big price
                  and discount.
                </p>
              </div>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 gap-x-8">
              {features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-xs font-semibold text-[#0A0847CC]"
                >
                  <span className="w-4 h-4 rounded bg-[#259147] text-white flex items-center justify-center shrink-0">
                    <FiCheck size={12} />
                  </span>
                  {feat}
                </div>
              ))}
            </div>

            {/* Add Feature Input */}
            <AddItemInput
              placeholder="Enter new feature..."
              buttonText="Add"
              onAdd={handleAddFeature}
            />
          </div>
        </div>
      )}

      {/* TAB 2: CANCELLATION & FREE TRIAL */}
      {activeTab === "cancellation" && (
        <div className="space-y-6">
          {/* Top Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-[#E2DFFC] px-5 py-8 flex items-center gap-4">
              <div className="w-18 h-18 rounded-xl bg-[#6897F8] text-white flex items-center justify-center">
                <FiTrendingDown size={32} />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0A084799]">
                  Total Cancellations
                </p>
                <p className="text-2xl font-bold text-[#001984] mt-0.5">
                  {cancellationMetrics?.totalCancellations}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-[#E2DFFC] px-5 py-8 flex items-center gap-4">
              <div className="w-18 h-18 rounded-xl bg-[#9E6AF2] text-white flex items-center justify-center">
                <FiStar size={32} className="fill-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0A084799]">
                  Most Common Reason
                </p>
                <p className="text-xl font-bold text-[#001984] mt-0.5">
                  {cancellationMetrics?.mostCommonReason}{" "}
                  <span className="text-xl font-semibold text-[#001984]">
                    ({cancellationMetrics?.mostCommonPercentage})
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Cancellation Reasons */}
          <div className="bg-white rounded-lg border border-[#E2DFFC] p-6 space-y-4">
            <h3 className="font-bold text-sm text-[#0A0847] flex items-center gap-2">
              <TbFileOff size={22} className="text-[#001984]" />
              Cancellation Reasons
            </h3>

            <div className="space-y-3">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-center gap-3">
                  {/* Drag Indicator */}
                  <MdOutlineDragIndicator
                    size={28}
                    className="text-[#001984] cursor-grab shrink-0"
                  />

                  {/* Text Input Container */}
                  <div className="flex-1 flex items-center gap-3 border border-[#E2DFFC] rounded-md px-3 py-2.5 bg-white">
                    <span className="w-6 h-6 rounded bg-[#EEF2FF] text-[#001984] font-bold text-xs flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-xs font-medium text-[#0A0847CC]">
                      {reason}
                    </span>
                  </div>

                  {/* Delete Button Card */}
                  <button
                    onClick={() => handleRemoveReason(index)}
                    className="w-12 h-12 px-3 py-2.5 rounded-md border border-[#ECECEC] bg-white text-[#DE2128] hover:bg-red-50 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Reason Input */}
            <AddItemInput
              placeholder="Enter new reason..."
              buttonText="Add"
              onAdd={handleAddReason}
            />
          </div>

          {/* Free Trial Settings */}
          <div className="bg-white rounded-lg border border-[#E2DFFC] p-6 space-y-5">
            <h3 className="font-bold text-sm text-[#0A0847] flex items-center gap-2">
              <FiGift size={26} className="text-[#001984]" />
              Free Trial Settings{" "}
              <span className="text-xs font-normal">
                (Applies to All Plans)
              </span>
            </h3>

            <div className="divide-y divide-[#0019841A] text-xs font-[Inter]">
              {/* Row 1: Enable Free Trial */}
              <div className="py-3 flex items-center justify-between border-t border-[#0019841A]">
                <div className="flex items-center gap-2.5 font-semibold text-[#0A0847]">
                  <span className="p-1.5 rounded-lg bg-[#10B981] text-white">
                    <FiGift size={14} />
                  </span>
                  Enable Free Trial
                </div>
                <ToggleSwitch
                  enabled={trialSettings.enableTrial}
                  onChange={(val) =>
                    handleTrialSettingChange("enableTrial", val)
                  }
                />
              </div>

              {/* Row 2: Trial Duration */}
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5 font-semibold text-[#0A0847]">
                  <span className="p-1.5 rounded-lg bg-[#3B82F6] text-white">
                    <FiClock size={14} />
                  </span>
                  Trial Duration
                </div>
                <div className="flex items-center border border-[#E2DFFC] rounded-lg overflow-hidden">
                  <input
                    type="number"
                    value={trialSettings.trialDays}
                    onChange={(e) =>
                      handleTrialSettingChange(
                        "trialDays",
                        Number(e.target.value),
                      )
                    }
                    className="w-12 text-center text-xs font-bold text-[#0A0847] py-1 outline-none"
                  />
                  <span className="bg-[#F8FAFC] border-l border-[#E2DFFC] px-3 py-1 text-xs text-gray-500 font-medium">
                    day
                  </span>
                </div>
              </div>

              {/* Row 3: Require Payment Method */}
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5 font-semibold text-[#0A0847]">
                  <span className="p-1.5 rounded-lg bg-[#10B981] text-white">
                    <FiCreditCard size={14} />
                  </span>
                  Require Payment Method
                </div>
                <ToggleSwitch
                  enabled={trialSettings.requirePayment}
                  onChange={(val) =>
                    handleTrialSettingChange("requirePayment", val)
                  }
                />
              </div>

              {/* Row 4: Auto-start paid plan */}
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5 font-semibold text-[#0A0847]">
                  <span className="p-1.5 rounded-lg bg-[#10B981] text-white">
                    <FiPlay size={14} />
                  </span>
                  Auto-start paid plan after trial
                </div>
                <ToggleSwitch
                  enabled={trialSettings.autoStartPaid}
                  onChange={(val) =>
                    handleTrialSettingChange("autoStartPaid", val)
                  }
                />
              </div>
            </div>

            {/* Info Callout */}
            <div className="bg-[#F3F7FD99] rounded-xl p-3 flex items-center gap-2 text-xs text-[#001984] font-medium border border-[#E2DFFC]">
              <BsFillInfoCircleFill size={20} className="shrink-0 text-bold" />
              <span className="italic">
                Users will be notified before the trial ends and before
                conversion to a paid plan.
              </span>
            </div>

            {/* Trial Preview Banner */}
            <div className="bg-[#F3F7FD] rounded-xl p-3.5 flex items-center gap-3 border border-[#E2DFFC]">
              <div className="p-3 rounded-full bg-[#9E6AF2] text-white shrink-0">
                <BsFillEyeFill size={20} />
              </div>
              <div>
                <p className="text-base font-semibold text-[#001984]">
                  Trial Preview
                </p>
                <p className="text-sm text-[#001984] font-medium mt-0.5">
                  {trialSettings.trialDays} days free → Paid plan starts
                  automatically
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Button Bar */}
      <div className="pt-2">
        <button className="w-full bg-[#001984] hover:bg-[#001266] text-white text-xs font-semibold text-sm py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer">
          <FiSave size={18} />
          Save Plan Changes
        </button>
      </div>
    </div>
  );
}
