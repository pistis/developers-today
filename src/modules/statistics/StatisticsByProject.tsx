import { IProject, ITask } from 'src/@types';
import React from 'react';
import { projectStatistics } from 'src/modules/common/lib/statistics';
import TimeChart from './TimeChart';
type IProps = {
  projects: IProject[];
  tasks: ITask[];
};

const StatisticsByProject: React.FC<IProps> = ({ projects, tasks }) => {
  const { projectTotalSpentMinutes, projectGroupTasks } = projectStatistics(projects, tasks);

  return (
    <>
      <TimeChart
        title={'프로젝트별 업무 소요시간'}
        totalMinutes={projectTotalSpentMinutes}
        minutesData={projectGroupTasks}
      />
    </>
  );
};

export default StatisticsByProject;
