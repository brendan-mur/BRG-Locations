import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // if using React Router
import locations from '../data/locations.json';

function storeSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredSuggestions = searchTerm.length >= 2
    ? locations.filter(store =>
        store.storeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.storeName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSelect = (storeId) => {
    const el = document.getElementById(storeId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus(); // This will apply .store-container:focus CSS
      setSearchTerm(''); // Clear search box after selection
    }
  };

  return (
    <div id="searchbar" className="store-search sticky-search is-mobile-centered">
      <input
        id="store-search"
        type="text"
        placeholder="Store Name or Number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter' && filteredSuggestions.length > 0) {
            handleSelect(filteredSuggestions[0].storeNumber);
          }
        }}
      />

      {filteredSuggestions.length > 0 && (
        <div className="autocomplete-items is-mobile-centered">
          {filteredSuggestions.map((store) => (
            <div
              key={store.storeNumber}
              onClick={() => handleSelect(store.storeNumber)}
            >
                {store.storeNumber} – {store.storeName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default storeSearch;
