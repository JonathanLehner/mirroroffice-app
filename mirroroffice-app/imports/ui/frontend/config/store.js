import { createStore, combineReducers } from 'redux'
import userReducer from '../logic/user/reducer'
import mapReducer from '../logic/map/reducer'

const rootReducer = combineReducers({
  user: userReducer,
  map: mapReducer,
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store
