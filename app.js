/* ==========================================================================
   app.js — the behaviour of the page.
   You should never need to edit this file. Everything a client changes lives
   in site-config.js.

   What it does:
     1. Writes the page title, description, robots tag, Open Graph tags and
        LocalBusiness schema from site-config.js.
     2. Fills every business detail on the page (names, phones, hours,
        services, photos, map) from site-config.js.
     3. Handles the quote form and is honest about whether it really sent.
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.SITE_CONFIG || {};
  var PLACEHOLDER_KEY = /place|replace|your[ _-]?key|xxxx|example|dummy/i;

  /* --- tiny helpers ------------------------------------------------------ */
  function path(key) {
    return String(key).split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, CFG);
  }
  function clip(text, max) {
    text = String(text || '').replace(/\s+/g, ' ').trim();
    if (text.length <= max) return text;
    var cut = text.slice(0, max);
    var space = cut.lastIndexOf(' ');
    return (space > 20 ? cut.slice(0, space) : cut) + '…';
  }
  function digits(value) { return String(value || '').replace(/[^0-9+]/g, ''); }
  function absolute(url) {
    try { return new URL(url, window.location.href).href; } catch (e) { return url; }
  }
  function meta(attr, name, content) {
    if (!content) return;
    var el = document.head.querySelector('meta[' + attr + '="' + name + '"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }
  function whenReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  /* --- 1. title, meta, schema ------------------------------------------- */
  function pageTitle() {
    if (CFG.metaTitle) return CFG.metaTitle;
    var name = CFG.businessName || 'Local auto service';
    return CFG.tagline ? name + ' — ' + clip(CFG.tagline, 40) : name;
  }
  function pageDescription() {
    if (CFG.metaDescription) return CFG.metaDescription;
    var parts = [];
    if (CFG.tagline) parts.push(CFG.tagline);
    if (CFG.serviceAreaShort) parts.push('Serving ' + CFG.serviceAreaShort + '.');
    if (CFG.phoneDisplay) parts.push('Call or text ' + CFG.phoneDisplay + ' for a free quote.');
    return clip(parts.join(' '), 155);
  }
  function ogImageUrl() {
    var src = CFG.ogImage || (CFG.photos && CFG.photos[0] && CFG.photos[0].src) || '';
    return src ? absolute(src) : '';
  }

  function applySeo() {
    var title = pageTitle();
    var description = pageDescription();
    var image = ogImageUrl();
    var url = absolute(CFG.siteUrl || './');

    document.title = title;
    meta('name', 'description', description);

    /* Hidden from Google on every demo site, whatever the config says. */
    meta('name', 'robots', CFG.demoMode ? 'noindex, nofollow' : 'index, follow');

    meta('property', 'og:type', 'website');
    meta('property', 'og:site_name', CFG.businessName);
    meta('property', 'og:title', title);
    meta('property', 'og:description', description);
    meta('property', 'og:url', url);
    meta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    meta('name', 'twitter:title', title);
    meta('name', 'twitter:description', description);
    if (image) {
      meta('property', 'og:image', image);
      meta('name', 'twitter:image', image);
    }
    if (CFG.brandColors && CFG.brandColors.primary) meta('name', 'theme-color', CFG.brandColors.primary);
  }

  function applySchema() {
    if (!CFG.businessName) return;
    var schema = {
      '@context': 'https://schema.org',
      '@type': CFG.schemaType || 'LocalBusiness',
      name: CFG.businessName,
      url: absolute(CFG.siteUrl || './'),
      description: pageDescription(),
      telephone: CFG.phone || undefined,
      email: CFG.quoteEmail || undefined,
      areaServed: CFG.serviceAreaShort || CFG.serviceArea || undefined,
      priceRange: CFG.priceRange || undefined,
      image: ogImageUrl() || undefined
    };

    /* Only publish an address when the client has given one. */
    var a = CFG.address || {};
    if (a.streetAddress || a.addressLocality) {
      schema.address = {
        '@type': 'PostalAddress',
        streetAddress: a.streetAddress || undefined,
        addressLocality: a.addressLocality || undefined,
        addressRegion: a.addressRegion || undefined,
        postalCode: a.postalCode || undefined,
        addressCountry: a.addressCountry || undefined
      };
    }

    /* Only publish opening hours the client has actually confirmed —
       the demo config leaves schemaOpeningHours empty on purpose. */
    if (Array.isArray(CFG.schemaOpeningHours) && CFG.schemaOpeningHours.length) {
      schema.openingHours = CFG.schemaOpeningHours;
    }

    /* Never point Google at a placeholder reviews link. */
    if (CFG.googleReviewsUrl && !CFG.demoMode) schema.sameAs = [CFG.googleReviewsUrl];

    var el = document.getElementById('business-schema') || document.createElement('script');
    el.id = 'business-schema';
    el.type = 'application/ld+json';
    el.textContent = JSON.stringify(schema, null, 2);
    if (!el.parentNode) document.head.appendChild(el);
  }

  /* --- 2. brand colours -------------------------------------------------- */
  function applyColors() {
    var c = CFG.brandColors || {};
    var names = {
      primary: '--brand-primary',
      accent: '--brand-accent',
      onPrimary: '--brand-on-primary',
      onAccent: '--brand-on-accent',
      ink: '--brand-ink',
      muted: '--brand-muted',
      surface: '--brand-surface',
      surfaceAlt: '--brand-surface-alt'
    };
    Object.keys(names).forEach(function (k) {
      if (c[k]) document.documentElement.style.setProperty(names[k], c[k]);
    });
  }

  function luminance(hex) {
    var h = String(hex || '').replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    if (!/^[0-9a-f]{6}$/i.test(h)) return null;
    var rgb = [0, 2, 4].map(function (i) {
      var v = parseInt(h.substr(i, 2), 16) / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  }
  function contrastWarning() {
    var c = CFG.brandColors || {};
    var pairs = [
      ['text on the main background', c.ink, c.surface],
      ['text on the lighter panels', c.ink, c.surfaceAlt],
      ['button text on the primary colour', c.onPrimary, c.primary],
      ['button text on the accent colour', c.onAccent, c.accent],
      ['small grey text', c.muted, c.surface]
    ];
    pairs.forEach(function (p) {
      var l1 = luminance(p[1]), l2 = luminance(p[2]);
      if (l1 == null || l2 == null) return;
      var hi = Math.max(l1, l2), lo = Math.min(l1, l2);
      var ratio = (hi + 0.05) / (lo + 0.05);
      if (ratio < 4.5) {
        console.warn('Pitstop Pages: "' + p[0] + '" has low contrast (' +
          ratio.toFixed(2) + ':1, aim for 4.5:1). Adjust brandColors in site-config.js.');
      }
    });
  }

  /* --- 3. filling in the page ------------------------------------------- */
  function applyBindings(root) {
    root.querySelectorAll('[data-config-text]').forEach(function (el) {
      var v = path(el.getAttribute('data-config-text'));
      if (v === undefined || v === null || v === '') { el.hidden = true; return; }
      el.hidden = false;
      el.textContent = String(v);
    });

    root.querySelectorAll('[data-config-href]').forEach(function (el) {
      var value = path(el.getAttribute('data-config-href'));
      var prefix = el.getAttribute('data-config-href-prefix') || '';
      var href = '';
      if (value) {
        if (prefix === 'tel:') href = 'tel:' + digits(value);
        else if (prefix === 'sms:') {
          href = 'sms:' + digits(value);
          var body = el.getAttribute('data-sms-body');
          if (body) href += '?body=' + encodeURIComponent(body);
        } else href = prefix + value;
      }
      if (href && href !== 'tel:' && href !== 'sms:') {
        el.setAttribute('href', href);
        el.hidden = false;
      } else {
        /* No phone number set: show no dead button. */
        el.removeAttribute('href');
        el.hidden = true;
      }
    });

    root.querySelectorAll('[data-config-attr]').forEach(function (el) {
      el.getAttribute('data-config-attr').split(';').forEach(function (pair) {
        var bits = pair.split(':');
        var attr = bits.shift();
        var v = path(bits.join(':'));
        if (attr && v) el.setAttribute(attr.trim(), String(v));
      });
    });

    root.querySelectorAll('[data-config-if]').forEach(function (el) {
      var rule = el.getAttribute('data-config-if');
      var negate = rule.charAt(0) === '!';
      var v = path(negate ? rule.slice(1) : rule);
      var show = negate ? !v : !!v;
      el.hidden = !show;
    });
  }

  function buildServices() {
    var list = document.getElementById('services-list');
    var select = document.getElementById('q-service');
    var services = Array.isArray(CFG.services) ? CFG.services : [];

    if (list) {
      services.forEach(function (s) {
        var li = document.createElement('li');
        li.className = 'card';
        var h3 = document.createElement('h3');
        h3.textContent = s.name || 'Service';
        var p = document.createElement('p');
        p.textContent = s.description || '';
        var price = document.createElement('p');
        price.className = 'price';
        price.textContent = s.startingPrice ? 'Starting at ' + s.startingPrice : 'Price on request — PLACEHOLDER';
        li.appendChild(h3);
        li.appendChild(p);
        li.appendChild(price);
        list.appendChild(li);
      });
    }

    if (select) {
      var first = document.createElement('option');
      first.value = '';
      first.textContent = 'Please choose…';
      select.appendChild(first);
      services.forEach(function (s) {
        var o = document.createElement('option');
        o.value = s.name || '';
        o.textContent = s.name || '';
        select.appendChild(o);
      });
      var other = document.createElement('option');
      other.value = 'Something else / not sure';
      other.textContent = 'Something else / not sure';
      select.appendChild(other);
    }
  }

  function buildGallery() {
    var grid = document.getElementById('gallery-grid');
    if (!grid) return;
    (CFG.photos || []).forEach(function (photo) {
      if (!photo || !photo.src) return;
      var fig = document.createElement('figure');
      var img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.alt || '';                 /* never empty for a real photo */
      img.loading = 'lazy';                      /* load as the visitor scrolls */
      img.decoding = 'async';
      if (photo.width) img.width = photo.width;  /* set both so nothing shifts */
      if (photo.height) img.height = photo.height;
      fig.appendChild(img);
      if (photo.caption) {
        var cap = document.createElement('figcaption');
        cap.textContent = photo.caption;
        fig.appendChild(cap);
      }
      grid.appendChild(fig);
    });
  }

  function buildHours() {
    var dl = document.getElementById('hours-list');
    if (!dl) return;
    var hours = Array.isArray(CFG.hours) ? CFG.hours : [];
    hours.forEach(function (line) {
      var row = document.createElement('div');
      var dt = document.createElement('dt');
      dt.textContent = line.days || '';
      var dd = document.createElement('dd');
      dd.textContent = line.hours || 'PLACEHOLDER';
      row.appendChild(dt);
      row.appendChild(dd);
      dl.appendChild(row);
    });
  }

  function buildMap() {
    var frame = document.getElementById('map-frame');
    if (!frame) return;
    var query = CFG.mapQuery || CFG.serviceAreaShort || '';
    if (!query) { frame.parentNode.hidden = true; return; }
    frame.src = 'https://www.google.com/maps?q=' + encodeURIComponent(query) + '&output=embed';
    frame.title = 'Map of ' + query;
  }

  function buildStickyBar() {
    var bar = document.getElementById('sticky-bar');
    if (bar && CFG.showStickyBar === false) bar.hidden = true;
  }

  /* --- 4. the quote form ------------------------------------------------- */
  function formStatus(kind, html) {
    var box = document.getElementById('form-status');
    if (!box) return;
    box.className = 'form-status ' + kind;
    box.innerHTML = html;
    box.focus();
  }
  function contactOffer() {
    var bits = [];
    if (CFG.phone) {
      bits.push('call <a href="tel:' + digits(CFG.phone) + '">' + (CFG.phoneDisplay || CFG.phone) + '</a>');
    }
    if (CFG.textNumber) {
      bits.push('text <a href="sms:' + digits(CFG.textNumber) + '">' + (CFG.textNumberDisplay || CFG.textNumber) + '</a>');
    }
    if (CFG.quoteEmail) {
      bits.push('email <a href="mailto:' + CFG.quoteEmail + '">' + CFG.quoteEmail + '</a>');
    }
    return bits.length ? 'Please ' + bits.join(', or ') + ' instead.' : 'Please use the contact details on this page instead.';
  }

  function wireForm() {
    var form = document.getElementById('quote-form');
    if (!form) return;
    var button = document.getElementById('quote-submit');
    var buttonLabel = button ? button.textContent : '';

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.reportValidity()) return;
      if (form.botcheck && form.botcheck.checked) return;   /* quietly drop bots */

      var key = String(CFG.web3formsAccessKey || '').trim();

      /* No real key yet: say so. Never pretend the message was sent. */
      if (!key || PLACEHOLDER_KEY.test(key)) {
        formStatus('error',
          '<strong>Your request was not sent.</strong> This site is still using a placeholder ' +
          'key for its form, so there is nothing to send it to. ' + contactOffer());
        return;
      }

      var data = new FormData(form);
      data.set('access_key', key);

      if (button) { button.disabled = true; button.textContent = 'Sending…'; }
      formStatus('pending', 'Sending your request…');

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data
      })
        .then(function (response) { return response.json(); })
        .then(function (result) {
          if (result && result.success === true) {
            form.reset();
            formStatus('ok',
              '<strong>Thank you — your request has been sent.</strong> ' +
              'The business will get back to you. In a hurry? ' + contactOffer());
          } else {
            var why = (result && (result.message || (result.error && result.error.message))) || 'the form service refused it';
            formStatus('error',
              '<strong>Sorry, your request could not be sent</strong> (' + why + '). ' +
              'Nothing was sent. ' + contactOffer());
          }
        })
        .catch(function () {
          formStatus('error',
            '<strong>Sorry, your request could not be sent</strong> — the connection dropped. ' +
            'Nothing was sent. ' + contactOffer());
        })
        .then(function () {
          if (button) { button.disabled = false; button.textContent = buttonLabel; }
        });
    });
  }

  /* --- run --------------------------------------------------------------- */
  applyColors();
  applySeo();
  applySchema();

  whenReady(function () {
    applyBindings(document);
    buildServices();
    buildGallery();
    buildHours();
    buildMap();
    buildStickyBar();
    wireForm();
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
    contrastWarning();
  });
})();
