"use client";

import { useState } from "react";
import Hero from "@/app/components/Hero";
import LoveLetter from "@/app/components/LoveLetter";
import PhotoCarousel from "@/app/components/PhotoCarousel";
import Timeline from "@/app/components/Timeline";
import Reasons from "@/app/components/Reasons";
// import FutureDreams from "@/app/components/FutureDreams";
import LockedSurprise from "@/app/components/LockedSurprise";
import Footer from "@/app/components/Footer";
import SecretOverlay from "@/app/components/SecretOverlay";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleSecretTrigger = () => {
    if (isUnlocked) {
      setShowSecret(true);
    }
  };

  const handleSecretClose = () => {
    setShowSecret(false);
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Hero />
      <LoveLetter />
      <PhotoCarousel />
      <Timeline />
      <Reasons />
      {/* <FutureDreams /> */}
      <LockedSurprise onUnlock={handleUnlock} />
      <Footer onSecretTrigger={handleSecretTrigger} isUnlocked={isUnlocked} />
      <SecretOverlay isOpen={showSecret} onClose={handleSecretClose} />
    </main>
  );
}
