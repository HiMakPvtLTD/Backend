var analysis=require("../models/Analysis.model")


const GetAnalysisData=async(req,res)=>{
    try{
        const start=req.body.start
        const end=req.body.end
        const id=req.body.id
        const no=req.body.no
        const arr=req.body.data
        console.log(req.body)
        const data=await analysis.getTimeSeriesData(start,end,id,no,arr)
        if (data){
            res.send(data)
        }
        else{
            res.send("NO data Available")
        }
    }
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }
}
const getAllAnalysisData=async(req,res)=>{
    try{
        const id=req.body.id
        const no=req.body.no
        const start=req.body.start
        const end=req.body.end
        
        const data= await analysis.getAnalysisData(id,no,start,end)
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
const getCVariable=async(req,res)=>{
    try{
        const start=req.body.start
        const end=req.body.end

        const data=await analysis.getGroupCData(start,end)

        if(data){
            res.send(data)
        }
        else{
            res.send("no data Available")
        }


    }
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")

    }
}
const getAmbiantData=async(req,res)=>{
    try{
       // console.log(req.body)
        const arr=req.body.data
        const start=req.body.start
        const end=req.body.end
        console.log(req.body)
        const data=await analysis.getMasterAmbientdata(start,end,arr)
        if(data){
            res.send(data)
        }
        else{
            res.send("No Data Availabel")
        }


    }catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }

}
const GetgroupCdata=async(req,res)=>{
    try{
        const start=req.body.start
        const end=req.body.end
         const arr=req.body.data
        console.log(req.body)
        const data=await analysis.GetGroupCData(start,end,arr)
        if(data){
            res.send(data)
        }
        else{
            res.send("No data Available")
        }

    }
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }

}
const GetGroupvsSeries=async(req,res)=>{
    try{
        const series=req.body.series
        const group=req.body.group
        const start=req.body.start
        const end=req.body.end
        const projectID=req.body.id
        const no=req.body.no
        const data=await analysis.GetGroupvsSeries(start,end,projectID,no,series,group)
        if(data){
            console.log(data)
            res.send(data)
        }
        else{
            res.send("No Data Available")
        }

    }catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }

}
const GetGroupvsambiant=async(req,res)=>{
    try{
        const ambiant=req.body.ambiant
        const group=req.body.group
        const start=req.body.start
        const end=req.body.end
        const projectID=req.body.id
        const no=req.body.no
        const data=await analysis.GetGroupvsambiant(start,end,projectID,no,ambiant,group)
        if(data){
            console.log(data)
            res.send(data)
        }
        else{
            res.send("No Data Available")
        }

    }catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }
}
const GetAggregateSeries=async(req,res)=>{
    try{
        const start=req.body.start
        const end=req.body.end
        const id=req.body.id
        const no=req.body.no
        const arr=req.body.data
        const agg=req.body.range
        const data=await analysis.GetAggregateSeries(start,end,id,no,arr,agg)
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
const GetAggregateAmbiant=async(req,res)=>{
    try{
        const start=req.body.start
        const end=req.body.end
        const arr=req.body.data
        const agg=req.body.range
        const data=await analysis.GetAggregateAmbiant(start,end,arr,agg)
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
const getAllGroupC=async(req,res)=>{
    try{
        const start=req.body.start
        const end=req.body.end
        const data=await analysis.GroupCData(start,end)
        if(data){
            res.send(data)
        }
        else{
            res.send("No data Available")
        }

    }
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }

}
const dummb=async(req,res)=>{
    try{
        const start=req.body.start
        const end=req.body.end
         //const arr=req.body.data
       // console.log(req.body)
        const data=await analysis.dumb(start,end)
        if(data){
            res.send(data)
        }
        else{
            res.send("No data Available")
        }

    }
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }

}


module.exports={
    GetAnalysisData,
    getAllAnalysisData,
    getCVariable,
    getAmbiantData,
    GetgroupCdata,
    GetGroupvsSeries,
    GetGroupvsambiant,
    GetAggregateSeries,
    GetAggregateAmbiant,
    getAllGroupC,
    dummb
    
}