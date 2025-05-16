import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const handleLogout = () => {
		
	}

	return (
		<div className="text-center mt-5 Content container">
			<h1 className="my-5">Welcome to the project about JWT Authentication</h1>
			{!store.token ?
			<div>
				<h3>Currently, you are not logged in and have no valid token.</h3>
				<h3>Go to the <Link to="/login">login</Link> page in order to enter your account or create a new one</h3>
			</div>
			: <div>
				<h3>You have logged in as {store.email}</h3>
				<h3>You can now enter the <Link to="/private">private section</Link> or <a onClick={handleLogout}>logout</a></h3>
			</div>
			}
		</div>
	)
}