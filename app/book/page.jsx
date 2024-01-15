"use client";

import { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
} from "@nextui-org/react";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { fetchPhoneRepairData } from "@services/repairService";
import { decodeHtmlEntity } from "@utils/decodeHtmlEntity";
import { stripHtmlAndEntities } from "@utils/stripHtmlAndEntities";

const Book = () => {
  const [phoneData, setPhoneData] = useState([]);
  const [selectedPhones, setSelectedPhones] = useState([null]);
  const [correspondingRepairTypeData, setCorrespondingRepairTypeData] =
    useState([]);
  const [repairTypeData, setRepairTypeData] = useState([]);
  const [selectedRepairTypes, setSelectedRepairTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPhoneRepairData();
        const decodedData = data.phoneTypeArr.map((item) => ({
          id: item.id,
          name: decodeHtmlEntity(item.name), // replace &nbsp; with ' '
        }));
        setPhoneData(decodedData);
        setRepairTypeData(data.repairType);
        console.log(data.repairType);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  // Function to handle adding a new phone selection
  const addPhoneSelection = () => {
    setSelectedPhones([...selectedPhones, null]); // Add a new null selection
    setSelectedRepairTypes([...selectedRepairTypes, null]); // Corresponding repair type
  };

  // Function to handle removing a phone selection
  const removePhoneSelection = (index) => {
    const newPhones = [...selectedPhones];
    const newRepairTypes = [...selectedRepairTypes];
    newPhones.splice(index, 1);
    newRepairTypes.splice(index, 1);
    setSelectedPhones(newPhones);
    setSelectedRepairTypes(newRepairTypes);
  };

  // Function to update the selected phone and repair type
  const updateSelection = (index, phoneId, repairTypeId) => {
    let newPhones = [...selectedPhones];
    let newRepairTypes = [...selectedRepairTypes];
    newPhones[index] = phoneData.find((p) => p.id === parseInt(phoneId));
    newRepairTypes[index] = repairTypeData.find(
      (r) => r.id === parseInt(repairTypeId)
    );
    setSelectedPhones(newPhones);
    setSelectedRepairTypes(newRepairTypes);
  };

  const handlePhoneSelection = (index, key) => {
    const newPhones = [...selectedPhones];
    newPhones[index] = phoneData.find((item) => item.id === parseInt(key));
    setSelectedPhones(newPhones);

    const newCorrespondingRepairTypeData = [...correspondingRepairTypeData];
    newCorrespondingRepairTypeData[index] = repairTypeData[key];
    setCorrespondingRepairTypeData(newCorrespondingRepairTypeData);

    // Reset the corresponding repair type selection when phone changes
    const newRepairTypes = [...selectedRepairTypes];
    newRepairTypes[index] = null;
    setSelectedRepairTypes(newRepairTypes);
  };

  const handleRepairTypeSelection = (index, key) => {
    const newRepairTypes = [...selectedRepairTypes];
    newRepairTypes[index] = correspondingRepairTypeData[index].find(
      (item) => item.repair_id === parseInt(key)
    );
    setSelectedRepairTypes(newRepairTypes);
  };

  return (
    <div className="bg-foreground mb-3 rounded-xl p-12 h-screen">
      <section>
        {/* STEP 1 ----------------------------------------------------------- */} 
        <h1 className="text-2xl font-bold mb-3">Step 1. Repair Information</h1>

        {selectedPhones.map((selectedPhone, index) => (
          <div key={index} className="flex items-center gap-3 mb-3">
            {/* Phone Dropdown */}
            <Dropdown shouldBlockScroll={false}>
              <DropdownTrigger>
                <Button variant="solid">
                  {!selectedPhone
                    ? "Choose Phone"
                    : stripHtmlAndEntities(selectedPhone.name)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label={`dropdown-choose-phone-${index}`}
                items={phoneData}
                onAction={(key) => handlePhoneSelection(index, key)}
                className="h-[50vh] overflow-auto"
              >
                {(item) => (
                  <DropdownItem key={item.id}>{item.name}</DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>

            {/* Repair Type Dropdown */}
            <Dropdown shouldBlockScroll={false}>
              <DropdownTrigger>
                <Button variant="solid" isDisabled={!selectedPhone}>
                  {!selectedRepairTypes[index]
                    ? "Choose Repair Type"
                    : selectedRepairTypes[index].repair_name}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label={`dropdown-choose-repair-type-${index}`}
                items={correspondingRepairTypeData[index]}
                onAction={(key) => handleRepairTypeSelection(index, key)}
                className="h-[33vh] overflow-auto"
              >
                {(item) => (
                  <DropdownItem key={item.repair_id}>
                    {item.repair_name}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>

            {/* Remove Button */}
            {selectedPhones.length > 1 && (
              <IconTrash
                onClick={() => removePhoneSelection(index)}
                size={16}
                className="cursor-pointer"
              />
            )}
          </div>
        ))}

        <IconPlus
          onClick={addPhoneSelection}
          size={20}
          className="cursor-pointer"
        />
      </section>

      {/* STEP 2 ----------------------------------------------------------- */} 
      

      {/* STEP 3 ----------------------------------------------------------- */} 
      <section className="w-1/2">
        <h1 className="text-2xl font-bold mt-6 mb-3">Step 3. Address</h1>
        <Input isRequired type="text" label="Last Name" className="mb-3"/>
      </section>
    </div>
  );
};

export default Book;
