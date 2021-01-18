import { ICategory } from 'src/@types';

export default function validate({ name, description }: ICategory) {
  const errors: any = {};

  if (!name || name.trim().length === 0) {
    errors.name = '카테고리 명이 입력되지 않았습니다.';
  }

  if (!description || description.trim().length === 0) {
    errors.description = '카테고리 설명이 입력되지 않았습니다.';
  }

  return errors;
}
