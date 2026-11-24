import json

with open('public/data/projects.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for p in data:
    if p.get('id') == 14 or p.get('slug') == 'shree-nandan':
        p['location'] = 'Near Trikoni Garden, Kathe Galli, Nashik'
        p['typology'] = '2 & 3 BHK Luxurious Residences'
        p['rera'] = 'P51600032910'
        p['logo'] = '/images/shreeyog/logos/shree-nandan-logo.png'
        p['mainImage'] = '/images/shreeyog/slider/shree-nandan.webp'
        p['gallery'] = [
            '/images/shreeyog/slider/shree-nandan.webp',
            '/projects/shree-nandan/brochure/assets/page-1.webp',
            '/projects/shree-nandan/brochure/assets/terrace-amenity-1.jpg',
            '/projects/shree-nandan/brochure/assets/plan-typical.webp',
            '/projects/shree-nandan/brochure/assets/plan-terrace.webp'
        ]
        p['tagline'] = 'Happiness Forever — Elevate Your Lifestyle'
        p['description'] = 'Situated near Trikoni Garden at Kathe Galli, Nashik, Shree Nandan offers premium 2 & 3 BHK apartments minutes away from Dwarka Circle, with rooftop yoga, green gym, community stage, and net metering.'
        p['overview'] = 'A premium residential landmark bringing together generational comfort, Vastu-compliant layouts, an active rooftop sky sanctuary, and zero common light bills with solar net metering.'
        p['brochurePdf'] = '/brochures/shree-nandan-brochure.pdf'
        p['brochureUrl'] = '/projects/shree-nandan/brochure/'
        p['amenities'] = [
            'Rooftop Terrace Yoga & Open Green Gym',
            'Community Celebration Stage',
            'Indoor Activity Hall (13\'8" x 13\'8")',
            'Rooftop Solar Net Metering (Zero Common Light Bill)',
            'Automatic 6-Person Lift with Genset Backup'
        ]
        p['highlights'] = [
            'Near Trikoni Garden & Dwarka Circle',
            'A & B Wing 2 & 3 BHK Residences',
            '30+ Turnkey Fixtures & Complete Curtains'
        ]

with open('public/data/projects.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print('Updated public/data/projects.json successfully!')
