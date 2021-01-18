import { ITask } from 'src/@types';
import React, { useState } from 'react';
import { CCard, CCardBody, CCardHeader, CDataTable, CButton, CCollapse } from '@coreui/react';
import { millisec2Minutes, minutes2HHMM, getDayLabel } from '../common/lib/util';
import moment from 'moment';

type Props = {
  date: string;
  tasks: ITask[];
  onEditButton: (taskId: number) => void;
  onDeleteButton: (taskId: number) => void;
};

const TaskList: React.FC<Props> = ({ date, tasks, onEditButton, onDeleteButton }) => {
  const fields = [
    { key: 'project', _style: { width: '15%' } },
    { key: 'category', _style: { width: '15%' } },
    { key: 'title', _style: { width: '15%' } },
    { key: 'contents', _style: { width: '15%' } },
    { key: 'startTime', _style: { width: '10%' } },
    { key: 'endTime', _style: { width: '10%' } },
    { key: 'spentTime', _style: { width: '5%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '15%' },
      sorter: false,
      filter: false,
    },
  ];

  const taskData = tasks.map((task: ITask) => {
    const { startTime, endTime } = task;
    let spendTime: string = '';
    if (startTime && endTime) {
      const endTimeMs = moment.duration(endTime).asMilliseconds();
      const startTimeMs = moment.duration(startTime).asMilliseconds();
      const diff = endTimeMs - startTimeMs;
      if (diff > 0) {
        spendTime = minutes2HHMM(millisec2Minutes(diff));
      } else {
        spendTime = '!!!';
      }
    }
    return {
      id: task.id,
      project: task.Project ? task.Project.name : '',
      category: task.Category ? task.Category.name : '',
      title: task.title,
      contents: task.contents,
      link: task.link,
      spentTime: spendTime,
      startTime: startTime ? startTime : '-',
      endTime: endTime ? endTime : '-',
    };
  });
  const initialValues: number[] = [];
  const [details, setDetails] = useState(initialValues);

  const toggleDetails = (index: number) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const toggleShowDetails = () => {
    setDetails(tasks.map((_task, index) => index));
  };

  const toggleHideDetails = () => {
    setDetails([]);
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          {date}({getDayLabel(new Date(date))}) 업무
          <CButton color="info" variant="outline" size="sm" className="ml-1" onClick={toggleShowDetails}>
            전체 보기
          </CButton>
          <CButton color="info" variant="outline" size="sm" className="ml-1" onClick={toggleHideDetails}>
            전체 감추기
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={taskData}
            fields={fields}
            hover
            sorter
            scopedSlots={{
              show_details: (_item: any, index: number) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="info"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toggleDetails(index);
                      }}>
                      {details.includes(index) ? '감추기' : '보기'}
                    </CButton>
                  </td>
                );
              },
              details: (item: any, index: number) => {
                return (
                  <CCollapse show={details.includes(index)}>
                    <CCardBody>
                      <p className="text-muted">{item.link}</p>
                      <p className="text-muted">{item.contents}</p>
                      <CButton
                        size="sm"
                        color="info"
                        onClick={() => {
                          onEditButton(item.id);
                        }}>
                        수정
                      </CButton>

                      <CButton
                        size="sm"
                        color="danger"
                        className="ml-1"
                        onClick={() => {
                          onDeleteButton(item.id);
                        }}>
                        삭제
                      </CButton>
                    </CCardBody>
                  </CCollapse>
                );
              },
            }}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default TaskList;
