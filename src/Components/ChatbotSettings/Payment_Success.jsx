import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function PaymentSuccess() {
  const navigate = useNavigate();
  const [isPaymentProcessed, setIsPaymentProcessed] = useState(false); // State to track if payment has been processed
  const { code } = useParams();

  useEffect(() => {
    // Prevent the effect from running if the payment has already been processed
    if (isPaymentProcessed) return;

    // Extract the `data` parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get("data");
    console.log("code:", code.slice(1));
    if (encodedData) {
      const apiKey = localStorage.getItem("api_key");
      const token = localStorage.getItem("token");
      const chatbotData = JSON.parse(localStorage.getItem("chatbotData"));
      const chatbot_id = chatbotData.chatbot_id;
      const coupon = code.slice(1);
      axios
        .post(
          `${import.meta.env.VITE_API_URL}api/payment-success/`,
          { data: encodedData, chatbot_id: chatbot_id, coupon_code: coupon },
          {
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": apiKey,
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Backend response:", data);
          setIsPaymentProcessed(true); // Mark payment as processed
          // Wait for 2 seconds before navigating to '/'
          localStorage.removeItem("chatbotData");
          setTimeout(() => {
            navigate("/dashboard"); // Navigate to the homepage
          }, 2000);
        })
        .catch((error) => {
          console.error("Error sending data to backend:", error);
        });
    } else {
      console.error("No data parameter found in the URL");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white rounded-lg shadow-lg">
      <h1 className="mb-4 text-4xl font-semibold text-green-600">
        Payment Successful!
      </h1>
      <p className="mb-6 text-lg text-gray-600">
        Thank you for your payment. We are processing your transaction.
      </p>
    </div>
  );
}

export default PaymentSuccess;
