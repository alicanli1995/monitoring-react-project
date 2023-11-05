import {createContext, useState} from "react";

export const DataContext = createContext();

function DataContextProvider(props) {
  const [servicesCount, setServicesCount] = useState({
    healthy: 0,
    warning: 0,
    problem: 0,
    pending: 0,
  });

  return (
      <DataContext.Provider value={{
        servicesCount: servicesCount,
        setServicesCount: setServicesCount
      }}>
        {props.children}
      </DataContext.Provider>
  );
}

export default DataContextProvider;