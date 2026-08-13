# Tesla Trade — Premium Marketplace + Fully Functional Admin

The most complete Tesla-branded marketplace clone with real admin power and live public data.

## What Makes This Version Special

- **Live Inventory** on the homepage (pulled from admin)
- **Live Testimonials** on the homepage (only approved ones)
- **Public Appointment Form** that saves directly into the admin
- **Hybrid storage**: works immediately with localStorage + ready for Supabase cloud
- Full CRUD admin for Appointments, Inventory, Testimonials, Settings
- Excellent performance (Next.js, optimized images, smooth UI)

## Quick Start

```bash
npm install
npm run dev
```

- Website: http://localhost:3000
- Admin:   http://localhost:3000/admin  (password: `tesla2026`)

## Going Live + Cloud Database

1. Read **DEPLOY.md** for Vercel deployment
2. Read **SUPABASE_SETUP.md** to connect a free cloud database so data works on every device

## Default Admin Password

`tesla2026`  
Change it with the environment variable `NEXT_PUBLIC_ADMIN_PASSWORD`.
