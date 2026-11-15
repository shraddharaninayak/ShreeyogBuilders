const testPaths = [
  '/',
  '/about',
  '/about/',
  '/projects',
  '/projects/shree-vishwa',
  '/images/about/w-bg.webp',
  '/contact?test=1',
  '/places',
  '/people'
];

testPaths.forEach(p => {
  const parsed = new URL(p, 'http://localhost:3000');
  console.log(`Path: "${p}" => pathname: "${decodeURIComponent(parsed.pathname)}"`);
});
