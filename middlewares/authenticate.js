const User = require('../models/Users')
const { verify } = require('jsonwebtoken')

module.exports = async (req, res, next)=>{
    try{
        const accessToken = req.params.token
        if(accessToken){
            const token = await verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            const user = await User.findById(token.id)

            req.user = user
            next()
        }
    } catch(err) {
        console.log(err)
        res.status(400).send('Error')
    }
}