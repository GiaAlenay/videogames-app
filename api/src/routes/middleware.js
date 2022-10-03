const axios=require('axios')
const {Videogame ,Genre}=require('../db.js')
const API_KEY='838be1ec7dc14bd287111367587e067c'
const getVideogames=async(op,id,name)=>{

    try {        
    
        const videogamesApi=[]
        let gamesResponse1=[]
        let i=1
        do {
            const videogame=await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
            const info= await videogame.data.results
            info.map((i)=>{              
                if(videogamesApi.length<100){
                    videogamesApi.push({id:i.id,
                        name:i.name,
                        genres:i.genres.map((g)=>{return { name:g.name}}),
                        background_image:i.background_image,
                        rating:i.rating,
                        created:'api'})
                }
            })
            i++    
        } while (videogamesApi.length<100);
    
        
        const gamesFoundDb=await Videogame.findAll(
            {
                attributes: {
                    exclude: ['description','background_image_additional', 'platforms', 'released']
                },
                include: [{ model: Genre, attributes: ['name']}],
              }   
        )
        gamesResponse1= gamesFoundDb.length>0? [...videogamesApi,...gamesFoundDb]:videogamesApi
      
        if(op===1){           
            gamesResponse1=gamesResponse1?gamesResponse1:{error:`Not pokemons to show.`}
            return gamesResponse1
        }
        if(op===2){
            const gamesResponse2=[[],[]]
            videogamesApi.map((v)=>{
                gamesResponse2[0].push(v.id)
                gamesResponse2[1].push(v.name)
            })
            const gamesDb= await Videogame.findAll({attributes:['name','id']})
            gamesDb.map((na)=>{
                gamesResponse2[0].push(na.id)
                gamesResponse2[1].push(na.name)})
            return gamesResponse2?gamesResponse2:{error:'No matches'}
        }
        if(op===3){
            const confirmId=videogamesApi.find(f=>f.id===id)
            const foundOnApi={}
            if (confirmId){
                const videogame= await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
                const info= await videogame.data
           
                foundOnApi.id=info.id
                foundOnApi.name=info.name,
                foundOnApi.background_image=info.background_image,
                foundOnApi.background_image_additional=info.background_image_additional,
                foundOnApi.platforms=info.platforms.map((p)=>{return p.platform.name}),
                foundOnApi.genres=info.genres.map((g)=>{return { name:g.name}}),
                foundOnApi.rating=info.rating,
                foundOnApi.description=info.description,
                foundOnApi.released=info.released               
            }

                const foundOnDb=await Videogame.findOne({
                    where:{id:id}
                    ,
                    include:[{model:Genre , attributes: ['name']}]
                })
                

            const gamesResponse3=Object.entries(foundOnApi).length>0?foundOnApi:foundOnDb?foundOnDb:{error:`Videogame with id ${id} not found.`}
            return gamesResponse3
        }
        if(op===4){
            
            const re=[]
            let matches=[]
            
            if(name.length>0){
                matches=gamesResponse1.filter(game=>{
                    const regex= new RegExp(`${name}`,"gi")
                    return game.name.match(regex)
                })
            }
            
            matches.map((m,i)=>{if(i<15){re.push(m)}})
           
            const gamesResponse4=re.length>0?re:{error:"No matches to show."}
            return gamesResponse4
           
        }
        
    } catch (error) {
        return error
    }   

}



module.exports={
    getVideogames
}


