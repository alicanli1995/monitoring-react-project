// import React, {useEffect, useState} from 'react';
// import {successAlert, warningAlert, Prompt} from "../pages/Admin/js/attention";
// import Pusher from "pusher-js";
//
// const WebServer = () => {
//   const [showMonitoring, setShowMonitoring] = useState(true);
//   const [pusherKey, setPusherKey] = useState("");
//
//   useEffect(() => {
//     const pusher = new Pusher("PUSHER_APP_KEY", {
//           // wsHost: "localhost",
//           // authEndPoint: "/pusher/auth",
//           // wsPort: 4001,
//           // forceTLS: false,
//           // enabledTransports:  ["ws", "wss"],
//           // disabledTransports: []
//           channelAuthorization: {
//             endpoint: "/pusher/auth",
//           },
//           wsHost: "localhost",
//           wssPort: 4001,
//           forceTLS: false,
//           enabledTransports: ["ws", "wss"],
//           disabledTransports: [],
//         }
//     );
//
//     const publicChannel = pusher.subscribe("public-channel");
//     const privateChannel = pusher.subscribe(`private-channel-USER-ID`);
//
//     privateChannel.bind("private-message", function (data) {
//       Prompt.toast({
//         msg: data.message,
//         icon: 'success',
//       });
//     });
//
//     publicChannel.bind("app-starting", function (data) {
//       setShowMonitoring(true);
//       successAlert(data.message);
//     });
//
//     publicChannel.bind("app-stopping", function (data) {
//       warningAlert(data.message);
//       setShowMonitoring(false);
//
//       // Rest of your logic for stopping app
//     });
//
//     publicChannel.bind("schedule-changed-event", function (data) {
//       // Handle schedule changes
//     });
//
//     publicChannel.bind("schedule-item-removed-event", function (data) {
//       // Handle removed schedule items
//     });
//
//     publicChannel.bind("host-service-status-changed", function (data) {
//       // Handle host-service status changes
//     });
//
//     publicChannel.bind("host-service-count-changed", function (data) {
//       // Handle host-service count changes
//     });
//
//     return () => {
//       // Cleanup code for when component unmounts
//       pusher.disconnect();
//     };
//   }, []);
//
//   const handleMonitoringChange = (enabled) => {
//     if (!enabled) {
//       Prompt.confirm({
//         html: "Are you sure you want to disable live monitoring?",
//         callback: function (result) {
//           if (result) {
//             updateSystemPref("monitoring_live", "0");
//             toggleMonitoring(false);
//           }
//         },
//       });
//     } else {
//       updateSystemPref("monitoring_live", "1");
//       toggleMonitoring(true);
//     }
//   };
//
//   const updateSystemPref = (prefName, prefValue) => {
//     // Implement the code to update system preferences
//   };
//
//   const toggleMonitoring = (enabled) => {
//     // Implement the code to toggle monitoring
//   };
//
//   return (
//       <div>
//         {/* Your JSX for the PusherPage */}
//       </div>
//   );
// };
//
// export default WebServer;
