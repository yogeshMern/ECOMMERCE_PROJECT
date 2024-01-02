import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Notfound from "../Pages/Notfound";
import Loader from "../Components/Loader";
import Axios from "axios";
import { BASE_URL } from "../../env";
import { toast } from "react-hot-toast";
import { LEFT_ARROW_ICON } from "../Components/SVG";

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    quantity: 0,
    productId: "",
    month: "",
    year: "",
    securityCode: "",
    totalAmount: 0,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (location.state) {
        window.scrollTo(0, 0);
        setData(location.state);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [location.state]);

  if (data === null) {
    return (
      <div className="flex justify-center items-center w-full col-span-4 p-[200px]">
        <Loader />
      </div>
    );
  }

  const emailId = JSON.parse(localStorage.getItem("token"));

  const placeOrder = async () => {
    const emailId = JSON.parse(localStorage.getItem("token"));
    let payload = {
      email: emailId.email,
      cardNumber: formData.cardNumber,
      cardName: formData.cardName,
      quantity: data.quantity,
      productId: data._id || data.id,
      totalAmount: data.newPrice * data.quantity + 10,
      expirationDate: {
        month: formData.month,
        year: formData.year,
        securityCode: formData.securityCode,
      },
    };

    try {
      await Axios.post(`${BASE_URL}/place-order`, payload);
      navigate("/profile");
      // toast.success(res.data.message);
    } catch (error) {
      console.log("Error while place Order!", error);
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {data !== undefined ? (
        <div className="relative mx-auto w-full bg-white">
          <div className="grid min-h-screen grid-cols-10">
            <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
              <div className="mx-auto w-full max-w-lg">
                <h1 className="relative text-2xl font-medium text-gray-700 sm:text-1xl cursor-pointer">
                  Online Payment
                  <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
                </h1>

                <form action="" className="mt-10 flex flex-col space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold text-gray-500"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={emailId.email}
                      readOnly={false}
                      // onChange={(e) => handleChange(e)}
                      placeholder="john.capler@fang.com"
                      className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="card-number"
                      className="text-xs font-semibold text-gray-500"
                    >
                      Card number
                    </label>
                    <input
                      type="text"
                      id="card-number"
                      name="cardNumber"
                      readOnly={false}
                      onChange={(e) => handleChange(e)}
                      placeholder="1234-5678-XXXX-XXXX"
                      className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    />
                    <img
                      src="/images/uQUFIfCYVYcLK0qVJF5Yw.png"
                      alt=""
                      className="absolute bottom-3 right-3 max-h-4"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Expiration date
                    </p>
                    <div className="mr-6 flex flex-wrap">
                      <div className="my-1">
                        <label htmlFor="month" className="sr-only">
                          Select expiration month
                        </label>
                        <select
                          id="month"
                          name="month"
                          onChange={(e) => handleChange(e)}
                          className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="">Month</option>
                          <option value="1">January</option>
                          <option value="2">February</option>
                          <option value="3">March</option>
                          <option value="4">April</option>
                          <option value="5">May</option>
                          <option value="6">June</option>
                          <option value="7">July</option>
                          <option value="8">August</option>
                          <option value="9">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                        </select>
                      </div>
                      <div className="my-1 ml-3 mr-6">
                        <label htmlFor="year" className="sr-only">
                          Select expiration year
                        </label>
                        <select
                          id="year"
                          name="year"
                          onChange={(e) => handleChange(e)}
                          className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="">Year</option>
                          <option value="1">2025</option>
                          <option value="2">2028</option>
                          <option value="3">2030</option>
                          <option value="4">2035</option>
                          <option value="5">2038</option>
                        </select>
                      </div>
                      <div className="relative my-1">
                        <label htmlFor="security-code" className="sr-only">
                          Security code
                        </label>
                        <input
                          type="text"
                          id="security-code"
                          name="securityCode"
                          readOnly={false}
                          onChange={(e) => handleChange(e)}
                          placeholder="Security code"
                          className="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="card-name" className="sr-only">
                      Card name
                    </label>
                    <input
                      type="text"
                      id="card-name"
                      name="cardName"
                      readOnly={false}
                      onChange={(e) => handleChange(e)}
                      placeholder="Name on the card"
                      className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </form>

                <button
                  onClick={() => placeOrder()}
                  type="submit"
                  className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
                >
                  Place Order
                </button>

                <Link
                  to="/"
                  className="flex font-semibold text-indigo-600 text-sm mt-10"
                >
                  <LEFT_ARROW_ICON />
                  Continue Shopping
                </Link>
              </div>
            </div>
            <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24 bg-gray-50">
              <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                Order summary
                <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
              </h1>

              <div className="relative text-black mt-[50px]">
                <ul className="space-y-5">
                  <li className="flex justify-between">
                    <div className="inline-flex">
                      <img
                        src={data.productImage}
                        alt="image"
                        className="max-h-24"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-semibold w-[210px]">
                          {data.productName}
                        </p>
                        <p className="text-sm font-bold text-red-500 uppercase">
                          {data.category}
                        </p>

                        <div className="flex justify-start items-center gap-3 text-sm font-bold text-gray-500">
                          <p className="text-sm">Quantity :</p>
                          <p>{data.quantity}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-green-400">
                      ${data.newPrice}
                    </p>
                  </li>
                </ul>
                <div className="my-1 h-0.5 w-full bg-opacity-30"></div>
                <div className="space-y-2">
                  <p className="flex justify-between text-sm font-bold">
                    <span className="text-gray-500">
                      TAX: <b className="text-green-400">10$</b>
                    </span>
                    <span className="text-green-400">
                      ${data.newPrice * data.quantity + 10}
                    </span>
                  </p>
                </div>
              </div>

              <div className="relative mt-10">
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total Amount</p>
                  <p className="text-lg font-bold text-green-400">
                    ${data.newPrice * data.quantity + 10}
                  </p>
                </div>
                <h3 className="mb-5 text-lg font-bold">Support</h3>
                <p className="text-sm font-semibold">
                  +01 653 235 211
                  <span className="font-light">(International)</span>
                </p>
                <p className="mt-1 text-sm font-semibold">
                  support@nanohair.com
                  <span className="font-light">(Email)</span>
                </p>
                <p className="mt-2 text-xs font-medium">
                  Call us now for payment related issues
                </p>
              </div>
              <div className="relative mt-10 flex">
                <p className="flex flex-col">
                  <span className="text-sm font-bold">
                    Money Back Guarantee
                  </span>
                  <span className="text-xs font-medium">
                    within 30 days of purchase
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Notfound />
      )}
    </>
  );
};

export default Cart;
