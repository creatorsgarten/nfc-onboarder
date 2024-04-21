// @ts-check
/// <reference lib="es2021" />
/**
 * @param {string} str
 * @param {string} key
 */
async function hmac(str, key) {
  const strBytes = new TextEncoder().encode(str);
  const keyBytes = new TextEncoder().encode(key);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, strBytes);
  // Format as hex
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * @param {string} urlTemplate
 */
export async function compileUrlTemplate(urlTemplate, { serialNumber }) {
  const hmacRegex = /\{hmac:([^}]+)\}/g;
  const hmacMap = new Map();
  const promises = [];
  const sn = serialNumber.replace(/:/g, "").toLowerCase();
  urlTemplate.replaceAll(hmacRegex, (_, key) => {
    promises.push(
      hmac(sn, key).then((sig) => {
        hmacMap.set(key, sig);
      })
    );
    return "";
  });
  if (promises.length) {
    await Promise.all(promises);
  }
  const expectedUrl = urlTemplate
    .replaceAll("{sn}", sn)
    .replaceAll(hmacRegex, (_, key) => hmacMap.get(key));

  return {
    generateUrl() {
      return expectedUrl;
    },
    /**
     * @param {string} url
     */
    check(url) {
      return url === expectedUrl;
    },
  };
}
