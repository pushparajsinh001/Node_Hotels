const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

router.post('/',async(req,res)=>{
  try{  
    const data = req.body

    const newMenuItem = new MenuItem(data);
    
    const response = await newMenuItem.save();
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
      const data = await MenuItem.find();
  
      console.log('data fetches ');
      res.status(200).json(data);
  }
  
  catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'});
  }
  })

  router.get('/:taste',async(req,res)=>{
    try {
        const taste = req.params.taste;
        if(taste == 'sour' || taste == 'sweet' || taste == 'spicy'){
            const response = await MenuItem.find ({taste: taste});
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invalid taste'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server'});
    }
})

  module.exports = router;