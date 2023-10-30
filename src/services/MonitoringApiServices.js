import {HttpService} from './HttpAdapter'

export default class MonitoringApiServices extends HttpService {
  constructor(monitoringServicesURL) {
    super(monitoringServicesURL)
  }

  async toggleMonitoring(body) {
    try {
      return await this.getAdapter().post(
          '/admin/preferences/ajax/toggle-monitoring', body, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            xsrfCookieName: 'XSRF-TOKEN',
            mode: 'cors',
          })
    } catch (error) {
      console.error(error)
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async getAllHosts() {
    try {
      return await this.getAdapter().get(
          '/admin/overview', {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            xsrfCookieName: 'XSRF-TOKEN',
            mode: 'cors',
          })
    } catch (error) {
      console.error(error)
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }
}


