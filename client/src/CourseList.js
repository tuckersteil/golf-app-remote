import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function CourseList(){
    const [courses, setCourses] = useState([]);
    
    useEffect(() => {
        fetch("/courses")
        .then((r)=> r.json())
        .then((courses)=> setCourses(courses));
    }, []);


    return (
        <section className="courses">
            {courses.map((course) => (
                <Link className="course" key={course.id} to={`/course/${course.id}`} >
                    <picture className="thumbnail">
                        <img src={course.img}/>
                    </picture>

                    <div className="card-content">
                        <h2 className="category category__03">{course.name}:</h2>
                    </div>

                    <footer>
                        <div className="post-meta">
                            <strong>{course.location}</strong>
                            <span className="comments">(Par: {course.par}),</span>
                            <span className="comments">(Holes: {course.holes}),</span>
                            <span className="comments">(length: {course.length})</span>
                        </div>
                    </footer>               
                   
                </Link>
            ))}
        </section>
    )
}
export default CourseList;