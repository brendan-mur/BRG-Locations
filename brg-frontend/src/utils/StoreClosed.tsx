import '../styles/StoreIcons.css';
export function storeClosed(storeActive: boolean) {
  if (!storeActive) {
    return (
      <img
        className="store-closed store-icons"
        title="Store is closed"
        src="/closed-icon.svg"
        alt="Store Closed"
      />
    );
  }
  return null;
}
