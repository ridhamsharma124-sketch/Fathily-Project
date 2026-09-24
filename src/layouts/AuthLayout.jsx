import { Outlet } from "react-router-dom";
import Logo from "../components/shared/Logo";
import AuthFooter from "../components/auth/AuthFooter";

export default function AuthLayout() {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <main className="relative flex flex-1 min-h-0 items-center justify-end overflow-hidden px-[24px] lg:pr-[70px]">
        {/* Background - unchanged */}
        <img
          src="/bgimg.png"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-fill"
        />
      

        <div >
         <Logo
  className="absolute left-[24px] top-[24px] z-10 h-[62px] w-[140px] object-contain
             md:left-[36px] md:top-[40px] md:h-[78px] md:w-[180px]
             lg:left-[43px] lg:top-[25px] lg:h-[96px] lg:w-[220px]"
/>
        </div>
<div className="pointer-events-none absolute left-0 right-1/2 top-[38%] flex -translate-y-1/2 items-center justify-center">
          <div className="w-full max-w-[460px] px-6 text-center">
            <h1 className="text-[32px] font-bold leading-tight text-[#0B1F7A]  ">
              Welcome Back!
            </h1>
            <p className="mt-[8px] text-[14px] font-normal text-[#0B1F7A]">
              We're glad to see you again.
            </p>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-[520px]">
          <Outlet />
        </div>
      </main>

      <AuthFooter />
    </div>
  );
}