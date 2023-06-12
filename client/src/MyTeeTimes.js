import React, { useEffect, useState } from "react";

function MyTeeTimes(){
    const [teeTimes, setTeeTimes]= useState([])

useEffect(() => {
        fetch("/users/time")
            .then((r)=> r.json())
            .then((data) => setTeeTimes(data))
}, [])

function unpostTime(teetime){
    console.log(teetime.id)
    fetch(`/teetimes/${teetime.id}`, {
        method: "DELETE",
      })
      .then((r)=> r.json())  
      .then((data)=>  setTeeTimes(data))
}

function repostTime(teetime){
    console.log(teetime)
    fetch(`/teetimes/${teetime.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({status: "Posted"})
    })
    .then((r)=> r.json())  
    .then((data)=>  setTeeTimes(data))
}


    return(
    <div className="white">
        <section className="coursess white">
            <h1>Posted Tee Times:</h1>
            {teeTimes.map((teetime) => (teetime.status === "Posted"?
            (<section className="gray" key={teetime.id}>
                <div className="card-content">
                    <h2 className="categoryy category__03">{teetime.time}:</h2>
                </div>
     
                <h1 className="categoryyy">${teetime.price}</h1>
             
                <footer className="size">
                    <span>Player: ({teetime.players})</span> 
                    <p></p> 
                    <span>Holes: ({teetime.holes})</span>
                    <p></p>
                    <span>Date: ({teetime.date})</span> 
                    <p></p>
                    <span>Course: ({teetime.course.name})</span>
                    <p></p>
                    <button onClick={(e) => unpostTime(teetime)}>Unpost Tee Time</button>
                </footer>
            </section>
            )
            :
            (null)))}
        </section>

        <p></p>

        <section className="coursess white">
            <h1>Booked Tee Times:</h1>
            {teeTimes.map((teetime) => (teetime.status === "Booked"?
            (<section className="gray" key={teetime.id}>
                <div className="card-content">
                    <h2 className="categoryy category__03">{teetime.time}:</h2>
                </div>
     
                <h1 className="categoryyy">${teetime.price}</h1>
             
                <footer className="size">
                    <span>Player: ({teetime.players})</span> 
                    <p></p> 
                    <span>Holes: ({teetime.holes})</span>
                    <p></p>
                    <span>Date: ({teetime.date})</span> 
                    <p></p>
                    <span>Course: ({teetime.course.name})</span>
                    <p></p>
                 <button onClick={(e) => repostTime(teetime)}>Repost Tee Time</button>
                </footer>
            </section>
            )
            :
            (null)))}
        </section>
    </div>
    )
}
export default MyTeeTimes;