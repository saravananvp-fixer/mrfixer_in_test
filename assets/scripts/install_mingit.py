import urllib.request
import zipfile
import os
import shutil

mingit_url = "https://github.com/git-for-windows/git/releases/download/v2.45.2.windows.1/MinGit-2.45.2-64-bit.zip"
dest_dir = r"C:\Users\sarav\AppData\Local\Programs\MinGit"
zip_path = os.path.join(r"C:\Users\sarav\Documents\MrFixers_website_app", "mingit.zip")

print("Downloading MinGit (portable git)...")
headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request(mingit_url, headers=headers)
with urllib.request.urlopen(req) as response, open(zip_path, 'wb') as out_file:
    shutil.copyfileobj(response, out_file)

print("Extracting MinGit...")
os.makedirs(dest_dir, exist_ok=True)
with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    zip_ref.extractall(dest_dir)

if os.path.exists(zip_path):
    os.remove(zip_path)

git_cmd = os.path.join(dest_dir, "cmd", "git.exe")
print("MinGit extracted successfully at:", git_cmd)
print("Git exists:", os.path.exists(git_cmd))
