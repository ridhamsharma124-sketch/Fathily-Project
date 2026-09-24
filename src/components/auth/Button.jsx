export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`mt-[16px] h-[40px] w-full rounded-[6px] bg-[#0B1F7A] text-[13px] font-semibold text-white transition hover:bg-[#0a1c68] active:scale-[0.99] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}