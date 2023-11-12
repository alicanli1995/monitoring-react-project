import React, {useEffect, useState} from "react";
import {confirm, successAlert, warningAlert} from "../../components/notify/attention";
import services from "../../services";
import {FormControl, InputLabel, Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useHistory} from "react-router-dom";

const Users = (props) => {

  const [user, setUser] = useState({});
  const [userActive, setUserActive] = useState('');
  const history = useHistory();
  const sameUser = localStorage.getItem("user_email") === user.Email;

  useEffect(() => {
    services.monitoringApiService.fetchUser(props.match.params.id).then(
        (res) => {
          setUser(res.data)
          setUserActive(res.data.UserActive)
        }).catch((err) => {
      warningAlert(err.message)
    });

  }, []);

  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value})
    if (e.target.name === "UserActive") {
      setUserActive(e.target.value)
    }
  }

  function handleSave() {
    const body = {
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      Password: user.Password,
      UserActive: userActive,
    }
    services.monitoringApiService.updateUser(body, user.ID).then((res) => {
      if (res.data.ok === true) {
        successAlert(res.data.message)
        history.push("/users")

      } else {
        warningAlert(res.data.message)
      }
    }).catch((err) => {
      warningAlert(err.message)
    })
  }

  const handleDeleteUser = (ID) => {
    document.getElementById("delete-user").addEventListener("click",
        function () {
          confirm({
            html: "Are you sure you want to delete this user?",
            callback: function (result) {
              if (result) {
                services.monitoringApiService.deleteUser(ID).then((res) => {
                  if (res.data.ok === true) {
                    successAlert(res.data.message)
                    history.push("/users")
                  } else {
                    warningAlert(res.data.message)
                  }
                }).catch((err) => {
                  warningAlert(err.message)
                })
              }
            }
          })
        })
  }

  return (
      <>
        <div className="row">
          <div className="col">
            <ol className="breadcrumb mt-1">
              <li className="breadcrumb-item"><a
                  href="/">Overview</a></li>
              <li className="breadcrumb-item"><a href="/users">Users</a>
              </li>
              <li className="breadcrumb-item active">User</li>
            </ol>
            <h4 className="mt-4">User</h4>
            <hr/>
          </div>
        </div>


        <div className="row">
          <div className="col">

            <div className="mt-3">
              <div className="input-group">
                  <span className="input-group-text"><i
                      className="fas fa-font fa-fw"></i></span>
                <TextField
                    required
                    error={user?.FirstName === ""}
                    variant={"outlined"}
                    id="FirstName"
                    name="FirstName"
                    label="First Name"
                    value={user?.FirstName ? user.FirstName.toString() : ""}
                    onChange={(e) => handleChange(e)}
                    size={"small"}
                    style={{width: '97%'}}
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="input-group">
                  <span className="input-group-text"><i
                      className="fas fa-font fa-fw"></i></span>
                <TextField
                    required
                    error={user?.LastName === ""}
                    variant={"outlined"}
                    id="LastName"
                    name="LastName"
                    label="Last Name"
                    value={user?.LastName ? user.LastName.toString() : ""}
                    onChange={(e) => handleChange(e)}
                    size={"small"}
                    style={{width: '97%'}}
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="input-group">
                  <span className="input-group-text"><i
                      className="fas fa-envelope fa-fw"></i></span>
                <TextField
                    required
                    error={user?.Email === ""}
                    variant={"outlined"}
                    id="Email"
                    name="Email"
                    label="Email"
                    value={user?.Email ? user.Email.toString() : ""}
                    onChange={(e) => handleChange(e)}
                    size={"small"}
                    style={{width: '97%'}}
                />
              </div>
            </div>


            <div className="mt-2">
              <small><span className="text-muted">Leave blank to keep
                    current password</span></small>
              <div className="input-group">
                  <span className="input-group-text"><i
                      className="fas fa-lock fa-fw"></i></span>
                <TextField
                    required
                    error={user?.Password === ""}
                    variant={"outlined"}
                    id="Password"
                    name="Password"
                    label="Password"
                    type={"password"}
                    value={user?.Password ? user.Password.toString() : ""}
                    onChange={(e) => handleChange(e)}
                    size={"small"}
                    style={{width: '97%'}}
                />
              </div>
            </div>

            {!sameUser &&
                <div className="mt-4">
                  <div className="input-group">
                                <span className="input-group-text"><i
                                    className="fas fa-check fa-fw"></i></span>
                    <FormControl style={{width: '97%'}} size={"small"}>

                      <InputLabel
                          id="demo-simple-select-label">Status</InputLabel>
                      <Select
                          id="user-active"
                          name="UserActive"
                          value={userActive}
                          label="Status"
                          onChange={handleChange}
                      >
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={0}>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
            }

            <hr/>

            <div className="float-left">

              <input type="submit" className="btn btn-primary mr-2"
                     onClick={() => {
                       handleSave()
                     }}
                     value="Save"/>

              <a className="btn btn-info" href="/users">Cancel</a>
            </div>

            {!sameUser && (user?.ID && user.ID > 0) ? <div
                className="float-right">
              <a className="btn btn-danger"
                 id="delete-user"
                 onClick={
                   () => handleDeleteUser(user.ID)
                 }>Delete</a>
            </div> : null
            }
          </div>
        </div>
      </>
  )
}

export default Users;