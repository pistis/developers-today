import { ICategory } from 'src/@types/';
import { requestIpc } from '../common/lib/ipcEvent';

const categoryApi = {
  list: async (): Promise<ICategory[]> => {
    const { data: categories } = await requestIpc<ICategory[]>({ message: 'listCategory' });
    return categories;
  },
  create: async (category: ICategory): Promise<boolean> => {
    const { data: success } = await requestIpc<boolean>({ message: 'createCategory', params: { category } });
    return success;
  },
  update: async (category: ICategory): Promise<boolean> => {
    const { data: success } = await requestIpc<boolean>({ message: 'updateCategory', params: { category } });
    return success;
  },
  delete: async (categoryId: number): Promise<boolean> => {
    const { data: success } = await requestIpc<boolean>({ message: 'deleteCategory', params: { categoryId } });
    return success;
  },
};
export default categoryApi;
