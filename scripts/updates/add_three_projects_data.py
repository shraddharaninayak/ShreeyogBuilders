# -*- coding: utf-8 -*-
"""
Registers Shree Samarth (id: 23), Shree Vinayak (id: 24), and Shree Nisarg (id: 25)
in public/data/projects.json and data/projects.js.
"""
import json

samarth_obj = {
    "id": 23,
    "name": "Shree Samarth",
    "slug": "shree-samarth",
    "location": "Indira Nagar Annex, Nashik",
    "status": "Completed",
    "featured": False,
    "typology": "2 & 3 BHK Flats & Penthouses",
    "rera": "Completed Project",
    "mainImage": "/images/shreeyog/slider/shree-samarth.webp",
    "gallery": [
        "/images/shreeyog/slider/shree-samarth.webp",
        "/projects/shree-samarth/brochure/assets/page-1.webp",
        "/projects/shree-samarth/brochure/assets/page-2.webp",
        "/projects/shree-samarth/brochure/assets/page-3.webp",
        "/projects/shree-samarth/brochure/assets/page-4.webp",
        "/projects/shree-samarth/brochure/assets/page-5.webp",
        "/projects/shree-samarth/brochure/assets/page-6.webp"
    ],
    "tagline": "Shree Samarth — Make Your Life Divine!",
    "description": "Located opposite LIC Colony behind Samrat Sweet in prime Indira Nagar Annex, Nashik, Shree Samarth is a landmark completed residential community comprising Stilt + 4 floors across twin wings (Wings A & B), 26 residences including 4th-floor penthouses with private open sky terraces, children's play area, open-air green gym, landscaped mound and lawn, performance stage, dual lifts, and 100% demarcated stilt car parking.",
    "overview": "Shree Samarth delivers serene, divine living in one of Nashik's most coveted residential neighborhoods. Featuring twin wings (Wings A & B) with independent elevators, the project offers spacious 2 & 3 BHK residences on typical floors (Flats A-1 to A-12 and B-1 to B-12) and prestigious 4th-floor penthouses (A-13 & B-13) with vast private open terraces, an outdoor green gym, children play area, and demarcated stilt parking bays.",
    "specifications": [
        {
            "category": "Structure",
            "detail": "Earthquake resistant R.C.C. frame structure designed to rigorous Indian Standard (IS) seismic codes."
        },
        {
            "category": "Brick Work & Plaster",
            "detail": "6\" thick external brick walls with double coat sand-faced plaster; smooth neeru plaster finish internally."
        },
        {
            "category": "Flooring",
            "detail": "Premium 2' x 2' vitrified tile flooring in living, dining, and bedrooms; anti-skid ceramic tiles in terraces and washrooms."
        },
        {
            "category": "Kitchen",
            "detail": "Polished granite kitchen platform with stainless steel sink and designer glazed ceramic tile dado up to lintel level."
        },
        {
            "category": "Windows",
            "detail": "3-track powder-coated aluminium sliding windows with mosquito netting, safety M.S. grills, and polished marble sills."
        },
        {
            "category": "Doors",
            "detail": "Attractive main entrance door with brass fittings and Night Latch; waterproof flush internal doors for all bedrooms."
        },
        {
            "category": "Electrification",
            "detail": "Concealed copper wiring with modular switches, adequate points, TV/telephone points, and AC point provision in master bedroom."
        },
        {
            "category": "Plumbing & Bath",
            "detail": "Concealed CPVC plumbing with branded CP fittings, quality sanitaryware, hot/cold mixer unit, and solar water heating provision."
        },
        {
            "category": "Parking",
            "detail": "26 demarcated covered stilt parking bays (A-1 to A-13 and B-1 to B-13) serviced by a wide 6.00-meter peripheral driveway."
        },
        {
            "category": "Lifts & Water",
            "detail": "Twin automatic passenger elevators with battery backup; 24-hour water supply with overhead and underground storage reservoirs."
        }
    ],
    "amenities": [
        "Children's Play Area with Safe Play Equipment & Sand Pit",
        "Open-Air Green Gym for Daily Outdoor Fitness & Wellness",
        "Landscaped Central Garden with Green Lawn & Earth Mound",
        "Community Performance Stage & Shaded Evening Seating Arena",
        "Twin High-Speed Automatic Elevators with Inverter Backup",
        "26 Demarcated Covered Stilt Parking Bays with 6.00M Driveway",
        "24x7 Security Cabin with Intercom & Rainwater Harvesting",
        "4th-Floor Penthouses Featuring Expansive Private Sky Terraces"
    ],
    "highlights": [
        "Located Opp. LIC Colony, Behind Samrat Sweet, Indira Nagar Annex, Nashik",
        "Stilt + 4 Floors Twin Wings (A & B) with 26 Total Residences",
        "2 & 3 BHK Luxurious Flats & Elite Top-Floor Penthouses",
        "Independent Elevator & Core for Each Wing ensuring Privacy",
        "Minutes to Mumbai-Agra Highway (NH-3), Symbiosis School & Wockhardt",
        "Developed by Shreeyog Builders & Land Developers (Since 1992)"
    ],
    "logo": "/images/shreeyog/logos/shree-samarth-logo-transparent.png",
    "brochure": "/projects/shree-samarth/brochure/",
    "brochureUrl": "/projects/shree-samarth/brochure/",
    "brochurePdf": "/brochures/shree-samarth-brochure.pdf"
}

