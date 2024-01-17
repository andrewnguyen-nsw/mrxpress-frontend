import { useState, useEffect } from "react";

const usePlacesAutocomplete = (service, input) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!input || !service) return;

    setLoading(true);
    service.getPlacePredictions(
      {
        input,
        componentRestrictions: { country: "au" },
        types: ["address"],
      },
      (predictions, status) => {
        setLoading(false);
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          setSuggestions([]);
          return;
        }
        setSuggestions(predictions || []);
      }
    );
  }, [service, input]);

  return { suggestions, loading };
};

export default usePlacesAutocomplete;
