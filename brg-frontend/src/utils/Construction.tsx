import "../styles/StoreIcons.css";
export function underConstruction(construction: boolean) {
  if (construction) {
    return (
      <img className="store-icons" title="Under Construction" src="src/assets/construction.svg"></img>
    );
  }
  return;
}
