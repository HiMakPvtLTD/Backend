// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const http=require("https")
const fs=require("fs")
const cors = require('cors');
const helmet=require('helmet')
const compression=require('compression')
const head=require("./controllers/header")
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
app.use(cors())
//app.use(express.compress())

app.use((req,res,next)=>{
 // console.log(req.path)

  if(req.path=="/api/login"||req.path=="/api/forgotpass"||req.path=="/api/changePassword"){
    next()
  }else{
    //console.log(req.headers)
    const token=req.headers["authorization"]==undefined?"":req.headers["authorization"]
    //console.log(token)
    head.checkSession(token).then((ress)=>{
      //console.log(ress)
      if(ress.status==200){
        next()
      }
      else{
        res.status(401).send({
          status:401,
          message:"UnAuthorized User"
        })
    
      }
    })
    //console.log(status)
    
  }
  
})

// const date=new Date()

// console.log(date)





app.use(sessions)
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   next();
// });



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
// app.server.maxHeaderSize=32*1048
