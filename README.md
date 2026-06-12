# Handoff: Paw Print Pedigrees

## Overview
Paw Print Pedigrees is a public, opt-in profile platform for breeders to publish their pets' **genetic test results** (powered by Orivet Genetic Pet Care) — turning a private DNA report into a clean, buyer-facing profile. Pet owners use it to find responsible breeders and view validated health/trait/ancestry results. It supports **two species — dogs and cats** — and the two are never mixed in the UI (species is always a deliberate toggle, with Dogs as the default).

This bundle is the full clickable prototype: a single-page app with 9 screens (landing, sign-up/login, onboarding, my-profile editor, breeder/breed search, breed page, public breeder profile, public animal page, about, and a Responsible Breeders program page).

## About the Design Files
The files in this bundle are **design references created in HTML/CSS + React (via in-browser Babel)** — a prototype showing the intended look, copy, and behavior. **They are not production code to ship directly.** The task is to **recreate these designs in the target codebase's environment** (e.g. a real React/Next.js app with a proper build step), using its established components, routing, and data layer. If no codebase exists yet, stand up a modern React app (Vite or Next.js) and implement there. All mock data (breeders, breeds, animals, results) should be replaced by real Orivet/PPP data sources.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy, and interactions are all intentional. Recreate the UI pixel-faithfully using the target codebase's libraries, then wire to real data. Exact values are in **Design Tokens** below and in `styles.css` (`:root`).

## How to run this prototype
Open `Paw Print Pedigrees.html` in a browser (it loads React + Babel from CDN and reads `screens.jsx`, `styles.css`, `tweaks-panel.jsx`). No build step. Because it uses in-browser Babel and a few `fetch`-style asset references, serve the folder over a local static server (e.g. `npx serve .`) rather than `file://` for assets to resolve.

- Deep-link to a screen with the hash: `…/Paw Print Pedigrees.html#screen=about` (values: `landing`, `signup`, `kennel`, `myprofile`, `search`, `breed`, `profile`, `animal`, `about`, `responsible`).
- Demo login: on the Sign-up screen, enter `ishini@pawprint.com.au` (any password) to enter the **new-user onboarding** flow; any other email logs in as a returning, onboarded user (Gayan) and goes to My Profile.

## Architecture of the prototype
- **`Paw Print Pedigrees.html`** — app shell. Defines screen routing via a `switch (tweaks.screen)` and persists `{screen, isLoggedIn, onboardingComplete}` through a tiny `useTweaks` store. Loads React 18.3.1 + Babel standalone (pinned), then `tweaks-panel.jsx` and `screens.jsx`.
- **`screens.jsx`** — every screen + shared components (`TopNav`, `Dropdown`, `Field`, `Icon` set, toasts) and all mock data (`BREEDS`, `CAT_BREEDS`, `BREED_SPECIES`, `SEARCH_BREEDERS`, `RESPONSIBLE_BREEDERS`, `BREED_IMAGES`, `PROFILE_ANIMALS`, `PUBLIC_ANIMALS`, `COUNTRIES`). Components are exported to `window` at the bottom.
- **`styles.css`** — all styling, design tokens in `:root`, and responsive rules (breakpoints at 900px, 820px for nav, 600px, 380px).
- **`tweaks-panel.jsx`** — a prototype-only "Tweaks" panel harness; **not part of the product** — omit from the real build.

## Screens / Views

### 1. Landing (`Landing`)
- **Purpose:** Entry point; routes breeders to sign-up and pet owners to search.
- **Layout:** Dark aurora hero → "Top Breeds" strip → dark "Proof, not promises" trust band → "Why this matters" 3-card grid → CTA band → FAQ → footer.
- **Key components:**
  - **Hero** (dark, `--invert-bg`): pulse eyebrow "Powered by Orivet genetic testing", H1 "Paw Print *Pedigrees*" (gradient-rose `em`), sub, and two **role cards** ("I'm a Breeder" primary / "I'm a Pet Owner").
  - **Top Breeds:** kicker + "Top Breeds" + a **Dogs/Cats segmented toggle** (default Dogs) + "View all". Row of 8 circular breed buttons (photo for dogs; tinted circle + cat icon placeholder for cats). Click → breed page; "View all" → search.
  - **Trust band** (dark): editorial split — left statement "Proof, not promises.", right 2×2 numbered cards (Validated Genetic Testing, Trusted Breeders, Transparent Practices, Health-Focused Standards).
  - **Why this matters:** 3 cards (Present your kennel like a pro / Publish ONLY What you Choose / Build Trust & Stand Out), each a short bullet list. Headings reserve 2 lines so bullet lists align across cards.

