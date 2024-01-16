"use client";

import dynamic from 'next/dynamic';
const StepperComponent = dynamic(() => import('@components/CustomStepper'), {
  ssr: false,
});

const Book = () => {
  return (
    <div className="bg-foreground mb-3 rounded-xl px-20 py-8 h-screen">
      <StepperComponent />
    </div>
  );
};

export default Book;
