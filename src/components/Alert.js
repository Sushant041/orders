import React from 'react'

function Alert(props) {

    const capitalize = (word) =>{
            if(word === "danger")
            word = "error"
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
   
    return (
        <div className="">
            {props.displayalert && <div data-aos="fade-down" style={{left: '0px',position:"fixed",top:0+"px",width:100+"vw",transition:0.3+"s",display:"block",zIndex:"+10000"}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
           <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg} 
           <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>}
        </div>}    
        </div>
      
    )
}

export default Alert