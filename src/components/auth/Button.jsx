export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`h-11 w-full rounded-lg bg-navy text-[14px] font-semibold text-white transition hover:bg-navy-deep active:scale-[0.99] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}