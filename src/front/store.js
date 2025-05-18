export const initialStore=()=>{
	return{
		token: null,
		email: null,
		id: null
	}
}

export default function storeReducer(store, action = {}) {
	switch(action.type){
		case 'loadUser':
			return {
				...store,
				email: action.payload.email,
				token: action.payload.token
			}
		case 'logoutUser':
			localStorage.setItem("token","")
			localStorage.setItem("email","")
			return{
				...store, email: null, token: null
			}
			default:
			throw Error('Unknown action.');
	}    
}
