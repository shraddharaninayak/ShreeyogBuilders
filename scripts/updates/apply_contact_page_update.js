const fs = require('fs');
const path = require('path');
const { contactCustomCss } = require('./contact_css.js');

const basePath = 'D:/Shreeyogweb/obsidianassembly.com';

// Dossier HTML (no newlines to be clean in JS)
const dossierHtml = `<div class="shreeyog-contact-dossier" data-v-24d6f4e3><div class="dossier-header"><span class="dossier-tag">SHREEYOG | NASHIK HEADQUARTERS</span><h2 class="dossier-title">Shreeyog Builders &amp; Land Developers</h2><p class="dossier-intro">Since 1992, crafting residential landmarks with trust, quality construction, and lasting value across Nashik.</p></div><div class="dossier-grid"><div class="dossier-item"><span class="dossier-label">HEAD OFFICE</span><p class="dossier-val">101/102, Shreenath Enclave, Shreehari Kute Marg,<br>Mumbai Naka, Nashik — 422 002, Maharashtra</p><a href="https://maps.google.com/?q=Mumbai+Naka+Nashik" target="_blank" rel="noopener noreferrer" class="dossier-link">Get Directions ↗</a></div><div class="dossier-item"><span class="dossier-label">DIRECT INQUIRIES &amp; SITE VISITS</span><p class="dossier-val"><a href="tel:+919823534751" class="dossier-phone">+91 98235 34751</a></p><p class="dossier-subval">Office Desk: 0253 - 2579667<br>Direct: 0253 - 2311112 / 2312638</p></div><div class="dossier-item"><span class="dossier-label">EMAIL ADVISORY</span><p class="dossier-val"><a href="mailto:hello@shreeyogbuilders.com" class="dossier-email">hello@shreeyogbuilders.com</a></p></div><div class="dossier-item"><span class="dossier-label">HOURS &amp; SITE VISITS</span><p class="dossier-val">Monday – Sunday: 10:00 AM – 7:00 PM</p><p class="dossier-subval">Consultations &amp; escorted site visits available daily.</p></div></div><div class="dossier-footer"><span class="dossier-badge">B. M. KALE BUILDERS &amp; LAND DEVELOPERS</span><span class="dossier-locations">Key Landmark Locations: Bodhale Nagar • Karmyogi Nagar • Tapovan Road • Gangapur Road • Khode Nagar</span></div></div>`;

// Form HTML
const formHtml = `<div class="contact-form-section-wrapper" id="inquiry-form-section" data-v-599117dc><div class="form-header"><span class="form-pre-label">CONNECT WITH US</span><h2 class="form-title">Schedule a Consultation or Site Visit</h2><p class="form-subtitle">Connect directly with our dedicated property advisory team in Nashik for project consultations, brochure requests, and site visits.</p></div><form id="shreeyogContactForm" class="shreeyog-form" novalidate><div class="form-row form-row-2"><div class="form-group"><label for="contactName">Full Name <span class="required">*</span></label><input type="text" id="contactName" name="name" placeholder="Enter your full name" required autocomplete="name" /><span class="field-error" id="nameError"></span></div><div class="form-group"><label for="contactPhone">Phone Number <span class="required">*</span></label><input type="tel" id="contactPhone" name="phone" placeholder="+91 98765 43210" required autocomplete="tel" /><span class="field-error" id="phoneError"></span></div></div><div class="form-row form-row-2"><div class="form-group"><label for="contactEmail">Email Address</label><input type="email" id="contactEmail" name="email" placeholder="name@example.com" autocomplete="email" /><span class="field-error" id="emailError"></span></div><div class="form-group"><label for="contactProject">Project of Interest</label><select id="contactProject" name="project"><option value="All Ongoing Developments">All Ongoing Developments</option><option value="Shree Bramhand (Bodhle Nagar)">Shree Bramhand — Bodhle Nagar (2 &amp; 3 BHK)</option><option value="Shree Safalya (Karmyogi Nagar)">Shree Safalya — Karmyogi Nagar</option><option value="Shree Venkatesh Park (Khode Nagar)">Shree Venkatesh Park — Khode Nagar</option><option value="Shree Neelkanth">Shree Neelkanth</option><option value="Shree Malhar (Gangapur Road)">Shree Malhar — Gangapur Road</option><option value="Shree Nandan (Kathe Galli)">Shree Nandan — Kathe Galli</option><option value="Shree Pandurang (Tapovan Road)">Shree Pandurang — Tapovan Road</option><option value="General Consultation">General Property Consultation</option></select></div></div><div class="form-row form-row-1"><div class="form-group"><label for="contactMessage">Specific Requirements / Message</label><textarea id="contactMessage" name="message" rows="3" placeholder="Tell us what you are looking for (e.g. 2 BHK / 3 BHK, budget, preferred site visit date)..."></textarea></div></div><div class="form-actions"><button type="submit" id="contactSubmitBtn" class="contact-submit-btn"><span>SUBMIT INQUIRY</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button></div><div id="contactFormSuccess" class="contact-form-success" style="display: none;"><div class="success-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#25d366" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div><h3 class="success-title">Thank You for Reaching Out</h3><p class="success-desc" id="successDetailText">Your request has been recorded. Our property consultant will contact you promptly.</p><button type="button" id="resetContactFormBtn" class="reset-form-btn">Submit Another Request</button></div></form></div>`;

