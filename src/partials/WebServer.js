import {useContext, useEffect} from 'react';
import {Prompt, successAlert, warningAlert} from "../pages/Admin/js/attention";
import Pusher from "../pages/Admin/js/pusher.min";
import {DataContext} from "../components/misc/DataContextProvider";
import * as attention from "../pages/Admin/js/attention";
import {dateFormatter} from "../utils/utils";

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
    });

    publicChannel.bind("app-stopping", function (data) {
      warningAlert(data.message);

      let scheduledTableExist = !!document.getElementById("schedule-table");
      if (scheduledTableExist) {
        let tableRef = document.getElementById("schedule-table");
        tableRef.tBodies[0].innerHTML = "";

        let newRow = tableRef.tBodies[0].insertRow(-1);
        let newCell = newRow.insertCell(0);
        newCell.setAttribute("colspan", "5");
        newCell.innerHTML = "No scheduled checks";
      }
    });

    publicChannel.bind("schedule-changed-event", function (data) {
      let tableRef = document.getElementById("schedule-table");

      if (tableRef) {
        let tableContent = tableRef.innerHTML;
        if (tableContent.includes("No scheduled checks") || tableContent === ""
            || tableContent === undefined || tableContent === null) {
          let rowCount = tableRef.rows.length;
          for (let i = rowCount - 1; i > 0; i--) {
            tableRef.deleteRow(i);
          }
        }

        // delete existing row
        let exists = !!document.getElementById(
            "schedule-" + data.host_service_id);
        if (exists) {
          let row = document.getElementById("schedule-" + data.host_service_id);
          row.parentNode.removeChild(row);
        }

        // add in the new row
        let newRow = tableRef.tBodies[0].insertRow(-1);
        newRow.setAttribute("id", "schedule-" + data.host_service_id);

        let newCell = newRow.insertCell(0);
        let newText = document.createTextNode(data.host);
        newCell.appendChild(newText);

        let newCell2 = newRow.insertCell(1);
        let newText2 = document.createTextNode(data.service);
        newCell2.appendChild(newText2);

        let newCell3 = newRow.insertCell(2);
        let newText3 = document.createTextNode(data.schedule);
        newCell3.appendChild(newText3);

        let newCell4 = newRow.insertCell(3);
        let newText4 = document.createTextNode(data.last_run);
        newCell4.appendChild(newText4);

        let newCell5 = newRow.insertCell(4);
        if (data.next_run === undefined) {
          newText = document.createTextNode("Pending...");
        } else {
          newText = document.createTextNode(data.next_run);
        }
        newCell5.appendChild(newText);
      }
    });

    publicChannel.bind("schedule-item-removed-event", function (data) {
      let rowExist = !!document.getElementById(
          "schedule-" + data.host_service_id);
      if (rowExist) {
        let tableRef = document.getElementById(
            "schedule-" + data.host_service_id);
        tableRef.parentNode.removeChild(tableRef);

        let currentTable = document.getElementById("schedule-table");
        if (currentTable.rows.length === 1) {
          let newRow = currentTable.tBodies[0].insertRow(-1);
          let newCell = newRow.insertCell(0);
          newCell.setAttribute("colspan", "5");
          newCell.innerHTML = "No scheduled checks";
        }
      }
    })

    publicChannel.bind("host-service-status-changed", function (data) {
      attention.toast({
        msg: data.message, icon: 'info', timer: 30000, showCloseButton: true,
      })

      deleteHostServiceRow(data.host_service_id);

      updateHostServiceTable(data);

    });

    function updateHostServiceTable(data) {
      // update the tables, if the row exists, update it, if not, add it
      let table = !!document.getElementById(data.status + "-table");
      if (table) {
        let tableRef = document.getElementById(data.status + "-table");

        let tableContent = tableRef.innerText;
        if (tableContent.includes("No Services") || tableContent === ""
            || tableContent === undefined || tableContent === null) {
            tableRef.deleteRow(1);
        }

        let newRow = tableRef.tBodies[0].insertRow(-1);
        newRow.setAttribute("id", "host-service-" + data.host_service_id);
        let newCell = newRow.insertCell(0);
        newCell.innerHTML = `
            <span class="${data.icon}"></span>
            ${data.service_name}
            <span class="badge bg-info pointer align-middle" onclick="checkNow(data.host_service_id, '${data.status}')">Check Now</span>
      `;

        let newCell2 = newRow.insertCell(1);
        if (data.status !== 'pending') {
          const date = dateFormatter(data.last_check)
          newCell2.innerHTML = `
           ${date}
        `;
        } else {
          newCell2.innerHTML = `
            Pending...
        `;
        }

        let newCell3 = newRow.insertCell(2);

      }
    }

    function deleteHostServiceRow(hostServiceID) {
      let exists = !!document.getElementById("host-service-" + hostServiceID);
      if (exists) {
        let row = document.getElementById("host-service-" + hostServiceID);
        row.parentNode.removeChild(row);
        let tables = ["healthy", "pending", "warning", "problem"];
        for (let i = 0; i < tables.length; i++) {
          let currentTableExists = !!document.getElementById(
              tables[i] + "-table");
          if (currentTableExists) {
            let currentTable = document.getElementById(tables[i] + "-table");
            if (currentTable.rows.length === 1) {
              let newRow = currentTable.tBodies[0].insertRow(-1);
              let newCell = newRow.insertCell(0);
              newCell.setAttribute("colspan", "3");
              newCell.innerHTML = "No Services";
            }
          }
        }
      }
    }

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
