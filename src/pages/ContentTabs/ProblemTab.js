import {useEffect, useState} from "react";
import {dateFormatter} from "../../utils/utils";
import services from "../../services";
import {successAlert, warningAlert} from "../Admin/js/attention";

const ProblemTab = (props) => {

  const [hostServices, setHostServices] = useState([]);

  useEffect(() => {
    let problemServices = props.host.HostServices?.filter(
        service => service.Status === "problem")
    setHostServices(problemServices);
  }, [props.host.HostServices, props.host]);

  const handleCheckNow = (index) => {
    services.monitoringApiService.checkNow(hostServices[index].ID,
        "problem").then((res) => {
      if (res.data.ok === true) {
        successAlert("Service status is: " + res.data.new_status)
        services.monitoringApiService.fetchHost(props.host.ID).then((res) => {
          let services = res.data.host.HostServices.filter
          (service => service.Status === "problem");
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
             aria-labelledby="problem-tab"
             id="problem-content">
          <div className="row">
            <div className="col">
              <h4 className="pt-3">Problem Services</h4>
              <table id="problem-table" className="table table-striped">
                <thead>
                <tr>
                  <th>Service</th>
                  <th>Last Check</th>
                  <th>Message</th>
                </tr>
                </thead>
                <tbody>
                {hostServices && (hostServices.length > 0 ? hostServices
                .map((hostService, index) => {
                  return (
                      <tr id={'host-service-' + hostService.Service.ID}
                          key={'host-service-' + hostService.Service.ID}>
                        <td>
                          <span className={hostService.Service.Icon}></span>
                          {" " + hostService.Service.ServiceName + " "}
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
                      </tr>)
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

export default ProblemTab