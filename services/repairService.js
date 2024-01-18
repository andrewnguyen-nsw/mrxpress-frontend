export const fetchPhoneRepairData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/customer/phoneRepair`
    );
    if (!response.ok) {
      throw new Error("Network response error");
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching phone repair data:", error);
  }
};

export const fetchAccessoriesData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/customer/accessoriesList`
    );
    if (!response.ok) {
      throw new Error("Network response error");
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching accessories data:", error);
  }
};

export const loadGoogleMapsScript = (callback) => {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
  script.async = true;
  script.defer = true;
  script.onload = () => callback(true);
  document.body.appendChild(script);
  console.log("🤑 Script loaded");
};

export const fetchCheckoutReviewData = async (bookingData, promoCode) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/customer/checkoutList`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...bookingData, promoCode: promoCode }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response error");
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching checkout review data:", error);
  }
};
