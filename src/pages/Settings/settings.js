import {FormControl, Select, TextField} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import services from "../../services";
import {successAlert, warningAlert} from "../../components/notify/attention";
import SwitchButton from "../../components/buttons/SwitchButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import {MdMarkEmailUnread, MdSms} from "react-icons/md";
import {AiFillNotification} from "react-icons/ai";
import {FaArrowsToEye} from "react-icons/fa6";

const Settings = () => {

  const [settings, setSettings] = useState([])
  const options = ['Save & Close', 'Save & Continue'];
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    services.monitoringApiService.getSystemPref()
    .then(res => {
      setSettings(res.data.preferences)
    })
    .catch(err => {
      warningAlert(err.message)
    })
  }, []);

  const handleClick = () => {
    const updateObj = ["site_url", "notify_via_email", "notify_via_sms",
      "notify_name", "notify_email", "sms_notify_number", "smtp_server",
      "smtp_port", "smtp_from_name", "smtp_from_email", "smtp_user",
      "sms_enabled", "smtp_password", "sms_provider", "twilio_phone_number",
      , "twilio_sid", "twilio_auth_token"]

    const objectForUpdate = settings.filter(
        item => updateObj.includes(item.Name)).map(item => {
      return {
        "Name": item.Name, "Preference": item.Preference
      }
    })

    services.monitoringApiService.updateSystemSettings(
        {"UpdatePreferences": objectForUpdate})
    .then(res => {
      if (res.data.ok === true) {
        successAlert("Settings updated successfully")
        if (selectedIndex === 0) {
          window.location.href = "/"
        }
      } else {
        warningAlert("Something went wrong")
      }
    }).catch(err => {
      warningAlert(err.message)
    })
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleChange(e) {
    let {id, value} = e.target
    if (id === "notify_via_email" || id === "notify_via_sms") {
      const newValue = e.target.checked ? 1 : 0;
      value = newValue.toString()
    }

    if (e.target.name === "sms_enabled" || e.target.name === "sms_provider") {
      id = e.target.name
      value = value.toString()
    }

    let prefMap = settings?.map(item => {
      if (item.Name === id) {
        item.Preference = value
      }
      return item
    });

    if (prefMap.filter(item => item.Name === id).length === 0) {
      const obj = {
        "Name": id,
        "Preference": value.toString()
      }
      prefMap.push(obj)
    }

    setSettings(prefMap)
  }

  const handleTabChanges = (e) => {

    let tabList = ['general-tab', 'notify-tab', 'mail-tab', 'sms-tab'];

    tabList.forEach((item) => {
      if (item !== e) {
        let tab = document.getElementById(item);
        let tabClassList = tab?.classList;
        tabClassList?.remove('active');

        let content = document.getElementById(item.replace('tab', 'content'));
        if (content) {
          let contentClassList = content.classList;
          contentClassList?.remove('show');
          contentClassList?.remove('active');
        }
      } else {
        let tab = document.getElementById(item);
        let tabClassList = tab?.classList;
        tabClassList?.add('active');

        let content = document.getElementById(item.replace('tab', 'content'));
        if (content) {
          let contentClassList = content?.classList;
          contentClassList?.add('show');
          contentClassList?.add('active');
        }
      }
    });

  }

  return (
      <>
        <div className="row">
          <div className="col">
            <ol className="breadcrumb mt-1">
              <li className="breadcrumb-item"><a href="/">Overview</a></li>
              <li className="breadcrumb-item active">Settings</li>
            </ol>
            <h4 className="mt-4">Settings</h4>
            <hr/>
          </div>
        </div>

        <div className="row">
          <div className="col">

            <ul className="nav nav-tabs" id="setting-tabs">
              <li className="nav-item">
                <a className="nav-link active" data-target="" data-toggle="tab"
                   onClick={() => handleTabChanges('general-tab')}
                   id="general-tab" role="tab"><FaArrowsToEye size={"16"} style={
                  {marginBottom: "3px"}}/> General</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-target="" data-toggle="tab"
                   onClick={() => handleTabChanges('notify-tab')}
                   id="notify-tab" role="tab"><AiFillNotification size={"16"} style={
                  {marginBottom: "3px"}}/> Notifications</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-target="" data-toggle="tab"
                   onClick={() => handleTabChanges('mail-tab')}
                   id="mail-tab" role="tab"><MdMarkEmailUnread size={"16"} style={
                    {marginBottom: "3px"}}/> Mail
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-target="" data-toggle="tab"
                   onClick={() => handleTabChanges('sms-tab')}
                   id="sms-tab" role="tab"><MdSms size={"16"} style={
                  {marginBottom: "3px"}}/> SMS</a>
              </li>
            </ul>

            <div className="tab-content" id="setting-tabs-content"
                 style={{minHeight: "50vh"}}>

              <div className="tab-pane fade show active" role="tabpanel"
                   aria-labelledby="content-tab"
                   id="general-content">
                <div className="row">
                  <div className="col-md-6 col-xs-12">

                    <div className="mt-5">
                      <div className="input-group">
                        <span className="input-group-text"><i
                            className="fas fa-link fa-fw"></i></span>
                        <TextField
                            variant={"outlined"}
                            id="site_url"
                            name="site_url"
                            label="URL of this application"
                            value={settings.filter(item => item.Name
                                === "site_url")[0]?.Preference
                                ? settings.filter(
                                    item => item.Name
                                        === "site_url")[0]?.Preference : ""}
                            onChange={(e) => handleChange(e)}
                            size={"small"}
                            style={{
                              width: '80%',
                            }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xs-12"/>
                </div>
              </div>

              <div className="tab-pane fade" role="tabpanel"
                   aria-labelledby="notify-tab"
                   id="notify-content">
                <div className="row">
                  <div className="col-md-6 col-xs-12">

                    <div className="mt-5">
                      <h5>How do you want to be notified of
                        problems/recovery?</h5>
                      <hr/>

                      <div className="form-check form-switch">
                        <SwitchButton cursor={"pointer"}
                                      label="By Email"
                                      id="notify_via_email"
                                      checked={settings.filter(item => item.Name
                                              === "notify_via_email")[0]?.Preference
                                          === "1" ? 1 : 0}
                                      handleToggle={(e) => {
                                        handleChange(e)
                                      }}
                        />
                      </div>

                      <div className="form-check form-switch">
                        <SwitchButton cursor={"pointer"}
                                      label="By Text Message"
                                      id="notify_via_sms"
                                      checked={settings.filter(item => item.Name
                                              === "notify_via_sms")[0]?.Preference
                                          === "1" ? 1 : 0}
                                      handleToggle={(e) => {
                                        handleChange(e)
                                      }}
                        />
                      </div>


                    </div>

                    {(settings.filter(
                            item => item.Name === "notify_via_email")[0]?.Preference
                        === "1" || settings.filter(item => item.Name
                            === "notify_via_sms")[0]?.Preference === "1") && <>
                      <h5 className="pt-4">Who gets notified of
                        problems/recovery?
                      </h5>

                      <hr/>
                    </>}

                    {settings.filter(item => item.Name
                            === "notify_via_email")[0]?.Preference === "1" &&
                        <>
                          <div className="mt-3">
                            <div className="input-group">
                          <span className="input-group-text">
                            <i className="fas fa-font fa-fw"/>
                          </span>
                              <TextField
                                  variant={"outlined"}
                                  id="notify_name"
                                  name="notify_name"
                                  label="Recipient's Name"
                                  value={settings.filter(item => item.Name
                                      === "notify_name")[0]?.Preference
                                      ? settings.filter(
                                          item => item.Name
                                              === "notify_name")[0]?.Preference
                                      : ""}
                                  onChange={(e) => handleChange(e)}
                                  size={"small"}
                                  style={{
                                    width: '94%',
                                  }}
                              />
                            </div>
                          </div>

                          <div className="mt-3">
                            <div className="input-group">
                                  <span className="input-group-text">
                                    <i className="fas fa-envelope fa-fw"/>
                                  </span>
                              <TextField
                                  variant={"outlined"}
                                  id="notify_email"
                                  name="notify_email"
                                  label="Recipient's Email"
                                  value={settings.filter(item => item.Name
                                      === "notify_email")[0]?.Preference
                                      ? settings.filter(
                                          item => item.Name
                                              === "notify_email")[0]?.Preference
                                      : ""}
                                  onChange={(e) => handleChange(e)}
                                  size={"small"}
                                  style={{
                                    width: '94%',
                                  }}
                              />
                            </div>
                          </div>
                        </>
                    }

                    {settings.filter(item => item.Name
                            === "notify_via_sms")[0]?.Preference === "1" &&
                        <div className="mt-3">
                          <div className="input-group">
                          <span className="input-group-text"><i
                              className="fas fa-sms fa-fw"></i></span>
                            <TextField
                                variant={"outlined"}
                                id="sms_notify_number"
                                name="sms_notify_number"
                                defaultValue={settings.filter(item => item.Name
                                    === "sms_notify_number")[0]?.Preference
                                    ? settings.filter(
                                        item => item.Name
                                            === "sms_notify_number")[0]?.Preference
                                    : "0"}
                                label="Recipient's Number"
                                value={settings.filter(item => item.Name
                                    === "sms_notify_number")[0]?.Preference
                                    ? settings.filter(
                                        item => item.Name
                                            === "sms_notify_number")[0]?.Preference
                                    : ""}
                                onChange={(e) => handleChange(e)}
                                size={"small"}
                                style={{
                                  width: '94%',
                                }}
                            />
                          </div>
                        </div>
                    }

                  </div>
                </div>
              </div>

              <div className="tab-pane fade" role="tabpanel"
                   aria-labelledby="mail-tab"
                   id="mail-content">
                <div className="row">

                  <div className="col-md-6 col-xs-12">

                    <div className="mt-5">
                      <div className="input-group">
                        <span className="input-group-text"><i
                            className="fas fa-link fa-fw"></i></span>
                        <TextField
                            variant={"outlined"}
                            id="smtp_server"
                            name="smtp_server"
                            label="SMTP Server"
                            value={settings.filter(item => item.Name
                                === "smtp_server")[0]?.Preference
                                ? settings.filter(
                                    item => item.Name
                                        === "smtp_server")[0]?.Preference : ""}
                            onChange={(e) => handleChange(e)}
                            size={"small"}
                            style={{
                              width: '94%',
                            }}
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="input-group">
                                                <span
                                                    className="input-group-text"><i
                                                    className="fas fa-hashtag fa-fw"></i></span>
                        <TextField
                            variant={"outlined"}
                            id="smtp_port"
                            name="smtp_port"
                            label="SMTP Port"
                            value={settings.filter(item => item.Name
                                === "smtp_port")[0]?.Preference
                                ? settings.filter(
                                    item => item.Name
                                        === "smtp_port")[0]?.Preference : ""}
                            onChange={(e) => handleChange(e)}
                            size={"small"}
                            style={{
                              width: '94%',
                            }}
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="input-group">
                        <span className="input-group-text"><i
                            className="fas fa-user fa-fw"></i></span>
                        <TextField
                            variant={"outlined"}
                            id="smtp_from_name"
                            name="smtp_from_name"
                            label="SMTP From Name"
                            value={settings.filter(item => item.Name
                                === "smtp_from_name")[0]?.Preference
                                ? settings.filter(
                                    item => item.Name
                                        === "smtp_from_name")[0]?.Preference
                                : ""}
                            onChange={(e) => handleChange(e)}
                            size={"small"}
                            style={{
                              width: '94%',
                            }}
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="input-group">
                                                <span
                                                    className="input-group-text"><i
                                                    className="fas fa-envelope fa-fw"></i></span>
                        <TextField
                            variant={"outlined"}
                            id="smtp_from_email"
                            name="smtp_from_email"
                            label="SMTP From Email"
                            value={settings.filter(item => item.Name
                                === "smtp_from_email")[0]?.Preference
                                ? settings.filter(
                                    item => item.Name
                                        === "smtp_from_email")[0]?.Preference
                                : ""}
                            onChange={(e) => handleChange(e)}
                            size={"small"}
                            style={{
                              width: '94%',
                            }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-xs-12">

                    <div className="mt-5">
                      <div className="input-group">
                        <span className="input-group-text"><i
                            className="fas fa-user fa-fw"></i></span>
                        <TextField
                            variant={"outlined"}
                            id="smtp_user"
                            name="smtp_user"
                            label="SMTP Username"
                            value={settings.filter(item => item.Name
                                === "smtp_user")[0]?.Preference
                                ? settings.filter(
                                    item => item.Name
                                        === "smtp_user")[0]?.Preference : ""}
                            onChange={(e) => handleChange(e)}
                            size={"small"}
                            style={{
                              width: '94%',
                            }}
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="input-group">
                        <span className="input-group-text"><i
                            className="fas fa-lock fa-fw"></i></span>
                        <TextField
                            variant={"outlined"}
                            id="smtp_password"
                            name="smtp_password"
                            label="SMTP Password"
                            type={"password"}
                            value={settings.filter(item => item.Name
                                === "smtp_password")[0]?.Preference
                                ? settings.filter(
                                    item => item.Name
                                        === "smtp_password")[0]?.Preference
                                : ""}
                            onChange={(e) => handleChange(e)}
                            size={"small"}
                            style={{
                              width: '94%',
                            }}
                        />
                      </div>
                    </div>

                  </div>

                </div>
              </div>

              <div className="tab-pane fade" role="tabpanel"
                   aria-labelledby="sms-tab"
                   id="sms-content">

                <div className="row">
                  <div className="col-md-6 col-xs-12">

                    <div className="mt-5">
                      <label htmlFor="sms_provider">Enable Text Message
                        Notifications</label>
                      <div className="input-group">
                        <span
                            className="input-group-text"><i
                            className="far fa-comment-dots fa-fw"></i></span>
                        <FormControl style={{width: '94%'}} size={"small"}>
                          <Select
                              id="sms_enabled"
                              name="sms_enabled"
                              value={settings?.filter(item => item.Name
                                  === "sms_enabled")[0]?.Preference
                                  ? settings.filter(
                                      item => item.Name
                                          === "sms_enabled")[0]?.Preference
                                  : "0"}
                              onChange={(e) => handleChange(e)}
                          >
                            <MenuItem value={"1"}>Yes</MenuItem>
                            <MenuItem value={"0"}>No</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>

                    {settings?.filter(item => item.Name
                            === "sms_enabled")[0]?.Preference === "1" &&
                        <>
                          <div className="mt-3" id="sms-provider-group">
                            <label htmlFor="sms_provider">Text Message
                              Provider</label>
                            <div className="input-group">
                            <span
                                className="input-group-text"><i
                                className="fas fa-question fa-fw"></i></span>
                              <FormControl style={{width: '94%'}}
                                           size={"small"}>
                                <Select
                                    id="sms_provider"
                                    name="sms_provider"
                                    value={settings?.filter(item => item.Name
                                        === "sms_provider")[0]?.Preference
                                        ? settings.filter(
                                            item => item.Name
                                                === "sms_provider")[0]?.Preference
                                        : "0"}
                                    onChange={(e) => handleChange(e)}
                                >
                                  <MenuItem value={"twilio"}>Twilio</MenuItem>
                                </Select>
                              </FormControl>
                            </div>
                          </div>

                        </>
                    }
                  </div>

                  {settings?.filter(item => item.Name
                          === "sms_enabled")[0]?.Preference === "1" &&
                      <>
                        <div className="col-md-6 col-xs-12 twilio">

                          <div className="mt-5 twilio">
                            <label htmlFor="twilio_phone_number">Twilio Phone
                              Number</label>
                            <div className="input-group">
                        <span
                            className="input-group-text"><i
                            className="fas fa-hashtag fa-fw"></i></span>
                              <TextField
                                  variant={"outlined"}
                                  id="twilio_phone_number"
                                  name="twilio_phone_number"
                                  label="Twilio Phone Number"
                                  value={settings.filter(item => item.Name
                                      === "twilio_phone_number")[0]?.Preference
                                      ? settings.filter(
                                          item => item.Name
                                              === "twilio_phone_number")[0]?.Preference
                                      : ""}
                                  onChange={(e) => handleChange(e)}
                                  size={"small"}
                                  style={{
                                    width: '94%',
                                  }}
                              />
                            </div>
                          </div>

                          <div className="mt-3">
                            <label htmlFor="sms_user">Twilio SID</label>
                            <div className="input-group">
                        <span className="input-group-text"><i
                            className="fas fa-user fa-fw"></i></span>
                              <TextField
                                  variant={"outlined"}
                                  id="twilio_sid"
                                  name="twilio_sid"
                                  label="Twilio SID"
                                  value={settings.filter(item => item.Name
                                      === "twilio_sid")[0]?.Preference
                                      ? settings.filter(
                                          item => item.Name
                                              === "twilio_sid")[0]?.Preference
                                      : ""}
                                  onChange={(e) => handleChange(e)}
                                  size={"small"}
                                  style={{
                                    width: '94%',
                                  }}
                              />
                            </div>
                          </div>

                          <div className="mt-3 twilio">
                            <label htmlFor="sms_password">Twilio Auth
                              Token</label>
                            <div className="input-group">
                        <span className="input-group-text"><i
                            className="fas fa-lock fa-fw"></i></span>
                              <TextField
                                  variant={"outlined"}
                                  id="twilio_auth_token"
                                  name="twilio_auth_token"
                                  label="Twilio Auth Token"
                                  value={settings.filter(item => item.Name
                                      === "twilio_auth_token")[0]?.Preference
                                      ? settings.filter(
                                          item => item.Name
                                              === "twilio_auth_token")[0]?.Preference
                                      : ""}
                                  onChange={(e) => handleChange(e)}
                                  size={"small"}
                                  style={{
                                    width: '94%',
                                  }}
                              />
                            </div>
                          </div>


                        </div>
                      </>
                  }
                </div>

              </div>


            </div>

            <hr/>
            <div className="btn-group dropend">
              <ButtonGroup size={"small"}
                           color={"success"}
                           variant="contained" ref={anchorRef}
                           aria-label="split button">
                <Button
                    onClick={handleClick}>{options[selectedIndex]}</Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                  <ArrowDropDownIcon/>
                </Button>
              </ButtonGroup>
              <Popper
                  sx={{
                    zIndex: 1,
                  }}
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
              >
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                              placement === 'bottom' ? 'center top'
                                  : 'center bottom',
                        }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList id="split-button-menu" autoFocusItem>
                            {options.map((option, index) => (
                                <MenuItem
                                    key={option}
                                    disabled={index === 2}
                                    selected={index === selectedIndex}
                                    onClick={(event) => handleMenuItemClick(
                                        event, index)}
                                >
                                  {option}
                                </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                )}
              </Popper>
            </div>
          </div>
        </div>
      </>
  )
}

export default Settings