vinayak_obj = {
    "id": 24,
    "name": "Shree Vinayak",
    "slug": "shree-vinayak",
    "location": "Indira Nagar, Nashik",
    "status": "Completed",
    "featured": False,
    "typology": "2 & 3 BHK Premium Flats",
    "rera": "Completed Project",
    "mainImage": "/images/shreeyog/slider/shree-vinayak.webp",
    "gallery": [
        "/images/shreeyog/slider/shree-vinayak.webp",
        "/projects/shree-vinayak/brochure/assets/page-1.webp",
        "/projects/shree-vinayak/brochure/assets/page-2.webp",
        "/projects/shree-vinayak/brochure/assets/page-3.webp",
        "/projects/shree-vinayak/brochure/assets/page-4.webp",
        "/projects/shree-vinayak/brochure/assets/page-5.webp"
    ],
    "tagline": "सुख-समृद्धीचा वास होऊ दे.. सर्व घराघरात !",
    "description": "Situated just 200 meters off Mumbai-Agra Highway behind Hotel Tapasvi in Indira Nagar, Nashik, Shree Vinayak is a distinguished low-density residential community featuring Stilt + 4 floors, 16 exclusive apartments (3 BHK on 1st floor; 2 BHK on 2nd floor with personal 156 sq.ft private open terraces; 2 BHK on upper floors), Sanskar Mandir, high-speed elevator, and 16 demarcated stilt car parking bays.",
    "overview": "Shree Vinayak offers high connectivity combined with peaceful neighborhood living. Positioned only 200 meters from the Mumbai-Agra National Highway, the development features 16 thoughtfully designed homes, a ground-level Sanskar Mandir temple for daily prayers, personal 156 sq.ft open sky terraces for 2nd-floor residences, an automatic elevator with power backup, and guaranteed car parking for every home.",
    "specifications": [
        {
            "category": "Structure",
            "detail": "Earthquake resistant R.C.C. frame structure designed in strict accordance with IS codes."
        },
        {
            "category": "Brick Work & Plaster",
            "detail": "6\" external brickwork, 4\" internal brick masonry with double coat sand-faced plaster outside and neeru finish inside."
        },
        {
            "category": "Flooring",
            "detail": "2' x 2' vitrified tile flooring uniformly across all rooms; anti-skid ceramic tiles in terraces and washrooms."
        },
        {
            "category": "Kitchen",
            "detail": "Black granite kitchen platform with stainless steel sink and glazed tile dado up to lintel level (7 ft)."
        },
        {
            "category": "Windows",
            "detail": "3-track powder-coated aluminium sliding windows with safety M.S. grills and marble frame sills."
        },
        {
            "category": "Doors",
            "detail": "Waterproof laminated main door with eye-hole & brass fittings; waterproof flush doors for bedrooms and toilets."
        },
        {
            "category": "Electrification",
            "detail": "Concealed copper wiring with Anchor/Legrand modular switches, TV/phone points, and inverter wiring provision."
        },
        {
            "category": "Plumbing & Sanitary",
            "detail": "Concealed CPVC plumbing with premium CP fittings, wall mixer, solar water connection, and branded sanitaryware."
        },
        {
            "category": "Parking",
            "detail": "Covered ground stilt parking with 16 clearly numbered individual car parking bays."
        },
        {
            "category": "Lift & Security",
            "detail": "Modern passenger elevator with automatic rescue device; dedicated watchman cabin at entrance gate."
        }
    ],
    "amenities": [
        "Sanskar Mandir Community Temple at Ground Level",
        "16 Demarcated Covered Stilt Car Parking Bays",
        "Automatic Passenger Elevator with Battery Inverter Backup",
        "Personal 156 sq.ft Attached Open Terraces (2nd Floor Homes)",
        "Security Watchman Cabin with Visitor Control & Intercom",
        "Rainwater Harvesting with Underground & Overhead Reservoirs",
        "Prime Location Just 200 Meters from Mumbai-Agra Highway",
        "Intimate 16-Home Community Offering Maximum Privacy"
    ],
    "highlights": [
        "Located Behind Hotel Tapasvi, Indira Nagar, Nashik (200m from Highway)",
        "Stilt + 4 Storeys Boutique Residence with 16 Exclusive Homes",
        "1st Floor 3 BHK, 2nd Floor 2 BHK with Terraces, 3rd-4th Floor 2 BHK",
        "Ground Floor Sanskar Mandir for Spiritual Serenity",
        "Minutes to Pathardi Phata, City Center Mall & Wockhardt Hospital",
        "Developed by Shreeyog Builders & Land Developers (Since 1992)"
    ],
    "logo": "/images/shreeyog/logos/shree-vinayak-logo-transparent.png",
    "brochure": "/projects/shree-vinayak/brochure/",
    "brochureUrl": "/projects/shree-vinayak/brochure/",
    "brochurePdf": "/brochures/shree-vinayak-brochure.pdf"
}

