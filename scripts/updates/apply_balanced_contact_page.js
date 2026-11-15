const fs = require('fs');
const path = require('path');

console.log('--- Applying Balanced Two-Column Shreeyog Contact Page ---');

// 1. Two-Column Suite HTML (No newlines inside attributes for clean JS injection)
const twoColumnSuiteHtml = `<div class="shreeyog-contact-two-column-suite" id="inquiry-form-section" data-v-24d6f4e3><div class="contact-dossier-column" data-v-24d6f4e3><div class="dossier-header-block" data-v-24d6f4e3><span class="dossier-eyebrow" data-v-24d6f4e3>NASHIK HEADQUARTERS</span><h2 class="dossier-company-title" data-v-24d6f4e3>Shreeyog Builders &amp; Land Developers</h2><p class="dossier-company-narrative" data-v-24d6f4e3>Since 1992, shaping residential spaces with a commitment to thoughtful planning, quality construction, and lasting value across Nashik.</p></div><div class="dossier-cards-stack" data-v-24d6f4e3><div class="dossier-card" data-v-24d6f4e3><span class="dossier-card-label" data-v-24d6f4e3>HEAD OFFICE</span><p class="dossier-card-value" data-v-24d6f4e3>101/102, Shreenath Enclave, Shreehari Kute Marg,<br data-v-24d6f4e3>Mumbai Naka, Nashik — 422 002, Maharashtra</p><a href="https://maps.google.com/?q=Mumbai+Naka+Nashik" target="_blank" rel="noopener noreferrer" class="dossier-directions-link" data-v-24d6f4e3><span data-v-24d6f4e3>Get Directions</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-24d6f4e3><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></a></div><div class="dossier-card" data-v-24d6f4e3><span class="dossier-card-label" data-v-24d6f4e3>DIRECT INQUIRIES &amp; SITE VISITS</span><p class="dossier-card-value dossier-phone-highlight" data-v-24d6f4e3><a href="tel:+919823534751" data-v-24d6f4e3>+91 98235 34751</a></p><div class="dossier-desk-list" data-v-24d6f4e3><span data-v-24d6f4e3>Office Desk: <strong data-v-24d6f4e3>0253 - 2579667</strong></span><span data-v-24d6f4e3>Direct Desk: <strong data-v-24d6f4e3>0253 - 2311112 / 2312638</strong></span></div></div><div class="dossier-card" data-v-24d6f4e3><span class="dossier-card-label" data-v-24d6f4e3>EMAIL ADVISORY</span><p class="dossier-card-value" data-v-24d6f4e3><a href="mailto:hello@shreeyogbuilders.com" data-v-24d6f4e3>hello@shreeyogbuilders.com</a></p></div><div class="dossier-card" data-v-24d6f4e3><span class="dossier-card-label" data-v-24d6f4e3>HOURS &amp; SITE VISITS</span><p class="dossier-card-value" data-v-24d6f4e3>Monday – Sunday: 10:00 AM – 7:00 PM</p><p class="dossier-card-subnote" data-v-24d6f4e3>Consultations &amp; escorted site visits available daily.</p></div></div><div class="dossier-footer-badge" data-v-24d6f4e3><span class="dossier-badge-title" data-v-24d6f4e3>B. M. KALE BUILDERS &amp; LAND DEVELOPERS</span><span class="dossier-badge-locations" data-v-24d6f4e3><span data-v-24d6f4e3>Key Landmark Locations:</span> Bodhale Nagar • Karmyogi Nagar • Tapovan Road • Gangapur Road • Khode Nagar</span></div></div><div class="contact-form-column" data-v-24d6f4e3><div class="contact-glass-card" data-v-24d6f4e3><div class="form-card-header" data-v-24d6f4e3><span class="form-card-eyebrow" data-v-24d6f4e3>CONNECT WITH US</span><h2 class="form-card-title" data-v-24d6f4e3>Schedule a Consultation</h2><p class="form-card-subtitle" data-v-24d6f4e3>Connect directly with our dedicated property advisory team in Nashik for project consultations, brochure requests, and private site visits.</p></div><form id="shreeyogContactForm" class="shreeyog-form-active" novalidate data-v-24d6f4e3><div class="form-grid-row form-grid-2col" data-v-24d6f4e3><div class="form-field-unit" data-v-24d6f4e3><label for="contactName" data-v-24d6f4e3>Full Name <span class="req-star" data-v-24d6f4e3>*</span></label><input type="text" id="contactName" name="name" placeholder="Enter your full name" required autocomplete="name" data-v-24d6f4e3 /><span class="field-error-msg" id="nameError" data-v-24d6f4e3></span></div><div class="form-field-unit" data-v-24d6f4e3><label for="contactPhone" data-v-24d6f4e3>Phone Number <span class="req-star" data-v-24d6f4e3>*</span></label><input type="tel" id="contactPhone" name="phone" placeholder="+91 98765 43210" required autocomplete="tel" data-v-24d6f4e3 /><span class="field-error-msg" id="phoneError" data-v-24d6f4e3></span></div></div><div class="form-grid-row form-grid-2col" data-v-24d6f4e3><div class="form-field-unit" data-v-24d6f4e3><label for="contactEmail" data-v-24d6f4e3>Email Address</label><input type="email" id="contactEmail" name="email" placeholder="name@example.com" autocomplete="email" data-v-24d6f4e3 /><span class="field-error-msg" id="emailError" data-v-24d6f4e3></span></div><div class="form-field-unit" data-v-24d6f4e3><label for="contactProject" data-v-24d6f4e3>Project of Interest</label><select id="contactProject" name="project" data-v-24d6f4e3><option value="All Ongoing Developments">All Ongoing Developments</option><option value="Shree Bramhand (Bodhle Nagar)">Shree Bramhand — Bodhle Nagar (2 &amp; 3 BHK)</option><option value="Shree Safalya (Karmyogi Nagar)">Shree Safalya — Karmyogi Nagar</option><option value="Shree Venkatesh Park (Khode Nagar)">Shree Venkatesh Park — Khode Nagar</option><option value="Shree Neelkanth">Shree Neelkanth</option><option value="Shree Malhar (Gangapur Road)">Shree Malhar — Gangapur Road</option><option value="Shree Nandan (Kathe Galli)">Shree Nandan — Kathe Galli</option><option value="Shree Pandurang (Tapovan Road)">Shree Pandurang — Tapovan Road</option><option value="General Consultation">General Property Consultation</option></select></div></div><div class="form-grid-row form-grid-1col" data-v-24d6f4e3><div class="form-field-unit" data-v-24d6f4e3><label for="contactMessage" data-v-24d6f4e3>Specific Requirements / Message</label><textarea id="contactMessage" name="message" rows="4" placeholder="Tell us what you are looking for (e.g. 2 BHK / 3 BHK, budget, preferred site visit date)..." data-v-24d6f4e3></textarea></div></div><div class="form-submit-block" data-v-24d6f4e3><button type="submit" id="contactSubmitBtn" class="contact-submit-action" data-v-24d6f4e3><span data-v-24d6f4e3>SUBMIT INQUIRY</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-24d6f4e3><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button></div><div id="contactFormSuccess" class="form-success-box" style="display: none;" data-v-24d6f4e3><div class="success-badge-icon" data-v-24d6f4e3><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#25d366" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-24d6f4e3><polyline points="20 6 9 17 4 12"></polyline></svg></div><h3 class="success-box-title" data-v-24d6f4e3>Thank You for Reaching Out</h3><p class="success-box-desc" id="successDetailText" data-v-24d6f4e3>Your consultation request has been recorded. Our property consultant will contact you promptly.</p><button type="button" id="resetContactFormBtn" class="reset-inquiry-btn" data-v-24d6f4e3>Submit Another Request</button></div></form></div></div></div>`;

