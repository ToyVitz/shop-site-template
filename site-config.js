/* ==========================================================================
   site-config.js  —  THE ONLY FILE YOU EDIT FOR A CLIENT
   --------------------------------------------------------------------------
   Everything about the business lives here: name, phone, hours, services,
   photos, colours and the quote-form key. Nothing business-specific is
   written into index.html, styles.css or app.js.

   This copy is filled in for a made-up portfolio example,
   "Lone Star Mobile Detailing". It is a demo, so demoMode is true.
   Anything marked PLACEHOLDER is a stand-in and must be replaced with the
   client's real detail before the site goes live.
   ========================================================================== */

window.SITE_CONFIG = {

  /* --- Demo switch -------------------------------------------------------
     true  = demo/pitch site. Adds "noindex, nofollow" so Google will not
             list it, and shows the sample-site notices on the page.
     false = live client site, allowed to be found by Google.            */
  demoMode: true,

  /* --- The business ------------------------------------------------------ */
  businessName: "Lone Star Mobile Detailing",
  tagline: "Mobile car detailing brought to your driveway.",

  /* Digits only, with country code. Used for tap-to-call and the schema. */
  phone: "+15125550199",
  phoneDisplay: "(512) 555-0199",

  /* Same details again for the text button. */
  textNumber: "+15125550199",
  textNumberDisplay: "(512) 555-0199",

  /* Where quote requests are emailed (Web3Forms forwards them here). */
  quoteEmail: "quotes@example.com",

  /* Shown under the hero. Keep it short — it is also used in the page
     description and schema markup. */
  serviceAreaShort: "Austin, Texas and nearby areas",
  serviceArea: "Mobile service across Austin, Round Rock, Cedar Park and Pflugerville, Texas — PLACEHOLDER: replace with the real service area.",
  addressLine: "We come to you — no shop address. PLACEHOLDER: add the client's registered address if they want one shown.",

  /* Optional: set to the live domain once the site is published, e.g.
     "https://lonestarmobiledetailing.com". Leave as "" while the domain is
     unknown; the page then uses its own address. */
  siteUrl: "",
  schemaType: "AutoWash",     /* closest schema.org type to a mobile detailer;
                                 use "AutoRepair" for a repair shop, etc. */
  priceRange: "PLACEHOLDER",  /* schema.org wants a price range, e.g. "$$" */

  /* --- Opening hours -----------------------------------------------------
     Every line is a placeholder until the owner gives real hours.
     schemaOpeningHours is only published to Google when you fill it in
     (format: "Mo-Fr 08:00-18:00"), because we never publish made-up hours. */
  hours: [
    { days: "Monday – Friday", hours: "PLACEHOLDER — e.g. 8:00 AM – 6:00 PM" },
    { days: "Saturday",        hours: "PLACEHOLDER — e.g. 9:00 AM – 3:00 PM" },
    { days: "Sunday",          hours: "PLACEHOLDER — e.g. Closed" }
  ],
  schemaOpeningHours: [],

  /* --- Services ----------------------------------------------------------
     name, a short plain description, and a starting price.
     NEVER invent a real price: leave the PLACEHOLDER wording in place until
     the client gives you their own numbers.                              */
  services: [
    {
      name: "Full detail",
      description: "Inside and out, by hand. Washed, wheels and tyres cleaned, vacuumed, glass polished. PLACEHOLDER: describe what the client actually includes.",
      startingPrice: "$XX — PLACEHOLDER"
    },
    {
      name: "Interior detail",
      description: "Vacuum, seats and carpets, dashboard and door panels, inside glass. PLACEHOLDER: describe what the client actually includes.",
      startingPrice: "$XX — PLACEHOLDER"
    },
    {
      name: "Exterior wash and wax",
      description: "Foam wash, wheels, then wax by hand. PLACEHOLDER: describe what the client actually includes.",
      startingPrice: "$XX — PLACEHOLDER"
    },
    {
      name: "Fleet and work vehicles",
      description: "Several vehicles at one site, booked in a block. PLACEHOLDER: describe the client's real fleet offer or delete this entry.",
      startingPrice: "Quoted per vehicle — PLACEHOLDER"
    }
  ],

  /* --- Photos ------------------------------------------------------------
     Files in the /images folder, in the order they should appear.
     width and height are the real pixel size of each file — they stop the
     page jumping while photos load. Keep alt text short and factual.
     These six are labelled placeholders, not real jobs.                 */
  photos: [
    { src: "images/sample-photo-1-exterior-wash.svg",  alt: "Placeholder photo — exterior wash (not a real job)",   caption: "Placeholder photo — replace with a real exterior wash photo",  width: 1200, height: 900 },
    { src: "images/sample-photo-2-interior-vacuum.svg", alt: "Placeholder photo — interior vacuum (not a real job)", caption: "Placeholder photo — replace with a real interior photo",       width: 1200, height: 900 },
    { src: "images/sample-photo-3-wheels.svg",         alt: "Placeholder photo — wheels and tyres (not a real job)",  caption: "Placeholder photo — replace with a real wheel photo",          width: 1200, height: 900 },
    { src: "images/sample-photo-4-seats.svg",          alt: "Placeholder photo — seat cleaning (not a real job)",     caption: "Placeholder photo — replace with a real seat cleaning photo",  width: 1200, height: 900 },
    { src: "images/sample-photo-5-wax.svg",            alt: "Placeholder photo — wax finish (not a real job)",        caption: "Placeholder photo — replace with a real finish photo",         width: 1200, height: 900 },
    { src: "images/sample-photo-6-van-setup.svg",      alt: "Placeholder photo — mobile van setup (not a real job)",  caption: "Placeholder photo — replace with a real van or setup photo",   width: 1200, height: 900 }
  ],

  /* --- Reviews -----------------------------------------------------------
     A call to action only — this template never writes review text, star
     ratings or customer names. Paste the client's real Google reviews link
     here. This demo points at a Google search placeholder.              */
  googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=PLACEHOLDER+replace+with+real+Google+business+profile",

  /* --- Map ---------------------------------------------------------------
     mapQuery is what the embedded map searches for: a town, a postcode or a
     full address. Copy the address exactly as the client writes it.      */
  mapQuery: "Austin, Texas",
  mapLinkUrl: "https://www.google.com/maps/search/?api=1&query=PLACEHOLDER+replace+with+real+address",

  /* --- Brand colours -----------------------------------------------------
     primary is the dark header/button colour, accent is the second button
     colour. onPrimary and onAccent are the text colours used on top of them.
     Keep the text colours dark-on-light or light-on-dark; the page warns in
     the browser console if a pair has weak contrast.                     */
  brandColors: {
    primary: "#10305A",
    accent: "#B4451F",
    onPrimary: "#FFFFFF",
    onAccent: "#FFFFFF",
    ink: "#14181F",
    muted: "#4C5560",
    surface: "#FFFFFF",
    surfaceAlt: "#F2F4F7"
  },

  /* --- Quote form --------------------------------------------------------
     Get a free access key at https://web3forms.com (put in the client's
     email, copy the key they send). While this says PLACEHOLDER the form
     cannot send anything and says so instead of pretending it worked.   */
  web3formsAccessKey: "PLACEHOLDER - REPLACE WITH THE CLIENT'S WEB3FORMS ACCESS KEY",

  /* Show the sticky Call / Text bar at the bottom of phone screens. */
  showStickyBar: true
};
