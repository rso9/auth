import Sequelize from 'sequelize'
import db from '../db'
import bcrypt from 'bcrypt'

const userTable = 'users'

const hooks = {
  async beforeCreate(user) {
    user.password = await bcrypt.hash(user.password, 10)
  },
}

const User = db.define(
  'User',
  {
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
  },
  { hooks, userTable }
);

User.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  delete values.password;
  return values;
}

export default User
