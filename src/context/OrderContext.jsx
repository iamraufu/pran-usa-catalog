import { createContext, useContext, useState } from "react";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [orderItems, setOrderItems] = useState([]);

  // Add product to order
  function addToOrder(product) {
    const stock = Number(product?.Stock_Qty);

    if (stock <= 0) {
      return;
    }

    const existingProduct = orderItems.find(
      (item) => item.Item_Code === product.Item_Code,
    );

    if (existingProduct) {
      setOrderItems(
        orderItems.map((item) =>
          item.Item_Code === product.Item_Code
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item,
        ),
      );
    } else {
      setOrderItems([
        ...orderItems,
        {
          ...product,
          qty: 1,
        },
      ]);
    }
  }

  // Remove complete product
  function removeFromOrder(code) {
    setOrderItems(orderItems.filter((item) => item.Item_Code !== code));
  }

  // Increase/decrease quantity
  function updateQty(code, value) {
    setOrderItems(
      orderItems.map((item) =>
        item.Item_Code === code
          ? {
              ...item,
              qty: Math.max(1, item.qty + value),
            }
          : item,
      ),
    );
  }

  // Empty order after sending
  function clearOrder() {
    console.log("first")
    setOrderItems([]);
  }

  // Total carton amount
  function getTotalAmount() {
    return orderItems.reduce(
      (total, item) => total + item.Item_Rate * item.Item_Factor * item.qty,

      0,
    );
  }

  return (
    <OrderContext.Provider
      value={{
        orderItems,

        addToOrder,

        removeFromOrder,

        updateQty,

        clearOrder,

        getTotalAmount,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}
