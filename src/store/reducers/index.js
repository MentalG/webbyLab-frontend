import { combineReducers } from 'redux';
import filmsReducer from './films';

export default combineReducers({
    films: filmsReducer,
})