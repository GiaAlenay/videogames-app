import {Link} from 'react-router-dom'
import './Nav.css'

export const Nav=(props)=>{
    
    return(
        <div className='navBar'>
            
                <div className='navLi'>
                    <Link to="/">
                        <div className={`${props.on===1?`navLiSelected${props.on}`:`navImgCont${props.on}`}`}>
                            <img src='controllerWhite.png' alt='landing' className='navIcon '/>
                        </div>
                    </Link>     
                        
                </div>

                <div className='navLi'>
                    <Link to="/home">
                        <div className={`${props.on===2?`navLiSelected${props.on}`:`navImgCont${props.on}`}`}>
                            <img src='homeWhite.png' alt='home' className='navIcon '/>
                            
                        </div>
                        
                    </Link>
                </div>

                <div className='navLi'>
                    <Link to ="/create">
                        <div className={`${props.on===3?`navLiSelected${props.on}`:`navImgCont${props.on}`}`}>
                            <img src='createWhite.png' alt='create' className='navIcon '/>
                            
                        </div>
                        
                    </Link>
                </div>

                <div className='navLi'>
                    <Link to ="/about">
                    <div className={`${props.on===4?`navLiSelected${props.on}`:`navImgCont${props.on}`}`}>
                        
                        <img src='questionWhite.png' alt='about' className='navIcon '/>
                    </div>
                    
                    </Link>
                </div>
            
           
        </div>
    )
}