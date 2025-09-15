import { formatPhone } from "./FormatPhone.tsx";

export function showPhone(storePhone: string) {
  if (storePhone)
    return <a href={`tel:${storePhone}`}>{formatPhone(storePhone)}</a>;
  return <img className="no-phone" src="src/assets/no_phone.svg"></img>;
}
