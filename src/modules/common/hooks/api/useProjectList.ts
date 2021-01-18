import { IProject } from 'src/@types/';
import { useState, useEffect } from 'react';
import ProjectApi from '../../../project/api';

const useProjectList = (
  initialRefresh: string
): [{ data: IProject[]; isLoading: boolean; isError: boolean }, (refresh: string) => void] => {
  const [refresh, setRefresh] = useState(initialRefresh);
  const initialData: IProject[] = [];
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result: IProject[] = await ProjectApi.list();

        setData(result);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [refresh]);

  return [{ data, isLoading, isError }, setRefresh];
};

export default useProjectList;
