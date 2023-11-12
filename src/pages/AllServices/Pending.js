import {useEffect, useState} from "react";
import services from "../../services";
import {warningAlert} from "../../components/notify/attention";

const Pending = () => {

  const [pendingServices, setPendingServices] = useState([]);

  useEffect(() => {
    services.monitoringApiService.getAllPendingServices().then((res) => {
      setPendingServices(res.data)
    }).catch((err) => {
      warningAlert(err.message)
    });
  }, []);

  return (
      <>
        <div className="row">
          <div className="col">
            <ol className="breadcrumb mt-1">
              <li className="breadcrumb-item"><a
                  href="/">Overview</a></li>
              <li className="breadcrumb-item active">Pending Services</li>
            </ol>
            <h4 className="mt-4">Pending Services</h4>
            <hr/>
          </div>
        </div>


        <div className="row">
          <div className="col">

            <table id="pending-table"
                   className="table table-condensed table-striped">
              <thead>
              <tr>
                <th width={200}>Host</th>
                <th width={200}>Service</th>
                <th width={200}>Message</th>
              </tr>
              </thead>
              <tbody>
              {pendingServices && pendingServices.length > 0
                  ? pendingServices.map(
                      (service) => {
                        return (
                            <tr key={'service-' + service.ID}>
                              <td>
                                <a href={"/host/" + service.HostID}>
                                  {service.HostName}
                                </a>
                              </td>
                              <td>{service.Service.ServiceName}</td>
                              <td>{service.LastMessage}</td>
                            </tr>
                        )
                      }) : <tr>
                    <td colSpan="3">No Services</td>
                  </tr>
              }
              </tbody>
            </table>
          </div>
        </div>
      </>
  )

}

export default Pending