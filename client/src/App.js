import Login from "./Login";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CourseList from "./CourseList";
import Course from "./Course";
import PracticeCss from "./Confirm";

import MyTeeTimes from "./MyTeeTimes";
function App() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);
  if (!user) return <Login onLogin={setUser} />;
  
  return (
    <div className="colored">
      <NavBar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<CourseList />}/>
        <Route path="/course/:id" element={<Course user={user}/>}/>
        <Route path ="/myteetimes" element={<MyTeeTimes />} />
      </Routes>
      
    </div>
  );
}

export default App;

