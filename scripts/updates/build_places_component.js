const fs = require('fs');

const p = fs.readFileSync('public/projects/index.html', 'utf8');

const mainStart = p.indexOf('<main class="page-main');
const mainEnd = p.indexOf('</main>');
const mainInner = p.substring(mainStart + p.substring(mainStart).indexOf('>') + 1, mainEnd).trim();

const footerStart = p.indexOf('<footer class="page-footer');
const footerEnd = p.indexOf('</footer>', footerStart);
const footerFull = p.substring(footerStart, footerEnd + '</footer>'.length).trim();

console.log('Main inner size:', mainInner.length);
console.log('Footer full size:', footerFull.length);

// Wrap combined
const combinedHtml = `<div class="page-projects-content"><main class="page-main page-projects">${mainInner}</main>${footerFull}</div>`;

const escapedHtml = JSON.stringify(combinedHtml);

const placesJs = `import{e as Le,f as Ue,g as Xe,o as z,c as j,a as E,h as ea,b as H,_ as Be}from"./entry.6ece3b7b.js";
import{u as Wa}from"./MainFooter.a208a2b7.js";
import"./BaseImage.19cf9bf9.js";
import"./BaseButton.93919134.js";
import"./nuxt-link.4c5e524a.js";
import"./vue.f36acd1f.248a24c8.js";

const Jt="Shreeyog | Projects Portfolio";
const qt="Explore residential and commercial developments by Shreeyog Builders & Land Developers in Nashik. Discover our highlighted, completed, and ongoing architectural landmarks.";

const SY_PROJECTS_HTML = ${escapedHtml};

const qo = Le({
  __name: "places",
  setup(t) {
    Wa({
      title: () => Jt,
      description: () => qt,
      twitterCard: () => "summary_large_image",
      twitterTitle: () => Jt,
      twitterDescription: () => qt,
      twitterImage: () => "/share-screen.jpg"
    });

    Ue(() => {
      // 1. Ensure CSS
      if (!document.getElementById("shreeyog-projects-css")) {
        const link = document.createElement("link");
        link.id = "shreeyog-projects-css";
        link.rel = "stylesheet";
        link.href = "/_nuxt/shreeyog-projects.css";
        document.head.appendChild(link);
      }

      // 2. Ensure loaded & ready classes and unlock overflow
      const doc = document.documentElement;
      doc.classList.add("-loaded", "-ready");
      doc.style.overflowY = "auto";
      if (document.body) {
        document.body.style.overflowY = "auto";
      }
      const hdr = document.querySelector("header");
      if (hdr) {
        hdr.style.opacity = "1";
        hdr.style.visibility = "visible";
        hdr.style.pointerEvents = "all";
      }

      window.scrollTo(0, 0);

      // 3. Featured Slider functionality
      const items = [
        { name: "Shree Bramhand", slug: "shree-bramhand", location: "Bodhle Nagar, Nashik", status: "Ongoing", mainImage: "/images/shreeyog/slider/shree-bramhand.webp", description: "Shree Bramhand stands as a premier residential landmark in Bodhle Nagar, Nashik. Featuring expansive 2 and 3 BHK luxury residences, the project blends architectural sophistication with generous natural ventilation, premium terrace leisure decks, and state-of-the-art security." },
        { name: "Shree Vishwa", slug: "shree-vishwa", location: "Pathardi Phata, Nashik", status: "Completed", mainImage: "/images/shreeyog/slider/shree-viswa.webp", description: "Located at the coveted southern junction of Pathardi Phata, Shree Vishwa is a benchmark residential community providing effortless transit to Mumbai and Pune while offering secluded, tranquil family residences surrounded by landscaped gardens." },
        { name: "Shree Safalya", slug: "shree-safalya", location: "Gangapur Road, Nashik", status: "Ongoing", mainImage: "/images/shreeyog/slider/shree-safalya.webp", description: "Surrounded by upscale conveniences and peaceful avenues on Gangapur Road, Shree Safalya offers thoughtfully planned residential layouts balancing everyday function with modern elegance." },
        { name: "Shree Samruddhi Park", slug: "shree-samruddhi-park", location: "Nashik Road / Indira Nagar, Nashik", status: "Completed", mainImage: "/images/shreeyog/slider/shree-samruddhi-park.webp", description: "A beautifully accomplished residential development known for its quality construction, balanced proportions, and comfortable family environments." },
        { name: "Shree Venkatesh Park", slug: "shree-venkatesh", location: "Panchavati / Nashik", status: "Ongoing", mainImage: "/images/shreeyog/slider/shree-venkatesh.webp", description: "Conveniently nestled with immediate access to prominent cultural, commercial, and educational centers, offering balanced urban floor plans." },
        { name: "Shree Nath Enclave", slug: "shree-nath-enclave", location: "Mumbai Naka, Nashik", status: "Completed", mainImage: "/images/shreeyog/buildings/contemporary-avenue.webp", description: "A cornerstone residential landmark exemplifying Shreeyog's three-decade commitment to structural integrity, timely delivery, and enduring value." }
      ];

      let currentIdx = 0;
      const featImg = document.getElementById("featImg");
      const featStatus = document.getElementById("featStatus");
      const featLoc = document.getElementById("featLoc");
      const featCounter = document.getElementById("featCounter");
      const featName = document.getElementById("featName");
      const featDesc = document.getElementById("featDesc");
      const featLink = document.getElementById("featLink");
      const btnPrev = document.getElementById("featPrev");
      const btnNext = document.getElementById("featNext");

      function renderSlide(idx) {
        currentIdx = (idx + items.length) % items.length;
        const p = items[currentIdx];
        if (!featImg) return;
        featImg.style.opacity = "0.3";
        setTimeout(() => {
          featImg.src = p.mainImage;
          featImg.alt = p.name;
          featImg.style.opacity = "1";
        }, 150);

        if (featStatus) {
          featStatus.className = "featured-status-badge status-" + p.status.toLowerCase();
          featStatus.innerHTML = '<span class="status-dot"></span>' + p.status;
        }
        if (featLoc) featLoc.textContent = p.location;
        if (featCounter) featCounter.innerHTML = "<span>0" + (currentIdx + 1) + "</span> / 0" + items.length;
        if (featName) featName.textContent = p.name;
        if (featDesc) featDesc.textContent = p.description;
        if (featLink) featLink.href = "/projects/" + p.slug;
      }

      if (btnPrev && btnNext) {
        btnPrev.onclick = () => renderSlide(currentIdx - 1);
        btnNext.onclick = () => renderSlide(currentIdx + 1);
      }

      const keyHandler = (e) => {
        if (e.key === "ArrowLeft") renderSlide(currentIdx - 1);
        if (e.key === "ArrowRight") renderSlide(currentIdx + 1);
      };
      document.addEventListener("keydown", keyHandler);

      return () => {
        document.removeEventListener("keydown", keyHandler);
      };
    });

    return (_, P) => {
      return z(), j("div", { class: "page-projects-root" }, [
        ea(SY_PROJECTS_HTML, 1)
      ]);
    };
  }
});

const nr = Be(qo, [["__scopeId", "data-v-e3595c40"]]);
export { nr as default };
`;

fs.writeFileSync('public/_nuxt/places.b37ae0d8.js', placesJs, 'utf8');
console.log('Successfully updated public/_nuxt/places.b37ae0d8.js with new asymmetrical gallery and working footer! Size:', placesJs.length);
