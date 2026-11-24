import urllib.request
import time

url = 'https://shreeyog-builders.vercel.app/projects/shree-safalya/brochure'
print('Checking for Vercel deployment of commit 3cbb6b7...')

for attempt in range(1, 20):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0', 'Cache-Control': 'no-cache, no-store'})
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            if '<base href="/projects/shree-safalya/brochure/"' in html:
                print(f'Attempt {attempt}: DEPLOYMENT DETECTED! <base> tag is live on Vercel!')
                break
            else:
                print(f'Attempt {attempt}: Still old version ({len(html)} bytes), waiting 5s...')
    except Exception as e:
        print(f'Attempt {attempt}: Error: {e}')
    time.sleep(5)
