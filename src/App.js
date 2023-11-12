import DataContextProvider from "./components/misc/DataContextProvider";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import WebServer from "./partials/WebServer";
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
import Settings from "./pages/Settings/settings";
import {NotFoundTitle} from "./pages/Error/NotFoundPage";
import SideMenu from "./pages/Sidebar/SideMenu";
import ResponseTimeGraph from "./pages/Graphics/response-time-graph";
import Login from "./pages/Login/login";

function App() {
  const [showNav, setShowNav] = useState(
      window.location.pathname !== '/login'
  );

  useEffect(() => {
    setShowNav(window.location.pathname !== '/login')
  }, [window.location.pathname]);

  const isAuthenticated = localStorage.getItem("access_token") !== null
      && localStorage.getItem("access_token").length > 40;

  return (
      <DataContextProvider>
        <BrowserRouter>
          <Route path="/login" exact>
            <Login/>
          </Route>
          {showNav && isAuthenticated ?
              <SideMenu>
                <WebServer/>
                <Switch>
                  <Route path="/hosts" exact>
                    <Hosts/>
                  </Route>

                  <Route path="/host/:hostId" render={(props) => {
                    return <Host {...props}/>
                  }}/>

                  <Route path="/" exact>
                    <Home/>
                  </Route>

                  <Route path="/all-healthy" exact render={(props) => {
                    return <Healthy {...props}/>
                  }}/>

                  <Route path="/all-problem" exact render={(props) => {
                    return <Problem {...props}/>
                  }}/>

                  <Route path="/all-warning" exact render={(props) => {
                    return <Warning {...props}/>
                  }}/>

                  <Route path="/all-pending" exact render={(props) => {
                    return <Pending {...props}/>
                  }}/>

                  <Route path="/events" exact render={(props) => {
                    return <Events {...props}/>
                  }}/>

                  <Route path="/schedule" exact render={(props) => {
                    return <Schedule {...props}/>
                  }}/>

                  <Route path="/users" exact render={(props) => {
                    return <Users {...props}/>
                  }}/>

                  <Route path="/user/:id" exact render={(props) => {
                    return <User {...props}/>
                  }}/>

                  <Route path="/settings" exact render={(props) => {
                    return <Settings {...props}/>
                  }}/>

                  <Route path="/statistics" exact render={(props) => {
                    return <ResponseTimeGraph {...props}/>
                  }}/>

                  <Route path="*" exact render={(props) => {
                    return <NotFoundTitle {...props}/>
                  }}/>
                </Switch>
              </SideMenu>
            :
            <Redirect to="/login"/>
          }
        </BrowserRouter>
      </DataContextProvider>
)
}

export default App;