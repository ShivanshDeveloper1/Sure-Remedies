# Project Rules

## Stack

* Next.js App Router + TypeScript
* Tailwind CSS
* MongoDB + Mongoose
* Use existing `app/globals.css` for global styling.
* Keep globals.css very small.
* Framer Motion is NOT required; animations will be added manually later.

## Goal

Build a simple, modern product/company website with:

* Home
* About
* Products
* Product Detail
* Contact
* Simple working Admin

## Architecture

Use small reusable components.

Main product relationship:

Category → Products → Product Detail

Use:

* `/products`
* `/products/[slug]`

Do NOT create separate hardcoded pages for categories or products.

## Products

Products come from MongoDB.

Each product should support:

* name
* slug
* category
* image
* price/priceLabel
* shortDescription
* description
* specifications
* status

Categories should support:

* name
* slug
* image
* description
* status

## Admin

Keep admin simple.

Admin must allow:

* create/edit/delete categories
* create/edit/delete products
* select product category
* add product image
* edit specifications
* publish/unpublish

No authentication, analytics, users, payments or unnecessary dashboard features.

## UI

Use a clean professional style.

Primary direction:

* light green
* purple
* white/light neutral backgrounds

Use Tailwind for almost all styling.

Do not create large CSS files.
Do not generate images.
Use images provided in `/public/images`.

## WhatsApp

Product enquiry buttons should open WhatsApp directly.

No Razorpay or payment gateway.

## AI Rules

Read this file before coding.

Inspect existing files before creating new ones.

Reuse existing components.

Do not duplicate components.

Do not redesign working code unnecessarily.

Do not create unnecessary dependencies.

Do not ask for confirmation before implementing.

Make the smallest practical change and continue.

Do not run the development server.

Do not spend time on unnecessary explanations.
