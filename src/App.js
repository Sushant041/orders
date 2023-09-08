import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import  Alert  from "./components/Alert";
import { useState } from "react";
import { Youroredr } from "./components/yourorder";

function App() {
  const [alert, setAlert] = useState(null);
  const [displayalert, setdisplayalert] = useState(false);

  const showAlert = (message, type)=>{
    setdisplayalert(true)
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
        setdisplayalert(false)
    }, 1000);

  }

  return (
    <div className="App">
      <Router>
        {/* <Alert alert={alert} displayalert={displayalert}/> */}
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert}/>}/>
          <Route  path="/login" element={<Login showAlert={showAlert}/>}/>
          <Route  path="/signup" element={<Signup showAlert={showAlert}/>}/>
          <Route  path="/yourorder" element={<Youroredr showAlert={showAlert}/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
