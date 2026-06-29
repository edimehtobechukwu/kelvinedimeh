with open('src/style.css', 'a', encoding='utf-8') as f:
    f.write('''
/* Framer Icon Dark Mode Fix */
[data-theme="dark"] img[src*="framer"] {
    filter: brightness(0) invert(1);
}
@media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) img[src*="framer"] {
        filter: brightness(0) invert(1);
    }
}
''')
print("Framer CSS appended successfully.")
