export default function AuthFooter() {
  return (
    <footer className="flex min-h-[35px] shrink-0 flex-col items-center justify-center gap-1 bg-[var(--auth-footer)] px-[16px] py-2 text-center text-[11px] font-normal italic leading-[18px] text-white/80 sm:flex-row sm:gap-3 sm:px-[24px] sm:py-0 sm:text-left lg:h-[52px] lg:pl-[43px] lg:pr-[40px] lg:text-[12px]">
      <span>
        © 2026. <span className="font-semibold">VPeters Initiative</span>
      </span>
      <div className="flex flex-wrap items-center justify-center gap-[10px] sm:gap-[20px]">
        <a href="#" className="transition hover:text-white">
          Privacy Policy
        </a>
        <span className="hidden h-[13px] border-l border-white/40 sm:block" />
        <a href="#" className="transition hover:text-white">
          Terms of Service
        </a>
        <span className="hidden h-[13px] border-l border-white/40 sm:block" />
        <a href="#" className="transition hover:text-white">
          Contact Us
        </a>
      </div>
    </footer>
  );
}