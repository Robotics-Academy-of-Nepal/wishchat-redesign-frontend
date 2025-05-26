import { LuArrowRight } from "react-icons/lu";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RiCoupon2Fill } from "react-icons/ri";
import axiosInstance from "../../api/axiosInstance";
import CouponPopup from "./CouponPopup";
// import PaymentOptionPopup from "./PaymentOptionPopup";
const Payment = () => {
  const [popUpOpen, setPopUp] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [selectedPlan, setSelectedPlan] = useState({});
  const [pricing, setPricingDetail] = useState([]);
  const [showPaymentOptions, setShowPaymentOptions] = useState([
    false,
    false,
    false,
  ]);
  // const noOfSkeleton = () => {
  //   const widthOfViewPort = window.innerWidth;
  //   if(widthOfViewPort>)
  //   return number;
  // };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          `${import.meta.env.VITE_API_URL}auth/subscription-plans/`
        );
        console.log("response payment", res);

        setPricingDetail(res.data.plans);
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchData();
  }, []);

  const handlePayment = (totalAmount, subscription_plan_id, payment_option) => {
    console.log(
      "handlePayment",
      totalAmount,
      subscription_plan_id,
      payment_option
    );
    axiosInstance
      .post(`api/initiate-${payment_option}-payment/`, {
        total_amount: totalAmount,
        coupon: coupon,
        subscription_plan_id: subscription_plan_id,
      })
      .then((response) => {
        console.log(response);
        window.location.href = response.data.redirect_url;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-full p-4 ">
      <h3 className="text-2xl font-semibold text-center mb-4">Payment</h3>
      {popUpOpen && (
        <CouponPopup
          setPopUp={setPopUp}
          selectedPlan={selectedPlan}
          setCoupon={setCoupon}
          coupon={coupon}
          handlePayment={handlePayment}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative grid lg:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        {pricing.length > 0
          ? pricing.map((plan, index) => {
              return (
                <div
                  key={index}
                  className="relative h-[450px] w-full px-6 py-8 bg-white text-gray-800 rounded-3xl shadow-md flex flex-col justify-between"
                >
                  <p className="font-semibold text-2xl">{plan.name}</p>
                  <p className="text-xl mt-2">
                    {plan.message_limit} Monthly Messages
                  </p>

                  <div className="text-md flex flex-col justify-center h-full p-4">
                    {plan.features.map((feature, index) => {
                      return <p key={index}>{feature}</p>;
                    })}
                  </div>

                  <p className="text-3xl font-semibold mb-6">
                    NRP {plan.price}
                    <sub className="top-2 text-sm font-light">/monthly</sub>
                  </p>

                  <button
                    className="flex items-center justify-center p-4 gap-2 bg-blue-500 h-14 rounded-lg text-white text-md hover:bg-white hover:text-blue-500 group border border-blue-500"
                    onClick={() => {
                      setShowPaymentOptions((prev) => {
                        const updated = [...prev];
                        updated[index] = !updated[index];
                        return updated;
                      });
                    }}
                  >
                    Get Started Now
                    <div className="h-[30px] w-[30px] text-blue-500 bg-white rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white">
                      <LuArrowRight className="h-5 w-5" />
                    </div>
                  </button>
                  {showPaymentOptions[index] && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <button
                        className="p-2 bg-green-600 text-white rounded-md"
                        onClick={() => {
                          console.log("esewa trigerred");
                          handlePayment(plan.price, plan.id, "esewa");
                        }}
                      >
                        eSewa
                      </button>
                      <button
                        className="p-2 bg-indigo-800 text-white rounded-md"
                        onClick={() => {
                          console.log("khalti trigerred");
                          handlePayment(plan.price, plan.id, "khalti");
                        }}
                      >
                        Khalti
                      </button>
                    </div>
                  )}
                  <button
                    className="absolute top-0 right-0 bg-indigo-100 text-blue-700 font-semibold px-4 py-2 text-sm rounded-xl shadow-sm border border-indigo-300 flex items-center gap-2 hover:bg-indigo-200 transition-all"
                    onClick={() => {
                      setSelectedPlan(plan);
                      setPopUp(true);
                    }}
                  >
                    Use
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-sm">
                      <RiCoupon2Fill className="text-xs" />
                    </div>
                  </button>
                </div>
              );
            })
          : // Skeleton loader shown while pricing data is loading
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse relative h-[450px] w-full px-6 py-8 bg-gray-100 rounded-3xl shadow-md flex flex-col justify-between"
              >
                <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
                <div className="flex flex-col gap-2">
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-4/5"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
                <div className="h-8 bg-gray-300 rounded w-2/5 mt-6 mb-6"></div>
                <div className="h-14 bg-gray-300 rounded w-full"></div>
              </div>
            ))}
      </motion.div>
    </div>
  );
};

export default Payment;
