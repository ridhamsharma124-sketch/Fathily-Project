import { PiPaperPlaneRight } from "react-icons/pi";

export default function ChatFab() {
  return (
    <button
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-600 active:scale-95"
      aria-label="Chat assistant"
    >
      <PiPaperPlaneRight size={22} />
    </button>
  );
}