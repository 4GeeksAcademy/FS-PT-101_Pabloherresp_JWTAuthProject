import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Login = () => {
    const [messageLogin,setMessageLogin] = useState("")
    const {store,dispatch} = useGlobalReducer()

    const submitLogin = (e) => {
        e.preventDefault()
    }

    const submitSignUp = (e) => {
        e.preventDefault()
    }

    return(
        <div className="container d-flex justify-content-center">
            <div className="card text-center p-3 m-3">
                <h3 className="card-title">Login</h3>
                <form className="card-body" onSubmit={(e)=>submitLogin(e)}>
                    <input type="email" className="form-control w-100 my-2" placeholder="Email..." aria-label="email"/>
                    <input type="password" className="form-control w-100 my-2" placeholder="Password..." aria-label="password" autocomplete="off"/>
                    <input type="submit" className="btn btn-primary w-100" value="Login"/>
                    <p>{messageLogin}</p>
                </form>
            </div>
        </div>
    )
}