// Form interactive script
const formScript = `
<script>
(function() {
  function initContactForm() {
    var form = document.getElementById('shreeyogContactForm');
    var successBox = document.getElementById('contactFormSuccess');
    var resetBtn = document.getElementById('resetContactFormBtn');
    var submitBtn = document.getElementById('contactSubmitBtn');
    var nameInput = document.getElementById('contactName');
    var phoneInput = document.getElementById('contactPhone');
    var emailInput = document.getElementById('contactEmail');
    var projectInput = document.getElementById('contactProject');
    var messageInput = document.getElementById('contactMessage');
    var nameError = document.getElementById('nameError');
    var phoneError = document.getElementById('phoneError');
    var successDetail = document.getElementById('successDetailText');

    if (!form || form.__inited) return;
    form.__inited = true;

    // Header Send Request button scrolls to form
    var requestBtns = document.querySelectorAll('.request.button, button.request');
    requestBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        var section = document.getElementById('inquiry-form-section');
        if (section) {
          e.preventDefault();
          e.stopPropagation();
          section.scrollIntoView({ behavior: 'smooth' });
          if (nameInput) setTimeout(function() { nameInput.focus(); }, 600);
        }
      }, true);
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var valid = true;

      if (nameError) nameError.textContent = '';
      if (phoneError) phoneError.textContent = '';

      var nameVal = (nameInput && nameInput.value) ? nameInput.value.trim() : '';
      var phoneVal = (phoneInput && phoneInput.value) ? phoneInput.value.trim() : '';

      if (!nameVal || nameVal.length < 2) {
        if (nameError) nameError.textContent = 'Please enter your full name.';
        valid = false;
      }

      var digitsOnly = phoneVal.replace(/\\D/g, '');
      if (!phoneVal || digitsOnly.length < 8) {
        if (phoneError) phoneError.textContent = 'Please provide a valid contact number (at least 8 digits).';
        valid = false;
      }

      if (!valid) return;

      var originalBtnText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>RECORDING INQUIRY...</span>';
      }

      setTimeout(function() {
        var enquiry = {
          name: nameVal,
          phone: phoneVal,
          email: (emailInput && emailInput.value) ? emailInput.value.trim() : '',
          project: (projectInput && projectInput.value) ? projectInput.value : 'General Consultation',
          message: (messageInput && messageInput.value) ? messageInput.value.trim() : '',
          timestamp: new Date().toISOString()
        };

        try {
          var list = JSON.parse(localStorage.getItem('shreeyog_inquiries') || '[]');
          list.push(enquiry);
          localStorage.setItem('shreeyog_inquiries', JSON.stringify(list));
        } catch (err) {}

        if (successDetail) {
          successDetail.textContent = 'Thank you, ' + nameVal + '. Your consultation request has been recorded. Our property advisor in Nashik will contact you at ' + phoneVal + ' promptly.';
        }

        // Hide form rows, show success
        var rows = form.querySelectorAll('.form-row, .form-actions');
        rows.forEach(function(r) { r.style.display = 'none'; });
        if (successBox) successBox.style.display = 'flex';

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }, 500);
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        form.reset();
        var rows = form.querySelectorAll('.form-row, .form-actions');
        rows.forEach(function(r) { r.style.display = ''; });
        if (successBox) successBox.style.display = 'none';
        if (nameInput) nameInput.focus();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
  setInterval(initContactForm, 1000);
})();
</script>
`;

