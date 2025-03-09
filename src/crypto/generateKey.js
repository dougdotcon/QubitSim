export function generateRandomKey(length) {
  const key = [];
  for (let i = 0; i < length; i++) {
    const randomBit = Math.round(Math.random());
    key.push(randomBit);
  }
  return key;
}