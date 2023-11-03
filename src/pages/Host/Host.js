import {useEffect, useState} from "react";
import services from "../../Services";
import {warningAlert} from "../Admin/js/attention";
import HostsTab from "../ContentTabs/HostTab";
import ManageServiceTab from "../ContentTabs/ManageServiceTab";
import TabHeaders from "../ContentTabs/TabHeaders";
import HealthyTab from "../ContentTabs/HealthyTab";
import ProblemTab from "../ContentTabs/ProblemTab";
import WarningTab from "../ContentTabs/WarningTab";
import PendingTab from "../ContentTabs/PendingTab";

function Host(props) {

  const [host, setHost] = useState({});

  useEffect(() => {
    services.monitoringApiService.fetchHost(props.match.params.hostId).then(
        (res) => {
          setHost(res.data.host)
        }).catch((err) => {
      warningAlert(err.message)
    });
  }, [props.match.params.hostId]);

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
              <li className="breadcrumb-item"><a href="/overview">Overview</a>
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

            <form method="post" action={"/admin/host/" + host.ID} noValidate
                  className="needs-validation"
                  id="host-form">

              <TabHeaders host={host} handleTabChanges={handleTabChanges}/>

              <div className="tab-content" id="host-tab-content"
                   style={{minHeight: '58vh'}}>

                <HostsTab host={host}/>
                {host && <ManageServiceTab host={host}/>}
                {host && <HealthyTab host={host}/>}
                {host && <ProblemTab host={host}/>}
                {host && <WarningTab host={host}/>}
                {host && <PendingTab host={host}/>}

              </div>
            </form>
          </div>
        </div>
      </>
  )

}

export default Host;