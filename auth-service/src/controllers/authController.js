const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Handle errors for Mongoose operations
const handleErrors = (err) => {
  let errors = { username: '', email: '', password: '' };


  // Incorrect email
  if (err.message === 'Incorrect email') {
    errors.email = 'That email is not registered';
  }

  // Incorrect password
  if (err.message === 'Incorrect password') {
    errors.password = 'That password is incorrect';
  }

  //duiplicate email error
  if (err.code === 11000) {
    errors.email = 'That email is already registered';
  }

  // Validation errors
  if (err.message.toLowerCase().includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    })
  }

  return errors;
}

// Create a JWT token
const createToken = (id, username, email) => {
  return jwt.sign({ id, username, email }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
}


module.exports.signup_post = async (req, res) => {
  const {email, username, password} = req.body;
  try {
    const user = await User.create({ username, email, password });
    const token = createToken(user._id,  username, email);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(201).json({user: user._id});
  }
  catch (error) { 
  const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id, user.username, user.email);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); 
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}

module.exports.logout_get = (req, res) => {
  try {
    if (req.cookies.jwt){
      res.cookie('jwt', '', { maxAge: 1 });
      return res.status(200).json({ message: 'User logged out successfully' });
    }
    return res.status(400).json({ error: 'No user is logged in' });
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  
}
