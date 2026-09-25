import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../../components/auth/AuthCard";
import Input from "../../components/auth/Input";
import Button from "../../components/auth/Button";

export default function Login() {
  const navigate = useNavigate();
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <AuthCard
      title="Admin Login"
      subtitle="Please enter your credentials to access the admin dashboard."
    >
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Username or Email"
          type="email"
          placeholder="Username or email"
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          required
        />

        <div className="mt-[12px] flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-[6px] text-[11px] text-[#5B5F8C]">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-[14px] w-[14px] accent-[#0B1F7A]"
            />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="text-[11px] font-semibold text-[#0B1250] transition hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit">Sign in</Button>
      </form>
    </AuthCard>
  );
}