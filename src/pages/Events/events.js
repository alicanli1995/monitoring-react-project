import {useEffect, useState} from "react";
import services from "../../services";
import {warningAlert} from "../Admin/js/attention";
import StickyHeadTable from "../../components/table/TableWithPaginations";
import {dateFormatter} from "../../utils/utils";

const Events = () => {

  const [events, setEvents] = useState([])

  const columns = [{field: 'id', headerName: 'ID', width: 170},
    {field: 'EventType', headerName: 'Event Type', width: 270},
    {field: 'HostName', headerName: 'Host', width: 200}, {
      field: 'ServiceName', headerName: 'Service', width: 170,
    }, {
      field: 'CreatedAt', headerName: 'Date/Time', width: 170,
    }, {
      field: 'Message', headerName: 'Message', width: 470,
    },
  ];

  useEffect(() => {
    services.monitoringApiService.fetchEvents().then((response) => {
      response.data.map((event) => {
        event.CreatedAt = dateFormatter(event.CreatedAt)
        event.id = event.ID
      })
      setEvents(response.data)
    }).catch((error) => {
      warningAlert(error.response.data.message)
    })
  }, []);

  return (
      <>
        <div className="row">
          <div className="col">
            <ol className="breadcrumb mt-1">
              <li className="breadcrumb-item"><a href="/">Overview</a></li>
              <li className="breadcrumb-item active">Events</li>
            </ol>
            <h4 className="mt-4">Events</h4>
            <hr/>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <StickyHeadTable datas={events} columns={columns}/>
          </div>
        </div>
      </>
  )
}

export default Events