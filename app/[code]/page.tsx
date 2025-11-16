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

  useEffect(() => {
    // Validate the code from the URL parameter
    const code = params.code as string;
    if (!code || !validateInviteCode(code)) {
      router.replace("/");
    } else {
      setIsAuthorized(true);
    }
  }, [router, params]);

  const handleAnimationComplete = () => {
    setShowCard(true);
  };

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
