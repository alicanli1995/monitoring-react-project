import feather from 'feather-icons';
import React, {useEffect, useState} from 'react';
import "../../css/sidebar.css";
import SwitchButton from "../../components/SwitchButton";
import services from "../../services";
import {confirm, successAlert, warningAlert} from "../Admin/js/attention";

function Sidebar(props) {
  const [showSidebar, setShowSidebar] = useState(true);
  const sidebarClass = showSidebar ? '' : 'closed';
  const [showMonitoring, setShowMonitoring] = useState(false);

  useEffect(() => {
    services.monitoringApiService.getSystemPref()
    .then((res) => {
      if (res.data.ok === true) {
        let monitoringLive = res.data.preferences?.filter(
            pref => pref.Name === "monitoring_live")[0].Preference
        setShowMonitoring(monitoringLive === "1")
      }
    }).catch((err) => {
      warningAlert(err.message)
    });

  }, []);

  const handleMonitoringChange = () => {
    document.getElementById("monitoring-live").addEventListener("change",
        function () {
          if (!showMonitoring) {
            confirm({
              html: "Are you sure you want to disable live monitoring?",
              callback: function (result) {
                if (result) {
                  updateSystemPref("monitoring_live", "1").then(() => {
                    toggleMonitoring(true).catch((err) => {
                      warningAlert(err.message)
                    });
                  })
                }
              }
            })
          } else {
            updateSystemPref("monitoring_live", "0").then(() => {
              toggleMonitoring(false).catch((err) => {
                warningAlert(err.message)
              });
            })
          }
        })
  };

  const updateSystemPref = async (prefName, prefValue) => {

    const body = {
      pref_name: prefName,
      pref_value: prefValue,
    }

    await services.monitoringApiService.updateSystemPref(body)
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

  const toggleMonitoring = async (param) => {
    setShowMonitoring(param)

    let body = {
      enabled: param,
    }
    await services.monitoringApiService.toggleMonitoring(body)
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
                       href="/hosts">
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
                        {props.children}
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