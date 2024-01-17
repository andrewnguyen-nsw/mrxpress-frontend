import { useState, useEffect, useRef } from "react";
import {
  Input,
  Autocomplete,
  AutocompleteItem,
  Button,
} from "@nextui-org/react";
import { loadGoogleMapsScript } from "@services/repairService";
import usePlacesAutocomplete from "@hooks/usePlacesAutocomplete";

const AddressSelection = ({ bookingData, setBookingData }) => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [isFirstNameTouched, setIsFirstNameTouched] = useState(false);
  const [isLastNameTouched, setIsLastNameTouched] = useState(false);
  const [autocompleteService, setAutocompleteService] = useState(null);

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { suggestions, loading } = usePlacesAutocomplete(
    autocompleteService,
    userAddress
  );

  useEffect(() => {
    loadGoogleMapsScript(setScriptLoaded);
  }, []);

  useEffect(() => {
    if (scriptLoaded) {
      setAutocompleteService(new google.maps.places.AutocompleteService());
    }
  }, [scriptLoaded]);

  const validateIsEmpty = (value) => {
    return value.trim() !== "";
  };

  const handleSubmit = () => {
    setBookingData({
      ...bookingData,
      firstName: userFirstName,
      lastName: userLastName,
      address: userAddress,
    });
  };

  return (
    <section className="w-2/3">
      <h1 className="text-2xl font-bold mb-4">Repair Address</h1>
      <div className="flex gap-3">
        <Input
          isRequired
          type="text"
          label="First Name"
          className="mb-3"
          value={userFirstName === "" ? bookingData.firstName : userFirstName}
          onValueChange={setUserFirstName}
          isInvalid={
            isFirstNameTouched &&
            !validateIsEmpty(userFirstName) &&
            !validateIsEmpty(bookingData.firstName)
          }
          errorMessage={
            isFirstNameTouched &&
            !validateIsEmpty(userFirstName) &&
            !validateIsEmpty(bookingData.firstName) &&
            "This field cannot be empty."
          }
          onBlur={() => setIsFirstNameTouched(true)}
        />
        <Input
          isRequired
          type="text"
          label="Last Name"
          className="mb-3"
          value={userLastName === "" ? bookingData.lastName : userLastName}
          onValueChange={setUserLastName}
          isInvalid={
            isLastNameTouched &&
            !validateIsEmpty(userLastName) &&
            !validateIsEmpty(bookingData.lastName)
          }
          errorMessage={
            isLastNameTouched &&
            !validateIsEmpty(userLastName) &&
            !validateIsEmpty(bookingData.lastName) &&
            "This field cannot be empty."
          }
          onBlur={() => setIsLastNameTouched(true)}
        />
      </div>
      <Autocomplete
        label="Address"
        isRequired
        className="mb-3"
        value={userAddress}
        onValueChange={setUserAddress}
        onSelectionChange={setUserAddress}
      >
        {suggestions.length == 0 ? (
          <AutocompleteItem label="No results found." />
        ) : (
          suggestions.map((suggestion) => (
            <AutocompleteItem
              key={suggestion.description}
              value={suggestion.description}
              aria-label={suggestion.description}
            >
              {suggestion.description}
            </AutocompleteItem>
          ))
        )}
      </Autocomplete>
      <Button onPress={handleSubmit}>Save</Button>
    </section>
  );
};

export default AddressSelection;
