import React from "react"
import { Card } from "../Card/Card"
import './Cards.css'
export const Cards=(props)=>{
    //console.log(props.allVideogames)
    return(
        <div className={`allCards${props.version}`}> 
            <ul className="cards">
                {props.allVideogames?.map((v,i)=>(
                    <div key={v.id}>
                        <Card
                        random={i}
                        id={v.id}
                        name={v.name}
                        rating={v.rating}
                        background_image={v.background_image}
                        genres={v.genres}
                        />
                    </div>
                ))}
            </ul>           
            
        </div>
    )
}