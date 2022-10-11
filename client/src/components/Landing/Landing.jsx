import { useEffect, useState } from 'react';
import{Link, useHistory} from 'react-router-dom'
import './Landing.css'
export const Landing=()=>{
    const [chosen,setChosen]=useState('')
    const music = new Audio('choose.mp3');
    const history=useHistory();
    const musicmain=new Audio('theme.mp3')

    useEffect(()=>{
        musicmain.play()
    },[])
    const handleLinkClick=(e)=>{
        musicmain.pause()
        music.play();
        setChosen(e.target.name)
        setTimeout(()=>{history.push(`${e.target.name}`)},3000)
        
       }
    return(
        <div className='landing'>
            
            <div className={`romboLanding `}>
                
                <div className='listLanding'>                  
                        <button className={`textListLand ${chosen==='/' &&'cho'}`}
                                value={1}
                                name='/'
                                onClick={handleLinkClick}>
                        ► Landing ◄            
                        </button>                         
                </div>

                <div className='listLAnding'>                                        
                        <button className={`textListLand ${chosen==='/home' &&'cho'}`}
                                value={2}
                                name='/home'
                                onClick={handleLinkClick}>Home</button>                  
                </div>

                <div className='listLAnding'>                    
                    <button className={`textListLand ${chosen==='/create' &&'cho'}`}
                            value={3}
                            name='/create'
                            onClick={handleLinkClick}>Create</button>                  
                </div>

                <div className='listLAnding'>                             
                       <button className={`textListLand ${chosen==='/About' &&'cho'}`}
                                value={4}
                                name='/about'
                                onClick={handleLinkClick}>About</button>                     
                </div>
                
            </div>
            
        </div>
    )
}