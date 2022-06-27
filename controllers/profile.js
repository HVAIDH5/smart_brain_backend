const handleprofile=(req, res, postgres) => {
    const { id } = req.params;
  
        postgres.select('*').from('users').where({id}).then(user=>{
          if(user.length){
            return res.json(user);
          }else
          { res.status(400).json("not found");
          }    
        })
        .catch(err=>{
          res.status(400).json('error getting user')
        })
     }

     module.exports={
        handleprofile: handleprofile,
     }