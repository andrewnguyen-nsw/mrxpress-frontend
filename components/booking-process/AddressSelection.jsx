import { Input } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";

import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem
} from "@nextui-org/react";

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = "AIzaSyCZEbpEMSOCnOea0Vu2i4BYofYYqsYVB9Q";

const loadGoogleMapsScript = (callback) => {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
  script.async = true;
  script.defer = true;
  script.onload = () => callback(true);
  document.body.appendChild(script);
  console.log("🤑 Script loaded");
};

const AddressSelection = ({ bookingData, setBookingData }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const addressRef = useRef(null);

  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [isFirstNameTouched, setIsFirstNameTouched] = useState(false);
  const [isLastNameTouched, setIsLastNameTouched] = useState(false);

  useEffect(() => {
    loadGoogleMapsScript(setScriptLoaded);
  }, []);

  useEffect(() => {
    if (scriptLoaded) {
      const autocomplete = new google.maps.places.Autocomplete(
        addressRef.current
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log(place);
        if (!place) {
          setUserAddress("");
        } else {
          setUserAddress(place.formatted_address);
        }
      });

      return () => {
        // Cleanup
        google.maps.event.clearInstanceListeners(autocomplete);
      };
    }
  }, [scriptLoaded]);

  const validateIsEmpty = (value) => {
    if (value === "") {
      return false;
    }
    return true;
  }

  return (
    <section className="w-2/3">
      <h1 className="text-2xl font-bold mb-4">Repair Address</h1>
      <div className="flex gap-3">
        <Input
          isRequired
          type="text"
          label="First Name"
          className="mb-3"
          value={userFirstName}
          onValueChange={setUserFirstName}
          isInvalid={isFirstNameTouched && !validateIsEmpty(userFirstName)}
          errorMessage={isFirstNameTouched && !validateIsEmpty(userFirstName) && "Please enter"}
          onBlur={() => setIsFirstNameTouched(true)}
        />
        <Input
          isRequired
          type="text"
          label="Last Name"
          className="mb-3"
          value={userLastName}
          onValueChange={setUserLastName}
          isInvalid={isLastNameTouched && !validateIsEmpty(userLastName)}
          errorMessage={isLastNameTouched && !validateIsEmpty(userLastName) && "Please enter"}
          onBlur={() => setIsLastNameTouched(true)}
        />
      </div>
      <Input
        ref={addressRef}
        isRequired
        type="text"
        label="Address"
        className="mb-3"
        value={userAddress}
        onValueChange={setUserAddress}
        placeholder=""
      />
    </section>
  );
};

export default AddressSelection;
