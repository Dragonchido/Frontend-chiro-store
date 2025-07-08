# ChiroStore - VirtuSIM Virtual Phone Numbers Frontend

A modern, responsive frontend application for VirtuSIM virtual phone number services built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎯 **Modern UI/UX**: Clean, professional interface with responsive design
- 📱 **Service Management**: Browse and order virtual phone numbers
- 💰 **Profit Tracking**: Real-time profit calculation with transparent markup
- 📊 **Order Management**: Track active orders and SMS messages
- 🔄 **Real-time Updates**: Live status updates for orders
- 🎨 **Beautiful Design**: Modern gradient backgrounds and smooth animations
- 📱 **Mobile Responsive**: Optimized for all device sizes
- ⚡ **Fast Performance**: Optimized with Next.js 15 and modern best practices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React hooks
- **API Integration**: Fetch API with custom service layer

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend-chiro-store
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and configure your API URL:
```env
NEXT_PUBLIC_API_URL=https://minatoz997-chirostore.hf.space
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dragonchido/Frontend-chiro-store&env=NEXT_PUBLIC_API_URL&envDescription=VirtuSIM%20Backend%20API%20URL&envLink=https://github.com/Dragonchido/Frontend-chiro-store%23environment-variables)

### Manual Deployment

1. **Fork this repository** to your GitHub account
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your forked repository
3. **Configure Environment Variables**:
   - Add `NEXT_PUBLIC_API_URL` with value: `https://minatoz997-chirostore.hf.space`
4. **Deploy!** - Vercel will automatically build and deploy your app

### Environment Variables for Production

```env
NEXT_PUBLIC_API_URL=https://minatoz997-chirostore.hf.space
```

## API Integration

The frontend integrates with the VirtuSIM backend API with the following endpoints:

- `GET /services` - Get available services with pricing
- `POST /order` - Create new order
- `GET /active-orders` - Get active orders
- `GET /status/{order_id}` - Check order status
- `PUT /status` - Update order status
- `GET /pricing/{price}` - Calculate selling price
- `GET /health` - Health check

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── services-grid.tsx
│   ├── order-form.tsx
│   └── orders-list.tsx
├── lib/               # Utility functions
│   ├── api.ts         # API service layer
│   └── utils.ts       # Helper functions
└── types/             # TypeScript type definitions
    └── index.ts
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://minatoz997-chirostore.hf.space` |

## License

MIT License - see LICENSE file for details.