// 2. Comprehensive Luxury Contact CSS
const contactCss = `
/* ==========================================================================
   SHREEYOG BUILDERS - BALANCED TWO-COLUMN CONTACT PAGE
   ========================================================================== */

.people-page,
body:has(.people-page) {
  background-color: #151415 !important;
  color: #f1eade !important;
  overflow-x: hidden !important;
}

/* 1. HERO SECTION (.c-welcome) */
.c-welcome {
  background-color: #151415 !important;
  color: #ffffff !important;
  min-height: 80vh !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  position: relative !important;
  overflow: hidden !important;
  padding-top: clamp(6rem, 10vw, 9rem) !important;
  padding-bottom: clamp(3rem, 5vw, 4.5rem) !important;
  box-sizing: border-box !important;
}

.c-welcome .figure-sculpture {
  position: absolute !important;
  inset: 0 !important;
  z-index: 1 !important;
  opacity: 0.35 !important;
  pointer-events: none !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.c-welcome .figure-sculpture figure {
  width: min(650px, 90vw) !important;
  height: min(750px, 80vh) !important;
  margin: 0 auto !important;
  border-radius: 350px 350px 0 0 !important;
  overflow: hidden !important;
  position: relative !important;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.8) !important;
}

.c-welcome .figure-sculpture figure img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center 30% !important;
  filter: brightness(0.65) contrast(1.15) !important;
}

.c-welcome .figure-sculpture:after {
  content: "" !important;
  position: absolute !important;
  inset: 0 !important;
  background: radial-gradient(circle at 50% 50%, rgba(21, 20, 21, 0.2) 0%, rgba(21, 20, 21, 0.85) 75%, #151415 100%) !important;
  pointer-events: none !important;
}

.c-welcome .-w {
  position: relative !important;
  z-index: 10 !important;
  width: 100% !important;
  max-width: 1200px !important;
  margin: 0 auto !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  text-align: center !important;
  padding: 0 1.5rem !important;
}

.c-welcome .-w .tt-red {
  display: block !important;
  font-family: var(--font-b-regular), "Cormorant Garamond", Georgia, serif !important;
  font-size: clamp(3.2rem, 8vw, 7.5rem) !important;
  font-weight: 300 !important;
  letter-spacing: -0.02em !important;
  line-height: 1 !important;
  color: #ffffff !important;
  text-transform: uppercase !important;
  margin-bottom: 1.2rem !important;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.7) !important;
}

.c-welcome .-w .tt-red:after {
  display: none !important;
}

.c-welcome .-w .tt-1 {
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: clamp(0.75rem, 0.9vw, 0.95rem) !important;
  letter-spacing: 0.22em !important;
  text-transform: uppercase !important;
  color: #c6a76a !important;
  margin-bottom: 0.6rem !important;
}

.c-welcome .-w .tt-2 {
  font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif !important;
  font-size: clamp(0.9rem, 1.1vw, 1.15rem) !important;
  letter-spacing: 0.04em !important;
  color: rgba(241, 234, 222, 0.75) !important;
  max-width: 620px !important;
  line-height: 1.6 !important;
  margin: 0 auto !important;
}

.c-welcome .people-welcome-path {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 2 !important;
  pointer-events: none !important;
  opacity: 0.25 !important;
}

/* 2. MAIN TWO-COLUMN CONTACT SECTION (.c-about) */
.c-about {
  background-color: #151415 !important;
  color: #f1eade !important;
  position: relative !important;
  z-index: 20 !important;
  padding: clamp(2rem, 5vw, 4rem) 0 clamp(4rem, 8vw, 8rem) 0 !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

/* Eliminate the problematic black mountain underlay mask */
.c-about .underlay {
  display: none !important;
  background-color: transparent !important;
  mask-image: none !important;
  -webkit-mask-image: none !important;
}

.c-about .stone {
  display: none !important;
}

.c-about .people-about-path {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 1 !important;
  pointer-events: none !important;
  opacity: 0.12 !important;
}

/* Unbind Obsidian's 12-column grid container */
.c-about .-w {
  display: block !important;
  width: 100% !important;
  max-width: 1360px !important;
  margin: 0 auto !important;
  padding: 0 clamp(1.5rem, 4vw, 3.5rem) !important;
  box-sizing: border-box !important;
  position: relative !important;
  z-index: 10 !important;
}

.c-about .-w > * {
  grid-column: auto !important;
  grid-row: auto !important;
  width: 100% !important;
  max-width: 100% !important;
}

/* Two Column Layout Suite */
.shreeyog-contact-two-column-suite {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr) !important;
  gap: clamp(2.5rem, 5vw, 5rem) !important;
  align-items: start !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

/* --- LEFT COLUMN: CONTACT INFORMATION --- */
.contact-dossier-column {
  display: flex !important;
  flex-direction: column !important;
  gap: 2rem !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

.dossier-header-block {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.75rem !important;
  border-bottom: 1px solid rgba(198, 167, 106, 0.25) !important;
  padding-bottom: 1.8rem !important;
}

.dossier-eyebrow {
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: 0.75rem !important;
  letter-spacing: 0.22em !important;
  text-transform: uppercase !important;
  color: #c6a76a !important;
  font-weight: 500 !important;
}

.dossier-company-title {
  font-family: var(--font-b-regular), "Cormorant Garamond", Georgia, serif !important;
  font-size: clamp(2rem, 3vw, 2.75rem) !important;
  font-weight: 400 !important;
  line-height: 1.15 !important;
  color: #ffffff !important;
  letter-spacing: -0.01em !important;
  margin: 0 !important;
}

.dossier-company-narrative {
  font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif !important;
  font-size: clamp(0.88rem, 1vw, 1.05rem) !important;
  line-height: 1.65 !important;
  color: rgba(241, 234, 222, 0.75) !important;
  margin: 0 !important;
}

.dossier-cards-stack {
  display: flex !important;
  flex-direction: column !important;
  gap: 1.6rem !important;
}

.dossier-card {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.45rem !important;
  padding-bottom: 1.4rem !important;
  border-bottom: 1px solid rgba(241, 234, 222, 0.08) !important;
}

.dossier-card:last-child {
  border-bottom: none !important;
  padding-bottom: 0 !important;
}

.dossier-card-label {
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: 0.72rem !important;
  letter-spacing: 0.18em !important;
  text-transform: uppercase !important;
  color: #c6a76a !important;
}

.dossier-card-value {
  font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif !important;
  font-size: clamp(0.95rem, 1.05vw, 1.15rem) !important;
  line-height: 1.55 !important;
  color: #ffffff !important;
  margin: 0 !important;
}

.dossier-card-value a {
  color: #ffffff !important;
  text-decoration: none !important;
  transition: color 0.3s ease !important;
}

.dossier-card-value a:hover {
  color: #c6a76a !important;
}

.dossier-phone-highlight a {
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: clamp(1.2rem, 1.5vw, 1.45rem) !important;
  color: #c6a76a !important;
  letter-spacing: 0.02em !important;
}

.dossier-phone-highlight a:hover {
  color: #ffffff !important;
}

.dossier-desk-list {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.25rem !important;
  font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif !important;
  font-size: 0.88rem !important;
  color: rgba(241, 234, 222, 0.65) !important;
  margin-top: 0.25rem !important;
}

.dossier-desk-list strong {
  color: rgba(241, 234, 222, 0.85) !important;
  font-weight: 500 !important;
}

.dossier-card-subnote {
  font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif !important;
  font-size: 0.82rem !important;
  color: rgba(241, 234, 222, 0.55) !important;
  line-height: 1.5 !important;
  margin: 0 !important;
}

.dossier-directions-link {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.45rem !important;
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: 0.78rem !important;
  letter-spacing: 0.12em !important;
  text-transform: uppercase !important;
  color: #c6a76a !important;
  text-decoration: none !important;
  margin-top: 0.4rem !important;
  transition: all 0.3s ease !important;
  align-self: flex-start !important;
}

.dossier-directions-link:hover {
  color: #ffffff !important;
  transform: translateX(3px) !important;
}

.dossier-footer-badge {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.6rem !important;
  margin-top: 1rem !important;
  padding: 1.4rem 1.6rem !important;
  background: rgba(255, 255, 255, 0.02) !important;
  border: 1px solid rgba(198, 167, 106, 0.18) !important;
  border-radius: 12px !important;
}

.dossier-badge-title {
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: 0.76rem !important;
  letter-spacing: 0.16em !important;
  text-transform: uppercase !important;
  color: #c6a76a !important;
}

.dossier-badge-locations {
  font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif !important;
  font-size: 0.8rem !important;
  line-height: 1.6 !important;
  color: rgba(241, 234, 222, 0.65) !important;
}

.dossier-badge-locations span {
  color: rgba(241, 234, 222, 0.9) !important;
  font-weight: 500 !important;
}

/* --- RIGHT COLUMN: CONTACT & CONSULTATION FORM --- */
.contact-form-column {
  width: 100% !important;
  box-sizing: border-box !important;
}

.contact-glass-card {
  background: rgba(255, 255, 255, 0.025) !important;
  border: 1px solid rgba(198, 167, 106, 0.22) !important;
  border-radius: 16px !important;
  padding: clamp(2rem, 3.5vw, 3.2rem) !important;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

.form-card-header {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.5rem !important;
  margin-bottom: 2rem !important;
}

.form-card-eyebrow {
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: 0.75rem !important;
  letter-spacing: 0.2em !important;
  text-transform: uppercase !important;
  color: #c6a76a !important;
}

.form-card-title {
  font-family: var(--font-b-regular), "Cormorant Garamond", Georgia, serif !important;
  font-size: clamp(1.9rem, 2.6vw, 2.6rem) !important;
  font-weight: 400 !important;
  line-height: 1.15 !important;
  color: #ffffff !important;
  margin: 0 !important;
  letter-spacing: -0.01em !important;
}

.form-card-subtitle {
  font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif !important;
  font-size: clamp(0.85rem, 0.95vw, 1rem) !important;
  line-height: 1.55 !important;
  color: rgba(241, 234, 222, 0.7) !important;
  margin: 0 !important;
}

/* Active Form Elements */
.shreeyog-form-active {
  display: flex !important;
  flex-direction: column !important;
  gap: 1.4rem !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

.form-grid-row {
  display: grid !important;
  gap: 1.25rem !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

.form-grid-2col {
  grid-template-columns: repeat(2, 1fr) !important;
}

.form-grid-1col {
  grid-template-columns: 1fr !important;
}

.form-field-unit {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.45rem !important;
  position: relative !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

.form-field-unit label {
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: 0.74rem !important;
  letter-spacing: 0.12em !important;
  text-transform: uppercase !important;
  color: rgba(241, 234, 222, 0.85) !important;
}

.form-field-unit label .req-star {
  color: #c6a76a !important;
  margin-left: 2px !important;
}

.form-field-unit input,
.form-field-unit select,
.form-field-unit textarea {
  width: 100% !important;
  background: rgba(0, 0, 0, 0.4) !important;
  border: 1px solid rgba(241, 234, 222, 0.18) !important;
  border-radius: 8px !important;
  padding: 0.85rem 1.1rem !important;
  font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif !important;
  font-size: clamp(0.88rem, 0.95vw, 1rem) !important;
  color: #ffffff !important;
  box-sizing: border-box !important;
  transition: all 0.3s ease !important;
  outline: none !important;
}

.form-field-unit input::placeholder,
.form-field-unit textarea::placeholder {
  color: rgba(241, 234, 222, 0.35) !important;
}

.form-field-unit input:focus,
.form-field-unit select:focus,
.form-field-unit textarea:focus {
  border-color: #c6a76a !important;
  background: rgba(0, 0, 0, 0.65) !important;
  box-shadow: 0 0 0 3px rgba(198, 167, 106, 0.22) !important;
}

.form-field-unit select {
  appearance: none !important;
  -webkit-appearance: none !important;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23c6a76a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") !important;
  background-repeat: no-repeat !important;
  background-position: right 1rem center !important;
  background-size: 1.1rem !important;
  padding-right: 2.5rem !important;
  cursor: pointer !important;
}

.form-field-unit select option {
  background-color: #1a181a !important;
  color: #ffffff !important;
  padding: 0.6rem !important;
}

.form-field-unit textarea {
  min-height: 110px !important;
  resize: vertical !important;
  line-height: 1.5 !important;
}

.field-error-msg {
  font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif !important;
  font-size: 0.75rem !important;
  color: #ff6b6b !important;
  min-height: 1rem !important;
  display: block !important;
  margin-top: 0.15rem !important;
}

/* Submit Button */
.form-submit-block {
  display: flex !important;
  margin-top: 0.8rem !important;
}

.contact-submit-action {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.75rem !important;
  padding: 1rem 2.5rem !important;
  background: #c6a76a !important;
  color: #151415 !important;
  border: none !important;
  border-radius: 9999px !important;
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: 0.82rem !important;
  letter-spacing: 0.16em !important;
  text-transform: uppercase !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: all 0.35s ease !important;
  box-shadow: 0 10px 25px rgba(198, 167, 106, 0.2) !important;
}

.contact-submit-action:hover {
  background: #ffffff !important;
  color: #151415 !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 15px 35px rgba(255, 255, 255, 0.25) !important;
}

.contact-submit-action:active {
  transform: translateY(0) !important;
}

.contact-submit-action svg {
  transition: transform 0.3s ease !important;
}

.contact-submit-action:hover svg {
  transform: translateX(4px) !important;
}

/* Success State Box */
.form-success-box {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  text-align: center !important;
  gap: 1rem !important;
  padding: 2.5rem 1.5rem !important;
}

.success-badge-icon {
  width: 58px !important;
  height: 58px !important;
  border-radius: 50% !important;
  background: rgba(37, 211, 102, 0.15) !important;
  border: 1px solid rgba(37, 211, 102, 0.35) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.success-box-title {
  font-family: var(--font-b-regular), "Cormorant Garamond", Georgia, serif !important;
  font-size: clamp(1.8rem, 2.5vw, 2.4rem) !important;
  color: #ffffff !important;
  margin: 0 !important;
  font-weight: 400 !important;
}

.success-box-desc {
  font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif !important;
  font-size: 0.95rem !important;
  line-height: 1.6 !important;
  color: rgba(241, 234, 222, 0.8) !important;
  max-width: 480px !important;
  margin: 0 !important;
}

.reset-inquiry-btn {
  margin-top: 1rem !important;
  background: transparent !important;
  border: 1px solid rgba(198, 167, 106, 0.4) !important;
  color: #c6a76a !important;
  padding: 0.6rem 1.6rem !important;
  border-radius: 9999px !important;
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: 0.78rem !important;
  letter-spacing: 0.14em !important;
  text-transform: uppercase !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
}

.reset-inquiry-btn:hover {
  background: rgba(198, 167, 106, 0.15) !important;
  border-color: #c6a76a !important;
  color: #ffffff !important;
}

/* 3. SECTION 3 (.c-cta) - HIDDEN TO PREVENT EMPTY VOIDS */
.c-cta {
  display: none !important;
  padding: 0 !important;
  margin: 0 !important;
  height: 0 !important;
  overflow: hidden !important;
}

/* 4. RESPONSIVE BREAKPOINTS */
@media (max-width: 1023px) {
  .shreeyog-contact-two-column-suite {
    grid-template-columns: 1fr !important;
    gap: 3.5rem !important;
  }
  .contact-form-column {
    margin-top: 0.5rem !important;
  }
}

@media (max-width: 680px) {
  .form-grid-2col {
    grid-template-columns: 1fr !important;
  }
  .contact-submit-action {
    width: 100% !important;
  }
  .contact-glass-card {
    padding: 1.5rem !important;
  }
}
`;

