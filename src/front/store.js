export const initialStore=()=>{
  return{
    token: null,
    email: null,
    id: null
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'loadToken':
      return {
        ...store,
        token: action.payload
      };
    case 'loadUser':
      return {
        ...store,
        email: action.payload.email,
        id: action.payload.id
      }
    default:
      throw Error('Unknown action.');
  }    
}
