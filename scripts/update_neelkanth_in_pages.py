files = [
    r'd:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects\index.html',
    r'd:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects.html',
    r'd:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\pages\projects.html'
]

target_sat = '<a href="javascript:void(0)" data-project-href="/projects/shree-neelkanth" class="satellite-card sat-7" data-index="2" title="Shree Neelkanth">'
replace_sat = '<a href="/projects/shree-neelkanth/brochure" data-project-href="/projects/shree-neelkanth/brochure" class="satellite-card sat-7" data-index="2" title="Shree Neelkanth">'

target_data = '"name":"Shree Neelkanth","slug":"shree-neelkanth","location":"Indira Nagar, Nashik","status":"Completed","logo":"/images/shreeyog/logos/shree-neelkanth-logo.png","mainImage":"/images/shreeyog/slider/shree-neelkanth.webp","description":"Shree Neelkanth provides well-appointed 2 BHK apartments in the established core of Indira Nagar. Known for its functional floor plans, high structural build standards, and reliable daily utilities.","brochure":null'
replace_data = '"name":"Shree Neelkanth","slug":"shree-neelkanth","location":"Indira Nagar, Nashik","status":"Completed","logo":"/images/shreeyog/logos/shree-neelkanth-logo.png","mainImage":"/images/shreeyog/slider/shree-neelkanth.webp","description":"Shree Neelkanth provides well-appointed 2 BHK apartments in the established core of Indira Nagar. Known for its functional floor plans, high structural build standards, and reliable daily utilities.","brochure":"/projects/shree-neelkanth/brochure"'

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content.replace(target_sat, replace_sat)
    new_content = new_content.replace(target_data, replace_data)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated: {file_path}")
