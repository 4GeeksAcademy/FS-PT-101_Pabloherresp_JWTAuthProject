import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const {store,dispatch} = useGlobalReducer()
	const navigate = useNavigate()

	const handleLogout = () => {
		dispatch({type: "logoutUser"})
		navigate("/")
	}

	return (
		<nav className="navbar navbar-light bg-secondary-subtle">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">4Geeks</span>
				</Link>
				<div className="ml-auto">
					<Link to="/private">
						<button className="btn btn-primary bg-success mx-2">Private</button>
					</Link>
					{store.token ?
					<button className="btn btn-primary" onClick={handleLogout}>Logout</button>
					:
					<Link to="/login">
						<button className="btn btn-primary">Login</button>
					</Link>}
				</div>
			</div>
		</nav>
	);
};