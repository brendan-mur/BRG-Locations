import "../styles/Closed-Icon.css";
export function storeClosed(storeActive: boolean) {
  if (!storeActive) {
    return (
      <img className="store-closed" title="Store Closed" src="src/assets/closed-icon.svg"></img>
    );
  }
  return;
}
