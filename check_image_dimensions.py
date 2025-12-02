from PIL import Image
import os

images_to_check = ['hippo.jpg', 'panda.jpg', 'gorilla.jpg']

base_dir = 'assets/images'

for image_name in images_to_check:
    image_path = os.path.join(base_dir, image_name)
    if os.path.exists(image_path):
        with Image.open(image_path) as img:
            width, height = img.size
            print(f"{image_name}: {width}x{height} pixels")
    else:
        print(f"{image_name} not found")