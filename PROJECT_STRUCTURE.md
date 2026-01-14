# Locked Project Structure - Template Adapted Version

Base: Official Vercel + Supabase Starter (shadcn/ui, auth pages, protected route)

Additions planned for GoFeedMe:
- Custom Navbar, PoolCard, PaymentModal, RedemptionInput
- Routes: create/, pools/[id]/
- Server actions for pools/OTP

Current structure (as of Jan 14, 2026):

├── app
│   ├── auth/                  # Full auth pages (login, sign-up, etc.) – keep
│   ├── protected/             # Protected example – consider rename to dashboard/
│   ├── layout.tsx
│   ├── page.tsx               # Homepage – customize to GFM hero/grid
│   ├── globals.css
│   ├── favicon.ico
│   └── ... (opengraph, twitter images)
├── components
│   ├── ui/                    # shadcn/ui components – keep & use heavily
│   ├── hero.tsx               # Template – inspiration for homepage
│   ├── auth-button.tsx, etc.  # Template auth UI – keep useful
│   ├── Navbar.tsx             # Custom – to add
│   ├── PoolCard.tsx           # Custom – to add
│   └── ...                    # Add PaymentModal, RedemptionInput later
├── lib
│   ├── supabase/              # client.ts, server.ts – keep
│   └── utils.ts               # Keep & extend
├── types/                     # To add (index.ts for Pool types)
├── .env.local.example         # Supabase vars
├── tailwind.config.ts         # Customize next for green palette
├── next.config.ts
├── package.json
└── README.md                  # Update with project info

Rule: Update this file before structural changes.
Locked version: Template-adapted, January 14, 2026
