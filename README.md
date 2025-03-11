# CarTanga - Car Subscription Crowdfunding Platform

A platform for car subscription services with crowdfunding capabilities.

## Core Features

- **Subscription Tiers**: Basic, Standard, Premium, and Custom options
- **Crowdfunding**: Pool resources for vehicle acquisition
- **User Dashboard**: Manage subscriptions, payments, and bookings
- **Vehicle Management**: Browse cars, check availability, book vehicles
- **Community Features**: Forums, reviews, and sharing coordination

## Tech Stack

- **Frontend**: React with Redux Toolkit
- **Backend**: Node.js with Express
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel

## Setup Instructions

### Prerequisites

1. Node.js and npm installed
2. A Supabase account
3. A Vercel account

### Database Setup (Supabase)

1. Create a new Supabase project
2. Create the following tables:

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone TEXT,
  driving_license TEXT,
  active_subscription UUID REFERENCES subscriptions(id),
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Vehicles Table
```sql
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  category TEXT NOT NULL,
  images TEXT[],
  description TEXT NOT NULL,
  specifications JSONB,
  availability BOOLEAN DEFAULT true,
  location TEXT NOT NULL,
  maintenance_history JSONB[],
  current_subscription UUID REFERENCES subscriptions(id),
  campaign UUID REFERENCES campaigns(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Subscriptions Table
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  tier TEXT NOT NULL,
  vehicle_id UUID REFERENCES vehicles(id),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  access_days TEXT[],
  price DECIMAL NOT NULL,
  payment_status TEXT DEFAULT 'Pending',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Campaigns Table
```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  vehicle_type JSONB NOT NULL,
  target_amount DECIMAL NOT NULL,
  current_amount DECIMAL DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'Active',
  subscribers JSONB[],
  rewards JSONB[],
  vehicle_id UUID REFERENCES vehicles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. Copy your Supabase URL and API key for the next step

### Environment Setup

1. Create a `.env` file in the root directory with the following content:
```
NODE_ENV=development
PORT=5000
JWT_SECRET=your_jwt_secret
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

### Local Development

1. Install dependencies:
```bash
npm install
cd frontend
npm install
cd ..
```

2. Run the development server:
```bash
npm run dev
```

### Deploying to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set the following environment variables in Vercel:
   - `NODE_ENV=production`
   - `JWT_SECRET=your_jwt_secret`
   - `SUPABASE_URL=your_supabase_url`
   - `SUPABASE_KEY=your_supabase_key`

4. Deploy the application

## Project Structure

- **backend/**: Server-side code
  - **config/**: Configuration files
  - **controllers/**: Route controllers
  - **middleware/**: Express middleware
  - **routes/**: API routes
  - **index.js**: Main server file

- **frontend/**: Client-side code
  - **public/**: Static files
  - **src/**: React source code
    - **app/**: Redux store setup
    - **components/**: Reusable components
    - **features/**: Redux slices and services
    - **pages/**: Page components

## Demo Mode

When running locally without database credentials, the application will run in demo mode with mock data, allowing you to test functionality without setting up the database first.

## License

MIT
