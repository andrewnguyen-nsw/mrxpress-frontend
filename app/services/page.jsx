"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const Services = () => {
  return (
    <section id="" className="grid grid-cols-12 gap-3 mb-3">
      {servicesData.map((service) => (
        <ServicesCard
          key={service.title}
          title={service.title}
          desc={service.desc}
          imgSrc={service.src}
        />
      ))}
    </section>
  );
};

const ServicesCard = ({ title, desc, imgSrc }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Card
      isFooterBlurred
      shadow="none"
      className="w-full h-[300px] col-span-12 sm:col-span-6 md:col-span-4"
    >
      <Image
        removeWrapper
        alt=""
        className="z-0 w-full h-full object-cover hover:scale-[1.03]"
        src={imgSrc}
      />
      <CardFooter className="absolute bg-white/80 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-gray-800 text-base font-semibold tracking-tight uppercase">
            {title}
          </p>
        </div>
        <Button
          onPress={onOpen}
          variant="faded"
          className="text-sm text-gray-700 p-4"
          radius="full"
          size="sm"
        >
          See more
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {title}
                </ModalHeader>
                <ModalBody>{desc}</ModalBody>
                <ModalFooter>
                  <Button onPress={onClose}>
                    Done
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </CardFooter>
    </Card>
  );
};

const servicesData = [
  {
    title: "Cracked Screen",
    desc: `
      Is your mobile phone screen cracked, damaged, or
      malfunctioning? Restore clarity and functionality with our
      professional screen replacement service at MrXpress. Our skilled technicians use
      high-quality replacement screens to bring your device back
      to life. Enjoy a clear, vibrant display and seamless
      touchscreen functionality once again. Don&apos;t let a damaged
      screen hinder your mobile experience – trust us for quick
      and reliable screen replacements to keep your device
      looking and functioning like new.
      `,
    src: "/assets/images/cracked-screen.webp",
  },
  {
    title: "Battery Replacement",
    desc:
      "Discovering that your phone needs a recharge by 12 pm can be incredibly frustrating. If you're experiencing issues like a sluggish performance, random shutdowns, or a battery that can't make it through the day, it's a clear sign that your iPhone requires a battery replacement. At Mr Xpress, we bring the solution to you – a brand-new iPhone battery, delivered right to your location. This not only minimizes the downtime for your device but also saves you from the expense of purchasing a new iPhone. Trust us to keep your iPhone running smoothly with our convenient battery replacement service.",
    src: "/assets/images/battery-issue.jpg",
  },
  {
    title: "Camera Replacement",
    desc: `
      When it comes to capturing life's moments, a reliable camera is essential for every mobile phone user. If you find yourself dealing with a malfunctioning or damaged camera, don't let it hinder your ability to snap those precious memories. Our camera replacement services for mobile phones ensure that you can continue to capture life in vibrant detail.
      At Mr Xpress, we understand the significance of a fully functional camera in your mobile device. Whether your camera is blurry, unresponsive, or experiencing other issues, our skilled technicians are equipped to provide seamless camera replacements. We use high-quality replacement components to restore your mobile phone's camera to its optimal performance.
      With our camera replacement service, you can once again enjoy crisp and clear photos and videos without the frustration of a compromised camera. Trust Mr Xpress to bring life back to your mobile photography experience, ensuring you never miss a picture-perfect moment.
      `,
    src: "/assets/images/camera.webp",
  },
  {
    title: "Charging Problem",
    desc: "Is your mobile phone struggling to charge or constantly losing battery power? Don't let charging issues disrupt your connectivity. At Mr Xpress, we specialize in swift and effective repairs for mobile phone charging problems. Our expert technicians will diagnose and resolve issues, ensuring your device charges efficiently and stays powered up throughout the day. Say goodbye to charging hassles – trust us to keep your mobile phone connected.",
    src: "/assets/images/charging.jpg",
  },
  {
    title: "Audio Problem",
    desc: "Is your mobile phone experiencing audio problems such as distorted sound, no audio output, or speaker malfunctions? Say goodbye to frustrating audio issues with our expert repair services at Mr Xpress. Our experienced technicians specialize in diagnosing and resolving mobile phone audio problems swiftly. Whether it's a speaker replacement or addressing software-related issues, we'll ensure your device delivers crystal-clear sound quality. Trust us to bring back the joy of clear, uninterrupted audio on your mobile phone. Don't let audio issues disrupt your communication – let Mr Xpress handle the repair for a seamless audio experience.",
    src: "/assets/images/speaker.jpeg",
  },
  {
    title: "Back Glass Problem",
    desc: "Revitalize the sleek look of your mobile phone with our back glass replacement service at Mr Xpress. If the back glass of your device is cracked, shattered, or showing signs of wear, our skilled technicians are here to restore it to its original beauty. Using top-quality replacement glass, we ensure a seamless fit and a polished finish, giving your phone a fresh and renewed appearance. Say goodbye to unsightly cracks and hello to a device that looks as good as new. Trust Mr Xpress for efficient and professional back glass replacements to enhance the overall aesthetics of your mobile phone.",
    src: "/assets/images/back-glass.webp",
  }
];

export default Services;
