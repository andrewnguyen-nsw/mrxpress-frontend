"use client";

import { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";

import PhoneSelection from "@components/PhoneSelection";

const Book = () => {
  // Centralized bookingData state
  const [bookingData, setBookingData] = useState({
    repairs: [],
    cart: {},
    firstName: "",
    lastName: "",
    address: "",
    promoCode: "",
    imgPath: [],
    imgs: [],
  });

  // Add/update repair in the bookingData
  const updateRepairs = (selectedPhones, selectedRepairTypes) => {
    let newRepairs = [];
    // Check if there is any phone selected
    if (selectedPhones[0] != null) {
      newRepairs = selectedPhones.map((phone, index) => ({
        id: index + 1,
        phoneType: phone.id,
        repairType: selectedRepairTypes[index]?.repair_id,
      }));
    }
    setBookingData({ ...bookingData, repairs: newRepairs });
    console.log({ ...bookingData, repairs: newRepairs });
  };

  return (
    <div className="bg-foreground mb-3 rounded-xl p-12 h-screen">
      {/* STEP 1 ----------------------------------------------------------- */}
      <PhoneSelection updateRepairs={updateRepairs}/>

      {/* STEP 2 ----------------------------------------------------------- */}

      {/* STEP 3 ----------------------------------------------------------- */}
      <section className="w-1/2">
        <h1 className="text-2xl font-bold mt-6 mb-3">Step 3. Address</h1>
        <Input isRequired type="text" label="Last Name" className="mb-3" />
      </section>
    </div>
  );
};

export default Book;
