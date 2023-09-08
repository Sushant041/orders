import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "./Alert";



export const Login = () => {


    let navigate = useNavigate();

  const [Loading, setLoading] = useState(false);

  const [alert, setAlert] = useState(null);
  const [displayalert, setdisplayalert] = useState(false);

  const showAlert = (message, type)=>{
    setdisplayalert(true)
    setAlert({
      msg: message,
      type: type
    })
  }



  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
;



  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleClick2 = async (e) => {
    e.preventDefault();

    setLoading(true);
    const { email, password } = credentials;

    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      setLoading(false);
      const json = await response.json();

      if (json.success) {
        setLoading(false);

        localStorage.setItem("token", JSON.stringify(json));

        showAlert("Logged in successfully", "success")
        
        setTimeout(() => {
           navigate("/");      
          }, 2000);
      }
      
      else {
        setLoading(false);
        alert("Invalid Credentials", "danger");
      }
    } catch (error) {
        console.log(error);
    }
  };


    if (Loading) {
        return (<div className="my-5" style={{textAlign: "center", color: "green"}}>
              <h3>Loading......</h3>
             <div className="lds-ring">
             <div></div><div></div><div></div><div></div></div> 
              </div>)
      }
    

  return (

    <div
    className="d-flex lnsp flex-column align-items-center justify-content-center "
    style={{ height: 100+"vh"}}
  >
     <Alert alert={alert} displayalert={displayalert}/>
    <div className="d-flex flex-column align-items-center justify-content-center "
       style={{ width: "380px", backgroundColor: "floralwhite", borderRadius: "5px", boxShadow: "2px 2px 40px #ffffbe" }}>

        <div className="display-5 mt-2" style={{color: "green"}}>
           Login
        </div>
            <hr style={{width: "320px"}} />

    <div className="d-flex justify-content-center mb-5" style={{width: "100%"}}>
      <form style={{width: "85%"}} onSubmit={handleClick2}>
        <div className="form-floating my-3">
          <input
            type="email"
            className="form-control"
            id="floatingPassword"
            name="email"
            required
            placeholder="Email"
            onChange={onChange}
          />
          <label htmlFor="floatingPassword">Email</label>
        </div>

        <div className="form-floating mt-3">
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            id="password"
            name="password"
            required
            placeholder="Password"
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
        </div>

        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <button
            className="btn btn-primary mt-3 "
            type="submit"
            style={{ width: "100%", background: "green", border: "2px solid black" }}
          >
            Log in
          </button>
        </div>
        <div
          className="d-flex justify-content-center mt-3 align-items-center"
          style={{ width: "100%"}}
        >
           New User?
          <Link style={{color: "green"}} to="/signup" className="btn">Signup</Link>
        </div>
      </form>
    </div>
</div>
</div>
  );
};