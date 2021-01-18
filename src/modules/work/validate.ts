import moment from 'moment';
import { ITask } from 'src/@types';
export default function validate({ projectId, categoryId, title, link, startTime, endTime }: ITask) {
  const errors: any = {};

  if (!projectId) {
    errors.projectId = '프로젝트가 선택되지 않았습니다.';
  } else if (isNaN(projectId)) {
    errors.projectId = '입력된 프로젝트가 유효하지 않습니다.';
  }

  if (!categoryId) {
    errors.categoryId = '카테고리가 선택되지 않았습니다.';
  } else if (isNaN(categoryId)) {
    errors.categoryId = '입력된 카테고리가 유효하지 않습니다.';
  }

  if (!title || title.trim().length === 0) {
    errors.title = '업무가 입력되지 않았습니다.';
  }

  if (link) {
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (!link.match(regex)) {
      errors.link = '링크가 유효하지 않습니다.';
    }
  }

  if (startTime && endTime) {
    const endTimeMs = moment.duration(endTime).asMilliseconds();
    const startTimeMs = moment.duration(startTime).asMilliseconds();
    if (endTimeMs - startTimeMs <= 0) {
      errors.startTime = '시작/종료 시간이 유효하지 않습니다.';
      errors.endTime = '시작/종료 시간이 유효하지 않습니다.';
    }
  }

  return errors;
}
