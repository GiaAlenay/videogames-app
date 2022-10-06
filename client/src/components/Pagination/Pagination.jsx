import { useEffect } from "react"
import { useState } from "react"
import'./Pagination.css'
import { Cards } from "../Cards/Cards";

export const Pagination=(props)=>{
    const[numberPages, setnumberPages]=useState([])
    const[gamesPerPage,setGamesPerPage]=useState([])
    
    const[currentPage, setCurrentPage]=useState(1)
    
    useEffect(()=>{
        setnumberPages([1])
        for (let i = 2; i < (props.allVideogames.length/15)+1; i++) {
        setnumberPages(oldNumbers=>[...oldNumbers,i])
        
        }
    },[props.allVideogames])

    useEffect(()=>{
      onClickHandlerPages(1)  
    
    },[props.allVideogames])

    const onClickHandlerPages=(n)=>{
        setCurrentPage(n)
        setGamesPerPage([])
        props.allVideogames.map((p,i)=>{
            if((15*(n-1))<=i && i<=((n*15)-1)){
                setGamesPerPage(oldGame=>[...oldGame,p])
            }
        })
      
    }


    const prevHandler=(e)=>{
        if(currentPage!==1){
            onClickHandlerPages(currentPage-1)
            console.log('prev')
        }
        
    }

    const nextHandler=(e)=>{
        if(numberPages.length>currentPage){

            onClickHandlerPages(currentPage+1)
            console.log('next')
        }
    }
    return(
        <div className="paginationContainer">
            <div className="upperBtn">
                {currentPage!==1 &&(<button name='prev'
                        className='prevBtn' 
                        onClick={(e)=>prevHandler(e)}
                        >.</button>)}
                {numberPages&& numberPages.map((n,i)=>(               
                        <button key={i} name={n} className={`pageBtn ${currentPage===n&&'current'}`} onClick={(e)=>onClickHandlerPages(n)}>
                            {n}
                        </button>                
                )
                )}
                {numberPages.length>currentPage&&(<button name='next'
                        className='nextBtn'                     
                        onClick={(e)=>nextHandler(e)}
                        >.</button>)}
            </div>
            


            <div className="cards">                        
                <Cards allVideogames={gamesPerPage} />
            </div>

            <div className="underBtn">
            {currentPage!==1 &&(<button name='prev'
                        className='prevBtn' 
                        onClick={(e)=>prevHandler(e)}
                        >.</button>)}
                {numberPages&& numberPages.map((n,i)=>(               
                        <button key={i} name={n} className={`pageBtn ${currentPage===n&&'current'}`} onClick={(e)=>onClickHandlerPages(n)}>
                            {n}
                        </button>                
                )
                )}
                {numberPages.length>currentPage&&(<button name='next'
                        className='nextBtn'                     
                        onClick={(e)=>nextHandler(e)}
                        >.</button>)}
            </div>
        </div>
    )
}