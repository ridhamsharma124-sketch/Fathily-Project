export default function Logo({ className = "" }) {
  return (
    <img
      src="/logo.png"
      alt="Faithly"
      className={`h-26 w-auto object-contain ${className}`}
    />
  );
}