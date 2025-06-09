"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const NotificationBar = ({
  text,
  type,
}: {
  text: string;
  type: "success" | "error";
}) => {
  const emoji =
    text.includes("Successful")
      ? "✅"
      : text.includes("Wrong email")
      ? "❌"
      : text.includes("already exists")
      ? "⚠️"
      : "🔄";

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-sm sm:max-w-md px-4 py-3 rounded-xl text-white shadow-lg transition-all duration-300 text-center break-words ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      <span className="text-sm sm:text-base font-medium">{emoji} {text}</span>
    </div>
  );
};

const LoginPage = () => {
  const wixClient = useWixClient();
  const router = useRouter();

  const isLoggedIn = wixClient.auth.loggedIn();
  if (isLoggedIn) {
    // router.push("/");
  }

  const [mode, setMode] = useState(MODE.LOGIN);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<"success" | "error">("success");

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const formTitle =
    mode === MODE.LOGIN
      ? "Welcome Back!"
      : mode === MODE.REGISTER
      ? "Create an Account"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Your Password"
      : "Verify Your Email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset"
      : "Verify";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      let response;

      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({ email, password });
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username },
          });
          break;
        case MODE.RESET_PASSWORD:
          window.location.href = "/contact";
          setMessage("Send us a message to reset your password");
          setNotificationType("success");
          setShowNotification(true);
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          break;
      }

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Successful! Logging In...");
          setNotificationType("success");
          setShowNotification(true);
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken!
          );
          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          wixClient.auth.setTokens(tokens);
          router.push("/");
          break;
        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("Wrong email or password!");
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("Email already exists!");
          } else if (response.errorCode === "resetPassword") {
            setError("You need to reset your password!");
          } else {
            setError("Something went wrong! Refresh the page and try again.");
          }
          setNotificationType("error");
          setShowNotification(true);
          break;
        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.LOGIN);
        default:
          break;
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong! Please try again later.");
      setNotificationType("error");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 animate-fadeIn">
      {showNotification && (
        <NotificationBar text={message || error} type={notificationType} />
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-black/30 rounded-2xl p-8 md:w-[500px] w-full space-y-6 text-black shadow-xl"
      >
        <h1 className="text-4xl font-extrabold text-center tracking-tight">
          {formTitle}
        </h1>

        {mode === MODE.REGISTER && (
          <div className="space-y-1">
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              placeholder="john"
              className="w-full px-4 py-2 rounded-lg bg-black/5 focus:ring-2 ring-found text-black placeholder-black/50"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        {mode === MODE.EMAIL_VERIFICATION ? (
          <div className="space-y-1">
            <label className="text-sm font-medium">Verification Code</label>
            <input
              type="text"
              name="emailCode"
              placeholder="Enter code"
              className="w-full px-4 py-2 rounded-lg bg-black/5 focus:ring-2 ring-found text-black placeholder-black/50"
              onChange={(e) => setEmailCode(e.target.value)}
            />
          </div>
        ) : mode === MODE.RESET_PASSWORD ? (
          <p className="text-center text-lg text-red-600 font-semibold">
            Are you sure you want to reset your password?
          </p>
        ) : (
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@gmail.com"
              className="w-full px-4 py-2 rounded-lg bg-black/5 focus:ring-2 ring-found text-black placeholder-black/50"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}

        {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
          <div className="space-y-1">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-black/5 focus:ring-2 ring-found text-black placeholder-black/50"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        {mode === MODE.LOGIN && (
          <p
            className="text-sm text-blue-700 hover:underline cursor-pointer"
            onClick={() => setMode(MODE.RESET_PASSWORD)}
          >
            Forgot password?
          </p>
        )}

        <button
          disabled={isLoading}
          className="w-full py-3 rounded-lg font-semibold bg-found text-white hover:bg-found/80 transition-all duration-200 flex justify-center items-center gap-2 disabled:bg-gray-500"
        >
          {isLoading ? (
            <svg
              className="w-5 h-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            buttonTitle
          )}
        </button>

        {mode === MODE.LOGIN && (
          <p
            className="text-sm text-center text-blue-700 cursor-pointer hover:underline"
            onClick={() => setMode(MODE.REGISTER)}
          >
            Don’t have an account? Register
          </p>
        )}
        {mode === MODE.REGISTER && (
          <p
            className="text-sm text-center text-blue-700 cursor-pointer hover:underline"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Already have an account? Log in
          </p>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <p
            className="text-sm text-center text-blue-700 cursor-pointer hover:underline"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Go back to Login
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
