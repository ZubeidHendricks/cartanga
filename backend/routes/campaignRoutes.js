const express = require('express')
const router = express.Router()
const {
  getCampaigns,
  getCampaign,
  createCampaign,
  updateCampaign,
  contributeToCampaign,
  cancelCampaign
} = require('../controllers/campaignController')
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
  .get(getCampaigns)
  .post(protect, admin, createCampaign)

router.route('/:id')
  .get(getCampaign)
  .put(protect, admin, updateCampaign)

router.post('/:id/contribute', protect, contributeToCampaign)
router.put('/:id/cancel', protect, admin, cancelCampaign)

module.exports = router
