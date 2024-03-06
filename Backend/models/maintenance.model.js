var db=require("../database/db")

const groupTestRun=async()=>{
    try{
        // const sql=`SELECT tbr."TestBenchId", tbr."DateTime", tbr."TestBenchName", tbr."Status", tbr."ProjectId", tbr."TestRunCount",
        // pm."ProjectName",pm."Group",pm."ProjectType",pm."ProjectConfig"
        //     FROM public."TestBenchCurrentStatus" tbr join "ProjectMaster" pm on tbr."ProjectId"=pm."ProjectId";`

        // const sql=`	
        // with sword as (
        //     SELECT "ID", "PanelStatus", "DateTime", right("PanelName",1) as "Group","PanelName", "ReasonOfStop","LastStopDate"
        // FROM public."IOTPanelStartStop"
        // )
        // SELECT tbr."TestBenchId", tbr."DateTime", tbr."TestBenchName", tbr."Status", tbr."ProjectId", tbr."TestRunCount",
        //     pm."ProjectName",pm."Group",pm."ProjectType",pm."ProjectConfig",sword."PanelStatus",sword."DateTime" as PanelTime,sword."PanelName",sword."LastStopDate",sword."ReasonOfStop"
        //         FROM public."TestBenchCurrentStatus" tbr join "ProjectMaster" pm on tbr."ProjectId"=pm."ProjectId" left join sword on pm."Group"=sword."Group" `
        const sql=`	select *from TestBench_Status_dash as tbs  join "IOTPanelStartStop" as iot on iot."ProjectId"=tbs."ProjectId"`

        const result=await db.query(sql)
        return result.rows
    }
    catch(err){
        return err
    }
}
const UpdatePanelStatus=async(group,status,time,message,projectid,no,uid)=>{
    // ,projectid,no,uid
    try{
        var query=""
        var query1=""
        //console.log(group)
        if(group =="A"){
            query=` update "IOTPanelStartStop" set "PanelStatus"=${status} ,"DateTime"='${time}',"ReasonOfStop"='${message}',"ProjectId"='${projectid}',"TestNo"=${no},"Uid"=${uid},"LastStopDate"='${time}' where "ID"=1`
           // query=` update "IOTPanelStartStop" set "PanelStatus"=${status} ,"DateTime"='${time}',"ReasonOfStop"='${message}' where "ID"=1`
            query1= `INSERT INTO "PanelUpdateLogs"(
                "Panel", "DateTime", "Message", "Status","Uid")
               VALUES ('${group}','${time}','${message}','${status}','${uid}')`
            
        }
        else if(group=="B"){
            query=` update "IOTPanelStartStop" set "PanelStatus"=${status} ,"DateTime"='${time}',"ReasonOfStop"='${message}',"ProjectId"='${projectid}',"TestNo"=${no},"Uid"=${uid},"LastStopDate"='${time}' where "ID"=2`
            //query=` update "IOTPanelStartStop" set "PanelStatus"=${status} ,"DateTime"='${time}',"ReasonOfStop"='${message}' where "ID"=2`
            query1= `INSERT INTO "PanelUpdateLogs"(
                "Panel", "DateTime", "Message", "Status","Uid")
               VALUES ('${group}','${time}','${message}','${status}','${uid}')`
        }
        console.log(query)
        console.log(query1)
      const result=await db.query(query)
       const result1=await db.query(query1)
        //console.log(result)
        return {
           // "PanelUpdate":result,
            "Logs":result1
        }


    }

    catch(err){
        return err
    }

}

const getPanelStatus=async()=>{
    try{
        const query=`select * from "IOTPanelStartStop"`
        const result=await db.query(query)
        return result.rows

    }catch(err){
        return err
    }

}
const CreateMaintenance=async(data)=>{
    console.log(data)
    try{
        if(data==null||data==undefined||Object.keys(data).length>10||Object.keys(data).length<8){
            return {
                message:"Insufficient Data",
                Status:404
            }
        }else if(Object.keys(data).length==9){
            const query=`INSERT INTO public."MaintenanceMaster"(
                projectid, testno, reason, description, createdbyuid, createdbydate, updatedbyid, updateddate,issuecreateddate)
               VALUES ( ${data.projectid}, ${data.testno}, '${data.reason}','${data.desc}', ${data.createuid}, '${data.createdate}', ${data.updateid}, '${data.updatedate}','${data.issuecreateddate}');`
               //console.log(query)
            const result= await db.query(query)
            return{
                message:"Inserted Successfully",
                Status:200
            }

        }

    }
    catch(err){
        return err
    }

}
const UpdateMaintenance=async(data,mid)=>{
    try{
        if(data==undefined||data==null||(data==null &&mid==null)||(data==undefined &&mid==undefined)||mid==undefined){
            return{
                message:"Insufficient Data",
                Status:404
             }

             
        }else{
            // const query=`UPDATE public."MaintenanceMaster"
            // SET ${data.join()}
            // WHERE projectid=${projectid} and testno=${no};`
            const query=`UPDATE public."MaintenanceMaster"
            SET ${data.join()}
            WHERE mid=${mid};`
            console.log(query)
            const result=await db.query(query)
            return {
                message:"Updated Succesfully",
                Status:200
            }
        }

    }
    catch(err){
        return err
    }
}
const SelectMaintenance=async(start,end)=>{
    try{
        const query=`Select * from get_Maintainence_data where createdbydate between '${start}' and '${end}' order by updateddate desc`
        const result=await db.query(query)
        return result.rows

    }
    catch(err){
        return err
    }
}
const GetMaintenance=async(projectid,testno)=>{
    try{
        const query=`select * from "MaintenanceMaster" where projectid=${projectid} and testno=${testno}`

    }
    catch(err){
        return err
    }
}

const deleteMaintenance=async(mid)=>{
    try{
      if(mid==null||mid==undefined){
        return {
          message:"Please Provide Data",
          status:404
        }
      }
      else{
        const query=`DELETE from "MaintenanceMaster" where mid=${mid}`
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






module.exports={
    groupTestRun,
    UpdatePanelStatus,
    getPanelStatus,
    CreateMaintenance,
    UpdateMaintenance,
    SelectMaintenance,
    GetMaintenance,
    deleteMaintenance
}