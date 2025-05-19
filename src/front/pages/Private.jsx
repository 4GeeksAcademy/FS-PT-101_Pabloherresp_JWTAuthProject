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
			<table className="table table-hover table-striped">
				<thead><tr>
					<th scope="col">Id</th>
					<th scope="col">Email</th>
					<th scope="col">Creation Date</th>
					<th scope="col">Is Active</th>
				</tr></thead>
				<tbody>
				{users.map((item)=><tr>
						<th scope="row">{item.id}</th>
						<td>{item.email}</td>
						<td>{item.creation_date.split("T")[0] + " " + item.creation_date.split("T")[1].split(".")[0]}</td>
						<td>{item.is_active ? <i className="fa-solid fa-circle-check"></i> : <i className="fa-solid fa-circle-xmark"></i>}</td>
					</tr>)}
				</tbody>
			</table>
		</div>
	)
}