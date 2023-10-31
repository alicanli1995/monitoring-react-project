import React from 'react';
import ReactDOM from 'react-dom/client';
import Sidebar from "./pages/Sidebar/Sidebar";
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom"
import Hosts from "./pages/Hosts/Hosts";
import HomePage from "./pages/HomePage/HomePage";
import Host from "./pages/Host/Host";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.Fragment>
      <BrowserRouter>
        <Sidebar>
          <Switch>
            <Route path="/hosts">
              <Hosts/>
            </Route>

            <Route path="/host/:hostId" render={(props) => {
              return <Host {...props}/>
            }}>
            </Route>

            <Route path="/">
              <HomePage/>
            </Route>

          </Switch>
        </Sidebar>
      </BrowserRouter>
    </React.Fragment>
);

