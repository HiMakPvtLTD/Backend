// server/controllers/userController.js
const userModel = require('../models/user.model');
const nodered=require("../models/node-red")
var jwt=require("jsonwebtoken")



const loginUser = async (req, res) => {
  const { uname, password } = req.body;

  try {
    const user = await userModel.getUserByUsernameAndPassword(uname, password);


    if (user) {
      console.log(user)
    if(user["ustatus"]==true){
        console.log(user["userimage"])
        const image=user["userimage"]==null?'':Buffer.from(user["userimage"],'base64').toString('ascii')
        console.log(user)
         var data={
           "user":user["uname"],
           "roleid":user["roleid"],
           "role":user["rolename"],
           "uid":user["uid"],
           'image':image
   
         }
         console.log( data)
         delete user.userimage
         
         var token=jwt.sign(data,"IAMIRONMAN",{algorithm:"HS256",expiresIn:"30m"})
       //  console.log(token)
         req.session.token=token
         //const data={ success: true, message: 'Login successful', user ,"token":token}
         
         //console.log()
         res.send({ success: true, message: 'Login successful' ,user,"token":token});
      
    }
    else {
      // console.log("hello world")
       res.json({ success: false, message: 'Invalid username or password' });
     }
    } else {
     // console.log("hello world")
      res.json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
const forgotPassword=async(req,res)=>{
  try{
  //  console.log(req.body)
    const user=req.body.user
    var data=await userModel.forgotPassword(user)
    //console.log(data)
    if(data){
      //console.log(data)
      res.send(data)
    }
    else{
      res.send("No User Found")
    }

  }
  catch(err){
    res.send(err)
  }
}
const changePassword=async(req,res)=>{
  try{
    const id=req.body.id
    const pass=req.body.password
    const date=req.body.date
   // console.log(req.body)
    const data=await userModel.changePassword(pass,id,date)
    if(data){
      res.send(data)
    }
    else{
      res.send("No Data")
    }


  }
  catch(err){
    res.send(err)
  }
}
const getRoleMaster=async(req,res)=>{
  try{
    const id=req.body.id
    const data=await userModel.getRoleMaster(id)
    if(data){
      res.send(data)
    }
    else{
      res.send("No Data Available")
    }

  }
  catch(err){
    res.send(err)
  }
}
const SetRole=async(req,res)=>{
  try{
    // const name=req.body.name
    // const date=req.body.date
    // const id=req.body.id
    const data=req.body.data
    console.log(req.body)
    var result=await userModel.SetRole(data)
    if(result){
      res.send(result)
    }
    else{
      res.send("No Data Available")
    }


  }
  catch(err){
    res.send(err)
  }
}
const UpdateRole=async(req,res)=>{
  try{
    const id=req.body.id
    const data=req.body.data
   // console.log(req.body)
    const result=await userModel.UpdateRole(id,data)
    if(result){
      res.send(result)
    }
    else{
      res.send("no Data Available")
    }

  }catch(err){
    res.send(err)
  }
}
const getAllRole=async(req,res)=>{
  try{
    const data=await userModel.getAllRole()
    if(data){
      res.send(data)
    }
    else{
      res.send("No data Available")
    }
  }
  catch(err){
    res.send(err)
  }
}
const getAlluser=async(req,res)=>{
  try{
    const data=await userModel.getAlluser()
    if(data){
      res.send(data)
    }
    else{
      res.send("No data Available")
    }

  }
  catch(err){
    res.send(err)
  }
}
const CreateUser=async(req,res)=>{
  try{
    const data=req.body.data
   // console.log(data)
   console.log(req.body)
    const response=await userModel.CreateUser(data)
    if(response){
      res.send(response)

    }
    else{
      res.send("NO Data Available")
    }

  }
  catch(err){
    res.send(err)
  }

}
const UpdateUser=async(req,res)=>{
  try{
    const uid=req.body.id
    const data=req.body.data
    const response=await userModel.UpdateUser(uid,data)
    if(response){
      res.send(response)
    }
    else{
      res.send("No data Available")
    }

  }
  catch(err){
    res.send(err)
  }
}
const deleteUser=async(req,res)=>{
  try{
    const uid=req.body.id
    const data=await userModel.deleteUser(uid)
    if(data){
      res.send(data)
    }
    else{
      res.send("No Data Available")
    }

  }
  catch(err){
    res.send(err)
  }
}
const GetUserbyId=async(req,res)=>{
  try{
    const id=req.body.id
    const data=await userModel.GetUserbyId(id)
    if(data){
      res.send(data)
    }
    else{
      res.send("No data Available")
    }

  }
  catch(err){
    res.send(err)
  }
}
const CreateUserNote=async(req,res)=>{
  try{
    const arr=req.body.data
    const data=await userModel.CreateUserNote(arr)
    if(data){
      res.send(data)
    }
    else{
      res.send("No Data Available")
    }

  }
  catch(err){
    res.send(err)
  }
}
const UpdateUserNote=async(req,res)=>{
  try{
    const arr=req.body.data
    const id=req.body.id
    console.log(req.body)
    const data=await userModel.UpdateUserNote(id,arr)
    if(data){
      res.send(data)
    }
    else{
      res.send("No data Available")
    }


  }
  catch(err){
    res.send(err)
  }
}
const SelectUserNotebyid=async(req,res)=>{
  try{
    const arr=req.body.id
    const data=await userModel.SelectUserNotebyid(arr)
    if(data){
      res.send(data)
    }
    else{
      res.send("No data Availabel")
    }

  }
  catch(err){
    res.send(err)
  }
}
const CreateFav=async(req,res)=>{
  try{
    const arr=req.body.data
    const data=await userModel.CreateFav(arr)
    if(data){
      res.send(data)
    }
    else{
      res.send("No Data Available")
    }
  }
  catch(err){
    res.send(err)
  }
}
const UpdateFav=async(req,res)=>{
  try{
    const arr=req.body.data
    const id=req.body.id
    const data=await userModel.UpdateFav(id,arr)
    if(data){
      res.send(data)
    }
    else{
      res.send("No Data Avialable")
    }
  }
  catch(err){
    res.send(err)
  }
}
const selectFav=async(req,res)=>{
  try{
    const arr=req.body.data
    const data=await userModel.selectFav(arr)
    if(data){
      res.send(data)
    }
    else{
      res.send("No Data Available")
    }
  }catch(err){
    res.send(err)
  }
}


const deleteFav=async(req,res)=>{
  try{
   // console.log(req.body)
    const fid=req.body.fid
    const data=await userModel.deleteFav(fid)
    if(data){
      res.send(data)
     // console.log(res,'myres')
    }
    else{
      res.send("No Data Avialable")
    }
  }
  catch(err){
    res.send(err)
  }
}
const GetAllNotes=async(req,res)=>{
  try{
    const {from,to}=req.body
    const data=await userModel.getAllUserNote(from,to)
    if(data){
      res.send(data)
    }
    else{
      res.send("No Data Available")
    }

  }
  catch(err){
    res.send(err)
  }
}
const deleteNote=async(req,res)=>{
  try{
    const id=req.body.id
    const data=await userModel.DeleteNote(id)
    if(data){
      res.send(data)
    }
    else{
      res.send("No Data Available")
    }

  }
  catch(err){
    res.send(err)
  }
}
const createAnnotation=async(req,res)=>{
  try{
    const arr=req.body.data
    //console.log(req.body.data)
    const data=await userModel.createAnnotation(arr)
    if(data){
      res.send(data)
    }
    else{
      res.send("No Data Available")
    }

  }
  catch(err){
    res.send(err)
  }

}
const UpdateAnnotation=async(req,res)=>{
  try{
    const arr=req.body.data
    const anid=req.body.anid
    const data=await userModel.updateAnnotation(arr,anid)
    if(data){
      res.send(data)
    }
    else{
      res.send("No Data Available")
    }

  }
  catch(err){
    res.send(err)
  }

}
const SelectAnnotaionbyid=async(req,res)=>{
  try{
    const id=req.body.projectid
    const no=req.body.testno
    const uid=req.body.uid
    const data=await userModel.SelectAnnotaion(id,no,uid)
    if(data){
      res.send(data)
    }
    else{
      res.send("No Data Available")
    }

  }
  catch(err){
    res.send(err)
  }
}
const DeleteAnnotaion=async(req,res)=>{
  try{
    const id=req.body.anid
    const data=await userModel.DeleteAnnotation(id)
    if(data){
      res.send(data)
    }
    else{
      res.send("No Data Available")
    }

  }catch(err){
    res.send(err)
  }
}
const SelectAllAnnotaion=async(req,res)=>{
  try{
    const id=req.body.projectid
    const no=req.body.testno
    const data=await userModel.SelectAllAnnotaion(id,no)
    if(data){
      res.send(data)
    }else{
      res.send("No Data Available")
    }

  }
  catch(err){
    res.send(err)
  }
}

module.exports = { loginUser,forgotPassword,changePassword,getRoleMaster,SetRole,UpdateRole,getAllRole,getAlluser,CreateUser,UpdateUser,deleteUser,GetUserbyId,CreateUserNote,UpdateUserNote
  ,SelectUserNotebyid,CreateFav,UpdateFav,selectFav,deleteFav,GetAllNotes,deleteNote,createAnnotation,
  UpdateAnnotation,SelectAnnotaionbyid,DeleteAnnotaion,SelectAllAnnotaion

};
