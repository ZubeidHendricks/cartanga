const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

// Demo users database
const users = [
  {
    id: '1',
    name: 'Demo Admin',
    email: 'admin@example.com',
    password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm', // "password"
    phone: '555-123-4567',
    isAdmin: true
  },
  {
    id: '2',
    name: 'Demo User',
    email: 'user@example.com',
    password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm', // "password"
    phone: '555-987-6543',
    isAdmin: false
  }
]

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all required fields')
  }

  // Check if user exists
  const userExists = users.find(user => user.email === email)

  if (userExists) {
    res.status(400).json({ message: 'User already exists' })
    return
  }

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password, // In a real app, we would hash this
    isAdmin: false
  }

  users.push(newUser)

  res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    token: generateToken(newUser.id)
  })
}

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = (req, res) => {
  const { email, password } = req.body

  // Find user
  const user = users.find(user => user.email === email)

  // In a real app, we would verify the password hash
  if (user) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id)
    })
  } else {
    res.status(400).json({ message: 'Invalid credentials' })
  }
}

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = (req, res) => {
  const user = users.find(user => user.id === req.user.id)
  
  if (!user) {
    res.status(404).json({ message: 'User not found' })
    return
  }
  
  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    isAdmin: user.isAdmin
  })
}

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'abc123', {
    expiresIn: '30d',
  })
}

// Demo middleware
const protect = (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'abc123')

      // Get user from the token
      const user = users.find(user => user.id === decoded.id)
      if (!user) {
        res.status(401).json({ message: 'Not authorized' })
        return
      }

      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }

      next()
    } catch (error) {
      console.log(error)
      res.status(401).json({ message: 'Not authorized' })
      return
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' })
    return
  }
}

// Routes
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router
