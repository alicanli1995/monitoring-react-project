import axios from "axios";
import {errorAlert} from "../partials/pusher-js/attention";

export default class MonitoringApiServices {

  async toggleMonitoring(body) {
    try {
      return await instance.post('/admin/preferences/toggle-monitoring',
          body, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async getAllHosts() {
    try {
      return await instance.get('/admin/overview', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async updateSystemPref(body) {
    try {
      return await instance.post('/admin/preferences/set-system-pref',
          body, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async getSystemPref() {
    try {
      return await instance.get('/admin/preferences', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async fetchHosts() {
    try {
      return await instance.get('/admin/host/all', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async fetchHost(hostID) {
    try {
      return await instance.get(`/admin/host/${hostID}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async updateHost(body, id) {
    try {
      return await instance.post(`/admin/host/${id}`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async checkNow(ID, oldStatus) {
    try {
      return await instance.get(`/admin/perform-check/${ID}/${oldStatus}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async toggleService(body) {
    try {
      return await instance.post('/admin/host/toggle-service', body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async getAllHealthyServices() {
    try {
      return await instance.get('/admin/all-healthy', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async getAllProblemServices() {
    try {
      return instance.get('/admin/all-problem', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async getAllWarningServices() {
    try {
      return await instance.get('/admin/all-warning', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async getAllPendingServices() {
    try {
      return await instance.get('/admin/all-pending', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async fetchEvents() {
    try {
      return await instance.get('/admin/events', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async getSchedule() {
    try {
      return await instance.get('/admin/schedule', {
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
      return await instance.get('/admin/users', {
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
      return await instance.get(`/admin/user/${userID}`, {
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
      return instance.post(`/admin/user/${ID}`, user, {
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
      return await instance.delete(`/admin/user/delete/${ID}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async login(body) {
    try {
      return await instance.post('/login', body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }

  async updateSystemSettings(objectForUpdate) {
    try {
      return await instance.post('/admin/settings',
          objectForUpdate, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
    } catch (error) {
      throw new Error(error.response.data.errorDetail[0].message)
    }
  }
}

const instance = axios.create({baseURL: "http://localhost:4000"});

// Request interceptor
instance.interceptors.request.use((config) => {
  config.headers.Authorization = authHeader();
  return config;
});

// Response interceptor
instance.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    window.location.href = '/login';
    errorAlert("Unauthorized")
    throw new Error('Unauthorized');
  }
  throw new Error(error.response.data.errorDetail[0].message);
});

function authHeader() {
  const token = localStorage.getItem("access_token")
  if (token) {
    return "Bearer " + token
  } else {
    return ""
  }
}



