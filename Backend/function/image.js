const fs=require("fs")
var db=require("../database/db")
//const image=require("../function/IEX.png")
const jimp=require("jimp")


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

const compress_image=async(data)=>{
   try{
      console.log(data.slice(0,10))
      const base64Data = data.replace(/^data:image\/\w+;base64,/, '');
      const type=base64Data[0]
      
     console.log(1)
      const image= await jimp.read(Buffer.from(base64Data,"base64"))
      console.log(type)
      image.resize(150,150).quality(80)
      console.log(2)
      var typeformime=''
      if(type=="/"){
         typeformime="jimp.MIME_JPEG"
         const newimage=await image.getBase64Async(jimp.MIME_JPEG)
         return newimage
      }
      else if(type=="i"){
         typeformime="jimp.MIME_PNG"
         const newimage=await image.getBase64Async(jimp.MIME_PNG)
         return newimage
      }
      else if(type=="R"){
         typeformime="jimp.MIME_PNG"
         const newimage=await image.getBase64Async(jimp.MIME_GIF)
         return newimage
      }
      else if(type=="U"){
         typeformime="jimp.MIME_PNG"
         const newimage=await image.getBase64Async(jimp.MIME_BMP)
         return newimage
      }
      console.log(type,typeformime)

     
      console.log(3)


      return newimage


   }
   catch(err){
      console.log(100)
      return err
   }

}
module.exports={
    base64_encode,
    compress_image
}