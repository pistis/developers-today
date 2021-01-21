import moment from 'moment';
import { ITask } from 'src/@types/';
export const getOverlapTimeTask = (tasks: ITask[], timeHHMMSS: string = '') => {
  if (!timeHHMMSS) return null;
  const timeMs = moment.duration(timeHHMMSS).asMilliseconds();
  return tasks
    .map((task: ITask) => {
      const endTimeMs = task.endTime ? moment.duration(task.endTime).asMilliseconds() : -1;
      const startTimeMs = task.startTime ? moment.duration(task.startTime).asMilliseconds() : -1;
      return {
        id: task.id,
        title: task.title,
        startTimeMs,
        endTimeMs,
      };
    })
    .filter(({ startTimeMs, endTimeMs }: any) => startTimeMs >= 0 && endTimeMs >= 0)
    .find(({ startTimeMs, endTimeMs }) => startTimeMs < timeMs && timeMs < endTimeMs);
};
