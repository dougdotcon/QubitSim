
/**
 * Decrypts an array of bits using a One-Time Pad (XOR with key).
 * @param {number[]} encryptedBits - Array of encrypted bits.
 * @param {number[]} key - Array of key bits.
 * @returns {string} The decrypted plaintext string.
 */
export function decryptMessage(encryptedBits, key) {
  if (key.length < encryptedBits.length) {
    throw new Error("Key length too short for decryption.");
  }

  // Decrypt (XOR) - XOR is its own inverse
  const decryptedBits = encryptedBits.map((b, i) => b ^ key[i]);

  // Convert bits to string
  let message = "";
  for (let i = 0; i < decryptedBits.length; i += 8) {
    let charCode = 0;
    for (let j = 0; j < 8; j++) {
      // Safety check for incomplete byte at end
      if (i + j < decryptedBits.length) {
        charCode = (charCode << 1) | decryptedBits[i + j];
      }
    }
    message += String.fromCharCode(charCode);
  }
  return message;
}