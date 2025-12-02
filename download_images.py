import re
import os
import urllib.request
import urllib.error

file_path = 'index.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r"id:\s*'([^']+)'.*?imageUrl:\s*'([^']+)'", re.DOTALL)

matches = pattern.findall(content)

output_dir = 'assets/images'
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0')]
urllib.request.install_opener(opener)

for animal_id, url in matches:
    print(f"Downloading {animal_id} from {url}")
    try:
        with urllib.request.urlopen(url, timeout=10) as response:
            if response.getcode() == 200:
                content_type = response.info().get_content_type()
                ext = 'jpg'
                if 'png' in content_type:
                    ext = 'png'
                elif 'jpeg' in content_type:
                    ext = 'jpg'
                elif 'webp' in content_type:
                    ext = 'webp'
                
                # Fallback to URL extension if content-type is generic or missing
                if url.endswith('.jpg') or url.endswith('.jpeg'):
                    ext = 'jpg'
                elif url.endswith('.png'):
                    ext = 'png'
                elif url.endswith('.webp'):
                    ext = 'webp'

                filename = f"{animal_id}.{ext}"
                filepath = os.path.join(output_dir, filename)
                
                with open(filepath, 'wb') as f:
                    f.write(response.read())
                print(f"Saved to {filepath}")
            else:
                print(f"Failed to download {url}: Status {response.getcode()}")
    except Exception as e:
        print(f"Error downloading {url}: {e}")
