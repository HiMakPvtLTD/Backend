var jwt=require("jsonwebtoken")

function verify(data){
    try{
        var data=jwt.verify(data,"IAMIRONMAN",{algorithms:"HS256"})
        //console.log(data)
        return data

    }
    catch (err){
        //console.log(err,data)
        return "Token either expired Or JWT ISSUE"
    }

}
module.exports={
    verify
}