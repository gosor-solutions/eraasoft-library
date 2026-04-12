import { Button } from "@/components/shared/button";
import { authHelper } from "@/helpers/authHelper";
import {
  useLoginWithPhone,
  useVerifyOtp,
} from "@/hooks/mutations/useAuthMutations";
import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { useLocation, useNavigate } from "react-router";

const OTP_LENGTH = 4;

export default function OTPVerificationEnhanced() {
  const location = useLocation();
  const navigate = useNavigate();
  const phone = (location.state as { phone?: string } | null)?.phone;

  // Guard: no phone in state → back to login
  useEffect(() => {
    if (!phone) {
      navigate("/login", { replace: true });
    }
  }, [phone, navigate]);

  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { mutate: verifyOtp } = useVerifyOtp();
  const { mutate: loginWithPhone } = useLoginWithPhone();

  useEffect(() => {
    if (timeLeft === 0 && !canResend) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, canResend]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    setError("");

    const newOtp = [...otp];

    if (value.length > 1) {
      const pastedData = value.slice(0, OTP_LENGTH).split("");
      for (let i = 0; i < OTP_LENGTH; i++) {
        newOtp[i] = pastedData[i] || "";
      }
      setOtp(newOtp);
      const lastFilledIndex = Math.min(pastedData.length, OTP_LENGTH) - 1;
      inputRefs.current[lastFilledIndex]?.focus();
      if (pastedData.length === OTP_LENGTH) {
        handleSubmit(newOtp.join(""));
      }
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      handleSubmit(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "Enter") {
      handleVerify();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pastedData) {
      const newOtp = [...otp];
      const pastedArray = pastedData.slice(0, OTP_LENGTH).split("");
      pastedArray.forEach((digit, index) => {
        newOtp[index] = digit;
      });
      setOtp(newOtp);
      const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
      const focusIndex =
        nextEmptyIndex !== -1 ? nextEmptyIndex : OTP_LENGTH - 1;
      inputRefs.current[focusIndex]?.focus();
      if (newOtp.every((digit) => digit !== "")) {
        handleSubmit(newOtp.join(""));
      }
    }
  };

  const handleSubmit = async (otpValue: string) => {
    if (otpValue.length !== OTP_LENGTH || !phone) return;
    setIsLoading(true);
    setError("");

    verifyOtp(
      { phone, otp: otpValue, device_token: "web" },
      {
        onSuccess: (res) => {
          if (res?.data?.token) {
            authHelper.setAuth(res.data.token); 
            navigate("/", { replace: true });
          } else {
            setError("Invalid OTP. Please try again.");
            setOtp(new Array(OTP_LENGTH).fill(""));
            inputRefs.current[0]?.focus();
          }
          setIsLoading(false);
        },
        onError: () => {
          setError("Verification failed. Please try again.");
          setIsLoading(false);
        },
      },
    );
  };

  const handleVerify = () => {
    const otpValue = otp.join("");
    if (otpValue.length !== OTP_LENGTH) {
      setError("Please enter complete OTP");
      return;
    }
    handleSubmit(otpValue);
  };

  const handleResend = () => {
    if (!canResend || !phone) return;
    setIsLoading(true);
    setError("");

    loginWithPhone(
      { phone },
      {
        onSuccess: () => {
          setOtp(new Array(OTP_LENGTH).fill(""));
          setTimeLeft(60);
          setCanResend(false);
          inputRefs.current[0]?.focus();
          setIsLoading(false);
        },
        onError: () => {
          setError("Failed to resend code. Please try again.");
          setIsLoading(false);
        },
      },
    );
  };

  if (!phone) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <div className="w-full max-w-md ">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Verification Code
          </h1>
          <p className="text-sm text-gray-500">
            We sent a code to <span className="font-semibold">{phone}</span>.
            Enter it below.
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              // @ts-expect-error it is a ref function
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={isLoading}
              className={`w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-bold border-2 rounded-xl transition-all
                ${
                  error
                    ? "border-red-500 bg-red-50"
                    : digit
                      ? "#003E6D bg-blue-50 #003E6D"
                      : "border-gray-300 bg-white"
                }
                focus:border-[#003E6D] focus:outline-none focus:ring-2 focus:ring-blue-200
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 text-center">{error}</p>
          </div>
        )}

        {/* Timer */}
        {!canResend && (
          <div className="text-center mb-4">
            <p className="text-sm text-gray-500">
              Resend code in{" "}
              <span className="font-semibold text-[#003E6D]">
                {formatTime(timeLeft)}
              </span>
            </p>
          </div>
        )}

        {/* Loading Indicator for auto-submit */}
        {isLoading && (
          <div className="flex items-center justify-center gap-2 mb-4 text-blue-900">
            <svg
              className="animate-spin h-5 w-5"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-sm font-medium">Verifying...</span>
          </div>
        )}

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          disabled={otp.some((digit) => digit === "") || isLoading}
          className="w-full py-3 mb-4"
        >
          Verify
        </Button>

        {/* Resend Link */}
        <div className="text-center text-sm text-gray-600">
          Didn't receive a code?{" "}
          <button
            onClick={handleResend}
            disabled={!canResend || isLoading}
            className={`font-semibold transition-all ${
              canResend
                ? "text-blue-900 hover:text-blue-700 hover:underline cursor-pointer"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            Send again
          </button>
        </div>
      </div>
    </div>
  );
}
