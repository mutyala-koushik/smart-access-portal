const express=require('express');

const cors=require('cors');

const userRoutes=require('./routes/userroutes');

const authRoutes=require('./routes/authroutes');

const connectDB=require('./config/db');



connectDB();

const app=express();



app.use(cors());

app.use(express.json());



app.use(userRoutes);

app.use(authRoutes);



app.get('/',(req,res)=>{

  res.send('Backend Running 😎');

});



const PORT=3000;

app.listen(PORT,()=>{

  console.log(

    `Server running on port ${PORT}`

  );

});