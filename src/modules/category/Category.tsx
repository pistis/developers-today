import { ICategory } from 'src/@types';
import React, { useState } from 'react';
import { CCard, CCardBody, CCol, CRow, CButton } from '@coreui/react';

import CategoryList from './CategoryList';
import CategoryEditor from './CategoryEditor';
import useCategoryList from 'src/modules/common/hooks/api/useCategoryList';

import CategoryApi from './api';

const Category: React.FC = () => {
  // list
  const [{ data: categories }, setRefresh] = useCategoryList('');
  const refresh = () => setRefresh(Date.now().toString());

  // edition
  const [updaterModal, setUpdaterModal] = useState(false);
  const [updatingCategory, setUpdatingCategory] = useState<ICategory | null>(null);
  const editCategory = (categoryId: number) => {
    const category = categories.find((category: ICategory) => {
      return category.id === categoryId;
    });
    if (category) {
      setUpdatingCategory(category);
    }
    setUpdaterModal(true);
  };

  // creation
  const [creatorModal, setCreatorModal] = useState(false);

  // deletion
  const deleteCategory = async (categoryId: number) => {
    if (!window.confirm('카테고리를 삭제하면 삭제된 카테고리의 통계 리포트를 영구적으로 볼 수 없습니다.')) {
      return;
    }
    try {
      await CategoryApi.delete(categoryId);
      refresh();
    } catch (e) {
      alert(`Category 삭제 오류 : ${e}`);
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
                카테고리 생성
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CategoryEditor
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
        <CategoryEditor
          show={true}
          category={updatingCategory}
          onUpdated={() => {
            setUpdaterModal(false);
            refresh();
          }}
          onHide={() => {
            setUpdaterModal(false);
          }}
        />
      )}

      {categories && (
        <CategoryList categories={categories} onDeleteButton={deleteCategory} onEditButton={editCategory} />
      )}
    </>
  );
};

export default Category;
