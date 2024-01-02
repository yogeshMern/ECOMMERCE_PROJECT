import { useEffect, useState } from "react";
import { BASE_URL } from "../../env";
import Axios from "axios";
import Notfound from "../Pages/Notfound";
import { Link } from "react-router-dom";
import { LEFT_ARROW_ICON } from "../Components/SVG";

const PlacedOrder = () => {
  const [data, setData] = useState([]);

  const email = JSON.parse(localStorage.getItem("token"));
  const getPlacedOrder = async () => {
    const url = `${BASE_URL}/placed-order?userEmail=${email.email}`;
    try {
      const res = await Axios.get(url);
      setData(res.data.data);
    } catch (error) {
      console.log("err", error);
    }
  };

  const cancleOrder = async (orderId) => {
    try {
      await Axios.post(`${BASE_URL}/cancel-order/${orderId}`);
      getPlacedOrder();
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getPlacedOrder();
  }, []);

  return (
    <>
      {data.length !== 0 ? (
        <div className="container mx-auto mt-10">
          <div className="flex my-10">
            <div className="w-full bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Placed Items</h1>
                <h2 className="font-semibold text-2xl">{data.length} Items</h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-[130px]">
                  Quantity
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-[130px]">
                  Price
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-[130px]">
                  Total
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-[130px]">
                  Order Status
                </h3>
              </div>
              {data &&
                data?.map((ele) => {
                  return ele.productDetails.map((ele, ind) => {
                    console.log("ele", ele);
                    return (
                      <div
                        key={ind}
                        className="flex items-center border hover:border-gray-600 -mx-8 px-6 py-5"
                      >
                        <div className="flex w-2/5">
                          {/* <!-- product --> */}
                          <div className="w-20">
                            <img src={ele?.productImage} alt="productImage" />
                          </div>
                          <div className="flex flex-col justify-between ml-4 flex-grow">
                            <span className="font-bold text-sm">
                              {ele?.productName}
                            </span>
                            <span className="text-red-500 text-xs">
                              {ele?.category}
                            </span>
                            <p
                              onClick={() => cancleOrder(ele._id)}
                              className="font-semibold hover:text-red-500 text-gray-500 text-xs w-20 cursor-pointer"
                            >
                              Cancle Order
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-center w-[130px] cursor-pointer items-center">
                          <span className="mx-2 border text-center w-8 font-bold">
                            {ele?.quantity}
                          </span>
                        </div>
                        <span className="text-center w-[130px] font-semibold text-sm text-green-500">
                          ${ele?.newPrice}
                        </span>
                        <span className="text-center w-[130px] font-semibold text-sm text-green-500">
                          ${ele?.newPrice * ele?.quantity}
                        </span>
                        <span className="text-center w-[130px] font-semibold text-sm text-green-500">
                          Placed
                        </span>
                      </div>
                    );
                  });
                })}

              <Link
                to="/"
                className="flex font-semibold text-indigo-600 text-sm mt-10"
              >
                <LEFT_ARROW_ICON />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl flex justify-center font-semibold">
            Placed Order not found
          </h1>
          <Notfound />
        </>
      )}
    </>
  );
};

export default PlacedOrder;
