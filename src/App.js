import DataContextProvider from "./components/misc/DataContextProvider";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {Routes} from "react-router";
import Login from "./pages/Login/login";
import WebServer from "./partials/WebServer";
import Sidebar from "./pages/Sidebar/Sidebar";
import Hosts from "./pages/Hosts/Hosts";
import Host from "./pages/Host/Host";
import Home from "./pages/Home/Home";
import Healthy from "./pages/AllServices/Healthy";
import Problem from "./pages/AllServices/Problem";
import Warning from "./pages/AllServices/Warning";
import Pending from "./pages/AllServices/Pending";
import Events from "./pages/Events/events";
import Schedule from "./pages/Schedule/Schedule";
import Users from "./pages/Users/users";
import User from "./pages/Users/user";
import React, {useEffect, useState} from "react";

function App() {
  const [showNav, setShowNav] = useState(
      window.location.pathname !== '/login'
  );

  useEffect(() => {
    setShowNav(window.location.pathname !== '/login')
  }, [window.location.pathname]);

  const [isAuthenticated, setIsAuthenticated] = useState(
      localStorage.getItem("access_token") !== null &&
      localStorage.getItem("access_token").length > 40
  );

  return (
        <DataContextProvider>
          <BrowserRouter>
            <Route path="/login" exact>
              <Login/>
            </Route>
            {showNav && isAuthenticated ?
                <Sidebar>
                  <WebServer/>
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
                :
                <Redirect to="/login"/>
            }
          </BrowserRouter>
        </DataContextProvider>
  )
}

export default App;