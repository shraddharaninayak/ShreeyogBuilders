import json
import os

vithal_obj = {
    "id": 19,
    "name": "Shree Vithal Park",
    "slug": "shree-vithal-park",
    "location": "Indira Nagar, Nashik",
    "status": "Completed",
    "featured": False,
    "typology": "2 & 3 BHK Luxurious Flats",
    "rera": "Completed Project",
    "mainImage": "/images/shreeyog/slider/shree-vithal-park.webp",
    "gallery": [
      "/images/shreeyog/slider/shree-vithal-park.webp",
      "/projects/shree-vithal-park/brochure/assets/page-1.webp",
      "/projects/shree-vithal-park/brochure/assets/page-2.webp",
      "/projects/shree-vithal-park/brochure/assets/page-3.webp",
      "/projects/shree-vithal-park/brochure/assets/page-4.webp",
      "/projects/shree-vithal-park/brochure/assets/page-5.webp"
    ],
    "tagline": "श्री ||विठ्ठल|| पार्क — 2 & 3 BHK Luxurious Residences",
    "description": "Located in the tranquil atmosphere of Indira Nagar, Nashik — just 0.8 kms from Mumbai-Agra Highway near Charvak Chowk — Shree Vithal Park is a landmark completed residential community by Shreeyog Builders & Land Developers offering 2 & 3 BHK luxurious flats across Stilt + 7 floors with allotted covered parking, elevator, gas pipeline, and dual water supply.",
    "overview": "Positioned along a prominent 30.00-meter wide DP thoroughfare with triple-road access, Shree Vithal Park features 24 exclusive 2 & 3 BHK residences, spacious private sit-outs and terraces, high-speed passenger elevator, 24-hour dual municipal/borewell water supply, and complete Vastu compliance.",
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
        "detail": "Granite kitchen platform (G20) & stainless steel sink with 4' glazed tile dado."
      },
      {
        "category": "Windows",
        "detail": "3-track powder-coated aluminium sliding windows with Mosquito Net, M.S. grill & marble seal."
      },
      {
        "category": "Doors",
        "detail": "Main door with brass fittings and Night latch; laminated main door & remaining doors water proof flush doors."
      },
      {
        "category": "Bath / Toilet",
        "detail": "7' height glazed tiles in bathroom & toilet; PVC doors with marble frame; concealed plumbing with quality fittings & wall mixer."
      },
      {
        "category": "Gas Pipeline",
        "detail": "Internal gas pipeline from kitchen to every toilet & bath."
      },
      {
        "category": "Electrification",
        "detail": "Concealed electrification for entire flat."
      },
      {
        "category": "Parking",
        "detail": "Allotted covered parking space for each flat on the ground stilt floor."
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
      "Modern Automatic Passenger Elevator with Power Backup",
      "24 Hours Dual Water Supply (Municipal Mains & Deep Borewell)",
      "Internal Gas Pipeline Routed to All Toilets & Bathrooms",
      "Pre-Installed Telephone & Television Cable Sockets in Living Room",
      "Main Entrance Door with Brass Fittings, Night Latch & Laminate",
      "Polished G20 Granite Kitchen Platform with Glazed Tile Dado",
      "3-Track Powder-Coated Aluminium Windows with Mosquito Net & MS Grills"
    ],
    "highlights": [
      "Located near Charvak Chowk, Indira Nagar, Nashik",
      "Just 0.8 kms from Mumbai-Agra Highway (NH-3)",
      "Stilt + 7 Floors with 24 luxurious residences",
      "Triple-road frontage on 30.00M, 9.00M & 7.50M DP roads",
      "100% Vastu-compliant layouts with private sit-outs & terraces",
      "Crafted by Shreeyog Builders & Land Developers (Since 1992)"
    ],
    "logo": "/images/shreeyog/logos/shree-vithal-park-logo-transparent.png",
    "brochure": "/projects/shree-vithal-park/brochure/",
    "brochureUrl": "/projects/shree-vithal-park/brochure/",
    "brochurePdf": "/brochures/shree-vithal-park-brochure.pdf"
}

# 1. Update public/data/projects.json
json_path = 'public/data/projects.json'
with open(json_path, 'r', encoding='utf-8') as f:
    p_json = json.load(f)

p_json = [p for p in p_json if p.get('slug') != 'shree-vithal-park']
p_json.append(vithal_obj)

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(p_json, f, indent=2, ensure_ascii=False)

print(f'Updated public/data/projects.json with {len(p_json)} projects.')

# 2. Update data/projects.js
js_path = 'data/projects.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

if 'shree-vithal-park' not in js_content:
    vithal_js_snippet = ",\n  " + json.dumps(vithal_obj, indent=2, ensure_ascii=False).replace('\n', '\n  ') + "\n];"
    last_bracket_idx = js_content.rfind('];')
    if last_bracket_idx != -1:
        new_js_content = js_content[:last_bracket_idx].rstrip() + vithal_js_snippet
        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(new_js_content)
        print('Appended Shree Vithal Park to data/projects.js.')
else:
    print('Shree Vithal Park already in data/projects.js.')
