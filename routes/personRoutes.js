const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/',async(req,res)=>{
    try{  
      const data = req.body
  
      const newPerson = new Person(data);
      
      const response = await newPerson.save();
      console.log('data saved ');
      res.status(200).json(response);
  }
  
  catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'});
  }
  })
router.get('/',async(req,res)=>{
    try{  
      const data = await Person.find();
      console.log('Data fetched');
      res.status(200).json(data);
  }
  
  catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'});
  }
  })
  

  router.get('/:workType',async(req,res)=>{
    try {
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find ({work: workType});
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invalid work Type'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server'});
    }
})

router.put('/:id',async(req,res)=>{
    try {
        const personId = req.params.id;
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId,updatePersonData,{
            new:true,
            runValidators:true,
        })
        if (!response){
            return res.status(404).json({error :'Person Not found'});
        }
        console.log('Data updated');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server'});
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const personId = req.params.id;
    
        const response = await Person.findByIdAndDelete(personId);
        if (!response){
            return res.status(404).json({error :'Person Not found'});
        }
        console.log('Data deleted');
        res.status(200).json({messege:'person data deleted succesfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server'});
    }
})

module.exports = router;