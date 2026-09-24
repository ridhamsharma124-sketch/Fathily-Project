export default function Logo({ className = "" }) {
  return (
    <img
      src="/logo.png"
      alt="Faithly"
      className={className}
    />
  );
}