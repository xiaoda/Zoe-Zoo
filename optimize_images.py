from PIL import Image
import os

# 要优化的图片列表
images_to_optimize = ['hippo.jpg', 'panda.jpg', 'gorilla.jpg']

base_dir = 'assets/images'
# 目标最大宽度（保持宽高比）
target_max_width = 800

try:
    for image_name in images_to_optimize:
        image_path = os.path.join(base_dir, image_name)
        if os.path.exists(image_path):
            with Image.open(image_path) as img:
                # 计算新尺寸（保持宽高比）
                width, height = img.size
                new_width = min(width, target_max_width)
                new_height = int((new_width / width) * height)
                
                # 重新调整大小，使用ANTIALIAS过滤以保持质量
                resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                
                # 保存优化后的图片，使用质量75和优化设置
                resized_img.save(image_path, optimize=True, quality=75, subsampling=2)
                
                print(f"Optimized {image_name}: {width}x{height} -> {new_width}x{new_height} pixels")
        else:
            print(f"{image_name} not found")
    print("Optimization complete!")
except Exception as e:
    print(f"Error during optimization: {e}")