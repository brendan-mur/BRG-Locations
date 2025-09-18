export function underConstruction(construction: boolean) {
  if (construction) {
    return (
      <img className="construction" title="Under Construction" src="src/assets/construction.svg"></img>
    );
  }
  return;
}
