import MonitoringApiServices from './MonitoringApiServices'

const services = {
  monitoringApiService : new MonitoringApiServices('http://localhost:4000'),
}

export default services
