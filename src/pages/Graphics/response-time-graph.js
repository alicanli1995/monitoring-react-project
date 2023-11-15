import React, {useEffect, useState} from "react";
import services from "../../services";
import {warningAlert} from "../../components/notify/attention";
import {FormControl, Grid, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {Card, CardBody, CardTitle} from "reactstrap"
import SplineArea from "../../components/charts/SplineArea";
import Pie from "../../components/charts/Pie";
import {publicChannel} from "../../partials/WebServer";

const ResponseTimeGraph = () => {

    const [hosts, setHosts] = useState([])
    const [hostServices, setHostServices] = useState([])
    const [selectedHost, setSelectedHost] = useState()
    const [selectedService, setSelectedService] = useState(null)
    const [data, setData] = useState([])

    const handleChange = (e) => {
        const hostID = e.target.value
        setData([])
        setSelectedService(null)
        setHostServices(hosts.find((host) => host.ID === hostID).HostServices)
        setSelectedHost(hosts.find((host) => host.ID === hostID))
    }

    const handleFetchStats = (e) => {
        const serviceID = e.target.value
        services.monitoringApiService.fetchElasticData("performances", 15,
            selectedHost?.ID, serviceID).then((response) => {
            if (!response.data) {
                setData([])
                setSelectedService(hostServices.find((hs) => hs.ID === serviceID))
                warningAlert("No data to display")
                return
            }
            setData(response.data)
            setSelectedService(hostServices.find((hs) => hs.ID === serviceID))
        }).catch((error) => {
            warningAlert(error.response.data.message)
        })
    }

    useEffect(() => {
        services.monitoringApiService.fetchHosts().then((response) => {
            setHosts(response.data.hosts)
        }).catch((error) => {
            warningAlert(error.response.data.message)
        })

    }, [selectedService]);

    useEffect(() => {
        const handleHostServiceCheckResponse = (newData) => {
            if (newData.service_info?.HostServices?.ID === selectedService?.ID) {
                if (data.length > 0) {
                    setData((prevData) => {
                        return [newData.service_info, ...prevData];
                    });
                } else if (data.length === 0) {
                    setData([newData.service_info]);
                }
            }
        };

        publicChannel.bind("host-service-check-response", handleHostServiceCheckResponse);

        return () => {
            publicChannel.unbind("host-service-check-response", handleHostServiceCheckResponse);
        };
    }, [selectedService, data, publicChannel]);

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

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div style={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                    }}>
                        <span> Select a Host</span>
                    </div>
                    <div style={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                    }}>
                        <FormControl style={{width: '25%'}} size={"small"}>
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
                                {hosts?.map((host) => {
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
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <span> Select a Service</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <FormControl style={{width: '25%'}} size={"small"}>
                                    <Select
                                        id="host"
                                        name="host"
                                        style={
                                            {
                                                width: '100%',
                                                height: '40px',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                alignItems: 'center',
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
                                        {hostServices?.map((hs) => {
                                            return (
                                                <MenuItem key={hs.ID}
                                                          value={hs.ID}>
                                                    {hs.Service?.ServiceName}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        </>
                    </Grid>
                }
            </Grid>

            {data && selectedService && data?.length > 0 &&
                <Card>
                    <CardBody>
                        <Grid container rowSpacing={1}
                              columnSpacing={{xs: 1, sm: 2, md: 3}}>
                            <Grid item xs={6}>
                                <CardTitle className="mt-4" style={{
                                    padding: '0 17rem',
                                }}> Millisecond & Time </CardTitle>
                                <SplineArea dataColors='["--bs-primary"]' data={data}/>
                            </Grid>
                            <Grid item xs={6}>
                                <CardTitle className={"mt-4"} style={{
                                    padding: '0 21rem',
                                }}>Pie Chart</CardTitle>
                                <Pie
                                    dataColors='["--bs-success","--bs-danger"]'
                                    data={data}
                                />
                            </Grid>
                        </Grid>
                    </CardBody>
                </Card>
            }
            {(selectedService && (data === null || data?.length === 0)) &&
                <div className="row mt-3" style={{width: '96.5%'}}>
                    <div className="col">
                        <div className="alert alert-danger" role="alert">
                            No data to display
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ResponseTimeGraph