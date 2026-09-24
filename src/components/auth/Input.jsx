import { useState } from "react";
import { PiEye, PiEyeSlash } from "react-icons/pi";

export default function Input({ label, id, type = "text", placeholder, ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-navy">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={isPassword && show ? "text" : type}
          placeholder={placeholder}
          className="h-11 w-full rounded-lg border border-line bg-white px-3 text-[14px] text-navy placeholder:text-subtext outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/10"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-subtext transition hover:text-navy"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <PiEyeSlash size={18} /> : <PiEye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}