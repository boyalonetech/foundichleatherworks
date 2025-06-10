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
  const emoji = text.includes("Successful")
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
      <span className="text-sm sm:text-base font-medium">
        {emoji} {text}
      </span>
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
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );
  const [showPassword, setShowPassword] = useState(false); // 👁️

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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 pr-10 rounded-lg bg-black/5 focus:ring-2 ring-found text-black placeholder-black/50"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-600 hover:text-black"
              >
                {showPassword ? (
                  // Eye-off icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      fill="currentColor"
                      d="M876.8 156.8c0-9.6-3.2-16-9.6-22.4s-12.8-9.6-22.4-9.6s-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8c-160 16-288 73.6-377.6 176S0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4s3.2 16 9.6 22.4s12.8 9.6 22.4 9.6s16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4m-646.4 528Q115.2 579.2 76.8 512q43.2-72 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4m140.8-96Q352 555.2 352 512c0-44.8 16-83.2 48-112s67.2-48 112-48c28.8 0 54.4 6.4 73.6 19.2zM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6q-43.2 72-153.6 172.8c-73.6 67.2-172.8 108.8-284.8 115.2c-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8c160-16 288-73.6 377.6-176S1024 528 1024 512s-48.001-73.6-134.401-176"
                    />
                    <path
                      fill="currentColor"
                      d="M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2c64 0 115.2-22.4 160-64c41.6-41.6 64-96 64-160c0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4c0 44.8-16 83.2-48 112s-67.2 48-112 48"
                    />
                  </svg>
                ) : (
                  // Eye icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </span>
            </div>
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
