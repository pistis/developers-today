import { IProject } from 'src/@types';
import React from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton, CCollapse } from '@coreui/react';
import useToggleFlags, { IReturnUseToggleFlags } from 'src/modules/common/hooks/useToggleFlags';

type Props = {
  projects: IProject[];
  onEditButton: (projectId: number) => void;
  onDeleteButton: (projectId: number) => void;
};

const ProjectList: React.FC<Props> = ({ projects, onEditButton, onDeleteButton }) => {
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

  const allToggleFlags = projects.map((project: IProject) => project.id!);
  const { showAll, hideAll, toggle, toggleFlags }: IReturnUseToggleFlags<number> = useToggleFlags<number>({
    initialValues: [],
    allValues: allToggleFlags,
  });

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              나의 프로젝트
              <CButton color="info" variant="outline" size="sm" className="ml-1" onClick={showAll}>
                전체 보기
              </CButton>
              <CButton color="info" variant="outline" size="sm" className="ml-1" onClick={hideAll}>
                전체 감추기
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={projectData}
                fields={fields}
                hover
                sorter
                scopedSlots={{
                  show_details: (item: any) => {
                    return (
                      <td className="py-2">
                        <CButton
                          color="info"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toggle(item.id);
                          }}>
                          {toggleFlags.includes(item.id) ? '감추기' : '보기'}
                        </CButton>
                      </td>
                    );
                  },
                  details: (item: any) => {
                    return (
                      <CCollapse show={toggleFlags.includes(item.id)}>
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
