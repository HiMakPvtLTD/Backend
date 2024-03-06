

const insertdata=(result)=>{
    // console.log(result.rows)
    var data=[]
    if(result.rows[0].ProjectType=="AODD"){
         data=[ {
            "Parameters":"Discharge Pressure",
            
                "Minimum":result.rows[0].mindischarge.toFixed(2),
                "Maximum":result.rows[0].maxdischarge.toFixed(2),
                "Mean":result.rows[0].meandischarge.toFixed(2),
                "Median":result.rows[0].mediandischarge.toFixed(2),
                "Mode":result.rows[0].modedischarge.toFixed(2),
                "Standard Deviation":result.rows[0].stddischarge.toFixed(2)
            },{
                "Parameters":"Discharge Pressure SP ",
              
                    "Minimum":result.rows[0].mindsp.toFixed(2),
                    "Maximum":result.rows[0].maxdsp.toFixed(2),
                    "Mean":result.rows[0].meandsp.toFixed(2),
                    "Median":result.rows[0].mediandsp.toFixed(2),
                    "Mode":result.rows[0].modedsp.toFixed(2),
                    "Standard Deviation":result.rows[0].stddsp.toFixed(2)
                },
            {
            "Parameters":"Discharge Flow",
         
                "Minimum":result.rows[0].mindischargef.toFixed(2),
                "Maximum":result.rows[0].maxdischargef.toFixed(2),
                "Mean":result.rows[0].meandischargef.toFixed(2),
                "Median":result.rows[0].mediandischargef.toFixed(2),
                "Mode":result.rows[0].modedischargef.toFixed(2),
                "Standard Deviation":result.rows[0].stddischargef.toFixed(2)
            },
            {
                "Parameters":"Air Valve Output ",
              
                    "Minimum":result.rows[0].miniap.toFixed(2),
                    "Maximum":result.rows[0].maxiap.toFixed(2),
                    "Mean":result.rows[0].meaniap.toFixed(2),
                    "Median":result.rows[0].medianiap.toFixed(2),
                    "Mode":result.rows[0].modeiap.toFixed(2),
                    "Standard Deviation":result.rows[0].stdiap.toFixed(2)
                },{
            "Parameters":"In Air Pressure ",
          
                "Minimum":result.rows[0].minair.toFixed(2),
                "Maximum":result.rows[0].maxair.toFixed(2),
                "Mean":result.rows[0].meanair.toFixed(2),
                "Median":result.rows[0].medianair.toFixed(2),
                "Mode":result.rows[0].modeair.toFixed(2),
                "Standard Deviation":result.rows[0].stdair.toFixed(2)
            },
            {
            "Parameters":"Suction Pressure ",
            
                "Minimum":result.rows[0].minspv.toFixed(2),
                "Maximum":result.rows[0].maxspv.toFixed(2),
                "Mean":result.rows[0].meanspv.toFixed(2),
                "Median":result.rows[0].medianspv.toFixed(2),
                "Mode":result.rows[0].modespv.toFixed(2),
                "Standard Deviation":result.rows[0].stdspv.toFixed(2)
            },{
            "Parameters":"Stroke Count Rate ",
           
                "Minimum":result.rows[0].minscr.toFixed(2),
                "Maximum":result.rows[0].maxscr.toFixed(2),
                "Mean":result.rows[0].meanscr.toFixed(2),
                "Median":result.rows[0].medianscr.toFixed(2),
                "Mode":result.rows[0].modescr.toFixed(2),
                "Standard Deviation":result.rows[0].stdscr.toFixed(2)
            
        }
        ]

    }
    else if(result.rows[0].ProjectType=="EODD"){
          data=[{
        "Parameters":"Motor KWh",
            "Minimum":result.rows[0].minmotor.toFixed(2),
            "Maximum":result.rows[0].maxmotor.toFixed(2),
            "Mean":result.rows[0].meanmotor.toFixed(2),
            "Median":result.rows[0].medianmotor.toFixed(2),
            "Mode":result.rows[0].modemotor.toFixed(2),
            "Standard Deviation":result.rows[0].stdmotor.toFixed(2)

        },{
        "Parameters":"PumpRPM",
        
            "Minimum":result.rows[0].minpump.toFixed(2),
            "Maximum":result.rows[0].maxpump.toFixed(2),
            "Mean":result.rows[0].meanpump.toFixed(2),
            "Median":result.rows[0].medianpump.toFixed(2),
            "Mode":result.rows[0].modepump.toFixed(2),
            "Standard Deviation":result.rows[0].stdpump.toFixed(2)
        },{
        "Parameters":"Motor AMP ",
    
            "Minimum":result.rows[0].minamp.toFixed(2),
            "Maximum":result.rows[0].maxamp.toFixed(2),
            "Mean":result.rows[0].meanamp.toFixed(2),
            "Median":result.rows[0].medianamp.toFixed(2),
            "Mode":result.rows[0].modeamp.toFixed(2),
            "Standard Deviation":result.rows[0].stdamp.toFixed(2)

        },{
        "Parameters":"Discharge Pressure",
        
            "Minimum":result.rows[0].mindischarge.toFixed(2),
            "Maximum":result.rows[0].maxdischarge.toFixed(2),
            "Mean":result.rows[0].meandischarge.toFixed(2),
            "Median":result.rows[0].mediandischarge.toFixed(2),
            "Mode":result.rows[0].modedischarge.toFixed(2),
            "Standard Deviation":result.rows[0].stddischarge.toFixed(2)
        },{
            "Parameters":"Discharge Pressure SP ",
          
                "Minimum":result.rows[0].mindsp.toFixed(2),
                "Maximum":result.rows[0].maxdsp.toFixed(2),
                "Mean":result.rows[0].meandsp.toFixed(2),
                "Median":result.rows[0].mediandsp.toFixed(2),
                "Mode":result.rows[0].modedsp.toFixed(2),
                "Standard Deviation":result.rows[0].stddsp.toFixed(2)

            },{
        "Parameters":"Discharge Flow",
     
            "Minimum":result.rows[0].mindischargef.toFixed(2),
            "Maximum":result.rows[0].maxdischargef.toFixed(2),
            "Mean":result.rows[0].meandischargef.toFixed(2),
            "Median":result.rows[0].mediandischargef.toFixed(2),
            "Mode":result.rows[0].modedischargef.toFixed(2),
            "Standard Deviation":result.rows[0].stddischargef.toFixed(2)
        },{
        "Parameters":"Suction Pressure ",
        
            "Minimum":result.rows[0].minspv.toFixed(2),
            "Maximum":result.rows[0].maxspv.toFixed(2),
            "Mean":result.rows[0].meanspv.toFixed(2),
            "Median":result.rows[0].medianspv.toFixed(2),
            "Mode":result.rows[0].modespv.toFixed(2),
            "Standard Deviation":result.rows[0].stdspv.toFixed(2)
        }
    ]

    }
    //console.log(data)
   
    return data

    
}
module.exports={
    insertdata
}