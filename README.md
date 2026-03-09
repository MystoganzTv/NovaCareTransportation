# NovaCare Transportation

A responsive landing website for NovaCare Transportation (NEMT), built with React + Vite.

## Tech Stack

- React 18
- Vite 6
- Tailwind CSS
- Framer Motion
- Lucide Icons

## Main Features

- Responsive landing page (desktop + mobile)
- Functional hero CTAs
- Services, benefits, testimonials, and partner sections
- FAQ with interactive expand/collapse behavior
- Contact form with:
  - Ride request flow
  - Date picker (past dates blocked)
  - Email delivery via FormSubmit
  - Anti-spam protection (honeypot + minimum-fill-time + submission rate limiting)
  - Auto-response confirmation emails with request ID
- Admin dashboard protected by credential login (`/admin/login`)
- Google Analytics page tracking and Search Console verification support
- Footer with active legal links:
  - Privacy Policy
  - Terms of Service
  - Accessibility

## Project Structure (Summary)

```txt
src/
  components/landing/
    Navbar.jsx
    HeroSection.jsx
    AboutSection.jsx
    ServicesSection.jsx
    WhyChooseSection.jsx
    TestimonialsSection.jsx
    ClinicsSection.jsx
    ContactSection.jsx
    Footer.jsx
  pages/
    Home.jsx
public/
  privacy-policy.html
  terms-of-service.html
  accessibility.html
  banner/
  team/
```

## Useful Scripts

```bash
npm run dev        # development server
npm run build      # production build
npm run preview    # preview production build
npm run lint       # lint checks
npm run lint:fix   # auto-fix lint issues
npm run typecheck  # type check (project config)
```

## Contact Form (Important)

The contact form uses FormSubmit:

- Current endpoint: `https://formsubmit.co/ajax/enrique.padron853@gmail.com`
- First-time use requires email confirmation in FormSubmit before messages are delivered.

Related file:

- `src/components/landing/ContactSection.jsx`

## Environment Variables

Create a local `.env` using `.env.example`:

```bash
cp .env.example .env
```

Then configure:

- `VITE_GA_MEASUREMENT_ID`: Google Analytics 4 measurement ID
- `VITE_GOOGLE_SITE_VERIFICATION`: Search Console verification token
- `VITE_ADMIN_EMAIL`: admin login email for `/admin`
- `VITE_ADMIN_PASSWORD`: admin login password for `/admin`

## Legal Note

Included legal pages (`privacy-policy.html`, `terms-of-service.html`, `accessibility.html`) are practical business templates.
For full legal compliance in your state/industry, review them with a qualified attorney.
