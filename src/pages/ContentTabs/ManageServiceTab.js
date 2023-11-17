import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfo} from '@fortawesome/free-solid-svg-icons/faInfo';
import services from "../../services";
import {successAlert} from "../../components/notify/attention";
import SwitchButton from "../../components/buttons/SwitchButton";

const ManageServiceTab = (props) => {

  const [hostServices, setHostServices] = useState([]);

  useEffect(() => {
    setHostServices(props.host?.HostServices);
  }, [props.host.HostServices]);

  function handleChangeActive(index) {
    let service = hostServices[index];
    const value = document.getElementById("active-" + service.ID).checked ? 1
        : 0;
    let body = {
      host_id: service.HostID,
      service_id: service.ServiceID,
      active: value,
    }
    services.monitoringApiService.toggleService(body).then((res) => {
      if (res.data.ok === true) {
        successAlert("Service updated")
      }
    })
    setHostServices(prevState => {
      let newState = [...prevState];
      newState[index].Active = value;
      return newState;
    })
  }

  return (
      <>
        <div className="tab-pane fade" role="tabpanel"
             aria-labelledby="services-tab"
             id="services-content">
          <div className="row">
            <div className="mt-3 col-lg-12">

              <table className="table table-striped">
                <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {hostServices && (hostServices.length > 0 ? hostServices.map(
                    (hostService, index) => {
                      return (
                          <>
                            <tr key={'manage-server-' + hostService.ID}>
                              <td>
                                <Button variant="contained"
                                        size={"small"}
                                        startIcon={<FontAwesomeIcon
                                            icon={faInfo}/>}>
                                  {hostService.Service.ServiceName}
                                </Button>
                              </td>
                              <td>
                                  <SwitchButton
                                      checked={hostService.Active}
                                      handleToggle={() => handleChangeActive(
                                          index)}
                                      id={"active-" + hostService.ID}
                                      label={"Active"}
                                  />
                              </td>
                            </tr>
                          </>
                      )
                    }) : <tr>
                  <td colSpan="2">No Services</td>
                </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
  )
}

export default ManageServiceTab;