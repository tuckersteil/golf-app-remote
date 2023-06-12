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

      const linkStyles = {
        display: "inline-block",
        marginLeft: "15rem",
        marginRight: "auto",
        width: "55%",
      }

      
     

return (
    <div >
        <h1 style={linkStyles}>
            <button className="sizey" onClick={goHome}>Last Minute Tee Times</button> 
        </h1>
        <span className="navB">
          <button className="navc" onClick={goBookings}> 
            My Tee-times
          </button>
         
            <button className="navB" variant="outline"  onClick={handleLogoutClick}>Logout</button>
          
          
        </span>
        
        
    
    </div>
)
}
export default NavBar;