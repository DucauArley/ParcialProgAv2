import {combineReducers} from 'redux';
import app from './appDucks';
import poke from './pokeDucks';
import peli from './peliDucks';

export default combineReducers(
    {
        app,
        poke,
        peli
    })