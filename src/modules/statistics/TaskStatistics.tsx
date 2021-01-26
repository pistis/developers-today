import { IProject, ICategory, ITask } from 'src/@types';
import React, { useState } from 'react';
import { CCard, CCardBody, CButton, CCardHeader, CCollapse } from '@coreui/react';
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from '@coreui/react';
import StatisticsByProject from './StatisticsByProject';
import StatisticsByCategory from './StatisticsByCategory';
import StatisticsByTitle from './StatisticsByTitle';

type IProps = {
  title: string;
  projects: IProject[];
  categories: ICategory[];
  tasks: ITask[];
};

const TaskStatistics: React.FC<IProps> = ({ title, projects, categories, tasks }) => {
  const [collapse, setCollapse] = useState(false);
  const toggle = (e: React.MouseEvent<any>) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  return (
    <CCard>
      <CCardHeader>
        {title}
        <CButton color="info" variant="outline" size="sm" className="ml-1" onClick={toggle}>
          {collapse ? '감추기' : '보기'}
        </CButton>
      </CCardHeader>
      <CCollapse show={collapse}>
        <CCardBody>
          <CTabs activeTab="statistics-by-project">
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink data-tab="statistics-by-project">프로젝트</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="statistics-by-category">카테고리</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="statistics-by-title">이슈</CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane data-tab="statistics-by-project">
                <StatisticsByProject projects={projects} tasks={tasks} />
              </CTabPane>
              <CTabPane data-tab="statistics-by-category">
                <StatisticsByCategory categories={categories} tasks={tasks} />
              </CTabPane>
              <CTabPane data-tab="statistics-by-title">
                <StatisticsByTitle tasks={tasks} />
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCollapse>
    </CCard>
  );
};

export default TaskStatistics;
