import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Confirm from "./Confirm";
import TeeTimes from "./TeeTimes";
function Course({user}){
    const [courseInfo, setCourseInfo] = useState([]);
    const [clicked, setClicked] = useState(true)
    const [teeTime, setTeeTime] = useState([]);
    let { id } = useParams();
   console.log(user)

    useEffect(() => {
        fetch(`/courses/${id}`).then((r) => {
          if (r.ok) {
            r.json().then((data) => setCourseInfo(data));
          }
        });
      }, [id]);

      function bookTime(time){
        setTeeTime(time)
        setClicked(false)
      }


    return (
        <div className="white">
            <div  className="numeral" key={courseInfo.id} >
                <picture className="new-thumb">
                    <img src={courseInfo.img}/>
                </picture>

                <div className="card-content-new">
                    <h2 className="category-new category__03">{courseInfo.name}:</h2>
                </div>

                <footer>
                    <div className="post-meta">
                        <strong className="comments-new">{courseInfo.location}--</strong>
                        <span className="comments-new">(Par: {courseInfo.par}),</span>
                        <span className="comments-new">(Holes: {courseInfo.holes}),</span>
                        <span className="comments-new">(length: {courseInfo.length})</span>
                    </div>
                </footer>      

                <strong className="comments-new">Description: </strong> {courseInfo.description}     
            </div>
            <p></p>
            {clicked ? (
                <TeeTimes user={user} bookTime={bookTime}/>
            ):(
                <Confirm teetime={teeTime} />
            )}
            
        </div>

        
    )
}
export default Course;