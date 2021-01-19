import { useCallback, useState } from 'react';

export interface IReturnUseToggleFlags<T> {
  toggleFlags: T[];
  toggle: (id: T) => void;
  showAll: () => void;
  hideAll: () => void;
}

const useToggleFlags = <T>({
  initialValues,
  allValues,
}: {
  initialValues: T[];
  allValues: T[];
}): IReturnUseToggleFlags<T> => {
  const [toggleFlags, setToggleFlags] = useState(initialValues);

  const toggle = (id: T) => {
    setToggleFlags((prevToggleFlags) => {
      const position = prevToggleFlags.indexOf(id);
      let newToggleFlags = prevToggleFlags.slice();
      if (position !== -1) {
        newToggleFlags.splice(position, 1);
      } else {
        newToggleFlags = [...prevToggleFlags, id];
      }
      return newToggleFlags;
    });
  };

  const showAll = useCallback(() => {
    setToggleFlags(allValues);
  }, [allValues]);

  const hideAll = () => {
    setToggleFlags([]);
  };

  return {
    showAll,
    hideAll,
    toggle,
    toggleFlags,
  };
};

export default useToggleFlags;
