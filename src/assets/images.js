const images = import.meta.glob('./*.png', { eager: true });
const imageMap = {};

Object.keys(images).forEach((key) => {
  const fileName = key.split('/').pop();
  imageMap[fileName] = images[key].default;
});

export default imageMap;