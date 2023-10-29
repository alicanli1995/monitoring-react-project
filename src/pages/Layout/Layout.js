import feather from 'feather-icons';
import React from 'react';
import Page from "../Homepage/Page";
import "../../css/styles.css";
import "../Admin/css/app.css";

function Layout() {
  return (
      <>
        <div className="wrapper">
          <nav id="sidebar" className="sidebar">
            <div className="sidebar-content js-simplebar">
              <a className="sidebar-brand text-center" href="/">
                <span className="align-middle">
                    <span className="fa fa-eye"></span> Vigilate
                </span>
              </a>

              <ul className="sidebar-nav">

                <li className="sidebar-item">
                  <a className="sidebar-link" href="/my-app/src/pages/Admin/overview">
                    <i className="align-middle"
                       dangerouslySetInnerHTML={{__html: feather.icons['compass'].toSvg()}}/>
                    <span
                        className="align-middle">Overview</span>
                  </a>
                </li>

                <li className="sidebar-item">
                  <a className="sidebar-link" href="/my-app/src/pages/Admin/host/all">
                    <i className="align-middle"
                       dangerouslySetInnerHTML={{__html: feather.icons['server'].toSvg()}}/>
                    <span
                        className="align-middle">Hosts</span>
                  </a>
                </li>

                <li className="sidebar-item">
                  <a className="sidebar-link" href="/src/pages/Admin/events">
                    <i className="align-middle"
                       dangerouslySetInnerHTML={{__html: feather.icons['check-circle'].toSvg()}}/>
                    <span
                        className="align-middle">Events</span>
                  </a>
                </li>

                <li className="sidebar-item">
                  <a className="sidebar-link" href="/src/pages/Admin/schedule">
                    <i className="align-middle"
                       dangerouslySetInnerHTML={{__html: feather.icons['calendar'].toSvg()}}/>
                    <span
                        className="align-middle">Schedule</span>
                  </a>
                </li>

                <li className="sidebar-item">
                  <a className="sidebar-link" href="/src/pages/Admin/settings">
                    <i className="align-middle"
                       dangerouslySetInnerHTML={{__html: feather.icons['settings'].toSvg()}}/>
                    <span
                        className="align-middle">Settings</span>
                  </a>
                </li>

                <li className="sidebar-item">
                  <a className="sidebar-link" href="/src/pages/Admin/users">
                    <i className="align-middle"
                       dangerouslySetInnerHTML={{__html: feather.icons['users'].toSvg()}}/>
                    <span
                        className="align-middle">Users</span>
                  </a>
                </li>

                <li>
                  <hr/>
                </li>

                <li className="sidebar-item">
                  <a className="sidebar-link" href="/user/logout">
                    <i className="align-middle"
                       dangerouslySetInnerHTML={{__html: feather.icons['log-out'].toSvg()}}/>
                    <span
                        className="align-middle">Logout</span>
                  </a>
                </li>

              </ul>

            </div>
          </nav>
          <div className="main">
            <nav className="navbar navbar-expand navbar-light navbar-bg">
              <a className="sidebar-toggle d-flex">
                <i className="hamburger align-self-center"></i>
              </a>

              <div className="navbar-collapse collapse">
                <form className="form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                  <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="monitoring-live1"
                        checked={true}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="monitoring-live1"
                    >
                      Monitoring
                    </label>
                  </div>
                </form>
              </div>
            </nav>

            <main className="content">
              <div className="container-fluid p-0">

                <div className="row">
                  <div className="col-12">
                    <div className="card">

                      <div className="card-body">
                        <Page/>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </main>

            <footer className="footer">
              <div className="container-fluid">
                <div className="row text-muted">
                  <div className="col-6 text-left">
                    <small
                        className="text-muted">Version 2</small>
                  </div>
                  <div className="col-6 text-right">
                    <p className="mb-0">
                      <a href="/" className="text-muted"><strong><span
                          className="fa fa-eye"></span> Vigilate</strong></a>
                    </p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </>
  );
}

export default Layout;