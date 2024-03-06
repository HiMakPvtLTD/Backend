const { getData } = require("../controllers/testing")
var db=require("../database/db")
const testing=require("./test")
const selectdata=require("../controllers/data.json")

const getTimeSeriesData=async(from,to,projectid,no,data)=>{
    try{
        console.log(from,to,projectid,no,data)
       // console.log(data)
        var arr=new Array()
        
        
        var p=""
        var statement=`where "DateTime" between '${from}' and '${to}' `
       // console.log(arr,from,to,projectid,no,data)
        //console.log(projectid!=null)
        if(projectid!=null){
             p+=`and "ProjectId"='${projectid}'`
             if(no!=null){
                p+=`and "TestNo"=${no}`
             }
             else{
                
             }
           // console.log(p)
        }
        else{
        }
       // console.log(arr)
        if( data==null||data==undefined){
            arr.pop()
            arr.push("*")
        }
        else{
            data.map((item)=>{
                if(item!="SelectAll"){
                    arr.push(`"${item}"`)
                }
            })
        } 
       if(p!=""){
        statement+=p

       }
      // console.log(arr.length)
        const query=`select "ProjectId","TestNo",to_char("DateTime",'YYYY-MM-DD hh24:mi:ss') as "DateTime",${arr.join()} from "TimeseriesData" ${statement} order by "DateTime" desc`
        //console.log(query)
      //const query=`select ${arr.join()} from "TimeseriesData" ${statement} order by "DateTime" desc`
        console.log(query)
        const result=await db.query(query)

        // const dat=[]
        // result.rows.map((item)=>{
        //     const it=Object.values(item).map(item=>dat.push(item))
           
        // })
        // console.log(dat.length)
        return result.rows
    }
    catch(err){
        return err
    }


}
const Histogram=async(from,to,projectid,no,data)=>{
    try{
        console.log(from,to,projectid,no,data)
       // console.log(data)
        var arr=new Array()
        var ambiant=new Array()
        var groupc=new Array()
        
        
        var p=""
        var statement=`where "DateTime" between '${from}' and '${to}' `
       // console.log(arr,from,to,projectid,no,data)
        //console.log(projectid!=null)
        if(projectid!=null){
             p+=`and "ProjectId"='${projectid}'`
             if(no!=null){
                p+=`and "TestNo"=${no}`
             }
             else{
                
             }
           // console.log(p)
        }
        else{
        }
       // console.log(arr)
        if( data.ambiant!=null||data.ambiant!=undefined){
           const query=`select ${data.ambiant} from  "MasterPanel"`
        }
        else{
            data.map((item)=>{
                arr.push(`"${item}"`)
            })
        } 
       if(p!=""){
        statement+=p

       }
      // console.log(arr.length)
       // const query=`select "ProjectId","TestNo",to_char("DateTime",'YYYY-MM-DD hh24:mi:ss') as DateTime,${arr.join()} from "TimeseriesData" ${statement} order by "DateTime" desc`
        //console.log(query)
      const query=`select ${arr.join()} from "TimeseriesData" ${statement} order by "DateTime" desc`
        console.log(query)
        const result=await db.query(query)

        const dat=[]
        result.rows.map((item)=>{
            const it=Object.values(item).map(item=>dat.push(item))
           
        })
        // console.log(dat.length)
        return dat
    }
    catch(err){
        return err
    }


}
const DataforSeriesExport=async(projectid,data,no)=>{
    try{
        console.log(projectid,data)
        const arr=[]
        // arr=data.map(item=>item)
        // console.log(arr,projectid,data)
        data.map((item)=>{
            if(item!="SelectAll"){
                arr.push(`"${item}"`)

            }
        })
        const query=`select "ProjectId","TestNo", "DateTime",${arr.join(",")} from "TimeseriesData" where "ProjectId"='${projectid}' and "TestNo"<=${no}  order by "TestNo","DateTime"`
        console.log(query)
        const result=await db.query(query)
        return result.rows


    }
    catch(err){
        return err
    }
}
// const DataforambiantExport=async(start,end)=>{

// }



const getGroupCData=async(start,end)=>{
    try{
        //var query=`select distinct ("Index","UDef") as "Data" from "GroupCData" where "DateTime" between '${start}' and '${end}'`
       var query=`select Distinct("Index"||'-'||"UDef") as "Data" from "GroupCData" where "DateTime" between '${start}' and '${end}' ` 
       const result= await db.query(query)
        return result.rows

    }
    catch(err){
        return err
    }

}

