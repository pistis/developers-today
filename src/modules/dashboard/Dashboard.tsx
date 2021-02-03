import React, { useState } from 'react';
import { CCol, CRow, CCard, CCardBody } from '@coreui/react';
import { DateRangePicker } from 'react-date-range';
import moment from 'moment';
import useTaskListByRangeDate from 'src/modules/common/hooks/api/useTaskListByRangeDate';
import TrafficByProject from './TrafficByProject';
import TrafficByCategory from './TrafficByCategory';
import { toYYYYMMDD } from 'src/modules/common/lib/util';

const Dashboard: React.FC = () => {
  const now = new Date();
  const start = `${moment(now).format('YYYY-MM')}-01`;
  const end = `${moment(now).format('YYYY-MM')}-${moment(now).daysInMonth()}`;

  const ranges = {
    startDate: new Date(start),
    endDate: new Date(end),
  };

  const [value, setChange] = useState(ranges);

  const onChangeRange = (ranges: any) => {
    setChange({ startDate: ranges.selection.startDate, endDate: ranges.selection.endDate });
  };

  const [{ data }] = useTaskListByRangeDate(toYYYYMMDD(value.startDate), toYYYYMMDD(value.endDate), '');

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
          <TrafficByProject tasks={data} startDate={toYYYYMMDD(value.startDate)} endDate={toYYYYMMDD(value.endDate)} />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" lg="12">
          <TrafficByCategory tasks={data} startDate={toYYYYMMDD(value.startDate)} endDate={toYYYYMMDD(value.endDate)} />
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
