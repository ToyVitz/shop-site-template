# One-page website template — Pitstop Pages

This is the website template we copy for each client. It is one page: header,
intro, services, photos, reviews button, hours and service area, a quote form,
and a footer. It works on phones first, because that is where people will open it.

It is plain HTML, CSS and a little JavaScript. There is nothing to install and
nothing to build. Copy the folder to Cloudflare Pages and it is live.

The demo content in this copy is for **Lone Star Mobile Detailing**, a made-up
business we use as our example. Every price, hour and review link in it says
PLACEHOLDER, and the site is set to hide itself from Google. Do not send this
demo to a real customer as if it were live.

---

## The one file you change: `site-config.js`

Open `site-config.js` in any plain text editor (Notepad, TextEdit, VS Code).
Everything about the business is in there. You never need to open
`index.html`, `styles.css` or `app.js`.

Edit only what is between the quote marks. Keep the quotes, keep the commas.

| Item | What to put in |
| --- | --- |
| `businessName` | The business name, spelled exactly as the owner writes it. |
| `tagline` | One short sentence about what they do. No hype. |
| `phone`, `phoneDisplay` | `phone` is digits only with the country code, e.g. `+15125550199`. `phoneDisplay` is how it looks on the page, e.g. `(512) 555-0199`. |
| `textNumber`, `textNumberDisplay` | Same idea, for the Text button. |
| `quoteEmail` | Where quote requests should arrive. |
| `serviceAreaShort`, `serviceArea` | Short version for headings, long version for the panel. |
| `addressLine` | A shop address, or a line saying they travel to the customer. |
| `hours` | A list of days and times. Replace every PLACEHOLDER. |
| `services` | Name, one or two plain sentences, and a starting price. |
| `photos` | The picture files, in the order you want them. See below. |
| `googleReviewsUrl` | The owner's real Google reviews link. |
| `mapQuery`, `mapLinkUrl` | The town, postcode or address for the map. |
| `brandColors` | The business colours. See below. |
| `web3formsAccessKey` | The key that makes the quote form send email. See below. |
| `demoMode` | `true` for a demo, `false` for a live site. |

### The honesty rule

**Never make up a price, an hour, a review or a qualification.** If the owner
has not told you, leave the text reading PLACEHOLDER and ask them. The reviews
section on purpose has no review text, no star rating and no customer names —
it is only a button through to their real Google profile. The photos are
labelled placeholder pictures, not real jobs, so nobody thinks they show work
that was never done.

---

## Swapping the photos

1. Put the client's photos in the `images` folder.
2. Squash them first, so the page stays fast. Any free tool will do (for
   example squoosh.app). Aim for under 250 KB each, and 1600 pixels wide at
   most. Save as `.jpg`.
3. Open `site-config.js` and edit the `photos` list so each line points at the
   right file, and give it a short `alt` description and a `caption`.

Each photo line looks like this:

```js
{ src: "images/vansetup.jpg", alt: "Detailing van parked in a driveway", caption: "Our van comes to you", width: 1600, height: 1200 },
```

- `src` is the folder and file name, exactly, including capital letters.
- `alt` is read aloud to people using a screen reader, and shows if a picture
  fails to load. Describe what is in the photo. Every photo needs one.
- `caption` is the small line under the picture. Leave it out if you don't
  want one.
- `width` and `height` are the real pixel size of the file. They stop the page
  jumping about while photos load. Photos load only as the visitor scrolls
  down to them, so the page opens quickly on a phone.

## Turning the demo off for a live client

When the site is ready to be found by Google, open `site-config.js` and change:

```js
demoMode: true,
```
to
```js
demoMode: false,
```

That removes the `noindex, nofollow` tag, which is the tag that tells Google to
keep the site out of search results. It also hides the sample-site notices.
Check every PLACEHOLDER is gone before you do it.

## Making the quote form send email

The form uses Web3Forms, which is free for this kind of form.

1. Go to web3forms.com and make a free account using **the client's** email
   address, so enquiries land in their inbox and not ours.
2. Copy the access key they give you.
3. Paste it into `web3formsAccessKey` in `site-config.js`, keeping the quotes.
4. Send yourself a test request from the live site and check it arrives.

While the key still says PLACEHOLDER, the form cannot send anything. It says so
plainly on the page and offers the phone number instead. **It never pretends a
message was sent.** If Web3Forms is down or the key is wrong, the visitor sees
a clear error and the phone and text numbers — they are never left thinking
their enquiry went through.

## Checking it on your own computer

In a terminal, from this folder:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080` in a browser. Press Control-C to stop it.
Double-clicking `index.html` also mostly works, but checking it through the
little server is closer to the real thing.

## Putting it on Cloudflare Pages

1. Put this folder in a GitHub repository (one repository per client).
2. Log in to Cloudflare, then go to **Workers & Pages → Create → Pages →
   Connect to Git**, and pick the repository.
3. When it asks for build settings, leave the build command **empty** and set
   the output directory to `/` (just a slash). There is no build step — the
   files upload as they are.
4. Click Deploy. Cloudflare gives you a web address ending in
   `pages.dev`.
5. Add the client's own domain under **Custom domains** if they have one.

Every time you change a file and save it to GitHub, Cloudflare rebuilds the
site by itself in about a minute.

## Things worth knowing

- **The page needs JavaScript on.** It fills in the business details from
  `site-config.js`. If a visitor has JavaScript off, they see a short note
  asking them to call.
- **Colours.** Change `brandColors` in `site-config.js` to the client's
  colours. If a colour combination is hard to read, the browser's console
  prints a warning telling you which one to fix (aim for a contrast of 4.5:1).
- **Keyboard and screen readers.** Every field has a label, every picture has
  alt text, and every button can be reached with the Tab key.
- **On phones** there is a bar stuck to the bottom of the screen with Call and
  Text buttons. It hides itself on larger screens, where the header button is
  enough.
- **One page only.** Service pages, galleries and blogs are a different job —
  ask before promising them.

## Files in this folder

| File | What it is |
| --- | --- |
| `site-config.js` | Everything about the business. This is the only file you edit per client. |
| `index.html` | The page structure. It has no business details in it. |
| `styles.css` | How it looks. Colours come from the config. |
| `app.js` | The behaviour: fills in the details, builds the schema tags, handles the form. |
| `images/` | The photos. |
| `README.md` | This file. |
