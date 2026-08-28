# Mr.Fixers India Pvt Ltd - Official Website

A modern, high-performance, mobile-first website for **Mr.Fixers India Pvt Ltd**, an integrated facilities management and technical services company providing AC servicing, electrical, plumbing, painting, commercial facility AMCs, and industrial utilities across Trichy, Tamil Nadu, and India.

Inspired by **Urban Company**'s clean, intuitive customer experience, with light/dark theme toggling, upfront rate cards, and direct email booking routing to `saravanan.vp@mrfixers.in`.

---

## 🌟 Key Features

1. **Mobile-First & Fully Responsive Layout**:
   - Seamlessly optimized for all device viewports: Smartphones (iPhone, Android), Tablets (iPad), Laptops, and 4K Displays.
   - Mobile navigation drawer and sticky quick-action bar (Call & WhatsApp).

2. **Light / Dark Mode Switcher**:
   - One-click toggle in the top-right header with zero-flicker instant page load via `localStorage` state caching.

3. **Urban Company-Inspired UX**:
   - Live service search & category quick-chips.
   - Interactive visit cost calculator & rate card estimator.
   - Trust badges, 5-step operational workflow, and customer testimonials.

4. **Transparent Rate Card & Official Policies**:
   - AC Tech Service (Visit): **₹799**
   - Electrician Inspection: **₹499**
   - Plumber Inspection: **₹499**
   - Painting & Civil Works: **FREE Visit & Quotation**
   - Clear policy: *Visit charges are discounted if fixing work is awarded to MrFixer*.

5. **20+ Years UAE & Dubai Leadership Heritage**:
   - Highlights the company's Middle East facilities management experience handling iconic high-rises and commercial developments.
   - 4-phase growth roadmap: Trichy (2026) $\rightarrow$ Tamil Nadu $\rightarrow$ South India $\rightarrow$ Pan India.

6. **Dedicated Enquiry & Booking System**:
   - Dispatches customer booking submissions directly to **`saravanan.vp@mrfixers.in`** via secure AJAX endpoint.
   - Provides a booking confirmation reference ID (`MFX-2026-XXXX`).
   - One-tap WhatsApp instant booking link pre-filled for **`+91 7010180190`**.

7. **HTTPS & Security Ready**:
   - Built with secure semantic HTML5, HTTPS CDNs for Google Fonts & FontAwesome icons.
   - Ready for SSL/TLS deployment on any web server.

---

## 📁 Directory Structure

```
MrFixers_website_app/
├── index.html                  # Home Page (Urban Company-style Hero, Services, Estimator, Why Us)
├── about.html                  # About Us (Story, Dubai Heritage, Vision, Mission, Values, Roadmap)
├── services.html               # Full Services Catalog, Official Tariff & Smart Retrofit Solutions
├── enquiry.html                # Booking & Enquiry Page (Routes to saravanan.vp@mrfixers.in)
├── assets/
│   ├── css/
│   │   └── style.css           # Complete responsive stylesheet with Light/Dark themes
│   ├── js/
│   │   ├── main.js             # Theme switcher, Mobile drawer, Live search, Modals
│   │   ├── rate-calculator.js  # Interactive service rate estimator
│   │   └── enquiry.js          # Booking form AJAX submit & WhatsApp generator
│   ├── images/
│   │   ├── logo-light.svg      # Crisp vector logo (Light mode)
│   │   ├── logo-dark.svg       # Crisp vector logo (Dark mode)
│   │   ├── favicon.png         # Browser favicon
│   │   ├── hero-technician.jpg # Technician banner
│   │   ├── dubai-skyline-banner.jpg # Dubai iconic projects banner
│   │   ├── van-branding.jpg    # MrFixer branded service vehicle
│   │   └── services/           # Service thumbnails (AC, Electrical, Plumbing, Painting, Commercial, etc.)
│   └── scripts/
│       └── process_assets.py   # Python asset extraction script
├── business_ideas/             # Reference graphics and brand assets
└── README.md                   # Project documentation & deployment guide
```

---

## 🚀 How to Run Locally

You can open the HTML files directly in any web browser, or serve them locally with Python:

```bash
# In the project directory:
python -m http.server 8000
```
Then visit: `http://localhost:8000`

---

## 🔒 HTTPS Deployment Guide

This website is purely static and zero-dependency, which means it can be deployed in minutes to any modern HTTPS-enabled web host:

### Option 1: Netlify / Vercel / Cloudflare Pages (Free HTTPS)
1. Drag and drop the `MrFixers_website_app` folder directly into [Netlify Drop](https://app.netlify.com/drop) or connect to your Git repository on Vercel/Cloudflare Pages.
2. Automatic free SSL certificates (HTTPS) are provisioned immediately.

### Option 2: GitHub Pages (Free HTTPS)
1. Push this repository to GitHub.
2. Go to **Settings** > **Pages** > Select `main` branch root folder > Click **Save**.
3. Check **"Enforce HTTPS"**.

### Option 3: Custom Domain & cPanel / Hostinger / AWS S3 + CloudFront
1. Upload the files to `public_html` or the S3 bucket.
2. Enable Let's Encrypt SSL or AWS Certificate Manager for `mrfixer.in` / `mrfixers.in`.

---

## 📞 Business Contact Information

- **Company**: Mr.Fixers India Pvt Ltd
- **Tagline**: *"WE FIX. YOU MOVE FORWARD."*
- **Phone / WhatsApp**: [+91 7010180190](tel:+917010180190)
- **Official Email**: [sales@mrfixer.in](mailto:sales@mrfixer.in)
- **Operations & Enquiry**: [saravanan.vp@mrfixers.in](mailto:saravanan.vp@mrfixers.in)
- **Headquarters**: Trichy, Tamil Nadu, India
