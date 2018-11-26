import authService from '../services/auth'
import User from '../models/User'
import db from '../db'
import bcrypt from 'bcryptjs'

const login = async (req, res) => {
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
        return res.status(400).json({ msg: 'Bad Request: User not found' });
      }

      if (bcrypt.compareSync(password, user.password)) {
        const token = authService.getToken({ id: user.id });

        return res.status(200).json({ token, user });
      }

      return res.status(401).json({ msg: 'Unauthorized' });
    } catch (err) {
      
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }

  return res.status(422).json({ msg: 'Bad Request: something is wrong with your submitted fields' });
}

const register = async (req, res) => {
  const body = req.body;

  if (!body.email || !body.password) {
    return res.status(422).json({ msg: 'Missing email or password' });
  }

  try {
    const user = await User.create({
      email: body.email,
      password: body.password,
    });
    const token = authService.getToken({ id: user.id });

    return res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

const index = async (req, res) => {
  try {
    const users = await User.findAll()
    if (users) {
      res.json(users)
      res.end()
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

export default {
  login,
  register,
  index
}
