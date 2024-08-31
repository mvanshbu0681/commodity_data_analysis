import Image from "next/image";

const Navbar = () => {
  return (
    <nav
      className="text-white flex justify-between p-2"
      style={{
        //backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
        opacity: 1.0, // Increase the transparency here
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)", // Add the box shadow here
        //position: "fixed", // Make the navbar position fixed
        top: 0, // Stick the navbar to the top
        left: 0, // Stick the navbar to the left
        right: 0, // Stick the navbar to the right
        zIndex: 999, // Set a high z-index to make sure the navbar is on top of other elements
      }}
    >
      <div className="flex items-center">
        <Image
          src="/agro.jpg"
          alt="Logo"
          width={50}
          height={50}
          className=" rounded-full mr-2"
        />

        <h1 className=" text-black font-bold">Commodity Data Analyzer</h1>
      </div>
      <div className="flex items-center ml-auto">
        <a href="#" className="text-black font-bold mx-5">
          Home
        </a>
        <a href="#" className="text-black font-bold mx-5">
          PriceTrends
        </a>
        <a href="#" className="text-black font-bold mx-5">
          ForeCasting
        </a>
        <a href="#" className="text-black font-bold mx-5">
          Contact
        </a>

        <div className="relative flex items-center">
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 text-sm border border-gray-300 rounded-lg bg-white-50 pl-10 focus:ring-blue-500 focus:border-blue-500 border-black" // Add the border-black class here
            placeholder="Search..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="gray"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
          >
            <path d="M 20.5 6 C 12.509634 6 6 12.50964 6 20.5 C 6 28.49036 12.509634 35 20.5 35 C 23.956359 35</svg> 27.133709 33.779044 29.628906 31.75 L 39.439453 41.560547 A 1.50015 1.50015 0 1 0 41.560547 39.439453 L 31.75 29.628906 C 33.779044 27.133709 35 23.956357 35 20.5 C 35 12.50964 28.490366 6 20.5 6 z M 20.5 9 C 26.869047 9 32 14.130957 32 20.5 C 32 23.602612 30.776198 26.405717 28.791016 28.470703 A 1.50015 1.50015 0 0 0 28.470703 28.791016 C 26.405717 30.776199 23.602614 32 20.5 32 C 14.130953 32 9 26.869043 9 20.5 C 9 14.130957 14.130953 9 20.5 9 z"></path>
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
