import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfo} from '@fortawesome/free-solid-svg-icons/faInfo';

const ManageServiceTab = (props) => {

  const [hostServices, setHostServices] = useState({});

  useEffect(() => {
    setHostServices(props.host?.HostServices);
  }, [props.host.HostServices]);

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
                    (hostService) => {
                      return (
                          <tr key={hostService.ID}>
                            <td>
                              <Button variant="contained"
                                      size={"small"}
                                      startIcon={<FontAwesomeIcon
                                          icon={faInfo}/>}>
                                {hostService.Service.ServiceName}
                              </Button>
                            </td>
                            <td>
                              <div className="form-check form-switch">
                                <input className="form-check-input"
                                       type="checkbox"
                                       name={hostService.Service.ServiceName}
                                       data-service={hostService.ServiceID}
                                       data-host-id={hostService.HostID}
                                       datatype="toggle-service"
                                       checked={hostService.Active === 1}
                                       onChange={(e) => console.log(e)}
                                       value="1"/>
                                <label className="form-check-label"
                                       form="active">Active</label>
                              </div>
                            </td>
                          </tr>
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