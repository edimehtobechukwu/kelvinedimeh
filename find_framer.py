import os

for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or 'dist' in root:
        continue
    for file in files:
        if file.endswith(('.html', '.css', '.js', '.ts')):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                try:
                    content = f.read()
                    if 'framer' in content.lower():
                        print(f"Found 'framer' in {path}")
                except Exception as e:
                    pass
