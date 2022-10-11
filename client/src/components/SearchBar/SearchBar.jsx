import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVideoGameByNameAction ,getAllNamesAction,clearAction } from '../../redux/actions'
import { Cards } from '../Cards/Cards'
import { Loading } from '../Loading/Loading'
import './SearchBar.css'

export const SearchBar=()=>{
    const[searchConfirm , setSearchConfirm]=useState(false)
    const [text,setText]=useState('')
    const[suggestions , setSuggestions]=useState([])
    const allVideogamesName=useSelector(state=>state.allVideogamesName)
    const VideogamesByName=useSelector(state=> state.VideogamesByName)
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getAllNamesAction())
    },[])

    
    const onSuggestHandler=(text)=>{
        dispatch(clearAction('VideogamesByName',[])) 
        setText(text)
        setSuggestions([])
        setSearchConfirm(true)
        dispatch(getVideoGameByNameAction(text))
        //dispatch(memoryAction(true))
         console.log(VideogamesByName)   
    }

    const handleKeyDown = (event) => {    
        if (event.key === 'Enter') {          
          onSuggestHandler(text)
          event.preventDefault(); 
         }
       };

    const onSubmitHandler=(e)=>{
        e.preventDefault();
        onSuggestHandler(text)
    }
    const onChangeInput=(text)=>{
        let matches=[]
        let short=[]
        if(text.length>0){
            matches=allVideogamesName.filter(name=>{
                
                const regex= new RegExp(`${text}`,"gi")
                return name.match(regex)
            })
        }
        matches.map((m,i)=>{if(i<5){short.push(m)}})
        setSuggestions(short)
        setText(text)
    }
    console.log(VideogamesByName)
    const onClose=()=>{
        setSearchConfirm(false)
        dispatch(clearAction('VideogamesByName',[]))
    }
    return(
        <div >
            <form className='searchform' onSubmit={(e)=>{onSubmitHandler(e)}}>
            <button className='lupa' type="submit">
                <img className='lupaImg'src={'lupa.png'} alt='search Icon'/>
            </button>
                <input type='search'
                        className="input"
                        onBlur={()=>{ setTimeout(()=>{setSuggestions([])},200)}}
                        onChange={(e)=>{onChangeInput(e.target.value)}}
                        onKeyDown={(e)=>{handleKeyDown(e)}}
                        value={text}
                        />
                <div className='sugCont'>{suggestions && suggestions.map((sugName,i)=>(
                    <div  key={i} 
                            id={suggestions.length===i+1 ?'su':'else'}
                            className="suggestion"
                            onClick={()=>onSuggestHandler(sugName)}
                        >{sugName}
                    </div> ))}
                </div>
            </form>
            {searchConfirm && (
                 <div className='searchVideogamesCont' >
                    <button onClick={(e)=>{onClose(e)}}
                            className='searchClose'
                    >X</button>
                    {VideogamesByName.length===0?(
                        <div>
                            <Loading typeLoader={2}/>
                        </div>):(
                        <div>
                            {VideogamesByName.error? (
                            <div >
                                {VideogamesByName.error}
                            </div>):(
                            <div >
                                <Cards allVideogames={VideogamesByName} version={2}/>
                            </div>)}
                        </div>)}
                    
                </div>
            ) }
           
        </div>
    )
}