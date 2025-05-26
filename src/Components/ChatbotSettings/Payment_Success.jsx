import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { motion } from "framer-motion";

function PaymentSuccess() {
  const navigate = useNavigate();
  const [isPaymentProcessed, setIsPaymentProcessed] = useState(false); // State to track if payment has been processed
  const { code, subscription_plan_id } = useParams();

  useEffect(() => {
    // Prevent the effect from running if the payment has already been processed
    if (isPaymentProcessed) return;

    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get("data");
    const pidx = urlParams.get("pidx");
    const apiKey = localStorage.getItem("api_key");
    const chatbotData = JSON.parse(localStorage.getItem("chatbotData"));
    const chatbot_id = chatbotData.chatbot_id;
    const coupon = code.slice(1);

    console.log("code:", code.slice(1));
    let requestBody = {
      chatbot_id: chatbot_id,
      coupon_code: coupon,
      subscription_plan_id: subscription_plan_id,
    };

    if (encodedData) {
      requestBody.data = encodedData;
    } else {
      requestBody.pidx = pidx;
    }
    if (encodedData || pidx) {
      axiosInstance
        .post(
          `${import.meta.env.VITE_API_URL}api/payment-success/`,
          requestBody,
          {
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": apiKey,
            },
          }
        )
        .then((data) => {
          console.log("Backend response:", data);
          setIsPaymentProcessed(true);
          // localStorage.removeItem("chatbotData");
          setTimeout(() => {
            navigate("/dashboard"); // Navigate to the homepage
          }, 10000);
        })
        .catch((error) => {
          console.error("Error sending data to backend:", error);
        });
    } else {
      console.error("No data parameter found in the URL");
    }
  }, []);

  return (
    <>
      {!isPaymentProcessed ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-white via-indigo-100 to-indigo-300"
        >
          {/* Spinner */}
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full border-t-4 border-indigo-600 animate-spin"></div>
            <div className="absolute inset-0 rounded-full border-b-4 border-indigo-600 animate-spin"></div>
          </div>

          {/* Animated Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-800">
            Processing Your Payment...
          </h2>

          {/* Pulsing Subtext */}
          <p className="mt-4 text-md md:text-lg text-gray-600">
            Please don’t refresh or close this page.
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-white via-indigo-100 to-indigo-300 rounded-lg shadow-xl"
        >
          <h1 className="mb-4 text-4xl font-semibold text-green-600">
            🎉 Payment Successful!
          </h1>
          <p className="text-lg text-gray-700">
            Thank you for your payment. You're being redirected...
          </p>
        </motion.div>
      )}
    </>
  );
}

export default PaymentSuccess;
