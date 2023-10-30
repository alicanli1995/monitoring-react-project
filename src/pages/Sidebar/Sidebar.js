import feather from 'feather-icons';
import React, {useEffect, useState} from 'react';
import HomePage from "../HomePage/HomePage";
import "../../css/sidebar.css";
import SwitchButton from "../../components/SwitchButton";
import Pusher from "../Admin/js/pusher.min";
import services from "../../services";
import {confirm, successAlert, warningAlert} from "../Admin/js/attention";

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true);
  const sidebarClass = showSidebar ? '' : 'closed';
  const [showMonitoring, setShowMonitoring] = useState(false);
  const pusherKey = "abc123";

  const handleMonitoringChange = () => {
    document.getElementById("monitoring-live").addEventListener("change",
        function () {
          if (!showMonitoring) {
            confirm({
              html: "Are you sure you want to disable live monitoring?",
              callback: function (result) {
                if (result) {
                  updateSystemPref("monitoring_live", "0")
                  toggleMonitoring(true);
                }
              }
            })
          } else {
            updateSystemPref("monitoring_live", "1")
            toggleMonitoring(false);
          }
        })
  };

  const updateSystemPref = (prefName, prefValue) => {
  };

  const toggleMonitoring = (param) => {
    setShowMonitoring(param)

    let body = {
      enabled: param,
    }

    services.monitoringApiService.toggleMonitoring(body)
    .then((res) => {
      if (res.data.ok === true) {
        successAlert(res.data.message)
      } else {
        warningAlert(res.data.message)
      }
    }).catch((err) => {
      warningAlert(err.message)
    });
  };

  useEffect(() => {

  }, []);

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
      setShowMonitoring(true);
      successAlert(data.message);
    });

    publicChannel.bind("app-stopping", function (data) {
      warningAlert(data.message);
      setShowMonitoring(false);

      // Rest of your logic for stopping app
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
      // Handle host-service count changes
    });

    return () => {
      // Cleanup code for when component unmounts
      pusher.disconnect();
    };
  }, []);

  return (
      <>
        <div className="wrapper">
          {
            <nav id="sidebar" className={`mySlider ${sidebarClass}`}>
              <div className="sidebar-content js-simplebar">
                <a className="sidebar-brand text-center" href="/">
                <span className="align-middle">
                    <span className="fa fa-eye"
                          style={{marginLeft: '-0.7rem'}}
                    /> Observer
                </span>
                </a>

                <ul className="sidebar-nav">
                  <li className="sidebar-item">
                    <a className="sidebar-link"
                       href="/my-app/src/pages/Admin/overview">
                      <i className="align-middle"
                         dangerouslySetInnerHTML={{__html: feather.icons['compass'].toSvg()}}/>
                      <span
                          style={{marginLeft: '-0.7rem'}}
                          className="align-middle">Overview</span>
                    </a>
                  </li>

                  <li className="sidebar-item">
                    <a className="sidebar-link"
                       href="/my-app/src/pages/Admin/host/all">
                      <i className="align-middle"
                         dangerouslySetInnerHTML={{__html: feather.icons['server'].toSvg()}}/>
                      <span
                          style={{marginLeft: '-0.7rem'}}
                          className="align-middle">Hosts</span>
                    </a>
                  </li>

                  <li className="sidebar-item">
                    <a className="sidebar-link" href="/src/pages/Admin/events">
                      <i className="align-middle"
                         dangerouslySetInnerHTML={{__html: feather.icons['check-circle'].toSvg()}}/>
                      <span
                          style={{marginLeft: '-0.7rem'}}
                          className="align-middle">Events</span>
                    </a>
                  </li>

                  <li className="sidebar-item">
                    <a className="sidebar-link"
                       href="/src/pages/Admin/schedule">
                      <i className="align-middle"
                         dangerouslySetInnerHTML={{__html: feather.icons['calendar'].toSvg()}}/>
                      <span
                          style={{marginLeft: '-0.7rem'}}
                          className="align-middle">Schedule</span>
                    </a>
                  </li>

                  <li className="sidebar-item">
                    <a className="sidebar-link"
                       href="/src/pages/Admin/settings">
                      <i className="align-middle"
                         dangerouslySetInnerHTML={{__html: feather.icons['settings'].toSvg()}}/>
                      <span
                          style={{marginLeft: '-0.7rem'}}
                          className="align-middle">Settings</span>
                    </a>
                  </li>

                  <li className="sidebar-item">
                    <a className="sidebar-link" href="/src/pages/Admin/users">
                      <i className="align-middle"
                         dangerouslySetInnerHTML={{__html: feather.icons['users'].toSvg()}}/>
                      <span
                          style={{marginLeft: '-0.7rem'}}
                          className="align-middle">Users</span>
                    </a>
                  </li>

                  <li>
                    <hr/>
                  </li>

                  <li className="sidebar-item">
                    <a className="sidebar-link mb-2"
                       href="/user/logout">
                      <i className="align-middle"
                         dangerouslySetInnerHTML={{__html: feather.icons['log-out'].toSvg()}}/>
                      <span
                          style={{marginLeft: '-0.7rem'}}
                          className="align-middle">Logout</span>
                    </a>
                  </li>
                </ul>

              </div>
            </nav>
          }

          <div className="main">
            <nav className="navbar navbar-expand navbar-light navbar-bg">
              <a className="sidebar-toggle d-flex"
                 onClick={() => {
                   setShowSidebar(!showSidebar);
                 }}>
                <i className="hamburger align-self-center"/>
              </a>

              <div className="navbar-collapse collapse">
                <div
                    className={"form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0"}
                >
                  <SwitchButton
                      label="Monitoring"
                      checked={showMonitoring}
                      handleToggle={() => {
                        handleMonitoringChange()
                      }}
                  />
                </div>
              </div>
            </nav>

            <main className="content">
              <div className="container-fluid p-0">

                <div className="row">
                  <div className="col-12">
                    <div className="card">

                      <div className="card-body">
                        <HomePage/>
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
                        className="text-muted">Version 0.0.1</small>
                  </div>
                  <div className="col-6 text-right">
                    <p className="mb-0">
                      <a href="/" className="text-muted"><strong><span
                          className="fa fa-eye"></span> Observer</strong></a>
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

export default Sidebar;