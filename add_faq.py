import re

with open('index.html', encoding='utf-8') as f:
    content = f.read()

faq_html = """
<!-- AEO / FAQ Section -->
<section class="faq-section" id="faq" style="padding: 100px 5%; background-color: var(--surface);">
    <div style="max-width: 800px; margin: 0 auto;">
        <h2 style="font-family: var(--font-head); font-size: clamp(2.5rem, 4vw, 3.5rem); margin-bottom: 2rem; text-align: center;">Frequently Asked Questions</h2>
        <p style="text-align: center; color: var(--text-muted); margin-bottom: 4rem;">Everything you need to know about my expertise and services.</p>
        
        <div class="faq-accordion" style="display: flex; flex-direction: column; gap: 1rem;">
            <details style="background: var(--bg); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border); cursor: pointer;">
                <summary style="font-weight: 600; font-size: 1.2rem; outline: none; list-style: none; display: flex; justify-content: space-between; align-items: center;">
                    Who is Kelvin Edimeh? <span>+</span>
                </summary>
                <p style="margin-top: 1rem; color: var(--text-muted); line-height: 1.6;">Kelvin Edimeh is a Senior Product Designer and UI/UX Specialist based in Lagos, Nigeria. With extensive experience in creating intuitive digital experiences, Kelvin specializes in helping international SaaS, Fintech, and tech startups design, build, and optimize digital products for growth.</p>
            </details>
            
            <details style="background: var(--bg); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border); cursor: pointer;">
                <summary style="font-weight: 600; font-size: 1.2rem; outline: none; list-style: none; display: flex; justify-content: space-between; align-items: center;">
                    What services does Kelvin offer? <span>+</span>
                </summary>
                <p style="margin-top: 1rem; color: var(--text-muted); line-height: 1.6;">Kelvin offers end-to-end Product Design services including User Interface (UI) Design, User Experience (UX) Design, Design Systems creation, Frontend Development alignment, Website Design, and Conversion Rate Optimization (CRO).</p>
            </details>
            
            <details style="background: var(--bg); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border); cursor: pointer;">
                <summary style="font-weight: 600; font-size: 1.2rem; outline: none; list-style: none; display: flex; justify-content: space-between; align-items: center;">
                    What industries does Kelvin work with? <span>+</span>
                </summary>
                <p style="margin-top: 1rem; color: var(--text-muted); line-height: 1.6;">Kelvin primarily partners with fast-growing international startups, SaaS (Software as a Service) platforms, and Fintech (Financial Technology) companies, though his user-centric design principles apply across all tech-driven industries.</p>
            </details>
            
            <details style="background: var(--bg); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border); cursor: pointer;">
                <summary style="font-weight: 600; font-size: 1.2rem; outline: none; list-style: none; display: flex; justify-content: space-between; align-items: center;">
                    How does Kelvin approach product design? <span>+</span>
                </summary>
                <p style="margin-top: 1rem; color: var(--text-muted); line-height: 1.6;">Kelvin's approach is deeply rooted in product thinking. Rather than just designing screens, he analyzes business problems, uncovers user needs through research, wireframes solutions, makes data-informed design decisions, and tracks the final impact and results.</p>
            </details>
        </div>
    </div>
</section>
"""

# Insert FAQ right before the footer
if "<!-- AEO / FAQ Section -->" not in content:
    content = content.replace("</main>", faq_html + "\n</main>")
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("FAQ injected successfully.")
else:
    print("FAQ already exists.")
