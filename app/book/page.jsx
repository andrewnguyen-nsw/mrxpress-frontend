"use client";

import dynamic from 'next/dynamic';
const StepperComponent = dynamic(() => import('@components/CustomStepper'), {
  ssr: false,
});

const Book = () => {
  return (
    <div className="bg-foreground mb-3 rounded-xl px-4 sm:px-20 py-8 min-h-[75vh]">
      <StepperComponent />
    </div>
  );
};

export default Book;
