import { Link, useNavigate } from "react-router-dom";
import { LOGIN_SIGNUP_IMAGE } from "../Components/SVG";
import { useEffect, useState } from "react";
import Axios from "axios";
import { BASE_URL } from "../../env";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const registerUser = (e) => {
    e.preventDefault();
    if (!data?.userName || data?.email || data?.password) {
      console.log("Enter values to create an account!");
    }
    Axios.post(`${BASE_URL}/register-user`, data)
      .then((res) => {
        console.log("first", res.data.data);
        // localStorage.setItem("token", JSON.stringify(res.data.data._id));
        localStorage.setItem(
          "token",
          JSON.stringify({
            id: res.data.data._id,
            username: res.data.data.userName,
            email: res.data.data.email,
          })
        );
        navigate("/");
        if (res) {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log("error!", err);
        if (err.response) {
          // The request was made and the server responded with a status code
          toast.error(err.response.data.message);
        } else if (err.request) {
          // The request was made but no response was received
          toast.error("No response received from the server.");
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error("An error occurred while processing your request.");
        }
      });
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Login form */}
      <div className="w-1/2 bg-gradient-to-r from-[#fde1ff] to-[#e1ffea22] p-10 text-black flex flex-col justify-center items-center">
        <h2 className="text-4xl font-extrabold mb-8 flex">Sign Up</h2>
        <form className="w-full max-w-md">
          <div className="flex gap-[94px] text-[12px]">
            <div className="mb-4">
              <input
                type="text"
                id="username"
                name="userName"
                onChange={(e) => onChange(e)}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:border-blue-300  text-black"
                placeholder="Enter your username"
                required="This fiels is required"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="Email address"
                name="email"
                onChange={(e) => onChange(e)}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:border-blue-300  text-black"
                placeholder="Enter your Email address"
                required="This fiels is required"
              />
            </div>
          </div>

          <div className="mb-6 text-[12px]">
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => onChange(e)}
              className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:border-blue-300  text-black"
              placeholder="Enter your password"
              required="This fiels is required"
            />

            <p className="flex justify-end gap-[8px] mt-[10px]">
              Already have an account?
              <span className="text-red-500 font-semibold cursor-pointer">
                <Link to="/login">Login here</Link>
              </span>
            </p>
          </div>

          <button
            type="submit"
            className="bg-black text-white p-3 rounded-md focus:outline-none w-[150px] h-[50px] hover:bg-slate-600"
            onClick={(e) => registerUser(e)}
          >
            Sign Up
          </button>
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

export default Signup;
