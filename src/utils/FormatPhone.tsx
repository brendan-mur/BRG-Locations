export function formatPhone(
    phone: string
) {
    if (!phone || phone.length !== 10) return phone;
    const area = phone.slice(0, 3);
    const prefix = phone.slice(3, 6);
    const line = phone.slice(6);
    return `(${area}) ${prefix}-${line}`;
}