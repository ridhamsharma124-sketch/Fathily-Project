export default function AuthFooter() {
  return (
    <footer className="relative z-10 flex flex-col items-center justify-between gap-2 bg-navy px-6 py-3 text-[12px] text-muted md:flex-row">
      <span>© 2026. VPeters Initiative</span>
      <div className="flex gap-4">
        <a href="#" className="transition hover:text-white">
          Privacy Policy
        </a>
        <a href="#" className="transition hover:text-white">
          Terms of Service
        </a>
        <a href="#" className="transition hover:text-white">
          Contact Us
        </a>
      </div>
    </footer>
  );
}