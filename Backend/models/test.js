const db=require('../database/db')


const getTestCdata=async()=>{
    var array=[]
    const query=`select distinct(need) from groupcTest3 order by 1`

    const result=await db.query(query)
    console.log(result.rows)
    const arr=[]
    result.rows.map((item)=>{
       
        arr.push(item.need)
        console.log(item.need.slice(1,3))
        array.push(`${item.need} text`)
    })
    const query2=`
        select * from crosstab('select "DateTime","ProjectId","TestRunNo","UDefs","Value" from groupcTest3 order by 1,3   ',
    '	select distinct("UDefs") from groupcTest3 order by 1  ') as ct("DateTime" text,"ProjectId" text,"TestRunNo" text,${array.join(",")})


      `
    console.log(query2)
    const result1=await db.query(query2)


    const stri=JSON.stringify(result1.rows)
    return result1.rows
}
const getTestCData3=async(start,end)=>{
    try{
        const query=`select "DateTime",CONCAT("UDef"||'-'||"Index"),"Value" from "GroupCData" where "DateTime" between '${start}' and '${end}'`
        const result=await db.query(query)
        return result.rows
        


    }catch(err){
        return err
    }
}

// const HistogramData=async(data,projectid,testno,start,end)=>{
//     try{

//         const query=`select ${data.join()} from "TimeseriesData"`

//     }
//     catch(err){
//         return err
//     }
// }

const getTestCdata2=async(start,end)=>{
    var array=[]
    //const query=`select distinct "UDefs" as need,need as beed from groupcTest3 where "DateTime" between '${start}' and '${end}' order by 1   `
    const query=`select Distinct("Index"||'-'||"UDef") as data from "GroupCData" where "DateTime" between '${start}' and '${end}' `
    const result=await db.query(query)
    const testingarray=[]
    console.log(result.rows)
    const arr=[]
    result.rows.map((item)=>{
       
        arr.push(item.need)
       // console.log(item.need.slice(1,3))
        // testingarray.push({
        //     sereisname:item.beed,
        //     data:[]
        // })
        array.push(`Max(case when "Index"||'-'||"UDef"='${item.data}' then "Value" End) as "${item.data}"`)
    })
    // const query2=`
    //     select * from crosstab('select "DateTime","ProjectId","TestRunNo","UDefs","Value" from groupcTest3 order by 1,3   ',
    // '	select distinct("UDefs") from groupcTest3 order by 1  ') as ct("DateTime" text,"ProjectId" text,"TestRunNo" text,${array.join(",")})
    //   `

    const query2=`select "DateTime",${array.join(",")} from "GroupCData" where "DateTime" between '${start}' and '${end}' group by "DateTime" order by "DateTime" desc`
    console.log(query2)
    const result1=await db.query(query2)
    console.log(result1.rows[0].DateTime)


    const stri=JSON.stringify(result1.rows)
    // result1.rows.map((item,index)=>{
    //     Object.keys(item).map((it)=>{
    //         const exist=testingarray.find((key)=>key.sereisname==it)
    //         console.log(exist)
            
            
            

    //     })
    // })
  //  console.log(testingarray)

    return result1.rows
}

module.exports={
    getTestCdata,
    getTestCdata2,
    getTestCData3
}