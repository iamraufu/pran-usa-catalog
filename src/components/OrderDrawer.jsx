import {
  ShoppingCart,
  Plus,
  Minus,
  ChevronDown,
} from "lucide-react";

import { useState } from "react";

import { useOrder } from "../context/OrderContext";
import { getProductImage } from "../utils/imageMapper";

import OrderRequestModal from "./OrderRequestModal";

export default function OrderDrawer() {
  const [showRequest, setShowRequest] = useState(false);

  const [open, setOpen] = useState(false);

  const order = useOrder();

  if (!order) return null;

  const { orderItems, updateQty, removeFromOrder } = order;

  const total = orderItems.reduce(
    (sum, item) => sum + item.Item_Rate * item.Item_Factor * item.qty,
    0,
  );

  const totalCases = orderItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      {/* CART BUTTON */}

      <button
        onClick={() => setOpen(!open)}
        className="
        fixed
        bottom-5
        right-5
        z-50

        bg-red-600
        text-white

        rounded-full

        w-16
        h-16

        shadow-2xl

        flex
        items-center
        justify-center
        "
      >
        <ShoppingCart />

        {orderItems.length > 0 && (
          <span
            className="
            absolute
            -top-1
            -right-1

            bg-white
            text-red-600

            text-xs
            font-bold

            w-6
            h-6

            rounded-full

            flex
            items-center
            justify-center
            "
          >
            {orderItems.length}
          </span>
        )}
      </button>

      {/* DRAWER */}

      {open && (
        <div
          className="
          fixed
          inset-0
          bg-black/40
          z-40
          "
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
            fixed

            bottom-0
            left-0
            right-0

            md:left-auto
            md:right-5
            md:bottom-24

            bg-white

            rounded-t-3xl
            md:rounded-3xl

            shadow-2xl

            w-full
            md:w-[420px]

            max-h-[80vh]

            flex
            flex-col
            "
          >
            {/* HEADER */}

            <div
              className="
  p-5
  bg-gradient-to-r
  from-red-600
  to-red-700
  text-white

  flex
  items-center
  justify-between
  "
            >
              <div
                className="
    flex
    items-center
    gap-3
    "
              >
                <ShoppingCart className="text-white" />

                <div>
                  <h2
                    className="
        font-bold
        text-lg
        "
                  >
                    Order Summary ({orderItems.length})
                  </h2>

                  <p
                    className="
        text-xs
        text-red-100
        "
                  >
                    {totalCases} Cases Selected
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="
    bg-white/20
    hover:bg-white/30
    rounded-full
    p-2
    transition
    "
              >
                <ChevronDown size={18} />
              </button>
            </div>
            <div
              className="
  p-4
  border-b
  bg-white
  "
            >
              <div
                className="
    bg-red-50
    border
    border-red-100
    rounded-2xl
    p-4
    "
              >
                <div
                  className="
      grid
      grid-cols-3
      text-center
      "
                >
                  <div>
                    <p className="text-xs text-gray-500">Products</p>

                    <p className="font-bold">{orderItems.length}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Cases</p>

                    <p className="font-bold">{totalCases}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Total</p>

                    <p className="font-bold text-red-600">
                      ${total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ITEMS */}

            <div
              className="
              flex-1
              overflow-y-auto
              p-4
              "
            >
              {orderItems.length === 0 ? (
                <div
                  className="
  py-12
  text-center
  "
                >
                  <ShoppingCart
                    size={60}
                    className="
    mx-auto
    text-gray-300
    "
                  />

                  <h3
                    className="
    mt-4
    font-semibold
    "
                  >
                    Your order is empty
                  </h3>

                  <p
                    className="
    mt-1
    text-sm
    text-gray-500
    "
                  >
                    Add products to create an order request.
                  </p>
                </div>
              ) : (
                orderItems.map((item) => {
                  const image = getProductImage(item.Item_Code);

                  const casePrice = item.Item_Rate * item.Item_Factor;

                  const lineTotal = casePrice * item.qty;

                  return (
                    <div
                      key={item.Item_Code}
                      className="
                      bg-white
border
border-gray-100
shadow-sm
hover:shadow-md
transition
rounded-2xl
p-4
mb-4
                      "
                    >
                      <div
                        className="
                        flex
                        gap-3
                        "
                      >
                        <img
                          src={image}
                          alt=""
                          className="
                          w-16
                          h-16
                          rounded-xl
                          bg-white
                          object-contain
                          "
                        />

                        <div className="flex-1 min-w-0">
                          <div
                            className="
  flex
  items-start
  gap-2
  "
                          >
                            <p
                              className="
    flex-1
    font-semibold
    text-sm
    line-clamp-2
    "
                            >
                              {item.Item_Name}
                            </p>

                            <span
                              className="
    bg-red-100
    text-red-600
    text-xs
    font-bold
    px-2
    py-1
    rounded-full
    "
                            >
                              x{item.qty}
                            </span>
                          </div>

                          <p
                            className="
                            text-xs
                            text-gray-500
                            mt-1
                            "
                          >
                            {item.Item_Factor} pcs / case
                          </p>

                          <p
                            className="
                            text-xs
                            text-gray-500
                            "
                          >
                            ${casePrice.toFixed(2)} / case
                          </p>
                        </div>
                      </div>

                      <div
                        className="
                        flex
                        justify-between
                        items-center
                        mt-3
                        "
                      >
                        <div
                          className="
  flex
  items-center
  bg-gray-100
  rounded-2xl
  px-1
  "
                        >
                          <button
                            onClick={() => {
                              if (item.qty === 1) {
                                removeFromOrder(item.Item_Code);
                              } else {
                                updateQty(item.Item_Code, -1);
                              }
                            }}
                            className="
    p-3
    hover:bg-white
    rounded-xl
    transition
    "
                          >
                            <Minus size={16} />
                          </button>

                          <span
                            className="
    w-10
    text-center
    font-bold
    "
                          >
                            {item.qty}
                          </span>

                          <button
                            onClick={() => updateQty(item.Item_Code, 1)}
                            className="
    p-3
    text-red-600
    hover:bg-white
    rounded-xl
    transition
    "
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="text-right">
                          <p
                            className="
    text-xs
    text-gray-500
    "
                          >
                            {item.qty} × ${casePrice.toFixed(2)}
                          </p>

                          <p
                            className="
    font-bold
    text-red-600
    "
                          >
                            ${lineTotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* FOOTER */}

            {orderItems.length > 0 && (
              <div
                className="
  border-t
  bg-white
  p-4
  sticky
  bottom-0
  "
              >
                <button
                  onClick={() => setOpen(false)}
                  className="
    w-full
    py-3
    mb-3
    rounded-2xl
    border
    border-gray-300
    font-medium
    cursor-pointer
    "
                >
                  Continue Shopping
                </button>

                <div
                  className="
    bg-red-50
    rounded-2xl
    p-4
    mb-4
    "
                >
                  <div
                    className="
      flex
      justify-between
      items-center
      "
                  >
                    <span className="font-semibold">Grand Total</span>

                    <span
                      className="
        text-3xl
        font-bold
        text-red-600
        "
                    >
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowRequest(true)}
                  className="
    w-full
    bg-green-600
    hover:bg-green-700
    text-white
    py-4
    rounded-2xl
    font-bold
    transition
    "
                >
                  Send Order Request
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showRequest && <OrderRequestModal close={() => setShowRequest(false)} />}
    </>
  );
}
