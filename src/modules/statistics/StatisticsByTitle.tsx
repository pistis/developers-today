import { ITask } from 'src/@types';
import React from 'react';
import { titleStatistics } from 'src/modules/common/lib/statistics';
import TimeChart from './TimeChart';
type IProps = {
  tasks: ITask[];
};

const StatisticsByTitle: React.FC<IProps> = ({ tasks }) => {
  const { titleTotalSpentMinutes, titleGroupTasks } = titleStatistics(tasks);

  return (
    <>
      <TimeChart title={'이슈별 업무 소요시간'} totalMinutes={titleTotalSpentMinutes} minutesData={titleGroupTasks} />
    </>
  );
};

export default StatisticsByTitle;
