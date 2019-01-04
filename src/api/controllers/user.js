import authService from '../services/auth'
import User from '../models/User'
import db from '../db'
import bcrypt from 'bcryptjs'
let w = require('winston')

const loginErrors = {
  400: 'Bad Request: User not found',
  401: 'Unauthorized',
  422: 'Bad Request: something is wrong with your submitted fields',
  500: 'Internal server error'
}

const emailErrors = {
  422: 'Missing email or password',
  500: 'Internal server error'
}

const login = async (req, res) => {
  w.log('info', 'LOGIN ENDPOINT', {markerName: 'ENTRY', emailTryingToLogIn: req.body.email});
  const email = req.body.email;
  const password = req.body.password;

  if (email && password) {
    try {
      const user = await User
        .findOne({
          where: {
            email,
          },
        });

      if (!user) {
        w.log('error', 'LOGIN ENDPOINT', {markerName: 'EXIT', error: loginErrors[400]});
        return res.status(400).json({ error: loginErrors[400]});
      }

      if (bcrypt.compareSync(password, user.password)) {
        const token = authService.getToken({ id: user.id });
        
        w.log('info', 'LOGIN ENDPOINT', {markerName: 'EXIT'});
        return res.status(200).json({ token, user });
      }

      w.log('error', 'LOGIN ENDPOINT', {markerName: 'EXIT', error: loginErrors[401]});
      return res.status(401).json({ msg: loginErrors[401] });
    } catch (err) {

      w.log('error', 'LOGIN ENDPOINT', {markerName: 'EXIT', error: loginErrors[500]});
      return res.status(500).json({ msg: loginErrors[500] });
    }
  }

  w.log('error', 'LOGIN ENDPOINT', {markerName: 'EXIT', error: loginErrors[422]});
  return res.status(422).json({ msg: loginErrors[422] });
}

const register = async (req, res) => {
  w.log('info', 'REGISTER ENDPOINT', {markerName: 'ENTRY'});
  const body = req.body;

  if (!body.email || !body.password) {
    w.log('error', 'REGISTER ENDPOINT', {markerName: 'EXIT', error: emailErrors[422]});
    return res.status(422).json({ msg: emailErrors[422] });
  }

  try {
    const user = await User.create({
      email: body.email,
      password: body.password,
    });
    const token = authService.getToken({ id: user.id });

    w.log('info', 'LOGIN ENDPOINT', {markerName: 'EXIT'});
    return res.status(200).json({ token, user });
  } catch (err) {

    w.log('error', 'LOGIN ENDPOINT', {markerName: 'EXIT', error: emailErrors[500]});
    return res.status(500).json({ msg: emailErrors[500] });
  }
};

const index = async (req, res) => {
  w.log('info', 'INDEX USERS LIST ENDPOINT', {markerName: 'ENTRY'});
  try {
    const users = await User.findAll()
    if (users) {
      res.json(users)
      res.end()
      w.log('info', 'INDEX USERS ENDPOINT', {markerName: 'EXIT'});
    }
  } catch (err) {
    w.log('error', 'INDEX USERS LIST ENDPOINT', {markerName: 'EXIT', error: 'Couldn\'t fetch users from database'});
    res.status(500).send(err)
  }
}

export default {
  login,
  register,
  index
}
