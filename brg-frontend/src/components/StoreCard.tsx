import React, { useRef, useEffect } from "react";
import { mapSelector } from "../utils/MapSelector.tsx";
import { underConstruction } from "../utils/Construction.tsx";
import { showPhone } from "../utils/ShowPhone.tsx";

function LocationCard({
  storeNumber,
  storeName,
  storePhone,
  storeAddressRoad,
  storeAddressCityStateZip,
  storeGPSLat,
  storeGPSLong,
  storeConstruction,
  storeOpen,
  isActive,
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && containerRef.current) {
      containerRef.current.focus();
    }
  }, [isActive]);

  const storeActive =
    storeOpen == "N" && storeConstruction == "N" ? "store-closed" : "";
  return (
    <div
      id={storeNumber}
      ref={containerRef}
      className={`store-container ${storeActive}`}
      tabIndex={-1} // Make div focusable
    >
      <div className="store-identification">
        {underConstruction(storeConstruction)}
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
            {storeAddressRoad}
            <br />
            {storeAddressCityStateZip}
          </a>
        </div>
      </div>
    </div>
  );
}

export default LocationCard;
