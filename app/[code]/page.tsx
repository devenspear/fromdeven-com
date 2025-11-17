"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { validateInviteCode } from "@/lib/validation";
import { EnvelopeAnimation } from "@/components/card/EnvelopeAnimation";
import { CardContent } from "@/components/card/CardContent";

export default function CardPage() {
  const router = useRouter();
  const params = useParams();
  const [showCard, setShowCard] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isInvalidCode, setIsInvalidCode] = useState(false);

  useEffect(() => {
    // Validate the code from the URL parameter
    const code = params.code as string;
    const isValid = validateInviteCode(code);

    if (!code || !isValid) {
      // Show error message instead of redirecting immediately
      setIsInvalidCode(true);
      setIsAuthorized(false);

      // Redirect after 3 seconds
      const timeout = setTimeout(() => {
        router.replace("/");
      }, 3000);

      return () => clearTimeout(timeout);
    } else {
      setIsInvalidCode(false);
      setIsAuthorized(true);
    }
  }, [router, params]);

  const handleAnimationComplete = () => {
    setShowCard(true);
  };

  // Show error message for invalid codes
  if (isInvalidCode) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center paper-texture vignette px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="bg-card rounded-lg card-shadow p-8 md:p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center"
            >
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.div>

            <h1 className="font-serif text-2xl md:text-3xl text-text-primary mb-4">
              Invalid Invite Code
            </h1>

            <p className="text-text-secondary mb-6">
              The code <span className="font-medium text-text-primary">{params.code}</span> doesn't appear to be valid.
            </p>

            <p className="text-sm text-text-light mb-8">
              If you believe you should have access, please check the invite code you received.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs text-text-light"
            >
              Redirecting to home page in 3 seconds...
            </motion.div>

            <button
              onClick={() => router.replace("/")}
              className="mt-6 px-6 py-2 text-sm bg-accent-indigo hover:bg-accent-indigo/90 text-white rounded-md transition-colors"
            >
              Go to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Don't render anything until we've checked authorization
  if (!isAuthorized) {
    return null;
  }

  return (
    <motion.div
      className="min-h-screen bg-background relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <AnimatePresence mode="wait">
        {!showCard ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <EnvelopeAnimation onComplete={handleAnimationComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <CardContent />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
