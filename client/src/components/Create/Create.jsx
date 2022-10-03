import './Create.css'
import {Nav} from '../Nav/Nav'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { genresIcons, platformsIcons } from './icons';
import {getGenresAction ,getAllIdAction,getAllNamesAction} from '../../redux/actions/index'
const axios = require('axios')

function Validate(input,target,allName,allID){
    let errors={};
    
    if(target==='name'){
        console.log('na'+target)
        if(!input.name){errors.name='Name is required'}
        if(input.name.length>12){errors.name='Name is too long'}
    }
    if(target==='id'){
        console.log('id' +target)
        
        if(!input.id){errors.id='Id is required'} 
        //if(foundId){errors.id='Id already exists'}
        if(input.id<0){errors.id='Id can not be a negative number'}
    }
    if(target==='description'){
        console.log('des '+target)
        if(!input.description){errors.description='Description is required'}
    }
    return errors
}
export const Create=()=>{
    const dispatch= useDispatch()
    const allGenres=useSelector(state=>state.allGenres)
    //const allVideogamesName=useSelector(state=>state.allVideogamesName)
    //const allVideogamesId=useSelector(state=>state.allVideogamesId)
    const [animation, setAnimation]=useState(false)
    const [fadein, setFadein]=useState(false)
    let currentPage=useRef()
    const [visible, setVisible]=useState(true)
    const[errors, setErrors]=useState({})
    const[input,setinput]=useState({        name:'',
                                            id: '',
                                            description:'',
                                            platforms:[],                                            
                                            genres:[],
                                            rating:'',
                                            released:'',
                                            background_image:'',
                                            background_image_additional:'',
                                        })

     const platformsApi = [
        "PC", "PlayStation 5", "PlayStation 4", "PlayStation 3", "Xbox One", "Xbox Series S/X", "Xbox 360", "Xbox",
        "Nintendo Switch", "Nintendo 3DS", "Nintendo DS", "Nintendo DSi", "iOS", "Android", "macOS", "Linux"]
    const[current,setcurrent]=useState(0)

    useEffect(()=>{
        dispatch(getGenresAction())
        //dispatch(getAllIdAction())
        //dispatch(getAllNamesAction())
    },[])
    
    const handleInputChange=(e)=>{
        setinput({...input,
            [e.target.name]:e.target.value })
        setErrors(Validate({...input,
            [e.target.name]:e.target.value},e.target.name))
    }
    const handleInputChangeNumb=(e)=>{
        setinput({...input,
            [e.target.name]:parseInt(e.target.value,10) })
        setErrors(Validate({...input,
            [e.target.name]:parseInt(e.target.value,10)},e.target.name))
    }
    const handleInputChangeRa=(e)=>{
        setinput({...input,
            [e.target.name]:parseFloat(e.target.value) })
        setErrors(Validate({...input,
            [e.target.name]:parseFloat(e.target.value)},e.target.name))
    }
    const Checkbox=function(e){        
                
        if(e.target.name=== 'genres'){
            if (input.genres.includes(parseInt(e.target.value,10))) {
                input.genres = input.genres.filter((id) => id !== parseInt(e.target.value,10));
                              
                setinput({
                  ...input,
                  genres: input.genres,
                });
              } else {
                 
                setinput({
                  ...input,
                  genres: [...input.genres, parseInt(e.target.value,10)],
                });
              }
        }else{
            if (input.platforms.includes(e.target.value)) {
                input.platforms = input.platforms.filter((name) => name !== e.target.value);
                setinput({
                  ...input,
                  platforms: input.platforms,
                });
              } else {
                setinput({
                  ...input,
                  platforms: [...input.platforms, e.target.value],
                });
              }
        }

    }

//    const obj={name:"DojaMau",  id:3 ,description:"ttutrvdfhs", platforms:["a","b"],
          
          
//    genres:[2,18,19] }
    
const movingPages=(e)=>{
    setTimeout(function() {
        setFadein(true)
      }, 1500);
    setAnimation(true)
    setVisible(false)
    setTimeout(function(){
        setVisible(true)
    },2800)
    //currentPage.current.fadeOut(100).delay(2800).fadeIn();
    setTimeout(function() {
        setAnimation(false);
      }, 3200);
    setTimeout(function() {
       setFadein(false);
      }, 1500);
    // if(e.target.name==='prev' ){
    //     if(current!==1){
    //         setcurrent(current-1)
    //     }
    // }
    // if(e.target.name==='next' || e.target.name==='start' ){
    //     if(current<8){
    //         setcurrent(current+1)
    //     }
    // }
   
}

    const submit = async (e) => {
        e.preventDefault()
        
         const comprobar = await axios.post('http://localhost:3001/videogames', input)
         .then(d=> 
            {   console.log(d)
                return "Videogame created successfully."})
         .catch(e=> {console.log(e)
            return "we could not complete your request , try again later :("})
            alert(comprobar)
        
        
        window.location.reload()
        
    }


    return(
        <div className={`create  `}>
            <Nav/>
            <form onSubmit={submit}>
                <div className={`formCreateVideogame ${animation===true && 'animate_content'} ${fadein===true && 'fade'}`} >                
                    {current===0 &&(
                        <div className={`currentCreatePag ${visible ?'fadeIn':'fadeOut'}`}  ref={currentPage}>
                            <div className='left firstLeft'>
                                <h1 className='wanna'>Wanna add another game to our website?</h1>
                               <div className='button'>
                                <button
                                    onClick={(e)=>{movingPages(e)}}
                                    name='start'
                                    type='button' 
                                    className="startBtn" 
                                    role="button">Let's Start</button>
                                </div>
                            </div>
                            <div className='rigth'>
                                <img className="createFirstImg" src='viogameController.png' alt='controller'/>
                            </div>
                        </div>
                    )}

                    {current===1 &&(
                        <div className="currentCreatePag">
                            <div className='left'>

                            </div>

                            <div className='rigth'>
                                <input
                                    className={`inpt inputNaId`} 
                                    type="text" 
                                    name="name" 
                                    value={input.name} 
                                    placeholder='name...'
                                    onChange={handleInputChange}/>
                                <input 
                                    className={`inpt inputNaId `}
                                    value={input.id}
                                    type="number"
                                    name="id" 
                                    placeholder="id..."                 
                                    onChange={handleInputChangeNumb}
                                                />
                            </div>
                            
                        </div>
                    )}

                    {current===2 &&(
                        <div className="currentCreatePag">
                            <div className='left'>
                            <input 
                                name="background_image"
                                placeholder='url...'                
                                value={input.background_image}
                                onChange={handleInputChange}
                                type="url" 
                                id="fileInput"
                            ></input>

                            <input 
                                name="background_image_additional"
                                placeholder='url...'                
                                value={input.background_image_additional}
                                onChange={handleInputChange}
                                type="url" 
                                id="fileInput"
                            ></input>
                            </div>

                            <div className='rigth'>
                                
                            </div>
                        </div>
                    )}
                    {current===3 &&(
                        <div className="currentCreatePag">
                            <div className='left'>

                            </div>
                            <div className='rigth'>
                                <div>
                                    <label>Description: <br></br></label>
                                    <textarea
                                        type="text"
                                        value={input.description}
                                        name= "description"
                                        onChange={handleInputChange}                        
                                        placeholder="description..."
                                        
                                                />
                                </div> 
                            </div>
                        </div>
                    )}

                    {current===4 &&(
                        <div className="currentCreatePag">
                            <div className='left'>

                            </div>
                            <div className='rigth'>
                                <h3>Genres</h3>
                                <div className='genresContainer'>
                                    {allGenres?.map((g)=>(
                                        <div key={g.id} className="genres">
                                            
                                            <div className={`genreNameContainer ${input.genres.includes(g.id) && 'genreselectedNameCont'} `}>
                                                <div className='nameGenre'>{g.name}</div>
                                            </div>
                                        <div  className={`rombo ${input.genres.includes(g.id) && 'genreselected'} `} > 
                                                <button
                                                    style={{backgroundImage: `url(${allGenres && allGenres.length>0 && genresIcons(g.id)})`}}  
                                                    type="button"
                                                    id={g.id} 
                                                    className="genresOptions"
                                                    name={'genres'} 
                                                    value={g.id}                        
                                                    onClick={(e)=>{Checkbox(e)}} 
                                                        >
                                                                                    
                                                </button> 
                                            </div>
                                            
                                            
                                        </div>
                                    ))}
                                </div> 
                            </div>
                        </div>
                    )}

                    {current===5 &&(
                        <div className="currentCreatePag">
                            <div className='left'>
                                <h3>Platforms</h3>
                                <div className='platformsContainer'>
                                    {platformsApi.map((p,i)=>(
                                        <div key={i} className={`platforms ${input.platforms.includes(p) && 'platformSelected'} `}>
                                            
                                            <button 
                                                        style={{backgroundImage: `url(${platformsIcons(i)})`}}
                                                        type="button"
                                                        name={'platforms'} 
                                                        className="platformsOptions"
                                                        value={p}                        
                                                        onClick={(e)=>{Checkbox(e)}} 
                                                            >
                                            {/* {p}*/}
                                            </button>
                                        </div>))}
                                </div>
                            </div>
                            <div className='rigth'>
                                
                            </div>
                        </div>
                    )}
                    {current===6 &&(
                        <div className="currentCreatePag">
                            <div className='left'>

                            </div>
                            <div className='rigth'>
                                <label>Rating: <br></br></label>
                                        <input
                                            type="number"
                                            value={input.rating}
                                            name= "rating"
                                            onChange={handleInputChangeRa}
                                            step = {0.01}
                                            placeholder= "rating..."
                                            min= {0.00}
                                            max= {5}
                                            
                                        />               
                                    
                                        <label>Released: <br></br></label>
                                        <input
                                            type="date"
                                            value={input.released}
                                            name= "released"
                                            onChange={handleInputChange}
                                        
                                        />
                            </div>
                        </div>
                    )}

                    {current===7 &&(
                        <div className="currentCreatePag">
                            <div className='left'>

                            </div>
                            <div className='rigth'>
                                
                            </div>
                            <div className="btnCreate">
                            <button className="btnCreatFinal" type="submit" >CREATE</button>
                    </div>
                        </div>
                    )}

                    {current===8 &&(
                        <div className="currentCreatePag">
                            <div className='left'>

                            </div>
                            <div className='rigth'>
                                
                            </div>
                        </div>
                    )}
                     
                </div> 
            </form>
        </div>
    )
}