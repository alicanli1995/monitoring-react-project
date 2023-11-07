import {useEffect, useState} from "react";
import services from "../../services";
import {warningAlert} from "../../partials/pusher-js/attention";
import HostsTab from "../ContentTabs/HostTab";
import ManageServiceTab from "../ContentTabs/ManageServiceTab";
import TabHeaders from "../ContentTabs/TabHeaders";
import StatusTabs from "../ContentTabs/StatusTabs";
import {publicChannel} from "../../partials/WebServer";
import * as attention from "../../partials/pusher-js/attention";

function Host(props) {

  const [host, setHost] = useState({});

  useEffect(  () => {
    services.monitoringApiService.fetchHost(
        props.match.params.hostId).then(
        (res) => {
          setHost(res.data.host)
        }).catch((err) => {
      warningAlert(err.message)
    });

    publicChannel.bind("host-service-status-changed",  function (data) {
      attention.toast({
        msg: data.message, icon: 'info', timer: 30000, showCloseButton: true,
      })
      console.log("here aq")
      services.monitoringApiService.fetchHost(
          props.match.params.hostId).then(
          (res) => {
            setHost(res.data.host)
          }).catch((err) => {
        warningAlert(err.message)
      });
    });

  }, []);

  const handleTabChanges = (e) => {
    let tabList = ['services-tab', 'healthy-tab', 'warning-tab', 'problem-tab',
      'pending-tab', 'host-tab'];
    services.monitoringApiService.fetchHost(props.match.params.hostId).then(
        (res) => {
          setHost(res.data.host)
        }).catch((err) => {
      warningAlert(err.message)
    });

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
              <li className="breadcrumb-item"><a href="/">Overview</a>
              </li>
              <li className="breadcrumb-item"><a href="/hosts">Hosts</a></li>
              <li className="breadcrumb-item active">Host</li>
            </ol>
            <h4 className="mt-4">Host</h4>
            <hr/>
          </div>
        </div>


        <div className="row">
          <div className="col">


            <div className="tab-content" id="host-tab-content"
                 style={{minHeight: '58vh'}}>
              <TabHeaders host={host} handleTabChanges={handleTabChanges}/>

              <HostsTab host={host}/>
              {host && <ManageServiceTab host={host}/>}
              {host && ["healthy", "warning", "problem", "pending"].map(
                  (status, index) => {
                    return (
                        <StatusTabs key={index} host={host} status={status}/>
                    )
                  })}
            </div>
          </div>
        </div>
      </>
  )

}

export default Host;