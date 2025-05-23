import { LuArrowRight } from "react-icons/lu";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RiCoupon2Fill } from "react-icons/ri";
import { useChatbot } from "../../context/ChatbotContext";
import axiosInstance from "../../api/axiosInstance";
const PopUp = ({
  setPopUp,
  selectedPlan,
  pricing,
  setCoupon,
  coupon,
  handlePayment,
}) => {
  const { chatbotData } = useChatbot();
  console.log("chatbot data in popup", chatbotData);
  const requiredPlan = pricing.find((plan) => plan.title == selectedPlan);

  const [couponData, setCouponData] = useState();
  const handleCoupon = () => {
    console.log(
      "coupon trigerred:",
      chatbotData.chatbot_id,
      requiredPlan.price,
      coupon
    );
    axiosInstance
      .post(`${import.meta.env.VITE_API_URL}auth/coupon/redeem/`, {
        code: coupon,
        chatbot_id: chatbotData.chatbot_id,
        amount: requiredPlan.price,
      })
      .then((response) => {
        console.log(response);
        setCouponData(response.data);
      });
  };

  return (
    <div className="fixed z-50 inset-0 bg-black/50 flex justify-center items-center text-lg">
      <div className="bg-white p-4 rounded-xl">
        <h4 className=" mb-2">Redeem Coupon</h4>
        <input
          className=" border mb-2 font-mono p-2 rounded-lg"
          placeholder="Your coupon here.."
          value={coupon}
          onChange={(e) => {
            setCoupon(e.target.value);
          }}
        />

        <div className="flex gap-2">
          <button
            className="border duration-500 transition-colors bg-white border-gray-400  text-gray-500 hover:text-white hover:bg-gray-400 font-bold py-1.5 px-4 rounded-lg"
            onClick={() => {
              setCoupon("");
              setPopUp(false);
            }}
          >
            Cancel
          </button>

          <button
            className={` ${
              coupon
                ? "bg-blue-500 hover:text-blue-500 hover:bg-white"
                : "bg-blue-400 cursor-not-allowed"
            } border transition-colors duration-500   text-white font-bold py-1.5 px-4 rounded-lg flex items-center gap-2`}
            title=""
            onClick={handleCoupon}
            disabled={!coupon}
          >
            Use
            <RiCoupon2Fill className="h-4 w-4 " />
          </button>
        </div>

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
            <button
              title="Pay the subscription"
              className="w-full flex gap-2 items-center justify-center py-1 px-2 bg-blue-500 text-white rounded-xl"
              onClick={() => handlePayment(couponData.discounted_amount)}
            >
              Pay
              <LuArrowRight />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const Payment = () => {
  const [popUpOpen, setPopUp] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");

  const [pricing, setPricingDetail] = useState([
    {
      title: "Basic Plan",
      messages: "5000 Monthly messages",
      price: "5000",
      time: "monthly",
      features: [
        "Core AI chatbot functionalities.",
        "Suitable for small-scale or personal use.",
      ],
      // btnclick: () => handlePayment("5000"),
    },
    {
      title: "Standard Plan",
      messages: "7000 Monthly messages",
      price: "7000",
      time: "monthly",
      features: [
        "Everyting in the Basic Plan.",
        "Enhanced AI capabilities.",
        "Priority Support.",
      ],
      // btnclick: () => handlePayment("7000"),
    },
    {
      title: "Pro Plan",
      messages: "10000 Monthly messages",
      price: "10000",
      time: "monthly",
      features: [
        "Everything in the Standard Plan.",
        "Ideal for medium-scale business.",
      ],
      // btnclick: () => handlePayment("10000"),
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          `${import.meta.env.VITE_API_URL}auth/subscription-plans/`
        );
        console.log("response payment", res);

        let updatedPricing = [];

        res.data.plans.forEach((fetchedPlan) => {
          const localPlan = pricing.find(
            (plan) => plan.title === fetchedPlan.name
          );
          if (localPlan) {
            console.log(localPlan);
            localPlan.price = fetchedPlan.price;
            localPlan.messages = `${fetchedPlan.message_limit} Monthly messages`;
          }
          updatedPricing.push(localPlan);
        });

        setPricingDetail(updatedPricing);
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchData();
  }, []);

  const handlePayment = (totalAmount) => {
    axiosInstance
      .post("api/initiate-esewa-payment/", {
        total_amount: totalAmount,
        coupon: coupon,
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
        <PopUp
          setPopUp={setPopUp}
          selectedPlan={selectedPlan}
          pricing={pricing}
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
        {pricing.map((plan, index) => {
          return (
            <div
              key={index}
              className="relative h-[450px] w-full px-6 py-8 bg-white text-gray-800 rounded-3xl shadow-md flex flex-col justify-between"
            >
              <p className="font-semibold text-2xl">{plan.title}</p>
              <p className="text-xl mt-2">{plan.messages}</p>

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
                className="flex items-center justify-center p-4 gap-2  bg-blue-500 h-14 rounded-full text-white text-md  hover:bg-white hover:text-blue-500 group border border-blue-500"
                onClick={() => {
                  handlePayment(plan.price);
                }}
              >
                Get Started Now
                <div
                  className={`h-[30px] w-[30px] text-blue-500 bg-white rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white`}
                >
                  <LuArrowRight className="h-5 w-5 " />
                </div>
              </button>
              <button
                className="absolute top-0 right-0 bg-indigo-100 text-blue-700 font-semibold px-4 py-2 text-sm rounded-full shadow-sm border border-indigo-300 flex items-center gap-2 hover:bg-indigo-200 transition-all"
                onClick={() => {
                  setSelectedPlan(plan.title);
                  setPopUp(true);
                }}
              >
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-sm">
                  <RiCoupon2Fill className="text-xs" />
                </div>
                Use Coupon
              </button>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Payment;
