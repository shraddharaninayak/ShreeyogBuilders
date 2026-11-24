import json
import os

vrundavan_obj = {
    "id": 18,
    "name": "Shree Vrundavan",
    "slug": "shree-vrundavan",
    "location": "Indira Nagar, Nashik",
    "status": "Completed",
    "featured": False,
    "typology": "2 & 3 BHK Premium Flats",
    "rera": "Completed Project",
    "mainImage": "/images/shreeyog/slider/shree-vrundavan.webp",
    "gallery": [
      "/images/shreeyog/slider/shree-vrundavan.webp",
      "/projects/shree-vrundavan/brochure/assets/page-1.webp",
      "/projects/shree-vrundavan/brochure/assets/page-2.webp",
      "/projects/shree-vrundavan/brochure/assets/page-3.webp",
      "/projects/shree-vrundavan/brochure/assets/page-4.webp"
    ],
    "tagline": "एक आपुलकीचे घर — Living Traditions in a Contemporary Way",
    "description": "Located in the tranquil atmosphere of Shreejay Nagar, Behind HDFC Bank, Indira Nagar, Nashik — just 1.5 kms from Mumbai-Agra Highway — Shree Vrundavan is a premier completed residential landmark by Shreeyog Builders & Land Developers offering 2 & 3 BHK premium flats across Wings 'A' and 'B' with allotted covered parking, elevator, and dual water supply.",
    "overview": "Shree Vrundavan combines peaceful living in Indira Nagar with immediate access to daily essentials. Designed across Stilt + 4 Floors with separate elevators for Wings 'A' and 'B', allotted stilt parking for every residence, 24-hour dual municipal/borewell water supply, and complete Vastu compliance.",
    "specifications": [
      {
        "category": "Structure",
        "detail": "Earthquake resistant R.C.C. frame structure engineered to high safety standards."
      },
      {
        "category": "Brick Work",
        "detail": "External walls 6\" thick and internal partition walls 4.5\" thick brick work."
      },
      {
        "category": "Paint",
        "detail": "Double coat external plaster with semi-acrylic paint; Neeru-finish internal plaster with Asian Oil Bound Distemper paint."
      },
      {
        "category": "Flooring",
        "detail": "Good quality 2' x 2' Vitrified (Johnson) flooring for entire flat."
      },
      {
        "category": "Kitchen",
        "detail": "Granite kitchen platform (G20) & stainless steel sink with full-height glazed tile dado."
      },
      {
        "category": "Windows",
        "detail": "3-track powder-coated aluminium sliding windows with Mosquito Net, M.S. grill & marble frame."
      },
      {
        "category": "Doors",
        "detail": "Main door with brass fittings, Night latch and Safety door; all internal doors & frames with laminate."
      },
      {
        "category": "Bath / Toilet",
        "detail": "Full-height glazed tiles in bathroom & toilet; PVC doors with marble frame; concealed plumbing with quality fittings & wall mixer."
      },
      {
        "category": "Electrification",
        "detail": "Concealed electrification for entire flat."
      },
      {
        "category": "Parking",
        "detail": "Demarcated covered parking space for each flat on the ground stilt floor."
      },
      {
        "category": "Water Supply",
        "detail": "24 hours water supply of Municipal & boring water."
      },
      {
        "category": "Media & Comms",
        "detail": "Telephone & cable connection in living room."
      }
    ],
    "amenities": [
      "Allotted Covered Stilt Parking Space for Each Flat",
      "Automatic High-Speed Passenger Elevators for Wings 'A' & 'B'",
      "24 Hours Dual Water Supply (Municipal Mains & Deep Borewell)",
      "Pre-Installed Telephone & Television Cable Sockets in Living Room",
      "Main Entrance Door with Brass Fittings, Night Latch & Safety Door",
      "Polished G20 Granite Kitchen Platform with Full-Height Dado",
      "3-Track Powder-Coated Aluminium Sliding Windows with Mosquito Mesh & MS Grills",
      "Earthquake Resistant R.C.C. Frame Structure with Double-Coat Plaster"
    ],
    "highlights": [
      "Located in Shreejay Nagar, Behind HDFC Bank, Indira Nagar, Nashik",
      "Just 1.5 kms from Mumbai-Agra Highway (NH-3)",
      "Stilt + 4 Floors with Wings 'A' (16 flats) & 'B' (8 flats)",
      "Flanked by dual 6.00-meter wide roads for easy access",
      "100% Vastu-compliant layout with private sit-out balconies",
      "Crafted by Shreeyog Builders & Land Developers (Since 1992)"
    ],
    "logo": "/images/shreeyog/logos/shree-vrundavan-logo-transparent.png",
    "brochure": "/projects/shree-vrundavan/brochure/",
    "brochureUrl": "/projects/shree-vrundavan/brochure/",
    "brochurePdf": "/brochures/shree-vrundavan-brochure.pdf"
}

# 1. Update public/data/projects.json
json_path = 'public/data/projects.json'
with open(json_path, 'r', encoding='utf-8') as f:
    p_json = json.load(f)

for p in p_json:
    if p.get('slug') == 'shree-bramhand':
        p['logo'] = '/images/shreeyog/logos/shree-bramhand-logo-transparent.png'

p_json = [p for p in p_json if p.get('slug') != 'shree-vrundavan']
p_json.append(vrundavan_obj)

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(p_json, f, indent=2, ensure_ascii=False)

print('Updated public/data/projects.json with', len(p_json), 'projects.')

# 2. Update data/projects.js
js_path = 'data/projects.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

# Make sure Bramhand logo is correct in data/projects.js
# and append vrundavan before closing "];"
if 'shree-vrundavan' not in js_content:
    vrundavan_js_snippet = ",\n  " + json.dumps(vrundavan_obj, indent=2, ensure_ascii=False).replace('\n', '\n  ') + "\n];"
    last_bracket_idx = js_content.rfind('];')
    if last_bracket_idx != -1:
        new_js_content = js_content[:last_bracket_idx].rstrip() + vrundavan_js_snippet
        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(new_js_content)
        print('Appended Shree Vrundavan to data/projects.js.')
else:
    print('Shree Vrundavan already in data/projects.js.')
