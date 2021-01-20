import React, { useState } from 'react';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import { DateRangePicker } from 'react-date-range';

import useTaskListByRangeDate from 'src/modules/common/hooks/api/useTaskListByRangeDate';
import useProjectList from 'src/modules/common/hooks/api/useProjectList';
import useCategoryList from 'src/modules/common/hooks/api/useCategoryList';

import { toYYYYMMDD } from 'src/modules/common/lib/util';

import TaskStatistics from './TaskStatistics';
import TaskSummary from './TaskSummary';

const Statistics: React.FC = () => {
  // project, category
  const [{ data: projects }] = useProjectList('');
  const [{ data: categories }] = useCategoryList('');

  const ranges = {
    startDate: new Date(),
    endDate: new Date(),
  };
  const [value, setChange] = useState(ranges);

  const onChangeRange = (ranges: any) => {
    setChange({ startDate: ranges.selection.startDate, endDate: ranges.selection.endDate });
  };

  // list
  const [{ data: tasks }] = useTaskListByRangeDate(toYYYYMMDD(value.startDate), toYYYYMMDD(value.endDate), '');

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardBody>
              <DateRangePicker
                ranges={[
                  {
                    startDate: value.startDate,
                    endDate: value.endDate,
                    key: 'selection',
                  },
                ]}
                onChange={onChangeRange}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" lg="12">
          <TaskStatistics
            title={`${toYYYYMMDD(value.startDate)} ~ ${toYYYYMMDD(value.endDate)} 업무 소요시간 통계`}
            projects={projects}
            categories={categories}
            tasks={tasks}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" lg="12">
          <TaskSummary
            titie={`${toYYYYMMDD(value.startDate)} ~ ${toYYYYMMDD(value.endDate)} 업무 요약`}
            projects={projects}
            categories={categories}
            tasks={tasks}
          />
        </CCol>
      </CRow>
    </>
  );
};

export default Statistics;
