import re

with open('index.html', encoding='utf-8') as f:
    content = f.read()

# Add loading="lazy" to images inside project-card
# <img src="..." alt="...">
def add_lazy_loading(match):
    img_tag = match.group(0)
    if 'loading=' not in img_tag:
        return img_tag.replace('<img', '<img loading="lazy"')
    return img_tag

# Add alt tags if they are missing
def add_alt_tags(match):
    img_tag = match.group(0)
    if 'alt=' not in img_tag:
        return img_tag.replace('<img', '<img alt="Portfolio Case Study Thumbnail"')
    return img_tag

content = re.sub(r'<img[^>]+>', add_lazy_loading, content)
content = re.sub(r'<img[^>]+>', add_alt_tags, content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Performance and Accessibility passes complete.")
