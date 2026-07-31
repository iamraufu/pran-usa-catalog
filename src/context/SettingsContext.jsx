import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("pran_settings");

    return saved
      ? JSON.parse(saved)
      : {
          whatsappNumber: "3475734430",
        };
  });

  function updateSettings(newSettings) {
    const updated = {
      ...settings,

      ...newSettings,
    };

    setSettings(updated);

    localStorage.setItem("pran_settings", JSON.stringify(updated));
  }

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
