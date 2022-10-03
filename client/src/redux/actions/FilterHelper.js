export const FilterOrder=(allVideogames,object)=>{
    let newAllVideogames=[]
    
    if(object.genres.length>0){        
        const noRepeat=[0]
        allVideogames.map((a)=>{
            a.genres.map((aGenres)=>{
                object.genres.map((t)=>{
                    if(aGenres.name===t){
                        if(noRepeat[0]!==a.id){
                            newAllVideogames.push(a)
                            noRepeat.unshift(a.id)
                            
                        }
                        
                    }
                })
            })
        })
        
           
    }
    
    if(object.creation!==null){
        
        
        if(object.creation===0){
            
            newAllVideogames= newAllVideogames}
        if(object.creation===1){
            let newAllVideogames2=[]
            newAllVideogames.map((m)=>{
                if(m.created){newAllVideogames2.push(m)}
            })
            newAllVideogames=newAllVideogames2
            
        }
        if(object.creation===2){
            let newAllVideogames2=[]
            newAllVideogames.map((m)=>{
                if(!m.created){newAllVideogames2.push(m)}
            })
            newAllVideogames=newAllVideogames2
            
        }    
    }

    if(object.name!==null){
        if(object.name===0){
            
            newAllVideogames=newAllVideogames              
        }
        if(object.name===1){
            function SortArray(x, y){
                return x.name.localeCompare(y.name);
            }
            newAllVideogames=newAllVideogames.sort(SortArray)        
            console.log('g'+JSON.stringify(newAllVideogames))
            
        }
        if(object.name===2){
            console.log('entro a name 1')
            function SortArray(y, x){
                return x.name.localeCompare(y.name);
            }
            newAllVideogames=newAllVideogames.sort(SortArray)        
            
        }
    }

    if(object.rating!==null){
        if(object.rating===0){
            
            newAllVideogames=newAllVideogames              
        }
        if(object.rating===1){
            function SortArray(x, y){
                if (x.rating < y.rating) {return -1;}
                if (x.rating > y.rating) {return 1;}
                return 0;
            }
             newAllVideogames=newAllVideogames.sort(SortArray)
            //console.log('deeeeee'+newAllVideogames)        
            
        }
        if(object.rating===2){
            function SortArray(y, x){
                if (x.rating < y.rating) {return -1;}
                if (x.rating > y.rating) {return 1;}
                return 0;
            }
            newAllVideogames=newAllVideogames.sort(SortArray)
            //console.log('deeeeeddddderrre'+newAllVideogames)            
            
        }
    }

    if(newAllVideogames.length===0){
        newAllVideogames=[{error:'no matches to show.'}]
        return newAllVideogames
    }else{

        return newAllVideogames
    }
}