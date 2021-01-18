import React, { useState } from 'react';
import moment from 'moment';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import WorkDetail from './WorkDetail';

const Work: React.FC = () => {
  const [value, setValue] = useState(new Date());

  const onChange = (date: Date | Date[]) => {
    setValue(date as Date);
  };
  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardBody>
              <Calendar onChange={onChange} value={value} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <WorkDetail date={moment(value).format('YYYY-MM-DD')} />
    </>
  );
};

export default Work;
