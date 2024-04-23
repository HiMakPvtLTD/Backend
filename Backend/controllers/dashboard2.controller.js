const dat=require("../function/date")
const dashboard=require("../models/dashboard2.model")


const getListView=async(req,res)=>{
    try{
       console.log(req.body.fromDate,req.body.toDate)
        const result=await dashboard.getListView(req.body.fromDate,req.body.toDate)
        if(result){
           // result[0].ProjectConfig="Endurance"
        //result[0].ProjectType="AODD"
         //result[1].ProjectType="CODD"
            res.send({
                status:200,
                data:result
            })
        }
        else{
            res.send({
                status:404,
                data:"NO Data Available"
            })

        }
    }
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }

}

const GetAlltestView=async(req,res)=>{
    try{
        const from=req.body.fromDate
        const to=req.body.toDate
        const data=await dashboard.GetAlltestView(from,to)
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
const getTestBenchtypeCount=async(req,res)=>{
    try{
        const result=await dashboard.getTestBenchtypeCount()
        //console.log(result)
    if(result){
       
        res.send({
            status:200,
            data:result
        })
    }
        else{
            res.send({
                status:404,
                data:"NOt Found"
            })
        }
    }
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }
    }
// const getSeriesDatabyId=async(req,res)=>{
//     try{
//         const id=req.body.id
//         const data=await dashboard.getTimeSeriesbyId(id)
//         if(data){
//             res.send(data)
//         }
//         else{
//             res.send("Data Not Available")
//         }

//     }
//     catch(err){
//         res.send(err)
//     }
//     }



module.exports={
    getListView,
    getTestBenchtypeCount,
    GetAlltestView
    // getSeriesDatabyId
}