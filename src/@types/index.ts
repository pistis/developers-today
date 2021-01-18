export enum PROJECT_TYPE {
  PRODUCT = 'PRODUCT',
  TEAM = 'TEAM',
  PERSONAL = 'PERSONAL',
}

export interface IProject {
  id?: number;
  name: string;
  description?: string;
  type: PROJECT_TYPE;
  startDate?: string;
  endDate?: string;
  ceatedAt?: Date;
  updatedAt?: Date;
}

export interface ICategory {
  id?: number;
  name: string;
  description?: string;
  ceatedAt?: Date;
  updatedAt?: Date;
}

export interface ITask {
  id?: number;
  projectId: number;
  Project?: IProject;
  categoryId: number;
  Category?: ICategory;
  date: string;
  title: string;
  contents?: string;
  link?: string;
  estimationMinutes?: number;
  startTime?: string;
  endTime?: string;
  ceatedAt?: Date;
  updatedAt?: Date;
}
