import React, { createContext, useState, ReactNode, useContext } from 'react';

type FilterContextData = {
  filterName: string;
  filterTemp: number[];
  filterPh: number[];
  filterDgh: number[];
  filterSal: number[];
  filterPositions: string[];
  filterIsFriendlyOthers: boolean;
  filterIsFriendly: boolean;
  toggleFriendlyOthers: (boolean) => void;
  toggleFriendly: (boolean) => void;
  changeFilterName: (filterNome: string) => void;
  changeFilterTemp: (filterTemp: number[]) => void;
  changeFilterPh: (filterPh: number[]) => void;
  changeFilterDgh: (filterDgh: number[]) => void;
  changeFilterSal: (filterSal: number[]) => void;
  changeFilterPositions: (filterPositions: string[]) => void;
};

export const FilterContext = createContext({} as FilterContextData);

type FilterContextProviderProps = {
  children: ReactNode
}

export function FilterContextProvider({ children }: FilterContextProviderProps) {
  const [filterName, setFilterName] = useState('');
  const [filterTemp, setFilterTemp] = useState([0, 30]);
  const [filterPh, setFilterPh] = useState([0, 14]);
  const [filterDgh, setFilterDgh] = useState([0, 25]);
  const [filterSal, setFilterSal] = useState([0, 33]);
  const [filterPositions, setFilterPositions] = useState([]);
  const [filterIsFriendly, setFilterFriendly] = useState(false);
  const [filterIsFriendlyOthers, setFilterFriendlyOthers] = useState(false);

  function toggleFriendly(filterFriendly: boolean) {
    setFilterFriendly(!filterFriendly);
  }
  function toggleFriendlyOthers(filterFriendlyOthers: boolean) {
    setFilterFriendlyOthers(!filterFriendlyOthers);
  }
  function changeFilterName(filterName: string) {
    setFilterName(filterName);
  }
  function changeFilterTemp(filterTemp: number[]) {
    setFilterTemp(filterTemp);
  }
  function changeFilterPh(filterPh: number[]) {
    setFilterPh(filterPh);
  }
  function changeFilterDgh(filterDgh: number[]) {
    setFilterDgh(filterDgh);
  }
  function changeFilterSal(filterSal: number[]) {
    setFilterSal(filterSal);
  }
  function changeFilterPositions(filterPositions: string[]) {
    setFilterPositions(filterPositions);
  }

  return (
    <FilterContext.Provider
      value={{
        filterName,
        filterTemp,
        filterPh,
        filterDgh,
        filterSal,
        filterPositions,
        filterIsFriendlyOthers,
        filterIsFriendly,
        toggleFriendlyOthers,
        toggleFriendly,
        changeFilterName,
        changeFilterTemp,
        changeFilterPh,
        changeFilterDgh,
        changeFilterSal,
        changeFilterPositions,
      }}>
      { children}
    </ FilterContext.Provider>
  )
}

export const useFilter = () => {
  return useContext(FilterContext);
}