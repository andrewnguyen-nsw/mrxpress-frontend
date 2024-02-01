import { stripHtmlAndEntities } from "@utils/stripHtmlAndEntities";

function isBrand(name) {
  const count = (name.match(/&nbsp;/g) || []).length;
  return count === 2;
}

function isSeries(name) {
  const count = (name.match(/&nbsp;/g) || []).length;
  return count === 8;
}

function isModel(name) {
  const count = (name.match(/&nbsp;/g) || []).length;
  return count === 14;
}

// -------------------------------------------------------------------

export const fetchPhoneRepairData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/customer/phoneRepair`
    );
    if (!response.ok) {
      throw new Error("Network response error");
    }
    const { data } = await response.json();
    
    const phoneList = data.phoneTypeArr;
    const repairTypeList = data.repairType;
    let hierarchy = {};
    let nearestBrandId = null;
    let nearestSeriesId = null;

    phoneList.forEach((phone) => {
      if (isBrand(phone.name)) {
        hierarchy[phone.id] = {
          brandName: stripHtmlAndEntities(phone.name),
          series: {},
        };
        nearestBrandId = phone.id;
      } else if (isSeries(phone.name)) {
        hierarchy[nearestBrandId].series[phone.id] = {
          seriesName: stripHtmlAndEntities(phone.name),
          models: {},
        };
        nearestSeriesId = phone.id;
      } else if (isModel(phone.name)) {
        hierarchy[nearestBrandId].series[nearestSeriesId].models[phone.id] = {
          name: stripHtmlAndEntities(phone.name),
        };
      }
    });
    
    return {
      phoneList: hierarchy,
      repairTypeList,
    };
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

export const checkPromoCode = async (promoCode) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/customer/checkPromoCode?promoCode=${encodeURIComponent(promoCode)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response error");
    }
    const { msg } = await response.json();
    return msg;
  } catch (error) {
    console.error("Error checking promo code:", error);
  }
};

export const placeOrder = async (bookingData, token) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/placeOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) {
      throw new Error("Network response error");
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error placing order:", error);
  }
}
