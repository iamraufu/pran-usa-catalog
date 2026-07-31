import { useState } from "react";
import { X } from "lucide-react";
import { useOrder } from "../context/OrderContext";
import { useSettings } from "../context/SettingsContext";

export default function OrderRequestModal({ close }) {
  const { orderItems, clearOrder } = useOrder();
  const { settings } = useSettings();

  const [customer, setCustomer] = useState({
    store: "",
    name: "",
    phone: "",
  });

  const totalCases = orderItems.reduce((sum, item) => sum + item.qty, 0);

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.Item_Rate * item.Item_Factor * item.qty,
    0,
  );

  function validateUSPhone(phone) {
    const digits = phone.replace(/\D/g, "");

    return (
      digits.length === 10 || (digits.length === 11 && digits.startsWith("1"))
    );
  }

  function sendWhatsApp() {
    if (!validateUSPhone(customer.phone)) {
      alert("Please enter a valid US phone number.\nExample: (347)-573 4430");

      return;
    }
    if (
      !customer.store.trim() ||
      !customer.name.trim() ||
      !customer.phone.trim()
    ) {
      alert("Please fill Store Name, Contact Person and Phone Number.");

      return;
    }

    let message = `PRAN Order Request

Store: *${customer.store}*

Contact: *${customer.name}*

Phone: *${customer.phone}*

Total Cases: *${totalCases}*

Total Amount: *$${totalAmount.toFixed(2)}*

Products:
`;

    orderItems.forEach((item) => {
      const casePrice = item.Item_Rate * item.Item_Factor;

      const lineTotal = casePrice * item.qty;

      message += `

${item.Item_Name}

Qty: ${item.qty} Cases

Case Price: $${casePrice.toFixed(2)}

Total: $${lineTotal.toFixed(2)}
`;
    });

    const whatsappNumber = settings.whatsappNumber;

    const url = `https://wa.me/1${whatsappNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(url, "_blank");

    clearOrder();

    close();
  }

  const isPhoneValid = customer.phone === "" || validateUSPhone(customer.phone);

  return (
    <div
      onClick={close}
      className="
      fixed
      inset-0
      bg-black/50
      backdrop-blur-sm
      flex
      items-center
      justify-center
      z-50
      p-4
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
        bg-white
        rounded-3xl
        w-full
        max-w-xl
        max-h-[90vh]
        flex
        flex-col
        overflow-hidden
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
            text-2xl
            font-bold
            "
          >
            Order Request
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
            flex
            items-center
            justify-center
            "
          >
            <X />
          </button>
        </div>

        {/* CONTENT */}

        <div
          className="
          flex-1
          overflow-y-auto
          p-5
          "
        >
          {/* SUMMARY */}

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
                  ${totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* CUSTOMER INFO */}

          <div
            className="
            mt-5
            space-y-4
            "
          >
            <input
              placeholder="Store Name *"
              value={customer.store}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  store: e.target.value,
                })
              }
              className="
              w-full
              border
              border-gray-200
              rounded-2xl
              p-4
              outline-none
              focus:border-red-500
              focus:ring-2
              focus:ring-red-100
              "
            />

            <input
              placeholder="Contact Person *"
              value={customer.name}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  name: e.target.value,
                })
              }
              className="
              w-full
              border
              border-gray-200
              rounded-2xl
              p-4
              outline-none
              focus:border-red-500
              focus:ring-2
              focus:ring-red-100
              "
            />

            <input
              placeholder="Phone Number *"
              value={customer.phone}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "").slice(0, 10);

                let formatted = digits;

                if (digits.length > 6) {
                  formatted = `(${digits.slice(0, 3)}) ${digits.slice(
                    3,
                    6,
                  )}-${digits.slice(6)}`;
                } else if (digits.length > 3) {
                  formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
                }

                setCustomer({
                  ...customer,
                  phone: formatted,
                });
              }}
              maxLength={14}
              className={`
w-full
border
rounded-2xl
p-4
outline-none

${
  isPhoneValid
    ? "border-gray-200 focus:border-red-500"
    : "border-red-500 bg-red-50"
}
`}
            />
            {customer.phone && !isPhoneValid && (
              <p className="mt-1 text-sm text-red-600">
                Please enter a valid US phone number.
              </p>
            )}
          </div>

          {/* ORDER PREVIEW */}

          <div className="mt-6">
            <h3
              className="
              font-bold
              mb-3
              "
            >
              Order Preview
            </h3>

            <div
              className="
              space-y-2
              "
            >
              {orderItems.map((item) => {
                const casePrice = item.Item_Rate * item.Item_Factor;

                const lineTotal = casePrice * item.qty;

                return (
                  <div
                    key={item.Item_Code}
                    className="
                      flex
                      justify-between
                      items-center
                      bg-gray-50
                      rounded-xl
                      p-3
                      "
                  >
                    <div>
                      <p
                        className="
                          font-medium
                          text-sm
                          "
                      >
                        {item.Item_Name}
                      </p>

                      <p
                        className="
                          text-xs
                          text-gray-500
                          "
                      >
                        {item.qty} Cases
                      </p>
                    </div>

                    <p
                      className="
                        font-bold
                        text-red-600
                        "
                    >
                      ${lineTotal.toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div
          className="
          border-t
          p-5
          "
        >
          <button
            onClick={sendWhatsApp}
            className="
            w-full
            bg-green-600
            hover:bg-green-700
            transition
            text-white
            py-4
            rounded-2xl
            font-bold
            text-lg
            "
          >
            Send via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
