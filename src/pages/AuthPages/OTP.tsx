import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ClipboardEvent,
} from "react";
import { Button } from "@/components/shared/Button";

interface OTPVerificationEnhancedProps {
  length?: number;
  onComplete?: (otp: string) => Promise<boolean>;
  onResend?: () => Promise<void>;
  autoSubmit?: boolean;
  resendTimer?: number;
}

export default function OTPVerificationEnhanced({
  length = 4,
  onComplete,
  onResend,
  autoSubmit = true,
  resendTimer = 60,
}: OTPVerificationEnhancedProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(resendTimer);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    setError(""); // Clear error on input

    const newOtp = [...otp];

    if (value.length > 1) {
      const pastedData = value.slice(0, length).split("");
      for (let i = 0; i < length; i++) {
        newOtp[i] = pastedData[i] || "";
      }
      setOtp(newOtp);

      const lastFilledIndex = Math.min(pastedData.length, length) - 1;
      inputRefs.current[lastFilledIndex]?.focus();

      if (pastedData.length === length && autoSubmit) {
        handleSubmit(newOtp.join(""));
      }
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit when complete
    if (newOtp.every((digit) => digit !== "") && autoSubmit) {
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
    } else if (e.key === "ArrowRight" && index < length - 1) {
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
      const pastedArray = pastedData.slice(0, length).split("");

      pastedArray.forEach((digit, index) => {
        newOtp[index] = digit;
      });

      setOtp(newOtp);

      const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
      const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;
      inputRefs.current[focusIndex]?.focus();

      if (newOtp.every((digit) => digit !== "") && autoSubmit) {
        handleSubmit(newOtp.join(""));
      }
    }
  };

  const handleSubmit = async (otpValue: string) => {
    if (otpValue.length !== length) return;

    setIsLoading(true);
    setError("");

    try {
      const isValid = await onComplete?.(otpValue);

      if (!isValid) {
        setError("Invalid OTP. Please try again.");
        setOtp(new Array(length).fill(""));
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      setError("Verification failed. Please try again.");
      console.error("Verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join("");

    if (otpValue.length !== length) {
      setError("Please enter complete OTP");
      return;
    }

    handleSubmit(otpValue);
  };

  const handleResend = async () => {
    if (!canResend) return;

    setIsLoading(true);
    setError("");

    try {
      await onResend?.();
      setOtp(new Array(length).fill(""));
      setTimeLeft(resendTimer);
      setCanResend(false);
      inputRefs.current[0]?.focus();
    } catch (error) {
      setError("Failed to resend code. Please try again.");
      console.error("Resend error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <div className="w-full max-w-md ">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Verification Code
          </h1>
          <p className="text-sm text-gray-500">
            Check your email for the OTP and input it here to continue.
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
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

        {/* Verify Button (shown only if auto-submit is off) */}
        {!autoSubmit && (
          <Button
            onClick={handleVerify}
            disabled={otp.some((digit) => digit === "") || isLoading}
            className="w-full bg-[#003E6D] hover:bg-[#003E6D] text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4 shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
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
                Verifying...
              </div>
            ) : (
              "Verify"
            )}
          </Button>
        )}

        {/* Loading Indicator for auto-submit */}
        {autoSubmit && isLoading && (
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
