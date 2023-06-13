import { useNavigate } from "react-router-dom";
import React from "react";


function NavBar({ user, setUser }) {
    const navigate = useNavigate();
    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
        navigate("/")
      }
      function goHome(){
        navigate("/")
    }
    function goBookings(){
        navigate("/myteetimes")
    }

    //   const linkStyles = {
    //     display: "inline-block",
    //     marginLeft: "15rem",
    //     marginRight: "auto",
    //     width: "35%",
    //     color: #eeff00
    //   }

      
     

return (
    <div >
        <h1 className="sizey">
            Last Minute Tee Times
        </h1>
        <span className="navB">
        <button className="navc" onClick={goHome}>Home</button> 
          <button className="navc" onClick={goBookings}> 
            My Tee-times
          </button>
         
            <button className="navB" variant="outline"  onClick={handleLogoutClick}>Logout</button>
          
          
        </span>
        
        
    
    </div>
)
}
export default NavBar;