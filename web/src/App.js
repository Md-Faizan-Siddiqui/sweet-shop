import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import React from "react";
// import { link } from 'react-router-dom'

import Login from "./components/login/login"
import Singup from "./components/signup/signup"
import Dashboard from "./components/dashboard/dashboard"
import axios from "axios";
import { useGlobalState, useGlobalStateUpdate } from "./context/globalContext"

function App() {

  const globalState = useGlobalState()
  const setGlobalState = useGlobalStateUpdate()

  console.log(globalState)

  function handleLogout() {
    axios({
      url: "http://localhost:3000/logout",
      method: "POST",
      withCredentials: true
    })
      .then(function (response) {
        console.log("response: ", response.data);
        setGlobalState(prev => {
          return { ...prev, loginStatus: false }
        })
      })

  }

  return (
    <div className="App">

      <Router>
        <div>

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Food</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {globalState && globalState.loginStatus === true ?
                <>
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item active">
                      <Link className="nav-link" to="/dashboard">Dashboard </Link>
                    </li>
                    <button className="btn btn-outline-success ml-4" onClick={handleLogout} >Logout</button>
                  </ul> </> :
                <>
                  <button className="btn btn-outline-success"  id="btns" >
                    <Link className="nav-link" to="/" >Signup</Link>
                  </button>
                  <button className="btn btn-outline-success ml-4" >
                    <Link className="nav-link" to="/login" id="btnl">Login </Link>
                  </button>
                </>
              }
            </div>
          </nav>

        </div>

        {(globalState.loginStatus === false) ?

          <>
            <Route path="/login">
              <Login />
            </Route>

            <Route exact path="/">
              <Singup />
            </Route>


            <Route path="*">
              <Redirect to="/" />
            </Route>
          </>
          : null}

        {(globalState.loginStatus === true) ?

          <>
            <Route exact path="/">
              <Dashboard />
            </Route>

            <Route path="*">
              <Redirect to="/" />
            </Route>
          </>
          : null}
      </Router>

    </div>
  );
}

export default App