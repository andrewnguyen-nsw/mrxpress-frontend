import { Input } from "@nextui-org/react";
import React from "react";

const AddressSelection = () => {
  return (
    <section className="w-1/2">
      <h1 className="text-2xl font-bold mb-4">Repair Address</h1>
      <Input isRequired type="text" label="Last Name" className="mb-3" />
    </section>
  );
};

export default AddressSelection;
