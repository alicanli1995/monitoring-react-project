import {useEffect, useState} from "react";
import services from "../../services";
import {warningAlert} from "../Admin/js/attention";
import StickyHeadTable from "../../components/table/TableWithPaginations";
import {dateFormatter} from "../../utils/utils";

const Events = () => {

  const [events, setEvents] = useState([])

  const columns = [
    {id: 'EventType', label: 'Event Type', minWidth: 170, align: 'center'},
    {id: 'HostName', label: 'Host', minWidth: 100, align: 'center'},
    {
      id: 'ServiceName',
      label: 'Service',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'CreatedAt',
      label: 'Date/Time',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'Message',
      label: 'Message',
      minWidth: 170,
      align: 'center',
    }
  ];

  useEffect(() => {
    services.monitoringApiService.fetchEvents().then((response) => {
      response.data.map((event) => {
        event.CreatedAt = dateFormatter(event.CreatedAt)
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