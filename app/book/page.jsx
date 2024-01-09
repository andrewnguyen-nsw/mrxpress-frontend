"use client";

import { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { fetchPhoneRepairData } from "@services/repairService";
import { decodeHtmlEntity } from "@utils/decodeHtmlEntity";
import { stripHtmlAndEntities } from "@utils/stripHtmlAndEntities";

const Book = () => {
  const [phoneData, setPhoneData] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState();
  const [correspondingRepairTypeData, setCorrespondingRepairTypeData] =
    useState(null);
  const [repairTypeData, setRepairTypeData] = useState([]);
  const [selectedRepairType, setSelectedRepairType] = useState();

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

  const handlePhoneSelection = (key) => {
    const selectedItem = phoneData.find((item) => item.id === parseInt(key));
    setSelectedPhone(selectedItem);
    setCorrespondingRepairTypeData(repairTypeData[key]);
    setSelectedRepairType(null);
  };

  const handleRepairTypeSelection = (key) => {
    const selectedItem = correspondingRepairTypeData.find(
      (item) => item.repair_id === parseInt(key)
    );
    setSelectedRepairType(selectedItem);
  };

  return (
    <section className="bg-foreground mb-3 rounded-xl p-8 h-screen">
      <h1 className="text-2xl font-bold mb-3">Step 1. Repair Information</h1>

      {/* First item (mandatory) */}
      <div className="flex gap-3">
        <Dropdown shouldBlockScroll={false}>
          <DropdownTrigger>
            <Button variant="solid">
              {!selectedPhone ? "Choose Phone" : stripHtmlAndEntities(selectedPhone.name)}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="dropdown-choose-phone"
            items={phoneData}
            onAction={(key) => handlePhoneSelection(key)}
          >
            {(item) => <DropdownItem key={item.id}>{item.name}</DropdownItem>}
          </DropdownMenu>
        </Dropdown>

        <Dropdown shouldBlockScroll={false}>
          <DropdownTrigger>
            <Button variant="solid" isDisabled={!selectedPhone}>
              {!selectedRepairType ? "Choose Repair Type" : selectedRepairType.repair_name}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="dropdown-choose-repair-type"
            items={correspondingRepairTypeData ? correspondingRepairTypeData : []}
            onAction={(key) => handleRepairTypeSelection(key)}
          >
            {(item) => (
              <DropdownItem key={item.repair_id}>{item.repair_name}</DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Additional item (if the client wish to have multiple phones to be fixed) */}

    </section>
  );
};

export default Book;
