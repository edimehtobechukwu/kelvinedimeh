import re

with open('index.html', encoding='utf-8') as f:
    content = f.read()

print('--- HEAD ---')
head_match = re.search(r'<head>.*?</head>', content, re.DOTALL)
if head_match:
    print(head_match.group(0)[:1500])
else:
    print('No head found')

print('\n--- SECTIONS ---')
sections = re.findall(r'<section[^>]*>|<div[^>]*class="[^"]*(?:project|faq|about)[^"]*"[^>]*>|<main[^>]*>', content)
for s in sections:
    print(s)
