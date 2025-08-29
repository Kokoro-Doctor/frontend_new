
import React, { createContext, useContext, useState } from "react";

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  return (
    <RegistrationContext.Provider value={{ isRegistered, setIsRegistered }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => useContext(RegistrationContext);
