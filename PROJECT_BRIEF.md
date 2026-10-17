# Project Brief: Shop Site Template

Read this file before doing any work in this repo.

## What this is

A reusable one-page website template for small local auto service businesses (mobile detailers, repair shops, tire shops, towing). Each client gets a copy of this repo with their own details. Sites are sold for $399 setup + $29/month, so they must look professional, load fast, and be easy to update.

## Hard rules

- Plain HTML, CSS and a little vanilla JavaScript. No frameworks, no build step, no npm packages.
- Must deploy for free on Cloudflare Pages straight from the repo root.
- No paid services. The quote form uses Web3Forms (free tier).
- All business details live in ONE file: `site-config.js`. Nothing business-specific is hard-coded anywhere else.
- Never invent reviews, awards, certifications, prices or claims. Use clearly marked placeholders instead.
- Every change goes in a pull request with a short summary of what changed.

## site-config.js holds

Business name, tagline, phone, text number, email for quote requests, address or service area, hours, services (name, short description, starting price), photo filenames, Google reviews link, brand colors, Web3Forms access key, and a `demoMode` flag.

## Page sections (in this order)

1. Header: business name as logo text + large tap-to-call button
2. Hero: tagline + two buttons (Call, Get a Quote)
3. Services with starting prices
4. Photo gallery from the `/images` folder
5. Reviews call-to-action linking to Google reviews
6. Hours and service area with an embedded Google Map
7. Quote request form
8. Footer

## Quote form

Fields: name, phone, vehicle year/make/model, service needed, preferred date, message. Submit to Web3Forms with the access key from `site-config.js`. Show a thank-you message without leaving the page. Every field has a label.

## Quality requirements

- Mobile first. Sticky bottom bar on phones with Call and Text buttons.
- Fast: compressed images, lazy-loaded gallery.
- Local SEO: title and meta description built from the config, LocalBusiness schema markup, Open Graph tags.
- Accessible: alt text on images, good color contrast, keyboard-usable.
- When `demoMode` is true, add `<meta name="robots" content="noindex, nofollow">` so demo sites made for pitching are not listed by Google.

## README

Include a README that explains, in plain language for a non-developer: how to edit `site-config.js`, how to swap photos, how to turn `demoMode` off for a live client, and how to deploy on Cloudflare Pages.

## First task

Build the full template described above using sample data for a made-up business called "Lone Star Mobile Detailing" (clearly fake, used as the portfolio example). Open a pull request when done.

## Later tasks (for client copies)

When asked to set up a client, update only `site-config.js` and `/images`, write short plain service descriptions from the details given, set `demoMode` as instructed, and open a pull request.
