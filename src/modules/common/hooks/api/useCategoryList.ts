import { ICategory } from 'src/@types/';
import { useState, useEffect } from 'react';
import CategoryApi from '../../../category/api';

const useCategoryList = (
  initialRefresh: string
): [{ data: ICategory[]; isLoading: boolean; isError: boolean }, (refresh: string) => void] => {
  const [refresh, setRefresh] = useState(initialRefresh);
  const initialData: ICategory[] = [];
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result: ICategory[] = await CategoryApi.list();

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

export default useCategoryList;
