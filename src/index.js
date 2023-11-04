import React from 'react';
import ReactDOM from 'react-dom/client';
import Sidebar from "./pages/Sidebar/Sidebar";
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom"
import Hosts from "./pages/Hosts/Hosts";
import Home from "./pages/Home/Home";
import Host from "./pages/Host/Host";
import WebServer from "./partials/WebServer";
import DataContextProvider from "./components/misc/DataContextProvider";
import Healthy from "./pages/AllServices/Healthy";
import Problem from "./pages/AllServices/Problem";
import Warning from "./pages/AllServices/Warning";
import Pending from "./pages/AllServices/Pending";
import Events from "./pages/Events/events";
import Schedule from "./pages/Schedule/Schedule";
import Users from "./pages/Users/users";
import User from "./pages/Users/user";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DataContextProvider>
      <BrowserRouter>
        <WebServer/>
        <Sidebar>
          <Switch>
            <Route path="/hosts">
              <Hosts/>
            </Route>

            <Route path="/host/:hostId" render={(props) => {
              return <Host {...props}/>
            }}/>

            <Route path="/" exact>
              <Home/>
            </Route>

            <Route path="/all-healthy" render={(props) => {
              return <Healthy {...props}/>
            }}/>

            <Route path="/all-problem" render={(props) => {
              return <Problem {...props}/>
            }}/>

            <Route path="/all-warning" render={(props) => {
              return <Warning {...props}/>
            }}/>

            <Route path="/all-pending" render={(props) => {
              return <Pending {...props}/>
            }}/>

            <Route path="/events" render={(props) => {
              return <Events {...props}/>
            }}/>

            <Route path="/schedule" render={(props) => {
              return <Schedule {...props}/>
            }}/>

            <Route path="/users" render={(props) => {
              return <Users {...props}/>
            }}/>

            <Route path="/user/:id" render={(props) => {
              return <User {...props}/>
            }}/>
          </Switch>
        </Sidebar>
      </BrowserRouter>
    </DataContextProvider>
);

