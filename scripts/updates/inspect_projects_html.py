with open('public/projects/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find('id="featuredShowcaseCompleted"')
if idx != -1:
    print('--- BEFORE FEATURED SHOWCASE (LAST SATELLITES) ---')
    print(content[idx-1200:idx])

idx2 = content.find("sectionId: 'completed-projects'")
if idx2 != -1:
    print('--- COMPLETED SLIDER CONFIG ---')
    print(content[idx2:idx2+1200])

