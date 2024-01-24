import { useState } from "react";
import { Stepper } from "react-form-stepper";
import { Button } from "@nextui-org/react";
import { useSnackbar } from "notistack";
import PhoneSelection from "@components/booking-process/PhoneSelection";
import AddressSelection from "@components/booking-process/AddressSelection";
import ReviewOrder from "@components/booking-process/ReviewOrder";
import AccessoriesSelection from "@components/booking-process/AccessoriesSelection";
import PaymentDetails from "@components/booking-process/PaymentDetails";

const CustomStepper = () => {
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

  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { label: "Repair Information" },
    { label: "Select Accessories" },
    { label: "Repair Address" },
    { label: "Review Order" },
    { label: "Payment Details" },
  ];
  const { enqueueSnackbar } = useSnackbar();

  const handleNextClick = () => {
    if (activeStep === 0) {
      if (bookingData.repairs.length === 0) {
        enqueueSnackbar("Please select your repair before continuing.", {variant: "error"});
        return;
      }
    }
    if (activeStep === 2) {
      if (bookingData.firstName === "" || bookingData.lastName === "" || bookingData.address === "") {
        enqueueSnackbar("Please fill in all fields.", {variant: "error"});
        return;
      }
    }
    setActiveStep(activeStep + 1)
  }

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return (
          <PhoneSelection
            bookingData={bookingData}
            setBookingData={setBookingData}
          />
        );
      case 1:
        return (
          <AccessoriesSelection
            bookingData={bookingData}
            setBookingData={setBookingData}
          />
        );
      case 2:
        return (
          <AddressSelection
            bookingData={bookingData}
            setBookingData={setBookingData}
          />
        );
      case 3:
        return (
          <ReviewOrder
            bookingData={bookingData}
          />
        );
      case 4:
        return <PaymentDetails />;
      default:
        return null;
    }
  }

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

        <div className="mt-5 flex gap-3 justify-end">
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
              onClick={handleNextClick}
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
