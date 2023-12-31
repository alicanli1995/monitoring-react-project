import React, {useEffect, useState} from 'react';
import services from "../../services";
import {warningAlert} from "../../components/notify/attention";

function Hosts() {

  const [hosts, setHosts] = useState([]);

  useEffect(() => {
    services.monitoringApiService.fetchHosts().then((res) => {
      setHosts(res.data.hosts)
    }).catch((err) => {
      warningAlert(err.message)
    });
  }, []);

  return (
      <>
        <div className="row">
          <div className="col">
            <ol className="breadcrumb mt-1">
              <li className="breadcrumb-item"><a
                  href="/">Overview</a></li>
              <li className="breadcrumb-item active">Hosts</li>
            </ol>
            <h4 className="mt-4">Hosts</h4>
            <hr/>


            <div className="row">
              <div className="col">

                <div className="float-right">
                  <a className="btn btn-outline-secondary"
                     href="/host/0">New Host</a>
                </div>
                <div className="clearfix"></div>

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
                        <tr key={host.ID}>
                          <td><a href={'/host/' + host.ID}>{host.HostName}</a>
                          </td>
                          <td>
                            {host && host.HostServices?.map((hs) => {
                              return (
                                  <>
                                  <span
                                      className="badge bg-info">{hs.Service.ServiceName}
                                  </span>
                                  <>&nbsp;</>
                                  </>
                              )
                            })}
                          </td>
                          <td>{host.OS}</td>
                          <td>{host.Location}</td>
                          <td>
                            {host.Active === 1 ? <span
                                    className="badge bg-success">Active</span> :
                                <span
                                    className="badge bg-danger">Inactive</span>}
                          </td>
                        </tr>
                    )
                  }) : <tr>
                    <td colSpan={5}>No Data</td>
                  </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
  );

}

export default Hosts;