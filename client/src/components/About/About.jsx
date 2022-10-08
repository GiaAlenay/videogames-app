import {Nav} from '../Nav/Nav'
import './About.css'

export const About=()=>{
    return(
        <div className='about'>
            <Nav on={4}/>
            <div className='aboutCont'>
                <div className='leftAbout'>
                <img src='photoContainer.png' className='photCont'/>
                <div className='authorCont'>
                    <p className='authorname'>AUTHOR: GIANELLA LEÓN</p>                    
                </div>
                <div className='linkBehind'>
                    <div className='linkCont'>
                        <a href='https://www.linkedin.com/in/gia-544166230/'>
                            <img src='linkedinIcon.png' alt='in' className='linkedin'/>
                        </a>
                    </div>
                </div>

                </div>
                <div className='midleAbout'>
                    <img src='avatarWoman.png' alt='avatar' className='avatarWoman'/>
                </div>
                <div className='rightAbout'> 
                    <div className=''>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}