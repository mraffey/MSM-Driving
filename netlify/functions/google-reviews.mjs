// Fetches the Google rating, review count and latest reviews for MSM Driving.
// Netlify's CDN keeps the answer for 2 hours, so Google is asked about 12 times a day
// (about 360 a month) however many people visit, well inside Google's 1,000 free a month.

const PLACE_ID = "ChIJ76_touZKAokRSTm2ndpbJ2I"; // MSM-Driving on Google
const API_KEY = process.env.GOOGLE_PLACES_KEY; // set in Netlify: Project configuration > Environment variables
const CACHE_SECONDS = 2 * 60 * 60;

export default async () => {
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
      headers: {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        // the key is locked to the website, so say where the request is for
        Referer: "https://msm-driving.co.uk/",
      },
    });
    if (!res.ok) throw new Error(`Google answered ${res.status}`);
    const p = await res.json();
    const body = {
      rating: p.rating || null,
      count: p.userRatingCount || 0,
      reviews: (p.reviews || [])
        .filter((r) => r.rating >= 4 && r.text && r.text.text)
        .slice(0, 2)
        .map((r) => ({
          rating: r.rating,
          text: r.text.text,
          author: (r.authorAttribution && r.authorAttribution.displayName) || "Google user",
          authorUrl: (r.authorAttribution && r.authorAttribution.uri) || null,
          when: r.relativePublishTimeDescription || "",
        })),
    };
    return Response.json(body, {
      headers: {
        "Cache-Control": "public, max-age=0, must-revalidate",
        "Netlify-CDN-Cache-Control": `public, durable, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS}`,
      },
    });
  } catch (err) {
    // keep failures cached briefly too, so a problem never turns into a flood of requests
    return Response.json({ error: true }, {
      status: 502,
      headers: { "Cache-Control": "no-store", "Netlify-CDN-Cache-Control": "public, durable, s-maxage=600" },
    });
  }
};

export const config = { path: "/api/google-reviews" };
