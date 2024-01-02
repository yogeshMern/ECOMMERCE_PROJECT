import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Item = (props) => {
  const navigate = useNavigate();

  const sendProduct = (product) => {
    navigate(`/products`, { state: { product } });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="w-[230px] hover:scale-[1.05] hover:duration-150"
      onClick={() => sendProduct(props)}
    >
      <img src={props.productImage} alt="product_image" />
      <p className="mt-[8px] text-[12px]">{props.productName}</p>
      <div className="flex gap-[20px]">
        <div className="text-[#374151] text-[12px] font-semibold">
          ${props.newPrice}
        </div>
        <div className="text-[#8c8c8c] text-[12px] font-semibold line-through">
          ${props.oldPrice}
        </div>
      </div>
    </div>
  );
};

export default Item;
