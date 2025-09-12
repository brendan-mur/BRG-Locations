import React, { useState } from 'react';
import locations from './data/locations.json';

function Admin() {
  const [selectedStore, setSelectedStore] = useState('');
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  // Load selected store data into form
  const handleSelect = (e) => {
    const storeNum = e.target.value;
    setSelectedStore(storeNum);
    const store = locations.find(s => s.storeNumber === storeNum);
    setFormData(store ? { ...store } : null);
    setOriginalData(store ? { ...store } : null);
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle update (save changes)
  const handleUpdate = (e) => {
    e.preventDefault();
    // Implement save logic here (e.g., API call or file write)
    alert('Store updated!');
  };

  // Handle cancel (reset form to original data)
  const handleCancel = (e) => {
    e.preventDefault();
    setFormData(originalData ? { ...originalData } : null);
  };

  return (
    <div className="admin-page">
      <h3>Select a Store to edit</h3>
      <select
        value={selectedStore}
        onChange={handleSelect}
      >
        <option value="">-- Select Store --</option>
        {locations.map(store => (
          <option key={store.storeNumber} value={store.storeNumber}>
            {store.storeNumber} - {store.storeName}
          </option>
        ))}
      </select>

      {formData && (
        <form className="edit-store-form" style={{ marginTop: '2rem' }}>
          <label>
            Store Number: {formData.storeNumber}
          </label>
          <label>
            Store Name:
            <input
              className="store-fields"
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
            />
          </label>
          <label>
            Address:
            <input
              className="store-fields"
              type="text"
              name="storeAddressRoad"
              value={formData.storeAddressRoad}
              onChange={handleChange}
            />
          </label>
          <label>
            City, State Zip:
            <input
              className="store-fields"
              type="text"
              name="storeAddressCityStateZip"
              value={formData.storeAddressCityStateZip}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone:
            <input
              className="store-fields"
              type="text"
              name="storePhone"
              value={formData.storePhone}
              onChange={handleChange}
            />
          </label>
          <label>
            GPS Latitude:
            <input
              className="store-fields"
              type="text"
              name="storeGPSLat"
              value={formData.storeGPSLat}
              onChange={handleChange}
            />
          </label>
          <label>
            GPS Longitude:
            <input
              className="store-fields"
              type="text"
              name="storeGPSLong"
              value={formData.storeGPSLong}
              onChange={handleChange}
            />
          </label>
          <label>
            Store Open (Y/N):
            <input
              className="store-fields"
              type="text"
              name="storeOpen"
              value={formData.storeOpen}
              onChange={handleChange}
            />
          </label>
          <label>
            Under Construction (Y/N):
            <input
              className="store-fields"
              type="text"
              name="storeConstruction"
              value={formData.storeConstruction}
              onChange={handleChange}
            />
          </label>
          <div style={{ marginTop: '1rem' }}>
            <button type="submit" onClick={handleUpdate}>Update</button>
            <button type="button" onClick={handleCancel} style={{ marginLeft: '1rem' }}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Admin;