const getAnalysisData= async(projectID,no,start,end)=>{
    try{
        //console.log(projectID,no,start,end)
        const query1=`select * from "TimeseriesData" where "ProjectId"='${projectID}' and "TestNo"='${no}' and "DateTime" between '${start}' and '${end}' order by "DateTime" desc`
        const query2=`select ("Index","UDef") as Data,"ID", "ProjectId", "ScaleMin", "ScaleMax", "Value", "High", "HighHigh", "Low", "LowLow", "UDef", "Index", "DateTime" from "GroupCData" where "DateTime" between '${start}' and '${end}'   order by "DateTime" desc`
        // console.log(query1)
        // console.log(query2)
        const result1=await db.query(query1)
        const result2=await db.query(query2)
        const data={
            "TimeSeriesData":result1.rows,
            "GroupCData":result2.rows
        }
        return data
    }
    catch(err){
        return err
    }

}
const getMasterAmbientdata=async(start,end,data)=>{
    try{

      if(data==undefined|| data==null||data.length==0){
        if(start==null || start==undefined ||end ==null||end==undefined){
            return {
                "message":"Insufficient Data..",
                "status":404
            }
        }
        else{
            const query=`select * from "MasterPanel" where "DateTime" between '${start}' and '${end}' order by "DateTime" desc`
           console.log(query)
            const result=await db.query(query)
            return result.rows
        }
      }
      else{
        const arrt=[]
        const array=data
        data.map((item)=>{
            arrt.push(`"${item}"`)
        })
      //  console.log(arrt)
        const query=`select "DateTime",${arrt.join()} from "MasterPanel" where "DateTime" between '${start}' and '${end}' order by "DateTime" desc`
        console.log(query)
        const result=await db.query(query)
        return result.rows

      }
      

    }catch(err){
        return err
    }
}
// const GetGroupCData=async(start,end,data)=>{
//     try{
//         console.log(data==undefined)

//        // var query=``
//         var statement=``
        
//          if(data==undefined||data==null||data.length==0){
//             statement=`"DateTime" between '${start}' and '${end}'`
//         }
//         else{
//             statement=` ("Index","UDef") in (${data.join()}) and "DateTime" between '${start}' and '${end}'`
//         }


//          const query=`select ("Index","UDef") as Data,"ID", "ProjectId", "ScaleMin", "ScaleMax", "Value", "High", "HighHigh", "Low", "LowLow", "UDef", "Index", "DateTime" from "GroupCData" where  ${statement} order by "DateTime" desc`
//          console.log(query)
//          const result=await db.query(query)
//          return result.rows
//     }catch(err){
//         return err
//     }
// }

const GetGroupCData=async(start,end,data)=>{
        try{

            var array=[]
    //const query=`select distinct "UDefs" as need,need as beed from groupcTest3 where "DateTime" between '${start}' and '${end}' order by 1   `
    const query=`select Distinct("Index"||'-'||"UDef") as data from "GroupCData" where "DateTime" between '${start}' and '${end}' `
    console.log(1)
    const result=await db.query(query)
    const testingarray=[]
    console.log(result.rows)
    const arr=[]
    result.rows.map((item)=>{
       
        arr.push(item.need)
       
        array.push(`Max(case when "Index"||'-'||"UDef"='${item.data}' then "Value" End) as "${item.data}"`)
    })

    console.log(2)
    console.log(data)
    var query2=``
    if(data==null||data==undefined){

        query2=`
            select "DateTime",${array.join(",")} from "GroupCData" where "DateTime" between '${start}' and '${end}' group by "DateTime" order by "DateTime" desc
        `
    

    }else{
        const arr1=[]
        const arr2=[]
        data.map((item)=>{
            arr1.push(`"${item}"`)
            arr2.push(`"${item}" is not NULL`)

        })
        
        query2=`select "DateTime",${arr1.join(",")} from (
            select "DateTime",${array.join(",")} from "GroupCData" where "DateTime" between '${start}' and '${end}' group by "DateTime" order by "DateTime" desc
        ) as final where ${arr2.join(" or ")}`
    }
    // const query2=`
    //     select * from crosstab('select "DateTime","ProjectId","TestRunNo","UDefs","Value" from groupcTest3 order by 1,3   ',
    // '	select distinct("UDefs") from groupcTest3 order by 1  ') as ct("DateTime" text,"ProjectId" text,"TestRunNo" text,${array.join(",")})
    //   `

    // const query2=`select "DateTime",${data.join(",")} from (
    //     select "DateTime",${array.join(",")} from "GroupCData" where "DateTime" between '${start}' and '${end}' group by "DateTime" order by "DateTime" desc
    // ) as final`

    console.log(3)
    console.log(query2)
    const result1=await db.query(query2)
    //console.log(result1.rows[0].DateTime)


    const stri=JSON.stringify(result1.rows)
    // result1.rows.map((item,index)=>{
    //     Object.keys(item).map((it)=>{
    //         const exist=testingarray.find((key)=>key.sereisname==it)
    //         console.log(exist)
            
            
            

    //     })
    // })
  //  console.log(testingarray)

    return result1.rows
           
        }catch(err){
            return err
        }
}


