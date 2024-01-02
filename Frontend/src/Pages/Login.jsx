import { Link } from "react-router-dom";
import { LOGIN_SIGNUP_IMAGE } from "../Components/SVG";
import Axios from "axios";
import { BASE_URL } from "../../env";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // const alreadyLoggedIn = JSON.parse(localStorage.getItem("token"));

  const registerUser = (e) => {
    e.preventDefault();
    if (!data?.userName || data?.email || data?.password) {
      console.log("Enter values to create an account!");
    }
    Axios.post(`${BASE_URL}/login-user`, data)
      .then((res) => {
        console.log("Login DATA", res);

        localStorage.setItem(
          "token",
          JSON.stringify({
            id: res.data.existUser._id,
            username: res.data.existUser.userName,
            email: res.data.existUser.email,
          })
        );
        toast.success(res.data.message);
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Login form */}
      <div className="w-1/2 bg-gradient-to-r from-[#fde1ff] to-[#e1ffea22] p-10 text-black flex flex-col justify-center items-center">
        <h2 className="text-4xl font-extrabold mb-8 flex">Sign In</h2>
        <form className="w-full max-w-md">
          <div className="flex gap-[94px] text-[12px]">
            <div className="mb-4">
              <input
                type="email"
                id="Email address"
                name="email"
                onChange={(e) => onChange(e)}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:border-blue-300  text-black"
                placeholder="Enter your email Id"
                required="This fiels is required"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => onChange(e)}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:border-blue-300  text-black"
                placeholder="Enter your password"
                required="This fiels is required"
              />
            </div>
          </div>

          <div className="mb-6 text-[12px] flex justify-between items-center">
            <button
              type="submit"
              className="bg-black text-white p-3 rounded-md focus:outline-none w-[176px] h-[40px] hover:bg-slate-600"
              onClick={(e) => {
                registerUser(e);
              }}
            >
              Log In
            </button>

            <p className="flex justify-end gap-[8px]">
              Don't have an account?
              <span className="text-red-500 font-semibold cursor-pointer">
                <Link to="/signup">Sign Up here</Link>
              </span>
            </p>
          </div>
        </form>
      </div>

      {/* Right side - Description with Image and Text */}
      <div className="w-1/2 bg-white p-10 flex items-center justify-center">
        <div>
          <img
            src={LOGIN_SIGNUP_IMAGE}
            alt="logo"
            className="rounded-lg shadow-md w-[300px] h-[auto]"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
