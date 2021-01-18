import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react';

import CIcon from '@coreui/icons-react';

// sidebar nav config
import navigation from './_nav';
import Logo from 'src/layout/Logo';

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar show={show} onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}>
      <CSidebarBrand className="d-md-down-none" to="/">
        {/* <CIcon name="cil-task" className="mfe-2" /> */}
        <div className="c-sidebar-brand-full">
          <Logo width={40} height={40} />
          &nbsp;&nbsp;&nbsp;Developer's Today
        </div>
        <div className="c-sidebar-brand-minimized">
          <Logo width={40} height={40} />
        </div>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