const GetGroupvsSeries=async(start,end,projectID,no,series,group)=>{

     
            try{
    
            var array=[]
            const arr=[]

            var statement=`where tm."DateTime" between '${start}' and '${end}'`
            if(projectID!=undefined||projectID!=null){
                statement+=`and tm."ProjectId"='${projectID}'`
                if(no!=undefined||no!=null){
                    statement+=`and tm."TestNo"=${no}`
                }
            }
           if((series==undefined && group==undefined)||series==undefined||group==undefined){
            return{
                message:"Please Provide Data For your demand",
                Status:401
            }
           }
           else{
           
            if(series.length<=0){
                arr.push("*")
            }else{
                series.map((item)=>{
                    arr.push(`tm."${item}"`)
                })
            }
            if(group.length>0){
                group.map((item)=>{
                    arr.push(`f1."${item}"`)

                })
            }
            
           }
        //const query=`select distinct "UDefs" as need,need as beed from groupcTest3 where "DateTime" between '${start}' and '${end}' order by 1   `
        const query=`select Distinct("Index"||'-'||"UDef") as data from "GroupCData" where "DateTime" between '${start}' and '${end}' `
        console.log(query)
        console.log(1)
        const result=await db.query(query)
        const testingarray=[]
        console.log(result.rows)
        //const arr=[]
        result.rows.map((item)=>{
           
           
           
            array.push(`Max(case when "Index"||'-'||"UDef"='${item.data}' then "Value" End) as "${item.data}"`)
        })
         console.log(array)
        console.log(2)
        //console.log(data)
        var query2=``
        
    
        query2=`select to_timestamp(f1.timestamp) as timestamp ,${arr.join(",")} from (
        select ROUND(EXTRACT(epoch FROM "DateTime") / 30) * 30 AS timestamp,${array.join(",")} from "GroupCData" where "DateTime" between '${start}' and '${end}' group by "DateTime" order by "DateTime" desc
        ) as  f1 join "TimeseriesData" as tm on f1.timestamp=(ROUND(EXTRACT(epoch FROM tm."DateTime") / 30) * 30) ${statement}`
        

        const result1=await db.query(query2)
                 console.log(3)
                 console.log(query2)
                 console.log(result1.rows)
                 return result1.rows
                
    //    const getDtaa=()=>{
    //     return new Promise(async(resolve,reject)=>{
    //         const result1=await db.query(query2)
    //         console.log(3)
    //         console.log(query2)
    //         resolve(result1)
    //     })
    //    }
    //    getDtaa().then((res)=>{
    //     return res.rows
    //    })
        
      
    
       
               
            }catch(err){
                return err
            }
}
const GetGroupvsambiant=async(start,end,projectID,no,ambiant,group)=>{

     
    try{

    var array=[]
    const arr=[]

    var statement=`where mp."DateTime" between '${start}' and '${end}'`
    // if(projectID!=undefined||projectID!=null){
    //     statement+=`and tm."ProjectId"='${projectID}'`
    //     if(no!=undefined||no!=null){
    //         statement+=`and tm."TestNo"=${no}`
    //     }
    // }
   if((ambiant==undefined && group==undefined)||ambiant==undefined||group==undefined){
    return{
        message:"Please Provide Data For your demand",
        Status:401
    }
   }
   else{
   
    if(ambiant.length<=0){
        arr.push("*")
    }else{
        ambiant.map((item)=>{
            arr.push(`mp."${item}"`)
        })
    }
    if(group.length>0){
        group.map((item)=>{
            arr.push(`f1."${item}"`)

        })
    }
    
   }
//const query=`select distinct "UDefs" as need,need as beed from groupcTest3 where "DateTime" between '${start}' and '${end}' order by 1   `
const query=`select Distinct("Index"||'-'||"UDef") as data from "GroupCData" where "DateTime" between '${start}' and '${end}' `
console.log(query)
console.log(1)
const result=await db.query(query)
const testingarray=[]
console.log(result.rows)
//const arr=[]
result.rows.map((item)=>{
   
   
   
    array.push(`Max(case when "Index"||'-'||"UDef"='${item.data}' then "Value" End) as "${item.data}"`)
})
 console.log(array)
console.log(2)
//console.log(data)
var query2=``


query2=`select to_timestamp(f1.timestamp) as timestamp ,${arr.join(",")} from (
select ROUND(EXTRACT(epoch FROM "DateTime") / 30) * 30 AS timestamp,${array.join(",")} from "GroupCData" where "DateTime" between '${start}' and '${end}' group by "DateTime" order by "DateTime" desc
) as  f1 join "MasterPanel" as mp on f1.timestamp=(ROUND(EXTRACT(epoch FROM mp."DateTime") / 30) * 30) ${statement}`


        const result1=await db.query(query2)
         console.log(3)
         console.log(query2)
         console.log(result1.rows)
         return result1.rows
        
//    const getDtaa=()=>{
//     return new Promise(async(resolve,reject)=>{
//         const result1=await db.query(query2)
//         console.log(3)
//         console.log(query2)
//         resolve(result1)
//     })
//    }
//    getDtaa().then((res)=>{
//     return res.rows
//    })




       
    }catch(err){
        return err
    }
}

