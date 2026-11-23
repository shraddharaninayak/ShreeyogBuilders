import shutil
import os

os.makedirs("public/projects/shree-neelkanth/brochure/assets", exist_ok=True)

# Copy CSS and JS
shutil.copy2(
    "public/projects/shree-samruddhi-park/brochure/samruddhi-brochure.css",
    "public/projects/shree-neelkanth/brochure/neelkanth-brochure.css"
)
shutil.copy2(
    "public/projects/shree-samruddhi-park/brochure/samruddhi-brochure.js",
    "public/projects/shree-neelkanth/brochure/neelkanth-brochure.js"
)

# Copy Logo to assets/logo.png
shutil.copy2(
    "public/images/shreeyog/logos/shree-neelkanth-logo-transparent.png",
    "public/projects/shree-neelkanth/brochure/assets/logo.png"
)

print("Copied stylesheet, script, and logo to brochure directory.")
