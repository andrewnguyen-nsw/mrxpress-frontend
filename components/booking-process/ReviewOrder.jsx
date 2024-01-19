import { Button, Divider, Input, Spinner } from "@nextui-org/react";
import {
  checkPromoCode,
  fetchCheckoutReviewData,
} from "@services/bookingService";
import { IconReceipt2, IconDiscount2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const ReviewOrder = ({ bookingData, setBookingData }) => {
  console.log(bookingData);
  const { repairs, cart } = bookingData;
  const { firstName, lastName, address } = bookingData;
  const [reviewData, setReviewData] = useState();
  const [promoCode, setPromoCode] = useState("");
  const [codeStatus, setCodeStatus] = useState({});

  const fetchData = async (bookingData, promoCode = "") => {
    try {
      const data = await fetchCheckoutReviewData(bookingData, promoCode);
      setReviewData(data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData(bookingData, promoCode);
  }, [bookingData]);

  const isPromoCodeValid = async (promoCode) => {
    try {
      const data = await checkPromoCode(promoCode);
      if (data === "success") {
        await fetchData(bookingData, promoCode);
        setCodeStatus({
          isValid: true,
          msg: "Promo code applied successfully.",
        });
      } else {
        await fetchData(bookingData);
        setCodeStatus({
          isValid: false,
          msg: "Invalid promo code.",
        });
      }
    } catch (error) {
      console.log("Error checking promo code: ", error);
    }
  };

  const handleApplyPromoCode = async () => {
    try {
      await isPromoCodeValid(promoCode);
    } catch (error) {
      console.error("Error applying promo code:", error);
    }
  };

  console.log(reviewData);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Review Order</h1>
      {!reviewData ? (
        <Spinner className="pt-3 pl-6" />
      ) : (
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-8">
            {reviewData.repairInfo.map((repair, index) => (
              <>
                <div
                  key={index}
                  className="flex items-center justify-between mt-3 mb-3"
                >
                  <div className="flex flex-col">
                    <p className="text-xs font-medium uppercase text-gray-600">
                      {repair.phone_name}
                    </p>
                    <p className="">{repair.repair_name}</p>
                  </div>
                  <div>${repair.price}</div>
                </div>
                <Divider />
              </>
            ))}
            {reviewData.productList.map((product, index) => (
              <>
                <div
                  key={index}
                  className="flex items-center justify-between mt-3 mb-3"
                >
                  <p>
                    {product.quantity} x {product.name} (${product.price} each)
                  </p>
                  <div>${reviewData.productPrice}</div>
                </div>
                <Divider />
              </>
            ))}
            <div className="flex items-center justify-between mt-3 mb-3">
              <div className="flex items-center gap-2">
                <IconReceipt2 stroke={1.5} />
                <p className="font-medium">Subtotal</p>
              </div>
              <div className="font-medium">${reviewData?.originTotal}</div>
            </div>
            <div className="flex items-center justify-between mt-5 mb-3">
              <div className="flex items-center gap-2">
                <p className="">Discount [add ribbon]</p>
              </div>
              <div className=""> - ${reviewData.repairReduced}</div>
            </div>
            <div className="flex items-center justify-between mt-5 mb-3">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-lg">Total</p>
              </div>
              <div className="font-semibold text-lg bg-[#fbe6e9] px-3 py-2 rounded-md">
                ${reviewData?.finalTotal}
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col gap-3">
            <Input
              placeholder="Promo Code"
              size="sm"
              onValueChange={setPromoCode}
              startContent={
                <IconDiscount2 stroke={1.5} className="text-gray-700" />
              }
              endContent={
                <Button
                  className=""
                  size="sm"
                  variant="solid"
                  onPress={() => isPromoCodeValid(promoCode)}
                >
                  Apply
                </Button>
              }
            />
            <p
              className={`text-sm ${
                codeStatus.isValid ? "text-green-600" : "text-red-800"
              }`}
            >
              {codeStatus.msg}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewOrder;
