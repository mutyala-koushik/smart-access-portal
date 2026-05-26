const express=require('express');

const router=express.Router();

const User=require('../models/User');

const authMiddleware=require('../middleware/authMiddleware');



router.get('/users',authMiddleware,async(req,res)=>{

  try{

    const users=

      await User.find();

    

    setTimeout(()=>{

      res.json(users);

    },2000);

  }

  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

});



router.post('/add-user',authMiddleware,async(req,res)=>{

  try{

    

    const usersCount=

      await User.countDocuments();

    

    const newUser=

      new User({

        customId:101 + usersCount,

        name:req.body.name,

        role:req.body.role,

        status:'Active'

      });

    

    await newUser.save();

    

    const users=

      await User.find();

    res.json({

      success:true,

      users

    });

  }

  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

});



router.put('/update-user/:id',authMiddleware,async(req,res)=>{

  try{

    await User.findByIdAndUpdate(

      req.params.id,

      {

        name:req.body.name,

        role:req.body.role

      }

    );

    const users=

      await User.find();

    res.json({

      success:true,

      users

    });

  }

  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

});



router.delete('/delete-user/:id',authMiddleware,async(req,res)=>{

  try{

    await User.findByIdAndDelete(

      req.params.id

    );

    const users=

      await User.find();

    res.json({

      success:true,

      users

    });

  }

  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

});

module.exports=router;