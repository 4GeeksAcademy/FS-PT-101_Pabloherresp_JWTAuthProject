import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/userService.js";

export const Private = () => {
	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()
	const [users,setUsers] = useState([])

	useEffect(()=>{
		if(!localStorage.getItem("token"))
			navigate("/")
		else
			loadUsers(localStorage.getItem("token"))
	},[])

	const loadUsers = async (token) => {
		const resp = await userService.getUsers(token)
		setUsers(resp)
	}

	return (
		<div className="text-center mt-5 container">
			<h1 className="my-5">This is the private section</h1>
			<h4>Here you can see a list of current users in the server:</h4>
			<ul className="list-group">
			 {users.map((item)=><li className="list-group-item">{item}</li>)}
			</ul>
		</div>
	)
}