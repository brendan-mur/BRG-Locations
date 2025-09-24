import React from 'react';
import StoreCard from './StoreCard';
import { useLocations } from '../hooks/UseLocations';
import '../styles/StoreList.css';

function StoreList() {
  const { locations, loading, error } = useLocations();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading locations.</div>;

  const sortedLocations = [...locations].sort(
    (a, b) => parseInt(a.number) - parseInt(b.number)
  );

  return (
    <div className="store-list" style={{ maxWidth: '800px' }}>
      {sortedLocations.map((loc, index) => (
        <StoreCard
          key={index}
          storeNumber={loc.number}
          storeName={loc.name}
          storePhone={loc.phone}
          storeAddress={loc.address}
          storeCity={loc.city}
          storeState={loc.state}
          storeZip={loc.zip}
          storeGPSLat={loc.latitude}
          storeGPSLong={loc.longitude}
          storeConstruction={loc.construction}
          storeOpen={loc.open}
          isActive={false}
        />
      ))}
    </div>
  );
}

export default StoreList;
