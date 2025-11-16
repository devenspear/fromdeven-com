"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { validateInviteCode, setValidated } from "@/lib/validation";

export function InviteGate() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Clear any error when user starts typing
    if (error && code) {
      setError("");
    }
  }, [code, error]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate a brief validation delay for polish
    await new Promise((resolve) => setTimeout(resolve, 500));

    const isValid = validateInviteCode(code);

    if (isValid) {
      setValidated();
      router.push("/card");
    } else {
      setError("That code doesn't ring a bell. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center paper-texture vignette px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-lg card-shadow p-8 md:p-12">
          {/* Header text */}
          <p className="text-sm text-text-secondary text-center mb-6 tracking-wide uppercase">
            A private note awaits you.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="invite-code"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Invite code
              </label>
              <input
                id="invite-code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isLoading}
                placeholder="Enter your code"
                className={`
                  w-full px-4 py-3 rounded-md
                  bg-white border-2
                  ${error
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-accent-gold"
                  }
                  text-text-primary placeholder:text-text-light
                  focus:outline-none focus:ring-2 focus:ring-accent-gold/20
                  transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${error ? "animate-shake" : ""}
                `}
                autoComplete="off"
                autoFocus
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !code.trim()}
              className="
                w-full px-6 py-3 rounded-md
                bg-accent-indigo hover:bg-accent-indigo/90
                text-white font-medium
                focus:outline-none focus:ring-2 focus:ring-accent-indigo/50 focus:ring-offset-2
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                disabled:hover:bg-accent-indigo
              "
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Checking...
                </span>
              ) : (
                "View"
              )}
            </button>
          </form>

          {/* Subtle footer hint */}
          <p className="mt-8 text-xs text-text-light text-center">
            If you believe you should have access, please check the code you
            received.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
