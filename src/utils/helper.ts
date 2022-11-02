// snippet to generate random colors
export const GenerateColor = () => {
  const r = () => (Math.random() * 256) >> 0;
  const color = `rgb(${r()},${r()}, ${r()})`;
  return color;
};
