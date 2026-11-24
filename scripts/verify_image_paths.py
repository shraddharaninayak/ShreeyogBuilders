import os
import re

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"
for f in ['public/projects/index.html', 'public/projects.html']:
    with open(os.path.join(base_dir, f), 'r', encoding='utf-8') as fp:
        c = fp.read()
    m_nath = re.findall(r'\"name\":\s*\"Shree Nath Enclave\"[\s\S]*?\"mainImage\":\s*\"([^\"]*)\"', c)
    m_sam = re.findall(r'\"name\":\s*\"Shree Samruddhi Park\"[\s\S]*?\"mainImage\":\s*\"([^\"]*)\"', c)
    print(f, 'Nath mainImage:', m_nath)
    print(f, 'Samruddhi mainImage:', m_sam)
