import {format} from 'date-fns';
import {
  showMessage,
  hideMessage,
  MessageType,
} from 'react-native-flash-message';
import {getDateXDaysAgo} from './date-utils/date';

type toastMessageType = {
  message: string;
  description?: string;
  type: MessageType;
};

// snippet to generate random colors
export const GenerateColor = () => {
  const r = () => (Math.random() * 256) >> 0;
  const color = `rgb(${r()},${r()}, ${r()})`;
  return color;
};

//date samples
const Dates = {
  today: format(new Date(), 'PP'),
  yesterday: format(getDateXDaysAgo(1, new Date()), 'PP'),
  specificDay: format(getDateXDaysAgo(5, new Date()), 'PP'),
  DayRange: `${format(getDateXDaysAgo(10, new Date()), 'MMM d')} - ${format(
    new Date(),
    'PP',
  )}`,
};

export const DateBy = [
  {
    name: 'Today',
    Icon: 'calendar-outline',
    sample: Dates.today,
  },
  {
    name: 'yesterday',
    Icon: 'calendar-today',
    sample: Dates.yesterday,
  },
  {
    name: 'Specific Date',
    Icon: 'calendar-week-begin',

    sample: Dates.specificDay,
  },
  {
    name: 'Date range',
    Icon: 'calendar-weekend-outline',
    sample: Dates.DayRange,
  },
];

export const formatNumbers = (num: number | string) => {
  return num?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const messsageToast = ({
  message,
  type,
  description,
}: toastMessageType) => {
  showMessage({
    message: message,
    description: description,
    type: type,
    icon: type,
  });
};

//get file type
export const getFileType = (url: string) => {
  //@ts-ignore
  return url.split(/[#?]/)[0].split('.').pop().trim();
};

//seconds to minute
export const formatSecToMin = (seconds: number) => {
  return (
    (seconds - (seconds %= 60)) / 60 +
    (9 < seconds ? ':' : ':0') +
    seconds
  ).substring(0, 4);
};
