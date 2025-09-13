import React, { useState } from 'react';
import locations from './data/locations.json';
import './styles/Admin.css';

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

  // Handle cancel (reset form to original data)
  const handleDelete = (e) => {
    e.preventDefault();
    setFormData(originalData ? { ...originalData } : null);
  };

  return (
    <div className="admin-page">
      <div className="store-select-container is-mobile-centered">
        <select
          title="Select Store"
          className="store-select" 
          value={selectedStore}
          onChange={handleSelect}
        >
          <option value="">-- Select a Store to Edit --</option>
          {locations.map(store => (
            <option key={store.storeNumber} value={store.storeNumber}>
              {store.storeNumber} - {store.storeName}
            </option>
          ))}
        </select>
      </div>
      {formData && (
        <form className="edit-store-form" style={{ marginTop: '2rem' }}>
          <div className="form-row">
            <label>Store Number:</label>
            <span>{formData.storeNumber}</span>
          </div>
          <div className="form-row">
            <label>Store Name:</label>
            <input className="store-fields" type="text" name="storeName" value={formData.storeName} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Address:</label>
            <input className="store-fields" type="text" name="storeAddressRoad" value={formData.storeAddressRoad} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>City, State Zip:</label>
            <input className="store-fields" type="text" name="storeAddressCityStateZip" value={formData.storeAddressCityStateZip} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Phone:</label>
            <input className="store-fields" type="text" name="storePhone" value={formData.storePhone} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>GPS Latitude:</label>
            <input className="store-fields" type="text" name="storeGPSLat" value={formData.storeGPSLat} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>GPS Longitude:</label>
            <input className="store-fields" type="text" name="storeGPSLong" value={formData.storeGPSLong} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Store Open:</label>
            <select className="store-fields" name="storeOpen" value={formData.storeOpen} onChange={handleChange}>
              <option value="Y">Y</option>
              <option value="N">N</option>
            </select>
          </div>
          <div className="form-row">
            <label>Under Construction:</label>
            <select className="store-fields" name="storeConstruction" value={formData.storeConstruction} onChange={handleChange}>
              <option value="Y">Y</option>
              <option value="N">N</option>
            </select>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button type="submit" onClick={handleUpdate}>Update</button>
            <button type="button" onClick={handleCancel} style={{ marginLeft: '1rem' }}>Cancel</button>
            <button type="button" onClick={handleDelete} style={{ float: 'right' }}>Delete Store</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Admin;