import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  message: notificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
