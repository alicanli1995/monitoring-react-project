import {useEffect, useState} from "react";
import services from "../../services";
import {warningAlert} from "../../components/notify/attention";
import StickyHeadTable from "../../components/table/TableWithPaginations";
import {Badge} from "@mui/material";
import {useHistory} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

const Users = () => {

  const [users, setUsers] = useState([]);
  const history = useHistory();
  const columns = [{field: 'id', headerName: 'ID', width: 270},
    {
      field: 'User',
      headerName: 'User',
      width: 270,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'Email',
      headerName: 'Email',
      width: 300,
      align: 'center',
      headerAlign: 'center'
    }, {
      field: 'Status',
      headerName: 'Service',
      width: 170,
      align: 'center',
      headerAlign: 'center',
    }, {
      field: 'CreatedAt',
      headerName: 'Date/Time',
      width: 270,
      align: 'center',
      headerAlign: 'center',
    }, {
      field: 'Action',
      headerName: 'Action',
      width: 80,
      align: 'center', headerAlign: 'center',
      renderCell: (params) => (
          <Badge color="primary"
                 onClick={() => {
                   history.push(`/user/${params.row.id}`)
                 }}
                 style={{
                   cursor: 'pointer', alignContent: 'center'
                 }}>
            <EditIcon color="action"/>
          </Badge>
      )
    }
  ];

  useEffect(() => {
    services.monitoringApiService.fetchUsers().then((res) => {
      res.data.map((user) => {
        user.id = user.ID
        user.User = `${user.FirstName} ${user.LastName}`
        user.Status = user.UserActive === 1 ? 'Active' : 'Inactive'
        user.CreatedAt = user.CreatedAt.split('T')[0]
      })
      setUsers(res.data)
    }).catch((err) => {
      warningAlert(err.message)
    });
  }, []);

  return (
      <>
        <div className="row">
          <div className="col">
            <ol className="breadcrumb mt-1">
              <li className="breadcrumb-item"><a href="/">Overview</a></li>
              <li className="breadcrumb-item active">Users</li>
            </ol>
            <h4 className="mt-4">Users</h4>
            <hr/>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="float-right">
              <a href="/user/0" className="btn btn-outline-secondary">New
                User</a>
            </div>
            <div className="clearfix mb-2"></div>
            <div className="row">
              <div className="col">
                <StickyHeadTable datas={users} columns={columns}/>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default Users;