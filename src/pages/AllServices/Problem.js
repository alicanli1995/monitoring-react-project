import {useEffect, useState} from "react";
import services from "../../services";
import {warningAlert} from "../../partials/pusher-js/attention";

const Problem = () => {

  const [problemServices, setProblemServices] = useState([]);

  useEffect(() => {
    services.monitoringApiService.getAllProblemServices().then((res) => {
      setProblemServices(res.data)
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
              <li className="breadcrumb-item active">Problem Services</li>
            </ol>
            <h4 className="mt-4">Problem Services</h4>
            <hr/>
          </div>
        </div>


        <div className="row">
          <div className="col">

            <table id="problem-table"
                   className="table table-condensed table-striped">
              <thead>
              <tr>
                <th width={200}>Host</th>
                <th width={200}>Service</th>
                <th width={200}>Message</th>
              </tr>
              </thead>
              <tbody>
              {problemServices && problemServices.length > 0
                  ? problemServices.map(
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

export default Problem