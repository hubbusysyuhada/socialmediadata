import { createStore, applyMiddleware } from 'redux'
import appReducer from './reducer'
import reduxthunk from 'redux-thunk'

const store = createStore(appReducer, applyMiddleware(reduxthunk))

export default store