import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from '@nextui-org/react';
import { fetchPhoneRepairData } from '@services/bookingService';
import { IconTrash } from '@tabler/icons-react';
import { decodeHtmlEntity } from '@utils/decodeHtmlEntity';
import { stripHtmlAndEntities } from '@utils/stripHtmlAndEntities';
import { useEffect, useState } from 'react';

const PhoneSelection = ({ bookingData, setBookingData }) => {
  const [phoneData, setPhoneData] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [correspondingRepairTypeData, setCorrespondingRepairTypeData] =
    useState([]);
  const [repairTypeData, setRepairTypeData] = useState([]);
  const [selectedRepairType, setSelectedRepairType] = useState([]);

  const [brandList, setBrandList] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [seriesList, setSeriesList] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [modelList, setModelList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPhoneRepairData();
        setPhoneData(data.phoneList);
        console.log(data.phoneList);
        setRepairTypeData(data.repairTypeList);
        const brandArray = Object.keys(data.phoneList).map((key) => {
          return {
            id: parseInt(key),
            name: data.phoneList[key].brandName,
          };
        });
        setBrandList(brandArray);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  const handleBrandSelection = (brandId) => {
    setSelectedBrand(brandId);

    const correspondingSeries = Object.keys(phoneData[brandId].series).map(
      (key) => {
        return {
          id: parseInt(key),
          name: phoneData[brandId].series[key].seriesName,
        };
      }
    );
    setSeriesList(correspondingSeries);
    setModelList([]);
    setSelectedSeries(null);
    setSelectedPhone(null);
    setSelectedRepairType(null);
    setBookingData({
      ...bookingData,
      repairs: [],
    });
  };

  const handleSeriesSelection = (key) => {
    setSelectedSeries({
      id: key,
      name: phoneData[selectedBrand].series[key].seriesName,
    });
    const seriesObj = phoneData[selectedBrand].series[key];
    const modelArray = Object.keys(seriesObj.models).map((key) => {
      return {
        id: parseInt(key),
        name: seriesObj.models[key].name,
      };
    });
    setModelList(modelArray);
    setSelectedPhone(null);
    setSelectedRepairType(null);
    setBookingData({
      ...bookingData,
      repairs: [],
    });
  };

  const handleModelSelection = (key) => {
    setSelectedPhone({
      id: parseInt(key),
      name: phoneData[selectedBrand].series[selectedSeries.id].models[key].name,
    });
    setCorrespondingRepairTypeData(repairTypeData[key]);
    setSelectedRepairType(null);
    setBookingData({
      ...bookingData,
      repairs: [],
    });
  };

  const handleRepairTypeSelection = (repairId) => {
    setSelectedRepairType(repairId);
    setBookingData({
      ...bookingData,
      repairs: [
        {
          id: 0,
          phoneType: selectedPhone.id,
          repairType: repairId,
        },
      ],
    });
  };

  console.log(bookingData);

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-4 text-center'>
        Select Your Device
      </h1>
      <div className='flex flex-row justify-center gap-4'>
        {brandList.map((brand) => (
          <div
            key={brand.id}
            className={`flex flex-col gap-3 items-center px-8 py-6 rounded-lg border cursor-pointer ${selectedBrand === brand.id ? 'bg-red-400 text-white' : 'bg-gray-200 hover:border-red-400'}`}
            onClick={() => handleBrandSelection(brand.id)}
          >
            <Image
              alt='brands'
              width={90}
              src={
                brand.name === 'Apple'
                  ? `/assets/images/apple.webp`
                  : `/assets/images/samsung.webp`
              }
            />
            <p className='text-sm'>{brand.name}</p>
          </div>
        ))}
      </div>
      {selectedBrand && (
        <div className='mt-4 flex justify-center gap-3'>
          <Dropdown>
            <DropdownTrigger
              className={selectedSeries?.name ? `px-12 py-6` : `px-4 py-6`}
            >
              <Button
                variant={selectedSeries?.name ? `solid` : `bordered`}
                className='text-copy'
              >
                {selectedSeries?.name || `Choose Your Series`}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label='Series selection'
              onAction={(key) => handleSeriesSelection(key)}
              items={seriesList}
            >
              {(item) => <DropdownItem key={item.id}>{item.name}</DropdownItem>}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger
              className={selectedPhone?.name ? `px-12 py-6` : `px-4 py-6`}
            >
              <Button
                variant={selectedPhone?.name ? `solid` : `bordered`}
                className='text-copy'
              >
                {selectedPhone?.name || `Choose Your Phone`}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label='Model selection'
              onAction={(key) => handleModelSelection(key)}
              items={modelList || []}
            >
              {(item) => <DropdownItem key={item.id}>{item.name}</DropdownItem>}
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
      {selectedPhone && (
        <>
          <h1 className='text-2xl font-semibold mb-4 text-center mt-6'>
            Select Repair Type
          </h1>
          <div className='flex flex-row gap-3 flex-wrap justify-center md:w-3/4 mx-auto'>
            {correspondingRepairTypeData.map((repairType) => (
              <div
                key={repairType.repair_id}
                className={`bg-gray-200 text-sm text-center flex items-center justify-center text-wrap border rounded-lg p-4 md:p-6 max-w-40 cursor-pointer ${selectedRepairType === repairType.repair_id ? 'bg-red-400 text-white' : 'bg-gray-200 hover:border-red-400'}`}
                onClick={() => handleRepairTypeSelection(repairType.repair_id)}
              >
                {repairType.repair_name}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default PhoneSelection;
