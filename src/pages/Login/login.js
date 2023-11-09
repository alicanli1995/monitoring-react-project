import "../../style/login.css";
import {TextField} from "@mui/material";
import React from "react";
import services from "../../services";
import {errorAlert} from "../../partials/pusher-js/attention";

const Login = () => {

  const [email, setEmail] = React.useState(' ')
  const [password, setPassword] = React.useState(' ')
  const [isError, setIsError] = React.useState(false)

  const handleSubmit = () => {
    const body = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    }

    services.monitoringApiService.login(body).then((res) => {
      if (res.data.ok === true) {
        localStorage.setItem("access_token", res.data.access_token)
        localStorage.setItem("refresh_token", res.data.refresh_token)
        localStorage.setItem("access_token_expires_at",
            res.data.access_token_expires_at)
        localStorage.setItem("refresh_token_expires_at",
            res.data.refresh_token_expires_at)
        localStorage.setItem("session_id", res.data.session_id)
        localStorage.setItem("user_email", res.data.user.email)
        window.location.href = "/"
      } else {
        errorAlert(res.data.message)
      }
    }).catch((err) => {
      errorAlert(err.message)
    });
  }

  function handleChange(e) {
    if (e.target.id === "email") {
      setEmail(e.target.value)
    } else if (e.target.id === "password") {
      setPassword(e.target.value)
    }

    (email === "" || email === " " || password === " " || password === "")
        ? setIsError(false) : setIsError(true)
  }

  return (
      <>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="login-form">

                <h3 className="text-center sign-in-title">Login</h3>
                <hr/>

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text"><i
                        className="fas fa-envelope fa-fw"></i></span>
                    <TextField
                        required
                        variant={"outlined"}
                        error={email === ""}
                        id="email"
                        name="email"
                        label="Email"
                        onChange={(e) => handleChange(e)}
                        size={"small"}
                        style={{
                          width: '91%',
                        }}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="input-group">
                        <span className="input-group-text"><i
                            className="fas fa-lock fa-fw"></i></span>
                    <TextField
                        required
                        variant={"outlined"}
                        error={password === ""}
                        id="password"
                        name="password"
                        label="Password"
                        type={"password"}
                        onChange={(e) => handleChange(e)}
                        size={"small"}
                        style={{
                          width: '91%',
                        }}
                    />
                  </div>
                </div>

                <hr/>

                <div className="form-group mt-3">
                  <button onClick={handleSubmit}
                          disabled={!isError}
                          className="btn btn-primary ">Login
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default Login;