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
                        <a href='https://www.linkedin.com/in/gia-544166230/' target="_blank">
                            <img src='linkedinIcon.png' alt='in' className='linkedin'/>
                        </a>
                    </div>
                </div>

                </div>
                <div className='midleAbout'>
                    <img src='avatarWoman.png' alt='avatar' className='avatarWoman'/>
                </div>
                
                
                <div className='rightAbout'> 

                    <div className='aboutrow'>
                        <div className='hexagon'>
                            <a href='https://www.w3.org/Style/CSS/Overview.en.html' target="_blank" className='iconsA'>
                                    <img src='css.png' alt='in' className='iconsAbout'/>
                            </a>
                        </div>

                        <div className='hexagon'>
                            <a href='https://nodejs.org/en/' target="_blank" className='iconsA'>
                                    <img src='node.png' alt='in' className='iconsAbout'/>
                            </a>
                        </div>
                    </div>

                    <div className='aboutMirow'>
                        <div className='hexagon'>
                            <a href='https://www.javascript.com/' target="_blank" className='iconsA'>
                                    <img src='js.png' alt='in' className='iconsAbout'/>
                            </a>
                        </div>

                        <div className='hexagon'>
                            <a href='https://reactjs.org/' target="_blank" className='iconsA'>
                                    <img src='react.png' alt='in' className='iconsAbout'/>
                            </a>
                        </div>

                        <div className='hexagon'>
                            <a href='https://es.redux.js.org/' target="_blank" className='iconsA'>
                                    <img src='redux.png' alt='in' className='iconsAbout'/>
                            </a>
                        </div>
                    </div>

                    <div className='aboutrow'>
                    <div className='hexagon'>
                            <a href='https://www.postgresql.org/' target="_blank" className='iconsA'>
                                    <img src='postgress.png' alt='in' className='iconsAbout'/>
                            </a>
                        </div>

                        <div className='hexagon'>
                            <a href='https://sequelize.org/' target="_blank" className='iconsA'>
                                    <img src='sequelize.png' alt='in' className='iconsAbout'/>
                            </a>
                        </div>
                    </div>

                    <div className='apiHolder'>
                        <p className='ApiAbout'>API USED IN THIS PROYECT:</p> 
                        <a  className='ApiAbout'href='https://rawg.io/apidocs' target="_blank">
                            Rawg
                        </a>
                    </div>

                    <div className='proyectDesCont'>
                        <p>This proyect was made for Henry's Bootcamp</p>
                        <a href='https://www.soyhenry.com/' target="_blank">
                            <img src='henryLogo.png' alt='henryLogo' className='henryLogo'/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}