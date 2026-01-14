# Updated Locked Project Structure (Template-Based)

Original intent preserved, but adapted to Vercel/Supabase official template (shadcn/ui, auth pages, protected routes).

Current structure (from template + planned additions):

├── app
│   ├── auth/                  # Template auth pages (login, sign-up, etc.)
│   ├── protected/             # Template protected example → rename to dashboard later?
│   ├── layout.tsx
│   ├── page.tsx               # Homepage (customize to GFM hero)
│   ├── globals.css
│   ├── create/                # To add: pool wizard
│   │   └── page.tsx
│   └── pools/                 # To add: dynamic pool detail
│       └── [id]/
│           └── page.tsx
├── components
│   ├── ui/                    # shadcn/ui (button, card, etc.) – keep!
│   ├── Navbar.tsx             # Custom GFM navbar (to add)
│   ├── PoolCard.tsx           # Custom pool card (to add)
│   ├── PaymentModal.tsx       # Custom (to add)
│   ├── RedemptionInput.tsx    # Custom OTP (to add)
│   └── ...                    # Template components (hero, auth-button, etc.)
├── lib
│   ├── supabase/              # Template helpers (client.ts, server.ts)
│   ├── utils.ts
│   └── actions.ts             # Our server actions (to add/merge)
├── types/
│   └── index.ts               # To add for shared types
├── .env.local.example
├── tailwind.config.ts         # Customize for #02a95c green
├── next.config.ts
├── package.json
└── README.md                  # Template README – update with our project info

Rule: Before structural changes, update this file.
Locked version: January 14, 2026 (template-adapted)
