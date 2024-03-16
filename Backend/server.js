// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const http=require("https")
const fs=require("fs")
const cors = require('cors');
const helmet=require('helmet')
const compression=require('compression')
//const privatekey=fs.readFileSync('./ss')

const userRoutes = require('./routes/user');
// const session=require("express-session");
const session = require('express-session');
var sessions=session({
  secret:"BACD",
  resave:false,
  saveUninitialized: false
})
const app = express();
const port = 3000;
app.use(helmet())
app.use(compression(
  {
    threshold: 0
  }
))
//app.use(express.compress())

// app.use((req,res,next)=>{
//   console.log(req.headers)
  
//   if(req.headers["Authorization"]==="Helloworld"){
//     next()
//   }
//   else{
//     res.send({
//       status:401,
//       message:"UnAuthorized User"
//     })

//   }
// })

// const date=new Date()

// console.log(date)





app.use(sessions)
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   next();
// });

app.use(cors())

// app.use(cors({
//    credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
app.use(bodyParser.json({limit:'5mb'}));

app.use('/api', userRoutes);


const httpserver=http.createServer({
  key:fs.readFileSync("./keys/privatekey.pem",'utf8'),
  cert:fs.readFileSync("./keys/691fa35bf7aa7828.crt",'utf-8')
},app).listen(port,()=>{
  console.log("Server Started")
})
httpserver.maxHeaderSize=32*1024


// app.listen(port,() => {
//   console.log(`Server is running on port ${port}`);
// });


// app.server=app.listen(port,'192.168.4.203',() => {
//   console.log(`Server is running on port ${port}`);
// });
//app.server.maxHeaderSize=32*1048
