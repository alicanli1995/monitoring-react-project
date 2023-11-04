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

  async getAllHealthyServices() {
    try {
      return await this.getAdapter().get('/admin/all-healthy', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async getAllProblemServices() {
    try {
      return this.getAdapter().get('/admin/all-problem', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async getAllWarningServices() {
    try {
      return await this.getAdapter().get('/admin/all-warning', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async getAllPendingServices() {
    try {
      return await this.getAdapter().get('/admin/all-pending', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async fetchEvents() {
    try {
      return await this.getAdapter().get('/admin/events', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async getSchedule() {
    try {
      return await this.getAdapter().get('/admin/schedule', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async fetchUsers() {
    try {
      return await this.getAdapter().get('/admin/users', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }

  }

  async fetchUser(userID) {
    try {
      return await this.getAdapter().get(`/admin/user/${userID}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async updateUser(user, ID) {
    try {
      return this.getAdapter().post(`/admin/user/${ID}`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async deleteUser(ID) {
    try {
      return await this.getAdapter().delete(`/admin/user/delete/${ID}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }
}


