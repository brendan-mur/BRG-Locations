import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useLocations } from './hooks/UseLocations';
import { useStoreActions } from './hooks/UseStoreActions';
import { Store } from './types/Store';
import './styles/Admin.css';

function Admin() {
  const { locations, loading, error, fetchLocations } = useLocations();
  const { saveStore, deleteStore } = useStoreActions();
  const sortedLocations = [...locations].sort(
    (a, b) => parseInt(a.number) - parseInt(b.number)
  );
  const [selectedStore, setSelectedStore] = useState<string>('');
  const [formData, setFormData] = useState<Store | null>(null);
  const [originalData, setOriginalData] = useState<Store | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string[] }>(
    {}
  );

  // Load selected store data into form
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const storeNum = e.target.value;
    setSelectedStore(storeNum);
    const store = (sortedLocations as Store[]).find(
      (s) => s.number === storeNum
    );
    setFormData(store ? { ...store } : null);
    setOriginalData(store ? { ...store } : null);
  };

  // Handle form field changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (!prev) return prev;
      // Convert string to boolean for specific fields
      if (name === 'open' || name === 'construction') {
        return { ...prev, [name]: value === 'true' };
      }
      return { ...prev, [name]: value };
    });
  };

  // Before sending formData to the API
  const sanitizeFormData = (data: Store): Store => ({
    ...data,
    name: data.name.trim(),
    address: data.address.trim(),
    city: data.city.trim(),
    state: data.state.trim().toUpperCase(),
    zip: data.zip.trim(),
    phone: data.phone ? data.phone.trim() : '',
  });

  // Handle update (save changes)
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    const sanitized = sanitizeFormData(formData);
    setFieldErrors({}); // Clear previous errors
    try {
      await saveStore(sanitized, !!originalData);
      alert(originalData ? 'Store updated!' : 'Store created!');
      fetchLocations();
    } catch (err: any) {
      if (err.response && err.response.status === 422) {
        setFieldErrors(err.response.data.errors);
      } else {
        alert('Error saving store.');
        console.error(err);
      }
    }
  };

  // Handle cancel (reset form to original data)
  const handleCancel = (e: FormEvent) => {
    e.preventDefault();
    setFormData(originalData ? { ...originalData } : null);
  };

  // Handle delete (reset form to original data)
  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    try {
      await deleteStore(formData.number);
      alert('Store deleted!');
      fetchLocations(); // Refresh the data
      setFormData(null);
      setOriginalData(null);
      setSelectedStore('');
    } catch (err) {
      alert('Error deleting store.');
      console.error(err);
    }
  };

  // Handle adding a new store
  const handleAddNew = () => {
    setSelectedStore('');
    setFormData({
      number: '',
      name: '',
      phone: '',
      latitude: '',
      longitude: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      construction: true,
      open: false,
    });
    setOriginalData(null);
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading locations.</div>;
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
          {(sortedLocations as Store[]).map((store) => (
            <option key={store.number} value={store.number}>
              {store.number} - {store.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleAddNew}>
          Add New Store
        </button>
      </div>
      <div className="admin-form-container">
        {formData && (
          <form className="edit-store-form" style={{ marginTop: '2rem' }}>
            <div className="admin-form-row">
              <label>Store Number:</label>
              {originalData ? (
                <span className="store-fields">
                  {formData.number}
                  <button type="button" onClick={handleDelete}>
                    Delete Store
                  </button>
                </span>
              ) : (
                <input
                  className="store-fields"
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                />
              )}
            </div>
            <div className="admin-form-row">
              <label>Store Name:</label>
              <input
                className={`store-fields${fieldErrors.name ? ' error' : ''}`}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {fieldErrors.name && (
                <div className="field-error">{fieldErrors.name[0]}</div>
              )}
            </div>
            <div className="admin-form-row">
              <label>Address:</label>
              <input
                className="store-fields"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="admin-form-row">
              <label>City:</label>
              <input
                className="store-fields"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="admin-form-row">
              <label>State:</label>
              <input
                className="store-fields"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="admin-form-row">
              <label>Zip:</label>
              <input
                className="store-fields"
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>
            <div className="admin-form-row">
              <label>Phone:</label>
              <input
                className="store-fields"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="admin-form-row">
              <label>
                GPS Latitude:
                <a
                  href="https://www.gps-coordinates.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Find GPS Coordinates"
                  style={{ textDecoration: 'none', marginLeft: '5px' }}
                >
                  ℹ️
                </a>
              </label>
              <input
                className="store-fields"
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
              />
            </div>
            <div className="admin-form-row">
              <label>
                GPS Longitude:
                <a
                  href="https://www.gps-coordinates.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Find GPS Coordinates"
                  style={{ textDecoration: 'none', marginLeft: '5px' }}
                >
                  ℹ️
                </a>
              </label>
              <input
                className="store-fields"
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
              />
            </div>
            <div className="admin-form-row">
              <label>Store Open:</label>
              <select
                className="store-fields"
                name="open"
                value={formData.open ? 'true' : 'false'}
                onChange={handleChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="admin-form-row">
              <label>Under Construction:</label>
              <select
                className="store-fields"
                name="construction"
                value={formData.construction ? 'true' : 'false'}
                onChange={handleChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="action-buttons">
              <button type="submit" onClick={handleUpdate}>
                Update
              </button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Admin;
