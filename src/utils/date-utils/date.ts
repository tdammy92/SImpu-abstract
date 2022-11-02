import {
  formatDistance,
  formatRelative,
  format,
  formatDistanceToNow,
  subDays,
} from 'date-fns';

//snippet to format message time
export const messgeTimeFormater = (time: string) => {
  try {
    let TimePased;
    const currrentDate = new Date();
    const olDDate = new Date(time);

    let DateDiff = currrentDate.getTime() - olDDate.getTime();
    let msDays = 1000 * 3600 * 24;
    let DaysPassed = DateDiff / msDays;

    TimePased =
      DaysPassed > 2
        ? format(new Date(time), 'd/M/yyyy')
        : formatDistanceToNow(new Date(time), {
            addSuffix: true,
            includeSeconds: true,
          });

    return TimePased.replace(/about/g, '');
  } catch (error) {
    console.log(error);
  }
};

//snippet to format general date
export const formatDate = (time: string) => {
  const formatedDate = format(new Date(time), 'dd-MMM-yyyy h:m aaaa');
  return formatedDate;
};

//snippet to format notification date
export const notificationDateFormat = (time: string) => {
  let formated;

  const formatedDate = formatRelative(new Date(time), new Date());

  return formatedDate;
};

//
export const getDateXDaysAgo = (numOfDays: any, date = new Date()) => {
  const daysAgo = new Date(date.getTime());

  daysAgo.setDate(date.getDate() - numOfDays);

  return daysAgo;
};
