import json

shree_kala = {
    "id": 16,
    "name": "Shree Kala",
    "slug": "shree-kala",
    "location": "Shree Ram Chowk, Ekta Colony, Rane Nagar, Nashik",
    "status": "Completed",
    "featured": False,
    "typology": "2 BHK Luxurious Flats",
    "rera": "Completed Project",
    "mainImage": "/images/shreeyog/slider/shree-kala.webp",
    "gallery": [
        "/images/shreeyog/slider/shree-kala.webp",
        "/projects/shree-kala/brochure/assets/page-3.webp",
        "/projects/shree-kala/brochure/assets/page-2.webp",
        "/projects/shree-kala/brochure/assets/page-4.webp"
    ],
    "tagline": "A Gracious Lifestyle of Vastu, Luxury & Neighborhood",
    "description": "Situated at Shree Ram Chowk in peaceful Ekta Colony, Rane Nagar — just 0.8 kms from Mumbai-Agra Highway — Shree Kala offers 16 spacious 2 BHK luxurious flats with allotted stilt parking, modern elevator, dual municipal & borewell water, internal gas pipelines, and full Vastu compliance.",
    "overview": "Shree Kala Apartment combines 17+ years of Shreeyog craftsmanship with a self-contained family environment. Designed across Stilt + 3 floors with cross-ventilated unit layouts, private sit-outs, and swift arterial highway connectivity in Nashik.",
    "specifications": [
        {
            "category": "Structure",
            "detail": "Earthquake-resistant R.C.C. frame structure designed as per IS standards."
        },
        {
            "category": "Brick Work",
            "detail": "External walls 6\" thick and internal partition walls 4.5\" thick brickwork."
        },
        {
            "category": "Flooring",
            "detail": "Good quality 2' x 2' Porcelino (Johnson) vitrified tile flooring for entire flat."
        },
        {
            "category": "Kitchen",
            "detail": "Polished granite kitchen platform (G20) with stainless steel sink and 4' glazed tile dado."
        },
        {
            "category": "Windows",
            "detail": "3-track powder-coated aluminium sliding windows with mosquito net, M. S. safety grill & marble seal."
        },
        {
            "category": "Plaster & Paint",
            "detail": "Double-coat external plaster with semi-acrylic paint; Neeru-finish internal plaster with Asian Oil Bound Distemper paint."
        },
        {
            "category": "Doors",
            "detail": "Main door with brass fittings and night latch; laminated main door & waterproof flush doors with R.C.C. frames."
        },
        {
            "category": "Bath / Toilet",
            "detail": "7' height designer glazed tiles in bathroom & toilet with concealed plumbing and hot/cold wall mixer."
        },
        {
            "category": "Gas Pipeline",
            "detail": "Dedicated internal gas pipeline distribution from kitchen to every toilet & bath."
        },
        {
            "category": "Electrification",
            "detail": "Concealed electrification for entire flat with modular switches."
        },
        {
            "category": "Water Supply",
            "detail": "24 hours water supply of Municipal & on-site boring water with storage tanks."
        },
        {
            "category": "Parking",
            "detail": "Allotted covered stilt car parking space for each flat."
        }
    ],
    "amenities": [
        "Allotted Covered Stilt Car Parking for Each Flat",
        "Modern High-Speed Passenger Elevator with Stilt Access",
        "Dual 24-Hour Water Supply (Municipal & On-Site Borewell)",
        "Dedicated Internal Gas Pipeline from Kitchen to All Toilets",
        "Private Covered Sit-Outs (10'2\" x 6'3\") for Every Residence",
        "3-Track Aluminium Windows with Stainless Steel Mosquito Mesh",
        "Pre-Installed Telephone & Cable TV Connections in Living Area",
        "Earthquake-Resistant Structural R.C.C. Engineering"
    ],
    "highlights": [
        "Located at Shree Ram Chowk, Ekta Colony, Rane Nagar, Nashik",
        "Just 0.8 kms from Mumbai-Agra Highway (NH-3)",
        "Direct frontage on 18.00M and 30.00M wide sector thoroughfares",
        "100% Vastu-compliant layouts with private living sit-outs",
        "Crafted by Shreeyog Builders & Land Developers (Since 1992)"
    ],
    "logo": "/images/shreeyog/logos/shree-kala-logo.png",
    "brochurePdf": "/brochures/shree-kala-brochure.pdf",
    "brochureUrl": "/projects/shree-kala/brochure/"
}

with open('data/projects.js', 'r', encoding='utf-8') as f:
    content = f.read().strip()

# Check if already present
if '"slug": "shree-kala"' not in content:
    # Insert before the closing '];'
    last_bracket = content.rfind('];')
    if last_bracket != -1:
        kala_str = ',\n  ' + json.dumps(shree_kala, indent=2) + '\n];'
        new_content = content[:last_bracket].rstrip() + kala_str
        with open('data/projects.js', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print('Added Shree Kala to data/projects.js')
    else:
        print('Error: could not find ]; in data/projects.js')
else:
    print('Shree Kala already in data/projects.js')
