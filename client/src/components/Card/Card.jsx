import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import './Card.css'
import { useHistory } from "react-router-dom"
export const Card=(props)=>{
  let history = useHistory();
  const [chosen,setChosen]=useState(false)
   const handleLinkClick=()=>{
    setChosen(true)
    setTimeout(()=>{history.push(`/videogames/${props.id}`)},3000)
    
   }
    
    return(
      <div className={!props.version && !chosen &&'try'}>
        <div class= {`container ${props.version===2?'flipinfinite':'fliponhover'} ${chosen && 'flipChosen'}`}>

                    <div className={` card ${props.version===2?'front':'back'} `}>
                   
                    {props.version===2?(
                                 <div>
                                    <img className="backgroundImageCard" src={props.background_image} alt={props.name}/>

                                 </div>
                            ):(
                                <button className="backGroundCrdButton" onClick={handleLinkClick} >

                                    <img className="backgroundImageCardBu" src={props.background_image} alt={props.name}/>

                                </button>
                            )}
                        <div className="CardPropsCont">

                            <div>
                                        <h2 className="cardName">{props.name}</h2>
                                    </div>
                            <div className="ratingGenresCont">
                                <div className="genresVideogames">
                                    {props.genres?.map((g,i)=>(
                                        <div key={i}>
                                            {g.name}
                                        </div>
                                    ))}
                                </div>
                                <div className="cardRatingCont">
                                    <img className ='cardStar' src='star.png' alt='star'/>
                                    <br></br>
                                    <span>{props.rating}</span>
                                </div>
                            </div>
                        </div>
                    </div>


                <div class={` card backV1 ${props.version===2?'back':'front'} `}>               
                    <img className="backLogo" src='backCard.png' alt='logo'/>
                </div>

        </div>
        </div>
    )
}