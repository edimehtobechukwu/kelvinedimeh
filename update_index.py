import re

with open('index.html', encoding='utf-8') as f:
    content = f.read()

new_head = """<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kelvin Edimeh | Senior Product Designer & UI/UX Specialist</title>
    
    <!-- Primary Meta Tags -->
    <meta name="title" content="Kelvin Edimeh | Senior Product Designer & UI/UX Specialist">
    <meta name="description" content="Kelvin Edimeh is a Senior Product Designer and UI/UX Designer helping international SaaS, Fintech, and Tech companies design, build, and optimize digital products.">
    <meta name="keywords" content="Product Designer, UI/UX Designer, UX Designer, Web Designer, Frontend Developer, Design Systems, SaaS Designer, Fintech Designer, Website Design, Conversion Optimization, Kelvin Edimeh">
    <meta name="author" content="Kelvin Edimeh">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.kelvinedimeh.me/">
    <meta property="og:title" content="Kelvin Edimeh | Senior Product Designer">
    <meta property="og:description" content="Product Designer creating intuitive digital experiences and helping companies optimize products.">
    <meta property="og:image" content="https://www.kelvinedimeh.me/images/og-image.jpg">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://www.kelvinedimeh.me/">
    <meta property="twitter:title" content="Kelvin Edimeh | Senior Product Designer">
    <meta property="twitter:description" content="Product Designer creating intuitive digital experiences and helping companies optimize products.">
    <meta property="twitter:image" content="https://www.kelvinedimeh.me/images/og-image.jpg">

    <link rel="icon" type="image/png" href="/favicon.png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="canonical" href="https://www.kelvinedimeh.me/">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Vite CSS -->
    <script type="module" crossorigin src="/assets/index-B1oTFYZ8.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-DRm10Fp8.css">
    
    <!-- AEO / SEO Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "https://www.kelvinedimeh.me/#person",
          "name": "Kelvin Edimeh",
          "jobTitle": "Senior Product Designer",
          "url": "https://www.kelvinedimeh.me",
          "image": "https://www.kelvinedimeh.me/avatar.png",
          "sameAs": [
            "https://www.linkedin.com/in/kelvinedimeh/",
            "https://twitter.com/kelvinedimeh"
          ],
          "knowsAbout": ["Product Design", "UI/UX Design", "Frontend Development", "SaaS", "Fintech", "Design Systems"]
        },
        {
          "@type": "WebSite",
          "@id": "https://www.kelvinedimeh.me/#website",
          "url": "https://www.kelvinedimeh.me/",
          "name": "Kelvin Edimeh Portfolio",
          "publisher": {
            "@id": "https://www.kelvinedimeh.me/#person"
          }
        }
      ]
    }
    </script>
</head>"""

# Replace the entire head block. Note: we preserve the Vite injected scripts if they exist.
# The original file has Vite tags, but they might be dynamically injected during build.
# To be safe, we will just replace the head but ensure we don't break local dev by keeping <script type="module" src="/src/main.ts"></script> for dev server.
# Let's dynamically inject the SEO stuff instead of hard replacing.

head_additions = """
    <!-- Primary Meta Tags -->
    <meta name="title" content="Kelvin Edimeh | Senior Product Designer & UI/UX Specialist">
    <meta name="keywords" content="Product Designer, UI/UX Designer, UX Designer, Web Designer, Frontend Developer, Design Systems, SaaS Designer, Fintech Designer, Website Design, Conversion Optimization, Kelvin Edimeh">
    <meta name="author" content="Kelvin Edimeh">
    
    <!-- AEO / SEO Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "https://www.kelvinedimeh.me/#person",
          "name": "Kelvin Edimeh",
          "jobTitle": "Senior Product Designer",
          "url": "https://www.kelvinedimeh.me",
          "image": "https://www.kelvinedimeh.me/avatar.png",
          "sameAs": [
            "https://www.linkedin.com/in/kelvinedimeh",
            "https://twitter.com/kelvinedimeh"
          ],
          "knowsAbout": ["Product Design", "UI/UX Design", "Frontend Development", "SaaS", "Fintech", "Design Systems"]
        }
      ]
    }
    </script>
"""

# 1. Update Title
content = re.sub(r'<title>.*?</title>', '<title>Kelvin Edimeh | Senior Product Designer & UI/UX Specialist</title>', content, flags=re.DOTALL)

# 2. Update Description
content = re.sub(r'<meta name="description"[^>]*>', '<meta name="description" content="Kelvin Edimeh is a Senior Product Designer and UI/UX Designer helping international SaaS, Fintech, and Tech companies design, build, and optimize digital products.">', content)

# 3. Update OG Title and Desc
content = re.sub(r'<meta property="og:title"[^>]*>', '<meta property="og:title" content="Kelvin Edimeh | Senior Product Designer & UI/UX Specialist">', content)
content = re.sub(r'<meta property="og:description"[^>]*>', '<meta property="og:description" content="Kelvin Edimeh is a Senior Product Designer and UI/UX Designer helping international SaaS, Fintech, and Tech companies design, build, and optimize digital products.">', content)

# 4. Update Twitter Title and Desc
content = re.sub(r'<meta property="twitter:title"[^>]*>', '<meta property="twitter:title" content="Kelvin Edimeh | Senior Product Designer & UI/UX Specialist">', content)
content = re.sub(r'<meta property="twitter:description"[^>]*>', '<meta property="twitter:description" content="Kelvin Edimeh is a Senior Product Designer and UI/UX Designer helping international SaaS, Fintech, and Tech companies design, build, and optimize digital products.">', content)

# 5. Inject additions before </head>
if "<!-- Primary Meta Tags -->" not in content:
    content = content.replace("</head>", head_additions + "\n</head>")

# 6. Hero Text Update
content = re.sub(r'<p class="hero-desc">.*?</p>', '<p class="hero-desc">Product Designer who creates intuitive digital experiences and helps companies design, build, and optimize products.</p>', content, count=1, flags=re.DOTALL)

# 7. Add CTA Social Proof
cta_social_proof = """<div class="hero-actions">
                        <a href="#work" class="btn-hire">Hire Me</a>
                        <a href="mailto:kelvinedimeh@gmail.com" class="btn-icon-mail" aria-label="Email Kelvin">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </a>
                    </div>
                    <div style="margin-top: 1.5rem; display: flex; align-items: center; gap: 10px; font-size: 0.9rem; color: var(--text-muted); font-weight: 500;">
                        <span style="display: flex; gap: -5px;">
                            <img src="/avatar.png" alt="Client" style="width:24px; height:24px; border-radius:50%; background:#e0e0e0; border: 2px solid var(--bg);">
                            <img src="/icons/antigravity-icon__full-color.png" alt="Client" style="width:24px; height:24px; border-radius:50%; background:#e0e0e0; border: 2px solid var(--bg); margin-left:-10px;">
                        </span>
                        Trusted by international startups & SaaS
                    </div>"""
content = re.sub(r'<div class="hero-actions">.*?</div>', cta_social_proof, content, count=1, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated index.html SEO, Meta, Schema, Hero, and CTAs.")
