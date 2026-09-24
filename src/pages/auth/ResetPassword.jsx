import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../../components/auth/AuthCard";
import Input from "../../components/auth/Input";
import Button from "../../components/auth/Button";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirm) {
      alert("Passwords do not match.");
      return;
    }
    navigate("/login");
  };

  return (
    <AuthCard
      title="Reset Password"
      subtitle="Set a new password for your account to regain access."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="new-password"
          label="New Password"
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Input
          id="confirm-password"
          label="Confirm Password"
          type="password"
          placeholder="Re-enter new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <Button type="submit">Save</Button>
        <p className="text-center text-[13px] text-subtext">
          <Link to="/login" className="font-medium text-navy transition hover:underline">
            Back to login
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}