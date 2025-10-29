import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useLocations } from './hooks/UseLocations';
import { useStoreActions } from './hooks/UseStoreActions';
import { useAuth } from './context/AuthContext';
import { Store } from './types/Store';
import './styles/Admin.css';

function Admin() {
  const { logout } = useAuth();
  // --- Hooks and State ---
  const {
    locations,
    loading,
    error: fetchError,
    fetchLocations,
  } = useLocations();
  const { saveStore, deleteStore } = useStoreActions();

  const sortedLocations = [...locations].sort(
    (a, b) => parseInt(a.number) - parseInt(b.number)
  );

  const [selectedStore, setSelectedStore] = useState<string>('');
  const [formData, setFormData] = useState<Partial<Store>>({});
  const [isFormVisible, setIsFormVisible] = useState(false);

  // State for user feedback
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Effect to clear messages after 5 seconds
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  // --- Event Handlers ---

  // When a store is selected from the dropdown
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const storeNumber = e.target.value;
    setSelectedStore(storeNumber);
    if (storeNumber) {
      const store = locations.find((loc) => loc.number === storeNumber);
      setFormData(store || {});
      setIsFormVisible(true);
    } else {
      setIsFormVisible(false);
      setFormData({});
    }
  };

  // When "Add New Store" is clicked
  const handleAddNew = () => {
    setSelectedStore('');
    setFormData({
      number: '',
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      latitude: '',
      longitude: '',
      open: false,
      construction: true,
    });
    setIsFormVisible(true);
  };

  // When form fields are changed
  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Handle boolean values from select dropdowns
    const finalValue =
      name === 'open' || name === 'construction' ? value === 'true' : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const isUpdate = !!selectedStore;
      await saveStore(formData as Store, isUpdate);
      setSuccessMessage(
        `Store ${formData.number} has been saved successfully!`
      );
      fetchLocations();
      setIsFormVisible(false);
      setSelectedStore('');
      setFormData({});
    } catch (err: any) {
      if (err.response?.data?.message) {
        setErrorMessage(`Error: ${err.response.data.message}`);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleDelete = async () => {
    if (!selectedStore) return;
    if (
      !window.confirm(
        `Are you sure you want to delete store #${selectedStore}?`
      )
    )
      return;

    try {
      await deleteStore(selectedStore);
      setSuccessMessage(`Store #${selectedStore} deleted successfully.`);
      fetchLocations();
      setIsFormVisible(false);
      setSelectedStore('');
      setFormData({});
    } catch (err) {
      setErrorMessage('Failed to delete the store.');
    }
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setSelectedStore('');
    setFormData({});
  };

  if (loading) return <div>Loading...</div>;
  if (fetchError)
    return <div className="feedback error">Error loading locations.</div>;

  return (
    <div className="admin-page">
      <button onClick={logout} className="btn-logout">
        Logout
      </button>
      <h3>Manage Locations</h3>

      {/* --- Feedback Display Area --- */}
      {successMessage && (
        <div className="feedback success" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="feedback error" role="alert">
          {errorMessage}
        </div>
      )}
      {fetchError && (
        <div className="feedback error" role="alert">
          Error loading locations.
        </div>
      )}

      <div className="stores-select-container is-mobile-centered">
        <select
          title="Select Store"
          className="stores-select"
          value={selectedStore}
          onChange={handleSelect}
        >
          <option value="">-- Select a Store to Edit --</option>
          {sortedLocations.map((store) => (
            <option key={store.number} value={store.number}>
              {store.number} - {store.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleAddNew} className="btn-add-new">
          Add New Store
        </button>
      </div>

      {isFormVisible && (
        <div className="admin-form-container">
          <form
            onSubmit={handleSave}
            className="admin-form"
            style={{ marginTop: '2rem' }}
          >
            <div className="admin-form-row">
              <label htmlFor="storeNumber">Store Number:</label>
              {selectedStore ? (
                <div className="store-number-display">
                  <span>{formData.number}</span>
                </div>
              ) : (
                <input
                  id="storeNumber"
                  className="store-fields"
                  type="text"
                  name="number"
                  value={formData.number || ''}
                  onChange={handleFormChange}
                  required
                />
              )}
            </div>
            <div className="admin-form-row">
              <label htmlFor="storeName">Store Name:</label>
              <input
                id="storeName"
                className="store-fields"
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="admin-form-row">
              <label htmlFor="storeAddress">Address:</label>
              <input
                id="storeAddress"
                className="store-fields"
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleFormChange}
              />
            </div>
            <div className="admin-form-row">
              <label htmlFor="storeCity">City:</label>
              <input
                id="storeCity"
                className="store-fields"
                type="text"
                name="city"
                value={formData.city || ''}
                onChange={handleFormChange}
              />
            </div>
            <div className="admin-form-row">
              <label htmlFor="storeState">State:</label>
              <input
                id="storeState"
                className="store-fields"
                type="text"
                name="state"
                value={formData.state || ''}
                onChange={handleFormChange}
              />
            </div>
            <div className="admin-form-row">
              <label htmlFor="storeZip">Zip:</label>
              <input
                id="storeZip"
                className="store-fields"
                type="text"
                name="zip"
                value={formData.zip || ''}
                onChange={handleFormChange}
              />
            </div>
            <div className="admin-form-row">
              <label htmlFor="storePhone">Phone:</label>
              <input
                id="storePhone"
                className="store-fields"
                type="text"
                name="phone"
                value={formData.phone || ''}
                onChange={handleFormChange}
              />
            </div>
            <div className="admin-form-row">
              <label>
                GPS Latitude:{' '}
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
                value={formData.latitude || ''}
                onChange={handleFormChange}
              />
            </div>
            <div className="admin-form-row">
              <label>
                GPS Longitude:{' '}
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
                value={formData.longitude || ''}
                onChange={handleFormChange}
              />
            </div>
            <div className="admin-form-row">
              <label htmlFor="storeOpen">Store Open:</label>
              <select
                id="storeOpen"
                className="store-fields"
                name="open"
                value={formData.open ? 'true' : 'false'}
                onChange={handleFormChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="admin-form-row">
              <label htmlFor="storeConstruction">Under Construction:</label>
              <select
                id="storeConstruction"
                className="store-fields"
                name="construction"
                value={formData.construction ? 'true' : 'false'}
                onChange={handleFormChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleDelete}>
                Delete
              </button>
              <button type="submit" className="btn-save">
                {selectedStore ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn-cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Admin;
