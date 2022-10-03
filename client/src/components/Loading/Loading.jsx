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
                <div>
                    Loading...
                </div>
           )}
           {props.typeLoader===3 &&(
                <div>
                    Loading...
                </div>
           )} 
        </div>
    )
}