import { ITask } from 'src/@types/';
import { requestIpc } from '../common/lib/ipcEvent';

const taskApi = {
  list: async (date: string): Promise<ITask[]> => {
    const { data: tasks } = await requestIpc<ITask[]>({ message: 'listTask', params: { date } });
    return tasks;
  },
  listByProject: async (projectId: number, startDate: string, endDate: string): Promise<ITask[]> => {
    const { data: tasks } = await requestIpc<ITask[]>({
      message: 'listTaskByProject',
      params: { projectId, startDate, endDate },
    });
    return tasks;
  },
  listByRangeDate: async (startDate: string, endDate: string): Promise<ITask[]> => {
    const { data: tasks } = await requestIpc<ITask[]>({
      message: 'listTaskByRangeDate',
      params: { startDate, endDate },
    });
    return tasks;
  },
  create: async (task: ITask): Promise<boolean> => {
    const { data: success } = await requestIpc<boolean>({ message: 'createTask', params: { task } });
    return success;
  },
  update: async (task: ITask): Promise<boolean> => {
    const { data: success } = await requestIpc<boolean>({ message: 'updateTask', params: { task } });
    return success;
  },
  delete: async (taskId: number): Promise<boolean> => {
    const { data: success } = await requestIpc<boolean>({ message: 'deleteTask', params: { taskId } });
    return success;
  },
};
export default taskApi;
