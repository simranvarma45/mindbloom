// src/utils/uploadImage.js

export async function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result); // base64 string
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
