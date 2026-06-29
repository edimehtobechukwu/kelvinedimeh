from bs4 import BeautifulSoup

with open('index.html', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

print('--- HEAD ---')
print(soup.head.prettify())

print('\n--- BODY STRUCTURE ---')
for tag in soup.body.find_all(['section', 'header', 'footer', 'div']):
    # only print major structural elements
    if tag.name in ['section', 'header', 'footer'] or ('class' in tag.attrs and any(c in str(tag.get('class')) for c in ['project-card', 'faq', 'about'])):
        class_str = " ".join(tag.get('class', []))
        print(f'<{tag.name} class="{class_str}" id="{tag.get("id", "")}">')
