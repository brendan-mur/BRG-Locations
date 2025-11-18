import '../styles/StoreIcons.css';
export function underConstruction(construction: boolean) {
  if (construction) {
    return (
      <img
        className="construction store-icons"
        title="Store under construction"
        src="/construction.svg"
        alt="Under Construction"
      />
    );
  }
  return null;
}
