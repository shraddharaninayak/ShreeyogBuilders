with open('public/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
m_nuxt = re.search(r'id=["\']__nuxt["\']', text)
m_footer = re.search(r'<footer\b', text)
print('nuxt start:', m_nuxt.start() if m_nuxt else -1)
print('footer start:', m_footer.start() if m_footer else -1)

# Find where __nuxt root element ends
from bs4 import BeautifulSoup
soup = BeautifulSoup(text, 'html.parser')
nuxt_div = soup.find(id='__nuxt')
footer = soup.find('footer')
print('Is footer inside __nuxt?:', footer in nuxt_div.descendants if nuxt_div and footer else 'Not found')
