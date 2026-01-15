
/**
 * Encrypts a string message using a One-Time Pad (XOR with key).
 * @param {string} message - The plaintext string.
 * @param {number[]} key - Array of bits (0s and 1s).
 * @returns {number[]} Array of encrypted bits.
 */
export function encryptMessage(message, key) {
  // Convert string to bits (8 bits per char)
  const bits = [];
  for (let i = 0; i < message.length; i++) {
    const charCode = message.charCodeAt(i);
    for (let j = 7; j >= 0; j--) {
      bits.push((charCode >> j) & 1);
    }
  }

  // Check key length
  if (key.length < bits.length) {
    throw new Error(`Key length defined as ${key.length} is too short for message of length ${bits.length} bits.`);
  }

  // Encrypt (XOR)
  const encryptedBits = bits.map((b, i) => b ^ key[i]);

  return encryptedBits;
}