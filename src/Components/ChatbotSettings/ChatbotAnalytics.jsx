import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChatbotAnalytics = () => {
  const { chatbotData } = useOutletContext();
  console.log("chatbot data in analytics", chatbotData);
  const [data, setData] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (chatbotData.chatbot_id) {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}api/chatbot/${
            chatbotData.chatbot_id
          }/traffic-stats/`,
          { headers: { Authorization: `Token ${token}` } }
        )
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        });
    }
  }, [chatbotData]);
  const usagePercentage =
    (chatbotData.messages_used / chatbotData.message_limit) * 100;
  // Prepare data for the bar chart
  const barChartData = {
    labels: data?.top_peak_traffic_hours.map((entry) => entry.time) || [],
    datasets: [
      {
        label: "Traffic Hits",
        data: data?.top_peak_traffic_hours.map((entry) => entry.hits) || [],
        backgroundColor: "#a5b4fc",
        borderColor: "#a5b4fc",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (Hourly)",
          color: "#4A5568",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Traffic Hits",
          color: "#4A5568",
        },
      },
    },
  };
  return (
    // <div className="w-full p-4 m-4">
    <div className="w-full p-2 md:p-4 gap-4 grid grid-cols-1 lg:grid-cols-5">

      <div className="grid order-2 lg:order-1 grid-cols-1 gap-4 lg:col-span-2">
        {/* Message usage card */}
        <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
          <h2 className="text-blue-700 text-base md:text-lg font-semibold mb-2 md:mb-4 border-b border-blue-100 pb-2">
            Message Usage
          </h2>
          <div className="bg-blue-50 rounded-lg p-3 md:p-4 border border-blue-100">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <div>
                <p className="text-xs md:text-sm text-gray-600">
                  {chatbotData.messages_used} of {chatbotData.message_limit}{" "}
                  messages used
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 md:h-2.5 mb-1">
              <div
                className="bg-blue-600 h-2 md:h-2.5 rounded-full"
                style={{ width: `${usagePercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-right text-gray-500">
              {usagePercentage.toFixed(2)}% used
            </p>
          </div>
        </div>

        {/* Queries card */}
        <div className="bg-white text-black rounded-lg p-3 md:p-4 shadow-sm">
          <h2 className="text-blue-700 text-base md:text-lg font-semibold mb-2 md:mb-4 border-b border-blue-100 pb-2">
            Most Searched Queries
          </h2>
          {data?.top_searched_queries?.map((query, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-200 py-1 text-sm md:text-base"
            >
              <span className="text-gray-700">{query.query}</span>
              <span className="text-blue-600 font-semibold">{query.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white order-1 lg:order-2 text-black rounded-lg p-3 md:p-4 shadow-sm lg:mt-0 lg:col-span-3">
        <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-blue-700 border-b pb-2">
          Peak Traffic Hours
        </h2>
        {data?.top_peak_traffic_hours?.length > 0 ? (
          <div className="w-full h-64 md:h-80 lg:h-96">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No traffic data available.</p>
        )}
      </div>
    </div>
  );
};

export default ChatbotAnalytics;
