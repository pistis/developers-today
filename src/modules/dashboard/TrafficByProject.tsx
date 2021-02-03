import { ITask, IProject } from 'src/@types';
import React from 'react';
import _ from 'lodash';
import { CCard, CCardBody, CCardFooter, CCol, CRow, CProgress } from '@coreui/react';
import { CDataTable } from '@coreui/react';
import LineChart from 'src/modules/common/components/LineChart';
import useProjectList from 'src/modules/common/hooks/api/useProjectList';
import { groupBy } from 'src/modules/common/lib/summary';
import { getSpentTimeMinutes, minutes2HHMM, getRandomColor, hexToRgb, sortFunc } from 'src/modules/common/lib/util';

type Props = {
  tasks: ITask[];
  startDate: string;
  endDate: string;
};

const TrafficByProject: React.FC<Props> = ({ tasks, startDate, endDate }) => {
  const byDate = groupBy(tasks, 'date').map((item) => {
    return {
      dateStr: item.date as string,
      data: item.data,
      dateMs: new Date(item.date as string).getTime(),
    };
  });
  byDate.sort(sortFunc('dateMs'));
  // console.log('byDate ', byDate);

  const labels = byDate.map((item) => item.dateStr);
  // Project
  const [{ data: projects }] = useProjectList('');
  const projectMap = projects.reduce((acc: { [x: string]: IProject }, project: IProject) => {
    acc[project.id as number] = project;
    return acc;
  }, {});

  const byProject = groupBy(tasks, 'projectId');
  const minutesDatas = byProject.reduce((acc: { [x: string]: any }, item) => {
    const hex = getRandomColor();
    const rgb = hexToRgb(hex);
    const rgbColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    const argbColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;
    const project = projectMap[item.projectId as string];
    acc[item.projectId as string] = {
      name: project.name,
      type: project.type,
      startDate: project.startDate,
      endDate: project.endDate,
      minutes: new Array(labels.length).fill(0),
      backgroundColor: argbColor,
      borderColor: rgbColor,
      pointHoverBackgroundColor: rgbColor,
      hexColor: hex,
    };
    return acc;
  }, {});

  let totalMinutes = 0;
  let maxMinutes = 0;
  byDate.forEach((item, i) => {
    const grouped = _.groupBy(item.data, 'projectId');
    Object.keys(grouped).forEach((projectId) => {
      const tasks = grouped[projectId];
      const minutes = getSpentTimeMinutes(tasks);
      minutesDatas[projectId as string].minutes[i] = minutes;
      totalMinutes += minutes;
      if (minutes > maxMinutes) {
        maxMinutes = minutes;
      }
    });
  });

  // console.log('totalMinutes', totalMinutes);
  // console.log('maxMinutes ', maxMinutes);
  // console.log('minutesDatas : ', minutesDatas);

  const fields = [
    { key: 'color', _style: { width: '10%' } },
    { key: 'name', _style: { width: '30%' } },
    { key: 'type', _style: { width: '10%' } },
    { key: 'period', _style: { width: '20%' } },
    { key: 'spentTime', _style: { width: '30%' } },
  ];

  const projectData = Object.keys(minutesDatas).map((projectId) => {
    const data = minutesDatas[projectId];
    const spentTime = data.minutes.reduce((acc: number, current: number) => acc + current, 0);
    return {
      id: projectId,
      name: data.name,
      type: data.type,
      startDate: data.startDate,
      endDate: data.endDate,
      spentTime: spentTime,
      spentTimePercentile: (spentTime / totalMinutes) * 100,
      color: data.hexColor,
    };
  });

  projectData.sort(sortFunc('spentTime', false));

  return (
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="5">
            <h4 id="traffic" className="card-title mb-0">
              프로젝트별 업무 소요시간 추이
            </h4>
          </CCol>
          <CCol sm="7" className="d-none d-md-block">
            {startDate} ~ {endDate}
          </CCol>
        </CRow>
        <div style={{ height: '300px', marginTop: '40px' }}>
          <LineChart height={300} labels={labels} maxMinutes={maxMinutes} minutesDatas={Object.values(minutesDatas)} />
        </div>
      </CCardBody>
      <CCardFooter>
        총 업무 소요시간 {minutes2HHMM(totalMinutes)}
        <CDataTable
          items={projectData}
          fields={fields}
          hover
          sorter
          scopedSlots={{
            color: (item: any) => {
              return <td style={{ backgroundColor: item.color }} className="py-2"></td>;
            },
            period: (item: any) => {
              return (
                <td className="py-2">
                  <div className="small text-muted">
                    {item.startDate ? item.startDate : '-'} ~ {item.endDate ? item.endDate : '-'}
                  </div>
                </td>
              );
            },
            spentTime: (item: any) => {
              return (
                <td className="py-2">
                  <div className="clearfix">
                    <div className="float-left">
                      <strong>{item.spentTimePercentile.toFixed(2)}%</strong>
                    </div>
                  </div>
                  <CProgress color="success" value={item.spentTimePercentile} className="progress-xs" />
                </td>
              );
            },
          }}
        />
      </CCardFooter>
    </CCard>
  );
};

export default TrafficByProject;
