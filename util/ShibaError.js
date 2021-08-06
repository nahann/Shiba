 class ShibaError extends Error{
    constructor(message){
       super(message)
       this.name = "ShibaError"
    }
}
module.exports = ShibaError
