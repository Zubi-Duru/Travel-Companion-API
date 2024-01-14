const { tryCatch } = require("./utils")
const { User } = require("../models/userModel")

const checkLogin = async (req) => {
    if(!req.user){
        throw new Error()
    }
    const dbResponse=await User.findById(req.user)
    if(!dbResponse){
        throw {custom:{error:"user not found"}}
    }
}

exports.isLoggedIn = tryCatch(async (req, res, next) => {
    await checkLogin(req)
    next()
},"You must be logged in")