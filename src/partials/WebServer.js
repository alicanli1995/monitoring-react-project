import {useContext, useEffect} from 'react';
import {successAlert, warningAlert} from "../pages/Admin/js/attention";
import Pusher from "../pages/Admin/js/pusher.min";
import {DataContext} from "../pages/misc/DataContextProvider";

const WebServer = () => {
  const pusherKey = "abc123";

  const {setServicesCount} = useContext(DataContext)

  useEffect(() => {
    let pusher = new Pusher(pusherKey, {
      authEndPoint: "/pusher/auth",
      wsHost: "localhost",
      wsPort: 4001,
      forceTLS: false,
      enabledTransports: ["ws", "wss"],
      disabledTransports: []
    });

    const publicChannel = pusher.subscribe("public-channel");

    publicChannel.bind("app-starting", function (data) {
      successAlert(data.message);
      console.log(data, "data")
    });

    publicChannel.bind("app-stopping", function (data) {
      warningAlert(data.message);

      // Rest of your logic for stopping app

      console.log(data, "data")
    });

    publicChannel.bind("schedule-changed-event", function (data) {
      // Handle schedule changes
    });

    publicChannel.bind("schedule-item-removed-event", function (data) {
      // Handle removed schedule items
    });

    publicChannel.bind("host-service-status-changed", function (data) {
      // Handle host-service status changes
    });

    publicChannel.bind("host-service-count-changed", function (data) {
      setServicesCount({
        healthy: data.healthy_count,
        warning: data.warning_count,
        problem: data.problem_count,
        pending: data.pending_count,
      })
    });

    return () => {
      // Cleanup code for when component unmounts
      pusher.disconnect();
    };
  }, []);

};

export default WebServer;
