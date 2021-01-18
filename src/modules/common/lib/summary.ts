import { ITask } from 'src/@types';
import _ from 'lodash';

export const groupBy = (data: ITask[], groupByKey: string) => {
  const grouped = _.groupBy(data, groupByKey);
  return Object.keys(grouped).map((groupByKeyValue: string) => {
    const data = grouped[groupByKeyValue];
    return {
      [groupByKey]: groupByKeyValue,
      data: data,
    };
  });
};
