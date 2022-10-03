import { Link } from "react-router-dom"
import './Card.css'
export const Card=(props)=>{
    return(
        <div>
           <img className="backgroundImageCard" src={props.background_image} alt={props.name}/>
           <Link to ={`/videogames/${props.id}`}>
                <h2>{props.id}{props.name}</h2>
            </Link>
           <p>{props.rating}</p>
           <div className="genresVideogames">
            {props.genres?.map((g,i)=>(
                <div key={i}>
                    .{g.name}
                </div>
            ))}
           </div>
        </div>
    )
}