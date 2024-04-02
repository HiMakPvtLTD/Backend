var db=require("../database/db")



const getAlarm=async()=>{
    try{
        // const query=`SELECT  intime, chngtime, name, text, state, ackstate, genid, source, datetime, projectid, testno, groupname, message
        // FROM public."AlarmMaster" where state!='Inactive' and ackstate!='Acknowledged' group by  intime, chngtime, name, text, state, ackstate,
        // genid, source, datetime, projectid, testno, groupname, message  order by datetime limit 10`
        const query=`	with alarm  as (
            select row_number() over(partition by name order by intime desc ) as a,intime, chngtime, name, text, state, ackstate, genid, source,
            datetime, projectid, testno, groupname, message from "AlarmMaster"
            ) select * from alarm where a=1 and state!='Inactive' and ackstate!='Acknowledged' order by intime desc limit 10`
        const result=await db.query(query)
        return result.rows


    }
    catch(err){
        return err
    }
}

const getAlarmRange=async(start,end,data)=>{
    try{
        var query=''
        console.log(start,end,data)
        if(start==undefined||end==undefined||start==null||end==null){
            return {
                status:404,
                Message:"Insufficient Data"
            }
        }
        if(data==undefined||data==null){
             query=`select * from alarmdata where datetime between '${start}' and '${end}' order by intime desc`
             const result=await db.query(query)
             return result.rows
        }
        
        query=`select ${data.join(",")} from alarmdata where datetime between '${start}' and '${end}' order by intime desc`
        const result=await db.query(query)
        return result.rows

    }
    catch(err){
        return err
    }
}
const getAlarmExportData=async(start,end,data)=>{
    try{
        console.log(start)
        const query=`select ${data.join(",")} from alarmdata where datetime between '${start}' and '${end}' order by intime desc`
        const result=await db.query(query)
        return result.rows

    }
    catch(err){
        return err
    }
}




module.exports={
    getAlarm,getAlarmRange,getAlarmExportData
}