### 2. Sign-up / Login (`SignUp`)
- **Purpose:** Log in, or route new/existing Orivet users to register/opt-in.
- **Layout:** Two-column modal shell — left form (email/password, "Log in"), right info side with two "path" rows linking to `orivet.com/login` and `orivet.com/register/breeder`. A "Preview state" demo row triggers validation/success states and the two onboarding cases.
- **Behavior:** `ishini@pawprint.com.au` → success toast then route to onboarding (`kennel`) with `onboardingComplete=false`; any other email → returning user → My Profile.

### 3. Onboarding (`KennelProfile`) — titled "Setup your Profile"
- **Purpose:** New breeder builds their public profile across stepped tabs (Profile Details, Address Details, Social Details, Opt-in an Animal).
- **Layout:** Breadcrumb, head, **stepper**, then a 2-column `form-grid`. Each field uses the shared `Field` wrapper which shows a per-field **visibility eye** (`Icon.eye`/`eyeOff`) — open eye = public, crossed = private; mandatory-public fields show a locked eye.
- **Species → Breed flow (important):** the **Species** field is a **dropdown** (options Dogs/Canine, Cats/Feline; mandatory + always-public, locked eye). It comes **before** the breed field; the breed autocomplete only suggests breeds of the chosen species, and switching species clears mismatched breed chips. The breed field label updates ("Select Dog Breed" / "Select Cat Breed").
- Fields synced from Orivet (First/Last name, Registration #) are shown locked with a "from Orivet" note.

### 4. My Profile (`MyProfilePage`)
- **Purpose:** Returning breeder edits their published profile and manages animals.
- **Layout:** Profile header (avatar, name, actions) + a horizontally-scrollable sub-nav (Profile / Address / Socials / Animals). Animals tab: search + breed filter pills + animal cards with per-result visibility toggles.

### 5. Explore / Search (`SearchPage`)
- **Purpose:** Find breeders or breeds, filtered by species + country.
- **Layout:** White search-hero card containing: H2 "Search Breeders and Breeds", then a **single consolidated toolbar** — one row holding a **Dogs/Cats segmented toggle** (no "All"; default Dogs) and a **Search by Breed / Search by Breeder** segmented toggle — then **one unified rounded search bar** with a "Breeds/Breeders" mode dropdown, a country dropdown, a text input, and a round search button (all inline, divided by hairlines). Below: result sections (Popular Breeds / breed grid / breeder grid).
- **Behavior:** Species toggle filters everything; breed cards show a "DOG"/"CAT" tag; cat breeds (no photo) render a tinted placeholder with a cat icon. Breed card → breed page; breeder card → public profile.

### 6. Breed page (`BreedPage`)
- **Purpose:** Overview of one breed with breeders offering it.

### 7. Public Breeder Profile (`BreederProfile`)
- **Purpose:** The public, shareable breeder page.
- **Layout:** Compact header card — a slim 10px gradient accent band, then a body row: avatar, identity block (name + green **"Orivet Responsible Breeder"** pill + a **species pill** "Dog breeder"/"Cat breeder" + breed chips + location + membership on one meta row), and a right zone pairing the **Orivet Responsible Breeder badge image** with contact actions (website/instagram/facebook pills, Email, phone). Below: animal grid with per-animal results; a "View report" opens a report-document modal.
- **Accreditation:** Only breeders in `RESPONSIBLE_BREEDERS` show the green pill + the approval **seal** (on search cards) / **badge** (on profile). Others show only "DNA tested".

### 8. Public Animal page (`AnimalPage`)
- **Purpose:** A single animal's public genetic results (traits, disease screens, parentage), with a printable report document.

### 9. About (`AboutPage`)
- **Layout:** Dark aurora hero (matches Home/Responsible Breeders) — centered pulse eyebrow, H1 "Trust you can *verify*." (gradient-rose `em`), sub, and 3 translucent tags (Dogs/Cats/Orivet-tested). Then: a centered statement "It replaces *'trust me'* with *'here's the evidence.'*"; a **"You choose what's public"** two-card split (Make public — warm tint, open-eye bullets / Keep private — crossed-eye bullets); a 4-item "Why it matters" row (Verification, Interpretability, Transparency, Differentiation) with colored top rules; a dark "One link. One-click control." Orivet band with a "Manage my profile" button; and a two-path closing CTA (For breeders → sign-up / For pet owners → search).

### 10. Responsible Breeders program (`ResponsibleBreeders`)
- **Purpose:** Explains the Orivet Responsible Breeder Program and drives applications.
- **Layout:** Dark aurora hero with the generic **Responsible Breeder seal**; "gold standard" statement; a staggered, editorial **Key Components** grid (Health Screening, Transparency, Standardized Collection, Genetic Health Utilization) with gradient icon medallions, "PRINCIPLE 0X" labels and oversized ghost numerals; a "Wear it with pride" recognition card showing the badge with the ID masked as `####`; and a two-audience **Join the program** CTA ("Apply now" → `orivet.com/breeder/responsible-breeder-program/form`, "Search approved breeders" → `…/search`).

## Interactions & Behavior
- **Routing:** single-page; `onNav(screenId)` sets the current screen. Navigation also closes the mobile menu.
- **Top nav:** inline links on desktop; at **≤820px** collapses to a **hamburger** that opens a full-width dropdown (dark panel on dark pages, light on light); animates to an X; closes on navigation.
- **Toggles never mix species** — Dogs is always default; switching is explicit.
- **Per-field visibility** eyes throughout onboarding/profile (public vs private).
- **Toasts** for success/error/info (top, auto-dismiss).
- **Report modal** on profile/animal pages (printable document layout).
- **Animations:** aurora blobs float (`aurora-float-*`), hover lifts on cards (translateY + shadow), accent underlines scale-in on hover, badge float on the program page. All gated so reduced-motion / print show end states.

## State Management
- Prototype global state: `screen` (current view), `isLoggedIn`, `onboardingComplete`, plus `selectedAnimal` for the animal page. In a real app: route state in the router; auth/onboarding in your auth/session layer.
- Per-screen local state: search filters (`species` default `'Canine'`, `country`, `query`, `mode`), onboarding form fields + `profileSpecies` + selected `breeds` + per-field visibility booleans, profile editors, animal/result visibility toggles.
- **Data fetching (real app):** breeders, breeds, breed images, a breeder's animals, and per-animal genetic results all come from Orivet/PPP APIs. `speciesOf(breed)` derives species from a breed→species map.

## Design Tokens
From `styles.css` `:root` (light theme — "refined plum + dusty rose"):
- **Colors:**
  - `--bg: #f5edff` (page) · `--surface: #ffffff`
  - `--ink: #3a1f5e` · `--ink-2: #4f2d7a` · `--muted: #8676a3`
  - `--line: #e7d9f5` · `--line-strong: #3a1f5e`
  - `--invert-bg: #2c1648` (dark sections) · `--invert-fg: #f5edff`
  - `--accent: #c94a86` (rose) · `--accent-soft: #f6dceb`
  - `--positive: #d97a3f` (warm amber — used for "public"/"show" accents)
- **Radius:** `--radius: 14px` · `--radius-lg: 22px` · pills `999px`
- **Shadow:** `--shadow: 0 1px 0 rgba(20,22,26,.04), 0 8px 24px -12px rgba(20,22,26,.10)`
- **Type:** font family is "HeyWow" with a clean sans fallback (`@font-face` at top of `styles.css`). Headings 800 weight, tight letter-spacing (≈ -0.02 to -0.035em). Hero H1 up to 66–84px; section H2 ≈ clamp(28–44px); body 14–17px.
- **Breakpoints:** 900px (tablet), 820px (nav → hamburger), 600px (phone), 380px (small phone).

## Assets
In `assets/` (all original to this project):
- `orivet-logo.png` — wordmark used in the top nav (dark-filtered on light pages).
- `responsible-breeder-seal.png` — circular "Approved" seal (search cards + program hero).
- `responsible-breeder-badge.png` — the breeder's personal badge (shows on public profile).
- `responsible-breeder-badge-masked.png` — same badge with the ID number replaced by `####` (used only on the public Responsible Breeders info page for privacy).
- `assets/breeds/*.png` — dog breed photos. **Cat breeds have no photos** and intentionally fall back to a tinted circle + cat icon; supply real cat imagery when available.

## Files (in this bundle)
- `Paw Print Pedigrees.html` — app shell / routing
- `screens.jsx` — all screens, shared components, mock data
- `styles.css` — tokens + all styling + responsive rules
- `tweaks-panel.jsx` — prototype-only harness (exclude from product)
- `assets/` — logo, seal/badge images, breed photos

## Notes for implementation
- Drop the in-browser Babel + CDN React setup; use the target app's build/router/component system.
- Replace all mock data arrays with real data sources; keep the `speciesOf()` / species-toggle model so cats and dogs are never mixed.
- Keep the per-field visibility (eye/eye-off) model — it's central to the "publish only what you choose" value prop.
- The `Standalone` / `-print` HTML files in the main project are older self-contained exports; the canonical source is `Paw Print Pedigrees.html` + `screens.jsx` + `styles.css`.
