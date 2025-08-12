import React, { createContext, useContext, useState } from 'react';

const AddressContext = createContext();

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};

export const AddressProvider = ({ children }) => {
  const [countries, setCountries] = useState([
    { id: 1, name: "السعودية", nameEn: "Saudi Arabia" },
    { id: 2, name: "الإمارات", nameEn: "UAE" },
    { id: 3, name: "مصر", nameEn: "Egypt" },
    { id: 4, name: "الكويت", nameEn: "Kuwait" },
  ]);
  
  const [regions, setRegions] = useState([
    { id: 1, name: "المنطقة الشرقية", nameEn: "Eastern Region", countryId: 1 },
    { id: 2, name: "المنطقة الغربية", nameEn: "Western Region", countryId: 1 },
    { id: 3, name: "المنطقة الوسطى", nameEn: "Central Region", countryId: 1 },
    { id: 4, name: "منطقة دبي", nameEn: "Dubai Region", countryId: 2 },
    { id: 5, name: "منطقة أبوظبي", nameEn: "Abu Dhabi Region", countryId: 2 },
    { id: 6, name: "منطقة القاهرة الكبرى", nameEn: "Greater Cairo Region", countryId: 3 },
    { id: 7, name: "منطقة الكويت", nameEn: "Kuwait Region", countryId: 4 },
  ]);
  
  const [cities, setCities] = useState([
    { id: 1, name: "الرياض", nameEn: "Riyadh", regionId: 3 },
    { id: 2, name: "جدة", nameEn: "Jeddah", regionId: 2 },
    { id: 3, name: "الدمام", nameEn: "Dammam", regionId: 1 },
    { id: 4, name: "دبي", nameEn: "Dubai", regionId: 4 },
    { id: 5, name: "أبوظبي", nameEn: "Abu Dhabi", regionId: 5 },
    { id: 6, name: "القاهرة", nameEn: "Cairo", regionId: 6 },
    { id: 7, name: "الكويت", nameEn: "Kuwait City", regionId: 7 },
  ]);

  const [neighborhoods, setNeighborhoods] = useState([
    { id: 1, name: "حي الدبلوماسيين", nameEn: "Diplomatic Quarter", cityId: 1 },
    { id: 2, name: "حي الورود", nameEn: "Al Wurud", cityId: 1 },
    { id: 3, name: "حي النهضة", nameEn: "Al Nahda", cityId: 2 },
    { id: 4, name: "حي الروابي", nameEn: "Al Rawabi", cityId: 2 },
  ]);

  const addCountry = (country) => {
    const newId = Math.max(...countries.map(c => c.id), 0) + 1;
    setCountries(prev => [...prev, { ...country, id: newId }]);
  };

  const deleteCountry = (id) => {
    setCountries(countries.filter(c => c.id !== id));
    setRegions(regions.filter(r => r.countryId !== id));
    setCities(cities.filter(c => !regions.find(r => r.id === c.regionId && r.countryId === id)));
    setNeighborhoods(neighborhoods.filter(n => !cities.find(c => c.id === n.cityId && regions.find(r => r.id === c.regionId && r.countryId === id))));
  };

  const addRegion = (region) => {
    const newId = Math.max(...regions.map(r => r.id), 0) + 1;
    setRegions(prev => [...prev, { ...region, id: newId }]);
  };

  const deleteRegion = (id) => {
    setRegions(regions.filter(r => r.id !== id));
    setCities(cities.filter(c => c.regionId !== id));
    setNeighborhoods(neighborhoods.filter(n => !cities.find(c => c.id === n.cityId && c.regionId === id)));
  };

  const addCity = (city) => {
    const newId = Math.max(...cities.map(c => c.id), 0) + 1;
    setCities(prev => [...prev, { ...city, id: newId }]);
  };

  const deleteCity = (id) => {
    setCities(cities.filter(c => c.id !== id));
    setNeighborhoods(neighborhoods.filter(n => n.cityId !== id));
  };

  const addNeighborhood = (neighborhood) => {
    const newId = Math.max(...neighborhoods.map(n => n.id), 0) + 1;
    setNeighborhoods(prev => [...prev, { ...neighborhood, id: newId }]);
  };

  const deleteNeighborhood = (id) => {
    setNeighborhoods(neighborhoods.filter(n => n.id !== id));
  };

  const getRegionsByCountry = (countryId) => {
    return regions.filter(region => region.countryId === parseInt(countryId));
  };

  const getCitiesByRegion = (regionId) => {
    return cities.filter(city => city.regionId === parseInt(regionId));
  };

  const getNeighborhoodsByCity = (cityId) => {
    return neighborhoods.filter(neighborhood => neighborhood.cityId === parseInt(cityId));
  };

  const value = {
    countries,
    regions,
    cities,
    neighborhoods,
    addCountry,
    deleteCountry,
    addRegion,
    deleteRegion,
    addCity,
    deleteCity,
    addNeighborhood,
    deleteNeighborhood,
    getRegionsByCountry,
    getCitiesByRegion,
    getNeighborhoodsByCity,
    setCountries,
    setRegions,
    setCities,
    setNeighborhoods
  };

  return (
    <AddressContext.Provider value={value}>
      {children}
    </AddressContext.Provider>
  );
};