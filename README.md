# MSM Driving website

- `site/` is the website (index.html and images). Netlify publishes this folder.
- `netlify/functions/google-reviews.mjs` fetches the Google rating and reviews; Netlify caches it for 2 hours.

## Configuration

The reviews function needs a Google Places API key. It is **not** stored in this repository.
Set it in Netlify under *Project configuration > Environment variables* as `GOOGLE_PLACES_KEY`.
Never commit keys or `.env` files.
