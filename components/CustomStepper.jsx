import { useState } from "react";

import { Stepper } from "react-form-stepper";
import PhoneSelection from "@components/booking-process/PhoneSelection";
import AddressSelection from "@components/booking-process/AddressSelection";
import { Button } from "@nextui-org/react";
import ReviewOrder from "./booking-process/ReviewOrder";
import AccessoriesSelection from "./booking-process/AccessoriesSelection";
import PaymentDetails from "./booking-process/PaymentDetails";

const CustomStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { label: "Repair Information" },
    { label: "Select Accessories" },
    { label: "Repair Address" },
    { label: "Review Order" },
    { label: "Payment Details" },
  ];

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return <PhoneSelection updateRepairs={updateRepairs} />;
      case 1:
        return <AccessoriesSelection />;
      case 2:
        return <AddressSelection />;
      case 3:
        return <ReviewOrder />;
      case 4:
        return <PaymentDetails />;
      default:
        return null;
    }
  }

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

    if (selectedPhones[0] != null) {
      // Check if there is any phone selected
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
    <>
      <Stepper
        steps={steps}
        activeStep={activeStep}
        className="mb-6 p-0"
        connectorStateColors={true}
        connectorStyleConfig={{
          completedColor: "#df384f",
          activeColor: "#d70623",
          disabledColor: "#eee",
        }}
        styleConfig={{
          activeBgColor: "#d70623",
          completedBgColor: "#df384f",
          inactiveBgColor: "#fbe6e9",
          activeTextColor: "#ffffff",
          completedTextColor: "#ffffff",
          inactiveTextColor: "#444",
          labelFontSize: "1rem",
          size: "2.1rem",
        }}
      />
      <div>
        {getSectionComponent()}

        <div className="mt-5 flex gap-3 float-right">
          {activeStep !== 0 && (
            <Button
              variant="bordered"
              className="text-gray-800"
              onClick={() => setActiveStep(activeStep - 1)}
            >
              Previous
            </Button>
          )}
          {activeStep !== steps.length - 1 && (
            <Button
              color="primary"
              onClick={() => setActiveStep(activeStep + 1)}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomStepper;
