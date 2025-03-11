const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Check if Supabase credentials are properly set
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || supabaseUrl === 'https://example.supabase.co' || 
    !supabaseKey || supabaseKey === 'your_supabase_key_here') {
  console.log('\x1b[33m%s\x1b[0m', 
    '⚠️  Running in DEMO MODE with mock data (no database connection).\n' +
    '   To connect to a real database, please set up your Supabase credentials.'
  )
  // Use demo routes
  app.use('/api/users', require('./routes/demoRoutes/userRoutes'))
  app.use('/api/vehicles', require('./routes/demoRoutes/vehicleRoutes'))
  app.use('/api/subscriptions', require('./routes/demoRoutes/subscriptionRoutes'))
  app.use('/api/campaigns', require('./routes/demoRoutes/campaignRoutes'))
} else {
  // Use real database routes
  app.use('/api/users', require('./routes/userRoutes'))
  app.use('/api/vehicles', require('./routes/vehicleRoutes'))
  app.use('/api/subscriptions', require('./routes/subscriptionRoutes'))
  app.use('/api/campaigns', require('./routes/campaignRoutes'))
}

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' })
})

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('API is running... Go to /api/test to test the API.'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}. Visit http://localhost:${port}`))

// Export for Vercel serverless functions
module.exports = app
