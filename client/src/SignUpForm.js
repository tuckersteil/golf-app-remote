import React, { useState } from "react";

function SignUpForm({ onLogin }){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            password_confirmation: passwordConfirmation
          }),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((user) => onLogin(user));
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username"></label>
                <input 
                type="text"
                id="username"
                autoComplete="off"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                />
            <label htmlFor="password"></label>
                <input 
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                />
            <label htmlFor="password"></label>
                <input 
                type="password"
                id="password_confirmation"
                placeholder="Password Confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete="current-password"
                />
            <button variant="fill" color="primary" type="submit" class="btn btn-primary btn-block btn-large">
                {isLoading ? "Loading..." : "Sign Up"}
            </button>
            <div>
                {errors.map((err) => (
                    <p key={err} className="whitey">{err}</p>
                ))}
            </div>
        </form>
    )
}
export default SignUpForm;