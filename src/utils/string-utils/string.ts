//snippet to capitalize first letter of a text
export const FormatText = (text: string) => {
  return text?.replace(/(^|\s)\S/g, (letter: string) => letter.toUpperCase());
};

//snippet to trim length of string
export const trimText = (text: string, lenght: number) => {
  if (!text?.length) return '';
  if (text?.length <= lenght) return text;

  return text?.substring(0, lenght) + '...';
};

//snippet to remove all html tags in a string
export const removeHtmlTags = (text: string) => {
  return text?.replace(new RegExp('<[^>]*>', 'g'), '');
};

//check if string contains only numbers
export const onlyNumbers = (text: string) => {
  const isNumber = /^[0-9]+$/.test(text);

  return isNumber;
};

//remove emoji from text
export const removeEmoji = (text: string) => {
  return text
    ?.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      '',
    )
    ?.replace(/\s+/g, ' ')
    ?.trim();
};
