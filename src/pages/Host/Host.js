import {useEffect, useState} from "react";
import services from "../../services";
import {warningAlert} from "../Admin/js/attention";

function Host(props) {

  const [host, setHost] = useState({});

  useEffect(() => {
    services.monitoringApiService.fetchHost(props.match.params.hostId).then(
        (res) => {
          setHost(res.data.host)
          console.log(res.data.host, "host")
        }).catch((err) => {
      warningAlert(err.message)
    });
  }, []);

  return (
      <>
        <div className="row">
          <div className="col">
            <ol className="breadcrumb mt-1">
              <li className="breadcrumb-item"><a href="/overview">Overview</a>
              </li>
              <li className="breadcrumb-item"><a href="/hosts">Hosts</a></li>
              <li className="breadcrumb-item active">Host</li>
            </ol>
            <h4 className="mt-4">Host</h4>
            <hr/>
          </div>
        </div>


        <div className="row">
          <div className="col">

            <form method="post" action={"/admin/host/" + host.ID} noValidate
                  className="needs-validation"
                  id="host-form">

              <ul className="nav nav-tabs" id="host-tabs">
                <li className="nav-item">
                  <a className="nav-link active" href="#host-content"
                     data-target="" data-toggle="tab"
                     id="host-tab" role="tab">Host</a>
                </li>

                {host &&
                    <li className="nav-item">
                      <a className="nav-link" href="#services-content"
                         data-target="" data-toggle="tab"
                         id="services-tab" role="tab">Manage Services</a>
                    </li>
                }
                {host &&
                    <li className="nav-item">
                      <a className="nav-link" href="#healthy-content"
                         data-target=""
                         data-toggle="tab"
                         id="healthy-tab" role="tab">Healthy</a>
                    </li>
                }
                {host &&
                    <li className="nav-item">
                      <a className="nav-link" href="#warning-content"
                         data-target=""
                         data-toggle="tab"
                         id="warning-tab" role="tab">Warning</a>
                    </li>
                }

                {host &&
                    <li className="nav-item">
                      <a className="nav-link" href="#problem-content"
                         data-target=""
                         data-toggle="tab"
                         id="problem-tab" role="tab">Problems</a>
                    </li>
                }

                {host &&
                    <li className="nav-item">
                      <a className="nav-link" href="#pending-content"
                         data-target=""
                         data-toggle="tab"
                         id="pending-tab" role="tab">Pending</a>
                    </li>
                }
              </ul>

              <div className="tab-content" id="host-tab-content"
                   style={{minHeight: '55vh'}}>

                <div className="tab-pane fade show active" role="tabpanel"
                     aria-labelledby="host-tab"
                     id="host-content">
                  <div className="row">
                    <div className="col-md-6 col-xs-12">

                      <div className="mt-3 mb-3">
                        <label htmlFor="host_name" className="form-label">Host
                          Name</label>
                        <input required id="host_name" name="host_name"
                               value={host?.HostName ? host.HostName : ""}
                               type="text" className="form-control"/>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="canonical_name"
                               className="form-label">Canonical
                          Name</label>
                        <input required id="canonical_name"
                               name="canonical_name"
                               value={host?.CanonicalName ? host.CanonicalName
                                   : ""}
                               type="text"
                               className="form-control"/>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="url"
                               className="form-label">URL</label>
                        <input required id="url" name="url"
                               value={host?.URL ? host.URL : ""}
                               type="text"
                               className="form-control"/>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="ip" className="form-label">IP Address
                          (v4)</label>
                        <input id="ip" name="ip"
                               value={host?.IP ? host.IP : ""}
                               type="text"
                               className="form-control"/>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="ipv6" className="form-label">IP
                          Address
                          (v6)</label>
                        <input id="ipv6" name="ipv6"
                               value={host?.IPv6 ? host.IPv6 : ""}
                               type="text" className="form-control"/>
                      </div>
                    </div>

                    <div className="col-md-6 col-xs-12">
                      <div className="mt-3 mb-3">
                        <label htmlFor="location"
                               className="form-label">Location</label>
                        <input id="location" name="location"
                               value={host?.Location ? host.Location : ""}
                               type="text"
                               className="form-control"/>
                      </div>

                      <div className="mt-3 mb-3">
                        <label htmlFor="os" className="form-label">Operating
                          System</label>
                        <input id="os" name="os"
                               value={host?.OS ? host.OS : ""}
                               type="text"
                               className="form-control"/>
                      </div>

                      <div className="form-check form-switch">
                        <input className="form-check-input"
                               type="checkbox"
                               checked={host?.Active ? host.Active : ""}
                               id="active" name="active" value="1"/>
                        <label className="form-check-label"
                               htmlFor="active">Active</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <hr/>
                      <div className="btn-group dropend">
                        <button type="button"
                                className="btn btn-primary dropdown-toggle"
                                data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                          Save
                        </button>
                        <div className="dropdown-menu">
                          <a className="dropdown-item"
                             href="javascript:void(0);" onClick="saveClose()">Save
                            &amp;
                            Close</a>
                          <a className="dropdown-item"
                             href="javascript:void(0);"
                             onClick="val()">Save &amp;
                            Continue</a>
                        </div>
                      </div>

                      <a className="btn btn-info"
                         href="/hosts">Cancel</a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
  )

}

export default Host;