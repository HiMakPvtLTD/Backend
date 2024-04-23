// server/models/user.js
const { response, query } = require('express');
const dat=require("../function/date")
const db = require('../database/db');
const mails=require("../function/mail")
const hash=require("../database/hash")
const emailBody=require("../models/email.json")
const image=require("../function/image")
const bcrypt=require("bcrypt");
const e = require('express');
const saltrounds=10


const getUserByUsernameAndPassword = async (uname, password) => {
    try {
      const query = 'SELECT * FROM "UserMaster" as um join "RoleMaster" as rm on rm.roleid=um.roleid WHERE um."uname" = $1 AND um."password" = $2';
      const result = await db.query(query, [uname, password]);
  
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  };

// const getUserByUsernameAndPassword = async (uname, password) => {
//   try {
//     const query = 'SELECT * FROM "UserMaster" as um join "RoleMaster" as rm on rm.roleid=um.roleid WHERE um."uname" = $1 ';

//    // console.time()
//     const result = await db.query(query, [uname]);
//     if(result.rows.length<=0){
//       return null
//     }
//    // const compare=await bcrypt.compare(password,result.rows[0].password)
//     //console.log(compare)
//      const compare=true
   
//       if(compare){
//        // console.log(result.rows[0])
//        // console.timeEnd()

//         return result.rows[0]
//       }
//      else{
//       return null
//      }
    
  
//   } catch (error) {
//     console.error('Error executing query:', error);
//     throw error;
//   }
// };
  const getRoleMaster=async(id)=>{
    try{
      const query= `select * from "RoleMaster" where roleid=${id}`
      const result=await db.query(query)
      return result.rows


    }
    catch(err){
      return err
    }
  }

const forgotPassword=async(user)=>{
  try{
    //console.log(user)
    
    const sql='select uid,email,mobileno from "UserMaster" where uname=$1'
    //console.log(sql)
    const result=await db.query(sql,[user])
    //console.log(result)
    if(result.rows.length<=0){
    return {
      "message":"No User Found",
      "Status":401
    }
   }
  else {
    const email=result.rows[0].email
    const mobileno=result.rows[0].mobileno
    const id=result.rows[0].uid
    var otp=Math.floor(Math.random()*1000000)
    const mes=`Hello , \n Please enter This OTP in Your Page ${otp}`
    console.log(email,mobileno)
    const subject="Otp For Password Change"
   const mailresult=await mails.sendMail(email,mes,subject)
   console.log(mailresult)
  
   const SentOtp=mails.Sms(mobileno,mes)
   var date=dat.getDate()
   const resu= {
    Status:200,
    "otp":otp
}
   //console.log(SentOtp)
   
   return {
    "Status":200,
    "date":date,
    "id":id,
    "response":resu
    
   }
    //console.log(sendMail)
    
  }
  }
  catch(err){
    return err
  }
  
}
const changePassword=async(password,id,date)=>{
  try{
    var pass=""

    
      //password=await bcrypt.hash(password,saltrounds)
      console.log(password)
      const sql='update "UserMaster" set password=$1,updateddate=$2 where uid=$3'
      const result= await db.query(sql,[password,date,id])
       return result.rows
    
   
    //console.log(password)
    

  }
  catch(err){
    return err
  }

}
//Role
const SetRole=async(data)=>{
  try{
    console.log(Object.keys(data).length)
    if (data==undefined || data==null||Object.keys(data).length>=20||Object.keys(data).length<=18){
        //console.log(1)
        return "Insufficent data"
    }
    else if(Object.keys(data).length==19){
      const start=data.name[0].toUpperCase()
      const num=data.name.length
      const end=data.name.slice(1,num).toLowerCase()
      var name=start+end
     // console.log(name)


      const query2=`select * from "RoleMaster" where rolename='${name}'`
     // console.log(query2)
      const result2=await db.query(query2)
      
      if(result2.rows.length>=1){
        console.log("Found")
        return {
          message:"Found Duplicate",
          status:401
        }
      }else{
        const query=`INSERT INTO public."RoleMaster"(
          rolename, createdbyid, labdash, runningprojectdash, historicalprojects, dataanalysis, logreport, maintenancetool, remoteoperation, alarmaccess, usermanagment, status, eodd, aodd, createddatetime,envreport, groupcreport, usernote, processreport)
         VALUES ( $1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19);`
       // console.log(query)
       const datas=[name,data.id,data.labdash,data.running,data.historical,data.datananlysis,data.logreport,data.maintenancetool,data.remoteoperation,data.alarmaccess,data.usermanagment,data.status,data.eodd,data.aodd,data.date,data.envreport,data.groupcreport,data.usernote,data.processreport]
        const result=await db.query(query,datas)
        return {
          message:"Inserted Succesfully",
          status:"200"
        }
      }
    
      
    }




  }
  catch(err){
    return err
  }
}
const UpdateRole=async(roleid,data)=>{
  try{
    console.log(data)
    if(data==undefined||data==null||roleid==undefined||data.length<=0){
      return "Please Provide valid data"
    }
    else{
      
      const query=`UPDATE public."RoleMaster"
      SET ${data.join()}
      WHERE roleid=${roleid};`
      console.log(query)
  
      const result=await db.query(query)
      return {
        message:"Updated Successfully",
        status:200
      }
      
      
  
    }

  }catch(err){
    return err
  }

}
const getAllRole=async()=>{
  try{
    const query=`Select * from "RoleMaster" where rolename !='Superadmin' order by roleid `
    const result=await db.query(query)
    return result.rows
  }catch(err){
    return err
  }
}
//User
const getAlluser=async()=>{
  try{
    const query=`select um1.*, um2.uname as UpdatedBy from usermasterdetails as um1  join usermasterdetails as um2 on um1.updatedby=um2.uid where um1.rolename!='Superadmin' order by um1.createddate desc `
    const result=await db.query(query)

    // result.rows.map((item)=>{
    //   if(item.userimage!=null){
    //     console.log(item.userimage==null)
    //     const image=Buffer.from(item.userimage,'base64').toString('ascii')
    //     console.log(image)
    //     item.userimage=`${image}`
    //   }
    //   // else{
    //   //   item.userimage=''
    //   // }
    // })
   // console.log(result.rows)
    return result.rows
  }
  catch(err){
    return err
  }
}
const CreateUser=async(data)=>{
  try{
   // console.log(Object.keys(data).length)
    if(Object.keys(data).length>=13||Object.keys(data).length<=11||data==undefined||data==null){
      return {
        message:"Data Not Found",
        status:404
      }
    }
//     else if(Object.keys(data).length==11){


//       const search=`select uname from "UserMaster" where uname='${data.name}'`
//       const found=await db.query(search)
//      // console.log(found.rows)
//       if(found.rowCount>=1){
//         return {
//           message:"User Found",
//           status:401
//         }
//       }
//       else{
//         const query=`INSERT INTO public."UserMaster"(
//           uname, password, updateddate, updatedby, email, roleid, mobileno, createddate, ustatus,fullname,type)
//           VALUES ('${data.name}', '${data.password}', '${data.updateDate}', ${data.updateby}, '${data.email}', ${data.roleid}, ${data.mobile}, '${data.createdate}', ${data.status},'${data.fullname}','${data.type}');`
  
//         console.log(query)
//         const result=await db.query(query)
//         const mailbody=`Dear ${data.fullname},\n Welcome to Avishkar NPD Lab Application.\n This will help you monitor & analyse test bench operation remotely to optimize the testing of the equipment’s.\nFollow below steps to setup password to access application:\n\n1.Click on  https://avishkarlab.idexinsights.ai link.\n2.Enter ${data.name} in username tab\n3.Click on “Forgot Password?”\n4.Enter OTP received on email or phone\n5.Enter OTP and set the password\n6.Reset after entering OTP and password\n7.Login with Username and password\n\nIn case of any trouble, please contact iotlab@idexcorp.com\nThank You,\nAvishkar NPD Lab
//         `
// const smsbody=` Dear ${data.fullname},\n  Welcome to the Avishkar NPD Lab Application.\n 1.Click on https://avishkarlab.idexinsights.ai link to set password.\n2. Enter ${data.name} in username tab\n 3. Click on “Forgot Password?”\n4.Enter OTP received on email or phone\n 5.Enter OTP and set the password to login
// `
//         const subject="Update Your Avishkar Lab Application Account"
//         const sendMessage=mails.Sms(data.mobile,smsbody)
//         console.log(sendMessage)
//         const sendMail=mails.sendMail(data.email,mailbody,subject)
//         console.log(sendMail)
//         return {
//           message:"Inserted Succesfully",
//           status:200
//         }

//       }
      

//     }
    else if(Object.keys(data).length==12){


      const search=`select uname from "UserMaster" where uname='${data.name}'`
      const found=await db.query(search)
     // console.log(found.rows)
      if(found.rowCount>=1){
        return {
          message:"User Found",
          status:401
        }
      }
      else{
        var newimage=''
        if(data.userimage!=''){
         newimage=await image.compress_image(data.userimage)
        }
        console.log(newimage)
        const query=`INSERT INTO public."UserMaster"(
          uname, password, updateddate, updatedby, email, roleid, mobileno, createddate, ustatus,fullname,type,userimage)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9,$10,$11,$12);`
  
        console.log(query)
        const datas=[data.name, data.password, data.updateDate, data.updateby, data.email, data.roleid, data.mobile, data.createdate, data.status,data.fullname,data.type,newimage]
        const result=await db.query(query,datas)
        const mailbody=`Dear ${data.fullname},\n Welcome to Avishkar NPD Lab Application.\n This will help you monitor & analyse test bench operation remotely to optimize the testing of the equipment’s.\nFollow below steps to setup password to access application:\n\n1.Click on  https://avishkarlab.idexinsights.ai link.\n2.Enter ${data.name} in username tab\n3.Click on “Forgot Password?”\n4.Enter OTP received on email or phone\n5.Enter OTP and set the password\n6.Reset after entering OTP and password\n7.Login with Username and password\n\nIn case of any trouble, please contact iotlab@idexcorp.com\nThank You,\nAvishkar NPD Lab
        `
const smsbody=` Dear ${data.fullname},\n  Welcome to the Avishkar NPD Lab Application.\n 1.Click on https://avishkarlab.idexinsights.ai link to set password.\n2. Enter ${data.name} in username tab\n 3. Click on “Forgot Password?”\n4.Enter OTP received on email or phone\n 5.Enter OTP and set the password to login
`
        const subject="Update Your Avishkar Lab Application Account"
        const sendMessage=mails.Sms(data.mobile,smsbody)
        console.log(sendMessage)
        const sendMail=mails.sendMail(data.email,mailbody,subject)
        console.log(sendMail)
        return {
          message:"Inserted Succesfully",
          status:200
        }

      }
      

    }
    

  }catch(err){
    return err
  }


}
const UpdateUser=async(uid,data)=>{
  try{
    console.log(data.length)
    if((uid==undefined && data==undefined)||(uid==null && data==null)||uid==null||data==null||data==undefined||uid==undefined){
      return {
        message:"Please Provide Data",
        status:401
      }
    }
    else{
      if(data.length<=2){
        console.log(data)
        const query=`UPDATE public."UserMaster"
        SET  ${data.join()}
        WHERE uid=${uid};`
        //console.log(query)
        const result=await db.query(query)
        return {
          "message":"Updated Success",
          "status":200
        }
      }
      else{
        const lengths=data[9].length
      const images=data[9].slice(11,lengths-1)
      //console.log(`${images}`,"ghdsx")
      const newimage= await image.compress_image(images)
      //console.log(newimage)
      data[9]=`userimage='${newimage}'`
      console.log(data)
      const query=`UPDATE public."UserMaster"
      SET  ${data.join()}
      WHERE uid=${uid};`
      //console.log(query)
      const result=await db.query(query)
      return {
        "message":"Updated Success",
        "status":200
      }
      }
    }
    
  }
  catch(err){
    return err
  }

}
const deleteUser=async(uid)=>{
  try{
    if(uid==null||uid==undefined){
      return {
        message:"Please Provide Data",
        status:404
      }
    }
    else{
      const query=`DELETE FROM public."UserMaster"
      WHERE uid=${uid}`
      console
      const result=await db.query(query)
      return {
        message:"Deleted Successfully",
        status:200
      }
    }
   

  }
  catch(err){
    return err
  }
}
const GetUserbyId=async(id)=>{
  try{
    if(id==null||id==undefined){
      return {
        "message":"Please Provide Data",
        status:404
      }
    }
    else{
      const query=`SELECT * FROM "usermasterdetails" where uid=${id}`
      const result=await db.query(query)
      return result.rows
    }

  }
  catch(err){
    return err
  }

}
//UserNote
const CreateUserNote=async(data)=>{
  try{
   // console.log(Object.keys(data).length)
    if(Object.keys(data).length>7 || data==undefined ||data==null || Object.keys(data).length<5){
      return {
        message: "Insufficent Data",
        status:"404"
      }
    }else if(Object.keys(data).length==6){
      const query=`INSERT INTO public."UserNoteMaster"(
        projectid, testno, uid, remarks, updateddate,createddate)
       VALUES (${data.projectid}, ${data.testno}, ${data.uid}, '${data.remarks}', '${data.updateddate}','${data.createddate}');`
       console.log(query)

       const result= await db.query(query)
      // console.log(query)
       return {
        "message":"Inserted Successfully",
        "Status":200
       }

    }

  }
  catch(err){
    return err
  }

}
const UpdateUserNote=async(id,data)=>{
  try{
   // console.log(data,id)
    if((id==undefined&&data==undefined)||(id==""&&data=="")|| id==undefined||id==null||data==undefined||data==null){
      return {
        message:"Insufficient Data",
        Status:404
      }
    }
    else{
      const query=`UPDATE public."UserNoteMaster"
      SET ${data.join()}
      WHERE  nid=${id}`
      console.log(query) 
      const result=await db.query(query)
      return {
        message:"Updated Successfully",
        "Status":200
      }
    }


  }
  catch(err){
    return err
  }
}
const SelectUserNotebyid=async(id)=>{
 // console.log(data)
  try{
    if(id==undefined||id==null){
      return {
        message:"Insufficent Data",
        Status:404
      }
    }
   else{
    const query=`select * from "UserNoteMaster" where nid=${id} `
    const result=await db.query(query)
    return result.rows

   }

  }
  catch(err){
    return err
  }
}
const getAllUserNote=async(start,end)=>{
  try{
    const query=`select * from Get_usernote_data where updateddate between '${start}' and '${end}' order by updateddate desc` 
    console.log(query)
    const result=await db.query(query)
    return result.rows
  }
  catch(err){
    return err
  }

}
const DeleteNote=async(id)=>{
  try{
    const query=`DELETE FROM public."UserNoteMaster"
    WHERE  nid=${id};`
    console.log(query)
    const result=await db.query(query)
    
    return{
      message:"Deleted Successfully",
      Status:200
    }

  }catch(err){
    return err

  }
}
//Fav
const CreateFav=async(data)=>{
  try{
    if(Object.keys(data).length>7 || data==undefined||data==null||Object.keys(data).length<5){
      return {
        message:"Insufficient Data",
        Status:401
      }
    }
    else if (Object.keys(data).length==6){
      const query=`INSERT INTO public."FavMaster"(
        projectid, testno, uid, favremark, updatedate, status)
       VALUES ( ${data.projectid}, ${data.testno}, ${data.uid}, '${data.favremark}', '${data.updatedate}',${data.status} );`
     //  console.log(query)
       const result=await db.query(query)
       return {
        message:"Inserted Sucessfully",
        Status:200
       }

    }

  }
  catch(err){
    return err
  }
}
const UpdateFav=async(id,data)=>{
  try{
    if((id==undefined&&data==undefined)||(id==""&&data=="")|| id==undefined||id==null||data==undefined||data==null){
      return {
        message:"Insufficient Data",
        Status:404
      }
    }
    else{
      const query=`UPDATE public."FavMaster"
      SET ${data.join()}
      WHERE  fid=${id};`
      const result=await db.query(query)
      return {
        message:"Updated Successfully",
        "status":200
      }
    }
    

  }
  catch(err){
    return err
  }

}
const selectFav=async(data)=>{
 // console.log(Object.keys(data))
  try{
    if(Object.keys(data).length>4 || data==undefined||Object.keys(data).length<2){
      return {
        message:"Insufficent Data",
        Status:404
      }
    }
    else{
      var query=""
     if(data.projectid==0 && data.testno==0){
      query=`select * from "FavMaster" where uid=${data.uid}`
     }
     else{
      query=`select * from "FavMaster" where uid=${data.uid} and projectid=${data.projectid} and testno=${data.testno}`
     }
      const result=await db.query(query)
      return result.rows
    }
  }
  catch(err){
    return err
  }
}

const deleteFav=async(fid)=>{
  try{
    if((fid==undefined ||fid==null)){
     // console.log(fid,'myid')
      return {
        message:"Insufficient Data "+fid,
        Status:404

        
      }
    }
    else{
      const query=`Delete from "FavMaster" where fid=${fid};`
      const result=await db.query(query)
      return {
        message:"Deleted Successfully",
        "status":200
      }
    }
    

  }
  catch(err){
    return err
  }

}
// const getAllFav=async(data)=>{

// }

const createAnnotation=async(data)=>{
  try{
   //console.log(data)
    if(Object.keys(data).length>10 || data==undefined ||data==null || Object.keys(data).length<8){
      return {
        "message":"Insufficient Data",
        "Status":401
      }
    }
    
    else if(Object.keys(data).length==9){
      console.log(`'${data.projectid}', ${data.testno}, '${data.paraname}', '${data.paratimestamp}', '${data.remark}', ${data.createdbyuid}, '${data.createdbydate}', ${data.updatedbyid}, '${data.updatedbydate}'`)
      const sql=`INSERT INTO public."AnnotationMaster"(
        projectid, testno, paraname, paratimestamp, remark, createdbyuid, createdbydate, updatedbyid, updateddate)
       VALUES ( '${data.projectid}', ${data.testno}, '${data.paraname}', '${data.paratimestamp}', '${data.remark}', ${data.createdbyuid}, '${data.createdbydate}', ${data.updatedbyid}, '${data.updatedbydate}');`
       //console.log(sql)
       const result=await db.query(sql)
       console.log(result)
       return {
        "message":"Inserted Successfully",
        "Status":200
      }
    }
    console.log(8)
    

  }catch(err){
    return err
  }

}
const updateAnnotation=async(data,anid)=>{
  try{
    if(data==undefined||data==null||data.length<=0||anid==undefined||anid==null||(data==undefined&&anid==undefined)||(data==null&&anid==null)){
      return {
        message:"Insufficient Data",
        Status:401
      }
    }
    else{
      const query=`UPDATE public."AnnotationMaster"
      SET ${data.join()}
      WHERE anid=${anid};`
      const result=await db.query(query)
      console.log(result)
      return{
        "Message":"Updated Successfully",
        Status:200
      }

    }

  }
  catch(err){
    return err
  }
}
const SelectAnnotaion=async(projectid,testno,uid)=>{
  try{
    if(projectid==undefined||testno==undefined||uid==undefined||projectid==null||testno==null||uid==null||(projectid==undefined&&testno==undefined&&uid==undefined)){
      return {
        "Message":"Insufficient Data",
        "Status":401
      }
    }else{
      const query=`select * from "AnnotationMaster" where projectid='${projectid}' and testno=${testno} and createdbyuid=${uid}`
      const result=await db.query(query)
      return result.rows
    }

  }catch(err){
    return err
  }
}
const DeleteAnnotation=async(anid)=>{
  try{
    if(anid==undefined||anid==null){
      return{
        message:"InSufficient Data",
        "Status":"401"
      }
    }
    else{
      const query=`Delete from "AnnotationMaster" where anid=${anid};`
      const result=await db.query(query)
      return{
        "Message":"Deleted Successfully",
        "Status":200
      }
    }

  }
  catch(err){
    return err
  }
}
const SelectAllAnnotaion=async(projectid,testno)=>{
  try{
    var statement=''
    if(projectid!=undefined||projectid!=null){
      statement=`where projectid='${projectid}'`
      if(testno!=undefined||testno!=null){
        statement+=`and testno=${testno}`
      }

    }
    var query=''
    if(statement.length<=0){
      query=`select * from "AnnotationMaster" `
    }else{
      query=`select * from  "AnnotationMaster" ${statement} `
    }
    const result=await db.query(query)
    return result.rows
    

  }catch(err){
    return err
  }

}

module.exports = { 
  getUserByUsernameAndPassword,
  getRoleMaster,
  forgotPassword,
  changePassword,
  SetRole,
  UpdateRole,
  getAllRole,
  getAlluser,
  CreateUser,
  UpdateUser,
  deleteUser,
  GetUserbyId,
  CreateUserNote,
  UpdateUserNote,
  SelectUserNotebyid,
  CreateFav,
  UpdateFav,
  selectFav,
  deleteFav,
  getAllUserNote,
  DeleteNote,
  updateAnnotation,
  createAnnotation,
  SelectAnnotaion,
  DeleteAnnotation,
  SelectAllAnnotaion
  
};