const GetAggregateSeries=async(start,end,projectID,no,data,agg)=>{
    try{
        var statement=`where "DateTime" between '${start}' and '${end}' `
        var array=[]
        var aggs=agg==null?"5 min":agg

        if(data!=null||data!=undefined){
            
           
            data.map((item)=>{
                array.push(`avg("${item}") as "${item}"`)
            })
            if(projectID!=null||projectID!=undefined){
                statement+=`and "ProjectId"='${projectID}'`
                if(no!=undefined||no!=null){
                    statement+=`and "TestNo"=${no}`
                }


            }

        }
        else{
            return {
                message:"Insufficient Data",
                "Status":401
            }
        }
        const query=`
        select date_bin('${aggs}', "DateTime", '2000-1-1')as "Interval",${array.join()},"ProjectId","TestNo" from "TimeseriesData"
        ${statement} group by "Interval","TestNo","ProjectId" order by "Interval" desc`
        console.log(query)
        const result=await db.query(query)
        return result.rows

    }catch(err){
        return err
    }


}

const GetAggregateAmbiant=async(start,end,data,agg)=>{
    try{
        var statement=`where "DateTime" between '${start}' and '${end}' `
        var array=[]
        var aggs=agg==null?"5 min":agg

        if(data!=null||data!=undefined){
            
           
            data.map((item)=>{
                array.push(`avg("${item}") as "${item}"`)
            })
            

            

        }
        else{
            return {
                message:"Insufficient Data",
                "Status":401
            }
        }
        const query=`
        select date_bin('${aggs}', "DateTime", '2000-1-1')as "Interval",${array.join()} from "MasterPanel"
        ${statement} group by "Interval" order by "Interval" desc`
        console.log(query)
        const result=await db.query(query)
        return result.rows

    }catch(err){
        return err
    }


}

const dumb=async(start,end)=>{
    try{
        //const query=`select ("Index","UDef") as Data, * from "GroupCData" where ("Index","UDef") in (${data.join()})  and "DateTime" between '${start}' and '${end}'   order by "DateTime" desc`
       // console.log(query)
       const query=`	with groupc as (
        select "Index",Max("UDef"),("Index",Max("UDef")) as "UDefs" from "GroupCData" group by "Index" order by "Index"
        ) select gc2."UDefs",* from  "GroupCData" as gc join groupc as gc2 on gc2."Index"=gc."Index" where "DateTime" between '${start}' and '${end}'`
        const result=await db.query(query)
        return result.rows
   }catch(err){
       return err
   }

}


module.exports={
    getTimeSeriesData,
    getGroupCData,
    getAnalysisData,
    getMasterAmbientdata,
    GetGroupCData,
    GetGroupvsSeries,
    GetGroupvsambiant,
    DataforSeriesExport,
    GetAggregateSeries,
    GetAggregateAmbiant,
    dumb
}