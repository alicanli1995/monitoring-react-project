import "../../style/new-login.css"
import services from "../../services";
import {errorAlert, successAlert} from "../../components/notify/attention";
import {Icon} from "@iconify/react";

const Login = () => {

  const handleLogin = () => {
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

  const handleRegister = () => {
    const body = {
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email-register").value,
      password: document.getElementById("password-register").value,
    }

    services.monitoringApiService.registerUser(body).then((res) => {
      if (res.data.ok === true) {
        successAlert(res.data.message)
        setTimeout(() => {
          window.location.href = "/login"
        }, 3000)
      } else {
        errorAlert(res.data.message)
      }
    }).catch((err) => {
      errorAlert(err.message)
    });

  }

  return (
      <>
        <div className="container">
          <div className="forms-container">
            <div className="signin-signup">


              <form className="sign-in-form" onSubmit={(e) => {
                e.preventDefault()
                handleLogin()
              }}>
                <Icon icon="mdi:monitor-eye" fontSize={50} className={"mb-3"}/>
                <h2 className="title">Login</h2>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input type="text" name="email" autoComplete="email"
                         id="email" placeholder="Email" required="yes"/>
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input type="password" name="password"
                         autoComplete="off" placeholder="Password"
                         id="password" required="yes"/>
                  <i className="far fa-eye" id="togglePassword" onClick={() => {
                    let input = document.querySelector('#password')
                    input.type = input.type === 'password' ? 'text' : 'password'
                  }}
                     style={{cursor: "pointer"}}></i>
                </div>

                <button placeholder="Sign in" className="btn-new solid">Login
                </button>

              </form>


              <form action="" className="sign-up-form">
                <Icon icon="mdi:monitor-eye" fontSize={50} className={"mb-3"}/>
                <h2 className="title">Register</h2>

                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input type="text" name="name" autoComplete="name"
                         id={"name"} placeholder="Name" required="yes"/>
                </div>

                <div className="input-field">
                  <i className="fas fa-dot-circle"></i>
                  <input type="text" name="surname" autoComplete="surname"
                         id="surname" placeholder="Surname" required="yes"/>
                </div>

                <div className="input-field">
                  <i className="fas fa-envelope"></i>
                  <input type="email" name="correo" autoComplete="email"
                         id="email-register" placeholder="Email"
                         required="yes"/>
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input type="password" name="password"
                         autoComplete="current-password" placeholder="Password"
                         id="password-register" required="yes"/>
                  <i className="far fa-eye" id="toggleReg"
                     style={{cursor: "pointer"}}></i>
                </div>

                <input type="button" value="Create account"
                       onClick={(e) => {
                         e.preventDefault()
                         handleRegister()
                       }}
                       className="btn-new solid"/>

              </form>
            </div>
          </div>
          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>You don't have an account?</h3>
                <p>
                  Create your account right now to check your hosts health checks and visualize your statistics
                </p>
                <button className="btn-new transparent" id="sign-up-btn"
                        onClick={() => {
                          document.querySelector('.container').classList.add(
                              'sign-up-mode')
                        }}
                >Register
                </button>
              </div>
            </div>

            <div className="panel right-panel">
              <div className="content">
                <h3>Already have an account?</h3>
                <p>
                  Login to see your hosts health checks and visualize your statistics
                </p>
                <button className="btn-new transparent" id="sign-in-btn"
                        onClick={() => {
                          document.querySelector('.container').classList.remove(
                              'sign-up-mode')
                        }}
                >Sign in
                </button>
              </div>
            </div>
          </div>
        </div>


      </>
  )

}

export default Login