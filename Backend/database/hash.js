var bcrypt=require("bcrypt")

const saltrounds=16

// const Createhash=(password)=>{
//  return new Promise((resolve,reject)=>{
//     bcrypt.genSalt(saltrounds,(err,salt)=>{
//         if(err) reject(err)
//         bcrypt.hash(password,salt,(err,hash)=>{
//         if(err) reject(err)
//             console.log(password,hash)
//             resolve(hash)
//         })

//     })
//  })
// }
const Createhash=async(password)=>{
  const salt=await bcrypt.genSalt(saltrounds)
  const hash=await bcrypt.hash(password,salt)
  return hash
   }
   const comparePassword=async(password,buffer)=>{
    const compare=await bcrypt.compare(password,buffer)
    return compare
   }
   

module.exports={
    Createhash,
    comparePassword
}