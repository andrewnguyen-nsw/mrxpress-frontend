import { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { fetchPhoneRepairData } from "@services/repairService";
import { stripHtmlAndEntities } from "@utils/stripHtmlAndEntities";
import { decodeHtmlEntity } from "@utils/decodeHtmlEntity";

const PhoneSelection = ({ updateRepairs }) => {
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
		console.log(newPhones);
    setSelectedRepairTypes(newRepairTypes);
		updateRepairs(newPhones, newRepairTypes);
  };

	// Function to update the selected phone and repair type
	//   const updateSelection = (index, phoneId, repairTypeId) => {
	//     let newPhones = [...selectedPhones];
	//     let newRepairTypes = [...selectedRepairTypes];
	//     newPhones[index] = phoneData.find((p) => p.id === parseInt(phoneId));
	//     newRepairTypes[index] = repairTypeData.find(
	//       (r) => r.id === parseInt(repairTypeId)
	//     );
	//     setSelectedPhones(newPhones);
	//     setSelectedRepairTypes(newRepairTypes);
	//   };

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

    handleSubmit(selectedPhones, newRepairTypes);
  };

  const handleSubmit = (selectedPhones, selectedRepairTypes) => {
    updateRepairs(selectedPhones, selectedRepairTypes);
  };

  return (
    <section>
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
              {(item) => <DropdownItem key={item.id}>{item.name}</DropdownItem>}
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

      <Button onClick={addPhoneSelection} radius="full" color="danger" size="sm" className="text-sm">
        Add
      </Button>

      <Button onClick={() => handleSubmit(selectedPhones, selectedRepairTypes)}>
        Submit
      </Button>
    </section>
  );
};

export default PhoneSelection;
