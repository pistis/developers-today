import { ICategory, ITask } from 'src/@types';
import React from 'react';
import { categoryStatistics } from 'src/modules/common/lib/statistics';
import TimeChart from './TimeChart';
type IProps = {
  categories: ICategory[];
  tasks: ITask[];
};

const StatisticsByCategory: React.FC<IProps> = ({ categories, tasks }) => {
  const { categoryTotalSpentMinutes, categoryGroupTasks } = categoryStatistics(categories, tasks);

  return (
    <>
      <TimeChart
        title={'카테고리별 업무 소요시간'}
        totalMinutes={categoryTotalSpentMinutes}
        minutesData={categoryGroupTasks}
      />
    </>
  );
};

export default StatisticsByCategory;
