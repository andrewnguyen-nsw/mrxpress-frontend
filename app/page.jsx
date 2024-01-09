"use client";

import React from "react";

import { Button, Accordion, AccordionItem } from "@nextui-org/react";
import NextImage from "next/image";
import { IconArrowRight } from "@tabler/icons-react";
import Step from "@components/Step";
import TestimonialItem from "@components/TestimonialItem";
import { faqData } from "@constants/faqData"

import ManHoldingPhone from "@public/assets/images/hero-section-man-holding-phone.jpg";
import BecomeTechnician from "@public/assets/images/become-technician.jpg";


const HomePage = () => {
  return (
    <>
      <section id="hero-section" className="grid grid-cols-12 gap-3 mb-3">
        <div className="col-span-12 md:col-span-7 rounded-xl bg-foreground p-12 relative">
          <p className="uppercase text-lg font-medium text-copy-light">
            Say Goodbye to Phone Repair Hassles -
          </p>
          <p className="uppercase mt-6 mb-9 text-7xl lg:text-8xl font-josefin font-bold text-copy leading-[1.1]">
            We Bring the Fix to You!
          </p>
          <Button
            className="group absolute bottom-4 left-12 uppercase font-medium bg-[#06d751] px-5 py-6 hover:pr-[28px] data-[hover=true]:opacity-95"
            variant="solid"
            radius="full"
          >
            <span>Fix My Phone Now</span>
            <IconArrowRight
              className="transition-transform transform group-hover:translate-x-[8px]"
              size={20}
            />
          </Button>
        </div>
        <div className="col-span-12 md:col-span-5 rounded-xl relative inset-0 min-h-[450px]">
          <NextImage
            src={ManHoldingPhone}
            alt="Man holding phone"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-xl"
          />
          <Button
            className="group absolute bottom-4 left-4 uppercase font-medium bg-foreground px-5 py-6 hover:pr-[28px] data-[hover=true]:opacity-95"
            variant="solid"
            radius="full"
          >
            <span>Services</span>
            <IconArrowRight
              className="transition-transform transform group-hover:translate-x-[8px]"
              size={20}
            />
          </Button>
        </div>
      </section>

      <section id="features" className="grid grid-cols-12 gap-3 mb-3">
        <div className="features-square">
          <p className="features-title">Ultimate Convenience</p>
          <p className="features-desc">
            Technicians come to your doorstep, providing hassle-free repairs
          </p>
        </div>
        <div className="features-square">
          <p className="features-title">Rapid Repairs</p>
          <p className="features-desc">
            Same-day service for quick and efficient phone fixes
          </p>
        </div>
        <div className="features-square">
          <p className="features-title">Trusted Quality</p>
          <p className="features-desc">
            Reliable repairs with high-quality parts by expert technicians
          </p>
        </div>
        <div className="features-square">
          <p className="features-title">Fair Pricing</p>
          <p className="features-desc">
            Upfront, transparent costs with no hidden fees
          </p>
        </div>
      </section>

      <section className="grid grid-cols-12 gap-3 mb-3">
        <section
          id="how-it-works"
          className="col-span-12 lg:col-span-6 py-8 bg-white lg:py-10 rounded-xl"
        >
          <div className="px-4 max-w-7xl sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <span className="text-2xl text-center font-semibold bg-rose-50 px-4 py-2 rounded-lg leading-tight md:text-3xl">
                How does it work?
              </span>
            </div>
            <div className="relative mt-6 lg:mt-12">
              <div className="relative grid grid-cols-1 text-center gap-y-8 md:grid-cols-2 gap-x-8">
                <Step
                  number="1"
                  title="Report Your Issue"
                  desc="Begin by describing your device's problem. Simply fill in a quick form to report your issue and submit a service request."
                />
                <Step
                  number="2"
                  title="Match with Technician"
                  desc="Our platform instantly notifies qualified technicians in your area. Skilled professionals ready to tackle your repair needs will be matched to your request."
                />
                <Step
                  number="3"
                  title="Doorstep Service"
                  desc="They will come to your location at the scheduled time, equipped with the necessary tools for a swift repair."
                />
                <Step
                  number="4"
                  title="Quick and Efficient Fix"
                  desc="Sit back and relax while our technician efficiently fixes your device, ensuring it's back in perfect working condition in no time!"
                />
              </div>
            </div>
          </div>
        </section>
        <section
          id="testimonials"
          className="col-span-12 lg:col-span-6 py-8 bg-white lg:py-10 rounded-xl"
        >
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-12">
            <div className="flex justify-center">
              <span className="text-2xl text-center font-semibold bg-rose-50 px-4 py-2 rounded-lg leading-tight md:text-3xl">
                What our clients say?
              </span>
            </div>

            <div className="relative mt-6 lg:mt-10">
              <TestimonialItem
                quote="MrXpress made my phone repair process incredibly easy! The
                technician arrived within hours of my request and did a
                fantastic job. It’s like having a phone repair shop right at
                your doorstep!"
                name="Sarah K."
                desc="Customer | Bondi Beach"
                imgSrc="/assets/images/reviewer02.jpg"
              />
              <TestimonialItem
                quote="I was amazed at how
                quickly MrXpress fixed my shattered screen. The quality of
                service was outstanding, and the pricing was very transparent.
                Highly recommended!"
                name="Michael T."
                desc="Customer | Surry Hills"
                imgSrc="/assets/images/reviewer02.jpg"
              />
              <TestimonialItem
                quote="As a technician on MrXpress, I appreciate the flexibility and
                steady stream of jobs. The platform is user-friendly, and it
                feels great to help people in my community with their phone
                issues."
                name="Darren S."
                desc="Technician | Haymarket"
                imgSrc="/assets/images/reviewer02.jpg"
              />
            </div>
          </div>
        </section>
      </section>

      <section id="" className="grid grid-cols-12 gap-3 mb-3">
        <div className="col-span-12 md:col-span-5 rounded-xl relative inset-0 min-h-[450px]">
          <NextImage
            src={BecomeTechnician}
            alt="A technician holding a mobile phone"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-xl"
          />
          <Button
            className="group absolute bottom-4 left-4 uppercase font-medium bg-foreground px-5 py-6 hover:pr-[28px] data-[hover=true]:opacity-95"
            variant="solid"
            radius="full"
          >
            <span>Become our Technician</span>
            <IconArrowRight
              className="transition-transform transform group-hover:translate-x-[8px]"
              size={20}
            />
          </Button>
        </div>
        <div className="col-span-12 md:col-span-7 rounded-xl p-12 relative bg-foreground">
          <Accordion>
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                aria-label={item.header}
                title={
                  <span className="text-base font-medium text-gray-900">
                    {item.header}
                  </span>
                }
              >
                {item.body}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default HomePage;
