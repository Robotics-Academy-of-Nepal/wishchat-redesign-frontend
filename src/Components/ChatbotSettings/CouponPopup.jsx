import { useState } from "react";
import { useChatbot } from "../../context/ChatbotContext";
import { RiCoupon2Fill } from "react-icons/ri";
import { LuArrowRight } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
const CouponPopup = ({
  setPopUp,
  selectedPlan,
  setCoupon,
  coupon,
  handlePayment,
}) => {
  const { chatbotData } = useChatbot();
  console.log("chatbot data in popup", chatbotData);

  const [couponData, setCouponData] = useState();
  const handleCoupon = () => {
    axiosInstance
      .post(`${import.meta.env.VITE_API_URL}auth/coupon/redeem/`, {
        code: coupon,
        chatbot_id: chatbotData.chatbot_id,
        amount: selectedPlan.price,
        subscription_plan_id: selectedPlan.id,
      })
      .then((response) => {
        console.log(response);
        setCouponData(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Couldn't apply the coupon!!");
      });
  };

  return (
    <div className="fixed z-50 inset-0 bg-black/50 flex justify-center items-center text-lg">
      <div className="relative bg-white p-4 rounded-xl">
        <button
          className="absolute top-0 right-0"
          onClick={() => {
            setCoupon("");
            setPopUp(false);
          }}
        >
          <IoClose className=" text-red-700 hover:text-red-500 h-8 w-8 rounded m-1" />
        </button>
        <h4 className=" mb-2">Redeem Coupon</h4>
        <input
          className=" border mb-2 font-mono p-2 rounded-lg"
          placeholder="Your coupon here.."
          value={coupon}
          onChange={(e) => {
            setCoupon(e.target.value);
          }}
        />

        {/* <div className="flex gap-2">
          <button
            className="border duration-500 transition-colors bg-white border-gray-400  text-gray-500 hover:text-white hover:bg-gray-400 font-bold py-1.5 px-4 rounded-lg"
            onClick={() => {
              setCoupon("");
              setPopUp(false);
            }}
          >
            Cancel
          </button>
        </div> */}
        <button
          className={` ${
            coupon
              ? "bg-blue-500 hover:bg-blue-800"
              : "bg-blue-400 cursor-not-allowed"
          } border w-full justify-center transition-colors duration-300 text-white font-bold py-1.5 px-4 rounded-lg flex items-center gap-2`}
          title=""
          onClick={handleCoupon}
          disabled={!coupon}
        >
          Use
          <RiCoupon2Fill className="h-4 w-4 " />
        </button>

        {couponData && (
          <>
            <div className="mb-2">
              <p className="mt-2">Payable Amount</p>
              <div className="border p-2 rounded-lg flex gap-2">
                NPR{" "}
                <s className="text-gray-500">{couponData.original_amount}</s>
                {couponData.discounted_amount}
              </div>
            </div>
            {/* <button
              title="Pay the subscription"
              className="w-full flex gap-2 items-center justify-center py-1 px-2 bg-blue-500 text-white rounded-lg"
              onClick={() =>
                handlePayment(couponData.discounted_amount, selectedPlan.id)
              }
            >
              Pay
              <LuArrowRight />
            </button> */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                className="p-2 bg-green-500 text-white hover:bg-green-400 rounded-md transition-colors duration-300"
                onClick={() => {
                  console.log("esewa trigerred");
                  handlePayment(selectedPlan.price, selectedPlan.id, "esewa");
                }}
              >
                eSewa
              </button>
              <button
                className="p-2 bg-purple-800 text-white rounded-md hover:bg-purple-600 transition-colors duration-300"
                onClick={() => {
                  console.log("khalti trigerred");
                  handlePayment(selectedPlan.price, selectedPlan.id, "khalti");
                }}
              >
                Khalti
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default CouponPopup;
