const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {ApolloError} = require("apollo-server-errors")

const User = require('../../model/User.js');


function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User not found';
        throw new ApolloError('User not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong crendetials';
        throw new ApolloError('Wrong crendetials', { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      };
    },
    async register(
      _,
      {
        registerInput: { username, email, password, confirmPassword }
      }
    ) {
      const oldUser = await User.findOne({ email });
            
      if(oldUser) {
          throw new ApolloError("Bu kullanıcı email'i zaten daha önce kullanılmış " + email, "USER_ALREADY_EXIESTS", {
            errors: {
              username: 'This username is taken'
            }
          })
      }   

      const user = await User.findOne({ username });

      if (user) {
        throw new ApolloError('Username is taken', {
          errors: {
            username: 'This username is taken'
          }
        });
      }

      if (password !== confirmPassword) {
        throw new ApolloError('Parola eşleşmiyor lütfen parolanızı doğru girdiğinizden emin olun!', {
          errors: {
            username: 'Password false'
          }
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token
      };
    }
  }
};