const fs=require("fs")
var db=require("../database/db")
//const image=require("../function/IEX.png")


const base64_encode=async()=>{
   try{
//    var bitmap=fs.readFileSync('D:/New folder (4)/Backend/function/Idex-New-Image.jpg',"base64")
//     const query=`INSERT INTO public.image(
//         imgid, image)
//         VALUES (1, '${bitmap}');`
//         console.log(query)
//         const result= await db.query(query)
//         console.log(result)
    
//    console.log(bitmap)
  
   const query=`select image from image`
   const result=await db.query(query)
   const buffer=result.rows[0].image
  const pop=Buffer.from(buffer,'base64').toString('ascii')
//    const bitmap=fs.writeFileSync("Idex.jpg",pop)
//    const image=fs.readFileSync('')
   console.log(buffer)
    return pop
   }
   catch(err){
    console.log(err)
    return err
   }
    //return new Buffer(bitmap).toString("base64")


}
module.exports={
    base64_encode
}