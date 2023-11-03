import React, {useEffect, useRef, useState} from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import {TextField} from "@mui/material";
import SwitchButton from "../../components/buttons/SwitchButton";
import {useHistory} from "react-router-dom";
import services from "../../Services";
import {successAlert, warningAlert} from "../Admin/js/attention";
import {checkObjectEquality} from "../../Utils/utils";

const HostTab = (props) => {

  const options = ['Save & Close', 'Save & Continue'];
  const [host, setHost] = useState({});
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const history = useHistory();
  const [anyChanges, setAnyChanges] = useState(true);

  useEffect(() => {
    setHost({...props.host});
  }, [props.host]);

  const handleChange = (e) => {
    setHost({...host, [e.target.id]: e.target.value})
    if (e.target.id === "Active") {
      const value = e.target.checked ? 1 : 0;
      setHost({...host, [e.target.id]: value})
    }
    checkHostChangeOrNot();
  }

  const checkHostChangeOrNot = () => {
    if (checkObjectEquality(host, props.host)) {
      setAnyChanges(false)
    } else {
      setAnyChanges(true)
    }
  }

  const hasFormAnyError = () => {
    return host.HostName === "" || host.CanonicalName === "" || host.URL === "";
  };

  const handleClick = () => {
    if (hasFormAnyError()) {
      warningAlert("Please fill all required fields")
      return;
    }
    services.monitoringApiService.updateHost(host, host.ID).then((res) => {
      if (res.data.ok === true) {
        successAlert("Host updated successfully")
      } else {
        warningAlert(res.data.message)
      }
    }).catch((err) => {
      warningAlert(err.message)
    }).finally(() => {
      if (selectedIndex === 0) {
        history.push("/hosts")
      }
    });
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

  return (
      <>
        <div className="tab-pane fade show active" role="tabpanel"
             aria-labelledby="host-tab"
             id="host-content">
          <div className="row">
            <div className="col-md-6 col-xs-12">

              <div className="mt-4">
                <TextField
                    required
                    error={host?.HostName === ""}
                    variant={"outlined"}
                    id="HostName"
                    name="host_name"
                    label="Host Name"
                    value={host?.HostName ? host.HostName.toString() : ""}
                    onChange={(e) => handleChange(e)}
                    size={"small"}
                    style={{
                      width: '100%',
                    }}
                />
              </div>

              <div className="mt-4">
                <TextField
                    required
                    variant={"outlined"}
                    error={host?.CanonicalName === ""}
                    id="CanonicalName"
                    name="canonical_name"
                    label="Canonical Name"
                    value={host?.CanonicalName ? host.CanonicalName.toString()
                        : ""}
                    onChange={(e) => handleChange(e)}
                    size={"small"}
                    style={{
                      width: '100%',
                    }}
                />
              </div>

              <div className="mt-4">
                <TextField
                    required
                    variant={"outlined"}
                    error={host?.URL === ""}
                    id="URL"
                    name="url"
                    label="URL"
                    value={host?.URL ? host.URL.toString() : ""}
                    onChange={(e) => handleChange(e)}
                    size={"small"}
                    style={{
                      width: '100%',
                    }}
                />
              </div>

              <div className="mt-4">
                <TextField
                    id="IP"
                    name="ip"
                    label="IP Address (v4)"
                    value={host?.IP ? host.IP.toString() : ""}
                    onChange={(e) => handleChange(e)}
                    size={"small"}
                    style={{
                      width: '100%',
                    }}
                />
              </div>

              <div className="mt-4">
                <TextField
                    id="IPV6"
                    name="ipv6"
                    label="IP Address (v6)"
                    value={host?.IPV6 ? host.IPV6.toString() : ""}
                    onChange={(e) => handleChange(e)}
                    size={"small"}
                    style={{
                      width: '100%',
                    }}
                />
              </div>
            </div>

            <div className="col-md-6 col-xs-12">
              <div className="mt-4">
                <TextField
                    id="Location"
                    name="location"
                    label="Location"
                    value={host?.Location ? host.Location.toString() : ""}
                    onChange={(e) => handleChange(e)}
                    size={"small"}
                    style={{
                      width: '100%',
                    }}
                />
              </div>

              <div className="mt-4">
                <TextField
                    id="OS"
                    name="os"
                    label="Operating System"
                    value={host?.OS ? host.OS.toString() : ""}
                    onChange={(e) => handleChange(e)}
                    size={"small"}
                    style={{
                      width: '100%',
                    }}
                />
              </div>

              <div className="mt-4">
                <SwitchButton
                    label="Active"
                    id="Active"
                    checked={host?.Active ? host.Active : false}
                    handleToggle={(e) => {
                      handleChange(e)
                    }}
                />
              </div>
            </div>
          </div>
          <div className="row" style={{marginTop: "16vh"}}>
            <div className="col">
              <hr/>
              <div className="btn-group dropend">
                <ButtonGroup size={"small"}
                             color={"success"}
                             variant="contained" ref={anchorRef}
                             aria-label="split button">
                  <Button
                      disabled={anyChanges}
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

              <a className="btn btn-info ml-2"
                 href="/hosts">Cancel</a>
            </div>
          </div>
        </div>
      </>
  )
}

export default HostTab