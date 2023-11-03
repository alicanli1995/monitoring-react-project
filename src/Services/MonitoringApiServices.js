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
      return await this.getAdapter().get('/admin/overview', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async updateSystemPref(body) {
    try {
      return await this.getAdapter().post(
          '/admin/preferences/ajax/set-system-pref', body, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
    } catch (error) {
      console.error(error)
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async getSystemPref() {
    try {
      return await this.getAdapter().get('/admin/preferences', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async fetchHosts() {
    try {
      return await this.getAdapter().get('/admin/host/all', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async fetchHost(hostID) {
    try {
      return await this.getAdapter().get(`/admin/host/${hostID}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async updateHost(body, id) {
    try {
      return await this.getAdapter().post(`/admin/host/${id}`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async checkNow(ID, oldStatus) {
    try {
      return await this.getAdapter().get(
          `/admin/perform-check/${ID}/${oldStatus}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
    } catch (error) {
      console.error(error)
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async toggleService(body) {
    try {
      return await this.getAdapter().post('/admin/host/ajax/toggle-service',
          body, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
    } catch (error) {
      console.error(error)
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }
}


