var projectanalysis=require("../models/projectanalysis.model")

const runProjectList=async(req,res)=>{
    try{
        const data=await projectanalysis.rundataList()
        if(data){
            res.send(data)
        }
        else{
            res.send("No Data Available")
        }


    }
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }

}
const getProjectDetailsan=async(req,res)=>{
    const no=req.body.no
    const id=req.body.id
    try{
        const data=await projectanalysis.getProjectDetailsan(id,no)
        if(data){
           // data[0].ProjectType="AODD"
            res.send(data)
        }
        else{
            res.send("No Data Avalaible")
        }

    }
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }

}
module.exports={
    runProjectList,
    getProjectDetailsan
}