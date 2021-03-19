import "./signup.css"
import axios from "axios"
import { useHistory } from "react-router-dom"



function Singup() {
    let url = "http://localhost:5000"
    let history = useHistory();
    function userSignup(e) {
        e.preventDefault() 
        axios({
            method: 'post',
            url: url + '/signup',
            data: {
                name: document.getElementById('sname').value,
                email: document.getElementById('semail').value,
                password: document.getElementById('spas').value,
                phone: document.getElementById('sphone').value,
            },
            withCredentials: true
        }).then((response) => {
            if (response.data.status === 200) {
                alert(response.data.message)
                history.push("/login")
                
            } else {
                alert(response.data.message);
            }
        }).catch((error) => {
            console.log(error);
        });
        return false
    }


    return (
        <div className="container">
            <h1 className="text-center">Sign Up</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={userSignup}>
                        <div className="form-group">                
                            <input type="text" className="form-control" id="sname" aria-describedby="nameHelp" placeholder="Enter name" required/>
                        </div>
                        <br></br>
                        <div className="form-group">   
                            <input type="email" className="form-control" id="semail" aria-describedby="emailHelp" placeholder="Enter email" required/>
                        </div>
                        <br></br>
                        <div className="form-group">
                            
                            <input type="text" className="form-control" id="sphone" aria-describedby="phonelHelp" placeholder="Enter phone" required/>
                        </div>
                        <br></br>
                        <div className="form-group">
                            
                            <input type="password" className="form-control" id="spas" placeholder="Password" required/>
                        </div>
                        <br></br>
                        {/* <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}

                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )

}
export default Singup;