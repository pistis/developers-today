import { useHistory } from 'react-router-dom';

const usePageRoute = () => {
  const history = useHistory();
  return history;
};

export default usePageRoute;
