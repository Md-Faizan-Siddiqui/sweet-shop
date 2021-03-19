import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalStateContext = React.createContext()
const GlobalStateUpdateContext = React.createContext()

export const useGlobalState = () => useContext(GlobalStateContext)
export const useGlobalStateUpdate = () => useContext(GlobalStateUpdateContext)

export function GlobalStateProvider({ children }) {

    useEffect(() => {
        axios({
            method: "get",
            url: 'http://localhost:5000/profile',
            withCredentials: true
        })
            .then(function (response) {
                // handle success
                console.log("response: ", response);
                if (response.data.status === 200) {
                    setData(prev => ({ ...prev, loginStatus: true , user:response.data.profile }))
                }
            })
            .catch(function (error) {
                // handle error
                console.log("error: ==== ", error);
                if (error && error.response && error.response.status) {
                    console.log("error ==============> ", error.response.status);
                    setData(prev => ({ ...prev, loginStatus: false }))
                }
            })

        return () => {
            console.log("cleanup")
        }
    }, [])

    const [data, setData] = useState({
        user: null,
        darkTheme: false,
        loginStatus: false,
        anythingElse: null
    })

    console.log(data)
    return (
        <GlobalStateContext.Provider value={data}>
            <GlobalStateUpdateContext.Provider value={setData}>
                {children}
            </GlobalStateUpdateContext.Provider>
        </GlobalStateContext.Provider>
    )
}