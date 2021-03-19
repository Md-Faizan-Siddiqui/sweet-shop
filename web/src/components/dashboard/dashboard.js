import axios from "axios"
import { useState } from "react";
import React from "react"
import "./dashboard.css"
import {useGlobalState,useGlobalStateUpdate} from '../../context/globalContext'

function Dashboard() {
  const globalState = useGlobalState()
  console.log(globalState)
  return (
    <div>

      <div className="card">
        <img src="/1.jpg" alt="Denim Jeans" style={{width: "100%"}} />
          <h1>Tailored Jeans</h1>
          <p class="price">$19.99</p>
          <p>Some text about the jeans. Super slim and comfy lorem ipsum lorem jeansum. Lorem jeamsun denim lorem jeansum.</p>
          <p><button>Add to Cart</button></p>
      </div>
      </div>
 )   
}
export default Dashboard;


