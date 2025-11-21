import React, { useRef, useEffect } from 'react';
import { mapSelector } from '../utils/MapSelector';
import { showPhone } from '../utils/ShowPhone';
import { showStoreIcon } from '../utils/ShowStoreIcon';

type StoreCardProps = {
  storeNumber: string;
  storeName: string;
  storePhone: string;
  storeAddress: string;
  storeCity: string;
  storeState: string;
  storeZip: string;
  storeGPSLat: string;
  storeGPSLong: string;
  storeStatus: 'Open' | 'Closed' | 'Construction';
  isActive: boolean;
};

function LocationCard({
  storeNumber,
  storeName,
  storePhone,
  storeAddress,
  storeCity,
  storeState,
  storeZip,
  storeGPSLat,
  storeGPSLong,
  storeStatus,
  isActive,
}: StoreCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && containerRef.current) {
      containerRef.current.focus();
    }
  }, [isActive]);

  const storeActiveClass: string =
    storeStatus === 'Closed' ? 'store-closed' : '';
  return (
    <div
      id={storeNumber}
      ref={containerRef}
      className={`store-container ${storeActiveClass}`}
      tabIndex={-1} // Make div focusable
    >
      <div className="store-identification">
        {showStoreIcon(storeStatus)}
        <div className="store-number">{storeNumber}</div>
        <div className="store-name">{storeName}</div>
      </div>
      <div className="store-data">
        <div className="is-text-centered data-cell">
          <div>{showPhone(storePhone)}</div>
        </div>
        <div className="is-text-centered data-cell">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              mapSelector(storeGPSLat, storeGPSLong, storeNumber);
            }}
          >
            {storeAddress}
            <br />
            {storeCity}, {storeState} {storeZip}
          </a>
        </div>
      </div>
    </div>
  );
}

export default LocationCard;
