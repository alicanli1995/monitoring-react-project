import {useEffect, useState} from "react";

const HealthyTab = (props) => {

  const [hostServices, setHostServices] = useState([]);

  useEffect(() => {
    setHostServices(props.host.HostServices);
  }, [props.host.HostServices, props.host]);

  return (
      <>
        <div className="tab-pane fade" role="tabpanel"
             aria-labelledby="healthy-tab"
             id="healthy-content">
          <div className="row">
            <div className="col">
              <h4 className="pt-3">Healthy Services</h4>
              <table id="healthy-table" className="table table-striped">
                <thead>
                <tr>
                  <th>Service</th>
                  <th>Last Check</th>
                  <th>Message</th>
                </tr>
                </thead>
                <tbody>
                {hostServices && (hostServices.length > 0 ? hostServices.map(
                    (hostService) => {
                      return (
                          <tr key={hostService.ID}>
                            <td>
                              <span className={hostService.Service.Icon}></span>
                              {" " + hostService.Service.ServiceName + " "}
                              <span
                                  className="badge bg-info pointer align-middle"
                                  >Check Now</span>
                            </td>
                            <td>
                              Pending...
                            </td>
                            <td></td>
                          </tr>
                      )
                    }) : <tr>
                  <td colSpan="3">No Services</td>
                </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
  )

}

export default HealthyTab