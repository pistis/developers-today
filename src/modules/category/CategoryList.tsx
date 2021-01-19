import { ICategory } from 'src/@types';
import React from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton, CCollapse } from '@coreui/react';
import useToggleFlags, { IReturnUseToggleFlags } from 'src/modules/common/hooks/useToggleFlags';

type Props = {
  categories: ICategory[];
  onEditButton: (projectId: number) => void;
  onDeleteButton: (projectId: number) => void;
};

const CategoryList: React.FC<Props> = ({ categories, onEditButton, onDeleteButton }) => {
  const fields = [
    { key: 'name', _style: { width: '45%' } },
    { key: 'description', _style: { width: '45%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '10%' },
      sorter: false,
      filter: false,
    },
  ];

  const categoryData = categories.map((category: ICategory) => {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
    };
  });

  const allToggleFlags = categories.map((category: ICategory) => category.id!);
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
              나의 카테고리
              <CButton color="info" variant="outline" size="sm" className="ml-1" onClick={showAll}>
                전체 보기
              </CButton>
              <CButton color="info" variant="outline" size="sm" className="ml-1" onClick={hideAll}>
                전체 감추기
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={categoryData}
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

export default CategoryList;
