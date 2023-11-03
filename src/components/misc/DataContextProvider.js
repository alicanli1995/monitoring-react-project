import {createContext, useEffect, useState} from "react";
import services from "../../Services";
import {warningAlert} from "../../pages/Admin/js/attention";

export const DataContext = createContext();

function DataContextProvider(props) {
  const [servicesCount, setServicesCount] = useState({});

  useEffect(() => {
    services.monitoringApiService.getAllHosts().then((res) => {
      if (res.data.ok === true) {
        setServicesCount({
          healthy: res.data.healthy,
          warning: res.data.warning,
          problem: res.data.problem,
          pending: res.data.pending,
        })
      }
    }).catch((err) => {
      warningAlert(err.message)
    });
  }, []);

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