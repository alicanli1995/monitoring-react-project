import React, {useContext, useEffect, useState} from "react";
import "../../style/app.css";
import services from "../../services";
import {warningAlert} from "../../components/notify/attention";
import {DataContext} from "../../components/misc/DataContextProvider";
import HomepageStatus from "../../components/cards/HomepageStatus";

const Home = () => {
  const [hosts, setHosts] = useState([]);
  const {servicesCount, setServicesCount} = useContext(DataContext)

  const statusArray = ["healthy", "warning", "problem", "pending"]

  useEffect(() => {
    services.monitoringApiService.getAllHosts().then((res) => {
      if (res.data.ok === true) {
        setHosts(res.data.hosts)
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
      <>
        <div className="row">
          <div className="col">
            <ol className="breadcrumb">
              <li className="breadcrumb-item active">Overview</li>
            </ol>
            <h4 className="mt-4">Services</h4>
            <hr/>
          </div>
        </div>

        <div className="row">
          {statusArray.map((status) => {
            return (<div className="col-xl-3 col-md-6">
              <HomepageStatus status={status}
                              servicesCount={servicesCount}/>
            </div>)
          })}
        </div>

        <div className="row">
          <div className="col">
            <h3>Hosts</h3>

            <table className="table table-condensed table-striped">
              <thead>
              <tr>
                <th>Host</th>
                <th>Services</th>
                <th>OS</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
              </thead>
              <tbody>
              {hosts && (hosts.length > 0 ? hosts.map((host) => {
                        return (
                            <tr key={'host-' + host.id}>
                              <td>
                                <a href={"/host/" + host.ID}>{host.HostName}</a>
                              </td>
                              <td>
                                {host.HostServices.map((hostService) => {
                                  return (
                                      <>
                                      <span className="badge bg-info ml-1">
                                        {hostService.Service.ServiceName}
                                      </span>
                                        <>&nbsp;</>
                                      </>
                                  )
                                })}
                              </td>
                              <td>{host.OS}</td>
                              <td>{host.Location}</td>
                              <td>
                                {host.Active === 1 ?
                                    <span className="badge bg-success">Active</span>
                                    :
                                    <span
                                        className="badge bg-danger">Inactive</span>}
                              </td>
                            </tr>
                        )
                      }) :
                      <tr>
                        <td colSpan={5}>No Data</td>
                      </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      </>
  );
}

export default Home;