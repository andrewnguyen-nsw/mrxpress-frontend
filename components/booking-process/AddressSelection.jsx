import usePlacesAutocomplete from '@hooks/usePlacesAutocomplete';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from '@nextui-org/react';
import { loadGoogleMapsScript } from '@services/bookingService';
import { validatePhone, validateRequired } from '@utils/formValidation';
import { useEffect, useState } from 'react';

const AddressSelection = ({ bookingData, setBookingData }) => {
  const [userFirstName, setUserFirstName] = useState(bookingData.firstName);
  const [userLastName, setUserLastName] = useState(bookingData.lastName);
  const [userAddress, setUserAddress] = useState(bookingData.address);
  const [userPhone, setUserPhone] = useState(bookingData.phone);
  const [isFirstNameTouched, setIsFirstNameTouched] = useState(false);
  const [isLastNameTouched, setIsLastNameTouched] = useState(false);
  const [isPhoneTouched, setIsPhoneTouched] = useState(false);
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
      mobile: userPhone,
      address: userAddress,
    });
  };

  const handleSelectionChange = (value) => {
    setUserAddress(value);
    setBookingData({
      ...bookingData,
      firstName: userFirstName,
      lastName: userLastName,
      mobile: userPhone,
      address: value,
    });
  };

  return (
    <section className=''>
      <h1 className='text-2xl text-center font-semibold mb-4'>
        Repair Address
      </h1>
      <div className='flex flex-col items-center'>
        <div className='flex gap-3 mb-3 w-full lg:w-2/3'>
          <Input
            isRequired
            type='text'
            label='First Name'
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
              'This field cannot be empty.'
            }
            onBlur={() => setIsFirstNameTouched(true)}
          />
          <Input
            isRequired
            type='text'
            label='Last Name'
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
              'This field cannot be empty.'
            }
            onBlur={() => setIsLastNameTouched(true)}
          />
        </div>
        <div className='flex gap-3 mb-3 w-full lg:w-2/3'>
          <Input
            isRequired
            label='Phone Number'
            type='number'
            className='basis-2/5'
            value={userPhone}
            onValueChange={setUserPhone}
            isInvalid={
              isPhoneTouched &&
              !validatePhone(userPhone) &&
              !validatePhone(bookingData.phone)
            }
            errorMessage={
              isPhoneTouched &&
              !validatePhone(userPhone) &&
              !validatePhone(bookingData.phone) &&
              "The phone format is incorrect."
            }
            onBlur={() => setIsPhoneTouched(true)}
          />
          <Autocomplete
            label='Address'
            isRequired
            value={userAddress}
            className='basis-3/5'
            placeholder={userAddress === '' ? bookingData.address : userAddress}
            onValueChange={setUserAddress}
            onSelectionChange={handleSelectionChange}
          >
            {suggestions.length == 0 ? (
              <AutocompleteItem label='No results found.' />
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
        </div>
      </div>
    </section>
  );
};

export default AddressSelection;
