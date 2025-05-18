const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const userService = {}

userService.userLogin = async (email, password) => {
	try {
		const userData = {"email": email,"password": password}
		const resp = await fetch(`${BACKEND_URL}api/login`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
			body: JSON.stringify(userData)
        })
		if(resp.status == 400) throw Error("Missing data")
		else if (resp.status == 401) throw Error("Email/Password don't match")
		else if(resp.status == 404) throw Error("User with given credentials couldn't be found")
		else if(!resp.ok) throw Error("Unknown error")

		const data = await resp.json()
		return data
	} catch (error) {
		console.log(error)
		return {success: false, response: error.message}
	}
}

userService.userSignup = async (email, password) => {
	try {
		const userData = {"email": email,"password": password}
		const resp = await fetch(`${BACKEND_URL}api/signup`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
			body: JSON.stringify(userData)
        })
		if(resp.status == 400) throw Error("Missing data")
		else if (resp.status == 401) throw Error("User with given email already in database")
		else if(!resp.ok) throw Error("Unknown error")

		const data = await resp.json()
		return data
	} catch (error) {
		console.log(error)
		return {success: false, response: error.message}
	}
}

userService.getUsers = async (token) => {
	try {
		const resp = await fetch(`${BACKEND_URL}api/private`, {
            method: "GET",
            headers: {"Content-Type":"application/json",
				"Authorization":"Bearer " + token
			}
        })
		const data = await resp.json()
		return data
	} catch (error) {
		console.log(error)
	}
}