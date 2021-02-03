import moment from 'moment';
import CONSTANTS from 'src/constants';
/**
 *
 * @param date 20201229
 */
export const dateStr2Date = (date: string) => {
  return new Date(String(date).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'));
};

export const compositeStr2Date = (dateStr: string, hoursMinutes: string) => {
  const date = new Date(dateStr);
  const [hours, minutes] = hoursMinutes.split(':');
  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));
  return date;
};

/**
 * SQLite는 timezone 미지원, 저장된 DB의 값은 UTC로 변환되어 있음
 * 'YYYY-MM-DD HH:mm:ss' 로 변환하여 DB에 저장
 * @param dateStr
 */
export const convertDateTimeStringForSQLite = (date: Date) => {
  return moment(date).format(CONSTANTS.SQLITE_DATETIME_FORMAT);
};

export const getSpentTimeMinutes = (tasks: any): number => {
  const minutes = tasks.reduce((acc: number, current: any) => {
    if (current.endTime && current.startTime) {
      const endTimeMs = moment.duration(current.endTime).asMilliseconds();
      const startTimeMs = moment.duration(current.startTime).asMilliseconds();
      const diff = endTimeMs - startTimeMs;
      return diff > 0 ? acc + millisec2Minutes(diff) : acc + 0;
    } else {
      return acc + 0;
    }
  }, 0);
  return minutes;
};

export const millisec2Minutes = (milliSec: number) => {
  return milliSec / 1000 / 60;
};
export const minutes2HHMM = (minutes: number): string => {
  var m = minutes % 60;
  var h = (minutes - m) / 60;
  return h.toString() + ':' + (m < 10 ? '0' : '') + m.toString();
};

var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
export const getDayLabel = (date: Date) => {
  return week[date.getDay()];
};

export const getRandomColor = () => {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const hexToRgb = (hex: string): any => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};
export const toYYYYMMDD = (date: Date) => {
  return moment(date).format(CONSTANTS.MOMENT_DATE_FORMAT);
};

export const toHHMMSS = (date: Date) => {
  return moment(date).format(CONSTANTS.MOMENT_TIME_FORMAT);
};

export const toMs = (strTime: string) => {
  return moment.duration(strTime).asMilliseconds();
};

export const toPercentile = (total: number, amount: number, digit = 1): string => {
  return `${((amount / total) * 100).toFixed(digit)}%`;
};

export const sortFunc = (key: string, asc: boolean = true) => {
  let gt = 1;
  let lt = -1;
  if (!asc) {
    gt = -1;
    lt = 1;
  }
  return (a: any, b: any) => {
    if (a[key] > b[key]) {
      return gt;
    }
    if (a[key] < b[key]) {
      return lt;
    }
    return 0;
  };
};
