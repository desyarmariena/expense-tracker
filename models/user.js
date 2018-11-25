'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,      
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [5,30],
        isEmail: {
          args: true,
          msg: 'Email format is incorrect'
        },
        isUnique(value) {
          return User.findOne({where: {email: value}})
          .then(data => {
            throw new Error(`Email has been used`);
          }) 
          .catch(err => {
            throw new Error(err);
          })
        }
      }
    }
    
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  
  // class method
  User.decryptPassword = function(password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }
  
  return User;
};