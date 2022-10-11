import './Loading.css'
export const Loading=(props)=>{
    const random=  Math.floor(Math.random() * 3);
    return(
        <div className={`loader${props.typeLoader}`}>
           {props.typeLoader===1 &&(
                <div >
                    <img className='firstLoader' src={`Loader${random}.gif`} alt='Loading...'/>
                </div>
           )}
           {props.typeLoader===2 &&(
                <div className='loader2Cont'>
                    
                </div>
           )}
           {props.typeLoader===3 &&(
                <div className='loader3Cont'>
                    <img src='https://i.pinimg.com/originals/9b/ed/a7/9beda78c6eb197e9e962a50e7f6ff09c.gif' alt ='Loading...' className='loader3gif'/>
                </div>
           )} 
        </div>
    )
}