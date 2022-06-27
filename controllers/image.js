const Clarifai =require('clarifai');

const app = new Clarifai.App({
    apiKey: '9c02fa8a14334639b17fe993fa68e15a'
   });
   
const handleApiCall=(req,res)=>{
    app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL, req.body.input).then(data=>{res.json(data);
    })
    .catch(err=> res.status(400).json('unable to work with API'))
}


const handleimage=(req, res,postgres) => {
    const { id } = req.body;
    postgres('users').where('id','=',id).increment('entries',1).returning('entries').then(entries=>{
    res.json(entries[0].entries);
    })
   .catch(err=>res.status(400).json('unable tob get entries'))
  }

module.exports ={
    handleimage: handleimage,
    handleApiCall: handleApiCall,
}