import { IProject } from 'src/@types';
import React, { useState } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton, CCollapse } from '@coreui/react';

type Props = {
  projects: IProject[];
  onEditButton: (projectId: number) => void;
  onDeleteButton: (projectId: number) => void;
};

const ProjectList: React.FC<Props> = ({ projects, onEditButton, onDeleteButton }) => {
  console.log('### projects : ', projects);
  const fields = [
    { key: 'name', _style: { width: '45%' } },
    { key: 'type', _style: { width: '15%' } },
    { key: 'startDate', _style: { width: '15%' } },
    { key: 'endDate', _style: { width: '15%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '10%' },
      sorter: false,
      filter: false,
    },
  ];

  const projectData = projects.map((project: IProject) => {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      type: project.type,
      startDate: project.startDate ? project.startDate : '-',
      endDate: project.endDate ? project.endDate : '-',
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

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>나의 프로젝트</CCardHeader>
            <CCardBody>
              <CDataTable
                items={projectData}
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
                          <p className="text-muted">{item.description}</p>
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
        </CCol>
      </CRow>
    </>
  );
};

export default ProjectList;
