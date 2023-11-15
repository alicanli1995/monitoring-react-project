import React, {useEffect, useState} from 'react'
import "../../style/sidebar-new.scss"
import {AiOutlineSchedule, AiOutlineSetting} from "react-icons/ai"
import {MdAnalytics, MdOutlineEventSeat} from "react-icons/md"
import {BsChevronBarLeft, BsChevronBarRight} from "react-icons/bs"
import {
  confirm,
  successAlert,
  warningAlert
} from "../../components/notify/attention";
import services from "../../services";
import {TfiEye} from "react-icons/tfi";
import {SlHome} from "react-icons/sl";
import {DiGhostSmall} from "react-icons/di";
import {FaUsersRectangle} from "react-icons/fa6";
import {HiOutlineLogout} from "react-icons/hi";
import {IonIcon} from '@ionic/react';
import {pause as CustomPauseIcon, play as CustomPlayIcon} from 'ionicons/icons';

const SideMenu = (props) => {

  const [active, setActive] = useState(false)
  const [showMonitoring, setShowMonitoring] = useState(false);

  function changePlayPauseBtn(pause, play, playBtn, wave1, wave2) {
    pause.classList.toggle('visibility');
    play.classList.toggle('visibility');
    playBtn.classList.toggle('shadow');
    wave1.classList.toggle('paused');
    wave2.classList.toggle('paused');
  }

  const onHandlePlay = () => {
    const play = document.querySelector('.play');
    const pause = document.querySelector('.pause');
    const playBtn = document.querySelector('.circle__btn');
    const wave1 = document.querySelector('.circle__back-1');
    const wave2 = document.querySelector('.circle__back-2');

    if (showMonitoring) {
      confirm({
        html: "Are you sure you want to disable live monitoring?",
        callback: function (result) {
          if (result) {
            updateSystemPref("monitoring_live", "0").then(() => {
              toggleMonitoring(false).catch((err) => {
                warningAlert(err.message)
              })
            })
            pause.classList.toggle('visibility');
            play.classList.toggle('visibility');
            playBtn.classList.toggle('shadow');
            wave1.classList.toggle('paused');
            wave2.classList.toggle('paused');
          }
        }
      })
    } else {
      updateSystemPref("monitoring_live", "1").then(() => {
        toggleMonitoring(true).catch((err) => {
          warningAlert(err.message)
        });
      })
      changePlayPauseBtn(pause, play, playBtn, wave1, wave2);
    }
  }

  useEffect(() => {
    services.monitoringApiService.getSystemPref()
    .then((res) => {
      if (res.data.ok === true) {
        let monitoringLive = res.data.preferences?.filter(
            pref => pref.Name === "monitoring_live")[0].Preference
        setShowMonitoring(monitoringLive === "1")
        const play = document.querySelector('.play');
        const pause = document.querySelector('.pause');
        const playBtn = document.querySelector('.circle__btn');
        const wave1 = document.querySelector('.circle__back-1');
        const wave2 = document.querySelector('.circle__back-2');

        if (monitoringLive !== "1") {
          playBtn.classList.add('shadow');
          wave1.classList.add('paused');
          wave2.classList.add('paused');
          pause.classList.add('visibility');
          play.classList.add('visibility');
        } else {
          playBtn.classList.remove('shadow');
          wave1.classList.remove('paused');
          wave2.classList.remove('paused');
          pause.classList.remove('visibility');
          play.classList.remove('visibility');
        }
      }
    }).catch((err) => {
      warningAlert(err.message)
    });
  }, []);

  const updateSystemPref = async (prefName, prefValue) => {
    const body = {
      pref_name: prefName,
      pref_value: prefValue,
    }

    await services.monitoringApiService.updateSystemPref(body)
    .then((res) => {
      if (res.data.ok === true) {
        successAlert(res.data.message)
      } else {
        warningAlert(res.data.message)
      }
    }).catch((err) => {
      warningAlert(err.message)
    });
  };

  const toggleMonitoring = async (param) => {
    setShowMonitoring(param)

    let body = {
      enabled: param,
    }
    await services.monitoringApiService.toggleMonitoring(body)
    .then((res) => {
      if (res.data.ok === true) {
        successAlert(res.data.message)
      } else {
        warningAlert(res.data.message)
      }
    }).catch((err) => {
      warningAlert(err.message)
    });
  };

  return (
      <div className="wrapper">

        <div id="side-bar-spec" className={active ? "active" : ""}>
          <div className="top-icons">
            <div onClick={() => setActive(!active)}>
              {active ? <BsChevronBarRight/> : <BsChevronBarLeft/>}
            </div>
          </div>
          <div className="top">
            <div className={!active ? "logo ml-4" : "logo ml-1"}>
              {<TfiEye size="32"/>}
            </div>
            <div className="line"></div>
            <span> Observer</span>
          </div>
          <div className="links">
            <a rel='noreferrer' href="/">
              <SlHome/>
              <span>Overview</span></a>
            <a rel='noreferrer' href="/hosts">
              <DiGhostSmall/>
              <span>Hosts</span>
            </a>
            <a rel='noreferrer' href="/statistics">
              <MdAnalytics/>
              <span>Statistics</span>
            </a>
            <a rel='noreferrer' href="/events">
              <MdOutlineEventSeat/>
              <span>Events</span></a>
            <a rel='noreferrer' href="/schedule">
              <AiOutlineSchedule/>
              <span>Schedule</span></a>
            <a rel='noreferrer' href="/users">
              <FaUsersRectangle/>
              <span>Users</span>
            </a>
            <a rel='noreferrer' href="/settings">
              <AiOutlineSetting/>
              <span>Settings</span></a>
            <a rel='noreferrer'>
              <HiOutlineLogout/>
              <span onClick={() => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("access_token_expires_at");
                localStorage.removeItem("refresh_token_expires_at");
                localStorage.removeItem("session_id");
                localStorage.removeItem("user_email");
                window.location.href = "/login";
              }}>Logout</span>
            </a>

            <div className="circle mt-6">
              <span className="circle__btn">
                <IonIcon icon={CustomPlayIcon} className={"play"}
                         id={"monitoring-live"}
                         style={{color: "grey"}}
                         size={"large"}
                         onClick={() => {
                           onHandlePlay()
                         }}/>
                <IonIcon icon={CustomPauseIcon} className={"pause"}
                         id={"monitoring-live"}
                         style={{color: "grey"}}
                         size={"large"}
                         onClick={() => {
                           onHandlePlay()
                         }}/>
              </span>
              <span className="circle__back-1"></span>
              <span className="circle__back-2"></span>
            </div>

          </div>

        </div>
        <div className="main">

          <main className="content">
            <div className="container-fluid p-0">

              <div className="row">
                <div className="col-12">
                  <div className="card">

                    <div className="card-body" style={
                        {
                            minHeight: "calc(95vh - 120px)",
                        }
                    }>
                      {props.children}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </main>

          <footer className="footer">
            <div className="container-fluid">
              <div className="row text-muted">
                <div className="col-6 text-left">
                  <small
                      className="text-muted">Version 0.0.1</small>
                </div>
                <div className="col-6 text-right">
                  <p className="mb-0">
                    <a href="/" className="text-muted"><strong><span
                        className="fa fa-eye"></span> Observer</strong></a>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
  )
}

export default SideMenu