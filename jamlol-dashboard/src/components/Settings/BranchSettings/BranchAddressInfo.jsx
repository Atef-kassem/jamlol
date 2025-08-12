import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Building, Mail, Home } from 'lucide-react';
import { useAddress } from '@/contexts/AddressContext';

export function BranchAddressInfo({ formData, handleInputChange }) {
  const { countries, getRegionsByCountry, getCitiesByRegion, getNeighborhoodsByCity } = useAddress();
  const [availableRegions, setAvailableRegions] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [availableNeighborhoods, setAvailableNeighborhoods] = useState([]);

  // Update regions when country changes
  useEffect(() => {
    if (formData.countryId) {
      const regions = getRegionsByCountry(formData.countryId);
      setAvailableRegions(regions);
      // Reset region, city and neighborhood if country changed
      if (formData.regionId && !regions.find(r => r.id === parseInt(formData.regionId))) {
        handleInputChange("regionId", "");
        handleInputChange("cityId", "");
        handleInputChange("neighborhoodId", "");
        setAvailableCities([]);
        setAvailableNeighborhoods([]);
      }
    } else {
      setAvailableRegions([]);
      setAvailableCities([]);
      setAvailableNeighborhoods([]);
    }
  }, [formData.countryId]);

  // Update cities when region changes
  useEffect(() => {
    if (formData.regionId) {
      const cities = getCitiesByRegion(formData.regionId);
      setAvailableCities(cities);
      // Reset city and neighborhood if region changed
      if (formData.cityId && !cities.find(c => c.id === parseInt(formData.cityId))) {
        handleInputChange("cityId", "");
        handleInputChange("neighborhoodId", "");
        setAvailableNeighborhoods([]);
      }
    } else {
      setAvailableCities([]);
      setAvailableNeighborhoods([]);
    }
  }, [formData.regionId]);

  // Update neighborhoods when city changes
  useEffect(() => {
    if (formData.cityId) {
      const neighborhoods = getNeighborhoodsByCity(formData.cityId);
      setAvailableNeighborhoods(neighborhoods);
      // Reset neighborhood if city changed
      if (formData.neighborhoodId && !neighborhoods.find(n => n.id === parseInt(formData.neighborhoodId))) {
        handleInputChange("neighborhoodId", "");
      }
    } else {
      setAvailableNeighborhoods([]);
    }
  }, [formData.cityId]);

  const handleCountryChange = (value) => {
    handleInputChange("countryId", value);
    handleInputChange("regionId", "");
    handleInputChange("cityId", "");
    handleInputChange("neighborhoodId", "");
  };

  const handleRegionChange = (value) => {
    handleInputChange("regionId", value);
    handleInputChange("cityId", "");
    handleInputChange("neighborhoodId", "");
  };

  const handleCityChange = (value) => {
    handleInputChange("cityId", value);
    handleInputChange("neighborhoodId", "");
  };
  return (
    <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-success/5 border-l-4 border-l-success">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <MapPin className="w-4 h-4 text-success" />
          </div>
          العنوان
        </CardTitle>
        <CardDescription>موقع الفرع الجغرافي</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label htmlFor="country" className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-success" />
              الدولة *
            </Label>
            <Select 
              value={formData.countryId || ''} 
              onValueChange={handleCountryChange}
            >
              <SelectTrigger className="mt-2 focus:ring-2 focus:ring-success/20 transition-all duration-200">
                <SelectValue placeholder="اختر الدولة" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                {countries.map((country) => (
                  <SelectItem key={country.id} value={country.id.toString()}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="region" className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-secondary-blue" />
              المنطقة *
            </Label>
            <Select 
              value={formData.regionId || ''} 
              onValueChange={handleRegionChange}
              disabled={!formData.countryId}
            >
              <SelectTrigger className="mt-2 focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-200">
                <SelectValue placeholder="اختر المنطقة" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                {availableRegions.map((region) => (
                  <SelectItem key={region.id} value={region.id.toString()}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="city" className="flex items-center gap-2">
              <Building className="w-3 h-3 text-primary" />
              المدينة *
            </Label>
            <Select 
              value={formData.cityId || ''} 
              onValueChange={handleCityChange}
              disabled={!formData.regionId}
            >
              <SelectTrigger className="mt-2 focus:ring-2 focus:ring-primary/20 transition-all duration-200">
                <SelectValue placeholder="اختر المدينة" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                {availableCities.map((city) => (
                  <SelectItem key={city.id} value={city.id.toString()}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="neighborhood" className="flex items-center gap-2">
              <Home className="w-3 h-3 text-destructive" />
              الحي
            </Label>
            <Select 
              value={formData.neighborhoodId || ''} 
              onValueChange={(value) => handleInputChange("neighborhoodId", value)}
              disabled={!formData.cityId}
            >
              <SelectTrigger className="mt-2 focus:ring-2 focus:ring-destructive/20 transition-all duration-200">
                <SelectValue placeholder="اختر الحي" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                {availableNeighborhoods.map((neighborhood) => (
                  <SelectItem key={neighborhood.id} value={neighborhood.id.toString()}>
                    {neighborhood.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 mt-4">
          <div>
            <Label htmlFor="postalCode" className="flex items-center gap-2">
              <Mail className="w-3 h-3 text-warning" />
              الرمز البريدي
            </Label>
            <Input
              id="postalCode"
              value={formData.postalCode || ''}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
              placeholder="12345"
              className="focus:ring-2 focus:ring-warning/20 transition-all duration-200"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <Label htmlFor="street" className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-success" />
            الشارع *
          </Label>
          <Input
            id="street"
            value={formData.street || ''}
            onChange={(e) => handleInputChange("street", e.target.value)}
            placeholder="الشارع"
            className="focus:ring-2 focus:ring-success/20 transition-all duration-200"
          />
        </div>
      </CardContent>
    </Card>
  );
}