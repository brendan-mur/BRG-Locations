import React from 'react';
import StoreCard from './StoreCard';
import locations from '../data/locations.json';

function LocationList() {
  const sortedLocations = [...locations].sort((a, b) => parseInt(a.storeNumber) - parseInt(b.storeNumber));

  return (
    <div className="store-list">
      {sortedLocations.map((loc, index) => (
        <StoreCard
          key={index}
          storeNumber={loc.storeNumber}
          storeName={loc.storeName}
          storePhone={loc.storePhone}
          storeAddressRoad={loc.storeAddressRoad}
          storeAddressCityStateZip={loc.storeAddressCityStateZip}
          storeGPSLat={loc.storeGPSLat}
          storeGPSLong={loc.storeGPSLong}
          storeConstruction={loc.storeConstruction}
          storeOpen={loc.storeOpen}
        />
      ))}
    </div>
  );
}

export default LocationList;