// 3. Form Interactive Script
const formScript = `
<script id="shreeyog-contact-form-script">
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

    if (!form) return;
    if (form.__inited) return;
    form.__inited = true;

    // Header Send Request button scrolls smoothly to form
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

      var originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
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
          successDetail.textContent = 'Thank you, ' + nameVal + '. Your consultation request has been recorded. Our property consultant will contact you at ' + phoneVal + ' promptly.';
        }

        // Hide form rows, show success banner
        var rows = form.querySelectorAll('.form-grid-row, .form-submit-block');
        rows.forEach(function(r) { r.style.display = 'none'; });
        if (successBox) successBox.style.display = 'flex';

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }, 500);
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        form.reset();
        var rows = form.querySelectorAll('.form-grid-row, .form-submit-block');
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

// =========================================================================
// 1. SAVE CSS FILES
// =========================================================================
fs.writeFileSync('public/_nuxt/shreeyog-contact.css', contactCss, 'utf8');
console.log('✓ Created public/_nuxt/shreeyog-contact.css');

// Append to people.39d410f5.css so client routing loads it automatically
let peopleCss = fs.readFileSync('public/_nuxt/people.39d410f5.css', 'utf8');
const marker = '/* SHREEYOG BALANCED TWO COLUMN */';
if (peopleCss.includes(marker)) {
  const parts = peopleCss.split(marker);
  peopleCss = parts[0] + marker + '\n' + contactCss;
} else {
  peopleCss += '\n' + marker + '\n' + contactCss;
}
fs.writeFileSync('public/_nuxt/people.39d410f5.css', peopleCss, 'utf8');
console.log('✓ Updated public/_nuxt/people.39d410f5.css');


// =========================================================================
// 2. UPDATE CLIENT HYDRATION COMPONENT: public/_nuxt/people.af477013.js
// =========================================================================
let peopleJs = fs.readFileSync('public/_nuxt/people.af477013.js', 'utf8');

// Ensure import includes h as ae
if (!peopleJs.includes(',h as ae')) {
  peopleJs = peopleJs.replace(
    'import{e as m,r as $,f as d,g as b,o as l,c as a,a as e,b as i,w as x,u as C,i as c,_ as u,k as w,j as B}from"./entry.6ece3b7b.js";',
    'import{e as m,r as $,f as d,g as b,o as l,c as a,a as e,b as i,w as x,u as C,i as c,_ as u,k as w,j as B,h as ae}from"./entry.6ece3b7b.js";'
  );
}

// In PeopleAbout (U), replace rendering with the full twoColumnSuiteHtml static VNode
// Let's locate the return statement in U
const uSetupRegex = /U=m\(\{__name:"PeopleAbout",[\s\S]*?\(p,t\)=>\{const s=f;return l\(\),a\("section",E,\[[\s\S]*?\]\)\}\}\);const z=u\(U,/;
const newUComponent = `U=m({__name:"PeopleAbout",setup(g){return d(()=>{}),b(()=>{}),(p,t)=>{return l(),a("section",E,[t[1]||(t[1]=ae('${twoColumnSuiteHtml.replace(/'/g, "\\'")}',1))])}}});const z=u(U,`;

if (uSetupRegex.test(peopleJs)) {
  peopleJs = peopleJs.replace(uSetupRegex, newUComponent);
  console.log('✓ Successfully updated PeopleAbout in people.af477013.js');
} else {
  console.log('Warning: uSetupRegex did not match directly, trying fallback replacement...');
  // Fallback: replace the inner children of PeopleAbout
  const oldAboutSlice = peopleJs.match(/U=m\(\{__name:"PeopleAbout"[\s\S]*?const z=u\(U,/);
  if (oldAboutSlice) {
    peopleJs = peopleJs.replace(oldAboutSlice[0], newUComponent);
    console.log('✓ Fallback replaced PeopleAbout in people.af477013.js');
  }
}

// In PeopleCTA (H), make it render empty so no duplicate form exists
const hSetupRegex = /H=m\(\{__name:"PeopleCTA",[\s\S]*?\(r,o\)=>\{[\s\S]*?\}\}\);const J=u\(H,/;
const newHComponent = `H=m({__name:"PeopleCTA",setup(g){return d(()=>{}),b(()=>{}),(r,o)=>{return l(),a("div",{class:"c-cta-hidden",style:"display:none;"},[])}}});const J=u(H,`;

if (hSetupRegex.test(peopleJs)) {
  peopleJs = peopleJs.replace(hSetupRegex, newHComponent);
  console.log('✓ Successfully updated PeopleCTA in people.af477013.js');
}

fs.writeFileSync('public/_nuxt/people.af477013.js', peopleJs, 'utf8');
console.log('✓ Saved public/_nuxt/people.af477013.js');


// =========================================================================
// 3. UPDATE STATIC HTML FILES
// =========================================================================
const htmlFiles = [
  'public/contact/index.html',
  'public/people/index.html',
  'pages/contact.html'
];

htmlFiles.forEach(relPath => {
  if (!fs.existsSync(relPath)) {
    console.log('File not found:', relPath);
    return;
  }
  let html = fs.readFileSync(relPath, 'utf8');

  // Page Title
  html = html.replace(/<title>[^<]*<\/title>/i, '<title>Contact &amp; Consultations | Shreeyog Builders &amp; Land Developers</title>');

  // Section 1: c-welcome replacements
  html = html.replace(
    /<span class="-lrg tt-red"[^>]*>[^<]*<\/span>/,
    '<span class="-lrg tt-red" style="--dx:-0.25;--dy:1;" aria-hidden="true" string="split" string-split="char[random(0,10)]" string-copy-from="people-welcome" data-v-2c3bce60>Contact</span>'
  );
  html = html.replace(
    /<p class="-up -m-mm tt-1 -tac"[^>]*>[\s\S]*?<\/p>/,
    '<p class="-up -m-mm tt-1 -tac" string="split" string-split="line" string-copy-from="people-welcome" data-v-2c3bce60>SHREEYOG BUILDERS &amp; LAND DEVELOPERS</p>'
  );
  html = html.replace(
    /<p class="-up -m-mm tt-2 -tac"[^>]*>[\s\S]*?<\/p>/,
    '<p class="-up -m-mm tt-2 -tac" string="split" string-split="line" string-copy-from="people-welcome" data-v-2c3bce60>Rooted in Trust. Crafting residential landmarks across Nashik since 1992.</p>'
  );

  // Section 2: c-about replacements -> Place full 2-column layout here!
  const aboutStart = html.indexOf('<section class="c-about"');
  if (aboutStart !== -1) {
    const aboutEnd = html.indexOf('</section>', aboutStart) + 10;
    const newAboutSection = `<section class="c-about" string string-repeat string-id="people-about" string-enter-vp="top" data-header-color="light" data-v-59f76b32 data-v-24d6f4e3><div class="-w" string="progress" data-v-24d6f4e3 data-v-e764b164><!--[-->${twoColumnSuiteHtml}<!--]--></div></section>`;
    html = html.substring(0, aboutStart) + newAboutSection + html.substring(aboutEnd);
    console.log('✓ Replaced c-about with two-column suite in ' + relPath);
  }

  // Section 3: c-cta replacements -> Empty / hidden
  const ctaStart = html.indexOf('<section class="c-cta"');
  if (ctaStart !== -1) {
    const ctaEnd = html.indexOf('</section>', ctaStart) + 10;
    const newCtaSection = `<section class="c-cta" style="display:none;" data-v-59f76b32 data-v-599117dc></section>`;
    html = html.substring(0, ctaStart) + newCtaSection + html.substring(ctaEnd);
    console.log('✓ Hidden c-cta in ' + relPath);
  }

  // Inject or update Custom Styles in <head>
  const customStylesTag = `<style id="shreeyog-contact-custom-styles">${contactCss}</style>`;
  if (html.includes('id="shreeyog-contact-custom-styles"')) {
    html = html.replace(/<style id="shreeyog-contact-custom-styles">[\s\S]*?<\/style>/, customStylesTag);
  } else {
    html = html.replace('</head>', `${customStylesTag}\n</head>`);
  }

  // Ensure link to shreeyog-contact.css is also in <head>
  if (!html.includes('shreeyog-contact.css')) {
    html = html.replace('</head>', `<link rel="stylesheet" href="/_nuxt/shreeyog-contact.css">\n</head>`);
  }

  // Inject Form Script before </body>
  if (html.includes('id="shreeyog-contact-form-script"')) {
    html = html.replace(/<script id="shreeyog-contact-form-script">[\s\S]*?<\/script>/, formScript);
  } else {
    html = html.replace('</body>', `${formScript}\n</body>`);
  }

  fs.writeFileSync(relPath, html, 'utf8');
  console.log('✓ Successfully wrote ' + relPath);
});

console.log('--- All Contact Updates Complete ---');
