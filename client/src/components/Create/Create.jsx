import './Create.css'
import {Nav} from '../Nav/Nav'
import {Card} from '../Card/Card'
import {Detail} from '../Detail/Deatail'
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
    

    const[back1n2,setBack1n2]=useState('')
    const[genresObj,setGenresObj]=useState([])
                                     


     const platformsApi = [
        "PC", "PlayStation 5", "PlayStation 4", "PlayStation 3", "Xbox One", "Xbox Series S/X", "Xbox 360", "Xbox",
        "Nintendo Switch", "Nintendo 3DS", "Nintendo DS", "Nintendo DSi", "iOS", "Android", "macOS", "Linux"]
    const[current,setcurrent]=useState(0)
    const defaultImg='https://www.pngkey.com/png/full/909-9099235_camera-icon-neg-circle.png'
    const pagesleft=[2,3]
    const pagesRigth=[4,5,6]
    
    useEffect(()=>{
        
        dispatch(getGenresAction())
        //dispatch(getAllIdAction())
        //dispatch(getAllNamesAction())
    },[])
    useEffect(()=>{
        backgroundChange()
    },[back1n2, current])
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
                
                setGenresObj(genresObj.filter((g)=>g.id !== parseInt(e.target.value,10) ))
              } else {                 
                setinput({
                  ...input,
                  genres: [...input.genres, parseInt(e.target.value,10)],
                });
                allGenres.map((g)=>{
                    if(g.id===parseInt(e.target.value,10)){
                        setGenresObj(oldGenres=>[...oldGenres,g])
                        
                    }
                })
                
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
 const backgroundChange=()=>{
    if(back1n2===''){setBack1n2(input.background_image)}
    if(back1n2===input.background_image){
        setTimeout(function(){setBack1n2(input.background_image_additional)},3000)
    }
    else{
        setTimeout(function(){setBack1n2(input.background_image)},3000)
    }
    
    return back1n2
    
 }
const changePagesHandler=(e)=>{
    // setTimeout(function() {
    //     setFadein(true)
    //   }, 1500);

    // setAnimation(true)

    // setVisible(false)

    setcurrent(parseInt(e.target.name,10))
    
    // setTimeout(function(){
    //     setVisible(true)
    // },2800)
    // setTimeout(function() {
    //     setAnimation(false);
    //   }, 3000);
    // setTimeout(function() {
    //    setFadein(false);
    //   }, 1500);
}
const movingPages=(e)=>{
    setTimeout(function() {
        setFadein(true)
      }, 1500);
    setAnimation(true)
    setVisible(false)
    
    
    
    if(e.target.name==='prev' ){
        if(current!==1){
            setcurrent(current-1)
        }
    }
    if(e.target.name==='next' || e.target.name==='start' ){
        if(current<8){
            setcurrent(current+1)

            setTimeout(function(){
                setVisible(true)
            },2800)
            setTimeout(function() {
                setAnimation(false);
              }, 3000);
            setTimeout(function() {
               setFadein(false);
              }, 1500);
        }
    }
   
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
            <form className='form' onSubmit={submit}>
                    {current===0 &&(
                <div className={`formCreateVideogame0 ${animation===true && 'animate_content'} ${fadein===true && 'fade'}`} >   
                
                        <div className={`currentCreatePag ${visible ?'fadeIn':'fadeOut'}`} >
                       
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
                </div>
                    )}
                {current>0 && current<7 &&(

                
                <div className={`containerntnandForm ${animation===true && 'animate_content'} ${fadein===true && 'fade'}`}>
                    
                    <div className='currentpagesNumbers containerleftPag'>
                        <div className='currentNumberPage'>
                                <button className='btnNumberPageCreate'
                                    onClick={(e)=>{changePagesHandler(e)}}
                                    name={1}
                                    type='button'
                                >{1}
                                </button>
                        </div>
                        {pagesleft?.map((p,i)=>(
                            <div className='currentNumberPage'>
                                {/* <div>
                                    <img className={`lock Close ${current>=p?'displayNone':'displayblock' }`} src='lockClose.png' alt='lockClose'/>
                                </div> */}
                                {/* <div>
                                    <img className="lock Open" src='lockOpen.png' alt='lockOpen'/>
                                </div>                                 */}
                                <button name={p}
                                        type='button'
                                        onClick={(e)=>{changePagesHandler(e)}}
                                        className={`btnNumberPageCreate `}
                                    >{p}
                                </button>
                            </div>
                        ))}
                     </div>


                        <div className={`formCreateVideogame ${animation===true && 'animate_content'} ${fadein===true && 'fade'}`}>
                    
                    
                            {current===1 &&(
                                <div className={`currentCreatePag ${visible  ?'fadeIn':'fadeOut'}`}>
                                    
                                    <div className='left'>
                                        <img className='createImgpag1' src='collageVideogames.jpg' alt ='collage'/>
                                    </div>

                                    <div className='rigth page1rigthback'>
                                        <div className='divNameinput'>
                                            <h1 className='questions'>What's your Videogame's name?</h1>
                                            <input
                                                className={`inpt inputNaId`} 
                                                type="text" 
                                                name="name" 
                                                value={input.name} 
                                                placeholder='name...'
                                                onChange={handleInputChange}/>
                                        </div>

                                        <div>
                                            <h1 className='questions'>Let's give it an Id:</h1>
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
                                    
                                </div>
                            )}

                            {current===2 &&(
                                <div className={`currentCreatePag ${visible  ?'fadeIn':'fadeOut'}`}>
                                    
                                    <div className='left'>
                                        <h1 className='questions'>Show us how {input.name.length>0?input.name:'it'} looks:</h1>
                                        <div className='divNameinput'>
                                            <input 
                                                className='inpt'
                                                name="background_image"
                                                placeholder='url...'                
                                                value={input.background_image}
                                                onChange={handleInputChange}
                                                type="url" 
                                                id="fileInput"
                                            ></input>
                                        </div>
                                    
                                        <div>
                                            <input 
                                                className='inpt'
                                                name="background_image_additional"
                                                placeholder='url...'                
                                                value={input.background_image_additional}
                                                onChange={handleInputChange}
                                                type="url" 
                                                id="fileInput"
                                            ></input>
                                        </div>
                                    
                                    </div>

                                    <div className='rigth'>
                                        <div className={`${input.background_image.length===0 ? 'imgContainerPhoto':'imgContPhotoUpload'}`}>
                                            <img className="imgSlctUrl" src={input.background_image.length===0?defaultImg:input.background_image} alt='your photo'/>
                                        </div>
                                        <div className={`${input.background_image_additional.length===0 ? 'imgContainerPhoto':'imgContPhotoUpload'}`}>
                                            <img className="imgSlctUrl" src={input.background_image_additional.length===0?defaultImg:input.background_image_additional} alt='your photo'/>
                                        </div>    
                                    </div>
                                </div>
                            )}
                            {current===3 &&(
                                <div className={`currentCreatePag currentPageWBg ${visible  ?'fadeIn':'fadeOut'}`}
                                 style={{backgroundImage: `url( ${backgroundChange()})`}}
                                >
                                    <div className='left page3 lp3'>

                                    </div>
                                    <div className='rigth page3 rp3'>
                                        
                                        <h1 className='qp3'>Please describe {input.name.length>0?input.name:'it'}:</h1>
                                        <div className='containerTextarea'>
                                            <textarea
                                                className='inpt textarea'
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
                                <div className={`currentCreatePag4 ${visible  ?'fadeIn':'fadeOut'}`}>
                                 
                                    <div className='rigth'>
                                        <h1 className='qp4'> Interesting! What genres does it belongs to?</h1>
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
                                <div className={` currentPgUnique ${visible  ?'fadeIn':'fadeOut'}`}>
                                    <div className='left'>
                                        
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
                                    <div className='rigth rp5'>
                                        <h1 className='questions qp5'>What platforms is it available on?</h1>
                                    </div>
                                </div>
                            )}
                            {current===6 &&(
                                <div className={`currentCreatePag currentUnique6 ${visible  ?'fadeIn':'fadeOut'}`}>
                                    <div className='left lp6'>

                                    </div>
                                    <div className='rigth'>
                                        
                                            <h1 className='notJump'>ALMOST DONE !!</h1>
                                        
                                        <div>
                                            <h1 className='questions qp6'>Rating:</h1>
                                            <input      className=' inptP6'
                                                        type="number"
                                                        value={input.rating}
                                                        name= "rating"
                                                        onChange={handleInputChangeRa}
                                                        step = {0.01}
                                                        placeholder= "rating..."
                                                        min= {0.00}
                                                        max= {5}
                                                        
                                                    />        
                                        </div>    
       
                                        <div>
                                                <h1 className='questions qp6'>When was {input.name.length>0?input.name:'it'} released?</h1>
                                                <input
                                                    className=' inptP6 '
                                                    type="date"
                                                    value={input.released}
                                                    name= "released"
                                                    onChange={handleInputChange}
                                                
                                                />
                                        </div>  

                                        <button type='button'
                                                onClick={(e)=>{movingPages(e)}}
                                                name='next'
                                                className='nextCreate'>
                                            {'>>>'}
                                        </button>        
                                    </div>
                                </div>
                            )}

                                                                      
                     
                     </div>
                     <div className='currentpagesNumbers'>
                        
                        {pagesRigth?.map((p,i)=>(
                            <div className='currentNumberPage'>
                                {/* <div>
                                    <img className={`lock Close ${current>=p?'displayNone':'displayblock' }`} src='lockClose.png' alt='lockClose'/>
                                </div> */}
                                {/* <div>
                                    <img className="lock Open" src='lockOpen.png' alt='lockOpen'/>
                                </div>                                 */}
                                <button name={p}
                                        type='button'
                                        onClick={(e)=>{changePagesHandler(e)}}
                                        className={`btnNumberPageCreate `}
                                    >{p}
                                </button>
                            </div>
                        ))}
                     </div>   
                </div> 
                )}
                {current>6  &&(
                    <div className={`containerlastcreatesteps ${animation===true && 'animate_content'} ${fadein===true && 'fade'}`}>
                    {current===7 &&(
                                <div className={`currentCreatePagLast ${visible  ?'fadeIn':'fadeOut'}`}>
                                    <div className='preview'>
                                        <div className='left'>
                                            <Card
                                                id={input.name}
                                                name={input.name}
                                                rating={input.rating}
                                                background_image={input.background_image}
                                                genres={genresObj}
                                                />
                                        </div>
                                        <div className='rigth'>
                                            <Detail version={2} VideogameDetail={input} genres={genresObj}/>
                                        </div>
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
                </div>)}




            </form>
        </div>
    )
}