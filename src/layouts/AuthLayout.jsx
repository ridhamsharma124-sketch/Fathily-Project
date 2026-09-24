import { Outlet } from "react-router-dom";
import Logo from "../components/shared/Logo";
import AuthFooter from "../components/auth/AuthFooter";

export default function AuthLayout() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <img
        src="/auth-bg.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-900/45 via-blue-500/25 to-blue-200/15"
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="px-6 py-6 lg:px-12 lg:py-8">
          <Logo className="h-14" />
        </div>

        <div className="flex flex-1 flex-col gap-8 px-6 pb-12 lg:flex-row lg:items-start lg:gap-12 lg:px-10 lg:pb-16">
          <div className="flex flex-1 flex-col items-center justify-center pb-4 text-center lg:mt-26 lg:items-start lg:pl-10 lg:pb-0 lg:text-left">
            <h1 className="text-[28px] font-bold leading-tight text-white drop-shadow-[0_2px_6px_rgba(15,26,74,0.55)] lg:text-[30px]">
              Welcome Back!
            </h1>
            <p className="mt-2 text-[14px] text-blue-50 drop-shadow-[0_1px_4px_rgba(15,26,74,0.5)]">
              We're glad to see you again.
            </p>
          </div>

          <div className="flex w-full justify-center lg:w-auto lg:shrink-0 lg:pt-0 lg:pr-6 lg:-mt-26">
            <div className="w-full max-w-[380px]">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <AuthFooter />
    </div>
  );
}