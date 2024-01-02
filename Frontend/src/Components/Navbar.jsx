import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { SVGDOWN_ARROW } from "./SVG";
import { FaUserCircle } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import toast from "react-hot-toast";
import logo from "./Assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [selectMenu, setSelectMenu] = useState("SHOP");

  const logout = () => {
    const data = JSON.parse(localStorage.getItem("token"))
      ? "token"
      : undefined;
    navigate("/");
    window.location.reload();
    if (data) {
      localStorage.clear();
      toast.success("Sign Out successfully");
    } else {
      return null;
    }
  };

  const loginConform = JSON.parse(localStorage.getItem("token"));

  return (
    <div className="flex justify-between p-[16px] shadow-sm">
      <div className="flex items-center gap-[10px]">
        <img
          src={logo}
          alt="logo"
          width="50px"
          height="auto"
          className="cursor-pointer"
        />
        <p className="text-[#171717] text-2xl font-semibold text">
          <Link to="/">C L O T H E S</Link>
        </p>
      </div>

      <ul className="flex text-sm items-center gap-[50px] text-[#626262] font-semibold cursor-pointer">
        <li
          onClick={() => setSelectMenu("SHOP")}
          className={`${
            selectMenu === "SHOP" &&
            "text-black border-b-[3px] border-b-red-500"
          } hover:border-b-[3px] hover:border-b-red-500`}
        >
          <Link to="/">SHOP</Link>
        </li>
        <li
          onClick={() => setSelectMenu("MENS")}
          className={`${
            selectMenu === "MENS" &&
            "text-black border-b-[3px] border-b-red-500"
          } hover:border-b-[3px] hover:border-b-red-500`}
        >
          <Link to="/men">MENS</Link>
        </li>
        <li
          onClick={() => setSelectMenu("WOMENS")}
          className={`${
            selectMenu === "WOMENS" &&
            "text-black border-b-[3px] border-b-red-500"
          } hover:border-b-[3px] hover:border-b-red-500`}
        >
          <Link to="women">WOMENS</Link>
        </li>
        <li
          onClick={() => setSelectMenu("KIDS")}
          className={`${
            selectMenu === "KIDS" &&
            "text-black border-b-[3px] border-b-red-500"
          } hover:border-b-[3px] hover:border-b-red-500`}
        >
          <Link to="/kid">KIDS</Link>
        </li>
      </ul>

      <div className="flex text-sm items-center gap-[30px] text-[#626262]">
        <div className="group relative cursor-pointer">
          {loginConform !== null ? (
            <div className="flex items-center justify-between w-[180px]">
              <Link to="/profile" className="text-black hover:text-blue-800">
                <div className="flex items-center gap-2 font-bold">
                  <FaUserCircle className="text-[24px]" />
                  {loginConform.username}
                </div>
              </Link>
              <div>
                <ImSwitch
                  className="text-[24px] text-red-600"
                  onClick={() => logout()}
                />
              </div>
            </div>
          ) : (
            <Link to="/signup">
              <button className="flex items-center justify-center font-semibold w-[120px] h-[38px] outline-none border-2 rounded-md text-black transition duration-100 ease-in-out active:bg-white group">
                <span className="mr-1 text-red-500">Sign In</span>
                <SVGDOWN_ARROW />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
