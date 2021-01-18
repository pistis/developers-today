import { IProject, ICategory, ITask } from 'src/@types';
import _ from 'lodash';
import { getSpentTimeMinutes } from './util';

interface sortItem {
  minutes: number;
}
const sortFunc = (a: sortItem, b: sortItem) => {
  if (a.minutes > b.minutes) {
    return -1;
  }
  if (a.minutes < b.minutes) {
    return 1;
  }
  return 0;
};
export const projectStatistics = (projects: IProject[], tasks: ITask[]) => {
  const names = projects.reduce((acc: { [x: string]: string }, project: IProject) => {
    acc[project.id as number] = project.name;
    return acc;
  }, {});

  const grouped = _.groupBy(tasks, 'projectId');
  const projectGroupTasks = Object.keys(grouped).map((projectId) => {
    const tasks = grouped[projectId];
    const minutes = getSpentTimeMinutes(tasks);
    return {
      name: names[projectId],
      minutes: minutes,
    };
  });
  projectGroupTasks.sort(sortFunc);
  const projectTotalSpentMinutes = projectGroupTasks.reduce((acc, { minutes }) => {
    return acc + minutes;
  }, 0);

  return { projectTotalSpentMinutes, projectGroupTasks };
};

export const categoryStatistics = (categories: ICategory[], tasks: ITask[]) => {
  const names = categories.reduce((acc: { [x: string]: string }, category: ICategory) => {
    acc[category.id as number] = category.name;
    return acc;
  }, {});

  const grouped = _.groupBy(tasks, 'categoryId');
  const categoryGroupTasks = Object.keys(grouped).map((categoryId) => {
    const tasks = grouped[categoryId];
    const minutes = getSpentTimeMinutes(tasks);
    return {
      name: names[categoryId],
      minutes: minutes,
    };
  });
  categoryGroupTasks.sort(sortFunc);

  const categoryTotalSpentMinutes = categoryGroupTasks.reduce((acc, { minutes }) => {
    return acc + minutes;
  }, 0);

  return { categoryTotalSpentMinutes, categoryGroupTasks };
};

export const titleStatistics = (tasks: ITask[]) => {
  const grouped = _.groupBy(tasks, 'title');
  const titleGroupTasks = Object.keys(grouped).map((title: string) => {
    const tasks = grouped[title];
    const minutes = getSpentTimeMinutes(tasks);
    return {
      name: title,
      minutes: minutes,
    };
  });
  titleGroupTasks.sort(sortFunc);
  const titleTotalSpentMinutes = titleGroupTasks.reduce((acc, { minutes }) => {
    return acc + minutes;
  }, 0);

  return { titleTotalSpentMinutes, titleGroupTasks };
};
