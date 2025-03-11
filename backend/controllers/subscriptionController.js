const asyncHandler = require('express-async-handler')
const supabase = require('../config/supabase')

// @desc    Get user subscriptions
// @route   GET /api/subscriptions
// @access  Private
const getMySubscriptions = asyncHandler(async (req, res) => {
  const { data: subscriptions, error } = await supabase
    .from('subscriptions')
    .select('*, vehicle(*)')
    .eq('user_id', req.user.id)
  
  if (error) {
    res.status(400)
    throw new Error(error.message)
  }
  
  res.status(200).json(subscriptions)
})

// @desc    Get subscription by ID
// @route   GET /api/subscriptions/:id
// @access  Private
const getSubscription = asyncHandler(async (req, res) => {
  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, vehicle(*), user:user_id(*)')
    .eq('id', req.params.id)
    .single()

  if (error || !subscription) {
    res.status(404)
    throw new Error('Subscription not found')
  }

  // Check if subscription belongs to logged in user or user is admin
  if (subscription.user_id !== req.user.id && !req.user.isAdmin) {
    res.status(401)
    throw new Error('Not authorized')
  }

  res.status(200).json(subscription)
})

// @desc    Create subscription
// @route   POST /api/subscriptions
// @access  Private
const createSubscription = asyncHandler(async (req, res) => {
  const { 
    tier, 
    vehicleId, 
    startDate, 
    endDate, 
    accessDays, 
    price 
  } = req.body

  if (!tier || !vehicleId || !startDate || !endDate || !price) {
    res.status(400)
    throw new Error('Please add all required fields')
  }

  // Check if vehicle exists
  const { data: vehicle, error: vehicleError } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', vehicleId)
    .single()
  
  if (vehicleError || !vehicle) {
    res.status(404)
    throw new Error('Vehicle not found')
  }

  // Check if vehicle is available
  if (!vehicle.availability) {
    res.status(400)
    throw new Error('Vehicle is not available')
  }

  // Create subscription
  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .insert([
      {
        user_id: req.user.id,
        tier,
        vehicle_id: vehicleId,
        start_date: startDate,
        end_date: endDate,
        access_days: accessDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        price,
        payment_status: 'Pending',
        is_active: true
      }
    ])
    .select()

  if (error) {
    res.status(400)
    throw new Error(error.message)
  }

  if (subscription) {
    // Update user active subscription
    const { error: userError } = await supabase
      .from('users')
      .update({ active_subscription: subscription[0].id })
      .eq('id', req.user.id)

    if (userError) {
      console.error('Error updating user:', userError)
    }

    // Update vehicle availability and current subscription
    const { error: vehicleUpdateError } = await supabase
      .from('vehicles')
      .update({
        availability: false,
        current_subscription: subscription[0].id
      })
      .eq('id', vehicleId)

    if (vehicleUpdateError) {
      console.error('Error updating vehicle:', vehicleUpdateError)
    }

    res.status(201).json(subscription[0])
  } else {
    res.status(400)
    throw new Error('Invalid subscription data')
  }
})

// @desc    Update subscription payment status
// @route   PUT /api/subscriptions/:id/payment
// @access  Private
const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { paymentStatus } = req.body

  if (!paymentStatus) {
    res.status(400)
    throw new Error('Please provide payment status')
  }

  // Check if subscription exists
  const { data: subscription, error: getError } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (getError || !subscription) {
    res.status(404)
    throw new Error('Subscription not found')
  }

  // Check if subscription belongs to logged in user or user is admin
  if (subscription.user_id !== req.user.id && !req.user.isAdmin) {
    res.status(401)
    throw new Error('Not authorized')
  }

  // Update subscription
  const { data: updatedSubscription, error } = await supabase
    .from('subscriptions')
    .update({ payment_status: paymentStatus })
    .eq('id', req.params.id)
    .select()

  if (error) {
    res.status(400)
    throw new Error(error.message)
  }

  res.status(200).json(updatedSubscription[0])
})

// @desc    Cancel subscription
// @route   PUT /api/subscriptions/:id/cancel
// @access  Private
const cancelSubscription = asyncHandler(async (req, res) => {
  // Check if subscription exists
  const { data: subscription, error: getError } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (getError || !subscription) {
    res.status(404)
    throw new Error('Subscription not found')
  }

  // Check if subscription belongs to logged in user or user is admin
  if (subscription.user_id !== req.user.id && !req.user.isAdmin) {
    res.status(401)
    throw new Error('Not authorized')
  }

  // Update subscription
  const { error: updateError } = await supabase
    .from('subscriptions')
    .update({ is_active: false })
    .eq('id', req.params.id)

  if (updateError) {
    res.status(400)
    throw new Error(updateError.message)
  }

  // Update vehicle availability
  const { error: vehicleError } = await supabase
    .from('vehicles')
    .update({
      availability: true,
      current_subscription: null
    })
    .eq('id', subscription.vehicle_id)

  if (vehicleError) {
    console.error('Error updating vehicle:', vehicleError)
  }

  // Update user active subscription if this was the active one
  const { data: user, error: userGetError } = await supabase
    .from('users')
    .select('active_subscription')
    .eq('id', req.user.id)
    .single()

  if (!userGetError && user && user.active_subscription === subscription.id) {
    const { error: userUpdateError } = await supabase
      .from('users')
      .update({ active_subscription: null })
      .eq('id', req.user.id)

    if (userUpdateError) {
      console.error('Error updating user:', userUpdateError)
    }
  }

  res.status(200).json({ success: true })
})

// @desc    Get all subscriptions (admin)
// @route   GET /api/subscriptions/all
// @access  Private/Admin
const getAllSubscriptions = asyncHandler(async (req, res) => {
  const { data: subscriptions, error } = await supabase
    .from('subscriptions')
    .select('*, vehicle:vehicle_id(*), user:user_id(*)')
  
  if (error) {
    res.status(400)
    throw new Error(error.message)
  }
  
  res.status(200).json(subscriptions)
})

module.exports = {
  getMySubscriptions,
  getSubscription,
  createSubscription,
  updatePaymentStatus,
  cancelSubscription,
  getAllSubscriptions
}
