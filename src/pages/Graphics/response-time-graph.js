import React, {useEffect, useState} from "react";
import services from "../../services";
import {warningAlert} from "../../partials/pusher-js/attention";
import {FormControl, Grid, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {LineChart} from '@mui/x-charts/LineChart';

const ResponseTimeGraph = () => {

  const [data, setData] = useState([])
  const [hosts, setHosts] = useState([])
  const [hostServices, setHostServices] = useState([])
  const [selectedHost, setSelectedHost] = useState()

  useEffect(() => {
    services.monitoringApiService.fetchHosts().then((response) => {
      setHosts(response.data.hosts)
      setHostServices(response.data.hosts[0].HostServices)
      console.log(response.data.hosts[0].HostServices)
    }).catch((error) => {
      warningAlert(error.response.data.message)
    })
  }, []);

  const handleChange = (e) => {
    const hostID = e.target.value
    setSelectedHost(hosts.find((host) => host.ID === hostID))
  }

  const handleFetchStats = (e) => {
    const serviceID = e.target.value
    services.monitoringApiService.fetchElasticData("performances", 15,
        selectedHost?.ID, serviceID).then((response) => {
      setData(response.data)
      console.log(response.data)
    }).catch((error) => {
      warningAlert(error.response.data.message)
    })
  }

  return (
      <>
        <div className="row">
          <div className="col">
            <ol className="breadcrumb mt-1">
              <li className="breadcrumb-item"><a href="/">Overview</a></li>
              <li className="breadcrumb-item active">Statistics</li>
            </ol>
            <h4 className="mt-4">Statistics</h4>
            <hr/>
          </div>
        </div>

        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
          <Grid item xs={6}>
            <span> Select a Host</span>
            <div className="input-group">
              <FormControl style={{width: '90%'}} size={"small"}>
                <Select
                    id="host"
                    name="host"
                    style={
                      {
                        width: '100%',
                        height: '40px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#6c757d',
                        border: '1px solid #ced4da',
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                        backgroundImage: 'none',
                        boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)',
                        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
                        padding: '0 .75rem',
                        lineHeight: '1.5',
                      }
                    }
                    onChange={(e) => handleChange(e)}
                >
                  {hosts && hosts.map((host) => {
                    return (
                        <MenuItem key={host.ID}
                                  value={host.ID}>{host.HostName}
                        </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
          </Grid>
          {selectedHost &&
              <Grid item xs={6}>
                <>
                  <div className="input-group">
                    <span> Select a Service</span>
                    <div className="input-group">
                      <FormControl style={{width: '90%'}} size={"small"}>
                        <Select
                            id="host"
                            name="host"
                            style={
                              {
                                width: '100%',
                                height: '40px',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#6c757d',
                                border: '1px solid #ced4da',
                                borderRadius: '4px',
                                backgroundColor: '#fff',
                                backgroundImage: 'none',
                                boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)',
                                transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
                                padding: '0 .75rem',
                                lineHeight: '1.5',
                              }
                            }
                            onChange={(e) => handleFetchStats(e)}
                        >
                          {hostServices && hostServices.map((hs) => {
                            return (
                                <MenuItem key={hs.Service?.ID}
                                          value={hs.Service?.ID}>{hs.Service?.ServiceName}
                                </MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </>
              </Grid>
          }
        </Grid>

        {data && data.length > 1 &&
            <>
              <Grid container rowSpacing={1}
                    columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={5}/>
                <Grid item xs={6}>
                  <h5 className="mt-4"><span
                      style={{color: "red",
                        fontSize: "15px",
                        fontWeight: "bold"
                      }}> Response Time => ResponseTime / Date</span></h5>
                </Grid>
              </Grid>
              <LineChart
                  tooltip={{enabled: true}}
                  xAxis={[
                    {
                      dataKey: 'Time',
                      valueFormatter: (v) => new Date(v).getHours() + ':'
                          + new Date(v).getMinutes() + ':' + new Date(
                              v).getSeconds(),
                      min: new Date(data[0].CreatedAt),
                      max: new Date(data[data.length - 1].CreatedAt),
                      data: data.map((d) => new Date(d.CreatedAt)),
                    },
                  ]}
                  series={[
                    {
                      data: data.map((d) => d.TotalTime / 1000000),
                      valueFormatter: (v) => v + ' ms',
                    },
                  ]}
                  width={1600}
                  height={300}
              />
            </>
        }
      </>
  )
}

export default ResponseTimeGraph