
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupSocialButtons from "./SignupSocialButtons";
import SignupLogoHeader from "./SignupLogoHeader";
import SignupForm from "./SignupForm";

const bgDark = "bg-[#0D1A2B]";
const teal = "#3CE8B3]";

export default function SignupPage() {
  const nav = useNavigate();

  const [values, setValues] = useState({
    restaurant: "",
    email: "",
    password: "",
    confirm: "",
    language: "en",
    branches: ""
  });

  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const err: any = {};
    if (!values.restaurant) err.restaurant = "Required";
    if (!values.email) err.email = "Required";
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) err.email = "Invalid email";
    if (!values.password) err.password = "Required";
    if (values.password.length < 6) err.password = "Min 6 characters";
    if (!values.confirm) err.confirm = "Required";
    if (values.confirm !== values.password) err.confirm = "Passwords must match";
    if (!values.branches) err.branches = "Please select a branch count";
    return err;
  };

  const isValid = Object.keys(validate()).length === 0;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setValues({ ...values, [e.target.name]: e.target.value });
    setTouched({ ...touched, [e.target.name]: true });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      restaurant: true,
      email: true,
      password: true,
      confirm: true,
      branch: true
    });
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setLoading(true);

    // Mock "signup" async
    setTimeout(() => {
      setLoading(false);
      if (values.email === "test@email.com") {
        setErrors({ email: "Email already in use" });
      } else {
        // success
        if ((window as any).toast) {
          (window as any).toast("Account created", { type: "success" });
        }
        nav("/setup"); // Redirect to setup wizard after signup
      }
    }, 1500);
  }

  // Social signup button handlers
  function handleGoogleSignup() {
    if ((window as any).toast) {
      (window as any).toast("Google sign up is not implemented", { type: "info" });
    }
  }
  function handleFacebookSignup() {
    if ((window as any).toast) {
      (window as any).toast("Facebook sign up is not implemented", { type: "info" });
    }
  }
  function handleAppleSignup() {
    if ((window as any).toast) {
      (window as any).toast("Apple sign up is not implemented", { type: "info" });
    }
  }

  return (
    <div className={`${bgDark} min-h-screen w-full flex items-center justify-center`}>
      <div className="w-full max-w-md">
        <SignupLogoHeader />
        <SignupSocialButtons
          onGoogleSignup={handleGoogleSignup}
          onFacebookSignup={handleFacebookSignup}
          onAppleSignup={handleAppleSignup}
        />
        <SignupForm
          values={values}
          errors={errors}
          touched={touched}
          loading={loading}
          isValid={isValid}
          handleChange={handleChange}
          setValues={setValues}
          nav={nav}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