nisarg_obj = {
    "id": 25,
    "name": "Shree Nisarg",
    "slug": "shree-nisarg",
    "location": "Gangapur Road, Nashik",
    "status": "Completed",
    "featured": False,
    "typology": "2 & 3 BHK Luxurious Flats",
    "rera": "Completed Project",
    "mainImage": "/images/shreeyog/slider/shree-nisarg.webp",
    "gallery": [
        "/images/shreeyog/slider/shree-nisarg.webp",
        "/projects/shree-nisarg/brochure/assets/page-1.webp",
        "/projects/shree-nisarg/brochure/assets/page-2.webp",
        "/projects/shree-nisarg/brochure/assets/page-3.webp",
        "/projects/shree-nisarg/brochure/assets/page-4.webp",
        "/projects/shree-nisarg/brochure/assets/page-5.webp"
    ],
    "tagline": "Relax in the soothing lap of mother nature",
    "description": "Situated in the revered residential enclave of Gangapur Road opposite Pramod Nagar, Nashik, Shree Nisarg is a nature-inspired completed residential landmark comprising Stilt + 4 floors across twin wings (Wings A & B), 24 homes (Wing A: 8 spacious 3 BHK residences of 1,270 sq.ft; Wing B: 16 comfortable 2 BHK residences of 1,025 sq.ft), roadside landscaped front park, dual automatic lifts, and 24 demarcated stilt car bays.",
    "overview": "Shree Nisarg unites architectural finesse with lush botanical serenity on prime Gangapur Road. Positioned near Nirmala Convent School and KTHM campus, the development features 24 expansive homes across twin towers, an exclusive landscaped roadside front park along the 12M thoroughfare, independent high-speed elevators for each wing, full stilt parking bays (A-1 to A-8 and B-1 to B-16), and dual municipal and borewell water supply.",
    "specifications": [
        {
            "category": "Structure",
            "detail": "Sturdy earthquake resistant R.C.C. framed structure engineered to high safety benchmarks."
        },
        {
            "category": "Brick Work & Plaster",
            "detail": "6\" external and internal brick walls with double coat sand-faced plaster externally and smooth gypsum/neeru plaster internally."
        },
        {
            "category": "Flooring",
            "detail": "Premium 2' x 2' vitrified tile flooring in drawing, dining, kitchen, and bedrooms; non-slippery tiles in terraces & washrooms."
        },
        {
            "category": "Kitchen",
            "detail": "Fine polished granite kitchen counter with stainless steel sink, glazed ceramic tile dado up to lintel, and water purifier connection."
        },
        {
            "category": "Windows",
            "detail": "Powder-coated aluminium sliding windows with mosquito netting, safety M.S. grills, and polished stone sills."
        },
        {
            "category": "Doors",
            "detail": "Teak wood frame ornamental main door with brass hardware; waterproof flush internal doors for all bedrooms."
        },
        {
            "category": "Electrification",
            "detail": "Concealed copper wiring with Anchor/Legrand modular switches, AC point in master bedroom, and inverter backup wiring."
        },
        {
            "category": "Plumbing & Sanitary",
            "detail": "Concealed CPVC plumbing with Jaguar/equivalent CP fittings, solar water heating connection, and anti-skid bathroom floors."
        },
        {
            "category": "Parking",
            "detail": "24 demarcated covered stilt parking bays (A-1 to A-8 for Wing A, B-1 to B-16 for Wing B) with wide circulation driveways."
        },
        {
            "category": "Elevators & Water",
            "detail": "Dual automatic passenger elevators (one per wing) with emergency backup; dual municipal and on-site borewell water supply."
        }
    ],
    "amenities": [
        "Dedicated Landscaped Front Park Facing the 12M Road",
        "Dual High-Speed Automatic Passenger Elevators (One Per Wing)",
        "24 Demarcated Covered Stilt Parking Bays (A-1 to A-8, B-1 to B-16)",
        "Distinct Twin Wings: Wing A (3 BHK) and Wing B (2 BHK)",
        "Dual Water Supply: Municipal Mains & Deep Borewell with Sump",
        "Aesthetic Perimeter Boundary Wall, Designer Gate & Security Cabin",
        "Walking Distance to Nirmala Convent School & Gangapur Road",
        "Rainwater Harvesting System Recharging Groundwater Levels"
    ],
    "highlights": [
        "Located Opp. Pramod Nagar, Near Nirmala Convent High School, Gangapur Road, Nashik",
        "Stilt + 4 Storeys Twin Wings (A & B) with 24 Total Residences",
        "Wing A: 8 Luxury 3 BHK Homes (1,270 sq.ft) & Wing B: 16 Luxury 2 BHK Homes (1,025 sq.ft)",
        "Lush Roadside Front Park & Tree-Lined Surroundings",
        "Minutes to College Road, KTHM, Someshwar & Navshya Ganpati",
        "Developed by Shreeyog Builders & Land Developers (Since 1992)"
    ],
    "logo": "/images/shreeyog/logos/shree-nisarg-logo-transparent.png",
    "brochure": "/projects/shree-nisarg/brochure/",
    "brochureUrl": "/projects/shree-nisarg/brochure/",
    "brochurePdf": "/brochures/shree-nisarg-brochure.pdf"
}

