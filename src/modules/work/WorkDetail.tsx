import { ITask } from 'src/@types';
import React, { useState } from 'react';
import { CCard, CCardBody, CCol, CRow, CButton } from '@coreui/react';
import { getDayLabel } from 'src/modules/common/lib/util';

import useTaskList from 'src/modules/common/hooks/api/useTaskList';
import useProjectList from 'src/modules/common/hooks/api/useProjectList';
import useCategoryList from 'src/modules/common/hooks/api/useCategoryList';

import TaskList from './TaskList';
import TaskEditor from './TaskEditor';

import TaskApi from './api';

import TaskStatistics from '../statistics/TaskStatistics';
import TaskSummary from '../statistics/TaskSummary';

interface IWorkDetailProps {
  date: string;
}

const WorkDetail: React.FC<IWorkDetailProps> = ({ date }) => {
  // project, category
  const [{ data: projects }] = useProjectList('');
  const [{ data: categories }] = useCategoryList('');

  // list
  const [{ data: tasks }, setRefresh] = useTaskList(date, '');
  const refresh = () => setRefresh(Date.now().toString());

  // creation
  const [creatorModal, setCreatorModal] = useState(false);

  // edition
  const [updaterModal, setUpdaterModal] = useState(false);
  const [updatingTask, setUpdatingTask] = useState<ITask | null>(null);
  const editTask = (taskId: number) => {
    const task = tasks.find((task: ITask) => {
      return task.id === taskId;
    });
    if (task) {
      setUpdatingTask(task);
    }

    setUpdaterModal(true);
  };

  // deletion
  const deleteTask = async (taskId: number) => {
    if (!window.confirm('업무를 삭제하시겠습니까?')) {
      return;
    }
    try {
      await TaskApi.delete(taskId);
      refresh();
    } catch (e) {
      alert(`업무 삭제 오류 : ${e.toSting()}`);
    }
  };

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardBody>
              <span className="h1">
                {date}({getDayLabel(new Date(date))}) 업무
              </span>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs="12" lg="12">
          <TaskStatistics
            title={`${date}(${getDayLabel(new Date(date))}) 업무 소요시간 통계`}
            projects={projects}
            categories={categories}
            tasks={tasks}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" lg="12">
          <TaskSummary
            titie={`${date}(${getDayLabel(new Date(date))}) 업무 요약`}
            projects={projects}
            categories={categories}
            tasks={tasks}
          />
        </CCol>
      </CRow>
      <TaskEditor
        show={creatorModal}
        projects={projects}
        categories={categories}
        tasks={tasks}
        date={date}
        onUpdated={() => {
          setCreatorModal(false);
          refresh();
        }}
        onHide={() => {
          setCreatorModal(false);
        }}
      />
      {updaterModal && (
        <TaskEditor
          show={true}
          projects={projects}
          categories={categories}
          tasks={tasks}
          date={date}
          task={updatingTask}
          onUpdated={() => {
            setUpdaterModal(false);
            refresh();
          }}
          onHide={() => {
            setUpdaterModal(false);
          }}
        />
      )}
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardBody>
              <CButton
                color="info"
                onClick={() => {
                  setCreatorModal(true);
                }}>
                업무 생성
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" lg="12">
          <TaskList date={date} tasks={tasks} onDeleteButton={deleteTask} onEditButton={editTask} />
        </CCol>
      </CRow>
    </>
  );
};

export default WorkDetail;
