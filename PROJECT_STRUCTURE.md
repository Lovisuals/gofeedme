
├── PROJECT_STRUCTURE.md
├── README.md
├── app
│   ├── actions
│   │   └── joinPool.ts                     # server action: join pool, increment slots_filled
│   ├── auth
│   │   ├── actions
│   │   │   └── auth.ts                     # loginAction, logoutAction
│   │   ├── confirm
│   │   ├── error
│   │   ├── forgot-password
│   │   ├── login
│   │   │   └── page.tsx                    # login page + form
│   │   ├── sign-up
│   │   ├── sign-up-success
│   │   ├── signup
│   │   └── update-password
│   ├── create
│   │   └── page.tsx                        # create new pool form
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx                          # root layout (includes Navbar)
│   ├── opengraph-image.png
│   ├── page.tsx                            # home page – lists active pools via getActivePools
│   ├── protected
│   │   ├── UserDetailsServer.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx                        # dashboard / user area
│   └── twitter-image.png
├── components
│   ├── JoinPoolModal.tsx                   # modal with Confirm & Pay Now button
│   ├── LogoutForm.tsx
│   ├── Navbar.tsx                          # server component, uses read-only Supabase client
│   ├── PoolCard.tsx                        # pool card with progress ring + Join button trigger
│   ├── auth-button.tsx
│   ├── deploy-button.tsx
│   ├── env-var-warning.tsx
│   ├── forgot-password-form.tsx
│   ├── hero.tsx
│   ├── login-form.tsx
│   ├── logout-button.tsx
│   ├── next-logo.tsx
│   ├── sign-up-form.tsx
│   ├── supabase-logo.tsx
│   ├── theme-switcher.tsx
│   ├── tutorial/                           # tutorial components (likely onboarding)
│   └── ui/                                 # shadcn/ui components (button, card, dialog, etc.)
├── components.json                         # shadcn/ui config
├── eslint.config.mjs
├── lib
│   ├── actions.ts                          # createPool, getActivePools
│   ├── supabase/
│   │   ├── client.ts                       # client-side Supabase
│   │   ├── proxy.ts
│   │   ├── server-only.ts
│   │   ├── server-readonly.ts              # read-only Supabase client (no cookie writes)
│   │   └── server.ts                       # full read/write Supabase server client
│   └── utils.ts
├── next
├── next-env.d.ts
├── next.config.js
├── next.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── proxy.ts
├── tailwind.config.ts
└── tsconfig.json

## 2. Core Files & Their Responsibilities (January 2026 state)

| Path                              | Type              | Purpose / Status                                                                 |
|-----------------------------------|-------------------|----------------------------------------------------------------------------------|
| app/page.tsx                      | Server Component  | Home page – fetches & renders active pools using getActivePools from lib/actions.ts |
| app/actions/joinPool.ts           | Server Action     | joinPoolAction(poolId) – increments slots_filled, records participant, prevents duplicates |
| components/JoinPoolModal.tsx      | Client Component  | Modal triggered by Join button – calls joinPoolAction, shows success/error/loading |
| components/PoolCard.tsx           | Client Component  | Renders one pool card – includes progress ring + JoinPoolModal trigger |
| components/Navbar.tsx             | Server Component  | Fixed navbar – shows Logout if signed in (uses createReadonlySupabaseClient) |
| lib/actions.ts                    | Server Actions    | createPool(formData) – inserts new pool, forces creator_id<br>getActivePools() – fetches active pools |
| lib/supabase/server-readonly.ts   | Helper            | Read-only Supabase client – used in Server Components to avoid cookie-write errors |
| lib/supabase/server.ts            | Helper            | Full read/write Supabase client – used in Server Actions |

## 3. Important Implementation Rules (must be preserved)

- All mutating actions (createPool, joinPoolAction) are 'use server' and use full createServerClient
- All read-only server components (Navbar, getActivePools in page) use createReadonlySupabaseClient (blocks cookie writes)
- creator_id and user_id are forced server-side from user.id – never from form data
- RLS on pools:
  - INSERT: authenticated + auth.uid() = creator_id
  - UPDATE: authenticated + auth.uid() = creator_id AND slots_filled = 0
  - SELECT: public + status = 'active'
- RLS on pool_participants:
  - INSERT: authenticated + auth.uid() = user_id
  - SELECT: public

## 4. Current Known Issues / Debt (January 17, 2026)

- Join button visible but "Confirm & Pay Now" fails with "Failed to record participation"
  → Likely RLS or foreign key issue on pool_participants insert
- Edit lock UI warning banner missing (RLS enforces it, but no user-facing message)
- Image upload in /create may still have onChange type issues
- Dashboard still uses template JSON – no real user pools fetch
- Urgency countdown (days left, red when low) not implemented
- No real payment/escrow – only counter increment

## 5. Next High-Priority Tasks (immediate focus)

1. Fix "Failed to record participation" (debug RLS / table / auth.uid())
2. Test edit lock (join pool → attempt edit → must fail)
3. Add urgency countdown (red "X days left", disable join if expired)
4. Polish image upload reliability
5. Replace dashboard template with real user pools

This file should be treated as the **single source of truth** for project structure and invariants.  
Any new contributor or AI should read this first before making changes.

Last verified tree date: January 17, 2026git stat
