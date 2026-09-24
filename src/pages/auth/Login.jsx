import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../../components/auth/AuthCard";
import Input from "../../components/auth/Input";
import Button from "../../components/auth/Button";

export default function Login() {
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <AuthCard title="Admin Login" subtitle="Welcome back! Please sign in to continue.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="email"
          label="Username / Email"
          type="email"
          placeholder="Enter your email"
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
        />

        <div className="flex items-center justify-between text-[13px]">
          <label className="flex cursor-pointer items-center gap-2 text-subtext">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 accent-navy"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="font-medium text-navy transition hover:underline">
            Forgot Password?
          </Link>
        </div>

        <Button type="submit">Sign in</Button>
      </form>
    </AuthCard>
  );
}