import { Boxes, Plus, Minus } from "lucide-react";

import { getProductImage } from "../utils/imageMapper";
import { useOrder } from "../context/OrderContext";

export default function ProductCard({ product, open }) {
  const image = getProductImage(product.Item_Code);

  const inStock = Number(product.Stock_Qty) > 0;

  const { orderItems, addToOrder, removeFromOrder, updateQty } = useOrder();

  const orderProduct = orderItems.find(
    (item) => item.Item_Code === product.Item_Code,
  );

  const availableBoxes = Math.max(
  0,
  Math.floor(
    Number(product.Stock_Qty) /
      Number(product.Item_Factor),
  ),
);
  

  const boxPrice = (product.Item_Rate * product.Item_Factor).toFixed(2);

  return (
    <div
      onClick={open}
      className="
      bg-white
      rounded-3xl
      overflow-hidden
      shadow-sm
      hover:shadow-xl
      transition-all
      duration-300
      border
      border-gray-100
      h-full
      flex
      flex-col
      group
      "
    >
      {/* IMAGE */}

      <div
        className="
        h-56
        bg-gray-50
        flex
        items-center
        justify-center
        p-5
        relative
        "
      >
        <img
  onClick={(e) => {
    e.stopPropagation();
    open();
  }}
  src={image}
  alt={product.Item_Name}
  className="
  h-full
  object-contain
  cursor-zoom-in
  group-hover:scale-110
  transition
  duration-500
  "
/>

        <span
          className={`
          absolute
          top-4
          right-4
          px-3
          py-1
          rounded-full
          text-xs
          font-semibold

          ${inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
          `}
        >
          {inStock ? "In Stock" : "Stock Out"}
        </span>
      </div>

      {/* DETAILS */}

      <div
        className="
        p-5
        flex
        flex-col
        flex-1
        "
      >
        <h2
          className="
          font-bold
          text-gray-800
          line-clamp-2
          h-12
          overflow-hidden
          "
        >
          {product.Item_Name}
        </h2>

        <div
          className="
  mt-4
  text-sm
  text-gray-600
  "
        >
          <div className="flex items-center gap-2">
            <Boxes size={16} />
            {availableBoxes} Cases Available
          </div>
        </div>

        {/* PRICE */}

        <div
  className="
  mt-5
  bg-red-50
  rounded-2xl
  p-3
  "
>
  <div
    className="
    flex
    items-center
    justify-between
    gap-2
    "
  >

    {/* CASE PRICE */}
    <div>
      <p
        className="
        text-[11px]
        text-gray-500
        "
      >
        Case Price
      </p>

      <p
        className="
        text-lg
        font-bold
        text-red-600
        "
      >
        ${boxPrice}
      </p>
    </div>


    {/* PACK */}
    <div
      className="
      text-center
      border-l
      border-r
      border-red-100
      px-3
      "
    >
      <p
        className="
        text-[11px]
        text-gray-500
        "
      >
        Pack
      </p>

      <p
        className="
        text-sm
        font-semibold
        text-gray-700
        "
      >
        {product.Item_Factor} pcs
      </p>
    </div>


    {/* UNIT PRICE */}
    <div
      className="
      text-right
      "
    >
      <p
        className="
        text-[11px]
        text-gray-500
        "
      >
        Unit Price
      </p>

      <p
        className="
        text-sm
        font-semibold
        text-gray-700
        "
      >
        ${product.Item_Rate.toFixed(2)}
        <span className="text-xs font-normal text-gray-400">
          {" "}/pc
        </span>
      </p>
    </div>

  </div>
</div>

        {/* ORDER AREA */}

        <div
          className="
          mt-5
          h-14
          "
        >
          {orderProduct ? (
            <div
              className="
              h-full
              flex
              items-center
              justify-between
              bg-gray-100
              rounded-2xl
              p-2
              "
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  if (orderProduct.qty === 1) {
                    removeFromOrder(product.Item_Code);
                  } else {
                    updateQty(product.Item_Code, -1);
                  }
                }}
                className="
                bg-white
                rounded-xl
                p-3
                hover:bg-gray-200
                transition
                "
              >
                <Minus size={18} />
              </button>

              <span
                className="
                text-xl
                font-bold
                "
              >
                {orderProduct.qty}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();

                  updateQty(product.Item_Code, 1);
                }}
                className="
                bg-red-600
                text-white
                rounded-xl
                p-3
                hover:bg-red-700
                transition
                "
              >
                <Plus size={18} />
              </button>
            </div>
          ) : (
            <button
              disabled={!inStock}
              onClick={(e) => {
                e.stopPropagation();

                addToOrder(product);
              }}
              className="
              w-full
              h-full
              bg-red-600
              disabled:bg-gray-300
              disabled:cursor-not-allowed
              text-white
              rounded-xl
              font-semibold
              hover:bg-red-700
              transition
              cursor-pointer
              "
            >
              {inStock ? "Add To Order" : "Out of Stock"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
