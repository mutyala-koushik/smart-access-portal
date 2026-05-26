const express=require('express');

const router=express.Router();

const jwt=require('jsonwebtoken');



router.post('/login',(req,res)=>{

  const{
    username,
    password,
    role
  }=req.body;

  

  if(

    username==='admin' &&
    password==='admin123' &&
    role==='Admin'

  ){

    const token=

      jwt.sign(

        {
          username:'admin',
          role:'Admin'
        },

        'mysupersecretkey',

        {
          expiresIn:'1h'
        }

      );

    return res.json({

      success:true,

      token,

      user:{
        username:'admin',
        role:'Admin'
      }

    });

  }

  

  if(

    username==='user' &&
    password==='user123' &&
    role==='General User'

  ){

    const token=

      jwt.sign(

        {
          username:'user',
          role:'General User'
        },

        'mysupersecretkey',

        {
          expiresIn:'1h'
        }

      );

    return res.json({

      success:true,

      token,

      user:{
        username:'user',
        role:'General User'
      }

    });

  }

  

  res.status(401).json({

    success:false,

    message:'Invalid credentials'

  });

});

module.exports=router;