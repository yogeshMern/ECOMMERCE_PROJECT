import Item from "../Components/Item";
import { SVGDOWN_ARROW } from "../Components/SVG";
import { useEffect, useState } from "react";
import Axios from "axios";
import { BASE_URL } from "../../env";
import Loader from "../Components/Loader";

const ShopCategory = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial set of products
    Axios.get(`${BASE_URL}/get-all-product`)
      .then((res) => {
        setData(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("All Products", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center gap-[10px] mb-[100px]">
      <img className="block m-[30px] w-[85%]" src={props.banner} alt="banner" />
      <div
        className=""
        style={{
          justifyContent: "space-between",
          display: "flex",
          width: "85%",
        }}
      >
        <p>
          <span className="font-semibold text-[12px]">Showing 1-12</span>
          <span className="text-[12px]">outOf 36 products</span>
        </p>

        <div className="flex text-sm items-center gap-[30px] text-[#626262]">
          <div className="group relative">
            <button className="flex items-center justify-center font-semibold w-[120px] h-[38px] outline-none border-2 rounded-[70px] text-[12px] text-black transition duration-100 ease-in-out active:bg-white group">
              <span className="mr-1">Sort by</span>
              <SVGDOWN_ARROW />
            </button>

            {/* menu list */}
            <ul className="rounded absolute hidden text-gray-700 pt-1 group-hover:block border-red-400">
              <li className="bg-white text-black font-semibold border hover:bg-gray-400 text-[12px] py-2 px-4 cursor-pointer w-[122px] text-center">
                Price
              </li>
              <li className="bg-white text-black font-semibold border hover:bg-gray-400 text-[12px] py-2 px-4 cursor-pointer w-[122px] text-center">
                Discount
              </li>
              <li className="bg-white text-black font-semibold border hover:bg-gray-400 text-[12px] py-2 px-4 cursor-pointer w-[122px] text-center">
                Ratings
              </li>
              <li className="bg-white text-black font-semibold border hover:bg-gray-400 text-[12px] py-2 px-4 cursor-pointer w-[122px] text-center">
                Latest
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-[50px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[50px]">
        {loading ? (
          <div className="flex justify-center items-center w-full col-span-4">
            <Loader />
          </div>
        ) : (
          data.map((ele, ind) => {
            if (props.category === ele?.category) {
              return (
                <Item
                  key={ind}
                  id={ele?._id}
                  productName={ele?.productName}
                  productImage={ele?.productImage}
                  newPrice={ele?.newPrice}
                  oldPrice={ele?.oldPrice}
                  category={ele?.category}
                  description={ele?.description}
                />
              );
            } else {
              return null;
            }
          })
        )}
      </div>

      <div className="flex justify-center items-center m-[120px] w-[233px] h-[69px] rounded-[75px] bg-[#ededed] text-[#787878] text-[18px] font-semibold cursor-pointer">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
