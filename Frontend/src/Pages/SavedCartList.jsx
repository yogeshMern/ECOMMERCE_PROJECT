import { TiDeleteOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { LEFT_ARROW_ICON } from "../Components/SVG";
import { useEffect, useState } from "react";
import Notfound from "../Pages/Notfound";
import Axios from "axios";
import { BASE_URL } from "../../env";
import toast from "react-hot-toast";

const SavedCartList = () => {
  const navigate = useNavigate();
  const sendProduct = (product) => {
    navigate(`/products`, { state: { product } });
  };

  const [data, setData] = useState([]);

  const addToCart = () => {
    const userId = JSON.parse(localStorage.getItem("token"));
    Axios.get(`${BASE_URL}/cart-items/${userId.id}`)
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((err) => console.log("err", err));
  };

  const removeItem = async (data) => {
    const user = JSON.parse(localStorage.getItem("token"));
    const userId = user.id;
    const productIdToRemove = data;
    const payload = {
      userId,
      productIdToRemove,
    };

    try {
      const res = await Axios.post(`${BASE_URL}/remove-items`, payload);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
      addToCart();
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error adding product to cart", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    addToCart();
  }, []);

  const taxAmount = 10;
  let totalPrice = 0;

  data[0]?.product.forEach((product) => {
    if (product.quantity) {
      // If there is a quantity, multiply newPrice by quantity
      totalPrice += product.newPrice * product.quantity;
    } else {
      // If there is no quantity, use newPrice as is
      totalPrice += product.newPrice;
    }
  });

  return (
    <>
      {data.length !== 0 ? (
        <div className="container mx-auto mt-10">
          <div className="flex my-10">
            <div className="w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Saved Items In Cart</h1>
                <h2 className="font-semibold text-2xl">
                  {data[0]?.product.length} Items
                </h2>
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
              </div>
              {data &&
                data.map((item) => {
                  return (
                    item?.product.isDeleted !== true &&
                    item?.product?.map((ele, ind) => {
                      return (
                        <div
                          key={ind}
                          className="flex items-center border hover:border-gray-600 -mx-8 px-6 py-5"
                        >
                          <div
                            className="flex w-2/5"
                            onClick={() => sendProduct(ele)}
                          >
                            {/* <!-- product --> */}
                            <div className="w-20">
                              <img src={ele?.productImage} alt="" />
                            </div>
                            <div className="flex flex-col justify-between ml-4 flex-grow">
                              <span className="font-bold text-sm">
                                {ele?.productName}
                              </span>
                              <span className="text-red-500 text-xs uppercase">
                                {ele?.category}
                              </span>
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
                          <span className="text-center text-red-500 pl-[50px] text-2xl w-[30px] cursor-pointer">
                            <TiDeleteOutline
                              onClick={() => removeItem(ele._id)}
                            />
                          </span>
                        </div>
                      );
                    })
                  );
                })}

              <Link
                to="/"
                className="flex font-semibold text-indigo-600 text-sm mt-10"
              >
                <LEFT_ARROW_ICON />
                Continue Shopping
              </Link>
            </div>

            <div id="summary" className="w-1/4 px-8 py-10">
              <h1 className="font-semibold text-2xl border-b pb-8">
                Order Summary
              </h1>

              <div className="mt-10">
                <div className="flex justify-between">
                  <span className="font-semibold text-sm uppercase">
                    Total Items {data[0]?.product.length}
                  </span>
                  <span className="font-semibold text-sm text-green-500">
                    ${totalPrice}
                  </span>
                </div>

                <div className="flex justify-between my-3">
                  <span className="font-semibold text-sm uppercase">Tax</span>
                  <span className="font-semibold text-sm text-green-500">
                    ${data[0]?.product.length > 0 ? 10 : 0}
                  </span>
                </div>
              </div>

              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span className="text-green-500">
                    ${totalPrice + taxAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl flex justify-center font-semibold">
            Cart items not found
          </h1>
          <Notfound />
        </>
      )}
    </>
  );
};

export default SavedCartList;
