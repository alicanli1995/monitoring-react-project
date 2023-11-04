import {useEffect, useState} from "react";
import services from "../../services";
import {warningAlert} from "../Admin/js/attention";
import {dateFormatter} from "../../utils/utils";

const Schedule = () => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    services.monitoringApiService.getSchedule().then((response) => {
      setItems(response.data.entries);
    }).catch((error) => {
      warningAlert(error.message);
    })
  }, []);

  return (
      <>
        <div className="row">
          <div className="col">
            <ol className="breadcrumb mt-1">
              <li className="breadcrumb-item"><a
                  href="/">Overview</a></li>
              <li className="breadcrumb-item active">Schedule</li>
            </ol>
            <h4 className="mt-4">Schedule</h4>
            <hr/>
          </div>
        </div>

        <div className="row">
          <div className="col">

            <table className="table table-condensed table-striped"
                   id="schedule-table">
              <thead>
              <tr>
                <th>Host</th>
                <th>Service</th>
                <th>Schedule</th>
                <th>Previous</th>
                <th>Next</th>
              </tr>
              </thead>
              <tbody id="schedule-table-body">
              {items && items.length > 0 ? items.map((item) => {
                return (
                    <tr id={`schedule-${item.HostServiceID}`}>
                      <td>{item.Host}</td>
                      <td>{item.Service}</td>
                      <td>{item.ScheduleText}</td>
                      <td>
                        {item.LastRunFromHS ? dateFormatter(item.LastRunFromHS)
                            : "Pending..."}
                      </td>
                      <td>
                        {item.Entry.Next ? dateFormatter(item.Entry.Next)
                            : "Pending..."}
                      </td>
                    </tr>
                )
              }) : <tr>
                <td colSpan="5"> No Scheduled Checks!</td>
              </tr>}
              </tbody>
            </table>
          </div>
        </div>
      </>

  );
}

export default Schedule;