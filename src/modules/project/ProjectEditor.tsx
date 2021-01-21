import { IProject, PROJECT_TYPE } from 'src/@types/';
import React from 'react';
import { CCol } from '@coreui/react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { CForm, CFormGroup, CTextarea, CInput, CLabel, CSelect } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import useForm, { IReturnUseForm } from 'src/modules/common/hooks/useForm';
import validate from './validate';
import ProjectApi from './api';

type ProjectEditorProps = {
  show: boolean;
  project?: IProject | null;
  onUpdated: () => void;
  onHide: () => void;
};

const ProjectEditor: React.FC<ProjectEditorProps> = ({ show, project: updatingProject, onUpdated, onHide }) => {
  const title = updatingProject ? '프로젝트 수정' : '프로젝트 생성';
  const initialValues: IProject = {
    name: '',
    description: '',
    type: PROJECT_TYPE.PRODUCT,
    startDate: '',
    endDate: '',
  };

  if (updatingProject) {
    initialValues.name = updatingProject.name;
    initialValues.description = updatingProject.description;
    initialValues.type = updatingProject.type;
    if (updatingProject.startDate) {
      initialValues.startDate = updatingProject.startDate;
    }
    if (updatingProject.endDate) {
      initialValues.endDate = updatingProject.endDate;
    }
  }

  const { values, errors, submitting, clear, handleChange, handleSubmit }: IReturnUseForm<IProject> = useForm<IProject>(
    {
      initialValues,
      onSubmit: async (values: IProject) => {
        const project: IProject = {
          name: values.name,
          description: values.description,
          type: values.type,
        };
        if (values.startDate) {
          project.startDate = values.startDate;
        }
        if (values.endDate) {
          project.endDate = values.endDate;
        }

        try {
          if (updatingProject) {
            project.id = updatingProject.id;
            await ProjectApi.update(project);
          } else {
            await ProjectApi.create(project);
          }

          clear();
          onUpdated();
        } catch (e) {
          alert(`프로젝트 생성 오류 : ${e}`);
        }
      },
      validate,
    }
  );

  return (
    <>
      <CModal show={show} onClose={onHide} centered>
        <CForm
          onSubmit={handleSubmit}
          action=""
          method="post"
          encType="multipart/form-data"
          className="form-horizontal"
          noValidate>
          <CModalHeader closeButton>
            <CModalTitle>{title}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="type">타입</CLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CSelect name="type" value={values.type} onChange={handleChange}>
                  <option value="PRODUCT">PRODUCT</option>
                  <option value="TEAM">TEAM</option>
                  <option value="PERSONAL">PERSONAL</option>
                  <option value="ETC">ETC</option>
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="startDate">시작 일자</CLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CInput
                  type="date"
                  name="startDate"
                  value={values.startDate}
                  onChange={handleChange}
                  placeholder="date"
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="endDate">종료 일자</CLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CInput type="date" name="endDate" value={values.endDate} onChange={handleChange} placeholder="date" />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="name">이름</CLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CInput
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="프로젝트 이름을 입력하세요."
                />
                {errors.name && <span className="errorMessage">{errors.name}</span>}
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="description">설명</CLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CTextarea
                  name="description"
                  value={values.description}
                  rows={9}
                  onChange={handleChange}
                  placeholder="프로젝트 설명을 입력하세요."
                />
                {errors.description && <span className="errorMessage">{errors.description}</span>}
              </CCol>
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton type="submit" size="sm" color="primary" disabled={submitting}>
              <CIcon name="cil-scrubber" /> 저장
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  );
};

export default ProjectEditor;
