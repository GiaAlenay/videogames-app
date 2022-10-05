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
        if(props.version!==2){

            dispatch(getVideoGameByIdAction(props.match.params.id))
        }
        return(()=>{
            dispatch(clearAction('VideogameDetail',{}))
        })
    },[])

    // console.log(VideogameDetail)

    return(
        <div className="videogameDetail">
            {props.version===2?(
                <div>
                    <div>
                                <div className="backImg firstPage"
                                        style={{backgroundImage: `url(${props.VideogameDetail.background_image && props.VideogameDetail.background_image})`
                                        ,height:`${props.version===2?'42vh':'100vh' }`}}>

                                    {props.version!==2 &&(<div><Nav/></div>)}
                                    <h2>{props.VideogameDetail.name}</h2>
                                    <span>{props.VideogameDetail.rating}</span>
                                    <span>{props.VideogameDetail.released}</span>
                                    {props.VideogameDetail.platforms?.map((p)=>(
                                        <div>
                                            {p}
                                        </div>
                                    ))}

                                    {props.genres?.map((p)=>(
                                        <div>
                                            {p.name}
                                        </div>
                                    ))}

                                </div>

                                <div className="backImg secondPage"
                                    style={{backgroundImage: `url(${props.VideogameDetail.background_image_additional && props.VideogameDetail.background_image_additional})`,
                                    height:`${props.version===2?'42vh':'100vh' }`}}>
                                    <h2>{props.VideogameDetail.name}</h2>
                                    <p>{props.VideogameDetail.description}</p>
                                </div>
                        </div>
                </div>
            ):(
                <div>
                    {Object.entries(VideogameDetail).length === 0?(
                        <div>
                            <Loading typeLoader={3}/>
                        </div>):(
                        
                        <div>
                                <div className="backImg firstPage"
                                        style={{backgroundImage: `url(${VideogameDetail.background_image && VideogameDetail.background_image})`
                                        ,height:`${props.version===2?'30vh':'100vh' }`}}>

                                    {props.version!==2 &&(<div><Nav/></div>)}
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
                                    style={{backgroundImage: `url(${VideogameDetail.background_image_additional && VideogameDetail.background_image_additional})`,
                                    height:`${props.version===2?'30vh':'100vh' }`}}>
                                    <h2>{VideogameDetail.name}</h2>
                                    <p>{VideogameDetail.description}</p>
                                </div>
                        </div>)}
            </div>
            )}
            

            
        </div>
    )
}