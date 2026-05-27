const express=require('express');

const cors=require('cors');

const userRoutes=require('./routes/userRoutes');

const authRoutes=require('./routes/authRoutes');

const connectDB=require('./config/db');



connectDB();

const app=express();



app.use(cors({
  origin: [
    'https://candid-cucurucho-b6f089.netlify.app',
    'https://neon-selkie-4cda25.netlify.app'
  ]
}));

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