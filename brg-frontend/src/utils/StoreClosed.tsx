import "../styles/StoreIcons.css";
export function storeClosed(storeActive: boolean) {
  if (!storeActive) {
    return (
      <img className="store-icons" title="Store Closed" src="src/assets/closed-icon.svg"></img>
    );
  }
  return;
}
