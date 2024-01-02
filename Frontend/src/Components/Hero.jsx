import hand_icon from "./Assets/hand_icon.png";
import arrow_icon from "./Assets/arrow.png";
import hero_image from "./Assets/hero_image.png";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gradient-to-r from-[#fde1ff] to-[#e1ffea22]">
      <div className="flex flex-1 flex-col lg:justify-center lg:gap-[20px] lg:pl-[180px] leading-[1.1]">
        <h2 className="text-[#090909] text-[26px] font-semibold">
          NEW ARRIVALS ONLY
        </h2>

        <div>
          <div className="flex items-center gap-[20px]">
            <p className="text-[#171717] text-[80px] font-semibold">New</p>
            <img className="w-[105px]" src={hand_icon} alt="hand_icon" />
          </div>

          <p className="text-[#171717] text-[80px] font-semibold">
            collections
          </p>
          <p className="text-[#171717] text-[80px] font-semibold">
            for everyone
          </p>
        </div>

        <div className="flex justify-center items-center gap-[15px] lg:w-[290px] lg:h-[70px] rounded-[75px] mt-[30px] bg-[#ff4141] text-white text-[20px] font-semibold">
          <div>Latest Collections</div>
          <img src={arrow_icon} alt="arrow_icon" />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <img src={hero_image} alt="hero_image" className="w-full lg:w-500" />
      </div>
    </div>
  );
};

export default Hero;
