# MSM Driving

**Live site: [msm-driving.co.uk](https://msm-driving.co.uk)**

The website for MSM Driving, a family run driving school in Glasgow. This website was built to advertise and bring in new customers.

## What it does

- Presents the driving school’s courses, prices, test centres, reviews and frequently asked questions on one responsive landing page that is optimised and works on both phones and desktops.
- Links every course and call to action to WhatsApp, so pupils can book in one tap with no forms or booking fees.
- Shows the school's live Google rating and latest reviews, fetched through a server-less function.
- Includes search and social-sharing metadata, so the site displays properly on Google and when its link is shared.

## How it works

| Part | What it does |
| --- | --- |
| `site/` | The website itself: `index.html` (HTML, CSS and JavaScript) and its images. Netlify publishes this folder. |
| `netlify/functions/google-reviews.mjs` | A function at `/api/google-reviews`, calls the Google Places API for the rating, review count and recent reviews, and returns them as JSON. |
| `netlify.toml` | Tells Netlify which folder to publish and where the functions live. |

**Caching:** Netlify's CDN caches the reviews response for 2 hours. This means Google is called about 12 times a day however many people visit, keeping the site well inside Google's free monthly allowance. If Google fails, the error is cached briefly too, so a problem never turns into a flood of requests.

**Deployment:** every push to `main` deploys automatically through Netlify. The custom domain is registered through Netlify, with its DNS records pointing at the site.

## Configuration

The reviews function needs a Google Places API key. It is **not** stored in this repository.

## How it was built

I designed the site, planned its layout, sections and visual content, then built it with AI-assisted development: I directed the code, tested each version in the browser and on my phone, and drove the bug fixes. I set up the hosting, registered the domain and configured its DNS myself. Before making this repository public, I reviewed it for security and moved the API key out of the source code into Netlify's environment variables.

**Built with:** HTML, CSS, JavaScript, Netlify (hosting, serverless functions and DNS), Google Places API.
