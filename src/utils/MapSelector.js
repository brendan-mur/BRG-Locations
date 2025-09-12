export function mapSelector(lat, long, storeNumber = '') {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPad|iPhone|iPod/i.test(userAgent)) {
    window.open(`maps://maps.google.com/maps?daddr=${lat},${long}&ll=`);
  } else if (/Android/i.test(userAgent)) {
    window.open(`geo:${lat},${long}?q=${lat},${long}(Arby's #${storeNumber})`);
  } else {
    window.open(`https://maps.google.com/maps?daddr=${lat},${long}&ll=`);
  }
}
