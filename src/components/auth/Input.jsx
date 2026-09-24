import { useState } from "react";
import { PiEye, PiEyeSlash } from "react-icons/pi";

export default function Input({ label, id, type = "text", placeholder, ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="mt-[12px] w-full">
      {label && (
        <label htmlFor={id} className="mb-[6px] block text-[11px] font-semibold text-[#0B1250]">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={isPassword && show ? "text" : type}
          placeholder={placeholder}
          className="h-[40px] w-full rounded-[8px] border border-[#E5E7EB] bg-white px-[14px] text-[12px] text-[#0B1250] outline-none transition placeholder:text-[#6B7280] focus:border-[#0B1F7A]"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#0B1250]"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <PiEye size={16} /> : <PiEyeSlash size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}