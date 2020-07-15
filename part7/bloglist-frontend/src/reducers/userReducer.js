import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state=null, action) => {
  console.log(`state:-- ${state}`)
  console.log(`action:-- ${action.type}`)

  switch (action.type) {
  case 'LOGIN':{
    const loginUser = action.data
    return loginUser
  }
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const loginFromLocalStorage = () => {
  const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
  const loginUser = JSON.parse(loggedInUserJSON)
  if (loginUser) {
    blogService.setToken(loginUser.token)
  }

  let user = null

  if (loginUser) {
    user = loginUser
  }

  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const login = credentials => {
  return dispatch => {
    loginService.login(credentials)
      .then(loginUser => {
        window.localStorage.setItem('loggedInUser', JSON.stringify(loginUser));
        blogService.setToken(loginUser.token)
        dispatch({
          type: 'LOGIN',
          data: loginUser
        })}
      )
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default userReducer
