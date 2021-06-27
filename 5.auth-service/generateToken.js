const jwt = require('jsonwebtoken');

const generateToken = (res, id, userInfo) => {
    const { firstName } = userInfo
    const expiration = process.env.DB_ENV === 'testing' ? 100 : 604800000;
    const token = jwt.sign({ id, firstName }, process.env.JWT_SECRET, {
        expiresIn: process.env.DB_ENV === 'testing' ? '1d' : '7d'
    });
    return res.cookie('token', token).status(200)
        .json({ userInfo, token });
};
module.exports = generateToken