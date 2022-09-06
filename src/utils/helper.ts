import {formatDistance, formatDistanceToNow, subDays} from 'date-fns';

export const FormatText = (text: string) => {
  return text.replace(/(^|\s)\S/g, (letter: string) => letter.toUpperCase());
};

export const GenerateColor = () => {
  const r = () => (Math.random() * 256) >> 0;
  const color = `rgb(${r()},${r()}, ${r()})`;
  return color;
};

export const messgeTimeFormater = (time: string) => {
  const TimePased = formatDistanceToNow(new Date(time), {
    addSuffix: true,
    includeSeconds: true,
  });

  return TimePased;
};
