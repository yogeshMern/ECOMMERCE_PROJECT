import exclusive_image from "./Assets/exclusive_image.png";

const Offers = () => {
  return (
    <div className="mt-[50px]">
      <div className="w-[85%] h-[60vh] flex m-auto pr-[40px] mb-[150px] relative bg-gradient-to-b from-[#f7e7f7] to-[#ffffff] via-transparent">
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="text-[#171717] pl-3 text-[55px] font-semibold">
            Exclusive
          </h1>
          <h1 className="text-[#171717] pl-3 text-[55px] font-semibold">
            Offers For You
          </h1>
          <p className="text-[#171717] pl-4 text-[22px] font-semibold">
            ONLY ON BEST SELLER PRODUCTS
          </p>
          <button className="w-[282px] h-[70px] ml-3 rounded-[35px] bg-[#ff4141] border-none text-white text-[22px] font-semibold mt-[30px] cursor-pointer">
            Check Now
          </button>
        </div>

        <div className="flex flex-1 items-center justify-end pt-[50px] absolute top-0 right-0 h-full">
          <img src={exclusive_image} alt="exclusive_image" className="h-full" />
        </div>
      </div>
    </div>
  );
};

export default Offers;
