import Navbar from "./Navbar";
import bg from "./PG_Images/Rectangle 8.png";
import text from "./PG_Images/text.png";
import send from "./PG_Images/Group 32.png";
export default function Playground() {
  return (
    <div>
      <div
        className=" h-full mx-[20px] rounded-3xl flex flex-col gap-[150px] pb-36"
        style={{
          backgroundImage: `url(${bg})`, // Use the imported image as the background
          backgroundSize: "cover", // Ensure the image covers the entire div
          backgroundPosition: "center", // Center the background image
        }}
      >
        <div>
          <Navbar />
        </div>
        <div className="ps-[150px] flex flex-col gap-8">
          <span>
            <h1 className="font-bold text-5xl">Hi There,</h1>
            <h1 className="font-bold text-5xl">
              {"Let's explore the playground"}
            </h1>
          </span>

          <img src={text} className="h-full w-[420px]" />
        </div>

        <div className="px-[150px]">
          <div className="bg-white w-full h-[50px] gap-2 rounded-4xl flex px-4 py-3 items-center justify-center">
            <input
              type="text"
              className="w-full h-[50px] placeholder:font-semibold placeholder-black px-3  rounded-lg focus:outline-none"
              placeholder="Type Whatever you want...."
            />

            <img src={send} className="h-[40px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
