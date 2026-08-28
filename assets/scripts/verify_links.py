import os
import re

base_dir = r"c:\Users\sarav\Documents\MrFixers_website_app"
html_files = [f for f in os.listdir(base_dir) if f.endswith('.html')]

all_ok = True
for h in html_files:
    path = os.path.join(base_dir, h)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check src and href relative links
    links = re.findall(r'(?:src|href)=["\']([^"\']+)["\']', content)
    for link in links:
        if link.startswith('http') or link.startswith('#') or link.startswith('tel:') or link.startswith('mailto:') or link.startswith('javascript:'):
            continue
        clean_link = link.split('?')[0].split('#')[0]
        if not clean_link:
            continue
        target = os.path.normpath(os.path.join(base_dir, clean_link))
        if not os.path.exists(target):
            print(f"Error in {h}: Linked file not found -> {link} (resolved: {target})")
            all_ok = False
        else:
            # File exists
            pass

if all_ok:
    print("SUCCESS: All relative assets, scripts, stylesheets, and images across all HTML pages verified and exist!")
