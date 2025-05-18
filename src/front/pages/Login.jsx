import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import {userService} from "../services/userService.js"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [loginData,setLoginData] = useState({"email": "", "password": "", "message": "", "error": false})
    const [signupData,setSignupData] = useState({"email": "", "password": "", "message": "", "error": false})
    
    const {store,dispatch} = useGlobalReducer()
    const navigate = useNavigate()
    
    const submitLogin = async (e) => {
        e.preventDefault()
        let resp = await userService.userLogin(loginData.email, loginData.password)
        if(!resp.success)
            setLoginData({...loginData, message: resp.response, error: true})
        else{
            setLoginData({...loginData, error: false})
            dispatch({type: "loadUser", payload: {token: resp.token, email: loginData.email}})
            localStorage.setItem("token", resp.token)
            localStorage.setItem("email", loginData.email)
            navigate("/")
        }
    }

    const submitSignUp = async (e) => {
        e.preventDefault()
        let resp = await userService.userSignup(signupData.email, signupData.password)
        
        if(!resp.success)
            setSignupData({...signupData, message: resp.response, error: true})
        else{
            setLoginData({...signupData})
            setSignupData({...signupData, email: "", password: "", error: false, message: "Account successfully created"})
        }
    }

    const handleLoginChange = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value, message: "", error: false})
    }
    const handleSignupChange = (e) => {
        setSignupData({...signupData, [e.target.name]: e.target.value, message: "", error: false})
    }

    return(
        <div className="container">
            <div className="row d-flex justify-content-center m-3">
                <div className="card text-center pt-3 bg-primary-subtle m-2 col-12 col-md-5 col-lg-4 h-100">
                    <h3 className="card-title">Login</h3>
                    <form className="card-body" onSubmit={(e)=>submitLogin(e)}>
                        <input type="email" name="email" className="form-control w-100 mb-2" placeholder="Email..." aria-label="email" autoComplete="username" value={loginData.email} required onChange={handleLoginChange}/>
                        <input type="password" name="password" className="form-control w-100 my-2" placeholder="Password..." aria-label="password" autoComplete="current-password" value={loginData.password} required onChange={handleLoginChange}/>
                        <input type="submit" className="btn btn-primary w-100" value="Login"/>
                        <p className={"text-break mt-3 " + (!loginData.error ? "text-success": "text-danger")}>{loginData.message}</p>
                    </form>
                </div>
                <div className="card text-center pt-3 bg-info-subtle m-2 col-12 col-md-5 col-lg-4 h-100">
                    <h3 className="card-title">Sign Up</h3>
                    <form className="card-body" onSubmit={(e)=>submitSignUp(e)}>
                        <input type="email" name="email" className="form-control w-100 mb-2" placeholder="Email..." aria-label="email" autoComplete="username" value={signupData.email} required onChange={handleSignupChange}/>
                        <input type="password" name="password" className="form-control w-100 my-2" placeholder="Password..." aria-label="password" autoComplete="current-password" value={signupData.password} required onChange={handleSignupChange}/>
                        <input type="submit" className="btn btn-primary w-100" value="Sign Up"/>
                        <p className={"text-break mt-3 " + (!signupData.error ? "text-success": "text-danger")}>{signupData.message}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}