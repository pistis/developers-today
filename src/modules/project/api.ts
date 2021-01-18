import { IProject } from 'src/@types/';
import { requestIpc } from '../common/lib/ipcEvent';

const projectApi = {
  list: async (): Promise<IProject[]> => {
    const { data: projects } = await requestIpc<IProject[]>({ message: 'listProject' });
    return projects;
  },
  create: async (project: IProject): Promise<boolean> => {
    const { data: success } = await requestIpc<boolean>({ message: 'createProject', params: { project } });
    return success;
  },
  update: async (project: IProject): Promise<boolean> => {
    const { data: success } = await requestIpc<boolean>({ message: 'updateProject', params: { project } });
    return success;
  },
  delete: async (projectId: number): Promise<boolean> => {
    const { data: success } = await requestIpc<boolean>({ message: 'deleteProject', params: { projectId } });
    return success;
  },
};
export default projectApi;
