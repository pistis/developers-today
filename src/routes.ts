import React from 'react';

const Dashboard = React.lazy(() => import('./modules/dashboard/Dashboard'));
const Project = React.lazy(() => import('./modules/project/Project'));
const Category = React.lazy(() => import('./modules/category/Category'));
const Work = React.lazy(() => import('./modules/work/Work'));
const Statistics = React.lazy(() => import('./modules/statistics/Statistics'));
const ComingSoon = React.lazy(() => import('./modules/ComingSoon'));

const routes = [
  { path: '/', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/project', name: 'Project', component: Project },
  { path: '/category', name: 'Category', component: Category },
  { path: '/work', name: 'Work', component: Work },
  { path: '/statistics', name: 'Statistics', component: Statistics },
  { path: '/bookmarks', name: 'Bookmarks', component: ComingSoon },
  { path: '/settings', name: 'Settings', component: ComingSoon },
];

export default routes;
