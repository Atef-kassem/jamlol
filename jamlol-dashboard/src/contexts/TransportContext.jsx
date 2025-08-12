import React, { createContext, useContext, useState } from "react";

const TransportContext = createContext();

export const useTransport = () => {
  const context = useContext(TransportContext);
  if (!context) {
    throw new Error("useTransport must be used within a TransportProvider");
  }
  return context;
};

export const TransportProvider = ({ children }) => {
  const [transportMethods, setTransportMethods] = useState([
    { id: 1, name: "شاحنة صغيرة", capacity: "1-3 طن", status: "نشط" },
    { id: 2, name: "شاحنة متوسطة", capacity: "3-8 طن", status: "نشط" },
    { id: 3, name: "شاحنة كبيرة", capacity: "8-15 طن", status: "نشط" },
    { id: 4, name: "مقطورة", capacity: "15+ طن", status: "نشط" },
    { id: 5, name: "دراجة نارية", capacity: "حتى 50 كجم", status: "غير نشط" },
    { id: 6, name: "شاحنة مبردة", capacity: "5-12 طن", status: "نشط" },
    { id: 7, name: "شاحنة صهريج", capacity: "10-20 طن", status: "نشط" },
    { id: 8, name: "ناقلة سيارات", capacity: "8-12 سيارة", status: "نشط" },
  ]);

  const addTransportMethod = (method) => {
    const newMethod = {
      id: Date.now(),
      ...method,
      status: "نشط"
    };
    setTransportMethods(prev => [...prev, newMethod]);
    return newMethod;
  };

  const deleteTransportMethod = (id) => {
    setTransportMethods(prev => prev.filter(method => method.id !== id));
  };

  const updateTransportMethod = (id, updates) => {
    setTransportMethods(prev => 
      prev.map(method => 
        method.id === id ? { ...method, ...updates } : method
      )
    );
  };

  const getActiveTransportMethods = () => {
    return transportMethods.filter(method => method.status === "نشط");
  };

  const getTransportMethodById = (id) => {
    return transportMethods.find(method => method.id === parseInt(id));
  };

  const value = {
    transportMethods,
    addTransportMethod,
    deleteTransportMethod,
    updateTransportMethod,
    getActiveTransportMethods,
    getTransportMethodById,
  };

  return (
    <TransportContext.Provider value={value}>
      {children}
    </TransportContext.Provider>
  );
};