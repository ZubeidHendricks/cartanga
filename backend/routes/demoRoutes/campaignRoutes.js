const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

// Demo campaigns database
const campaigns = [
  {
    id: '1',
    title: 'Community Electric Car',
    description: 'Help us bring a Tesla Model 3 to our community for shared use at an affordable price.',
    vehicleType: {
      make: 'Tesla',
      model: 'Model 3',
      year: 2023,
      category: 'Luxury'
    },
    targetAmount: 25000,
    currentAmount: 12500,
    startDate: '2025-01-01T00:00:00.000Z',
    endDate: '2025-06-30T00:00:00.000Z',
    status: 'Active',
    subscribers: [
      {
        user: '1',
        amount: 5000,
        date: '2025-01-15T00:00:00.000Z'
      },
      {
        user: '2',
        amount: 7500,
        date: '2025-02-01T00:00:00.000Z'
      }
    ],
    rewards: [
      {
        description: 'Priority booking for 6 months',
        minimumContribution: 1000
      },
      {
        description: '50% discount on first 3 months of subscription',
        minimumContribution: 5000
      }
    ],
    vehicle: null
  },
  {
    id: '2',
    title: 'Family SUV Program',
    description: 'Crowdfunding for a Toyota RAV4 for families in our community to share.',
    vehicleType: {
      make: 'Toyota',
      model: 'RAV4',
      year: 2023,
      category: 'Mid-Range'
    },
    targetAmount: 15000,
    currentAmount: 3000,
    startDate: '2025-02-01T00:00:00.000Z',
    endDate: '2025-08-31T00:00:00.000Z',
    status: 'Active',
    subscribers: [
      {
        user: '2',
        amount: 3000,
        date: '2025-02-15T00:00:00.000Z'
      }
    ],
    rewards: [
      {
        description: 'Weekend priority access for 3 months',
        minimumContribution: 500
      },
      {
        description: 'Free child car seat rental for 1 year',
        minimumContribution: 2000
      }
    ],
    vehicle: null
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

// @desc    Get all campaigns
// @route   GET /api/campaigns
// @access  Public
const getCampaigns = (req, res) => {
  res.status(200).json(campaigns)
}

// @desc    Get campaign by ID
// @route   GET /api/campaigns/:id
// @access  Public
const getCampaign = (req, res) => {
  const campaign = campaigns.find(c => c.id === req.params.id)

  if (!campaign) {
    res.status(404).json({ message: 'Campaign not found' })
    return
  }

  res.status(200).json(campaign)
}

// @desc    Contribute to campaign
// @route   POST /api/campaigns/:id/contribute
// @access  Private
const contributeToCampaign = (req, res) => {
  const { amount } = req.body

  if (!amount || amount <= 0) {
    res.status(400).json({ message: 'Please add a valid contribution amount' })
    return
  }

  const campaign = campaigns.find(c => c.id === req.params.id)

  if (!campaign) {
    res.status(404).json({ message: 'Campaign not found' })
    return
  }

  if (campaign.status !== 'Active') {
    res.status(400).json({ message: 'Campaign is not active' })
    return
  }

  // Add subscriber to campaign
  campaign.subscribers.push({
    user: req.user.id,
    amount: Number(amount),
    date: new Date().toISOString()
  })

  // Update current amount
  campaign.currentAmount += Number(amount)

  // Check if campaign target has been reached
  if (campaign.currentAmount >= campaign.targetAmount) {
    campaign.status = 'Completed'
  }

  res.status(200).json(campaign)
}

// Routes
router.get('/', getCampaigns)
router.get('/:id', getCampaign)
router.post('/:id/contribute', protect, contributeToCampaign)

// Admin routes
router.post('/', protect, admin, (req, res) => {
  const { 
    title,
    description,
    vehicleType,
    targetAmount,
    startDate,
    endDate,
    rewards
  } = req.body

  if (!title || !description || !vehicleType || !targetAmount || !startDate || !endDate) {
    res.status(400).json({ message: 'Please add all required fields' })
    return
  }

  const newCampaign = {
    id: Date.now().toString(),
    title,
    description,
    vehicleType,
    targetAmount: Number(targetAmount),
    currentAmount: 0,
    startDate,
    endDate,
    status: 'Active',
    subscribers: [],
    rewards: rewards || [],
    vehicle: null
  }

  campaigns.push(newCampaign)
  res.status(201).json(newCampaign)
})

router.put('/:id', protect, admin, (req, res) => {
  const campaign = campaigns.find(c => c.id === req.params.id)

  if (!campaign) {
    res.status(404).json({ message: 'Campaign not found' })
    return
  }

  const updatedCampaign = { ...campaign, ...req.body }
  const index = campaigns.findIndex(c => c.id === req.params.id)
  campaigns[index] = updatedCampaign

  res.status(200).json(updatedCampaign)
})

router.put('/:id/cancel', protect, admin, (req, res) => {
  const campaign = campaigns.find(c => c.id === req.params.id)

  if (!campaign) {
    res.status(404).json({ message: 'Campaign not found' })
    return
  }

  campaign.status = 'Cancelled'
  res.status(200).json({ success: true })
})

module.exports = router
