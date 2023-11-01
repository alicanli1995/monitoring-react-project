
export function checkObjectEquality(host, host2) {
  return JSON.stringify(host) === JSON.stringify(host2);
}