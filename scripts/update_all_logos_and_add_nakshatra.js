const fs = require('fs');

const projects = require('../data/projects.js');

// 1. Update missing logos
const logoUpdates = {
  'shree-bramhand': '/images/shreeyog/logos/shree-bramhand-logo-transparent.png',
  'shree-vishwa': '/images/shreeyog/logos/shree-vishwa-logo.png',
  'shree-safalya': '/images/shreeyog/logos/shree-safalya-logo.png',
  'shree-samruddhi-park': '/images/shreeyog/logos/shree-samruddhi-park-logo.png',
  'shree-venkatesh': '/images/shreeyog/logos/shree-venkatesh-park-logo.png'
};

projects.forEach(p => {
  if (logoUpdates[p.slug]) {
    p.logo = logoUpdates[p.slug];
    console.log(`Updated logo for ${p.name}: ${p.logo}`);
  }
});

// 2. Add Shree Nakshatra if not already present
let nakshatra = projects.find(p => p.slug === 'shree-nakshatra');
if (!nakshatra) {
  nakshatra = {
    id: 17,
    name: 'Shree Nakshatra',
    slug: 'shree-nakshatra',
    location: 'Takali Road, near Ashoka Marg, Nashik',
    status: 'Completed',
    featured: false,
    typology: '2 BHK Apartment',
    rera: 'Completed Project',
    mainImage: '/images/shreeyog/slider/shree-nakshatra.webp',
    gallery: [
      '/images/shreeyog/slider/shree-nakshatra.webp',
      '/projects/shree-nakshatra/brochure/assets/page-3.webp',
      '/projects/shree-nakshatra/brochure/assets/page-2.webp',
      '/projects/shree-nakshatra/brochure/assets/page-4.webp'
    ],
    tagline: 'A Glimmer of your own.. A Space Called HOME..!!',
    description: 'Situated along Takali Road near Ashoka Marg and Bodhale Nagar in Nashik, Shree Nakshatra offers 16 exclusive 2 BHK apartments across G + 4 floors. Featuring private balconies, high-speed lift, 24-hour dual municipal/borewell water supply, pre-installed cable/telephone points, and allotted covered stilt parking.',
    overview: 'Shree Nakshatra is designed for those seeking superior architectural design, resilient engineering, and luxury with economy. Offers spacious cross-ventilated suites, full Vastu compliance, and rapid transit access to both Mumbai-Agra NH-3 and Nashik-Pune Highway.',
    specifications: [
      {
        category: 'Structure',
        detail: 'Earthquake-resistant R.C.C. frame structure designed strictly as per IS standards.'
      },
      {
        category: 'Brick Work',
        detail: 'External walls 6" thick and internal partition walls 4.5" thick brickwork.'
      },
      {
        category: 'Flooring',
        detail: "Good quality 2' x 2' Vitrified (Johnson) tile flooring for entire flat."
      },
      {
        category: 'Kitchen',
        detail: 'Granite L-Shape kitchen platform (G20) & stainless steel sink with full-height glazed tile dado.'
      },
      {
        category: 'Windows',
        detail: '3-track powder-coated aluminium sliding windows with Mosquito Net, M. S. safety grill & marble frame.'
      },
      {
        category: 'Plaster & Paint',
        detail: 'Double-coat external plaster with semi-acrylic paint; Neeru-finish internal plaster with Asian Oil Bound Distemper paint.'
      },
      {
        category: 'Doors',
        detail: 'Main door with brass fittings, Night latch and Safety door; All internal doors & frames with elegant laminate.'
      },
      {
        category: 'Bath / Toilet',
        detail: 'Full-height designer glazed tiles in bathroom & toilet with concealed plumbing and wall mixer; PVC doors with marble frames.'
      },
      {
        category: 'Electrification',
        detail: 'Concealed electrification for entire flat with modular switches and adequate light/fan points.'
      },
      {
        category: 'Water Supply',
        detail: '24 hours water supply with dual connections from Municipal mains and on-site borewell with storage tanks.'
      },
      {
        category: 'Parking',
        detail: 'Allotted covered stilt car parking space on ground floor for each flat.'
      },
      {
        category: 'Media & Comms',
        detail: 'Pre-installed television cable and telephone connection lines in living room.'
      }
    ],
    amenities: [
      'Allotted Covered Stilt Car Parking Space for Each Flat',
      'Modern High-Speed Passenger Elevator (5\'0" x 5\'0") with Battery Backup',
      '24-Hour Dual Water Supply (Municipal Mains & On-Site Borewell)',
      'Pre-Installed Television Cable & Telephone Wiring in Living Room',
      'Decorative Main Door with Brass Fittings, Night Latch & Safety Door',
      'Polished Granite L-Shape Kitchen Platform (G20) with Glazed Tile Dado',
      '3-Track Powder-Coated Aluminium Windows with Mosquito Net & MS Grills',
      'Earthquake-Resistant R.C.C. Frame Engineering with Double-Coat Plaster'
    ],
    highlights: [
      'Located on Takali Road near Ashoka Marg, Kathe Galli & Bodhale Nagar',
      'Direct arterial transit to Mumbai-Agra NH-3 and Nashik-Pune Highway',
      '16 exclusive 2 BHK apartments across Ground Stilt + 4 Floors',
      '100% Vastu-compliant layouts with private living balconies',
      'Crafted by Shreeyog Builders & Land Developers (Since 1992)'
    ],
    logo: '/images/shreeyog/logos/shree-nakshatra-logo.png',
    brochure: '/projects/shree-nakshatra/brochure/',
    brochureUrl: '/projects/shree-nakshatra/brochure/',
    brochurePdf: '/brochures/shree-nakshatra-brochure.pdf'
  };
  projects.push(nakshatra);
  console.log('Added Shree Nakshatra (id: 17) to projects array.');
} else {
  nakshatra.logo = '/images/shreeyog/logos/shree-nakshatra-logo.png';
  nakshatra.brochure = '/projects/shree-nakshatra/brochure/';
  nakshatra.brochureUrl = '/projects/shree-nakshatra/brochure/';
  nakshatra.brochurePdf = '/brochures/shree-nakshatra-brochure.pdf';
  nakshatra.mainImage = '/images/shreeyog/slider/shree-nakshatra.webp';
}

// 3. Write data/projects.js and public/data/projects.json
const jsOutput = 'module.exports = ' + JSON.stringify(projects, null, 2) + ';\n';
fs.writeFileSync('data/projects.js', jsOutput, 'utf8');
fs.writeFileSync('public/data/projects.json', JSON.stringify(projects, null, 2), 'utf8');
console.log(`Successfully saved data/projects.js and public/data/projects.json with ${projects.length} projects!`);
