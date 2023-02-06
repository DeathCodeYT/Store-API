const { CustomAPI_Error } = require("../errors/custom-error")


const errorHandler = (err,req,res,next)=>{
    if(err instanceof CustomAPI_Error){
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({msg:"Something Went Wrong"})
}

module.exports = {errorHandlerMiddleware: errorHandler}
