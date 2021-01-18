import { IProject, ICategory, ITask } from 'src/@types';
import React, { useState } from 'react';
import { CCard, CCardBody, CButton, CCardHeader, CCollapse } from '@coreui/react';
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from '@coreui/react';
import { CChartPie } from '@coreui/react-chartjs';
import { projectStatistics, categoryStatistics, titleStatistics } from 'src/modules/common/lib/statistics';
import { minutes2HHMM, getRandomColor } from 'src/modules/common/lib/util';

type Props = {
  title: string;
  projects: IProject[];
  categories: ICategory[];
  tasks: ITask[];
};

const TaskStatistics: React.FC<Props> = ({ title, projects, categories, tasks }) => {
  const { projectTotalSpentMinutes, projectGroupTasks } = projectStatistics(projects, tasks);
  const { categoryTotalSpentMinutes, categoryGroupTasks } = categoryStatistics(categories, tasks);
  const { titleTotalSpentMinutes, titleGroupTasks } = titleStatistics(tasks);

  // // for project
  const projectChartData = {
    datasets: [
      {
        backgroundColor: projectGroupTasks.map(() => getRandomColor()),
        data: projectGroupTasks.map(({ minutes }) => minutes),
      },
    ],
    labels: projectGroupTasks.map(({ name, minutes }) => `${name}: ${minutes2HHMM(minutes)}`),
    options: {
      tooltips: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem: any, data: any) {
            return data.labels[tooltipItem.index];
          },
        },
      },
    },
  };

  // for category
  const categoryChartData = {
    datasets: [
      {
        backgroundColor: categoryGroupTasks.map(() => getRandomColor()),
        data: categoryGroupTasks.map(({ minutes }) => minutes),
      },
    ],
    labels: categoryGroupTasks.map(({ name, minutes }) => `${name}: ${minutes2HHMM(minutes)}`),
    options: {
      tooltips: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem: any, data: any) {
            return data.labels[tooltipItem.index];
          },
        },
      },
    },
  };

  // for title
  const titleChartData = {
    datasets: [
      {
        backgroundColor: titleGroupTasks.map(() => getRandomColor()),
        data: titleGroupTasks.map(({ minutes }) => minutes),
      },
    ],
    labels: titleGroupTasks.map(({ name, minutes }) => `${name}: ${minutes2HHMM(minutes)}`),
    options: {
      tooltips: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem: any, data: any) {
            return data.labels[tooltipItem.index];
          },
        },
      },
    },
  };

  // summary
  const [summaryCollapse, setSummaryCollapse] = useState(false);
  const summaryToggle = (e: React.MouseEvent<any>) => {
    setSummaryCollapse(!summaryCollapse);
    e.preventDefault();
  };

  return (
    <CCard>
      <CCardHeader>
        {title}
        <CButton color="info" variant="outline" size="sm" className="ml-1" onClick={summaryToggle}>
          {summaryCollapse ? '감추기' : '보기'}
        </CButton>
      </CCardHeader>
      <CCollapse show={summaryCollapse}>
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
                <CCard>
                  <CCardHeader>프로젝트별 업무 소요시간 (총 {minutes2HHMM(projectTotalSpentMinutes)})</CCardHeader>
                  <CCardBody>
                    {projectTotalSpentMinutes ? (
                      <CChartPie
                        datasets={projectChartData.datasets}
                        labels={projectChartData.labels}
                        options={projectChartData.options}
                      />
                    ) : (
                      '-'
                    )}
                  </CCardBody>
                </CCard>
              </CTabPane>
              <CTabPane data-tab="statistics-by-category">
                <CCard>
                  <CCardHeader>카테고리별 업무 소요시간 (총 {minutes2HHMM(categoryTotalSpentMinutes)})</CCardHeader>
                  <CCardBody>
                    {categoryTotalSpentMinutes ? (
                      <CChartPie
                        datasets={categoryChartData.datasets}
                        labels={categoryChartData.labels}
                        options={categoryChartData.options}
                      />
                    ) : (
                      '-'
                    )}
                  </CCardBody>
                </CCard>
              </CTabPane>
              <CTabPane data-tab="statistics-by-title">
                <CCard>
                  <CCardHeader>이슈별 업무 소요시간 (총 {minutes2HHMM(titleTotalSpentMinutes)})</CCardHeader>
                  <CCardBody>
                    {titleTotalSpentMinutes ? (
                      <CChartPie
                        datasets={titleChartData.datasets}
                        labels={titleChartData.labels}
                        options={titleChartData.options}
                      />
                    ) : (
                      '-'
                    )}
                  </CCardBody>
                </CCard>
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCollapse>
    </CCard>
  );
};

export default TaskStatistics;
