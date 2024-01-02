import { Link, useLocation } from "react-router-dom";
import { GiElectric } from "react-icons/gi";
import {
  TAG,
  GLOBE,
  CANCEL_PRODUCT,
  CART_FILLED_ICON,
} from "../Components/SVG";
import Moreproduct from "../Components/Moreproduct";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { BASE_URL } from "../../env";
import toast from "react-hot-toast";

const Product = () => {
  const location = useLocation();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timeoutId = setTimeout(() => {
      if (location.state && location.state.product) {
        setData(location.state.product);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [location.state]);

  if (!data) {
    return (
      <div className="flex justify-center items-center w-full col-span-4 p-[200px]">
        <Loader />
      </div>
    );
  }

  const addProduct = async (data) => {
    const storage = JSON.parse(localStorage.getItem("token"));
    if (!storage) {
      navigate("/signup");
      toast.error("Register first to save the Products!");
    }
    const userId = storage.id;
    const productId = data.id;
    const quantity = qty;
    const payload = {
      userId,
      productId,
      quantity,
    };
    try {
      await Axios.post(`${BASE_URL}/cart`, payload);
      navigate("/saved");
    } catch (error) {
      console.log("Error adding product to cart", error);
      if (error.name === "AxiosError") {
        return toast.error("This Product is already saved in the Cart!");
      }
    }
  };

  const buyProduct = (data, quantity) => {
    const permission = localStorage.getItem("token");
    if (!permission) {
      navigate("/signup");
      toast.error("Register first to Buy the Products!");
    } else {
      const dataWithQuantity = { ...data, quantity };
      navigate("/cart", { state: dataWithQuantity });
    }
  };

  return (
    <>
      {data ? (
        <div className="py-8 border-2">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg mb-4">
                  <div className="my-5">
                    <Link
                      to="/"
                      className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                    >
                      Home
                    </Link>
                    /
                    <Link
                      to={
                        data.category === "women"
                          ? "/women"
                          : data.category === "men"
                          ? "/men"
                          : data.category === "kid"
                          ? "/kid"
                          : "/"
                      }
                      className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800 uppercase"
                      aria-current="page"
                    >
                      {data.category}
                    </Link>
                  </div>
                  <img
                    className="w-[400px] object-cover border-1 border-black hover:shadow-lg transition duration-300 delay-300"
                    src={data.productImage}
                    alt="Product Image"
                  />
                </div>
                <div className="flex mt-[100px] gap-5 text-sm">
                  <div>
                    <button
                      onClick={() => {
                        addProduct(data);
                      }}
                      className="w-[191px] border-2 border-gray-800 hover:border-red-600 py-2 font-bold flex items-center justify-center gap-3"
                    >
                      <CART_FILLED_ICON />
                      ADD TO CART
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={() => buyProduct(data, qty)}
                      className="w-[191px] border-2 border-gray-800 hover:border-red-600 py-2 font-bold flex items-center justify-center gap-3"
                    >
                      <GiElectric className="w-5 h-5" />
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>

              <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {data.productName}
                </h2>
                <div className="flex mb-4">
                  <div className="mr-4">
                    <span className="text-green-400 text-3xl">
                      <b>${data.newPrice}</b>
                    </span>
                  </div>
                </div>
                <div className="flex mb-4">
                  <div className="mr-4">
                    <span className="text-3xl">
                      <div className="sm:order-1">
                        <div className="mx-auto flex h-8 items-stretch border-1 border-gray-600">
                          <button
                            onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                            className="flex items-center justify-center border-2 border-black rounded-sm px-4"
                          >
                            -
                          </button>
                          <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-sm font-bold transition">
                            {qty < 1 ? 1 : qty}
                          </div>
                          <button
                            onClick={() => setQty(qty + 1)}
                            className="flex items-center justify-center border-2 border-black rounded-sm px-4"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>

                <div className="w-full">
                  <p className="mt-[20px] font-semibold text-[15px]">
                    Description
                  </p>
                  <div className="mt-[10px]">
                    <p className="text-gray-600 text-sm mt-2">
                      {data.description}
                    </p>
                  </div>
                </div>

                <div className="w-full mt-10">
                  <p className="mt-[20px] font-semibold text-[15px]">
                    Heightlights
                  </p>
                  <ul className="mt-[10px]">
                    <li className="p-[5px] flex items-center text-left text-sm font-medium text-gray-600 gap-5 w-[500px]">
                      <TAG /> Handmade product from Japan
                    </li>
                    <li className="p-[5px] flex items-center text-left text-sm font-medium text-gray-600 gap-5 w-[500px]">
                      <TAG /> It takes 12 hours in a day for createing this
                      product
                    </li>
                    <li className="p-[5px] flex items-center text-left text-sm font-medium text-gray-600 gap-5 w-[500px]">
                      <TAG />
                      Pure leather Product
                    </li>
                  </ul>
                </div>

                <div>
                  <ul className="mt-8  flex items-center gap-5">
                    <li className="flex items-center text-left text-sm font-medium text-gray-600">
                      <GLOBE />
                      <b>Free shipping worldwide</b>
                    </li>

                    <li className="flex items-center text-left text-sm font-medium text-gray-600">
                      <CANCEL_PRODUCT />
                      <b>Cancel Anytime</b>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[100px]">
            <Moreproduct />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Product;
