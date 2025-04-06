import { LuArrowRight } from "react-icons/lu";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { RiCoupon2Fill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import axios from "axios";
import { useChatbot } from "../../context/ChatbotContext";

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
    axios
      .post(
        `${import.meta.env.VITE_API_URL}auth/coupon/redeem/`,
        {
          code: coupon,
          chatbot_id: chatbotData.chatbot_id,
          amount: requiredPlan.price,
        },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      )
      .then((response) => {
        console.log(response);
        setCouponData(response.data);
      });
  };
  return (
    <div className="fixed z-20 inset-0 bg-black/50 flex justify-center items-center text-lg">
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
            className="hover:bg-gray-600 text-gray-600 border-gray-500 border hover:text-white p-2 py-1 rounded-xl"
            onClick={() => {
              setCoupon("");
              setPopUp(false);
            }}
          >
            Cancel
          </button>

          <button
            className={` ${
              coupon ? "bg-blue-500" : "bg-blue-400 cursor-not-allowed"
            }  text-white hover:bg-white hover:text-blue-500 px-2 py-1 rounded-xl border border-blue-500 flex items-center gap-2`}
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
// const PopUp = ({ setPopUp, selectedPlan, pricing, setCoupon, coupon }) => {
//   console.log("popUp opened");
//   const requiredPlan = pricing.find((plan) => plan.title == selectedPlan);
//   console.log("required plan:", requiredPlan);
//   return (
//     <div className="fixed z-10 inset-0 bg-black/50 flex justify-center items-center">
//       <div className="bg-white relative p-6 rounded-xl text-xl">
//         <h2 className="text-2xl font-semibold">
//           Are you sure you want to go through this transaction?
//         </h2>
//         <h4 className="text-lg text-gray-600 mb-1 mt-4">Payable Amount</h4>

//         <div className="p-2 border border-gray-400 rounded-lg text-2xl font-semibold">
//           {requiredPlan.price}
//         </div>
//         <div className="flex gap-2 mt-4">
//           <button
//             className="hover:bg-stone-500 text-stone-500 border-stone-500 border hover:text-white p-2 py-1 rounded-xl"
//             onClick={() => {
//               setPopUp(false);
//             }}
//           >
//             Cancel
//           </button>
//           <button className="bg-blue-500 text-white hover:bg-white hover:text-blue-500 p-2 rounded-xl border border-blue-500 flex">
//             <div>Next</div>
//             <LuArrowRight className="h-5 w-5 " />
//           </button>
//         </div>
//         <div
//           className="absolute flex gap-2 items-center p-2 right-2 bg-blue-500 text-white rounded-full"
//           onClick={coupon}
//         >
//           Use <RiCoupon2Fill />
//         </div>
//       </div>
//     </div>
//   );
// };
const Payment = () => {
  const scrollContainerRef = useRef(null);
  const [popUpOpen, setPopUp] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const pricing = [
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
      title: "Premium Plan",
      messages: "10000 Monthly messages",
      price: "10000",
      time: "monthly",
      features: [
        "Everything in the Standard Plan.",
        "Ideal for medium-scale business.",
      ],
      // btnclick: () => handlePayment("10000"),
    },
  ];
  const handlePayment = (totalAmount) => {
    console.log("button clicked");
    // Generate a UUID
    const transaction_uuid = uuidv4();

    // Define the payload
    const payload = {
      amount: totalAmount,
      tax_amount: "0",
      total_amount: totalAmount,
      transaction_uuid: transaction_uuid,
      product_code: "EPAYTEST",
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: `https://pr9rwc8x-5173.inc1.devtunnels.ms/payment-success/x${coupon}/`,
      failure_url: "https://pr9rwc8x-5173.inc1.devtunnels.ms/payment-failure/",
      signed_field_names: "total_amount,transaction_uuid,product_code",
    };

    // Prepare the message for signature
    const message = `total_amount=${payload.total_amount},transaction_uuid=${payload.transaction_uuid},product_code=${payload.product_code}`;

    // Generate the signature using HMAC-SHA256
    const secret = "8gBm/:&EnhH.1/q";
    const signature = CryptoJS.HmacSHA256(message, secret).toString(
      CryptoJS.enc.Base64
    );

    // Add the signature to the payload
    payload.signature = signature;

    console.log("Payload:", payload); // Log the payload

    // Create a hidden form and submit it
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    // Add payload fields as hidden inputs
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = payload[key];
        form.appendChild(input);
      }
    }

    // Append the form to the body and submit it
    document.body.appendChild(form);
    form.submit();
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full p-4 ">
      <h3 className="text-2xl font-semibold text-center">Payment</h3>
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
        className="relative w-full"
      >
        <button
          onClick={scrollLeft}
          className="absolute xl:hidden left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-blue-500/50 text-white rounded-full"
        >
          &lt;
        </button>

        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto no-scrollbar snap-x snap-mandatory flex gap-4 p-2 lg:grid overflow-hidden lg:grid-cols-3"
        >
          {pricing.map((plan, index) => {
            return (
              <div
                className="relative flex-shrink-0 flex snap-start justify-center w-full md:w-1/2 lg:w-full"
                key={index}
              >
                <div className=" h-[450px] w-full sm:w-4/5 md:w-full px-6 py-8 bg-white text-gray-800 rounded-3xl shadow-md flex flex-col justify-between">
                  <p className="font-semibold text-2xl">{plan.title}</p>
                  <p className="text-xl mt-2">{plan.messages}</p>

                  <div className="text-md flex flex-col justify-center h-full p-4">
                    {plan.features.map((feature, index) => {
                      return <p key={index}>{feature}</p>;
                    })}
                  </div>

                  <p className="text-3xl font-semibold mb-6">
                    NRP {plan.price}
                    <sub className="top-2 text-sm font-light">/{plan.time}</sub>
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
                    className="absolute flex gap-2 -bottom-2 right-0 p-2 rounded-xl bg-gray-500 border border-gray-500 text-white ml-2 text-xs hover:text-black hover:bg-white items-center"
                    onClick={() => {
                      setSelectedPlan(plan.title);
                      setPopUp(true);
                    }}
                  >
                    Use <RiCoupon2Fill />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={scrollRight}
          className="absolute xl:hidden right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-blue-500/50 text-white rounded-full"
        >
          &gt;
        </button>
      </motion.div>
    </div>
  );
};

export default Payment;
