import { IProject, ICategory, ITask } from 'src/@types/';
import React, { useState, useCallback } from 'react';
import { CCol } from '@coreui/react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { CForm, CFormGroup, CTextarea, CInput, CLabel, CSelect } from '@coreui/react';
import { CCard, CCardBody, CCardHeader, CCollapse } from '@coreui/react';

import CIcon from '@coreui/icons-react';
import useForm, { IReturnUseForm } from 'src/modules/common/hooks/useForm';
import useTaskListByProject from 'src/modules/common/hooks/api/useTaskListByProject';
import validate from './validate';
import TaskApi from './api';
import moment from 'moment';
import { getOverlapTimeTask } from './util';

type TaskEditorProps = {
  show: boolean;
  projects: IProject[];
  categories: ICategory[];
  tasks: ITask[];
  date: string;
  task?: ITask | null;
  onUpdated: () => void;
  onHide: () => void;
};

const TaskEditor: React.FC<TaskEditorProps> = ({
  show,
  projects,
  categories,
  tasks,
  date,
  task: updatingTask,
  onUpdated,
  onHide,
}) => {
  const title = updatingTask ? '업무 수정' : '업무 생성';
  const initialValues: ITask = {
    projectId: 0,
    categoryId: 0,
    date: date,
    title: '',
    contents: '',
    link: '',
    startTime: '',
    endTime: '',
  };

  if (updatingTask) {
    initialValues.projectId = updatingTask.projectId;
    initialValues.categoryId = updatingTask.categoryId;
    initialValues.title = updatingTask.title;
    initialValues.contents = updatingTask.contents;
    initialValues.link = updatingTask.link;
    if (updatingTask.startTime) {
      initialValues.startTime = updatingTask.startTime;
    }
    if (updatingTask.endTime) {
      initialValues.endTime = updatingTask.endTime;
    }
  }

  const onSubmit = useCallback(
    async (values: ITask) => {
      const task: ITask = {
        date: date,
        projectId: Number(values.projectId),
        categoryId: Number(values.categoryId),
        title: values.title,
        contents: values.contents,
        link: values.link,
      };

      if (values.startTime) {
        task.startTime = values.startTime;
        if (task.startTime.split(':').length === 2) {
          task.startTime = `${task.startTime}:00`;
        }
      }

      if (values.endTime) {
        task.endTime = values.endTime;
        if (task.endTime.split(':').length === 2) {
          task.endTime = `${task.endTime}:00`;
        }
      }

      try {
        const targetTasks = updatingTask ? tasks.filter((task: ITask) => task.id != updatingTask.id) : tasks;
        const startTimeOverlapTask = getOverlapTimeTask(targetTasks, task.startTime);
        if (startTimeOverlapTask) {
          throw new Error(`업무(${startTimeOverlapTask.title})의 시작/종료 시간과 겹칩니다.`);
        }
        const endTimeOverlapTask = getOverlapTimeTask(targetTasks, task.startTime);
        if (endTimeOverlapTask) {
          throw new Error(`업무(${endTimeOverlapTask.title})의 시작/종료 시간과 겹칩니다.`);
        }

        if (updatingTask) {
          task.id = updatingTask.id;
          await TaskApi.update(task);
        } else {
          await TaskApi.create(task);
        }

        onUpdated();
      } catch (e) {
        alert(`업무 생성 오류 : ${e}`);
        throw e;
      }
    },
    [tasks, updatingTask, date, onUpdated]
  );

  const { values, errors, submitting, handleChange, handleSubmit, setValues }: IReturnUseForm<ITask> = useForm<ITask>({
    initialValues,
    onSubmit,
    validate,
  });

  const initialStartDate = moment(new Date(date)).subtract(7, 'days').format('YYYY-MM-DD');
  const [startDate, setStartDate] = useState(initialStartDate);
  const handleChangeStartDate = (e: React.ChangeEvent<any>) => {
    const { value } = e.target;
    setStartDate(value);
  };

  const [endDate, setEndDate] = useState(date);
  const handleChangeEndDate = (e: React.ChangeEvent<any>) => {
    const { value } = e.target;
    setEndDate(value);
  };

  const [{ data: tasksByProject }] = useTaskListByProject(values.projectId, startDate, endDate, '');

  const handleChangeTaskByProject = (e: React.ChangeEvent<any>) => {
    const { value } = e.target;
    const task = tasksByProject.find((task: ITask) => {
      return task.id == value;
    });
    const title = task ? task.title : '';
    const contents = task ? task.contents : '';
    setValues((prevValues) => ({ ...prevValues, title, contents }));
  };

  const [optionCollapse, setOptionCollapse] = useState(false);
  return (
    <>
      <CModal show={show} onClose={onHide} centered>
        <CForm
          onSubmit={handleSubmit}
          action=""
          method="post"
          encType="multipart/form-data"
          className="form-horizontal"
          noValidate>
          <CModalHeader closeButton>
            <CModalTitle>{title}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="project-select">프로젝트</CLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CSelect id="project-select" name="projectId" value={values.projectId} onChange={handleChange}>
                  <option value="">프로젝트 선택</option>
                  {projects.map((project: any) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </CSelect>
                {errors.projectId && <span className="errorMessage">{errors.projectId}</span>}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="category-select">카테고리</CLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CSelect id="category-select" name="categoryId" value={values.categoryId} onChange={handleChange}>
                  <option value="">카테고리 선택</option>
                  {categories.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </CSelect>
                {errors.categoryId && <span className="errorMessage">{errors.categoryId}</span>}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="task-select-option">업무 선택 옵션</CLabel>
              </CCol>
              <CCol md="10">
                <CCard>
                  <CCardHeader>
                    <p>프로젝트 선택 필수</p>
                    <p>
                      {startDate} ~ {endDate}에 등록된 업무
                    </p>
                    <CButton
                      color="info"
                      variant="outline"
                      size="sm"
                      className="ml-1"
                      onClick={() => {
                        setOptionCollapse(!optionCollapse);
                      }}>
                      기간 변경 {optionCollapse ? '감추기' : '보기'}
                    </CButton>
                  </CCardHeader>
                  <CCollapse show={optionCollapse}>
                    <CCardBody>
                      <CInput
                        type="date"
                        name="startDate"
                        value={startDate}
                        onChange={handleChangeStartDate}
                        placeholder="date"
                      />
                      <CInput
                        type="date"
                        name="endDate"
                        value={endDate}
                        onChange={handleChangeEndDate}
                        placeholder="date"
                      />
                    </CCardBody>
                  </CCollapse>
                </CCard>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="task-by-project-select">업무 선택</CLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CSelect id="task-by-project-select" value={''} onChange={handleChangeTaskByProject}>
                  <option value="">업무 선택</option>
                  {tasksByProject.map((task: ITask) => (
                    <option key={task.id} value={task.id}>
                      {task.date} - {task.title}
                      {task.contents ? `(${task.contents})` : ''}
                    </option>
                  ))}
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="title-input">업무</CLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CInput
                  id="title-input"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  placeholder="업무를 입력하세요. (주간회의, 스크럼회의, XXX 구현, XXX 검토)"
                />
                {errors.title && <span className="errorMessage">{errors.title}</span>}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="contents-textarea">진행 내용</CLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CTextarea
                  id="contents-textarea"
                  name="contents"
                  value={values.contents}
                  onChange={handleChange}
                  rows={5}
                  placeholder="진행 내용..."
                />
                {errors.contents && <span className="errorMessage">{errors.contents}</span>}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="link-input">링크</CLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CInput id="link-input" name="link" value={values.link} onChange={handleChange} placeholder="http://" />
                {errors.link && <span className="errorMessage">{errors.link}</span>}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="startTime-input">시작 시간</CLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CInput
                  id="startTime-input"
                  type="time"
                  name="startTime"
                  value={values.startTime}
                  onChange={handleChange}
                  placeholder="time"
                />
                {errors.startTime && <span className="errorMessage">{errors.startTime}</span>}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="endTime-input">종료 시간</CLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CInput
                  id="endTime-input"
                  type="time"
                  name="endTime"
                  value={values.endTime}
                  onChange={handleChange}
                  placeholder="time"
                />
                {errors.endTime && <span className="errorMessage">{errors.endTime}</span>}
              </CCol>
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton type="submit" size="sm" color="primary" disabled={submitting}>
              <CIcon name="cil-scrubber" /> 저장
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  );
};

export default TaskEditor;
