import React, {useEffect, useState} from "react";
import {dateFormatter} from "../../utils/utils";
import {successAlert, warningAlert} from "../../components/notify/attention";
import services from "../../services";

const ServiceTab = (props) => {
  const {status} = props;
  const [hostServices, setHostServices] = useState([]);

  useEffect(() => {
    let problemServices = props.host.HostServices?.filter(
        (service) => service.Status === status && service.Active === 1
    );
    setHostServices(problemServices);
  }, [props.host.HostServices, props.host, status]);

  const handleCheckNow = (index) => {
    services.monitoringApiService
    .checkNow(hostServices[index].ID, status)
    .then((res) => {
      if (res.data.ok === true) {
        successAlert("Service status is: " + res.data.new_status);
        services.monitoringApiService.fetchHost(props.host.ID).then((res) => {
          let services = res.data.host.HostServices.filter(
              (service) => service.Status === status
          );
          setHostServices(services);
        }).catch((err) => {
          warningAlert(err.message);
        });
      }
    })
    .catch((err) => {
      warningAlert(err.message);
    });
  };

  return (
      <>
        <div
            className="tab-pane fade"
            role="tabpanel"
            aria-labelledby={`${status}-tab`}
            id={`${status}-content`}
        >
          <div className="row">
            <div className="col">
              <h4 className="pt-3">
                {status.toUpperCase()} Services
              </h4>
              <table id={`${status}-table`} className="table table-striped">
                <thead>
                <tr>
                  <th>Service</th>
                  <th>Last Check</th>
                  <th>Message</th>
                </tr>
                </thead>
                <tbody>
                {hostServices && hostServices.length > 0 ? (
                    hostServices.map((hostService, index) => (
                        <>
                          {hostService.Active === 1 &&
                              <tr
                                  key={`host-service-${status}-${hostService.Service.ID}`}
                                  id={`host-service-${status}-${hostService.Service.ID}`}
                              >
                                <td>
                            <span
                                className={hostService.Service.Icon}></span>{" "}
                                  {hostService.Service.ServiceName}{" "}
                                  <span
                                      className="badge bg-info pointer align-middle"
                                      onClick={() => handleCheckNow(index)}
                                      style={{cursor: "pointer"}}
                                  >
                          Check Now
                        </span>
                                </td>
                                <td>
                                  {hostService.LastCheck
                                      ? dateFormatter(hostService.LastCheck)
                                      : "Pending..."}
                                </td>
                                <td></td>
                              </tr>
                          }
                        </>
                    ))
                ) : (
                    <tr>
                      <td colSpan="3">No Services</td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
  );
};

export default ServiceTab;
