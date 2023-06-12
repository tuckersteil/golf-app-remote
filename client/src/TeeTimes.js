import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Calendar from "react-calendar"

function TeeTimes({user, bookTime}){
    let { id } = useParams();
    const [errors, setErrors] = useState([]);
    const [allTeeTimes, setAllTeeTimes] = useState([]);
    const [date, setDate] = useState(new Date());
    const [clicked, setClicked] = useState(false)
    let today = date.toLocaleString().split(",")[0] 
    let time = date.toDateString()
    const [submitTee, setSubmitTee] = useState({
        players: '',
        price: '',
        holes: '',
        time: ''
      })
    console.log(errors)

    useEffect(() => {
        fetch(`/teetimes/${id}`).then((r) => {
          if (r.ok) {
            r.json().then((data) => 
            setAllTeeTimes(data.filter((teetime)=>  teetime.date === today && teetime.status === "Posted" )));
          }
        });
      }, [date]);
console.log(allTeeTimes)
      function onChange(calDate){
        setDate(calDate)
      }
      
    function handleClick(){
        setClicked(!clicked)
    }

    function handleSubmit(event){
        event.preventDefault()
        const finalTeeData = {
            players: parseInt(submitTee.players),
            price: parseInt(submitTee.price),
            holes: parseInt(submitTee.holes),
            time: submitTee.time,
            date: today,
            course_id: parseInt(id),
            status: "Posted"
        }
        console.log(finalTeeData)
        fetch('/teetimes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(finalTeeData)
        })
        .then((r)=> r.json())  
        .then((teeTime) => setAllTeeTimes([...allTeeTimes, teeTime]));
        setClicked(false);
        setSubmitTee({ players: '',
            price: '',
            holes: '',
            time: ''})
    }
        
        // .then((r) => {
            // setClicked(false);
            // if (r.ok) {
            //     r.json().then((teeTime) => setAllTeeTimes([...allTeeTimes, teeTime]), setSubmitTee({ players: '',
            //     price: '',
            //     holes: '',
            //     time: ''}));
            // } else {
            //     r.json().then((err) => setErrors(err.errors));
            // }
        // });
        // setSubmitTee({ players: '',
        //     price: '',
        //     holes: '',
        //     time: ''})
    

// }).then((r) => {
//     setIsLoading(false);
//     if (r.ok) {
//       r.json().then((user) => onLogin(user));
//     } else {
//       r.json().then((err) => setErrors(err.errors));
//     }
//   });

// .then((r) => r.json())
// .then((teeTime) => 
// setAllTeeTimes([...allTeeTimes, teeTime]), setClicked(false), setSubmitTee({ players: '',
// price: '',
// holes: '',
// time: ''}))


    function handleChange(event){
        event.preventDefault()
        setSubmitTee({
          ...submitTee, 
          [event.target.name]: event.target.value
        })
      }

      function handleBook(teeTime){
       bookTime(teeTime)
      }

    return (
    <div className="white"> <strong>Showing Tee Times for:</strong> {time}
        <section className="coursess">
            <Calendar onChange={onChange} value={date} className="react-calendar"/>
            <h1 className="posty">Post a Tee Time:
                <p></p>
                <p></p>
                <button className="postyy" onClick={handleClick}>Click Here</button>
            </h1>
            {clicked ? (
                <div>
            <form onSubmit={handleSubmit}>
                <label> Players: (must be 1 to 4)<br/>
                    <input
                    type="text"
                    name="players"
                    value={submitTee.players}
                    onChange={handleChange}>
                    </input>
                </label>
                <br/>
                <label> Price: <br/>
                    <input
                    type="text"
                    name="price"
                    value={submitTee.price}
                    onChange={handleChange}>
                    </input>
                </label>
                <br/>
                <label> Holes: <br/>
                    <input
                    type="text"
                    name="holes"
                    value={submitTee.holes}
                    onChange={handleChange}>
                    </input>
                </label>
                <br/>
                <label> Time: <br/>
                    <input
                    type="text"
                    name="time"
                    value={submitTee.time}
                    onChange={handleChange}>
                    </input>
                </label>
                <br/>
                <label> Date: {today} </label>
                <br/>
                <button type="submit">Submit Tee Time</button>
            </form>
            {errors.map((err) => (
                    <p key={err} >{err}</p>
                ))}
            </div>
            ) : allTeeTimes.map((teetime) => (teetime.user_id === user.id ?
                (<section className="gray" key={teetime.id}>
                    <div className="card-content">
                        <h2 className="categoryy category__03">{teetime.time}:</h2>
                    </div>
                    <p className="rojo">This Time Belongs to you</p>
                    <h1 className="categoryyy">${teetime.price}</h1>
                    <footer className="size">
                        <span>Player: ({teetime.players})</span> 
                        <p></p> 
                        <span>Holes: ({teetime.holes})</span>
                        <p></p>
                    </footer>

                </section>) : (
                    <section className="gray" key={teetime.id}>
                    <div className="card-content">
                        <h2 className="categoryy category__03">{teetime.time}:</h2>
                    </div>
                    <h1 className="categoryyy">${teetime.price}</h1>
                    <footer className="size">
                        <span>Player: ({teetime.players})</span> 
                        <p></p> 
                        <span>Holes: ({teetime.holes})</span>
                        <p></p>
                        <button onClick={ (e) => handleBook(teetime)}>Book Now</button>
                    </footer>

                </section>
                )
            ))}
        </section>
    </div>
     )
}
export default TeeTimes

