var db=require("../database/db")
var uuid=require("uuid")
const formatdate=require("../function/date")
const createsession=async()=>{
    try{
        const id=uuid.v4()
        const date=new Date()
        const newdate=formatdate.convertDate(date)
        console.log(newdate)

        const result=await db.query(`INSERT INTO public."header-token"(
            uuid, "DateTime")
            VALUES ( '${id}', '${newdate}');`)
        
        
        return id

    }
    catch(err){
        console.log(err)
        return err
    }

}
const checkSession=async(id)=>{
    try{
        const query=`select uuid from "header-token" where uuid='${id}'`
        const result=await db.query(query)
        //console.log(query)
        if(result.rowCount==1){
            return {
                status:200
            }
        }
        else{
                return{
                    status:400
                }
            }
        }

    
    catch(err){
        return err
    }

}

const clearToken=async(req,res)=>{
    try{

        const id=req.body.id
        const deletekey=await db.query(`Delete from "header-token" where uuid='${id}'`)
        console.log(deletekey)
        res.send({
            status:200,
            message:"Cleared"
        })
        
    }
    catch(err){
        return err
    }
}

module.exports={
    createsession,checkSession,clearToken
}