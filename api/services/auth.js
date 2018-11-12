import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || 'secret'

const getToken = (payload) => jwt.sign(payload, secret, { expiresIn: 10800 });
const verifyToken = (token, cb) => jwt.verify(token, secret, {}, cb); // recreate this in other microservices

export default {
  getToken,
  verifyToken
}
