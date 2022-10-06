import { useEffect } from "react"
import { Link } from "react-router-dom"
import './Card.css'
export const Card=(props)=>{
    useEffect(()=>{
        randomNeon(props.random)
    },[props.random])
    const randomNeon=(random)=>{
        if(random===0){
            return 'shining0'
        }
        if(random<6){
          return `shining${random}`
        }
        if( random%6===0){
          return 'shining0'
        }
        if((random-1)%6===0){
          return 'shining1'
        }
        if( (random-2)%6===0){
          return 'shining2'
        }
        if( (random-3)%6===0){
          return 'shining3'
        }
        if((random-4)%6===0){
          return 'shining4'
        }
        if( (random-5)%6===0){
          return 'shining5'
        }
      }
    return(
      <div className={!props.version&&'try'}>
        <div class= {`container ${props.version===2?'flipinfinite':'fliponhover'}`}>

                    <div class={` card ${props.version===2?'front':'back'} `}>
                    {/* ${props.random?randomNeon(props.random):'createNeon'} */}
                    {props.version===2?(
                                 <div>
                                    <img className="backgroundImageCard" src={props.background_image} alt={props.name}/>

                                 </div>
                            ):(
                                <Link to ={`/videogames/${props.id}`}>
                                    <img className="backgroundImageCard" src={props.background_image} alt={props.name}/>

                                </Link>
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


                <div class={` card ${props.version===2?'back':'front'} `}>
                {/* ${props.random?randomNeon(props.random):'createNeon'} */}
                    <img className="backLogo" src='backCard.jpg' alt='logo'/>
                </div>

        </div>
        </div>
    )
}