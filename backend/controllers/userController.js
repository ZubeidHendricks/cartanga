const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const supabase = require('../config/supabase')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, drivingLicense } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all required fields')
  }

  // Check if user exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('email')
    .eq('email', email)
    .single()

  if (existingUser) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user in Supabase Auth
  const { data: authUser, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
    res.status(400)
    throw new Error(authError.message)
  }

  // Create user in custom users table
  const { data: newUser, error } = await supabase
    .from('users')
    .insert([
      {
        auth_id: authUser.user.id,
        name,
        email,
        password: hashedPassword,
        phone,
        driving_license: drivingLicense,
        is_admin: false,
      },
    ])
    .select()

  if (error) {
    res.status(400)
    throw new Error(error.message)
  }

  if (newUser) {
    res.status(201).json({
      id: newUser[0].id,
      name: newUser[0].name,
      email: newUser[0].email,
      isAdmin: newUser[0].is_admin,
      token: generateToken(newUser[0].id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Sign in with Supabase Auth
  const { data: authUser, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError) {
    res.status(400)
    throw new Error('Invalid credentials')
  }

  // Get user from custom users table
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error || !user) {
    res.status(400)
    throw new Error('Invalid credentials')
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.is_admin,
    token: generateToken(user.id),
  })
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('id, name, email, phone, driving_license, is_admin, active_subscription')
    .eq('id', req.user.id)
    .single()
  
  if (error || !user) {
    res.status(404)
    throw new Error('User not found')
  }
  
  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    drivingLicense: user.driving_license,
    isAdmin: user.is_admin,
    activeSubscription: user.active_subscription,
  })
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
