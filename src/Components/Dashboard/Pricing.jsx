import plan from "../pricing/images/Plans.png";
import basic from "../pricing/images/Basic Plan.png";
import basicmessage from "../pricing/images/basicmessage.png";
import month from "../pricing/images/Group 22.png";
import getstarted from "../pricing/images/Group 26.png";
import enterprise from "../pricing/images/Group 29.png";

const PricingCard = () => {
  return (
    <div className="flex flex-col items-center p-6 py-[40px] w-full max-w-sm border-2 gap-[80px] rounded-4xl border-gray-300 shadow-lg">
      <div className="flex flex-col items-start gap-5 w-full">
        <img src={basic} alt="Basic Plan" />
        <img src={basicmessage} alt="Basic Plan Message" />
      </div>
      <div className="flex flex-col ps-2 gap-6 items-start justify-center w-full mt-6">
        <img src={month} alt="Monthly Plan" className="h-10 ps-2" />
        <button>
          <img src={getstarted} alt="Get Started" className="h-14" />
        </button>
      </div>
    </div>
  );
};

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center mb-[70px]">
        {/* <img src={plan} alt="Plans" className="w-60 md:w-auto" /> */}
        <p className="text-6xl ">Plans</p>
        <div className="flex justify-center items-center gap-2 bg-gray-100 p-2 rounded-3xl">
          <button className="bg-blue-600 text-white rounded-3xl px-4 py-2">
            Monthly
          </button>
          <button className="bg-gray-100 text-black rounded-3xl px-3 py-1">
            Annual
          </button>
          <button className="bg-black text-white rounded-3xl px-3 py-1">
            Save 20%
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        <PricingCard />
        <PricingCard />
        <PricingCard />
      </div>

      {/* Enterprise Plan */}
      <div className="mt-12 px-4">
        <div className="border-2 py-9 flex flex-col md:flex-row items-center justify-between rounded-3xl p-6 border-gray-300 shadow-lg">
          <img
            src={enterprise}
            alt="Enterprise Plan"
            className="h-20 mb-4 md:mb-0"
          />
          <button>
            <img src={getstarted} alt="Get Started" className="h-14" />
          </button>
        </div>
      </div>
    </div>
  );
}
