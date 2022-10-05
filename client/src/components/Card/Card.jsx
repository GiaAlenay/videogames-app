import { Link } from "react-router-dom"
import './Card.css'
export const Card=(props)=>{
    return(
        <div class="container">
            {/* <div class="flipper"> */}
                <div class="card front">
                    <img className="backgroundImageCard" src={props.background_image} alt={props.name}/>
                    {props.verison===2?(
                            <div>
                                <h2>{props.id}{props.name}</h2>
                            </div>
                    ):(
                        <Link to ={`/videogames/${props.id}`}>
                            <h2>{props.id}{props.name}</h2>
                        </Link>
                    )}
                    <p>{props.rating}</p>
                    <div className="genresVideogames">
                        {props.genres?.map((g,i)=>(
                            <div key={i}>
                                .{g.name}
                            </div>
                        ))}
                    </div>

                </div>

                <div class="card back">
                    <img className="backLogo" src='backCard.jpg' alt='logo'/>
                </div>
            {/* </div> */}
        </div>
    )
}