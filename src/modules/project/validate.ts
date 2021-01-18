import { IProject } from 'src/@types';

export default function validate({ name, description }: IProject) {
  const errors: any = {};

  if (!name || name.trim().length === 0) {
    errors.name = '프로젝트 명이 입력되지 않았습니다.';
  }

  if (!description || description.trim().length === 0) {
    errors.description = '프로젝트 설명이 입력되지 않았습니다.';
  }

  return errors;
}
