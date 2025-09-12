import { formatPhone } from '../utils/FormatPhone';

export function showPhone(storePhone) {
if (storePhone) return <a href={`tel:${storePhone}`}>{formatPhone(storePhone)}</a>;
return <img className="no-phone" src="src/assets/no_phone.svg"></img>;
}