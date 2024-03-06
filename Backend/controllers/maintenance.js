var maintenance =require("../models/maintenance.model")

const getGroupData=async(req,res)=>{
    try{
        const data=await maintenance.groupTestRun()
        if(data){
         //  data[0].Status="Running"
           //data[0].PanelStatus=false
           // console.log(data)
            res.send(data)
        }
        else{
            res.send("No Data Available")
        }

    }catch(err){
        res.send(err)
    }
}
const UpdatePanelStatus=async(req,res)=>{
    try{
        const status=req.body.status
        const group=req.body.group
        const date=req.body.date
        const message=req.body.message
        const projectid=req.body.projectid
        const testno=req.body.no
        const uid=req.body.uid
        console.log(req.body)
        const data=await maintenance.UpdatePanelStatus(group,status,date,message,projectid,testno,uid)
       // const data=await maintenance.UpdatePanelStatus(group,status,date,message)
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

const getPanelStatus=async(req,res)=>{
    try{
        const data=await maintenance.getPanelStatus()
        if(data){
            data[0].IP1GA_DateTime=new Date(data[0].IP1GA_DateTime).toLocaleString()
            
            res.send(data)
        }
        else{
            res.send("No Data Available")
        }

    }catch(err){
        res.send(err)
    }
}
const CreateMaintenance=async(req,res)=>{
    try{
        const arr=req.body.data
        const data=await maintenance.CreateMaintenance(arr)
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
const UpdateMaintenance=async(req,res)=>{

    try{
        const arr=req.body.data
        const id=req.body.mid
        console.log(req.body)
        //const no=req.body.testno
        const data=await maintenance.UpdateMaintenance(arr,id)
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
const SelectMaintenance=async(req,res)=>{
    
    try{
        const start=req.body.from
        const end=req.body.to
        //console.log(req.body)
        const data=await maintenance.SelectMaintenance(start,end)
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

const deleteMaintenance=async(req,res)=>{
    try{
      const mid=req.body.mid
      const data=await maintenance.deleteMaintenance(mid)
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

const GetMaintenancebyid=async(req,res)=>{
    try{
        const projectid=req.body.projectid
        const testno=req.body.testno
        const data=await maintenance.GetMaintenance(projectid,testno)
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

module.exports={
    getGroupData,
    UpdatePanelStatus,
    getPanelStatus,
    CreateMaintenance,
    UpdateMaintenance,
    deleteMaintenance,
    SelectMaintenance,
    GetMaintenancebyid
    
}