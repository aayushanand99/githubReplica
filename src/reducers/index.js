
import { combineReducers } from 'redux';
import {calculator} from './calculatorReducer'
import gitData from './gitData'
const rootReducer = combineReducers({
    //app state json fetching data from reducers
    // state1: reducer1,
    // calculator:calculator
    gitData:gitData
});
export default rootReducer;