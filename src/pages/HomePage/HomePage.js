import React, {useEffect, useState} from "react";
import "../Admin/css/app.css";
import services from "../../services";
import Pusher from "../Admin/js/pusher.min";
import {successAlert, warningAlert} from "../Admin/js/attention";

function HomePage() {
  const [hosts, setHosts] = useState([]);
  const [servicesCount, setServicesCount] = useState({
    healthy: 0,
    warning: 0,
    problem: 0,
    pending: 0,
  });
  const pusherKey = "abc123";

  useEffect(() => {
    let pusher = new Pusher(pusherKey, {
      authEndPoint: "/pusher/auth",
      wsHost: "localhost",
      wsPort: 4001,
      forceTLS: false,
      enabledTransports: ["ws", "wss"],
      disabledTransports: []
    });

    const publicChannel = pusher.subscribe("public-channel");

    publicChannel.bind("app-starting", function (data) {
      successAlert(data.message);

      console.log(data, "data")
    });

    publicChannel.bind("app-stopping", function (data) {
      warningAlert(data.message);

      // Rest of your logic for stopping app

      console.log(data, "data")
    });

    publicChannel.bind("schedule-changed-event", function (data) {
      // Handle schedule changes
    });

    publicChannel.bind("schedule-item-removed-event", function (data) {
      // Handle removed schedule items
    });

    publicChannel.bind("host-service-status-changed", function (data) {
      // Handle host-service status changes
    });

    publicChannel.bind("host-service-count-changed", function (data) {
      setServicesCount({
        healthy: data.healthy_count,
        warning: data.warning_count,
        problem: data.problem_count,
        pending: data.pending_count,
      })
    });

    return () => {
      // Cleanup code for when component unmounts
      pusher.disconnect();
    };
  }, []);

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
                  <span id="healthy_count"> {servicesCount.healthy} </span> Healthy
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
                  id="warning_count">{servicesCount.warning} </span> Warning
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
                                id="problem_count"> {servicesCount.problem} </span> Problem
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
                                id="pending_count"> {servicesCount.pending}  </span> Pending
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
                              <span className="badge bg-danger">Inactive</span>
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