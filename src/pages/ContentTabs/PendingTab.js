import {useEffect, useState} from "react";
import {dateFormatter} from "../../Utils/utils";
import {warningAlert} from "../Admin/js/attention";
import services from "../../Services";

const PendingTab = (props) => {

  const [hostServices, setHostServices] = useState([]);

  useEffect(() => {
    let problemServices = props.host.HostServices?.filter(
        service => service.Status === "pending")
    setHostServices(problemServices);
  }, [props.host.HostServices, props.host]);

  const handleCheckNow = (e) => {
    // services.monitoringApiService.handleCheckNow(hostServices.ID, "pending").then(
    //     (res) => {
    //       console.log(res)
    //     }).catch((err) => {
    //   warningAlert(err.message)
    // });
    // fetch(`/admin/perform-check/${id}/${oldStatus}`, {
    //   method: "GET",
    // }).then(response => response.json())
    // .then(data => {
    //   if (data.ok === true) {
    //     if (data.old_status !== data.new_status) {
    //       attention.toast({
    //         msg: data.message,
    //         icon: "info",
    //         timer: 60000,
    //         showCloseButton: true,
    //       })
    //     } else {
    //       attention.toast({
    //         msg: "Service is still " + data.old_status,
    //         icon: "info",
    //         timer: 5000,
    //         showCloseButton: true,
    //       })
    //     }
    //   } else {
    //     errorAlert("Error: " + data.error);
    //   }
    // })
  }

  return (
      <>
        <div className="tab-pane fade" role="tabpanel"
             aria-labelledby="pending-tab"
             id="pending-content">
          <div className="row">
            <div className="col">
              <h4 className="pt-3">Pending Services</h4>
              <table id="pending-table" className="table table-striped">
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
                                  onClick={(e) => handleCheckNow(e)}
                              >Check Now</span>
                            </td>
                            <td>
                              {
                                hostService.LastCheck ? dateFormatter(
                                    hostService.LastCheck) : "Pending..."
                              }
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

export default PendingTab