// ========================================================
// 1. UPDATE _nuxt/people.af477013.js
// ========================================================
const peopleJsPath = path.join(basePath, '_nuxt/people.af477013.js');
let peopleJs = fs.readFileSync(peopleJsPath, 'utf8');

// Ensure import includes h as ae
peopleJs = peopleJs.replace(
  'import{e as m,r as $,f as d,g as b,o as l,c as a,a as e,b as i,w as x,u as C,i as c,_ as u,k as w,j as B}from"./entry.6ece3b7b.js";',
  'import{e as m,r as $,f as d,g as b,o as l,c as a,a as e,b as i,w as x,u as C,i as c,_ as u,k as w,j as B,h as ae}from"./entry.6ece3b7b.js";'
);

// Update PeopleWelcome
peopleJs = peopleJs.replace(
  '/images/people/people-sculpture.webp',
  '/images/shreeyog/projects/safalya-tower.webp'
);
peopleJs = peopleJs.replace('"People",-1', '"Contact",-1');
peopleJs = peopleJs.replace(
  '"Origin Objects are physical items formed within specific places.",-1',
  '"SHREEYOG BUILDERS & LAND DEVELOPERS",-1'
);
peopleJs = peopleJs.replace(
  '"Their form results from context, material, and use at the point of origin.",-1',
  '"Rooted in Trust. Crafting residential landmarks across Nashik since 1992.",-1'
);

// Update PeopleAbout (replace subtitle with dossier VNode)
const oldAboutTarget = 't[1]||(t[1]=e("p",{class:"subtitle -p-h6 -m-m",string:"split|parallax","string-split":"line","string-parallax":"0.1"},"The Assembly maintains the environments, not the work produced within them.",-1))';
const newAboutTarget = `t[1]||(t[1]=ae('${dossierHtml.replace(/'/g, "\\'")}',1))`;
if (peopleJs.includes(oldAboutTarget)) {
  peopleJs = peopleJs.replace(oldAboutTarget, newAboutTarget);
  console.log('✓ Successfully updated PeopleAbout in people.af477013.js');
} else {
  console.log('Notice: oldAboutTarget not directly found, searching substring...');
}

// Update PeopleCTA (replace figurine and cta with form VNode)
const oldCtaTarget = 'i(s,null,{default:x(()=>[i(p,{src:"/images/guys/g-3.webp","string-copy-from":"main-footer"}),o[2]||(o[2]=e("p",{class:"-h4 -m-h6 subtitle",string:"split","string-split":"line"},"Each object is tied to a specific place, which defines its origin.",-1)),e("div",q,[o[1]||(o[1]=e("span",{class:"cta-label -hp"},[e("span",null,"Commitment"),e("span",null,"Precedes"),e("span",null,"Entry /")],-1))])]),_:1})';
const newCtaTarget = `i(s,null,{default:x(()=>[o[2]||(o[2]=ae('${formHtml.replace(/'/g, "\\'")}',1))]),_:1})`;
if (peopleJs.includes(oldCtaTarget)) {
  peopleJs = peopleJs.replace(oldCtaTarget, newCtaTarget);
  console.log('✓ Successfully updated PeopleCTA in people.af477013.js');
} else {
  console.log('Notice: oldCtaTarget not directly found, searching substring...');
}

// Meta description
peopleJs = peopleJs.replace(
  'h="Connect with Shreeyog Builders & Land Developers. Reach out to our team in Nashik for project inquiries and consultation."',
  'h="Connect with Shreeyog Builders & Land Developers. Reach out to our team in Nashik for project inquiries, brochures, and site visits."'
);

fs.writeFileSync(peopleJsPath, peopleJs, 'utf8');
console.log('✓ Saved _nuxt/people.af477013.js');


