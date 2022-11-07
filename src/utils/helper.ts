import {format} from 'date-fns';
import {getDateXDaysAgo} from './date-utils/date';

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
