export default function AuthFooter() {
  return (
    <footer className="flex h-[40px] shrink-0 items-center justify-between bg-[#0A2463] px-[24px] text-[11px] font-normal italic text-white">
      <span>© 2026, VPeters Initiative</span>
      <div className="flex items-center">
        <a href="#" className="transition hover:text-white/80">
          Privacy Policy
        </a>
        <span className="mx-[16px] h-[14px] border-l border-white/40" />
        <a href="#" className="transition hover:text-white/80">
          Terms of Service
        </a>
        <span className="mx-[16px] h-[14px] border-l border-white/40" />
        <a href="#" className="transition hover:text-white/80">
          Contact Us
        </a>
      </div>
    </footer>
  );
}