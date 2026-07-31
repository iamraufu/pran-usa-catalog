import { X, Boxes, Package, Plus, Minus } from "lucide-react";
import { getProductImage } from "../utils/imageMapper";
import { useOrder } from "../context/OrderContext";
import { useState } from "react";

export default function ProductModal({ product, close }) {
  const [showImage, setShowImage] = useState(false);

  const { orderItems, addToOrder, removeFromOrder, updateQty } = useOrder();

  if (!product) return null;

  const image = getProductImage(product.Item_Code);

  const orderProduct = orderItems.find(
    (item) => item.Item_Code === product.Item_Code,
  );

//   const boxPrice = product.Item_Rate * product.Item_Factor;

  const availableBoxes = Math.max(
  0,
  Math.floor(
    Number(product.Stock_Qty) /
      Number(product.Item_Factor),
  ),
);
  const inStock = Number(product.Stock_Qty) > 0;

  return (
    <div
      className="
fixed
inset-0
bg-black/60
backdrop-blur-sm
z-50
flex
items-center
justify-center
p-4
"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
bg-white
rounded-3xl
w-full
max-w-4xl
max-h-[90vh]
overflow-y-auto
shadow-2xl
"
      >
        {/* HEADER */}

        <div
          className="
flex
justify-between
items-center
p-5
border-b
"
        >
          <h2
            className="
font-bold
text-base
lg:text-xl
text-gray-800
line-clamp-1
"
          >
            {product.Item_Name}
          </h2>

          <button
            onClick={close}
            className="
w-10
h-10
rounded-full
bg-gray-100
hover:bg-red-100
transition
flex items-center justify-center
"
          >
            <X />
          </button>
        </div>

        <div
          className="
grid
grid-cols-1
md:grid-cols-2
gap-5
p-4
sm:p-6
"
        >
          {/* IMAGE */}

          <div
            className="
  bg-gray-50
  rounded-3xl
  flex
  items-center
  justify-center
  p-4
  h-52
  sm:h-64
  md:h-80
  "
          >
            <img
              src={image}
              alt={product.Item_Name}
              onClick={() => setShowImage(true)}
              className="
    max-h-full
    max-w-full
    object-contain
    cursor-zoom-in
    
    "
            />
          </div>

          {/* DETAILS */}

          <div>
            <div
              className="
mt-5
space-y-3
text-gray-600
"
            >
              <div className="flex gap-2 items-center">
                <Package size={18} />
                {availableBoxes} Cases Available
              </div>
            </div>

            {/* PRICE */}

            <div
              className="
  mt-6
  bg-red-50
  rounded-2xl
  p-4
  "
            >
              <div
                className="
    grid
    grid-cols-3
    gap-2
    text-center
    "
              >
                <div>
                  <p className="text-[11px] text-gray-500">Case Price</p>

                  <p
                    className="
        text-lg
        sm:text-2xl
        font-bold
        text-red-600
        "
                  >
                    $12.00
                  </p>
                </div>

                <div
                  className="
      border-x
      border-red-100
      px-2
      "
                >
                  <p className="text-[11px] text-gray-500">Pack</p>

                  <p className="font-semibold">6 pcs</p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-500">Unit Price</p>

                  <p className="font-semibold">$2.00</p>

                  <p className="text-[10px] text-gray-400">/ pc</p>
                </div>
              </div>
            </div>

            {/* ORDER */}

            <div className="mt-6">
              {orderProduct ? (
                <div
                  className="
flex
items-center
justify-between
bg-gray-100
rounded-2xl
p-3
"
                >
                  <button
                    onClick={() => {
                      if (orderProduct.qty === 1)
                        removeFromOrder(product.Item_Code);
                      else updateQty(product.Item_Code, -1);
                    }}
                    className="
bg-white
p-3
rounded-xl
"
                  >
                    <Minus />
                  </button>

                  <span
                    className="
text-2xl
font-bold
"
                  >
                    {orderProduct.qty}
                  </span>

                  <button
                    onClick={() => updateQty(product.Item_Code, 1)}
                    className="
bg-red-600
text-white
p-3
rounded-xl
"
                  >
                    <Plus />
                  </button>
                </div>
              ) : (
                <button
  disabled={!inStock}
  onClick={() => addToOrder(product)}
  className={`
    w-full
    py-4
    rounded-xl
    font-bold
    transition

    ${
      availableBoxes > 0
        ? "bg-red-600 hover:bg-red-700 text-white"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }
  `}
>
  {inStock > 0 ? "Add To Order" : "Out of Stock"}
</button>
              )}
            </div>
          </div>
        </div>
      </div>
      {showImage && (
        <div
          onClick={() => setShowImage(false)}
          className="
fixed
inset-0
bg-black/90
z-[60]
flex
items-center
justify-center
p-5
"
        >
          <button
            onClick={() => setShowImage(false)}
            className="
absolute
top-5
right-5
bg-white/20
text-white
rounded-full
w-12
h-12
flex
items-center
justify-center
hover:bg-white/30
transition
"
          >
            <X size={28} />
          </button>

          <img
            src={image}
            alt={product.Item_Name}
            onClick={(e) => e.stopPropagation()}
            className="
max-h-[85vh]
max-w-[95vw]
sm:max-h-[90vh]
object-contain
"
          />
        </div>
      )}
    </div>
  );
}
