import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import vehicleReducer from '../features/vehicles/vehicleSlice'
import subscriptionReducer from '../features/subscriptions/subscriptionSlice'
import campaignReducer from '../features/campaigns/campaignSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicles: vehicleReducer,
    subscriptions: subscriptionReducer,
    campaigns: campaignReducer,
  },
})
