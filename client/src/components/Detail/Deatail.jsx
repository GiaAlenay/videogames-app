import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getVideoGameByIdAction, clearAction} from "../../redux/actions";
import './Detail.css'
import {Loading} from '../Loading/Loading'
import {Link} from 'react-router-dom'
import {genressIconByName} from '../Create/icons'

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

    const titleConatinerWidth=(name)=>{
        if(name.length>15){
            return '30%'
        }else{
            const le=(name.length*2)-4
            return  '28%'
        }
    }
    const titleConatinerLength=(name)=>{
        if(name.length<10){
            return '10%'
        }
        if(name.length>20){
            return '30%'
        }
        if(name.length>10){
            return '20%'
        }
    }
    
    const platConatinerLength=(platforms)=>{
        const le=(platforms.length+1)*4
        return le.toString()+'%'
    }
    const text=(text)=>{
        const re=text.split('<p>').join('')
       return re.split('</p>').join('')
      }
    return(
        <div className="videogameDetail">
            {props.version===2?(
                <div>   
                                
                <div className="backImg firstPage"
                        style={{backgroundImage: `url(${props.VideogameDetail.background_image && props.VideogameDetail.background_image})`
                        ,height:`${props.version===2?'35vh':'100vh' }`}}>
                     
                     <div className="detLeftSide">
                    
                   <div className="detailGameTitle dgtv2"
                        style={{width:`${props.VideogameDetail.name && titleConatinerWidth(props.VideogameDetail.name)}`, height:`${props.VideogameDetail.name && titleConatinerLength(props.VideogameDetail.name)}`}}
                    >
                     <h2 >{props.VideogameDetail.name}</h2>

                   </div>
                    
                    <div className="detailPlatCont dpv2" 
                    style={{height:`${props.VideogameDetail.platforms && platConatinerLength(props.VideogameDetail.platforms)}`}}
                    >
                        <div className="detPlatformIcon"></div>
                        <div className="detPlatNa">
                            PLATFORMS:
                        {props.VideogameDetail.platforms?.map((p,i)=>(
                            <div key={i}>
                                {p}
                            </div>
                    ))}
                        </div>
                    </div>
                    

                    <div className="releasedDetCont dpv2">
                        <div className="detReleaseDate">{props.VideogameDetail.released}</div>
                    </div>

                    <div className="ratingDetCont">
                        <div className="starspining"></div>
                        <span className="ratingNumbDe dpv2">
                            {props.VideogameDetail.rating}
                        </span>
                    </div>
                    </div>
                    <div className="detGenresCont">
                        {props.genres?.map((p,i)=>(
                            <div key={i} className={`deGenres`}>
                                <div  className="deGenreNameContainer dgnc">
                                    <div className='deNameGenre dgn'>{p.name}</div>
                                </div>
                                <div className="deRombo">
                                    <div  className={` detailGenIcon deGenBack${genressIconByName(p.name)}`}  >                                                

                                </div>
                                
                                </div>
                            </div>
                            
                        ))}
                    </div>
                </div>

                <div className="backImg secondPage"
                    style={{backgroundImage: `url(${props.VideogameDetail.background_image_additional && props.VideogameDetail.background_image_additional})`,
                    height:`${props.version===2?'35vh':'100vh' }`}}>
                    <div>
                        <h2 className="dgtv2">{props.VideogameDetail.name}</h2>
                    </div>
                    <div className="deDescripCont ddv2">
                        <div className="textDes dpv2 ">
                            <p>{props.VideogameDetail.description && text(props.VideogameDetail.description)}</p>
                        </div>
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
                                        ,height:`${props.version===2?'35vh':'100vh' }`}}>
                                     
                                     <div className="detLeftSide">
                                     <Link to='/home'>
                                    <div className="btnContDetail">
                                        <button className="goBackHome">                                            
                                        </button>
                                    </div>
                                   </Link>
                                   <div className="detailGameTitle"
                                        style={{width:`${VideogameDetail.name && titleConatinerWidth(VideogameDetail.name)}`, height:`${VideogameDetail.name && titleConatinerLength(VideogameDetail.name)}`}}
                                    >
                                     <h2 >{VideogameDetail.name}</h2>

                                   </div>
                                    
                                    <div className="detailPlatCont" 
                                    style={{height:`${VideogameDetail.platforms && platConatinerLength(VideogameDetail.platforms)}`}}
                                    >
                                        <div className="detPlatformIcon"></div>
                                        <div className="detPlatNa">
                                            PLATFORMS:
                                        {VideogameDetail.platforms?.map((p,i)=>(
                                            <div key={i}>
                                                {p}
                                            </div>
                                    ))}
                                        </div>
                                    </div>
                                    

                                    <div className="releasedDetCont">
                                        <div className="detReleaseDate">{VideogameDetail.released}</div>
                                    </div>

                                    <div className="ratingDetCont">
                                        <div className="starspining"></div>
                                        <span className="ratingNumbDe">
                                            {VideogameDetail.rating}
                                        </span>
                                    </div>
                                    </div>
                                    <div className="detGenresCont">
                                        {VideogameDetail.genres?.map((p,i)=>(
                                            <div key={i} className={`deGenres`}>
                                                <div  className="deGenreNameContainer">
                                                    <div className='deNameGenre'>{p.name}</div>
                                                </div>
                                                <div className="deRombo">
                                                    <div  className={` detailGenIcon deGenBack${genressIconByName(p.name)}`}  >                                                

                                                </div>
                                                
                                                </div>
                                            </div>
                                            
                                        ))}
                                    </div>
                                </div>

                                <div className="backImg secondPage"
                                    style={{backgroundImage: `url(${VideogameDetail.background_image_additional && VideogameDetail.background_image_additional})`,
                                    height:`${props.version===2?'30vh':'100vh' }`}}>
                                    <div>
                                        <h2>{VideogameDetail.name}</h2>
                                    </div>
                                    <div className="deDescripCont">
                                        <div className="textDes">
                                            <p>{VideogameDetail.description && text(VideogameDetail.description)}</p>
                                        </div>
                                    </div>
                                </div>
                        </div>)}
            </div>
            )}
            

            
        </div>
    )
}