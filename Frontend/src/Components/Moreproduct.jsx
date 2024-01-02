import Item from "./Item";
import { BASE_URL } from "../../env";
import Axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";

const Moreproduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${BASE_URL}/more-products`)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("More Products", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center gap-[10px] mb-[100px]">
      <h1 className="text-[#171717] text-[40px] font-semibold mt-[30px]">
        MORE PRODUCTS
      </h1>
      <hr className="w-[200px] h-[6px] border rounded-[6px] bg-[#252525]" />

      <div className="mt-[50px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-[55px]">
        {loading ? (
          <div className="flex justify-center items-center w-full col-span-4">
            <Loader />
          </div>
        ) : (
          data.map((ele, ind) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default Moreproduct;
