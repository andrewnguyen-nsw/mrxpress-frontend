import { fetchPhoneRepairData } from '@services/bookingService';
import { useEffect, useState } from 'react';

export const usePhoneData = () => {
  const [phoneData, setPhoneData] = useState([]);
  const [repairTypeData, setRepairTypeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPhoneRepairData();
        setPhoneData(data.phoneList);
        setRepairTypeData(data.repairTypeList);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  return { phoneData, repairTypeData };
};
