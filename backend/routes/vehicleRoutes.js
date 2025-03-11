const express = require('express')
const router = express.Router()
const {
  getVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  addMaintenanceRecord
} = require('../controllers/vehicleController')
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
  .get(getVehicles)
  .post(protect, admin, createVehicle)

router.route('/:id')
  .get(getVehicle)
  .put(protect, admin, updateVehicle)
  .delete(protect, admin, deleteVehicle)

router.post('/:id/maintenance', protect, admin, addMaintenanceRecord)

module.exports = router
