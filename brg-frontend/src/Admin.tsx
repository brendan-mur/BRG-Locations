import React, { useState, ChangeEvent, FormEvent } from "react";
import { useLocations } from "./hooks/useLocations";
import "./styles/Admin.css";

type Store = {
  number: string;
  name: string;
  phone: string;
  latitude: string;
  longitude: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  construction: boolean;
  open: boolean;
};

function Admin() {
  const { locations, loading, error } = useLocations();
  const sortedLocations = [...locations].sort(
    (a, b) => parseInt(a.number) - parseInt(b.number)
  );
  const [selectedStore, setSelectedStore] = useState<string>("");
  const [formData, setFormData] = useState<Store | null>(null);
  const [originalData, setOriginalData] = useState<Store | null>(null);

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
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  // Handle update (save changes)
  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    // Implement save logic here (e.g., API call or file write)
    alert("Store updated!");
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
    setSelectedStore("");
    setFormData({
      number: "",
      name: "",
      phone: "",
      latitude: "",
      longitude: "",
      address: "",
      city: "",
      state: "",
      zip: "",
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
          {(locations as Store[]).map((store) => (
            <option key={store.number} value={store.number}>
              {store.number} - {store.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleAddNew}>
          Add New Store
        </button>
      </div>
      {formData && (
        <form className="edit-store-form" style={{ marginTop: "2rem" }}>
          <div className="form-row">
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
          <div className="form-row">
            <label>Store Name:</label>
            <input
              className="store-fields"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Address:</label>
            <input
              className="store-fields"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>City:</label>
            <input
              className="store-fields"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
            <div className="form-row">
            <label>State:</label>
            <input
              className="store-fields"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
            <div className="form-row">
            <label>Zip:</label>
            <input
              className="store-fields"
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Phone:</label>
            <input
              className="store-fields"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>GPS Latitude:</label>
            <input
              className="store-fields"
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>GPS Longitude:</label>
            <input
              className="store-fields"
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Store Open:</label>
            <select
              className="store-fields"
              name="open"
              value={formData.open ? "true" : "false"}
              onChange={handleChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="form-row">
            <label>Under Construction:</label>
            <select
              className="store-fields"
              name="construction"
              value={formData.construction ? "true" : "false"}
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
  );
}

export default Admin;
