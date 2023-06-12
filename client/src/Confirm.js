import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Confirm({teetime}){
const price = (teetime.players * teetime.price)
const navigate = useNavigate();
const [errors, setErrors] = useState([]);
const [isLoading, setIsLoading] = useState(false);

function postAndDelete(){
    const finalTeeData  = {
        players: teetime.players,
        price: teetime.price,
        holes: teetime.holes,
        time: teetime.time,
        date: teetime.date,
        course_id: teetime.course_id,
        status: "Booked"
    }
    setIsLoading(true);
    fetch('/teetimes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(finalTeeData)
    })
    .then((r) => {
        if (r.ok) {
            nowDelete()
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });     
    }

    function nowDelete(){
        fetch(`/teetimes/${teetime.id}`, {
            method: "DELETE",
          })
          navigate("/myteetimes")
    }

    return (
        <div className="yay">   
                <span >
                    <h1>CONFIRM BOOKING:</h1>
                    <span><strong>Date:</strong> {teetime.date}</span>
                    <span><strong>Time:</strong> {teetime.time}</span>
                    <span><strong>Players:</strong> {teetime.players}</span>
                    <span><strong>Holes:</strong> {teetime.holes}</span>
                    <span><strong>Price:</strong> ${teetime.price}</span>
                    <h3>TOTAL: Price(${teetime.price}) x Players:({teetime.players}) = ${price}</h3> 

                    <button onClick={postAndDelete}> {isLoading ? "Loading..." : "Book Tee Time"}</button>

                    <p></p>
                </span>
        </div>

    )
}
export default Confirm
