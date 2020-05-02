/**
 * This method helps to get the current date without leading zero
 * Current supported format: mm/dd/yyyy
 */
export const getCurrentDateWithoutLeadingZero = () => {
  const today: Date = new Date();
  return (
    today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear()
  );
};

/**
 * This method helps to get the current date with leading zeros
 * Current supported format: mm/dd/yyyy
 */
export const getCurrentDateWithLeadingZero = () => {
  const today: Date = new Date();
  return (
    ('0' + (today.getMonth() + 1)).slice(-2) +
    '/' +
    ('0' + today.getDate()).slice(-2) +
    '/' +
    today.getFullYear()
  );
};

/**
 * This method helps to get the any specified next date of current date with leading zeros
 * Current supported format: mm/dd/yyyy
 *
 * @example:
 * getNexDateDatesOfCurrentDate(CURRENTDATE+1) //returns next date
 * getNexDateDatesOfCurrentDate(CURRENTDATE+2) //returns next to next date
 * getNexDateDatesOfCurrentDate(CURRENTDATE+n) //returns nth next date of current date
 */
export const getNexDateDatesOfCurrentDateWithoutLeadingZero = (
  expectedDate
) => {
  const today: Date = new Date();
  return (
    ('0' + (today.getMonth() + 1)).slice(-2) +
    '/' +
    ('0' + (today.getDate() + Number(expectedDate.split('+')[1]))).slice(-2) +
    '/' +
    String(today.getFullYear())
  );
};

/**
 * This method helps to get the any specified next date of current date without leading zeros
 * Current supported format: mm/dd/yyyy
 *
 * @example:
 * getNexDateDatesOfCurrentDate(CURRENTDATE+1) //returns next date
 * getNexDateDatesOfCurrentDate(CURRENTDATE+2) //returns next to next date
 * getNexDateDatesOfCurrentDate(CURRENTDATE+n) //returns nth next date of current date
 */
export const getNexDateDatesOfCurrentDateWithLeadingZero = (expectedDate) => {
  const today: Date = new Date();
  return (
    today.getMonth() +
    1 +
    '/' +
    (today.getDate() + Number(expectedDate.split('+')[1])) +
    '/' +
    String(today.getFullYear())
  );
};
