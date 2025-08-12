const jwt = require('jsonwebtoken');

module.exports = async (user) => {
    return await jwt.sign({id: user.id,person_type:user.person_type,role_id:user.role_id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
} 
