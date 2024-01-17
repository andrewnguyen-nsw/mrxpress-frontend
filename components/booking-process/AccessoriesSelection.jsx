import { useState, useEffect } from "react";
import { fetchAccessoriesData } from "@services/repairService";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { IconShoppingCartPlus, IconPlus, IconMinus } from "@tabler/icons-react";

const AccessoriesSelection = ({ bookingData, setBookingData }) => {
  const [accessoriesData, setAccessoriesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAccessoriesData();
        setAccessoriesData(data.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const addToCart = (itemId, quantityInStock) => {
    const newCart = { ...bookingData.cart };
    if (newCart[itemId]) {
      if (newCart[itemId] >= quantityInStock) {
        console.log("Out of stock");
        // TODO Toast message
      } else {
        newCart[itemId] += 1;
      }
    } else {
      newCart[itemId] = 1;
    }
    setBookingData({ ...bookingData, cart: newCart });
  };

  const removeFromCart = (itemId) => {
    const newCart = { ...bookingData.cart };
    if (newCart[itemId] > 1) {
      newCart[itemId] -= 1;
    } else {
      delete newCart[itemId];
    }
    setBookingData({ ...bookingData, cart: newCart });
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Select Accessories</h1>
      <div className="grid grid-cols-12 gap-4">
        {accessoriesData.map((item) => (
          <Card
            key={item.id}
            shadow="sm"
            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 p-4"
          >
            <CardHeader className="flex-col gap-1">
              <h3 className="text-gray-800 font-semibold text-large">
                {item.name}
              </h3>
              <p className="text-gray-600">${item.price}</p>
              {bookingData.cart[item.id] ? (
                <div className="flex items-center gap-2">
                  <IconMinus
                    size={18}
                    className="text-gray-700 cursor-pointer"
                    onClick={() => removeFromCart(item.id)}
                  />
                  <p className="text-gray-700">{bookingData.cart[item.id]}</p>
                  <IconPlus
                    size={18}
                    className="text-gray-700 cursor-pointer"
                    onClick={() => addToCart(item.id, item.stock)}
                  />
                </div>
              ) : (
                <IconShoppingCartPlus
                  className="text-gray-700 mt-1 cursor-pointer"
                  onClick={() => addToCart(item.id)}
                />
              )}
            </CardHeader>
            <CardBody>
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={300}
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AccessoriesSelection;
