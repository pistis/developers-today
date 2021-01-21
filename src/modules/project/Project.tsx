import { IProject } from 'src/@types';
import React, { useState } from 'react';
import { CCard, CCardBody, CCol, CRow, CButton } from '@coreui/react';

import ProjectList from './ProjectList';
import ProjectEditor from './ProjectEditor';
import useProjectList from 'src/modules/common/hooks/api/useProjectList';

import ProjectApi from './api';

const Project: React.FC = () => {
  // list
  const [{ data: projects }, setRefresh] = useProjectList('');
  const refresh = () => setRefresh(Date.now().toString());

  // edition
  const [updaterModal, setUpdaterModal] = useState(false);
  const [updatingProject, setUpdatingProject] = useState<IProject | null>(null);
  const editProject = (projectId: number) => {
    const project = projects.find((project: IProject) => {
      return project.id === projectId;
    });
    if (project) {
      setUpdatingProject(project);
    }
    setUpdaterModal(true);
  };

  // creation
  const [creatorModal, setCreatorModal] = useState(false);

  // deletion
  const deleteProject = async (projectId: number) => {
    if (!window.confirm('프로젝트를 삭제하면 삭제된 프로젝트의 통계 리포트를 영구적으로 볼 수 없습니다.')) {
      return;
    }
    try {
      await ProjectApi.delete(projectId);
      refresh();
    } catch (e) {
      alert(`Project 삭제 오류 : ${e}`);
    }
  };

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardBody>
              <CButton
                color="info"
                onClick={() => {
                  setCreatorModal(true);
                }}>
                프로젝트 생성
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <ProjectEditor
        show={creatorModal}
        onUpdated={() => {
          setCreatorModal(false);
          refresh();
        }}
        onHide={() => {
          setCreatorModal(false);
        }}
      />
      {updaterModal && (
        <ProjectEditor
          show={true}
          project={updatingProject}
          onUpdated={() => {
            setUpdaterModal(false);
            refresh();
          }}
          onHide={() => {
            setUpdaterModal(false);
          }}
        />
      )}

      {projects && <ProjectList projects={projects} onDeleteButton={deleteProject} onEditButton={editProject} />}
    </>
  );
};

export default Project;
