import { ITask } from 'src/@types/';
import { useState, useEffect } from 'react';
import TaskApi from '../../../work/api';

const useTaskListByRangeDate = (
  startDate: string,
  endDate: string,
  initialRefresh: string
): [{ data: ITask[]; isLoading: boolean; isError: boolean }, (refresh: string) => void] => {
  const [refresh, setRefresh] = useState(initialRefresh);
  const initialData: ITask[] = [];
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result: ITask[] = await TaskApi.listByRangeDate(startDate, endDate);

        setData(result);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [startDate, endDate, refresh]);

  return [{ data, isLoading, isError }, setRefresh];
};

export default useTaskListByRangeDate;
