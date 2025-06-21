import React from "react";
export default function SignupLogoHeader() {
  return <div className="flex flex-col items-center mb-8 bg-[#000a00]/[0.01] px-0 my-0 mx-0 py-0 rounded-2xl">
      <img src="/lovable-uploads/8b5eeac1-aa2e-4fee-ae27-07892dbcf765.png" alt="OptiMised Logo" className="w-[300px] h-[300px] object-scale-down mb-3" style={{
      opacity: 0.17,
      // reduced opacity for more transparency
      filter: "brightness(1.55) contrast(1.21) saturate(0.8)",
      backgroundColor: "transparent"
    }} />
      <h2 className="text-2xl font-bold text-white">Get Started with OptiMised</h2>
    </div>;
}