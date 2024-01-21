import confetti from "canvas-confetti";

export const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.75, y: 0.5 },
    });
  };