import { ICategory } from 'src/@types/';
import React from 'react';
import { CCol } from '@coreui/react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { CForm, CFormGroup, CTextarea, CInput, CLabel } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import useForm, { IReturnUseForm } from 'src/modules/common/hooks/useForm';
import validate from './validate';
import CategoryApi from './api';

type CategoryEditorProps = {
  show: boolean;
  category?: ICategory | null;
  onUpdated: () => void;
  onHide: () => void;
};

const CategoryEditor: React.FC<CategoryEditorProps> = ({ show, category: updatingCategory, onUpdated, onHide }) => {
  const title = updatingCategory ? '카테고리 수정' : '카테고리 생성';
  const initialValues: ICategory = {
    name: '',
    description: '',
  };

  if (updatingCategory) {
    initialValues.name = updatingCategory.name;
    initialValues.description = updatingCategory.description;
  }

  const {
    values,
    errors,
    submitting,
    clear,
    handleChange,
    handleSubmit,
  }: IReturnUseForm<ICategory> = useForm<ICategory>({
    initialValues,
    onSubmit: async (values: ICategory) => {
      const category: ICategory = {
        name: values.name,
        description: values.description,
      };

      try {
        if (updatingCategory) {
          category.id = updatingCategory.id;
          await CategoryApi.update(category);
        } else {
          await CategoryApi.create(category);
        }

        clear();
        onUpdated();
      } catch (e) {
        alert(`카테고리 생성 오류 : ${e}`);
      }
    },
    validate,
  });

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
                <CLabel htmlFor="name">이름</CLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CInput
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="카테고리 이름을 입력하세요."
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
                  placeholder="카테고리 설명을 입력하세요."
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

export default CategoryEditor;
