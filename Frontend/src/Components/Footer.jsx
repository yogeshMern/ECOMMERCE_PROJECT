import footer_logo from "./Assets/logo_big.png";
import instagram_icon from "./Assets/instagram_icon.png";
import pintester_icon from "./Assets/pintester_icon.png";
import whatsapp_icon from "./Assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-[50px] mt-[100px]">
        <div className="flex items-center gap-[20px]">
          <img src={footer_logo} alt="footer_logo" />
          <p className="text-[#383838] text-[30px] font-semibold">
            C L O T H E S
          </p>
        </div>
        <ul className="flex list-none gap-[80px] text-[#252525] text-[16px]">
          <li className="cursor-pointer transform transition-transform hover:scale-125">
            Company
          </li>
          <li className="cursor-pointer transform transition-transform hover:scale-125">
            Products
          </li>
          <li className="cursor-pointer transform transition-transform hover:scale-125">
            Offices
          </li>
          <li className="cursor-pointer transform transition-transform hover:scale-125">
            About
          </li>
          <li className="cursor-pointer transform transition-transform hover:scale-125">
            Contact
          </li>
        </ul>

        <div className="flex gap-[20px]">
          <div className="p-[10px] pb-[6px] bg-[#fbfbfb] border-[#ebebeb]">
            <img
              src={instagram_icon}
              alt="instagram_icon"
              className="cursor-pointer transform transition-transform hover:scale-125"
            />
          </div>
          <div className="p-[10px] pb-[6px] bg-[#fbfbfb] border-[#ebebeb]">
            <img
              src={pintester_icon}
              alt="pintester_icon"
              className="cursor-pointer transform transition-transform hover:scale-125"
            />
          </div>
          <div className="p-[10px] pb-[6px] bg-[#fbfbfb] border-[#ebebeb]">
            <img
              src={whatsapp_icon}
              alt="whatsapp_icon"
              className="cursor-pointer transform transition-transform hover:scale-125"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-[30px] w-[100%] mb-[30px] text-[#1a1a1a] text-[20px]">
          <hr className="w-[80%] border-none rounded-[10px] h-[3px] bg-[#c7c7c7]" />
          <p>Copyright @ 2023 - All Right Reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
