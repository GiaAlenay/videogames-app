import {CLEAR,
         MEMORY,
         GET_BY_ID,
         GET_BY_NAME,
         GET_GENRES,
         GET_VIDEOGAMES,
         ALL_ID,
         ALL_NAMES,
         FILTER_ORDER

        } from './typesAction'
const axios =require('axios')
export const getGenresAction=()=>dispatch=>{
    return  axios.get('http://localhost:3001/genres')
    .then((data)=>{
        dispatch({type:GET_GENRES, payload:data.data})
    }).catch((error)=>{
        console.log(error)
    })
}


export const getVidoegamesAction=()=>dispatch=>{
    return axios.get('http://localhost:3001/videogames')
    .then((data)=>{
        dispatch({type:GET_VIDEOGAMES, payload:data.data})
    }).catch((error)=>{
        console.log(error)
    })
}

export const getVideoGameByNameAction=(name)=>dispatch=>{
    return axios.get(`http://localhost:3001/videogames?name=${name}`)
    .then((data)=>{
        dispatch({type:GET_BY_NAME, payload:data.data})
    }).catch((error)=>{
        dispatch({type:GET_BY_NAME, payload:error.response.data})
    })
}

export const getVideoGameByIdAction=(id)=>dispatch=>{
    return axios.get(`http://localhost:3001/videogames/${id}`)
    .then((data)=>{
        dispatch({type:GET_BY_ID, payload: data.data})
    }).catch((error)=>{
        console.log(error)
    })
}

export const getAllNamesAction=()=>dispatch=>{
    return axios.get('http://localhost:3001/videogames/name')
    .then((data)=>{
        dispatch({type:ALL_NAMES, payload:data.data})
    }).catch((error)=>{
        console.log(error)
    })
}

export const getAllIdAction=()=>dispatch=>{
    return axios.get('http://localhost:3001/videogames/id')
    .then((data)=>{
        dispatch({type:ALL_ID, payload:data.data})
    }).catch((error)=>{
        console.log(error)
    })
}
export const clearAction=(globalState,payload)=>{
    return{type:CLEAR, globalStateName:globalState , payload:payload}
}

export const filterOrderAction=(obj)=>{
    return {type:FILTER_ORDER, payload:obj}
}