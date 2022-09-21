import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk  from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import { productReducer,productDetailsReducer } from './reducers/productReducer'
import { authReducer } from './reducers/authReducers'


const reducer=combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    auth:authReducer
})
const middleware=[thunk]

const initialState ={}


const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store