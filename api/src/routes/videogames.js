const {Router}=require('express')
const router=Router();
const { getVideogames } =require('./middleware.js') ;
const {Videogame , Genre}=require('../db.js')


router.get('/', async(req,res)=>{
    const {name}=req.query
    if(name){
        const op=4;
        const gamesByName= await getVideogames(op,null,name)
        if(gamesByName.error){return res.status(404).json(gamesByName)}
        return res.status(200).json(gamesByName)
    }
    
    try{
        const op=1
        const allVideogames=await getVideogames(op)
        //if(allVideogames.error){return res.status(404).json(allVideogames)}
        return res.status(200).json(allVideogames)
    }catch(error){
        return res.status(400).json({error:'error while trying to get all videogames'})
    }
})

router.get('/id',async(req, res)=>{
    const op=2
    const allId= await getVideogames(op)
    try{
        if(allId.error){
            return res.status(404).json(allId)
        }
        return res.status(200).json(allId[0])
    }catch(error){
        return res.status(400).json({error:'no Ids to show'})
    }
})

router.get('/name',async(req, res)=>{
    const op=2
    const allNames= await getVideogames(op)
    try{
        if(allNames.error){
            return res.status(404).json(allNames)
        }
        return res.status(200).json(allNames[1])
    }catch(error){
        return res.status(400).json({error:'no names to show'})
    } 
})


router.post('/', async(req,res)=>{
    let{ id,name, platforms, genres, rating, description, released,background_image,background_image_additional}=req.body
    
    
    if(name && id && description && platforms){
        const op=2
        const AllNameIdFromApi=await getVideogames(op)        
        const nameFound= AllNameIdFromApi[1].find(f=>f.toLowerCase()===name.toLowerCase())        
        const idFound=AllNameIdFromApi[0].find(f=>f===id)
       if(nameFound ){
        return res.status(404).json({error:`Videogame with name "${name}" already exists.`})}
       if(idFound ){
        return res.status(404).json({error:`Videogame with id "${id}" already exists.`})}
    }
    
    if(!name || !id || !description || !platforms){
        return res.status(400).json({error:'Incomplete form'})
    }

    try{
        const newVideogame= await Videogame.create({name,id,description,
            platforms,background_image,background_image_additional, rating,released })
        const gamesGenres= await Genre.findAll()
        if (genres.length===0)genres=[Math.floor(Math.random() * ((gamesGenres.length+1) - 1) + 1)]
         await newVideogame.setGenres(await genres)      
        return res.status(200).send('Videogame created successfully.' )

    }catch(error){
        return res.status(404).json({error:error})
    }
})

router.get('/:id',async(req,res)=>{
    let{id}=req.params
    id=parseInt(id,10)
    const op=3;
    if(id){
        const gameById= await getVideogames(op,id)
        if(gameById.error){return res.status(404).json(gameById)}
        return res.status(200).json(gameById)
    }
})
module.exports=router;