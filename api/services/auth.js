import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || 'secret'

const getToken = (payload, test) => {
  if (!test) {
    return jwt.sign(payload, secret, { expiresIn: 10800 })
  } else {
    // TODO: perhaps find a pleasing solution for unit test purposes
    payload['iat'] = 1
    return jwt.sign(payload, 'secret')
  }
}

 // recreate this in other microservices using the same secret
const verifyToken = (token, cb, test) => {
  if (!test) {
    return jwt.verify(token, secret, {}, cb);
  } else {
    return jwt.verify(token, 'secret', {}, cb)
  }
}

export default {
  getToken,
  verifyToken
}
