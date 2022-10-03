import {CLEAR,
    MEMORY,
    GET_BY_ID,
    GET_BY_NAME,
    GET_GENRES,
    GET_VIDEOGAMES,
    ALL_ID,
    ALL_NAMES,
    FILTER_ORDER

   } from '../actions/typesAction'
   ;
import { FilterOrder } from '../actions/FilterHelper';
 const initialState={
    allGenres:[],
    allVideogames:[],
    allVideogamesCopy:[],
    VideogameDetail:{},
    VideogamesByName:[],
    allVideogamesName:[],
    allVideogamesId:[]
 }

 function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_GENRES:
            return{
                ...state,
                allGenres:action.payload
            }
        case GET_VIDEOGAMES:
            return{
                ...state,
                allVideogames:action.payload,
                allVideogamesCopy:action.payload
            }
        case GET_BY_NAME:
            return{
                ...state,
                VideogamesByName:action.payload
            }
        case GET_BY_ID:
            return{
                ...state,
                VideogameDetail:action.payload
            }
        case ALL_NAMES:
            return{
                ...state,
                allVideogamesName:action.payload
            }
        case ALL_ID:
            return{
                ...state,
                allVideogamesId:action.payload
            }
        case CLEAR:
            return{
                ...state,
                [action.globalStateName]:action.payload
            }
        case FILTER_ORDER:
            console.log()
            const newFiOr=FilterOrder(state.allVideogamesCopy,action.payload)
            return{
                ...state,
                allVideogames:newFiOr

            }
        default: return state
    }
 }

 export default rootReducer;