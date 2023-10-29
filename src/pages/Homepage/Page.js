import React from "react";
import "../../css/styles.css";
import "../Admin/css/app.css";

function Page() {
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
                <span id="healthy_count"> 0 </span> Healthy service(s)
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
                  id="warning_count"> 2 </span> Warning
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
                   href="/src/pages/Admin/all-warning">View Details</a>
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
                <span id="problem_count"> 2 </span> Problem
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
                   href="/src/pages/Admin/all-problems">View Details</a>
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
                    <span id="pending_count">
                    </span> 2 Pending service(s)
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
                   href="/src/pages/Admin/all-pending">View Details</a>
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
              <tr>
                <td><a href="/src/pages/Admin/host/{{.ID}}">HostName</a></td>
                <td>
                  <span className="badge bg-info">Service.ServiceName</span>
                </td>
                <td>OS</td>
                <td>Location</td>
                <td>
                  <span className="badge bg-success">Active</span>
                  <span className="badge bg-danger">Inactive</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
  );
}

export default Page;