
import React from "react";
import { Facebook, Apple } from "lucide-react";

interface Props {
  onGoogleSignup: () => void;
  onFacebookSignup: () => void;
  onAppleSignup: () => void;
}
export default function SignupSocialButtons({
  onGoogleSignup,
  onFacebookSignup,
  onAppleSignup,
}: Props) {
  return (
    <div className="flex flex-col gap-3 mb-8">
      <button
        type="button"
        onClick={onGoogleSignup}
        className="flex items-center justify-center gap-2 rounded-lg bg-white/90 hover:bg-white text-[#0D1A2B] font-semibold px-6 py-2 shadow transition border border-white/50"
      >
        <span
          style={{
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            fontSize: "20px",
            color: "#4285F4",
            background: "white",
            borderRadius: "50%",
            width: "26px",
            height: "26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Google G"
        >
          G
        </span>
        Sign up with Google
      </button>
      <button
        type="button"
        onClick={onFacebookSignup}
        className="flex items-center justify-center gap-2 rounded-lg bg-[#1977f3] hover:bg-[#1666c1]/95 text-white font-semibold px-6 py-2 shadow transition"
      >
        <Facebook className="w-5 h-5" />
        Sign up with Facebook
      </button>
      <button
        type="button"
        onClick={onAppleSignup}
        className="flex items-center justify-center gap-2 rounded-lg bg-[#121212] hover:bg-black/90 text-white font-semibold px-6 py-2 shadow transition"
      >
        <Apple className="w-5 h-5" />
        Sign up with Apple
      </button>
      <div className="flex items-center my-2 text-white/30 gap-2 select-none">
        <span className="flex-1 border-t border-white/20" />
        <span className="text-xs font-medium">or</span>
        <span className="flex-1 border-t border-white/20" />
      </div>
    </div>
  );
}
