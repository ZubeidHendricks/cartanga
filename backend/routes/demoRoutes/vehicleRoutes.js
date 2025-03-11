const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

// Demo vehicles database
const vehicles = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Corolla',
    year: 2023,
    category: 'Economy',
    images: [
      'https://example.com/corolla1.jpg',
      'https://example.com/corolla2.jpg'
    ],
    description: 'Reliable and fuel-efficient compact car, perfect for city driving.',
    specifications: {
      engine: '1.8L 4-cylinder',
      transmission: 'CVT',
      fuelType: 'Gasoline',
      mpg: '31 city / 40 highway'
    },
    availability: true,
    location: 'Downtown Hub',
    maintenanceHistory: []
  },
  {
    id: '2',
    make: 'Honda',
    model: 'Accord',
    year: 2023,
    category: 'Mid-Range',
    images: [
      'https://example.com/accord1.jpg',
      'https://example.com/accord2.jpg'
    ],
    description: 'Spacious and comfortable mid-size sedan with excellent safety features.',
    specifications: {
      engine: '1.5L Turbo 4-cylinder',
      transmission: 'CVT',
      fuelType: 'Gasoline',
      mpg: '30 city / 38 highway'
    },
    availability: true,
    location: 'Westside Garage',
    maintenanceHistory: []
  },
  {
    id: '3',
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    category: 'Luxury',
    images: [
      'https://example.com/tesla1.jpg',
      'https://example.com/tesla2.jpg'
    ],
    description: 'High-performance electric sedan with cutting-edge technology.',
    specifications: {
      engine: 'Electric Dual Motor',
      range: '358 miles',
      transmission: 'Single-speed',
      acceleration: '0-60 mph in 3.1 seconds'
    },
    availability: true,
    location: 'North Tech Center',
    maintenanceHistory: []
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

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Public
const getVehicles = (req, res) => {
  res.status(200).json(vehicles)
}

// @desc    Get single vehicle
// @route   GET /api/vehicles/:id
// @access  Public
const getVehicle = (req, res) => {
  const vehicle = vehicles.find(v => v.id === req.params.id)

  if (!vehicle) {
    res.status(404).json({ message: 'Vehicle not found' })
    return
  }

  res.status(200).json(vehicle)
}

// Routes
router.get('/', getVehicles)
router.get('/:id', getVehicle)

// Admin routes
router.post('/', protect, admin, (req, res) => {
  const { make, model, year, category, description, location } = req.body

  if (!make || !model || !year || !category || !description || !location) {
    res.status(400).json({ message: 'Please add all required fields' })
    return
  }

  const newVehicle = {
    id: Date.now().toString(),
    make,
    model,
    year,
    category,
    images: [],
    description,
    specifications: {},
    availability: true,
    location,
    maintenanceHistory: []
  }

  vehicles.push(newVehicle)
  res.status(201).json(newVehicle)
})

router.put('/:id', protect, admin, (req, res) => {
  const index = vehicles.findIndex(v => v.id === req.params.id)

  if (index === -1) {
    res.status(404).json({ message: 'Vehicle not found' })
    return
  }

  vehicles[index] = { ...vehicles[index], ...req.body }
  res.status(200).json(vehicles[index])
})

router.delete('/:id', protect, admin, (req, res) => {
  const index = vehicles.findIndex(v => v.id === req.params.id)

  if (index === -1) {
    res.status(404).json({ message: 'Vehicle not found' })
    return
  }

  vehicles.splice(index, 1)
  res.status(200).json({ id: req.params.id })
})

module.exports = router
