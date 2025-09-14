import React, { useState, ChangeEvent, FormEvent } from 'react';
import locations from './data/locations.json';
import './styles/Admin.css';

type Store = {
  storeNumber: string;
  storeName: string;
  storePhone: string;
  storeAddressRoad: string;
  storeAddressCityStateZip: string;
  storeGPSLat: string;
  storeGPSLong: string;
  storeConstruction: string;
  storeOpen: string;
};

function Admin() {
  const [selectedStore, setSelectedStore] = useState<string>('');
  const [formData, setFormData] = useState<Store | null>(null);
  const [originalData, setOriginalData] = useState<Store | null>(null);

  // Load selected store data into form
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const storeNum = e.target.value;
    setSelectedStore(storeNum);
    const store = (locations as Store[]).find(s => s.storeNumber === storeNum);
    setFormData(store ? { ...store } : null);
    setOriginalData(store ? { ...store } : null);
  };

  // Handle form field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : prev);
  };

  // Handle update (save changes)
  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    // Implement save logic here (e.g., API call or file write)
    alert('Store updated!');
  };

  // Handle cancel (reset form to original data)
  const handleCancel = (e: FormEvent) => {
    e.preventDefault();
    setFormData(originalData ? { ...originalData } : null);
  };

  // Handle delete (reset form to original data)
  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    setFormData(originalData ? { ...originalData } : null);
  };

  // Handle adding a new store
  const handleAddNew = () => {
    setSelectedStore('');
    setFormData({
      storeNumber: '',
      storeName: '',
      storePhone: '',
      storeAddressRoad: '',
      storeAddressCityStateZip: '',
      storeGPSLat: '',
      storeGPSLong: '',
      storeConstruction: 'Y',
      storeOpen: 'N',
    });
    setOriginalData(null);
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
          {(locations as Store[]).map(store => (
            <option key={store.storeNumber} value={store.storeNumber}>
              {store.storeNumber} - {store.storeName}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleAddNew}>Add New Store</button>
      </div>
      {formData && (
        <form className="edit-store-form" style={{ marginTop: '2rem' }}>
          <div className="form-row">
            <label>Store Number:</label>
            {originalData ? (
              <span className="store-fields">
                {formData.storeNumber}
                <button type="button" onClick={handleDelete}>Delete Store</button>
              </span>
            ) : (
              <input
                className="store-fields"
                type="text"
                name="storeNumber"
                value={formData.storeNumber}
                onChange={handleChange}
              />
            )}
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
          <div className="action-buttons">
            <button type="submit" onClick={handleUpdate}>Update</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Admin;