import {Link} from 'react-router-dom'
import './Nav.css'

export const Nav=()=>{
    return(
        <div className='navBar'>
            <ul>
            <Link to="/">
                <li>LANDING</li>
            </Link>     

            <Link to="/home">
                <li>HOME</li>
            </Link>

            <Link to ="/create">
                <li>CREATE</li>
            </Link>

            <Link to ="/about">
                <li>ABOUT</li>
            </Link>
            </ul>
           
        </div>
    )
}