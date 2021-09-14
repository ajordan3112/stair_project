import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  regulationsSelectReducer,
  dimensionsUpdateReducer,
} from './reducers/reducers'

const reducer = combineReducers({
  regulationsSelect: regulationsSelectReducer,
  dimensionsUpdate: dimensionsUpdateReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
