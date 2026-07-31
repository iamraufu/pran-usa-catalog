import { useState } from "react";
import { MessageCircle, Save, X } from "lucide-react";

import { useSettings } from "../context/SettingsContext";

function formatPhone(value) {
  const numbers = value.replace(/\D/g, "").slice(0, 10);

  if (numbers.length <= 3) {
    return numbers;
  }

  if (numbers.length <= 6) {
    return "(" + numbers.slice(0, 3) + ") " + numbers.slice(3);
  }

  return (
    "(" +
    numbers.slice(0, 3) +
    ") " +
    numbers.slice(3, 6) +
    "-" +
    numbers.slice(6)
  );
}

export default function Settings({ close, showToast }) {
  const { settings, updateSettings } = useSettings();

  const [number, setNumber] = useState(formatPhone(settings.whatsappNumber));

  const [saved, setSaved] = useState(false);

  function save() {
    const cleanNumber = number.replace(/\D/g, "");

    updateSettings({
      whatsappNumber: cleanNumber,
    });

    setSaved(true);
    if (showToast) {
      showToast("Settings saved successfully");
    }

    if (close) {
      close();
    }

  }

  return (
    <div>
      {/* HEADER */}

      <div
        className="
        bg-gradient-to-r
        from-red-600
        to-red-700
        p-6
        text-white
        flex
        justify-between
        items-start
        "
      >
        <div>
          <h2
            className="
            text-2xl
            font-black
            "
          >
            Order Settings
          </h2>

          <p
            className="
            text-red-100
            mt-1
            "
          >
            Manage WhatsApp destination
          </p>
        </div>

        <button
          onClick={close}
          className="
          cursor-pointer
          bg-white/20
          hover:bg-white/30
          rounded-full
          p-2
          transition
          "
        >
          <X size={22} />
        </button>
      </div>

      {/* BODY */}

      <div
        className="
        p-6
        "
      >
        <label
          className="
          text-sm
          font-semibold
          text-gray-600
          "
        >
          WhatsApp Number
        </label>

        <div
          className="
          mt-3
          flex
          items-center
          gap-3
          border
          rounded-2xl
          px-4
          bg-gray-50
          "
        >
          <MessageCircle
            size={22}
            className="
            text-green-600
            "
          />

          <input
            className="
            w-full
            py-4
            bg-transparent
            outline-none
            text-lg
            "
            placeholder="
            (347) 573-4430
            "
            value={number}
            onChange={(e) => setNumber(formatPhone(e.target.value))}
          />
        </div>

        <p
          className="
          mt-3
          text-xs
          text-gray-500
          "
        >
          Enter a 10 digit US phone number
        </p>

        <button
          onClick={save}
          disabled={number.replace(/\D/g, "").length !== 10}
          className="
          mt-6
          w-full
          bg-red-600
          disabled:bg-gray-300
          text-white
          py-4
          rounded-2xl
          font-bold
          flex
          items-center
          justify-center
          gap-2
          hover:bg-red-700
          transition
          "
        >
          <Save size={20} />

          {saved ? "Saved ✓" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
