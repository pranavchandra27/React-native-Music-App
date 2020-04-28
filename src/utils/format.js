import moment from 'moment';

export const floorVal = val => {
  return Math.floor(val);
};

export const formatedTime = sec => {
  return moment.utc(floorVal(sec * 1000)).format('mm:ss');
};
