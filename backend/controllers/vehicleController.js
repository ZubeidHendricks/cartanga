const asyncHandler = require('express-async-handler')
const supabase = require('../config/supabase')

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Public
const getVehicles = asyncHandler(async (req, res) => {
  const { data: vehicles, error } = await supabase
    .from('vehicles')
    .select('*')

  if (error) {
    res.status(400)
    throw new Error('Error fetching vehicles')
  }

  res.status(200).json(vehicles)
})

// @desc    Get single vehicle
// @route   GET /api/vehicles/:id
// @access  Public
const getVehicle = asyncHandler(async (req, res) => {
  const { data: vehicle, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (error || !vehicle) {
    res.status(404)
    throw new Error('Vehicle not found')
  }

  res.status(200).json(vehicle)
})

// @desc    Create vehicle
// @route   POST /api/vehicles
// @access  Private/Admin
const createVehicle = asyncHandler(async (req, res) => {
  const { 
    make, 
    model, 
    year, 
    category, 
    images, 
    description, 
    specifications,
    location 
  } = req.body

  if (!make || !model || !year || !category || !description || !location) {
    res.status(400)
    throw new Error('Please add all required fields')
  }

  const { data: vehicle, error } = await supabase
    .from('vehicles')
    .insert([
      {
        make,
        model,
        year,
        category,
        images: images || [],
        description,
        specifications: specifications || {},
        location
      }
    ])
    .select()

  if (error) {
    res.status(400)
    throw new Error(error.message)
  }

  res.status(201).json(vehicle[0])
})

// @desc    Update vehicle
// @route   PUT /api/vehicles/:id
// @access  Private/Admin
const updateVehicle = asyncHandler(async (req, res) => {
  // Check if vehicle exists
  const { data: vehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (checkError || !vehicle) {
    res.status(404)
    throw new Error('Vehicle not found')
  }

  const { data: updatedVehicle, error } = await supabase
    .from('vehicles')
    .update(req.body)
    .eq('id', req.params.id)
    .select()

  if (error) {
    res.status(400)
    throw new Error(error.message)
  }

  res.status(200).json(updatedVehicle[0])
})

// @desc    Delete vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private/Admin
const deleteVehicle = asyncHandler(async (req, res) => {
  // Check if vehicle exists
  const { data: vehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (checkError || !vehicle) {
    res.status(404)
    throw new Error('Vehicle not found')
  }

  const { error } = await supabase
    .from('vehicles')
    .delete()
    .eq('id', req.params.id)

  if (error) {
    res.status(400)
    throw new Error(error.message)
  }

  res.status(200).json({ id: req.params.id })
})

// @desc    Add maintenance record
// @route   POST /api/vehicles/:id/maintenance
// @access  Private/Admin
const addMaintenanceRecord = asyncHandler(async (req, res) => {
  const { date, description, cost } = req.body

  if (!date || !description || !cost) {
    res.status(400)
    throw new Error('Please add all required fields')
  }

  // Get the vehicle
  const { data: vehicle, error: getError } = await supabase
    .from('vehicles')
    .select('maintenance_history')
    .eq('id', req.params.id)
    .single()

  if (getError || !vehicle) {
    res.status(404)
    throw new Error('Vehicle not found')
  }

  // Prepare the maintenance history array
  const maintenanceHistory = vehicle.maintenance_history || []
  maintenanceHistory.push({
    date,
    description,
    cost
  })

  // Update the vehicle
  const { data: updatedVehicle, error } = await supabase
    .from('vehicles')
    .update({ maintenance_history: maintenanceHistory })
    .eq('id', req.params.id)
    .select()

  if (error) {
    res.status(400)
    throw new Error(error.message)
  }

  res.status(200).json(updatedVehicle[0])
})

module.exports = {
  getVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  addMaintenanceRecord
}
