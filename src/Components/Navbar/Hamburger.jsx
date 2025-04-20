
const Hamburger = ({ showNavbar, setShowNavbar }) => {
  return (
    <button
      className="relative lg:hidden w-8 h-6 flex flex-col justify-center items-center"
      onClick={() => setShowNavbar(!showNavbar)}
    >
      <span
        className={`block absolute h-0.5 w-4 ${
          showNavbar ? "bg-white" : "bg-black"
        } transition-all duration-300 ease-in-out ${
          showNavbar ? "rotate-45 top-3" : "top-2"
        }`}
      ></span>
      <span
        className={`block absolute h-0.5 w-4 ${
          showNavbar ? "bg-white" : "bg-black"
        } transition-all duration-300 ease-in-out ${
          showNavbar ? "-rotate-45 top-3" : "top-4"
        }`}
      ></span>
    </button>
  );
};

export default Hamburger;
