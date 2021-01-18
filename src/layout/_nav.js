import React from 'react';
import CIcon from '@coreui/icons-react';

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: '프로젝트',
    to: '/project',
    icon: 'cil-list',
  },
  {
    _tag: 'CSidebarNavItem',
    name: '카테고리',
    to: '/category',
    icon: 'cil-tags',
  },
  {
    _tag: 'CSidebarNavItem',
    name: '업무',
    to: '/work',
    icon: 'cil-task',
  },
  {
    _tag: 'CSidebarNavItem',
    name: '통계',
    to: '/statistics',
    icon: 'cil-bookmark', // TODO : icon 선택
  },
  {
    _tag: 'CSidebarNavItem',
    name: '즐겨찾기',
    to: '/bookmarks',
    icon: 'cil-bookmark',
  },
  {
    _tag: 'CSidebarNavItem',
    name: '설정',
    to: '/settings',
    icon: 'cil-settings',
  },
];

export default _nav;
