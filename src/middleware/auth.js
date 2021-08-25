const bcrypt = require('bcryptjs')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try{
        token = req.headers(Authorozation)
        const decryptedToken = await bcrypt.verify(token,'thisisnodecourse')
        const user = await User.findOne({_id: decryptedToken.id, 'tokens.token': token})

        if(!user){
            throw new Error('User not found')
        }
        req.user = user

    }catch(err){
        res.status(401).send('Please Authenticate')
    }
    next()
}



module.exports = auth