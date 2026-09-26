import urllib.request
import os

images_to_download = {
    # Logo
    "shreeyog-logo-real.png": "https://shreeyogbuilders.com/wp-content/uploads/2024/02/shreeyog-1-1.png",
    
    # Hero / About / Showcase
    "about-real.png": "https://shreeyogbuilders.com/wp-content/uploads/2023/07/about-1.png",
    "gallery-1-real.jpg": "https://shreeyogbuilders.com/wp-content/uploads/2023/07/gallery1.jpg",
    "gallery-14-real.jpg": "https://shreeyogbuilders.com/wp-content/uploads/2023/07/gallery14.jpg",
    
    # 7 Ongoing Projects
    "venkatesh-real.png": "https://shreeyogbuilders.com/wp-content/uploads/2024/02/elev-venkatesh-1.png",
    "bramhand-real.jpg": "https://shreeyogbuilders.com/wp-content/uploads/2023/07/Bramhand_1.jpg",
    "neelkanth-real.jpg": "https://shreeyogbuilders.com/wp-content/uploads/2024/01/home-neelkanth.jpg",
    "nandan-real.jpg": "https://shreeyogbuilders.com/wp-content/uploads/2024/01/home-nandan.jpg",
    "malhar-real.jpg": "https://shreeyogbuilders.com/wp-content/uploads/2024/01/home-malhar.jpg",
    "murlidhar-real.jpg": "https://shreeyogbuilders.com/wp-content/uploads/2024/02/murlidhar-ongoing.jpg",
    "pandurang-real.jpg": "https://shreeyogbuilders.com/wp-content/uploads/2025/06/pandurang-home.jpg",
    
    # 4 Completed Projects
    "nakshatra-real.jpg": "https://shreeyogbuilders.com/wp-content/uploads/2023/09/elevation_cop_6.jpg",
    "vrindavan-real.jpg": "https://shreeyogbuilders.com/wp-content/uploads/2023/09/elevation_cop_4.jpg",
    "chintan-real.jpg": "https://shreeyogbuilders.com/wp-content/uploads/2023/09/elevation_cop_1.jpg",
    "shakuntal-real.jpg": "https://shreeyogbuilders.com/wp-content/uploads/2023/09/elevation_cop_2.jpg",
}

target_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyog\images"
os.makedirs(target_dir, exist_ok=True)

print("Starting download of real Shreeyog images...")
for filename, url in images_to_download.items():
    filepath = os.path.join(target_dir, filename)
    print(f"Downloading {filename} from {url}...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req) as resp, open(filepath, 'wb') as out_file:
            out_file.write(resp.read())
        size = os.path.getsize(filepath)
        print(f"  -> SUCCESS ({size} bytes)")
    except Exception as e:
        print(f"  -> ERROR downloading {filename}: {e}")

print("All downloads finished!")
