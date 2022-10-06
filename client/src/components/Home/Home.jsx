import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Nav } from "../Nav/Nav"
import { Filter } from "../Filter/Filter";
import{Cards} from '../Cards/Cards'
import {SearchBar} from '../SearchBar/SearchBar'
import { getVidoegamesAction,getGenresAction } from "../../redux/actions"
import { Loading } from "../Loading/Loading";
import{Pagination} from '../Pagination/Pagination'
import './Home.css'
export const Home=()=>{
    const allVideogames=useSelector(state=>state.allVideogames)
    const allGenres=useSelector(state=>state.allGenres)
    const dispatch= useDispatch()
    useEffect(()=>{
        dispatch(getVidoegamesAction())
        dispatch(getGenresAction())
    },[])
    //console.log(allVideogames)
    return(

        <div className="home">
            <div className="homecover">
            {allVideogames && allVideogames.length===0?(
                <div>
                    <Loading typeLoader={1}/>
                </div>):(
                <div>
                    <Nav/>
                    <SearchBar/>
                    <div className="filter">
                        <Filter allGenres={allGenres}/>
                    </div>
                    {allVideogames && allVideogames[0].error?(
                        <div>
                            {allVideogames[0].error}
                        </div>
                    ):(
                        <div>
                            <Pagination allVideogames={allVideogames} />
                        </div>
                    )}
                    
                </div>)  }
                </div>
        </div>
    )
}