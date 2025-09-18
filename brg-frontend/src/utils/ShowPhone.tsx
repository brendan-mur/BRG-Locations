import { formatPhone } from "./FormatPhone";

export function showPhone(storePhone: string) {
  if (storePhone)
    return <a href={`tel:${storePhone}`}>{formatPhone(storePhone)}</a>;
  return <img className="no-phone" title="No phone number available" src="src/assets/no_phone.svg"></img>;
}