# 1. Update public/data/projects.json
json_path = 'public/data/projects.json'
with open(json_path, 'r', encoding='utf-8') as f:
    p_json = json.load(f)

# Remove existing if any, to avoid duplicates
p_json = [p for p in p_json if p.get('slug') not in ['shree-samarth', 'shree-vinayak', 'shree-nisarg']]
p_json.append(samarth_obj)
p_json.append(vinayak_obj)
p_json.append(nisarg_obj)

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(p_json, f, indent=2, ensure_ascii=False)

print(f'Updated public/data/projects.json with {len(p_json)} projects.')

# 2. Update data/projects.js
js_path = 'data/projects.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

to_append = []
if 'shree-samarth' not in js_content:
    to_append.append(samarth_obj)
if 'shree-vinayak' not in js_content:
    to_append.append(vinayak_obj)
if 'shree-nisarg' not in js_content:
    to_append.append(nisarg_obj)

if to_append:
    last_bracket_idx = js_content.rfind('];')
    if last_bracket_idx != -1:
        appended_str = ""
        for obj in to_append:
            appended_str += ",\n  " + json.dumps(obj, indent=2, ensure_ascii=False).replace('\n', '\n  ')
        new_js = js_content[:last_bracket_idx].rstrip() + appended_str + "\n];"
        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(new_js)
        print(f'Appended {len(to_append)} projects to data/projects.js.')
else:
    print('Projects already in data/projects.js.')
