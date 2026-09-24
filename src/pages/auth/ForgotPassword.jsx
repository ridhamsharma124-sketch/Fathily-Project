import { useNavigate, Link } from "react-router-dom";
import AuthCard from "../../components/auth/AuthCard";
import Input from "../../components/auth/Input";
import Button from "../../components/auth/Button";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/reset-password");
  };

  return (
    <AuthCard
      title="Forgot Password"
      subtitle="Don't worry! It happens. Please enter the email address associated with your account."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="email"
          label="Email / Mobile Number"
          placeholder="Enter email or mobile number"
          required
        />
        <Button type="submit">Submit</Button>
        <p className="text-center text-[13px] text-subtext">
          Remembered it?{" "}
          <Link to="/login" className="font-medium text-navy transition hover:underline">
            Back to login
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}