import React, { createContext, useState, useContext } from 'react';
import PaddyModernLoader from '../components/sadapoorna/PaddyModernLoader'; // Adjust path

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ setLoading }}>
      {children}
      <PaddyModernLoader visible={loading} />
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);