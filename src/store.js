import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import thunk  from 'redux-thunk';
import reducers from './reducers';


export const history = createHistory();
const enhancers = []

//if( process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension
    if(typeof devToolsExtension === 'function'){
        enhancers.push(devToolsExtension())
    }
//}

const middleware = [
   thunk,
   routerMiddleware(history)

];
const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)

const store = createStore(
    reducers,
    composedEnhancers
)
export default store;
