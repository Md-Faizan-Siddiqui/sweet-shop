import { useGlobalState, useGlobalStateUpdate } from "../../context/globalContext"
import "./login.css"
import axios from "axios"
import { useHistory } from "react-router-dom"
import React, { useState } from "react"

function Login() {

    const globalState = useGlobalState()
    const setGlobalState = useGlobalStateUpdate()
    console.log(globalState)
    let url = "http://localhost:5000"
    let history = useHistory();

    function login(e) {
        e.preventDefault()
        axios({
            method: 'post',
            url: url + '/login',
            data: {
                email: document.getElementById('lemail').value,
                password: document.getElementById('lpas').value,
            },
            credentials: true
             //true
        }).then((response) => {
            if (response.data.status === 200) {
                setGlobalState(prev=>({
                    ...prev,
                    loginStatus: true,
                    user: response.data.user
                }))
            }
            else {
                alert(response.data.message)
            }
        }, (error) => {
            console.log(error);
        });
        return false
    }

    return (
        <div className="container">
            <h1 className="text-center">Login</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={login}>
                        <div className="form-group">

                            <input type="email" className="form-control" id="lemail" aria-describedby="emailHelp" placeholder="Enter email" required />
                        </div>
                        <br></br>
                        <div className="form-group">

                            <input type="password" className="form-control" id="lpas" placeholder="Password" required />
                        </div>
                        <br></br>
                        {/* <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login; 