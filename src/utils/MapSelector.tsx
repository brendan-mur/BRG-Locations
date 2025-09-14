export function mapSelector(
  latitude: string,
  longitude: string,
  storeNum: string = ''
) {
  const userAgent = navigator.userAgent;

  if (/iPad|iPhone|iPod/i.test(userAgent)) {
    window.open(`maps://maps.google.com/maps?daddr=${latitude},${longitude}&ll=`);
  } else if (/Android/i.test(userAgent)) {
    window.open(`geo:${latitude},${longitude}?q=${latitude},${longitude}(Arby's #${storeNum})`);
  } else {
    window.open(`https://maps.google.com/maps?daddr=${latitude},${longitude}&ll=`);
  }
}
