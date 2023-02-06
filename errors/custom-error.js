class CustomAPI_Error extends Error{
    constructor(statusCode,message){
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomError = (statusCode,msg)=>{
    return new CustomAPI_Error(statusCode,msg)
}

module.exports = {createCustomError,CustomAPI_Error}