import React from "react"
import { Card } from "../Card/Card"
export const Cards=(props)=>{
    //console.log(props.allVideogames)
    return(
        <div> 
            <ul className="cards">
                {props.allVideogames?.map((v)=>(
                    <div key={v.id}>
                        <Card
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