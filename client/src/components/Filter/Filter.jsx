import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGenresAction , filterOrderAction} from "../../redux/actions"
import './Filter.css'
export const Filter=(props)=>{
    const dispatch=useDispatch()
    const genresNames=['Action', 'Indie', 'Adventure', 'RPG', 'Strategy', 'Shooter', 'Casual', 'Simulation', 'Puzzle', 'Arcade', 'Platformer', 'Racing', 'Massively Multiplayer', 'Sports', 'Fighting', 'Family', 'Board Games', 'Educational', 'Card']
    
    
    console.log(genresNames)
    const[allChecked,setAllChecked]=useState(true)
    
    const [filterOrder, setFilterOrder]=useState({genres:genresNames,
                                                    creation:0,
                                                    name:0,
                                                    rating:0})



    useEffect(()=>{
        dispatch(filterOrderAction(filterOrder))
       
    },[filterOrder])

    const handleInputChange=(e)=>{        
       
        setFilterOrder({...filterOrder,
             [e.target.name]:parseInt(e.target.value,10)
         })
 
     }
    const genresCheckbox=(e)=>{

        if(allChecked===true){
            console.log('en')
            setAllChecked(false)
            setFilterOrder({
                ...filterOrder,
                genres:[],
            })
            setFilterOrder({
                ...filterOrder,
                genres:[e.target.name],
            })
            
        }

       if(allChecked===false){
           


            if (filterOrder.genres.includes(e.target.name)) {
                filterOrder.genres = filterOrder.genres.filter((name) => name !== e.target.name);
                setFilterOrder({
                  ...filterOrder,
                  genres: filterOrder.genres,
                });
              } else {
                setFilterOrder({
                  ...filterOrder,
                  genres: [...filterOrder.genres, e.target.name],
                });
              }
       }
       if(filterOrder.genres.length===0 && allChecked === false){
            setAllChecked(true)
            setFilterOrder({...filterOrder,genres:genresNames})
        }
    }

    return(
        <div className="filterComp">
            <div>
                <h2>Filter</h2>
                <fieldset className="genresCheckBox">
                    <legend>by genre</legend>
                    <input type='checkbox'
                                id={20} 
                                name='all'
                                readOnly={true}
                                disabled={true}                                
                                checked={allChecked} 
                                value={genresNames}
                                onClick={genresCheckbox}                                
                                
                                />All
                    {props.allGenres?.map((g)=>(
                        <div key={g.id}>
                           <input type='checkbox'
                                    id={g.id}
                                    name={g.name}
                                    value={g.id}
                                    onClick={genresCheckbox}
                           />{g.name}
                        </div>))}
                        
                </fieldset>

                <fieldset>
                    <legend>by creation</legend>
                    <div className="creation">
                        <input 
                        type="radio"
                        name='creation' 
                        value={0}  
                        onClick={handleInputChange} 
                        checked={filterOrder.creation!==0?false:true}/> All
                    </div >
                    <div className="creation">
                        <input 
                        type="radio" 
                        name='creation' 
                        value={1} 
                        onClick={handleInputChange} 
                        checked={filterOrder.creation!==1?false:true}/> From website  
                    </div>
                    
                    <div className="creation">
                        <input 
                        type="radio" 
                        name='creation' 
                        value={2}  
                        onClick={handleInputChange} 
                        checked={filterOrder.creation!==2?false:true}/> Created by you 
                    </div>
                </fieldset>
            </div>
            <div>
                <h2>Order</h2>
                <fieldset>
                    <legend>by name</legend>
                    <div className="order">
                        <input 
                        type="radio"
                        name='name' 
                        value={0} 
                        onClick={handleInputChange} 
                        checked={filterOrder.name!==0?false:true}/> None
                    </div>
                    <div className="order">
                        <input 
                        type="radio" 
                        name='name' 
                        value={1} 
                        checked={filterOrder.name!==1?false:true}
                        onClick={handleInputChange}/> From A-Z
                    </div>

                    <div className="order">
                        <input 
                        type="radio" 
                        name='name' 
                        value={2}
                        checked={filterOrder.name!==2?false:true} 
                        onClick={handleInputChange}/> From Z-A
                    </div>
                </fieldset>

                <fieldset>
                    <legend>by rating</legend>
                    <div className="order">
                        <input 
                        type="radio"
                        name='rating' 
                        value={0} 
                        onClick={handleInputChange} 
                        checked={filterOrder.rating!==0?false:true}/> None
                    </div>
                    <div className="order">
                        <input 
                        type="radio" 
                        name='rating' 
                        value={1} 
                        checked={filterOrder.rating!==1?false:true}
                        onClick={handleInputChange}/> Lowest
                    </div>

                    <div className="order">
                        <input 
                        type="radio" 
                        name='rating' 
                        value={2}
                        checked={filterOrder.rating!==2?false:true} 
                        onClick={handleInputChange}/> Highest
                    </div>
                </fieldset>
            </div>
        </div>
    )
}