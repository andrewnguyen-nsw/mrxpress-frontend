import { useState, useEffect } from "react";
import {
  Input,
  Autocomplete,
  AutocompleteItem,
  Button,
} from "@nextui-org/react";
import usePlacesAutocomplete from "@hooks/usePlacesAutocomplete";
import { loadGoogleMapsScript } from "@services/bookingService";
import { validateRequired } from "@utils/formValidation";

const AddressSelection = ({ bookingData, setBookingData }) => {
  const [userFirstName, setUserFirstName] = useState(bookingData.firstName);
  const [userLastName, setUserLastName] = useState(bookingData.lastName);
  const [userAddress, setUserAddress] = useState(bookingData.address);
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

  const handleSubmit = () => {
    setBookingData({
      ...bookingData,
      firstName: userFirstName,
      lastName: userLastName,
      address: userAddress,
    });
  };

  const handleSelectionChange = (value) => {
    setUserAddress(value);
    setBookingData({
      ...bookingData,
      firstName: userFirstName,
      lastName: userLastName,
      address: value,
    })
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
          value={userFirstName}
          onValueChange={setUserFirstName}
          isInvalid={
            isFirstNameTouched &&
            !validateRequired(userFirstName) &&
            !validateRequired(bookingData.firstName)
          }
          errorMessage={
            isFirstNameTouched &&
            !validateRequired(userFirstName) &&
            !validateRequired(bookingData.firstName) &&
            "This field cannot be empty."
          }
          onBlur={() => setIsFirstNameTouched(true)}
        />
        <Input
          isRequired
          type="text"
          label="Last Name"
          className="mb-3"
          value={userLastName}
          onValueChange={setUserLastName}
          isInvalid={
            isLastNameTouched &&
            !validateRequired(userLastName) &&
            !validateRequired(bookingData.lastName)
          }
          errorMessage={
            isLastNameTouched &&
            !validateRequired(userLastName) &&
            !validateRequired(bookingData.lastName) &&
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
        placeholder={userAddress === "" ? bookingData.address : userAddress}
        onValueChange={setUserAddress}
        onSelectionChange={handleSelectionChange}
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
