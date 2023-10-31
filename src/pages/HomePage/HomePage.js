import React, {useContext, useEffect, useState} from "react";
import "../Admin/css/app.css";
import services from "../../services";
import {warningAlert} from "../Admin/js/attention";
import {DataContext} from "../misc/DataContextProvider";

const HomePage = () => {
  const [hosts, setHosts] = useState([]);

  const {servicesCount} = useContext(DataContext)

  useEffect(() => {
    services.monitoringApiService.getAllHosts().then((res) => {
      if (res.data.ok === true) {
        setHosts(res.data.hosts)
      }
    }).catch((err) => {
      warningAlert(err.message)
    });
  }, []);

  return (
      <>
        <div className="row">
          <div className="col">
            <ol className="breadcrumb mt-1">
              <li className="breadcrumb-item active">Overview</li>
            </ol>
            <h4 className="mt-4">Services</h4>
            <hr/>
          </div>
        </div>

        <div className="row">

          <div className="col-xl-3 col-md-6">
            <div className="card border-success mb-4"
                 style={{
                   border: "1px solid red"
                 }}
            >
              <div className="card-body text-success">
                <span
                    id="healthy_count"> {servicesCount?.healthy} </span> Healthy
                service(s)
              </div>
              <div
                  className="card-footer d-flex align-items-center justify-content-between"
                  style={
                    {
                      padding: "0.75rem 1.25rem",
                      backgroundColor: "rgba(0, 0, 0, 0.03)",
                      borderTop: "1px solid rgba(0, 0, 0, 0.125)"
                    }
                  }
              >
                <a className="small text-success stretched-link"
                   href="/src/pages/Admin/all-healthy">View
                  Details</a>
                <div className="small text-success"><i
                    className="fas fa-angle-right"></i></div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card border-warning mb-4" style={
              {
                border: '1px solid orange',
              }
            }>
              <div className="card-body text-warning"><span
                  id="warning_count">{servicesCount?.warning} </span> Warning
                service(s)
              </div>
              <div
                  className="card-footer d-flex align-items-center justify-content-between"
                  style={
                    {
                      padding: "0.75rem 1.25rem",
                      backgroundColor: "rgba(0, 0, 0, 0.03)",
                      borderTop: "1px solid rgba(0, 0, 0, 0.125)"
                    }
                  }>
                <a className="small text-warning stretched-link"
                   href="/src/pages/Admin/all-warning">View
                  Details</a>
                <div className="small text-warning"><i
                    className="fas fa-angle-right"></i></div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card border-danger mb-4" style={
              {
                border: '1px solid red',
              }
            }>
              <div className="card-body text-danger">
                            <span
                                id="problem_count"> {servicesCount?.problem} </span> Problem
                service(s)
              </div>
              <div
                  className="card-footer d-flex align-items-center justify-content-between"
                  style={
                    {
                      padding: "0.75rem 1.25rem",
                      backgroundColor: "rgba(0, 0, 0, 0.03)",
                      borderTop: "1px solid rgba(0, 0, 0, 0.125)"
                    }
                  }>
                <a className="small text-danger stretched-link"
                   href="/src/pages/Admin/all-problems">View
                  Details</a>
                <div className="small text-danger"><i
                    className="fas fa-angle-right"></i></div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card border-secondary mb-4" style={
              {
                border: '1px solid black',
              }
            }>
              <div className="card-body text-dark">
                            <span
                                id="pending_count"> {servicesCount?.pending}  </span> Pending
                service(s)
              </div>
              <div
                  className="card-footer d-flex align-items-center justify-content-between"
                  style={
                    {
                      padding: "0.75rem 1.25rem",
                      backgroundColor: "rgba(0, 0, 0, 0.03)",
                      borderTop: "1px solid rgba(0, 0, 0, 0.125)"
                    }
                  }>
                <a className="small text-dark stretched-link"
                   href="/src/pages/Admin/all-pending">View
                  Details</a>
                <div className="small text-dark"><i
                    className="fas fa-angle-right"></i></div>
              </div>
            </div>
          </div>
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
                      <td><a
                          href={"/host/" + host.ID}>{host.HostName}</a>
                      </td>
                      <td>
                        <span
                            className="badge bg-info">{host.HostServices[0].Service.ServiceName}</span>
                      </td>
                      <td>{host.OS}</td>
                      <td>{host.Location}</td>
                      <td>
                        {
                          host.Active === 1 ?
                              <span className="badge bg-success">Active</span>
                              :
                              <span
                                  className="badge bg-danger">Inactive</span>
                        }
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
      </>
  );
}

export default HomePage;