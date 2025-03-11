const express = require('express')
const router = express.Router()
const {
  getMySubscriptions,
  getSubscription,
  createSubscription,
  updatePaymentStatus,
  cancelSubscription,
  getAllSubscriptions
} = require('../controllers/subscriptionController')
const { protect } = require('../middleware/authMiddleware')

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

router.route('/')
  .get(protect, getMySubscriptions)
  .post(protect, createSubscription)

router.get('/all', protect, admin, getAllSubscriptions)

router.route('/:id')
  .get(protect, getSubscription)

router.put('/:id/payment', protect, updatePaymentStatus)
router.put('/:id/cancel', protect, cancelSubscription)

module.exports = router
