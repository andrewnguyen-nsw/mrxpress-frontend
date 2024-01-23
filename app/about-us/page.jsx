'use client';

import { stripHtmlAndEntities } from '@utils/stripHtmlAndEntities';
import { useEffect, useState } from 'react';

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

const AboutUs = () => {
  const [response, setResponse] = useState(null);
  useEffect(() => {
    const fetchPhoneRepairData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/customer/phoneRepair`
        );
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const { data } = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching phone repair data:', error);
      }
    };

    const fetchData = async () => {
      const res = await fetchPhoneRepairData();
      setResponse(res);
    };

    fetchData();
  }, []);

  if (response) {
    const phoneList = response?.phoneTypeArr;
    const repairTypeList = response?.repairType;
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

    console.log(hierarchy);
  }

  return <div>AboutUs</div>;
};

export default AboutUs;
