import {
  formatDistance,
  formatRelative,
  format,
  formatDistanceToNow,
  subDays,
} from 'date-fns';

export const FormatText = (text: string) => {
  return text.replace(/(^|\s)\S/g, (letter: string) => letter.toUpperCase());
};

export const GenerateColor = () => {
  const r = () => (Math.random() * 256) >> 0;
  const color = `rgb(${r()},${r()}, ${r()})`;
  return color;
};

export const messgeTimeFormater = (time: string) => {
  let TimePased;
  const currrentDate = new Date();
  const olDDate = new Date(time);

  let DateDiff = currrentDate.getTime() - olDDate.getTime();
  let msDays = 1000 * 3600 * 24;
  let DaysPassed = DateDiff / msDays;

  TimePased =
    DaysPassed > 4
      ? format(new Date(time), 'd/M/yyyy')
      : formatDistanceToNow(new Date(time), {
          addSuffix: true,
          includeSeconds: true,
        });

  return TimePased;
};

export const formatDate = (time: string) => {
  const formatedDate = format(new Date(time), 'dd-MMM-yyyy h:m aaaa');
  return formatedDate;
};

export const notificationDateFormat = (time: string) => {
  let formated;

  const formatedDate = formatRelative(new Date(time), new Date());

  return formatedDate;
};
