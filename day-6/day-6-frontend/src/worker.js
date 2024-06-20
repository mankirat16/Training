self.addEventListener("message", (event) => {
  const buffer = event.data;
  const base64Image = bufferToBase64(buffer);
  self.postMessage(base64Image);
});

function bufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}
