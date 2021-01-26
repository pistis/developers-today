import React, { useState } from 'react';
import moment from 'moment';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import { Calendar, OnChangeProps } from 'react-date-range';
import WorkDetail from './WorkDetail';

const Work: React.FC = () => {
  const [value, setValue] = useState(new Date());

  const onChange = (range: OnChangeProps) => {
    setValue(range as Date);
  };
  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardBody>
              <Calendar date={value} onChange={onChange} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <WorkDetail date={moment(value).format('YYYY-MM-DD')} />
    </>
  );
};

export default Work;
