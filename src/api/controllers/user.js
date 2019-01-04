import authService from '../services/auth'
import User from '../models/User'
import db from '../db'
import bcrypt from 'bcryptjs'
let w = require('winston')

const login = async (req, res) => {
  w.log('info', 'ENTRY LOGIN ENDPOINT');
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
        w.log('info', 'EXIT LOGIN ENDPOINT');
        return res.status(400).json({ msg: 'Bad Request: User not found' });
      }

      if (bcrypt.compareSync(password, user.password)) {
        const token = authService.getToken({ id: user.id });
        w.log('info', 'EXIT LOGIN ENDPOINT');
        return res.status(200).json({ token, user });
      }
      w.log('info', 'EXIT LOGIN ENDPOINT');
      return res.status(401).json({ msg: 'Unauthorized' });
    } catch (err) {
      console.log(err);
      w.log('info', 'EXIT LOGIN ENDPOINT');
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }
  w.log('info', 'EXIT LOGIN ENDPOINT');
  return res.status(422).json({ msg: 'Bad Request: something is wrong with your submitted fields' });
}

const register = async (req, res) => {
  w.log('info', 'ENTRY REGISTER ENDPOINT');
  const body = req.body;

  if (!body.email || !body.password) {
    w.log('error', 'EXIT REGISTER ENDPOINT');
    return res.status(422).json({ msg: 'Missing email or password' });
  }

  try {
    const user = await User.create({
      email: body.email,
      password: body.password,
    });
    const token = authService.getToken({ id: user.id });

    w.log('info', 'EXIT LOGIN ENDPOINT');
    return res.status(200).json({ token, user });
  } catch (err) {

    w.log('error', 'EXIT LOGIN ENDPOINT');
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

const index = async (req, res) => {
  w.log('info', 'ENTRY INDEX USERS LIST ENDPOINT');
  try {
    const users = await User.findAll()
    if (users) {
      res.json(users)
      res.end()
      w.log('info', 'EXIT INDEX USERS ENDPOINT');
    }
  } catch (err) {
    w.log('error', 'EXIT INDEX USERS LIST ENDPOINT');
    res.status(500).send(err)
  }
}

export default {
  login,
  register,
  index
}
