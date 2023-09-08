import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "./Alert";


export const Signup = () => {


    let navigate = useNavigate();
    const [Loading, setLoading] = useState(false);

    const [alert, setAlert] = useState(null);
  const [displayalert, setdisplayalert] = useState(false);

  const showAlert = (message, type)=>{
    setdisplayalert(true)
    console.log("hii")
    setAlert({
      msg: message,
      type: type
    })
  }

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    pic: "",
  });


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };




  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      setLoading(false);
      alert("password did not match");
      return 0;
    }
    // showAlert("Registration Successful", "success")

    try {
      const response = await fetch("http://localhost:5000/api/user/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
     setLoading(false);
      const json = await response.json();

    
      if (json.success) {
       
        showAlert("Registration Successful", "success")

         localStorage.setItem("token", JSON.stringify(json));

         setTimeout(() => {
          navigate("/");      
         }, 2000);
      }

    } catch (error) {
        setLoading(false)
        showAlert(error, "danger")
        console.log(error);
    }
  };


  if (Loading) {
    return (<div style={{textAlign: "center", color: "black", height: "200px"}}>
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
          Signup
        </div>
            <hr style={{width: "320px"}} />

    <div className="container mb-3">
      <form className="py-3" onSubmit={handleClick}>
        <div className="form-floating my-1">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            name="name"
            placeholder="Name"
            onChange={onChange}
            required
          />
          <label htmlFor="floatingInput">Name</label>
        </div>
        <div className="form-floating my-1">
          <input
            type="email"
            className="form-control"
            id="floatingPassword"
            name="email"
            placeholder="Email"
            onChange={onChange}
            required
          />
          <label htmlFor="floatingPassword">Email</label>
        </div>

        <div className="form-floating mt-1">
          <input
            type={"password"}
            className="form-control"
            onChange={onChange}
            id="password"
            name="password"
            placeholder="Password"
            required
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
        </div>


        <div className="form-floating my-1">
          <input
            type={"password"}
            className="form-control"
            onChange={onChange}
            id="cpassword"
            name="cpassword"
            placeholder="Confirm Password"
            required
          />
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
        </div>
        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <button
            className="btn btn-primary my-3 "
            type="submit"
            style={{ width: "100%", background: "green", border: "2px solid black" }}
          >
            Sign up
          </button>
        </div>

        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100%"}}
        >
           Already hve an account?
          <Link style={{color: "green"}} to="/login" className="btn">login</Link>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};