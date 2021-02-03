import { ITask, ICategory } from 'src/@types';
import React from 'react';
import _ from 'lodash';
import { CCard, CCardBody, CCardFooter, CCol, CRow, CProgress } from '@coreui/react';
import { CDataTable } from '@coreui/react';
import LineChart from 'src/modules/common/components/LineChart';
import useCategoryList from 'src/modules/common/hooks/api/useCategoryList';
import { groupBy } from 'src/modules/common/lib/summary';
import { getSpentTimeMinutes, minutes2HHMM, getRandomColor, hexToRgb, sortFunc } from 'src/modules/common/lib/util';

type Props = {
  tasks: ITask[];
  startDate: string;
  endDate: string;
};

const TrafficByCategory: React.FC<Props> = ({ tasks, startDate, endDate }) => {
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
  const [{ data: categories }] = useCategoryList('');
  const categoryMap = categories.reduce((acc: { [x: string]: ICategory }, category: ICategory) => {
    acc[category.id as number] = category;
    return acc;
  }, {});

  const byCategory = groupBy(tasks, 'categoryId');
  const minutesDatas = byCategory.reduce((acc: { [x: string]: any }, item) => {
    const hex = getRandomColor();
    const rgb = hexToRgb(hex);
    const rgbColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    const argbColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;
    const category = categoryMap[item.categoryId as string];
    acc[item.categoryId as string] = {
      name: category.name,
      description: category.description,
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
    const grouped = _.groupBy(item.data, 'categoryId');
    Object.keys(grouped).forEach((categoryId) => {
      const tasks = grouped[categoryId];
      const minutes = getSpentTimeMinutes(tasks);
      minutesDatas[categoryId as string].minutes[i] = minutes;
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
    { key: 'description', _style: { width: '30%' } },
    { key: 'spentTime', _style: { width: '30%' } },
  ];

  const categoryData = Object.keys(minutesDatas).map((categoryId) => {
    const data = minutesDatas[categoryId];
    const spentTime = data.minutes.reduce((acc: number, current: number) => acc + current, 0);
    return {
      id: categoryId,
      name: data.name,
      description: data.description,
      spentTime: spentTime,
      spentTimePercentile: (spentTime / totalMinutes) * 100,
      color: data.hexColor,
    };
  });

  categoryData.sort(sortFunc('spentTime', false));

  return (
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="5">
            <h4 id="traffic" className="card-title mb-0">
              카테고리별 업무 소요시간 추이
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
          items={categoryData}
          fields={fields}
          hover
          sorter
          scopedSlots={{
            color: (item: any) => {
              return <td style={{ backgroundColor: item.color }} className="py-2"></td>;
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

export default TrafficByCategory;
