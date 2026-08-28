import os
from PIL import Image

BASE_DIR = r"c:\Users\sarav\Documents\MrFixers_website_app"
SOURCE_DIR = os.path.join(BASE_DIR, "business_ideas")
OUTPUT_DIR = os.path.join(BASE_DIR, "assets", "images")
SERVICES_DIR = os.path.join(OUTPUT_DIR, "services")

os.makedirs(SERVICES_DIR, exist_ok=True)

# 1. Crop from Logos_types.jpeg (1179 x 768)
logos_path = os.path.join(SOURCE_DIR, "Logos_types.jpeg")
if os.path.exists(logos_path):
    im_logos = Image.open(logos_path)
    w, h = im_logos.size
    
    # Primary logo (top banner)
    primary_logo = im_logos.crop((0, 0, w, int(h * 0.40)))
    primary_logo.save(os.path.join(OUTPUT_DIR, "logo-primary.png"), "PNG")
    
    # Dark logo banner (item 4)
    dark_logo = im_logos.crop((int(w * 0.61), int(h * 0.43), w, int(h * 0.64)))
    dark_logo.save(os.path.join(OUTPUT_DIR, "logo-dark-bg.png"), "PNG")

    # App icon (item 6)
    app_icon = im_logos.crop((int(w * 0.31), int(h * 0.71), int(w * 0.45), h - 10))
    app_icon.save(os.path.join(OUTPUT_DIR, "app-icon.png"), "PNG")
    app_icon.resize((64, 64), Image.Resampling.LANCZOS).save(os.path.join(OUTPUT_DIR, "favicon.png"), "PNG")

    # Van branding (item 7)
    van = im_logos.crop((int(w * 0.46), int(h * 0.68), w, h - 5))
    van.save(os.path.join(OUTPUT_DIR, "van-branding.jpg"), "JPEG", quality=95)
    
    # Symbol / MFx
    symbol = im_logos.crop((int(w * 0.04), int(h * 0.45), int(w * 0.23), int(h * 0.63)))
    symbol.save(os.path.join(OUTPUT_DIR, "symbol-mfx.png"), "PNG")
    print("Extracted logos and van successfully.")

# 2. Crop from services_charges_english.jpeg (862 x 1280)
services_path = os.path.join(SOURCE_DIR, "services_charges_english.jpeg")
if os.path.exists(services_path):
    im_serv = Image.open(services_path)
    sw, sh = im_serv.size

    # Technician hero banner
    tech_hero = im_serv.crop((0, 0, sw, int(sh * 0.36)))
    tech_hero.save(os.path.join(OUTPUT_DIR, "hero-technician.jpg"), "JPEG", quality=95)

    # AC Service Card Image
    ac_img = im_serv.crop((int(sw * 0.03), int(sh * 0.40), int(sw * 0.25), int(sh * 0.51)))
    ac_img.save(os.path.join(SERVICES_DIR, "ac-service.jpg"), "JPEG", quality=95)

    # Electrician Card Image
    elec_img = im_serv.crop((int(sw * 0.27), int(sh * 0.40), int(sw * 0.49), int(sh * 0.51)))
    elec_img.save(os.path.join(SERVICES_DIR, "electrician.jpg"), "JPEG", quality=95)

    # Plumbing Card Image
    plumb_img = im_serv.crop((int(sw * 0.51), int(sh * 0.40), int(sw * 0.73), int(sh * 0.51)))
    plumb_img.save(os.path.join(SERVICES_DIR, "plumbing.jpg"), "JPEG", quality=95)

    # Painting Card Image
    paint_img = im_serv.crop((int(sw * 0.75), int(sh * 0.40), int(sw * 0.97), int(sh * 0.51)))
    paint_img.save(os.path.join(SERVICES_DIR, "painting.jpg"), "JPEG", quality=95)

    # Flyer full preview
    im_serv.save(os.path.join(OUTPUT_DIR, "rate-card-flyer.jpg"), "JPEG", quality=90)
    print("Extracted residential services images successfully.")

# 3. Crop from Our_solutions.jpeg & our_business.jpeg
solutions_path = os.path.join(SOURCE_DIR, "Our_solutions.jpeg")
if os.path.exists(solutions_path):
    im_sol = Image.open(solutions_path)
    bw, bh = im_sol.size

    # Dubai Skyline / Facility Hero (top left)
    dubai_skyline = im_sol.crop((0, 0, int(bw * 0.50), int(bh * 0.50)))
    dubai_skyline.save(os.path.join(OUTPUT_DIR, "dubai-skyline-banner.jpg"), "JPEG", quality=95)

    # Tech with AC (top right)
    ac_pro = im_sol.crop((int(bw * 0.50), 0, bw, int(bh * 0.50)))
    ac_pro.save(os.path.join(OUTPUT_DIR, "about-dubai-expertise.jpg"), "JPEG", quality=95)

    # Commercial Sector
    comm_img = im_sol.crop((int(bw * 0.12), int(bh * 0.45), int(bw * 0.26), int(bh * 0.55)))
    comm_img.save(os.path.join(SERVICES_DIR, "commercial.jpg"), "JPEG", quality=95)

    # Industrial Sector
    ind_img = im_sol.crop((int(bw * 0.27), int(bh * 0.45), int(bw * 0.38), int(bh * 0.55)))
    ind_img.save(os.path.join(SERVICES_DIR, "industrial.jpg"), "JPEG", quality=95)

    # Total Facilities Management
    tfm_img = im_sol.crop((int(bw * 0.39), int(bh * 0.45), int(bw * 0.50), int(bh * 0.55)))
    tfm_img.save(os.path.join(SERVICES_DIR, "facilities-management.jpg"), "JPEG", quality=95)
    print("Extracted commercial, industrial & skyline images successfully.")

print("All asset processing finished successfully!")
