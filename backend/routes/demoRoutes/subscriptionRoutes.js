const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

// Demo subscriptions database
const subscriptions = [
  {
    id: '1',
    user: '2',
    tier: 'Basic',
    vehicle: '1',
    startDate: '2025-03-01T00:00:00.000Z',
    endDate: '2025-03-31T00:00:00.000Z',
    accessDays: ['Saturday', 'Sunday'],
    price: 99,
    paymentStatus: 'Paid',
    isActive: true,
    createdAt: '2025-02-28T00:00:00.000Z'
  },
  {
    id: '2',
    user: '1',
    tier: 'Premium',
    vehicle: '3',
    startDate: '2025-03-01T00:00:00.000Z',
    endDate: '2025-06-30T00:00:00.000Z',
    accessDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    price: 399,
    paymentStatus: 'Paid',
    isActive: true,
    createdAt: '2025-02-25T00:00:00.000Z'
  }
]

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

      // Set user info in request
      req.user = {
        id: decoded.id,
        isAdmin: decoded.id === '1' // Demo admin check
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

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' })
  }
}

// @desc    Get user subscriptions
// @route   GET /api/subscriptions
// @access  Private
const getMySubscriptions = (req, res) => {
  const userSubscriptions = subscriptions.filter(sub => sub.user === req.user.id)
  res.status(200).json(userSubscriptions)
}

// @desc    Get subscription by ID
// @route   GET /api/subscriptions/:id
// @access  Private
const getSubscription = (req, res) => {
  const subscription = subscriptions.find(sub => sub.id === req.params.id)

  if (!subscription) {
    res.status(404).json({ message: 'Subscription not found' })
    return
  }

  // Check if subscription belongs to logged in user or user is admin
  if (subscription.user !== req.user.id && !req.user.isAdmin) {
    res.status(401).json({ message: 'Not authorized' })
    return
  }

  res.status(200).json(subscription)
}

// @desc    Create subscription
// @route   POST /api/subscriptions
// @access  Private
const createSubscription = (req, res) => {
  const { 
    tier, 
    vehicleId, 
    startDate, 
    endDate, 
    accessDays, 
    price 
  } = req.body

  if (!tier || !vehicleId || !startDate || !endDate || !price) {
    res.status(400).json({ message: 'Please add all required fields' })
    return
  }

  const newSubscription = {
    id: Date.now().toString(),
    user: req.user.id,
    tier,
    vehicle: vehicleId,
    startDate,
    endDate,
    accessDays: accessDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    price,
    paymentStatus: 'Pending',
    isActive: true,
    createdAt: new Date().toISOString()
  }

  subscriptions.push(newSubscription)
  res.status(201).json(newSubscription)
}

// Routes
router.get('/', protect, getMySubscriptions)
router.get('/:id', protect, getSubscription)
router.post('/', protect, createSubscription)

// Admin route to get all subscriptions
router.get('/all', protect, admin, (req, res) => {
  res.status(200).json(subscriptions)
})

// Update payment status
router.put('/:id/payment', protect, (req, res) => {
  const { paymentStatus } = req.body
  const subscription = subscriptions.find(sub => sub.id === req.params.id)

  if (!subscription) {
    res.status(404).json({ message: 'Subscription not found' })
    return
  }

  if (subscription.user !== req.user.id && !req.user.isAdmin) {
    res.status(401).json({ message: 'Not authorized' })
    return
  }

  subscription.paymentStatus = paymentStatus
  res.status(200).json(subscription)
})

// Cancel subscription
router.put('/:id/cancel', protect, (req, res) => {
  const subscription = subscriptions.find(sub => sub.id === req.params.id)

  if (!subscription) {
    res.status(404).json({ message: 'Subscription not found' })
    return
  }

  if (subscription.user !== req.user.id && !req.user.isAdmin) {
    res.status(401).json({ message: 'Not authorized' })
    return
  }

  subscription.isActive = false
  res.status(200).json({ success: true })
})

module.exports = router