// ========================================================
// 2. UPDATE HTML FILES: contact/index.html & people/index.html
// ========================================================
['contact/index.html', 'people/index.html'].forEach(relPath => {
  const filePath = path.join(basePath, relPath);
  if (!fs.existsSync(filePath)) {
    console.error('File missing:', filePath);
    return;
  }
  let html = fs.readFileSync(filePath, 'utf8');

  // Title
  html = html.replace(/<title>[^<]*<\/title>/i, '<title>Shreeyog | Contact</title>');

  // Section 1: c-welcome replacements
  html = html.replace('/images/people/people-sculpture.webp', '/images/shreeyog/projects/safalya-tower.webp');
  html = html.replace(
    /<span class="-lrg tt-red"[^>]*>People<\/span>/,
    '<span class="-lrg tt-red" style="--dx:-0.25;--dy:1;" aria-hidden="true" string="split" string-split="char[random(0,10)]" string-copy-from="people-welcome" data-v-2c3bce60>Contact</span>'
  );
  html = html.replace(
    'Origin Objects are physical items formed within specific places.',
    'SHREEYOG BUILDERS &amp; LAND DEVELOPERS'
  );
  html = html.replace(
    'Their form results from context, material, and use at the point of origin.',
    'Rooted in Trust. Crafting residential landmarks across Nashik since 1992.'
  );

  // Section 2: c-about replacements (Remove stone concept & inject dossier)
  // Replace stone image
  html = html.replace(
    '<div class="stone" string="spotlight" data-v-24d6f4e3><img src="/images/home/stone.webp" alt="Shreeyog Builders & Land Developers" data-v-24d6f4e3><span class="hover-1" data-v-24d6f4e3></span><span class="hover-2" data-v-24d6f4e3></span></div>',
    '<div class="stone" string="spotlight" data-v-24d6f4e3><img src="/images/shreeyog/projects/residential-complex.webp" alt="Shreeyog Residential Developments Nashik" data-v-24d6f4e3></div>'
  );
  // Replace stone subtitle with dossier
  html = html.replace(
    '<p class="subtitle -p-h6 -m-m" string="split|parallax" string-split="line" string-parallax="0.1" data-v-24d6f4e3>The Assembly maintains the environments, not the work produced within them.</p>',
    dossierHtml
  );

  // Section 3: c-cta replacements (Remove figurine & inject form)
  // Find <section class="c-cta" ...> ... </section>
  const ctaSectionStart = html.indexOf('<section class="c-cta"');
  if (ctaSectionStart !== -1) {
    const ctaSectionEnd = html.indexOf('</section>', ctaSectionStart) + 10;
    const newCtaSection = `<section class="c-cta" string string-repeat string-id="places-cta" string-enter-vp="top" data-v-59f76b32 data-v-599117dc><div class="-w" data-v-599117dc data-v-e764b164><!--[-->${formHtml}<!--]--></div></section>`;
    html = html.substring(0, ctaSectionStart) + newCtaSection + html.substring(ctaSectionEnd);
    console.log(`✓ Replaced c-cta section in ${relPath}`);
  }

  // Footer stone replacement
  html = html.replace(
    '<img string="lazy" string-lazy="/images/home/stone-3.webp" alt="Shreeyog Builders & Land Developers" data-v-ec47b9e2>',
    '<img string="lazy" string-lazy="/images/shreeyog/projects/safalya-tower.webp" alt="Shreeyog Builders &amp; Land Developers" data-v-ec47b9e2>'
  );

  // Inject Custom Styles in <head>
  if (html.includes('id="shreeyog-contact-custom-styles"')) {
    html = html.replace(
      /<style id="shreeyog-contact-custom-styles">[\s\S]*?<\/style>/,
      `<style id="shreeyog-contact-custom-styles">${contactCustomCss}</style>`
    );
  } else {
    html = html.replace('</head>', `<style id="shreeyog-contact-custom-styles">${contactCustomCss}</style>\n</head>`);
  }

  // Inject Script before </body>
  if (html.includes('id="shreeyog-contact-form-script"')) {
    html = html.replace(/<script id="shreeyog-contact-form-script">[\s\S]*?<\/script>/, formScript);
  } else {
    html = html.replace('</body>', `${formScript}\n</body>`);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✓ Saved updated ${relPath}`);
});
