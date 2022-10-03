import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getVideoGameByIdAction, clearAction} from "../../redux/actions";
import './Detail.css'
import {Nav} from '../Nav/Nav'
import {Loading} from '../Loading/Loading'

export const Detail=(props)=>{
    const VideogameDetail=useSelector(state=>state.VideogameDetail)
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getVideoGameByIdAction(props.match.params.id))
        return(()=>{
            dispatch(clearAction('VideogameDetail',{}))
        })
    },[])

    console.log(VideogameDetail)

    return(
        <div className="videogameDetail">
            {Object.entries(VideogameDetail).length === 0?(
                <div>
                    <Loading typeLoader={3}/>
                </div>):(
                
                <div>
                        <div className="backImg firstPage"
                        style={{backgroundImage: `url(${VideogameDetail.background_image && VideogameDetail.background_image})`}}>
                        <Nav/>
                    <h2>{VideogameDetail.name}</h2>
                    <span>{VideogameDetail.rating}</span>
                    <span>{VideogameDetail.released}</span>
                    {VideogameDetail.platforms?.map((p)=>(
                        <div>
                            {p}
                        </div>
                    ))}

                    {VideogameDetail.genres?.map((p)=>(
                        <div>
                            {p.name}
                        </div>
                    ))}

                </div>
                <div className="backImg secondPage"
                    style={{backgroundImage: `url(${VideogameDetail.background_image_additional && VideogameDetail.background_image_additional})`}}>
                    <h2>{VideogameDetail.name}</h2>
                    <p>{VideogameDetail.description}</p>
                </div>
                </div>)}
        </div>
    )
}