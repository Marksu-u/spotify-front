import notFound from '../assets/404.png';

export const convertBufferToBase64 = (picture) => {
  if (picture?.data?.data) {
    const buffer = new Uint8Array(picture.data.data);
    let binary = '';
    buffer.forEach((b) => (binary += String.fromCharCode(b)));
    return `data:${picture.format};base64,${window.btoa(binary)}`;
  }
  return notFound;
};
