import json
import os

shakuntal_obj = {
    "id": 20,
    "name": "Shree Shakuntal",
    "slug": "shree-shakuntal",
    "location": "Indira Nagar, Nashik",
    "status": "Completed",
    "featured": False,
    "typology": "1 & 2 BHK Premium Flats",
    "rera": "Completed Project",
    "mainImage": "/images/shreeyog/slider/shree-shakuntal.webp",
    "gallery": [
      "/images/shreeyog/slider/shree-shakuntal.webp",
      "/projects/shree-shakuntal/brochure/assets/page-1.webp",
      "/projects/shree-shakuntal/brochure/assets/page-2.webp",
      "/projects/shree-shakuntal/brochure/assets/page-3.webp",
      "/projects/shree-shakuntal/brochure/assets/page-4.webp"
    ],
    "tagline": "श्री शाकुंतल — A Blissful Lifestyle Awaits You Here",
    "description": "Situated in the prime, serene neighbourhood of Indira Nagar near Saraf Lawn on Pethe Nagar Road in Nashik, Shree Shakuntal is an exclusive completed boutique residential community developed by KALE B. M. & Shreeyog Associates. Offering 1 & 2 BHK premium residences across Stilt + 4 storeys with demarcated covered stilt car parking, passenger elevator, private sit-outs, and 24-hour dual water supply.",
    "overview": "Shree Shakuntal stands along a tranquil 7.50-meter wide DP access road in Indira Nagar, featuring 12 exclusive 1 & 2 BHK residences (Flats 1 to 12 across 4 floors). Designed with earthquake-resistant RCC architecture, Johnson vitrified tile flooring, L-shaped G20 granite kitchen platform, and 3-track aluminium sliding windows.",
    "specifications": [
      {
        "category": "Structure",
        "detail": "Earthquake resistant R.C.C. frame structure designed to seismic safety standards."
      },
      {
        "category": "Brick Work",
        "detail": "External walls 6\" thick and internal partition walls 4.5\" thick brick work."
      },
      {
        "category": "Plaster & Paint",
        "detail": "Double coat external plaster with semi-acrylic paint; Neeru-finish internal plaster with Asian Oil Bound Distemper paint."
      },
      {
        "category": "Flooring",
        "detail": "Good quality 2' x 2' Johnson vitrified tile flooring across all rooms."
      },
      {
        "category": "Kitchen",
        "detail": "Granite kitchen platform (G20) with stainless steel sink & glazed tile dado up to lintel level."
      },
      {
        "category": "Doors",
        "detail": "Attractive main entrance door with brass fittings, night latch & laminate finish; waterproof flush internal doors."
      },
      {
        "category": "Windows",
        "detail": "3-track powder-coated aluminium sliding windows with mosquito net, marble sill & safety M.S. grills."
      },
      {
        "category": "Bath / Toilet",
        "detail": "Glazed ceramic wall tiles up to full lintel level; concealed plumbing with branded fittings & hot/cold wall mixer."
      },
      {
        "category": "Electrification",
        "detail": "Concealed copper wiring with adequate electrical points, TV & telephone sockets in living room."
      },
      {
        "category": "Water Supply",
        "detail": "24 hours dual water supply from Nashik Municipal Corporation mains and borewell."
      },
      {
        "category": "Parking",
        "detail": "Demarcated ground stilt covered parking bays numbered 1 to 12 for every residence."
      },
      {
        "category": "Vertical Transit",
        "detail": "Modern passenger elevator serving all residential floors with safety backup."
      }
    ],
    "amenities": [
      "Demarcated Ground Stilt Car Parking Bays (Bays 1-12)",
      "Modern Passenger Elevator with Safety Backup",
      "24 Hours Dual Water Supply (Municipal Mains + Borewell)",
      "Spacious Private Balconies & Sit-Outs for Every Flat",
      "Concealed Copper Electrification with TV & Phone Points",
      "Laminated Designer Main Door with Brass Fittings & Night Latch",
      "L-Shaped G20 Granite Kitchen Counter with Stainless Steel Sink",
      "3-Track Aluminium Windows with Insect Netting & Safety Grills"
    ],
    "highlights": [
      "Located at Indira Nagar, Near Saraf Lawn, Pethe Nagar Road, Nashik",
      "Stilt + 4 Storeys boutique community with only 12 exclusive flats",
      "1 & 2 BHK premium configurations (Flats 1-12)",
      "Direct frontage onto wide 7.50M municipal DP access road",
      "Developed by KALE B. M. with Ar. Umesh Bagul & Er. Prasanna Bhore",
      "Ready-to-move completed landmark with all civic amenities"
    ],
    "logo": "/images/shreeyog/logos/shree-shakuntal-logo-transparent.png",
    "brochure": "/projects/shree-shakuntal/brochure/",
    "brochureUrl": "/projects/shree-shakuntal/brochure/",
    "brochurePdf": "/brochures/shree-shakuntal-brochure.pdf"
}

# 1. Update public/data/projects.json
json_path = 'public/data/projects.json'
with open(json_path, 'r', encoding='utf-8') as f:
    p_json = json.load(f)

p_json = [p for p in p_json if p.get('slug') != 'shree-shakuntal']
p_json.append(shakuntal_obj)

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(p_json, f, indent=2, ensure_ascii=False)

print(f'Updated public/data/projects.json with {len(p_json)} projects.')

# 2. Update data/projects.js
js_path = 'data/projects.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

if 'shree-shakuntal' not in js_content:
    shakuntal_js_snippet = ",\n  " + json.dumps(shakuntal_obj, indent=2, ensure_ascii=False).replace('\n', '\n  ') + "\n];"
    last_bracket_idx = js_content.rfind('];')
    if last_bracket_idx != -1:
        new_js_content = js_content[:last_bracket_idx].rstrip() + shakuntal_js_snippet
        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(new_js_content)
        print('Appended Shree Shakuntal to data/projects.js.')
else:
    print('Shree Shakuntal already in data/projects.js.')
