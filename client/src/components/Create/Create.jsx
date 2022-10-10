import './Create.css'
import {Nav} from '../Nav/Nav'
import {Card} from '../Card/Card'
import {Detail} from '../Detail/Deatail'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { genresIcons, platformsIcons } from './icons';
import {getGenresAction ,getAllIdAction,getAllNamesAction} from '../../redux/actions/index'
import { useHistory } from 'react-router-dom'

const axios = require('axios')

function Validate(input,target,allName,allID){
    let errors={};
    
    if(target==='name' || target==='id'){
        const foundName=allName.find(f=>f.toLowerCase()===input.name.toLowerCase())
        const foundId=allID.find(f=>f===input.id)

        if(!input.name){errors.name='Name is required'}
        if(input.name.length>50){errors.name='Name is too long'}
        if(foundName){errors.name='Name already exists'}
      
        if(!input.id){errors.id='Id is required'} 
        if(foundId){errors.id='Id already exists'}
        if(input.id<0){errors.id='Id can not be a negative number'}
        return errors
    }
    if(target==='background_image'|| target==='background_image_additional'){
       if(!input.background_image.match(/\.(jpeg|jpg|gif|png)$/)){errors.background_image='Url not valid'}
       if(!input.background_image_additional.match(/\.(jpeg|jpg|gif|png)$/)){errors.background_image_additional='Url not valid'}
       return errors
    }

 if(target==='description'){
        if(input.description.length===0){errors.description='Please enter a description.'}
        return errors
    }
    
    // if(target==='genres'){   
          
    //     if(input.length===0){
    //         console.log('vacio')  
    //         errors.genres='Please choose at least one genre.'
    //     }else{
    //         console.log('lleno')  
    //     }
    //     return errors
    // }
    // if(target==='platforms'){
    //     if (input.platforms.length===0){errors.platforms='Please choose at least one platform'}
    //     return errors
    // }
    if(target==='rating'|| target==='released'){
        const array=input.released.split('-')
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear().toString();;

        if (input.rating>5){errors.rating='Rating can not be more than 5 points'}
        if (input.rating<0){errors.rating='Rating can not be less than 0 points'}
        if(input.rating.toString().length>4){errors.rating='Rating can only have two decimals'}
        

        if(array[0]>yyyy){errors.released='Released date can only be before today.'}
        if(array[0]===yyyy && array[1]>mm){errors.released='Released date can only be before today.'}
        if(array[0]===yyyy && array[1]===mm && array[2]>=dd){errors.released='Released date can only be before today.'}
        return errors
    }
}
export const Create=()=>{
    const dispatch= useDispatch()
    const history=useHistory()
    const allGenres=useSelector(state=>state.allGenres)
    const allVideogamesName=useSelector(state=>state.allVideogamesName)
    const allVideogamesId=useSelector(state=>state.allVideogamesId)
    const [animation, setAnimation]=useState(false)
    const [fadein, setFadein]=useState(false)   
    const [visible, setVisible]=useState(true)
    const [result , setResult]=useState('')
    
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
    const [pagesDone,setPagesDone]=useState([])                                 
    const[confirmPag,setconfirmPag]=useState()

     const platformsApi = [
        "PC", "PlayStation 5", "PlayStation 4", "PlayStation 3", "Xbox One", "Xbox Series S/X", "Xbox 360", "Xbox",
        "Nintendo Switch", "Nintendo 3DS", "Nintendo DS", "Nintendo DSi", "iOS", "Android", "macOS", "Linux"]
    const[current,setcurrent]=useState(0)
    const defaultImg='https://www.pngkey.com/png/full/909-9099235_camera-icon-neg-circle.png'
    const pagesleft=[2,3]
    const pagesRigth=[4,5,6]
   const done=[0,1]
    useEffect(()=>{  
        setErrors({random:'error random'})      
        dispatch(getGenresAction())
        dispatch(getAllIdAction())
        dispatch(getAllNamesAction())
    },[])   

    useEffect(()=>{
        if(current===4){         
         if(input.genres.length===0 ){             
             setErrors({...errors, genres:'Please choose at least one genre'})
         } if(input.genres.length>0){
             setErrors({})             
         }
        }
       if(current===5){
        
        if(input.platforms.length===0 ){            
            setErrors({...errors, platforms:'Please choose at least one platform.'})
        } if(input.platforms.length>0){
            setErrors({})            
        }
       }
        
    },[input,current])
   
    useEffect(()=>{
        backgroundChange()
    },[back1n2, current])

    const handleInputChange=(e)=>{
        setinput({...input,
            [e.target.name]:e.target.value })
        setErrors(Validate({...input,
            [e.target.name]:e.target.value},e.target.name,allVideogamesName,allVideogamesId))
    }

    const handleInputChangeNumb=(e)=>{
        setinput({...input,
            [e.target.name]:parseInt(e.target.value,10) })
        setErrors(Validate({...input,
            [e.target.name]:parseInt(e.target.value,10)},e.target.name,allVideogamesName,allVideogamesId))
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

    const backgroundChange=()=>{
        if(back1n2===''){setBack1n2(input.background_image)}
        if(back1n2===input.background_image){
            setTimeout(function(){setBack1n2(input.background_image_additional)},3000)
        }
        else{ setTimeout(function(){setBack1n2(input.background_image)},3000)    }
        
        return back1n2        
    }

    const changePagesHandler=(e)=>{
        if(parseInt(e.target.name,10)>current){
            if(Object.entries(errors).length === 0){
                setcurrent(parseInt(e.target.name,10))
                
                
                for (let i = 2; i < current+2; i++) {
                    if(!done.includes(p=>p===i)){

                        done.push(i) 
                        console.log('do'+done)              
                    }
                    }
                setconfirmPag(done.includes(p=>p===parseInt(e.target.name,10)))
                if(!done.includes(p=>p===parseInt(e.target.name,10))){
                    setErrors({random:'error random'})
                }
            }else{
                alert('You can not continue until you finish this part of the form.')
            }
        }else{
            setErrors({})
            setcurrent(parseInt(e.target.name,10))
            
        }
            
    }

    const movingPages=(e)=>{
        setTimeout(function() {
            setFadein(true)
        }, 1500);
        setAnimation(true)
        setVisible(false)
        
        if(e.target.name==='begining'){
            setTimeout(function(){
                setcurrent(0)
            },2600)            
        }
        
        if(e.target.name==='prev' ){
            if(current!==0){
                setTimeout(function(){
                    setcurrent(current-1)
                },2600)            
            }
        }

        if( e.target.name==='start' ){        
                setTimeout(function(){
                    setcurrent(current+1)
                },3000)                 
        }

        if(e.target.name==='next' ){
                setTimeout(function(){
                    setcurrent(current+1)
                },2500)           
        }

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

    const submit = async (e) => {
        e.preventDefault()
        setResult('waiting')
        const re=await  axios.post('http://localhost:3001/videogames', input)
         .then(d=> 
            {   setResult('success')
            setcurrent(8)
            return"Videogame created successfully."
                })
         .catch(e=> {setResult('fail')
         setcurrent(8)
         return"we could not complete your request , try again later :("
             })        
        // setTimeout(()=>{
        //     setResult('success')
        //     setcurrent(8)
        // },3000)       
        
    }

    const acceptResult=(e)=>{

        if(e.target.name==='yes'){
            history.push('/create')
            window.location.reload()
        }
        else{ history.push('/home') }
    }

    return(
        <div className={`create  `}>
            <div className={`${result==='waiting' ?'loaderCreate':'noLoader'}`}>
                <span className={`${result==='waiting' ?'loaderCre':'noLoaderCre'}`}></span>
            </div>
            {current===0 && <Nav on ={3}/>}

            {current !==0 && current<7&&(
                <div className='creBtnsBaCont'>
                    <div className='creBtnBackCont'>
                        <button className='creBtnBack'
                                type='button'
                                name='begining'
                                onClick={(e)=>{movingPages(e)}}
                        ></button>
                    </div>
                </div>)}
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
                                        {errors.name && (<div className="danger">{errors.name}</div>)}
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
                                            {errors.id &&(<div className="danger">{errors.id}</div>)}
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
                                            {errors.background_image && (<div className="danger">{errors.background_image}</div>)}
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
                                            {errors.background_image_additional && (<div className="danger">{errors.background_image_additional}</div>)}
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
                                            {errors.description && (<div className="danger">{errors.description}</div>)}
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
                                        {  errors.genres && (<div className="danger">{errors.genres }</div>)}
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
                                                    
                                                    </button>
                                                </div>))}
                                        </div>
                                        {errors.platforms && (<div className="danger">{errors.platforms }</div>)}
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
                                            {errors.rating && (<div className="danger">{errors.rating }</div>)}       
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
                                                {errors.released &&(<div className="danger">{errors.released}</div>)}
                                        </div>  

                                        <button type='button'
                                                onClick={(e)=>{movingPages(e)}}
                                                name='next'
                                                className={Object.entries(errors).length === 0 &&input.rating!==''&&input.released!==''?'nextCreat':'notNextCreat'}>
                                           
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
                {current===7  &&(
                    <div className={`containerlastcreatesteps ${animation===true && 'animate_content'} ${fadein===true && 'fade'}`}>
                    
                                <div className={`currentCreatePagLast ${visible  ?'fadeIn':'fadeOut'}`}>
                                    

                                    <div className='preview'>
                                    <div className='creBtnsBaCont cbbcf'>
                                        <div className='creBtnBackCont'>
                                            <button className='creBtnBack cbbf'
                                                 type='button'
                                                name='prev'
                                                onClick={(e)=>{movingPages(e)}}
                                            ></button>
                                        </div>
                                    </div>
                                        <div className='left lp7'>
                                            <Card
                                                version={2}
                                                id={input.id}
                                                name={input.name}
                                                rating={input.rating}
                                                background_image={input.background_image}
                                                genres={genresObj}
                                                />
                                        </div>
                                        <div className='rigth rp7' >
                                            <Detail version={2} VideogameDetail={input} genres={genresObj}/>
                                        </div>
                                    </div>

                                    <div className="btnCreateCont">
                                        <button className="btnCreatFinal" type="submit" >CREATE</button>
                                    </div>
                                    <div>
                                        <div class="lds-hourglass"></div>
                                    </div>

                                </div>
                                
                            

                    
                </div>)}
                {current===8  &&(
                    <div className={`containercreResult ${animation===true && 'animate_content'} ${fadein===true && 'fade'}`}>
                    
                    {result==='fail' &&(
                                <div className={`CreatePagResultFail cpr`}>
                                    <div className='failCont'>
                                        <img src='go.png' className='failI' alt='game over'/>
                                        <img src='gameOver.png' className='failL' alt='game over'/>
                                    </div>
                                    <h2 className='comprobarRe crF'>We could not complete your request , try again later :{'('}</h2>
                                    <h2 className='playAgain pago'>PLAY AGAIN?</h2>
                                    <div className='ynbtnCont'>
                                        <button className='btnYN btnYNgo '
                                                type='button'
                                                onClick={(e)=>{acceptResult(e)}}
                                                name='yes'>YES</button>
                                        <button className='btnYN btnYNgo'
                                                type='button'
                                                onClick={(e)=>{acceptResult(e)}}
                                                name='no'>NO</button>
                                    </div>
                                </div>
                            )} 
                    {result==='success' &&(
                                <div className={`CreatePagResultSuccess cpr`}>
                                    <div className='winnerCont'>
                                        <img src='win.png' className='winner' alt='winner'/>
                                    </div>
                                    <h2 className='comprobarRe'>Videogame created successfully</h2>
                                    <h2 className='playAgain'>PLAY AGAIN?</h2>
                                    <div className='ynbtnCont'>
                                        <button className='btnYN btnyes'
                                                type='button'
                                                onClick={(e)=>{acceptResult(e)}}
                                                name='yes'>YES</button>
                                        <button className='btnYN btnno'
                                                type='button'
                                                onClick={(e)=>{acceptResult(e)}}
                                                name='no'>NO</button>
                                    </div>
                                </div>
                            )}   
                </div>)}               



            </form>
        </div>
    )
}