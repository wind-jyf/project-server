const jwt = require('jsonwebtoken');
const expiresIn = 60 * 60 * 24 * 30;    //时效 (秒)
const secretKey = '&*^R*G&(FRDwp4eg3'

export function generateToken(uid) {
    const token = jwt.sign({
        uid
    }, secretKey, {
        expiresIn
    })
    return token;
}

//解析jwt
export function verifyToken(token) {
    return jwt.verify(token, secretKey)
}

//计算剩余时间
export function tokenExp(token) {
    let verify = verifyToken(token);
    let time = parseInt((new Date().getTime()) / 1000);
    return verify.exp - time;
}