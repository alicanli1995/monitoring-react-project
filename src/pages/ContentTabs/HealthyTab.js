import {useEffect, useState} from "react";
import services from "../../services";
import {successAlert, warningAlert} from "../../partials/pusher-js/attention";
import {dateFormatter} from "../../utils/utils";

const HealthyTab = (props) => {

  const [hostServices, setHostServices] = useState([]);

  useEffect(() => {
    let healthyServices = props.host.HostServices?.filter(
        service => service.Status === "healthy")
    setHostServices(healthyServices);
  }, [props.host.HostServices, props.host]);

  const handleCheckNow = (index) => {
    services.monitoringApiService.checkNow(hostServices[index].ID,
        "healthy").then((res) => {
      if (res.data.ok === true) {
        successAlert("Service status is: " + res.data.new_status)
        services.monitoringApiService.fetchHost(props.host.ID).then((res) => {
          let services = res.data.host.HostServices.filter
          (service => service.Status === "healthy");
          setHostServices(services);
        }).catch((err) => {
          warningAlert(err.message)
        });
      }
    }).catch((err) => {
      warningAlert(err.message)
    });
  }

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
                    (hostService, index) => {
                      return (
                          <>
                            {hostService.Active === 1 &&
                                <tr id={'host-service-healthy-'
                                    + hostService.Service.ID}
                                    key={'host-service-healthy-'
                                        + hostService.Service.ID}>
                                  <td>
                                    <span
                                        className={hostService.Service.Icon}></span>
                                    {" " + hostService.Service.ServiceName
                                        + " "}
                                    <span
                                        className="badge bg-info pointer align-middle"
                                        onClick={() => handleCheckNow(index)}
                                        style={{cursor: "pointer"}}
                                    >Check Now</span>
                                  </td>
                                  <td>
                                    {hostService.LastCheck ? dateFormatter(
                                        hostService.LastCheck) : "Pending..."}
                                  </td>
                                  <td></td>
                                </tr>
                            }
                          </>
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