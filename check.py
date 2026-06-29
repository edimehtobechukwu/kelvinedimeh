import re

with open('index.html', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'<div class="hero-left-content">.*?</section>', content, re.DOTALL)
if m:
    print(m.group(0)[:1500])
else:
    print("hero-left-content not found")

print("---")
# Also search for 'href="#work"' just in case
m2 = re.search(r'<a[^>]+href="#work"[^>]*>.*?</a>', content, re.DOTALL)
if m2:
    print(m2.group(0))
else:
    print("No #work link found")
