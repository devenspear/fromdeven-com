"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isValidated } from "@/lib/validation";
import { EnvelopeAnimation } from "@/components/card/EnvelopeAnimation";
import { CardContent } from "@/components/card/CardContent";

export default function CardPage() {
  const router = useRouter();
  const [showCard, setShowCard] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if user is validated
    if (!isValidated()) {
      router.replace("/");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const handleAnimationComplete = () => {
    setShowCard(true);
  };

  // Don't render anything until we've checked authorization
  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {!showCard ? (
        <EnvelopeAnimation onComplete={handleAnimationComplete} />
      ) : (
        <CardContent />
      )}
    </div>
  );
}
