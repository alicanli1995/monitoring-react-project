
export function checkObjectEquality(host, host2) {
  return JSON.stringify(host) === JSON.stringify(host2);
}

export function dateFormatter(date) {
  return new Date(date).toLocaleString('tr-TR', {timeZone: 'UTC'});
}