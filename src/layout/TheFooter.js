import React from 'react';
import { CFooter } from '@coreui/react';

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://github.com/pistis/developers-today" target="_blank" rel="noopener noreferrer">
          Developer's Today
        </a>
        <span className="ml-1">&copy; 2021 AbumSoft.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          CoreUI for React
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
