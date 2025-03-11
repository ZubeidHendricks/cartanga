const asyncHandler = require('express-async-handler')
const supabase = require('../config/supabase')

// @desc    Get all campaigns
// @route   GET /api/campaigns
// @access  Public
const getCampaigns = asyncHandler(async (req, res) => {
  const { data: campaigns, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('status', 'Active')

  if (error) {
    res.status(400)
    throw new Error(error.message)
  }

  res.status(200).json(campaigns)
})

// @desc    Get campaign by ID
// @route   GET /api/campaigns/:id
// @access  Public
const getCampaign = asyncHandler(async (req, res) => {
  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select('*, vehicle(*)')
    .eq('id', req.params.id)
    .single()

  if (error || !campaign) {
    res.status(404)
    throw new Error('Campaign not found')
  }

  res.status(200).json(campaign)
})

// @desc    Create campaign
// @route   POST /api/campaigns
// @access  Private/Admin
const createCampaign = asyncHandler(async (req, res) => {
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
    res.status(400)
    throw new Error('Please add all required fields')
  }

  const { data: campaign, error } = await supabase
    .from('campaigns')
    .insert([
      {
        title,
        description,
        vehicle_type: vehicleType,
        target_amount: targetAmount,
        start_date: startDate,
        end_date: endDate,
        rewards: rewards || [],
        subscribers: [],
        current_amount: 0,
        status: 'Active'
      }
    ])
    .select()

  if (error) {
    res.status(400)
    throw new Error(error.message)
  }

  res.status(201).json(campaign[0])
})

// @desc    Update campaign
// @route   PUT /api/campaigns/:id
// @access  Private/Admin
const updateCampaign = asyncHandler(async (req, res) => {
  // Check if campaign exists
  const { data: campaign, error: getError } = await supabase
    .from('campaigns')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (getError || !campaign) {
    res.status(404)
    throw new Error('Campaign not found')
  }

  const { data: updatedCampaign, error } = await supabase
    .from('campaigns')
    .update(req.body)
    .eq('id', req.params.id)
    .select()

  if (error) {
    res.status(400)
    throw new Error(error.message)
  }

  res.status(200).json(updatedCampaign[0])
})

// @desc    Contribute to campaign
// @route   POST /api/campaigns/:id/contribute
// @access  Private
const contributeToCampaign = asyncHandler(async (req, res) => {
  const { amount } = req.body

  if (!amount || amount <= 0) {
    res.status(400)
    throw new Error('Please add a valid contribution amount')
  }

  // Check if campaign exists
  const { data: campaign, error: getError } = await supabase
    .from('campaigns')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (getError || !campaign) {
    res.status(404)
    throw new Error('Campaign not found')
  }

  if (campaign.status !== 'Active') {
    res.status(400)
    throw new Error('Campaign is not active')
  }

  // Add subscriber to campaign
  const subscribers = campaign.subscribers || []
  subscribers.push({
    user: req.user.id,
    amount: parseFloat(amount),
    date: new Date().toISOString()
  })

  // Update current amount
  const newAmount = campaign.current_amount + parseFloat(amount)
  let newStatus = campaign.status

  // Check if campaign target has been reached
  if (newAmount >= campaign.target_amount) {
    newStatus = 'Completed'
  }

  // Update campaign
  const { data: updatedCampaign, error } = await supabase
    .from('campaigns')
    .update({
      subscribers: subscribers,
      current_amount: newAmount,
      status: newStatus
    })
    .eq('id', req.params.id)
    .select()

  if (error) {
    res.status(400)
    throw new Error(error.message)
  }

  // If campaign is completed, create a vehicle
  if (newStatus === 'Completed' && !campaign.vehicle_id) {
    const vehicleType = campaign.vehicle_type
    
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert([
        {
          make: vehicleType.make,
          model: vehicleType.model,
          year: vehicleType.year,
          category: vehicleType.category,
          description: `Vehicle created from campaign: ${campaign.title}`,
          location: 'Main Location',
          campaign_id: campaign.id,
          availability: true
        }
      ])
      .select()

    if (vehicleError) {
      console.error('Error creating vehicle:', vehicleError)
    } else if (vehicle) {
      // Link vehicle to campaign
      const { error: campaignUpdateError } = await supabase
        .from('campaigns')
        .update({ vehicle_id: vehicle[0].id })
        .eq('id', campaign.id)

      if (campaignUpdateError) {
        console.error('Error updating campaign with vehicle:', campaignUpdateError)
      }
    }
  }

  res.status(200).json(updatedCampaign[0])
})

// @desc    Cancel campaign
// @route   PUT /api/campaigns/:id/cancel
// @access  Private/Admin
const cancelCampaign = asyncHandler(async (req, res) => {
  // Check if campaign exists
  const { data: campaign, error: getError } = await supabase
    .from('campaigns')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (getError || !campaign) {
    res.status(404)
    throw new Error('Campaign not found')
  }

  const { error } = await supabase
    .from('campaigns')
    .update({ status: 'Cancelled' })
    .eq('id', req.params.id)

  if (error) {
    res.status(400)
    throw new Error(error.message)
  }

  res.status(200).json({ success: true })
})

module.exports = {
  getCampaigns,
  getCampaign,
  createCampaign,
  updateCampaign,
  contributeToCampaign,
  cancelCampaign
}
