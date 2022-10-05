const {Router}=require('express')
const router=Router();
const axios=require('axios')
const {API_KEY}=process.env ;
const {Genre}=require('../db.js')
const ave='838be1ec7dc14bd287111367587e067c'
router.get('/', async(req,res)=>{
    const apiGenre=await axios.get(`https://api.rawg.io/api/genres?key=${ave}`)
    const data=await apiGenre.data;

    try {       
        for(d of data.results){
            const gamesGenres= await Genre.findAll()
            if(gamesGenres.length<20){

                const[genre,created]=await Genre.findOrCreate({
                    where:{name:d.name },
                    defaults:{image_background:d.image_background},
                })
            }            
            
        }

        return res.status(200).json(await Genre.findAll())
    } catch (error) {
        return res.status(404).json({error:'Genres not found'})
    }
})

module.exports=router;