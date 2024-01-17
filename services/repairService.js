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
