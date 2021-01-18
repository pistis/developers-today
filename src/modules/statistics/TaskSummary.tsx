import React, { useState } from 'react';
import { CCard, CCardBody, CButton, CCardHeader, CCollapse } from '@coreui/react';
import { groupBy } from 'src/modules/common/lib/summary';
import { getSpentTimeMinutes, minutes2HHMM } from 'src/modules/common/lib/util';

type Props = {
  titie: string;
  projects: any;
  categories: any;
  tasks: any;
};

const getSummaryView = (project: string, spentTime: number, _groupByCategory: any[]) => {
  return (
    <React.Fragment key={project}>
      <div>
        <h3>
          {project}({minutes2HHMM(spentTime)})
        </h3>
        {_groupByCategory.length && (
          <ul>
            {_groupByCategory.map(({ category, spentTime, tasks }) => {
              return (
                <li key={category}>
                  {category}({minutes2HHMM(spentTime)})
                  {tasks.length && (
                    <ul>
                      {tasks.map((task: any) => {
                        return (
                          <li key={task.title}>
                            {task.title}({minutes2HHMM(task.spentTime)})
                            <ul>
                              {!!task.links.length && (
                                <li>
                                  {task.links.length === 1 ? (
                                    task.links[0]
                                  ) : (
                                    <>
                                      {'링크'}
                                      <ul>
                                        {task.links.map((link: any, index: number) => {
                                          return <li key={index}>{link}</li>;
                                        })}
                                      </ul>
                                    </>
                                  )}
                                </li>
                              )}
                              {!!task.contents.length && (
                                <li>
                                  {task.contents.length === 1 ? (
                                    task.contents[0]
                                  ) : (
                                    <>
                                      {'내용'}
                                      <ul>
                                        {task.contents.map((contents: any, index: number) => {
                                          return <li key={index}>{contents}</li>;
                                        })}
                                      </ul>
                                    </>
                                  )}
                                </li>
                              )}
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </React.Fragment>
  );
};

const TaskSummary: React.FC<Props> = ({ titie, projects, categories, tasks }) => {
  const projectNames: any = projects.reduce((acc: any, project: any) => {
    acc[project.id] = project.name;
    return acc;
  }, {});

  const categoryNames: any = categories.reduce((acc: any, category: any) => {
    acc[category.id] = category.name;
    return acc;
  }, {});

  const totalSpentTime = getSpentTimeMinutes(tasks);
  const byProject = groupBy(tasks, 'projectId');

  const summary = byProject.map(({ projectId, data }) => {
    const byCategory = groupBy(data, 'categoryId');

    return {
      project: projectNames[`${projectId}`],
      spentTime: getSpentTimeMinutes(data),
      groupByCategory: byCategory.map(({ categoryId, data }) => {
        const byTitle = groupBy(data, 'title');
        const tasks = byTitle.map(({ title, data }) => {
          const links = data.filter(({ link }) => link).map(({ link }) => link);
          const contents = data.filter(({ contents }) => contents).map(({ contents }) => contents);
          return {
            title: title,
            spentTime: getSpentTimeMinutes(data),
            links: links,
            contents: contents,
          };
        });
        return {
          category: categoryNames[`${categoryId}`],
          spentTime: getSpentTimeMinutes(data),
          tasks: tasks,
        };
      }),
    };
  });
  console.log('TaskSummary data : ', summary);

  // summary
  const [summaryCollapse, setSummaryCollapse] = useState(false);
  const summaryToggle = (e: any) => {
    setSummaryCollapse(!summaryCollapse);
    e.preventDefault();
  };

  return (
    <CCard>
      <CCardHeader>
        {titie}
        <CButton color="info" variant="outline" size="sm" className="ml-1" onClick={summaryToggle}>
          {summaryCollapse ? '감추기' : '보기'}
        </CButton>
      </CCardHeader>
      <CCollapse show={summaryCollapse}>
        <CCardBody>
          <CCard>
            <CCardHeader>업무 요약 (총 {minutes2HHMM(totalSpentTime)})</CCardHeader>
            <CCardBody>
              {summary.length &&
                summary.map(({ project, spentTime, groupByCategory }) => {
                  return getSummaryView(project, spentTime, groupByCategory);
                })}
            </CCardBody>
          </CCard>
        </CCardBody>
      </CCollapse>
    </CCard>
  );
};

export default TaskSummary;
