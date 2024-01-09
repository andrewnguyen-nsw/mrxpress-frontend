import React from "react";
import Image from "next/image";

const TestimonialItem = ({ quote, name, desc, imgSrc }) => {
  return (
    // <section className="py-10 bg-white sm:py-16 lg:py-24">
    // <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
    <div className="md:flex md:items-center md:justify-center md:space-x-14">
      <div className="mt-4 mb-4 md:mt-0">
        <blockquote className="bg-neutral-50 px-4 lg:px-5 py-4 rounded-xl">
          <p className="text-base text-gray-900">{quote}</p>
        </blockquote>

        <div className="flex flex-row justify-end items-center gap-4 mt-3 lg:mt-4">
          <div>
            <p className="text-base font-semibold text-black text-right">{name}</p>
            <p className="text-sm text-gray-600">{desc}</p>
          </div>
          <Image
            className="object-cover rounded-full"
            src={imgSrc}
            width={56}
            height={56}
            alt=""
            quality={100}
          />
        </div>
      </div>
    </div>
    // </div>
    // </section>
  );
};

export default TestimonialItem;
