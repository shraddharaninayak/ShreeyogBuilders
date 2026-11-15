const fs = require('fs');

console.log('=== SYNCHRONIZING NAVBAR & FOOTER ACROSS ALL HTML PAGES ===');

const headerHtml = `<header class="" data-v-81ce8483><div class="-w" data-v-81ce8483 data-v-e764b164><!--[--><a href="/" class="-nl" data-v-81ce8483><img src="/images/shreeyog/logo-hero.png" alt="Shreeyog Builders &amp; Land Developers" class="shreeyog-brand-logo" data-v-81ce8483></a><!----><!--[--><!----><a href="/places" class="button -p -m-m -reverse places" aria-label title data-v-f52f19c3><span class="text -mm -up" string="split" string-split="char[center]" data-v-f52f19c3>Projects</span><!--[--><!--]--></a><!--]--><span class="sep" data-v-81ce8483></span><!--[--><!----><a href="/about" class="button -p -m-m -reverse objects about" aria-label title data-v-f52f19c3><span class="text -mm -up" string="split" string-split="char[center]" data-v-f52f19c3>About</span><!--[--><!--]--></a><!--]--><!--[--><button aria-label="" title="" class="-reverse request button -p -m-m" data-v-f52f19c3><span class="text -mm -up" string="split" string-split="char[center]" data-v-f52f19c3>send request</span><!--[--><!--]--></button><!----><!--]--><div class="menu-wrap" data-v-81ce8483><!--[--><button aria-label="" title="" class="menu button -p -m-m" data-v-f52f19c3><span class="text -mm -up" string="split" string-split="char[center]" data-v-f52f19c3>Menu</span><!--[--><span class="menu-icon" data-v-81ce8483 data-v-f52f19c3-s></span><!--]--></button><!----><!--]--></div><!--]--></div></header>`;

const footerNavHtml = `<nav data-v-a41b36d1><a href="/" class="-h0 -mid-h1 -m-h2 -nl places" string="split" string-split="char" data-v-a41b36d1>Home</a><a href="/about" class="-h0 -mid-h1 -m-h2 -nl objects" string="split" string-split="char" data-v-a41b36d1>About</a><a href="/places" class="-h0 -mid-h1 -m-h2 -nl about" string="split" string-split="char" data-v-a41b36d1>Projects</a><a href="/people" class="-h0 -mid-h1 -m-h2 -nl people" string="split" string-split="char" data-v-a41b36d1>Contact</a></nav>`;

const fullFooterHtml = (pageId) => `<footer class="page-footer" string="progress" string-self-disable string-id="main-footer-${pageId}" string-enter-vp="bottom" string-exit-vp="bottom" data-v-a41b36d1><span class="underlay" data-v-a41b36d1></span><div class="-w block" data-v-a41b36d1 data-v-e764b164><!--[--><span class="-hp independent" data-v-a41b36d1>Building spaces that inspire better living, across generations.</span><span class="-h4 -m-h6 operating" data-v-a41b36d1><span data-v-a41b36d1>Rooted in Trust.</span><span data-v-a41b36d1>Built for Generations.</span></span>${footerNavHtml}<span class="-m copy" data-v-a41b36d1>© <span data-v-a41b36d1>2026</span> Shreeyog. All Rights Reserved.</span><span class="-m expression" data-v-a41b36d1>Shreeyog Builders &amp; Land Developers. Creating spaces with purpose since 1992.</span><!--]--></div><div class="-w after" data-v-a41b36d1 data-v-e764b164><!--[--><a href="/" class="-nl" string-copy-from="main-footer-${pageId}" data-v-a41b36d1><img src="/images/shreeyog/logo-hero.png" alt="Shreeyog Builders &amp; Land Developers" class="footer-shreeyog-brand-logo" data-v-a41b36d1></a><div class="ip-1 footer-centre-col" string-copy-from="main-footer-${pageId}" data-v-a41b36d1><span class="footer-shreeyog-title" data-v-a41b36d1>Shreeyog</span><span class="footer-shreeyog-sub" data-v-a41b36d1>Builders &amp; Land Developers</span><p class="footer-shreeyog-desc" data-v-a41b36d1>Building with trust, creating spaces for generations.</p></div><p class="-m ip-2" string-copy-from="main-footer-${pageId}" data-v-a41b36d1>Since 1992, Shreeyog has been shaping residential spaces with a commitment to thoughtful planning, quality construction and lasting relationships. Every project reflects our belief in building homes that stand the test of time.</p><!--]--></div><figure class="stone-3" string-copy-from="main-footer-${pageId}" data-v-a41b36d1 data-v-ec47b9e2><img string="lazy" string-lazy="/images/home/stone-3.webp" alt="Shree Safalya - Shreeyog Builders" data-v-ec47b9e2><!----></figure></footer>`;

const pages = [
  { file: 'obsidianassembly.com/index.html', id: 'index' },
  { file: 'obsidianassembly.com/about/index.html', id: 'about' },
  { file: 'obsidianassembly.com/places/index.html', id: 'places' },
  { file: 'obsidianassembly.com/people/index.html', id: 'people' },
  { file: 'obsidianassembly.com/projects/index.html', id: 'places' },
  { file: 'obsidianassembly.com/contact/index.html', id: 'people' }
];

for (const p of pages) {
  if (fs.existsSync(p.file)) {
    let html = fs.readFileSync(p.file, 'utf8');

    // 1. Replace or insert header
    if (html.includes('<header')) {
      html = html.replace(/<header[\s\S]*?<\/header>/, headerHtml);
    }

    // 2. Replace or insert footer
    if (html.includes('<footer')) {
      // Replace nav in existing footer
      html = html.replace(/<nav data-v-a41b36d1>[\s\S]*?<\/nav>/, footerNavHtml);
      // Remove any lingering services
      html = html.replace(/<a[^>]*class="[^"]*contacts[^"]*"[^>]*>Services<\/a>/g, '');
    } else {
      // If page was missing footer and header (like about/index.html), insert before loader/script
      if (html.includes('<div class="t">') && html.includes('about-page')) {
        const insertPoint = html.indexOf('<div class="t">');
        const footerAndHeader = fullFooterHtml(p.id) + '</main><!--[-->' + headerHtml;
        html = html.substring(0, insertPoint) + footerAndHeader + html.substring(insertPoint);
      }
    }

    // 3. Ensure header is present
    if (!html.includes('<header')) {
      const bodyEnd = html.indexOf('</body>');
      if (bodyEnd !== -1) {
        html = html.substring(0, bodyEnd) + headerHtml + html.substring(bodyEnd);
      }
    }

    fs.writeFileSync(p.file, html, 'utf8');
    console.log(`Synced: ${p.file}`);
  }
}

console.log('=== FINISHED SYNC ===');
