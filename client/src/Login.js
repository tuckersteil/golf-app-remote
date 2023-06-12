import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
function Login({onLogin}){
    const [showLogin, setShowLogin] = useState(true);

   
    return (
        <div className="login ">
            <h1 >Last Minute Tee Times</h1>
            {showLogin ? (
            <>
                <LoginForm onLogin={onLogin}/>
                <p>-------------------------------</p>
                <p className="whitey">
                    Don't have an account? &nbsp;
                    <button onClick={() => setShowLogin(false)} class="btn btn-primary btn-block btn-large">
                        Sign Up
                    </button>
                </p>
            </>
            ) : (
            <>
                <SignUpForm onLogin={onLogin} />
                <p className="whitey">----------------------------------------------------------</p>
                <p className="whitey">
                    Already have an account? &nbsp;
                    <button color="secondary" onClick={() => setShowLogin(true)} class="btn btn-primary btn-block btn-large">
                        Log In
                    </button>
                </p>
            </> 
            )}
        </div>
    )
}
export default Login;